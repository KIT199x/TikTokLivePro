using System.Text.Json;
using TikTokLivePro.Models;

namespace TikTokLivePro.Services;

public sealed class StudioStore
{
	static readonly JsonSerializerOptions JsonOpts = new()
	{
		PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
		PropertyNameCaseInsensitive = true,
		WriteIndented = true
	};

	static readonly HashSet<string> VideoExtensions = new(StringComparer.OrdinalIgnoreCase)
	{
		".mp4", ".webm", ".mov", ".m4v", ".mkv"
	};

	static readonly string[] WebFiles = ["index.html", "studio.css", "studio.js", "fontawesome.min.css", "fa-solid-900.woff2"];

	public string HostDirectory { get; }
	public string MediaDirectory { get; }
	public string ScriptsDirectory { get; }
	public string? ActiveScriptId { get; private set; }
	public string StreamServer { get; private set; } = "";
	public string StreamKey { get; private set; } = "";
	public int StreamWidth { get; private set; } = 1080;
	public int StreamHeight { get; private set; } = 1920;
	public int StreamBitrateKbps { get; private set; } = 4500;
	public string TikTokUser { get; private set; } = "";
	public string SigningKey { get; private set; } = "";
	public string Theme { get; private set; } = "dark";
	public string Language { get; private set; } = "vi";
	public string Ratio { get; private set; } = "9:16";
	public bool ShowComments { get; private set; } = true;
	public bool ShowViewers { get; private set; } = true;
	public bool ShowLikes { get; private set; } = true;
	public bool RandomHearts { get; private set; }
	public WidgetLayout CommentLayout { get; private set; } = WidgetLayout.Comment();
	public WidgetLayout ViewerLayout { get; private set; } = WidgetLayout.Viewer();

	string StreamSettingsPath => Path.Combine(FileSystem.AppDataDirectory, "stream-settings.json");

	readonly string _settingsPath;

	public StudioStore()
	{
		HostDirectory = Path.Combine(FileSystem.AppDataDirectory, "studio-host");
		MediaDirectory = Path.Combine(HostDirectory, "media");
		ScriptsDirectory = Path.Combine(HostDirectory, "scripts");
		_settingsPath = Path.Combine(HostDirectory, "settings.json");
	}

	public async Task InitializeAsync()
	{
		Directory.CreateDirectory(MediaDirectory);
		Directory.CreateDirectory(ScriptsDirectory);

		var assembly = typeof(StudioStore).Assembly;
		foreach (var file in WebFiles)
		{
			var logical = "TikTokLivePro.www." + file;
			await using var source = assembly.GetManifestResourceStream(logical)
				?? throw new FileNotFoundException(
					$"Thiếu tài nguyên {logical}. Có: {string.Join(", ", assembly.GetManifestResourceNames())}");
			var dest = Path.Combine(HostDirectory, file);
			await using var target = new FileStream(dest, FileMode.Create, FileAccess.Write, FileShare.Read);
			await source.CopyToAsync(target);
		}

		LoadSettings();
		LoadStreamSettings();
		if (!Directory.EnumerateFiles(ScriptsDirectory, "*.json").Any())
		{
			var sample = CreateSample();
			SaveScript(sample);
			SetActive(sample.Id);
		}
		else if (ActiveScriptId is null || !File.Exists(ScriptPath(ActiveScriptId)))
		{
			var first = LoadScripts().FirstOrDefault();
			if (first is not null)
				SetActive(first.Id);
		}
	}

	public IReadOnlyList<VideoDto> ListVideos()
	{
		if (!Directory.Exists(MediaDirectory))
			return [];

		return Directory.EnumerateFiles(MediaDirectory)
			.Select(path => new FileInfo(path))
			.Where(info => VideoExtensions.Contains(info.Extension))
			.OrderBy(info => info.Name, StringComparer.OrdinalIgnoreCase)
			.Select(info => new VideoDto
			{
				FileName = info.Name,
				DisplayName = info.Name,
				SizeBytes = info.Length,
				Url = "media/" + Uri.EscapeDataString(info.Name)
			})
			.ToList();
	}

	public async Task<(int Added, int Skipped)> ImportPathsAsync(IEnumerable<string> paths)
	{
		var added = 0;
		var skipped = 0;
		foreach (var path in paths)
		{
			if (string.IsNullOrWhiteSpace(path) || !File.Exists(path))
			{
				skipped++;
				continue;
			}

			var ext = Path.GetExtension(path);
			if (!VideoExtensions.Contains(ext))
			{
				skipped++;
				continue;
			}

			var storedName = UniqueName(SanitizeFileName(Path.GetFileName(path)));
			var dest = Path.Combine(MediaDirectory, storedName);
			await using var input = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
			await using var output = new FileStream(dest, FileMode.CreateNew, FileAccess.Write, FileShare.None);
			await input.CopyToAsync(output).ConfigureAwait(false);
			added++;
		}

		return (added, skipped);
	}

	public bool DeleteVideo(string fileName)
	{
		var path = SafeMediaPath(fileName);
		if (path is null || !File.Exists(path))
			return false;

		File.Delete(path);
		return true;
	}

	public IReadOnlyList<ShowScript> LoadScripts()
	{
		if (!Directory.Exists(ScriptsDirectory))
			return [];

		var list = new List<ShowScript>();
		foreach (var path in Directory.EnumerateFiles(ScriptsDirectory, "*.json"))
		{
			try
			{
				var script = JsonSerializer.Deserialize<ShowScript>(File.ReadAllText(path), JsonOpts);
				if (script is null || !IsSafeId(script.Id))
					continue;
				Normalize(script);
				list.Add(script);
			}
			catch (JsonException)
			{
			}
		}

		return list.OrderBy(script => script.Name, StringComparer.CurrentCultureIgnoreCase).ToList();
	}

	public void SaveScript(ShowScript script)
	{
		if (!IsSafeId(script.Id))
			throw new InvalidOperationException("Mã kịch bản không hợp lệ.");

		Normalize(script);
		var json = JsonSerializer.Serialize(script, JsonOpts);
		var path = ScriptPath(script.Id);
		var temp = path + ".tmp";
		File.WriteAllText(temp, json);
		File.Move(temp, path, overwrite: true);
	}

	public void DeleteScript(string id)
	{
		if (!IsSafeId(id))
			return;

		var path = ScriptPath(id);
		if (File.Exists(path))
			File.Delete(path);

		if (ActiveScriptId == id)
			SetActive(LoadScripts().FirstOrDefault()?.Id);
	}

	public void SetActive(string? id)
	{
		ActiveScriptId = IsSafeId(id ?? "") ? id : null;
		WriteSettings();
	}

	public void SavePrefs(string? theme, string? language, string? ratio, bool? showComments, bool? showViewers, bool? showLikes, WidgetLayout? commentLayout, WidgetLayout? viewerLayout, bool? randomHearts = null)
	{
		if (theme is "light" or "dark")
			Theme = theme;
		if (language is "en" or "vi")
			Language = language;
		if (ratio is "9:16" or "16:9" or "1:1")
			Ratio = ratio;
		if (showComments is bool comments)
			ShowComments = comments;
		if (showViewers is bool viewers)
			ShowViewers = viewers;
		if (showLikes is bool likes)
			ShowLikes = likes;
		if (randomHearts is bool hearts)
			RandomHearts = hearts;
		if (commentLayout is not null)
			CommentLayout = WidgetLayout.NormalizeComment(commentLayout);
		if (viewerLayout is not null)
			ViewerLayout = WidgetLayout.NormalizeViewer(viewerLayout);
		WriteSettings();
	}

	void WriteSettings()
	{
		var json = JsonSerializer.Serialize(new SettingsDto
		{
			ActiveScriptId = ActiveScriptId,
			Theme = Theme,
			Language = Language,
			Ratio = Ratio,
			ShowComments = ShowComments,
			ShowViewers = ShowViewers,
			ShowLikes = ShowLikes,
			RandomHearts = RandomHearts,
			CommentLayout = CommentLayout,
			ViewerLayout = ViewerLayout
		}, JsonOpts);
		File.WriteAllText(_settingsPath, json);
	}

	public void SaveStreamSettings(string server, string? streamKey, int width, int height, int bitrateKbps)
	{
		StreamServer = server.Trim();
		if (!string.IsNullOrWhiteSpace(streamKey))
			StreamKey = streamKey.Trim();
		(StreamWidth, StreamHeight) = (width, height) switch
		{
			(720, 1280) => (720, 1280),
			_ => (1080, 1920)
		};
		StreamBitrateKbps = Math.Clamp(bitrateKbps, 800, 12000);
		WriteStreamSettings();
	}

	public void SaveRoomSettings(string user, string? signingKey)
	{
		TikTokUser = NormalizeUser(user);
		if (!string.IsNullOrWhiteSpace(signingKey))
			SigningKey = signingKey.Trim();
		WriteStreamSettings();
	}

	void WriteStreamSettings()
	{
		var json = JsonSerializer.Serialize(new StreamSettingsDto
		{
			Server = StreamServer,
			StreamKey = StreamKey,
			Width = StreamWidth,
			Height = StreamHeight,
			BitrateKbps = StreamBitrateKbps,
			TikTokUser = TikTokUser,
			SigningKey = SigningKey
		}, JsonOpts);
		File.WriteAllText(StreamSettingsPath, json);
	}

	void LoadSettings()
	{
		if (!File.Exists(_settingsPath))
			return;

		try
		{
			var settings = JsonSerializer.Deserialize<SettingsDto>(File.ReadAllText(_settingsPath), JsonOpts);
			ActiveScriptId = settings?.ActiveScriptId;
			if (settings?.Theme is "light" or "dark")
				Theme = settings.Theme;
			if (settings?.Language is "en" or "vi")
				Language = settings.Language;
			if (settings?.Ratio is "9:16" or "16:9" or "1:1")
				Ratio = settings.Ratio;
			if (settings?.ShowComments is bool comments)
				ShowComments = comments;
			if (settings?.ShowViewers is bool viewers)
				ShowViewers = viewers;
			if (settings?.ShowLikes is bool likes)
				ShowLikes = likes;
			if (settings?.RandomHearts is bool hearts)
				RandomHearts = hearts;
			if (settings?.CommentLayout is not null)
				CommentLayout = WidgetLayout.NormalizeComment(settings.CommentLayout);
			if (settings?.ViewerLayout is not null)
				ViewerLayout = WidgetLayout.NormalizeViewer(settings.ViewerLayout);
		}
		catch (JsonException)
		{
			ActiveScriptId = null;
		}
	}

	void LoadStreamSettings()
	{
		if (!File.Exists(StreamSettingsPath))
			return;

		try
		{
			var settings = JsonSerializer.Deserialize<StreamSettingsDto>(File.ReadAllText(StreamSettingsPath), JsonOpts);
			if (settings is null)
				return;
			StreamServer = settings.Server ?? "";
			StreamKey = settings.StreamKey ?? "";
			StreamWidth = settings.Width > 0 ? settings.Width : 1080;
			StreamHeight = settings.Height > 0 ? settings.Height : 1920;
			StreamBitrateKbps = settings.BitrateKbps > 0 ? settings.BitrateKbps : 4500;
			try
			{
				TikTokUser = NormalizeUser(settings.TikTokUser ?? "");
			}
			catch (InvalidOperationException)
			{
				TikTokUser = "";
			}
			SigningKey = settings.SigningKey ?? "";
		}
		catch (JsonException)
		{
			StreamServer = "";
			StreamKey = "";
		}
	}

	string ScriptPath(string id) => Path.Combine(ScriptsDirectory, id + ".json");

	string UniqueName(string fileName)
	{
		var name = Path.GetFileNameWithoutExtension(fileName);
		var ext = Path.GetExtension(fileName);
		var candidate = fileName;
		var index = 2;
		while (File.Exists(Path.Combine(MediaDirectory, candidate)))
		{
			candidate = $"{name}-{index}{ext}";
			index++;
		}

		return candidate;
	}

	string? SafeMediaPath(string fileName)
	{
		if (string.IsNullOrWhiteSpace(fileName) || fileName.IndexOfAny(['\\', '/', ':']) >= 0)
			return null;

		var root = Path.GetFullPath(MediaDirectory + Path.DirectorySeparatorChar);
		var path = Path.GetFullPath(Path.Combine(MediaDirectory, fileName));
		if (!path.StartsWith(root, StringComparison.OrdinalIgnoreCase))
			return null;

		return path;
	}

	static string SanitizeFileName(string name)
	{
		var file = Path.GetFileName(name);
		foreach (var invalid in Path.GetInvalidFileNameChars())
			file = file.Replace(invalid, '_');

		return string.IsNullOrWhiteSpace(file) ? "video.mp4" : file;
	}

	public static string NormalizeUser(string user)
	{
		var text = user.Trim().TrimStart('@');
		if (text.Length > 32)
			text = text[..32];
		if (text.Any(ch => !(char.IsAsciiLetterOrDigit(ch) || ch is '_' or '.')))
			throw new InvalidOperationException("Tài khoản TikTok chỉ gồm chữ, số, dấu chấm hoặc gạch dưới.");
		return text;
	}

	static bool IsSafeId(string id) =>
		id.Length is > 0 and <= 80 && id.All(ch => char.IsAsciiLetterOrDigit(ch) || ch is '-' or '_');

	static void Normalize(ShowScript script)
	{
		script.Name = string.IsNullOrWhiteSpace(script.Name) ? "Kịch bản" : script.Name.Trim();
		script.Mode = script.Mode is "continuous" or "segments" ? script.Mode : "segments";
		script.Fit = script.Fit is "contain" or "cover" ? script.Fit : "contain";
		script.Overlays ??= [];
		script.Scenes ??= [];
		script.Triggers ??= [];
		if (script.Triggers.Count > 40)
			script.Triggers = script.Triggers.Take(40).ToList();
		foreach (var rule in script.Triggers)
		{
			if (string.IsNullOrWhiteSpace(rule.Id))
				rule.Id = Guid.NewGuid().ToString("D");
			rule.Kind = rule.Kind == "gift" ? "gift" : "comment";
			rule.Match = (rule.Match ?? "").Trim();
			if (rule.Match.Length > 80)
				rule.Match = rule.Match[..80];
			rule.VideoFile = Path.GetFileName(rule.VideoFile ?? "");
			if (rule.EndSec is < 0)
				rule.EndSec = null;
			if (rule.StartSec < 0)
				rule.StartSec = 0;
		}
		foreach (var overlay in script.Overlays)
			NormalizeOverlay(overlay);
		foreach (var scene in script.Scenes)
		{
			scene.Title = string.IsNullOrWhiteSpace(scene.Title) ? "Cảnh" : scene.Title.Trim();
			scene.VideoFile = Path.GetFileName(scene.VideoFile ?? "");
			scene.Overlays ??= [];
			if (scene.EndSec is < 0)
				scene.EndSec = null;
			foreach (var overlay in scene.Overlays)
				NormalizeOverlay(overlay);
		}
	}

	static void NormalizeOverlay(OverlayItem overlay)
	{
		overlay.Text ??= "";
		overlay.FontSize = Math.Clamp(overlay.FontSize, 12, 160);
		overlay.Color = string.IsNullOrWhiteSpace(overlay.Color) ? "#FFFFFF" : overlay.Color;
		overlay.Align = overlay.Align is "left" or "center" or "right" ? overlay.Align : "left";
		overlay.Bg ??= "transparent";
		overlay.X = Math.Clamp(overlay.X, 0, 100);
		overlay.Y = Math.Clamp(overlay.Y, 0, 100);
	}

	static ShowScript CreateSample() => new()
	{
		Id = Guid.NewGuid().ToString("D"),
		Name = "Kịch bản mẫu",
		Mode = "segments",
		Loop = true,
		Fit = "contain",
		ShowLiveBadge = true,
		Overlays =
		[
			new OverlayItem
			{
				Id = Guid.NewGuid().ToString("D"),
				Text = "{weekday}, {date}",
				X = 5,
				Y = 8,
				FontSize = 22,
				Color = "#FFFFFF",
				Align = "left",
				Bold = true,
				Bg = "rgba(0,0,0,0.45)"
			},
			new OverlayItem
			{
				Id = Guid.NewGuid().ToString("D"),
				Text = "{time}",
				X = 5,
				Y = 16,
				FontSize = 40,
				Color = "#FFE08A",
				Align = "left",
				Bold = true,
				Bg = "rgba(0,0,0,0.45)"
			}
		]
	};

	sealed class SettingsDto
	{
		public string? ActiveScriptId { get; set; }
		public string? Theme { get; set; }
		public string? Language { get; set; }
		public string? Ratio { get; set; }
		public bool? ShowComments { get; set; }
		public bool? ShowViewers { get; set; }
		public bool? ShowLikes { get; set; }
		public bool? RandomHearts { get; set; }
		public WidgetLayout? CommentLayout { get; set; }
		public WidgetLayout? ViewerLayout { get; set; }
	}

	sealed class StreamSettingsDto
	{
		public string? Server { get; set; }
		public string? StreamKey { get; set; }
		public int Width { get; set; }
		public int Height { get; set; }
		public int BitrateKbps { get; set; }
		public string? TikTokUser { get; set; }
		public string? SigningKey { get; set; }
	}
}

public sealed class WidgetLayout
{
	public double X { get; set; }
	public double Y { get; set; }
	public double Width { get; set; }
	public double Height { get; set; }
	public double Scale { get; set; } = 100;

	public static WidgetLayout Comment() => new()
	{
		X = 4,
		Y = 4,
		Width = 78,
		Height = 46,
		Scale = 100
	};

	public static WidgetLayout Viewer() => new()
	{
		X = 4,
		Y = 3.2,
		Scale = 100
	};

	public static WidgetLayout NormalizeComment(WidgetLayout value) => new()
	{
		X = Clamp(value.X, 0, 90, 4),
		Y = Clamp(value.Y, 0, 80, 4),
		Width = Clamp(value.Width, 18, 100, 78),
		Height = Clamp(value.Height, 12, 80, 46),
		Scale = Clamp(value.Scale, 40, 250, 100)
	};

	public static WidgetLayout NormalizeViewer(WidgetLayout value) => new()
	{
		X = Clamp(value.X, 0, 90, 4),
		Y = Clamp(value.Y, 0, 90, 3.2),
		Scale = Clamp(value.Scale, 40, 250, 100)
	};

	static double Clamp(double value, double min, double max, double fallback)
	{
		if (double.IsNaN(value) || double.IsInfinity(value))
			return fallback;
		return Math.Clamp(value, min, max);
	}
}
