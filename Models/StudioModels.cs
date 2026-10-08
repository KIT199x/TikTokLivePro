namespace TikTokLivePro.Models;

public sealed class ShowScript
{
	public string Id { get; set; } = "";
	public string Name { get; set; } = "Kịch bản mới";
	public string Mode { get; set; } = "segments";
	public bool Loop { get; set; } = true;
	public string Fit { get; set; } = "contain";
	public bool ShowLiveBadge { get; set; } = true;
	public List<OverlayItem> Overlays { get; set; } = [];
	public List<SceneItem> Scenes { get; set; } = [];
	public List<TriggerRule> Triggers { get; set; } = [];
}

public sealed class TriggerRule
{
	public string Id { get; set; } = "";
	public string Kind { get; set; } = "comment";
	public string Match { get; set; } = "";
	public string VideoFile { get; set; } = "";
	public double StartSec { get; set; }
	public double? EndSec { get; set; }
}

public sealed class SceneItem
{
	public string Id { get; set; } = "";
	public string Title { get; set; } = "Cảnh";
	public string VideoFile { get; set; } = "";
	public double StartSec { get; set; }
	public double? EndSec { get; set; }
	public List<OverlayItem> Overlays { get; set; } = [];
}

public sealed class OverlayItem
{
	public string Id { get; set; } = "";
	public string Text { get; set; } = "";
	public double X { get; set; } = 6;
	public double Y { get; set; } = 6;
	public int FontSize { get; set; } = 28;
	public string Color { get; set; } = "#FFFFFF";
	public string Align { get; set; } = "left";
	public bool Bold { get; set; } = true;
	public string Bg { get; set; } = "rgba(0,0,0,0.45)";
}

public sealed class VoiceSettings
{
	public bool Greet { get; set; } = true;
	public bool ReadComments { get; set; }
	public string ReadTemplate { get; set; } = "{name} bình luận: {comment}";
	public bool Reply { get; set; }
	public bool QuestionsOnly { get; set; } = true;
	public int CooldownSec { get; set; } = 5;
	public string ReplyTemplate { get; set; } = "{name} ơi, {reply}";
	public List<ReplyRule> Rules { get; set; } = [];
	public bool AiEnabled { get; set; }
	public string AiBaseUrl { get; set; } = "https://api.openai.com/v1";
	public string AiModel { get; set; } = "gpt-4o-mini";
	public string Persona { get; set; } = "Bạn là người dẫn livestream TikTok thân thiện, vui vẻ, lễ phép, xưng \"em\" và gọi người xem là \"anh chị\" hoặc \"bạn\".";
	public string Knowledge { get; set; } = "";

	public void Normalize()
	{
		ReadTemplate = Trim(ReadTemplate, 200);
		if (!ReadTemplate.Contains("{comment}", StringComparison.Ordinal))
			ReadTemplate = "{name} bình luận: {comment}";
		ReplyTemplate = Trim(ReplyTemplate, 200);
		if (!ReplyTemplate.Contains("{reply}", StringComparison.Ordinal))
			ReplyTemplate = "{name} ơi, {reply}";
		CooldownSec = Math.Clamp(CooldownSec, 0, 120);
		Rules = (Rules ?? [])
			.Where(rule => !string.IsNullOrWhiteSpace(rule.Keywords) && !string.IsNullOrWhiteSpace(rule.Reply))
			.Take(100)
			.Select(rule => new ReplyRule { Keywords = Trim(rule.Keywords, 200), Reply = Trim(rule.Reply, 300) })
			.ToList();
		AiBaseUrl = Uri.TryCreate((AiBaseUrl ?? "").Trim(), UriKind.Absolute, out var uri) && uri.Scheme is "http" or "https"
			? uri.ToString().TrimEnd('/')
			: "https://api.openai.com/v1";
		AiModel = string.IsNullOrWhiteSpace(AiModel) ? "gpt-4o-mini" : Trim(AiModel, 100);
		Persona = Trim(Persona, 2000);
		Knowledge = Trim(Knowledge, 6000);
	}

	static string Trim(string? value, int max)
	{
		var text = (value ?? "").Trim();
		return text.Length > max ? text[..max] : text;
	}
}

public sealed class ReplyRule
{
	public string Keywords { get; set; } = "";
	public string Reply { get; set; } = "";
}

public sealed class VideoDto
{
	public string FileName { get; init; } = "";
	public string DisplayName { get; init; } = "";
	public long SizeBytes { get; init; }
	public string Url { get; init; } = "";
}
