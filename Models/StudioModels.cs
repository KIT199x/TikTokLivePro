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

public sealed class VideoDto
{
	public string FileName { get; init; } = "";
	public string DisplayName { get; init; } = "";
	public long SizeBytes { get; init; }
	public string Url { get; init; } = "";
}
