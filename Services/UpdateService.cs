using System.Diagnostics;
using System.IO.Compression;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace TikTokLivePro.Services;

public sealed class UpdateInfo
{
	public string Version { get; set; } = "";
	public string Current { get; set; } = "";
	public bool UpdateAvailable { get; set; }
	public bool Mandatory { get; set; }
	public string Notes { get; set; } = "";
	public long Size { get; set; }
	public string Sha256 { get; set; } = "";
	public string DownloadUrl { get; set; } = "";
}

public sealed class UpdateService
{
	static readonly JsonSerializerOptions JsonOpts = new()
	{
		PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower,
		PropertyNameCaseInsensitive = true
	};

	readonly HttpClient _http = new() { Timeout = TimeSpan.FromMinutes(30) };
	readonly string _apiBase;
	readonly string _folder;

	public UpdateService(string apiBase)
	{
		_apiBase = apiBase.TrimEnd('/');
		_folder = Path.Combine(Path.GetTempPath(), "TikTokLivePro-update");
	}

	public static string CurrentVersion { get; } = ReadVersion();

	public string? ReadyVersion { get; private set; }
	string? _readyFolder;
	string? _stagingFolder;

	public async Task<UpdateInfo?> CheckAsync(CancellationToken ct = default)
	{
		using var cts = CancellationTokenSource.CreateLinkedTokenSource(ct);
		cts.CancelAfter(TimeSpan.FromSeconds(15));
		var url = $"{_apiBase}/api/tiktoklive/version?current={Uri.EscapeDataString(CurrentVersion)}";
		using var response = await _http.GetAsync(url, cts.Token);
		if (!response.IsSuccessStatusCode)
			return null;
		await using var stream = await response.Content.ReadAsStreamAsync(cts.Token);
		return await JsonSerializer.DeserializeAsync<UpdateInfo>(stream, JsonOpts, cts.Token);
	}

	public async Task DownloadAsync(UpdateInfo info, IProgress<int>? progress, CancellationToken ct = default)
	{
		if (ReadyVersion == info.Version && _readyFolder != null && Directory.Exists(_readyFolder))
			return;
		if (string.IsNullOrWhiteSpace(info.DownloadUrl))
			throw new InvalidOperationException("Máy chủ chưa có gói cập nhật.");

		Directory.CreateDirectory(_folder);
		var safe = string.Concat(info.Version.Where(ch => char.IsDigit(ch) || ch == '.'));
		var zip = Path.Combine(_folder, $"TikTokLivePro-{safe}.zip");
		var url = info.DownloadUrl.StartsWith("http", StringComparison.OrdinalIgnoreCase)
			? info.DownloadUrl
			: _apiBase + info.DownloadUrl;

		if (!File.Exists(zip) || !await MatchesAsync(zip, info.Sha256, ct))
		{
			var part = zip + ".part";
			using (var response = await _http.GetAsync(url, HttpCompletionOption.ResponseHeadersRead, ct))
			{
				response.EnsureSuccessStatusCode();
				var total = response.Content.Headers.ContentLength ?? info.Size;
				await using var input = await response.Content.ReadAsStreamAsync(ct);
				await using var output = File.Create(part);
				var buffer = new byte[128 * 1024];
				long done = 0;
				var last = -1;
				int read;
				while ((read = await input.ReadAsync(buffer, ct)) > 0)
				{
					await output.WriteAsync(buffer.AsMemory(0, read), ct);
					done += read;
					if (total > 0)
					{
						var percent = (int)Math.Min(100, done * 100 / total);
						if (percent != last)
						{
							last = percent;
							progress?.Report(percent);
						}
					}
				}
			}
			File.Move(part, zip, true);
			if (!await MatchesAsync(zip, info.Sha256, ct))
			{
				File.Delete(zip);
				throw new InvalidOperationException("Gói cập nhật bị lỗi khi tải (sai SHA-256).");
			}
		}

		var staging = Path.Combine(_folder, $"stage-{safe}");
		if (Directory.Exists(staging))
			Directory.Delete(staging, true);
		ZipFile.ExtractToDirectory(zip, staging);
		var root = PackageRoot(staging)
			?? throw new InvalidOperationException("Gói cập nhật không có TikTokLivePro.exe.");
		_stagingFolder = staging;
		_readyFolder = root;
		ReadyVersion = info.Version;
	}

	public void InstallAndRestart()
	{
		if (_readyFolder == null || !Directory.Exists(_readyFolder))
			throw new InvalidOperationException("Chưa tải xong bản cập nhật.");
		var exe = Environment.ProcessPath ?? throw new InvalidOperationException("Không tìm thấy file chạy của app.");
		var target = Path.GetDirectoryName(exe)!;
		var script = Path.Combine(_folder, "apply-update.cmd");
		var pid = Environment.ProcessId;
		var log = Path.Combine(_folder, "update.log");
		var text = new StringBuilder()
			.AppendLine("@echo off")
			.AppendLine("chcp 65001 >nul")
			.AppendLine($"echo [%date% %time%] waiting for pid {pid} > \"{log}\"")
			.AppendLine(":wait")
			.AppendLine($"tasklist /FI \"PID eq {pid}\" /NH 2>nul | find \" {pid} \" >nul && (timeout /t 1 /nobreak >nul & goto wait)")
			.AppendLine("timeout /t 2 /nobreak >nul")
			.AppendLine($"robocopy \"{_readyFolder}\" \"{target}\" /E /R:10 /W:1 /NFL /NDL /NJH /NJS /NP >> \"{log}\"")
			.AppendLine($"echo [%date% %time%] robocopy exit %errorlevel% >> \"{log}\"")
			.AppendLine($"start \"\" /D \"{target}\" \"{exe}\"")
			.AppendLine($"echo [%date% %time%] started app >> \"{log}\"")
			.AppendLine($"rmdir /s /q \"{_stagingFolder}\" >nul 2>&1")
			.AppendLine("(goto) 2>nul & del \"%~f0\"")
			.ToString();
		File.WriteAllText(script, text, new UTF8Encoding(false));

		var start = new ProcessStartInfo("cmd.exe", $"/c \"{script}\"")
		{
			CreateNoWindow = true,
			WindowStyle = ProcessWindowStyle.Hidden,
			UseShellExecute = !CanWrite(target)
		};
		if (start.UseShellExecute)
			start.Verb = "runas";
		Process.Start(start);
	}

	static string? PackageRoot(string staging)
	{
		if (File.Exists(Path.Combine(staging, "TikTokLivePro.exe")))
			return staging;
		var dirs = Directory.GetDirectories(staging);
		if (dirs.Length == 1 && File.Exists(Path.Combine(dirs[0], "TikTokLivePro.exe")))
			return dirs[0];
		return null;
	}

	static async Task<bool> MatchesAsync(string path, string sha, CancellationToken ct)
	{
		if (string.IsNullOrWhiteSpace(sha))
			return true;
		await using var stream = File.OpenRead(path);
		var hash = await SHA256.HashDataAsync(stream, ct);
		return string.Equals(Convert.ToHexString(hash), sha.Trim(), StringComparison.OrdinalIgnoreCase);
	}

	static bool CanWrite(string folder)
	{
		try
		{
			var probe = Path.Combine(folder, $".update-{Guid.NewGuid():N}");
			File.WriteAllText(probe, "");
			File.Delete(probe);
			return true;
		}
		catch (Exception ex) when (ex is UnauthorizedAccessException or IOException)
		{
			return false;
		}
	}

	static string ReadVersion()
	{
		var info = Assembly.GetEntryAssembly()?.GetCustomAttribute<AssemblyInformationalVersionAttribute>()?.InformationalVersion
			?? Assembly.GetExecutingAssembly().GetCustomAttribute<AssemblyInformationalVersionAttribute>()?.InformationalVersion;
		if (!string.IsNullOrWhiteSpace(info))
		{
			var plus = info.IndexOf('+');
			return plus > 0 ? info[..plus] : info;
		}
		return Assembly.GetExecutingAssembly().GetName().Version?.ToString(3) ?? "1.0.0";
	}
}
