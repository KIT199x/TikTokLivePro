using System.Diagnostics;
using System.Globalization;
using System.IO.Compression;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using TikTokLivePro.Models;

namespace TikTokLivePro.Services;

public sealed class LiveStreamService
{
	readonly object _gate = new();
	Process? _process;
	CancellationTokenSource? _updates;
	string _stderrTail = "";
	double _playhead;
	DateTime _startedUtc;

	public bool IsRunning
	{
		get
		{
			lock (_gate)
				return _process is { HasExited: false };
		}
	}

	public event Action<string, string>? StatusChanged;

	public async Task StartAsync(
		ShowScript script,
		string server,
		string streamKey,
		int width,
		int height,
		int bitrateKbps,
		int stageWidth,
		int stageHeight,
		string mediaDirectory)
	{
		if (IsRunning)
			throw new InvalidOperationException("Đang phát live. Hãy dừng trước khi lên sóng lại.");

		var scenes = BuildSlots(script, mediaDirectory);
		if (scenes.Count == 0)
			throw new InvalidOperationException("Kịch bản chưa có cảnh nào gắn video còn tồn tại.");

		Report("starting", "Đang chuẩn bị FFmpeg…");
		var ffmpeg = await EnsureFfmpegAsync();
		var ffprobe = Path.Combine(Path.GetDirectoryName(ffmpeg)!, "ffprobe.exe");
		if (!File.Exists(ffprobe))
			ffprobe = ffmpeg.Replace("ffmpeg.exe", "ffprobe.exe", StringComparison.OrdinalIgnoreCase);

		var work = Path.Combine(FileSystem.AppDataDirectory, "live-work");
		Directory.CreateDirectory(work);
		foreach (var old in Directory.EnumerateFiles(work, "ov-*.txt"))
			File.Delete(old);

		var slots = new List<Slot>();
		double cursor = 0;
		foreach (var scene in scenes)
		{
			var full = await ProbeDurationAsync(ffprobe, scene.Path);
			if (full <= 0.2)
				throw new InvalidOperationException($"Không đọc được thời lượng của {scene.Scene.VideoFile}.");
			double start;
			double length;
			if (script.Mode == "segments")
			{
				start = Math.Clamp(scene.Scene.StartSec, 0, Math.Max(0, full - 0.2));
				var end = scene.Scene.EndSec is > 0 and var mark ? Math.Min(mark, full) : full;
				if (end <= start)
					end = full;
				length = Math.Max(0.2, end - start);
			}
			else
			{
				start = 0;
				length = full;
			}

			var source = scene.Path;
			if (!await HasAudioAsync(ffprobe, scene.Path))
			{
				Report("starting", $"Đang thêm tiếng im cho {scene.Scene.VideoFile}…");
				source = await MuxSilenceAsync(ffmpeg, scene.Path);
			}

			slots.Add(new Slot(scene.Scene, source, start, length, cursor, script.Mode == "segments"));
			cursor += length;
		}

		if (cursor <= 0)
			throw new InvalidOperationException("Kịch bản không có thời lượng để phát.");

		var concatPath = Path.Combine(work, "playlist.ffconcat");
		await File.WriteAllTextAsync(concatPath, BuildConcat(slots), new UTF8Encoding(false));

		var overlays = CollectOverlays(script, slots, width, stageWidth);
		foreach (var overlay in overlays)
			await File.WriteAllTextAsync(overlay.FilePath, "", new UTF8Encoding(false));

		var filter = BuildFilter(width, height, script.Fit, overlays, script.ShowLiveBadge);
		var output = BuildOutputUrl(server, streamKey);
		var psi = new ProcessStartInfo
		{
			FileName = ffmpeg,
			WorkingDirectory = work,
			UseShellExecute = false,
			CreateNoWindow = true,
			RedirectStandardError = true,
			RedirectStandardInput = true,
			StandardErrorEncoding = Encoding.UTF8
		};
		psi.ArgumentList.Add("-hide_banner");
		psi.ArgumentList.Add("-loglevel");
		psi.ArgumentList.Add("info");
		psi.ArgumentList.Add("-re");
		if (script.Loop)
		{
			psi.ArgumentList.Add("-stream_loop");
			psi.ArgumentList.Add("-1");
		}
		psi.ArgumentList.Add("-f");
		psi.ArgumentList.Add("concat");
		psi.ArgumentList.Add("-safe");
		psi.ArgumentList.Add("0");
		psi.ArgumentList.Add("-i");
		psi.ArgumentList.Add(concatPath);
		psi.ArgumentList.Add("-vf");
		psi.ArgumentList.Add(filter);
		psi.ArgumentList.Add("-c:v");
		psi.ArgumentList.Add("libx264");
		psi.ArgumentList.Add("-preset");
		psi.ArgumentList.Add("veryfast");
		psi.ArgumentList.Add("-tune");
		psi.ArgumentList.Add("zerolatency");
		psi.ArgumentList.Add("-pix_fmt");
		psi.ArgumentList.Add("yuv420p");
		psi.ArgumentList.Add("-r");
		psi.ArgumentList.Add("30");
		psi.ArgumentList.Add("-g");
		psi.ArgumentList.Add("60");
		psi.ArgumentList.Add("-b:v");
		psi.ArgumentList.Add($"{bitrateKbps}k");
		psi.ArgumentList.Add("-maxrate");
		psi.ArgumentList.Add($"{bitrateKbps}k");
		psi.ArgumentList.Add("-bufsize");
		psi.ArgumentList.Add($"{bitrateKbps * 2}k");
		psi.ArgumentList.Add("-c:a");
		psi.ArgumentList.Add("aac");
		psi.ArgumentList.Add("-b:a");
		psi.ArgumentList.Add("128k");
		psi.ArgumentList.Add("-ar");
		psi.ArgumentList.Add("44100");
		psi.ArgumentList.Add("-ac");
		psi.ArgumentList.Add("2");
		psi.ArgumentList.Add("-f");
		psi.ArgumentList.Add("flv");
		psi.ArgumentList.Add("-flvflags");
		psi.ArgumentList.Add("no_duration_filesize");
		psi.ArgumentList.Add(output);

		var process = new Process { StartInfo = psi, EnableRaisingEvents = true };
		if (!process.Start())
			throw new InvalidOperationException("Không chạy được FFmpeg.");

		lock (_gate)
		{
			_process = process;
			_playhead = 0;
			_stderrTail = "";
			_startedUtc = DateTime.UtcNow;
		}

		process.Exited += (_, _) =>
		{
			var failed = process.ExitCode != 0;
			var tail = Redact(_stderrTail);
			Report(failed ? "error" : "idle", failed
				? "Luồng live dừng vì lỗi. " + tail
				: "Đã dừng phát live.");
		};

		_ = PumpErrorsAsync(process);
		_updates = new CancellationTokenSource();
		_ = UpdateOverlaysAsync(overlays, slots, cursor, script.Loop, _updates.Token);
		Report("live", "Đang lên sóng.");
	}

	public void Stop()
	{
		_updates?.Cancel();
		Process? process;
		lock (_gate)
			process = _process;
		if (process is null)
			return;

		try
		{
			if (!process.HasExited)
			{
				process.StandardInput.WriteLine("q");
				if (!process.WaitForExit(2500))
					process.Kill(entireProcessTree: true);
			}
		}
		catch (Exception)
		{
			try { process.Kill(entireProcessTree: true); } catch { /* already gone */ }
		}

		Report("idle", "Đã dừng phát live.");
	}

	async Task PumpErrorsAsync(Process process)
	{
		try
		{
			while (await process.StandardError.ReadLineAsync() is { } line)
			{
				lock (_gate)
				{
					_stderrTail = (_stderrTail + "\n" + line).Trim();
					if (_stderrTail.Length > 1800)
						_stderrTail = _stderrTail[^1800..];
				}
				if (TryParseClock(line, out var seconds))
				{
					lock (_gate)
						_playhead = seconds;
				}
			}
		}
		catch (Exception)
		{
			/* process closed the pipe */
		}
	}

	async Task UpdateOverlaysAsync(IReadOnlyList<OverlayJob> overlays, IReadOnlyList<Slot> slots, double total, bool loop, CancellationToken token)
	{
		var encoding = new UTF8Encoding(false);
		while (!token.IsCancellationRequested)
		{
			double playhead;
			lock (_gate)
				playhead = _playhead;
			if (loop && total > 0)
				playhead %= total;
			var scene = slots.LastOrDefault(slot => playhead >= slot.TimelineStart - 0.05 && playhead < slot.TimelineStart + slot.Length);
			scene ??= slots[0];
			var now = DateTime.Now;
			foreach (var overlay in overlays)
			{
				var active = overlay.SceneId is null || overlay.SceneId == scene.Scene.Id;
				var text = active ? ApplyTokens(overlay.Template, now) : "";
				try
				{
					await File.WriteAllTextAsync(overlay.FilePath, text, encoding, token);
				}
				catch (IOException)
				{
					/* FFmpeg may be reading the same file. */
				}
			}

			if (IsRunning)
			{
				var elapsed = DateTime.UtcNow - _startedUtc;
				Report("live", $"Đang lên sóng · {elapsed:hh\\:mm\\:ss}");
			}

			try { await Task.Delay(500, token); }
			catch (OperationCanceledException) { break; }
		}
	}

	static List<(SceneItem Scene, string Path)> BuildSlots(ShowScript script, string mediaDirectory)
	{
		var list = new List<(SceneItem, string)>();
		foreach (var scene in script.Scenes)
		{
			var name = Path.GetFileName(scene.VideoFile ?? "");
			if (string.IsNullOrWhiteSpace(name))
				continue;
			var path = Path.GetFullPath(Path.Combine(mediaDirectory, name));
			var root = Path.GetFullPath(mediaDirectory + Path.DirectorySeparatorChar);
			if (!path.StartsWith(root, StringComparison.OrdinalIgnoreCase) || !File.Exists(path))
				continue;
			list.Add((scene, path));
		}
		return list;
	}

	static string BuildConcat(IReadOnlyList<Slot> slots)
	{
		var builder = new StringBuilder();
		builder.AppendLine("ffconcat version 1.0");
		foreach (var slot in slots)
		{
			builder.Append("file '").Append(slot.Path.Replace('\\', '/').Replace("'", "'\\''")).AppendLine("'");
			if (slot.Trimmed)
			{
				builder.Append("inpoint ").AppendLine(slot.Start.ToString("0.###", CultureInfo.InvariantCulture));
				builder.Append("outpoint ").AppendLine((slot.Start + slot.Length).ToString("0.###", CultureInfo.InvariantCulture));
			}
		}
		return builder.ToString();
	}

	static List<OverlayJob> CollectOverlays(ShowScript script, IReadOnlyList<Slot> slots, int outputWidth, int stageWidth)
	{
		var work = Path.Combine(FileSystem.AppDataDirectory, "live-work");
		var scale = stageWidth > 40 ? outputWidth / (double)stageWidth : outputWidth / 1080d;
		var jobs = new List<OverlayJob>();
		var index = 0;
		foreach (var overlay in script.Overlays)
			jobs.Add(MakeJob(overlay, null, work, index++, scale));
		foreach (var slot in slots)
		{
			foreach (var overlay in slot.Scene.Overlays)
				jobs.Add(MakeJob(overlay, slot.Scene.Id, work, index++, scale));
		}
		return jobs;
	}

	static OverlayJob MakeJob(OverlayItem overlay, string? sceneId, string work, int index, double scale)
	{
		var size = (int)Math.Clamp(overlay.FontSize * scale, 16, 180);
		return new OverlayJob(
			sceneId,
			overlay.Text ?? "",
			Path.Combine(work, $"ov-{index}.txt"),
			size,
			ToFfmpegColor(overlay.Color),
			overlay.Align,
			overlay.Bold,
			BoxAlpha(overlay.Bg),
			Math.Clamp(overlay.X, 0, 100),
			Math.Clamp(overlay.Y, 0, 100));
	}

	static string BuildFilter(int width, int height, string fit, IReadOnlyList<OverlayJob> overlays, bool liveBadge)
	{
		var geometry = fit == "cover"
			? $"scale={width}:{height}:force_original_aspect_ratio=increase,crop={width}:{height},setsar=1,fps=30"
			: $"scale={width}:{height}:force_original_aspect_ratio=decrease,pad={width}:{height}:(ow-iw)/2:(oh-ih)/2:color=black,setsar=1,fps=30";
		var parts = new List<string> { geometry };
		var bold = FontPath(true);
		var regular = FontPath(false);
		foreach (var overlay in overlays)
		{
			var x = overlay.Align switch
			{
				"center" => $"w*{Pct(overlay.X)}-text_w/2",
				"right" => $"w*{Pct(overlay.X)}-text_w",
				_ => $"w*{Pct(overlay.X)}"
			};
			var y = $"h*{Pct(overlay.Y)}";
			var font = overlay.Bold ? bold : regular;
			var box = overlay.BoxAlpha is null
				? "box=0"
				: $"box=1:boxcolor=black@{overlay.BoxAlpha}:boxborderw=10";
			parts.Add(
				"drawtext=" +
				$"fontfile='{Esc(font)}':" +
				$"textfile='{Esc(overlay.FilePath.Replace('\\', '/'))}':" +
				"reload=1:expansion=none:" +
				$"fontsize={overlay.FontSize}:fontcolor={overlay.FontColor}:" +
				$"x={x}:y={y}:{box}");
		}

		if (liveBadge)
		{
			var font = Esc(bold);
			parts.Add($"drawtext=fontfile='{font}':text=LIVE:expansion=none:fontsize=28:fontcolor=white:box=1:boxcolor=0xE11D2E@0.92:boxborderw=12:x=(w-text_w)/2:y=h*0.03");
		}

		return string.Join(",", parts);
	}

	static string FontPath(bool bold)
	{
		var windir = Environment.GetFolderPath(Environment.SpecialFolder.Windows);
		var file = bold ? "segoeuib.ttf" : "segoeui.ttf";
		var path = Path.Combine(windir, "Fonts", file);
		if (!File.Exists(path))
			path = Path.Combine(windir, "Fonts", "arial.ttf");
		return path.Replace('\\', '/');
	}

	static string BuildOutputUrl(string server, string streamKey)
	{
		var url = server.Trim();
		if (!url.StartsWith("rtmp://", StringComparison.OrdinalIgnoreCase) &&
			!url.StartsWith("rtmps://", StringComparison.OrdinalIgnoreCase))
			throw new InvalidOperationException("Server phải bắt đầu bằng rtmp:// hoặc rtmps://.");
		if (!string.IsNullOrWhiteSpace(streamKey))
			url = url.TrimEnd('/') + "/" + streamKey.Trim();
		return url;
	}

	static async Task<double> ProbeDurationAsync(string ffprobe, string path)
	{
		var output = await RunProbeAsync(ffprobe, ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path]);
		return double.TryParse(output.Trim(), NumberStyles.Float, CultureInfo.InvariantCulture, out var value) ? value : 0;
	}

	static async Task<string> MuxSilenceAsync(string ffmpeg, string path)
	{
		var info = new FileInfo(path);
		var cacheDir = Path.Combine(FileSystem.AppDataDirectory, "live-work");
		Directory.CreateDirectory(cacheDir);
		var safeName = string.Join("_", info.Name.Split(Path.GetInvalidFileNameChars()));
		var cache = Path.Combine(cacheDir, $"silence-{info.Length}-{info.LastWriteTimeUtc.Ticks}-{safeName}");
		if (!cache.EndsWith(".mp4", StringComparison.OrdinalIgnoreCase))
			cache += ".mp4";
		if (File.Exists(cache))
			return cache;

		var psi = new ProcessStartInfo
		{
			FileName = ffmpeg,
			UseShellExecute = false,
			CreateNoWindow = true,
			RedirectStandardError = true
		};
		foreach (var arg in new[] { "-y", "-i", path, "-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo", "-shortest", "-c:v", "copy", "-c:a", "aac", "-b:a", "128k", "-map", "0:v:0", "-map", "1:a:0", cache })
			psi.ArgumentList.Add(arg);
		using var process = Process.Start(psi) ?? throw new InvalidOperationException("Không chạy được FFmpeg.");
		var error = await process.StandardError.ReadToEndAsync();
		await process.WaitForExitAsync();
		if (process.ExitCode != 0 || !File.Exists(cache))
			throw new InvalidOperationException("Không thêm được tiếng cho video. " + Redact(error).Split('\n').LastOrDefault()?.Trim());
		return cache;
	}

	static async Task<bool> HasAudioAsync(string ffprobe, string path)
	{
		var output = await RunProbeAsync(ffprobe, ["-v", "error", "-select_streams", "a", "-show_entries", "stream=index", "-of", "csv=p=0", path]);
		return !string.IsNullOrWhiteSpace(output);
	}

	static async Task<string> RunProbeAsync(string ffprobe, string[] args)
	{
		var psi = new ProcessStartInfo
		{
			FileName = ffprobe,
			UseShellExecute = false,
			CreateNoWindow = true,
			RedirectStandardOutput = true,
			RedirectStandardError = true
		};
		foreach (var arg in args)
			psi.ArgumentList.Add(arg);
		using var process = Process.Start(psi) ?? throw new InvalidOperationException("Không chạy được ffprobe.");
		var text = await process.StandardOutput.ReadToEndAsync();
		await process.WaitForExitAsync();
		return text;
	}

	async Task<string> EnsureFfmpegAsync()
	{
		var found = FindFfmpeg();
		if (found is not null)
			return found;

		var tools = Path.Combine(FileSystem.AppDataDirectory, "ffmpeg");
		Directory.CreateDirectory(tools);
		var zipPath = Path.Combine(tools, "ffmpeg.zip");
		Report("starting", "Chưa có FFmpeg. Đang tải bộ mã hóa, lần đầu có thể mất vài phút…");
		using var http = new HttpClient { Timeout = TimeSpan.FromMinutes(20) };
		http.DefaultRequestHeaders.UserAgent.ParseAdd("TikTokLivePro/1.0");
		const string url = "https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-win64-gpl.zip";
		using var response = await http.GetAsync(url, HttpCompletionOption.ResponseHeadersRead);
		response.EnsureSuccessStatusCode();
		var total = response.Content.Headers.ContentLength ?? 0;
		await using (var input = await response.Content.ReadAsStreamAsync())
		await using (var output = File.Create(zipPath))
		{
			var buffer = new byte[1024 * 128];
			long done = 0;
			int read;
			var lastReport = 0;
			while ((read = await input.ReadAsync(buffer)) > 0)
			{
				await output.WriteAsync(buffer.AsMemory(0, read));
				done += read;
				if (total <= 0)
					continue;
				var percent = (int)(done * 100 / total);
				if (percent >= lastReport + 10)
				{
					lastReport = percent;
					Report("starting", $"Đang tải FFmpeg… {percent}%");
				}
			}
		}

		Report("starting", "Đang giải nén FFmpeg…");
		using (var zip = ZipFile.OpenRead(zipPath))
		{
			foreach (var entry in zip.Entries)
			{
				var name = entry.FullName.Replace('\\', '/');
				if (!name.Contains("/bin/", StringComparison.OrdinalIgnoreCase) || entry.Length == 0)
					continue;
				var fileName = Path.GetFileName(name);
				if (fileName.Contains("..", StringComparison.Ordinal) || string.IsNullOrWhiteSpace(fileName))
					continue;
				var dest = Path.Combine(tools, fileName);
				entry.ExtractToFile(dest, overwrite: true);
			}
		}
		File.Delete(zipPath);

		return FindFfmpeg() ?? throw new InvalidOperationException("Tải FFmpeg xong nhưng không thấy ffmpeg.exe.");
	}

	static string? FindFfmpeg()
	{
		var local = Path.Combine(FileSystem.AppDataDirectory, "ffmpeg", "ffmpeg.exe");
		if (File.Exists(local))
			return local;
		var path = Environment.GetEnvironmentVariable("PATH") ?? "";
		foreach (var dir in path.Split(Path.PathSeparator, StringSplitOptions.RemoveEmptyEntries))
		{
			var candidate = Path.Combine(dir.Trim(), "ffmpeg.exe");
			if (File.Exists(candidate))
				return candidate;
		}
		return null;
	}

	static string ApplyTokens(string text, DateTime now)
	{
		var time = now.ToString("HH:mm:ss");
		var date = now.ToString("dd/MM/yyyy");
		var days = new[] { "Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy" };
		return (text ?? "")
			.Replace("{datetime}", $"{date} {time}")
			.Replace("{date}", date)
			.Replace("{time}", time)
			.Replace("{weekday}", days[(int)now.DayOfWeek]);
	}

	static bool TryParseClock(string line, out double seconds)
	{
		seconds = 0;
		var match = Regex.Match(line, @"time=(\d+):(\d+):(\d+(?:\.\d+)?)");
		if (!match.Success)
			return false;
		seconds = int.Parse(match.Groups[1].Value, CultureInfo.InvariantCulture) * 3600d
			+ int.Parse(match.Groups[2].Value, CultureInfo.InvariantCulture) * 60d
			+ double.Parse(match.Groups[3].Value, CultureInfo.InvariantCulture);
		return true;
	}

	static string ToFfmpegColor(string color)
	{
		var hex = (color ?? "").Trim().TrimStart('#');
		return hex.Length == 6 ? "0x" + hex.ToUpperInvariant() : "white";
	}

	static string? BoxAlpha(string? background)
	{
		if (string.IsNullOrWhiteSpace(background) || background == "transparent")
			return null;
		var match = Regex.Match(background, @"rgba?\([^)]*?([0-9]*\.?[0-9]+)\s*\)");
		return match.Success ? match.Groups[1].Value : "0.45";
	}

	static string Pct(double value) => (value / 100d).ToString("0.####", CultureInfo.InvariantCulture);

	static string Esc(string value) => value.Replace("\\", "\\\\").Replace(":", "\\:").Replace("'", "\\'");

	static string Redact(string text) => Regex.Replace(text, @"rtmps?://\S+", "rtmp://…");

	void Report(string state, string message) => StatusChanged?.Invoke(state, message);

	sealed record Slot(SceneItem Scene, string Path, double Start, double Length, double TimelineStart, bool Trimmed);

	sealed record OverlayJob(
		string? SceneId,
		string Template,
		string FilePath,
		int FontSize,
		string FontColor,
		string Align,
		bool Bold,
		string? BoxAlpha,
		double X,
		double Y);
}
