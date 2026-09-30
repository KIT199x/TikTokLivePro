using System.Text.Json;
using Microsoft.Web.WebView2.Core;
using TikTokLivePro.Models;
using TikTokLivePro.Services;

namespace TikTokLivePro;

public partial class MainPage : ContentPage
{
	readonly StudioStore _store = new();
	readonly LiveStreamService _live = new();
	readonly LiveRoomService _room = new();
	readonly SemaphoreSlim _gate = new(1, 1);
	readonly Task _initTask;
	OutputServer? _output;
	bool _stopHooked;
	CoreWebView2? _core;
	bool _attached;

	static readonly JsonSerializerOptions JsonOpts = new()
	{
		PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
		PropertyNameCaseInsensitive = true
	};

	public MainPage()
	{
		InitializeComponent();
		_live.StatusChanged += (state, message) => Post(new { type = "stream", state, message });
		_room.StatusChanged += (state, message) => Post(new { type = "room", state, message });
		_room.ViewersChanged += count => Post(new { type = "viewers", count });
		_room.LikesReceived += (id, count) => Post(new { type = "likes", id, count });
		_room.EventReceived += viewerEvent => Post(new
		{
			type = "liveEvent",
			kind = viewerEvent.Kind,
			user = viewerEvent.User,
			text = viewerEvent.Text,
			gift = viewerEvent.Gift,
			giftId = viewerEvent.GiftId,
			amount = viewerEvent.Amount
		});
		_initTask = InitializeStoreAsync();
		StudioView.HandlerChanged += (_, _) => _ = AttachAsync();
	}

	protected override void OnAppearing()
	{
		base.OnAppearing();
		if (_stopHooked || Window is null)
			return;
		_stopHooked = true;
		Window.Destroying += (_, _) =>
		{
			_live.Stop();
			_ = _room.StopAsync();
			_output?.Dispose();
		};
	}

	async Task InitializeStoreAsync()
	{
		try
		{
			await _store.InitializeAsync();
		}
		catch (Exception ex)
		{
			ShowError("Không mở được thư mục studio.\n" + ex.Message);
		}
	}

	async Task AttachAsync()
	{
#if WINDOWS
		if (_attached)
			return;
		if (StudioView.Handler?.PlatformView is not Microsoft.UI.Xaml.Controls.WebView2 web)
			return;

		_attached = true;
		try
		{
			await _initTask;
			var userData = Path.Combine(FileSystem.AppDataDirectory, "webview2");
			Directory.CreateDirectory(userData);
			var options = new CoreWebView2EnvironmentOptions
			{
				AdditionalBrowserArguments = "--disable-direct-composition --disable-gpu-compositing --disable-features=DirectCompositionVideoOverlays"
			};
			var environment = await CoreWebView2Environment.CreateWithOptionsAsync(null, userData, options);
			await web.EnsureCoreWebView2Async(environment);
			web.DefaultBackgroundColor = global::Windows.UI.Color.FromArgb(255, 16, 14, 12);

			_core = web.CoreWebView2;
			_core.Settings.IsStatusBarEnabled = false;
			_core.Settings.AreDevToolsEnabled = true;
			_core.Settings.IsZoomControlEnabled = false;
			_core.Settings.IsSwipeNavigationEnabled = false;
			_core.Settings.AreDefaultContextMenusEnabled = false;
			_core.NewWindowRequested += (_, args) => args.Handled = true;
			_core.SetVirtualHostNameToFolderMapping(
				"livescript.local",
				_store.HostDirectory,
				CoreWebView2HostResourceAccessKind.Allow);
			_core.Settings.IsWebMessageEnabled = true;
			_core.WebMessageReceived += (sender, args) =>
			{
				string json;
				try
				{
					json = args.WebMessageAsJson;
				}
				catch (Exception ex)
				{
					Post(new { type = "error", message = ex.Message });
					return;
				}

				MainThread.BeginInvokeOnMainThread(() => DispatchMessage(json));
			};
			var platformWindow = Application.Current?.Windows.FirstOrDefault()?.Handler?.PlatformView as Microsoft.UI.Xaml.Window;
			if (platformWindow is not null)
				StageWindow.Attach(platformWindow);
			try
			{
				_output = OutputServer.Start(_store.HostDirectory, _store.MediaDirectory);
			}
			catch (Exception ex)
			{
				ShowError("Không mở được cổng phát luồng.\n" + ex.Message);
			}
			var stamp = DateTime.UtcNow.Ticks;
			var page = _output is null
				? $"https://livescript.local/index.html?v={stamp}"
				: $"http://127.0.0.1:{_output.Port}/index.html?v={stamp}";
			_core.Navigate(page);
		}
		catch (Exception ex)
		{
			_attached = false;
			ShowError("Không khởi tạo được WebView2.\n" + ex.Message);
		}
#else
		ShowError("Bản này dùng WebView2 trên Windows.");
		await Task.CompletedTask;
#endif
	}

	void DispatchMessage(string json)
	{
		try
		{
			using var doc = JsonDocument.Parse(json);
			var type = doc.RootElement.TryGetProperty("type", out var typeElement) ? typeElement.GetString() : null;
			if (type == "pickVideos")
			{
				_ = PickVideosAsync();
				return;
			}
			if (type == "setCapture")
			{
				var on = doc.RootElement.TryGetProperty("on", out var onElement) && onElement.ValueKind == JsonValueKind.True;
				StageWindow.SetStage(on);
				return;
			}
			if (type is "startStream" or "stopStream" or "saveStream")
			{
				_ = HandleStreamAsync(type, json);
				return;
			}
			if (type is "startRoom" or "stopRoom" or "saveRoom")
			{
				_ = HandleRoomAsync(type, json);
				return;
			}
		}
		catch (Exception ex)
		{
			Post(new { type = "error", message = ex.Message });
			return;
		}

		_ = HandleMessageAsync(json);
	}

	async Task HandleMessageAsync(string json)
	{
		await _gate.WaitAsync();
		try
		{
			using var doc = JsonDocument.Parse(json);
			var root = doc.RootElement;
			var type = root.TryGetProperty("type", out var typeElement) ? typeElement.GetString() : null;
			switch (type)
			{
				case "ready":
					PostState();
					break;
				case "deleteVideo":
					DeleteVideo(root);
					break;
				case "saveScript":
					SaveScript(root);
					break;
				case "deleteScript":
					DeleteScript(root);
					break;
				case "setActive":
					SetActive(root);
					break;
				case "savePrefs":
					SavePrefs(root);
					break;
			}
		}
		catch (Exception ex)
		{
			Post(new { type = "error", message = ex.Message });
		}
		finally
		{
			_gate.Release();
		}
	}

	async Task PickVideosAsync()
	{
		try
		{
			var paths = await MainThread.InvokeOnMainThreadAsync(ShowVideoPickerAsync);
			if (paths.Count == 0)
				return;

			Post(new { type = "status", message = paths.Count == 1 ? "Đang thêm video…" : $"Đang thêm {paths.Count} video…" });
			var (added, skipped) = await _store.ImportPathsAsync(paths);
			var notice = added == 0
				? "Không thêm được video. Hãy chọn file MP4, WebM, MOV, M4V hoặc MKV."
				: skipped > 0
					? $"Đã thêm {added} video, bỏ qua {skipped} file."
					: $"Đã thêm {added} video.";
			Post(new { type = "videos", videos = _store.ListVideos(), notice });
		}
		catch (Exception ex)
		{
			Post(new { type = "error", message = "Không mở được hộp thoại chọn video. " + ex.Message });
		}
	}

	static async Task<List<string>> ShowVideoPickerAsync()
	{
		var picker = new Windows.Storage.Pickers.FileOpenPicker
		{
			ViewMode = Windows.Storage.Pickers.PickerViewMode.Thumbnail,
			SuggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.VideosLibrary
		};
		foreach (var ext in new[] { ".mp4", ".webm", ".mov", ".m4v", ".mkv" })
			picker.FileTypeFilter.Add(ext);

		var platformWindow = Application.Current?.Windows.FirstOrDefault()?.Handler?.PlatformView as Microsoft.UI.Xaml.Window
			?? throw new InvalidOperationException("Cửa sổ ứng dụng chưa sẵn sàng.");
		WinRT.Interop.InitializeWithWindow.Initialize(picker, WinRT.Interop.WindowNative.GetWindowHandle(platformWindow));

		var files = await picker.PickMultipleFilesAsync();
		if (files is null || files.Count == 0)
			return [];

		return files
			.Select(file => file.Path)
			.Where(path => !string.IsNullOrWhiteSpace(path))
			.ToList();
	}

	async Task HandleRoomAsync(string type, string json)
	{
		try
		{
			if (type == "stopRoom")
			{
				await _room.StopAsync();
				return;
			}

			using var doc = JsonDocument.Parse(json);
			var root = doc.RootElement;
			var user = root.TryGetProperty("user", out var userElement) ? userElement.GetString() ?? "" : "";
			var key = root.TryGetProperty("signingKey", out var keyElement) ? keyElement.GetString() : null;
			_store.SaveRoomSettings(user, key);
			if (type == "saveRoom")
				return;

			_room.ClientLanguage = _store.Language == "en" ? "en-US" : "vi-VN";
			await _room.StartAsync(_store.TikTokUser, _store.SigningKey);
		}
		catch (Exception ex)
		{
			Post(new { type = "room", state = "error", message = ex.Message });
			Post(new { type = "error", message = ex.Message });
		}
	}

	async Task HandleStreamAsync(string type, string json)
	{
		try
		{
			using var doc = JsonDocument.Parse(json);
			var root = doc.RootElement;
			if (type == "stopStream")
			{
				_live.Stop();
				return;
			}

			SaveStream(root);
			if (type == "saveStream")
				return;

			var script = root.GetProperty("script").Deserialize<ShowScript>(JsonOpts)
				?? throw new InvalidOperationException("Kịch bản trống.");
			var typedKey = root.TryGetProperty("streamKey", out var keyElement) ? keyElement.GetString() : null;
			var key = string.IsNullOrWhiteSpace(typedKey) ? _store.StreamKey : typedKey.Trim();
			if (string.IsNullOrWhiteSpace(key) && !ServerAlreadyIncludesKey(_store.StreamServer))
				throw new InvalidOperationException("Hãy dán stream key.");
			var stageWidth = root.TryGetProperty("stageWidth", out var widthElement) ? widthElement.GetInt32() : 0;
			var stageHeight = root.TryGetProperty("stageHeight", out var heightElement) ? heightElement.GetInt32() : 0;
			await _live.StartAsync(
				script,
				_store.StreamServer,
				key,
				_store.StreamWidth,
				_store.StreamHeight,
				_store.StreamBitrateKbps,
				stageWidth,
				stageHeight,
				_store.MediaDirectory);
		}
		catch (Exception ex)
		{
			Post(new { type = "stream", state = "error", message = ex.Message });
			Post(new { type = "error", message = ex.Message });
		}
	}

	static bool ServerAlreadyIncludesKey(string server)
	{
		var scheme = server.IndexOf("://", StringComparison.Ordinal);
		if (scheme < 0)
			return false;
		return server[(scheme + 3)..].Count(ch => ch == '/') >= 2;
	}

	void SaveStream(JsonElement root)
	{
		var server = root.TryGetProperty("server", out var serverElement) ? serverElement.GetString() ?? "" : "";
		var key = root.TryGetProperty("streamKey", out var keyElement) ? keyElement.GetString() : null;
		var width = root.TryGetProperty("width", out var widthElement) ? widthElement.GetInt32() : 1080;
		var height = root.TryGetProperty("height", out var heightElement) ? heightElement.GetInt32() : 1920;
		var bitrate = root.TryGetProperty("bitrate", out var bitrateElement) ? bitrateElement.GetInt32() : 4500;
		_store.SaveStreamSettings(server, key, width, height, bitrate);
	}

	void DeleteVideo(JsonElement root)
	{
		var name = root.TryGetProperty("fileName", out var nameElement) ? nameElement.GetString() ?? "" : "";
		_store.DeleteVideo(name);
		Post(new { type = "videos", videos = _store.ListVideos() });
	}

	void SaveScript(JsonElement root)
	{
		var script = root.GetProperty("script").Deserialize<ShowScript>(JsonOpts)
			?? throw new InvalidOperationException("Kịch bản trống.");
		_store.SaveScript(script);
		if (root.TryGetProperty("activeScriptId", out var active) && active.ValueKind == JsonValueKind.String)
			_store.SetActive(active.GetString());
	}

	void DeleteScript(JsonElement root)
	{
		var id = root.TryGetProperty("id", out var idElement) ? idElement.GetString() : null;
		if (!string.IsNullOrWhiteSpace(id))
			_store.DeleteScript(id);
	}

	void SetActive(JsonElement root)
	{
		var id = root.TryGetProperty("id", out var idElement) ? idElement.GetString() : null;
		_store.SetActive(id);
	}

	void SavePrefs(JsonElement root)
	{
		var theme = root.TryGetProperty("theme", out var themeElement) ? themeElement.GetString() : null;
		var language = root.TryGetProperty("lang", out var langElement) ? langElement.GetString() : null;
		var ratio = root.TryGetProperty("ratio", out var ratioElement) ? ratioElement.GetString() : null;
		bool? showComments = root.TryGetProperty("showComments", out var commentsElement) &&
			(commentsElement.ValueKind is JsonValueKind.True or JsonValueKind.False)
			? commentsElement.GetBoolean()
			: null;
		bool? showViewers = root.TryGetProperty("showViewers", out var viewersElement) &&
			(viewersElement.ValueKind is JsonValueKind.True or JsonValueKind.False)
			? viewersElement.GetBoolean()
			: null;
		bool? showLikes = root.TryGetProperty("showLikes", out var likesElement) &&
			(likesElement.ValueKind is JsonValueKind.True or JsonValueKind.False)
			? likesElement.GetBoolean()
			: null;
		bool? randomHearts = root.TryGetProperty("randomHearts", out var randomElement) &&
			(randomElement.ValueKind is JsonValueKind.True or JsonValueKind.False)
			? randomElement.GetBoolean()
			: null;
		int? heartRate = null;
		if (root.TryGetProperty("heartRate", out var rateElement))
		{
			if (rateElement.TryGetInt32(out var rate))
				heartRate = rate;
			else if (rateElement.TryGetDouble(out var rateNumber))
				heartRate = (int)Math.Round(rateNumber);
		}
		_store.SavePrefs(theme, language, ratio, showComments, showViewers, showLikes, ReadWidget(root, "commentLayout"), ReadWidget(root, "viewerLayout"), randomHearts, heartRate);
	}

	void PostState()
	{
		Post(new
		{
			type = "state",
			videos = _store.ListVideos(),
			scripts = _store.LoadScripts(),
			activeScriptId = _store.ActiveScriptId,
			stream = new
			{
				server = _store.StreamServer,
				hasKey = !string.IsNullOrWhiteSpace(_store.StreamKey),
				width = _store.StreamWidth,
				height = _store.StreamHeight,
				bitrate = _store.StreamBitrateKbps,
				running = _live.IsRunning
			},
			room = new
			{
				user = _store.TikTokUser,
				hasKey = !string.IsNullOrWhiteSpace(_store.SigningKey),
				running = _room.IsRunning
			},
			outputUrl = _output?.OutputUrl ?? "",
			prefs = new
			{
				theme = _store.Theme,
				language = _store.Language,
				ratio = _store.Ratio,
				showComments = _store.ShowComments,
				showViewers = _store.ShowViewers,
				showLikes = _store.ShowLikes,
				randomHearts = _store.RandomHearts,
				heartRate = _store.HeartRate,
				commentLayout = _store.CommentLayout,
				viewerLayout = _store.ViewerLayout
			}
		});
	}

	static WidgetLayout? ReadWidget(JsonElement root, string name)
	{
		if (!root.TryGetProperty(name, out var element) || element.ValueKind != JsonValueKind.Object)
			return null;
		double Num(string key)
		{
			if (!element.TryGetProperty(key, out var value))
				return double.NaN;
			return value.TryGetDouble(out var number) ? number : double.NaN;
		}
		return new WidgetLayout
		{
			X = Num("x"),
			Y = Num("y"),
			Width = Num("width"),
			Height = Num("height"),
			Scale = Num("scale")
		};
	}

	void Post(object payload)
	{
		var json = JsonSerializer.Serialize(payload, JsonOpts);
		MainThread.BeginInvokeOnMainThread(() => _core?.PostWebMessageAsJson(json));
	}

	void ShowError(string message)
	{
		MainThread.BeginInvokeOnMainThread(() =>
		{
			ErrorLabel.Text = message;
			ErrorLabel.IsVisible = true;
		});
	}
}
