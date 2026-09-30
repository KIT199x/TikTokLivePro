using TikTokLiveSharp.Client;
using TikTokLiveSharp.Client.Config;
using TikTokLiveSharp.Events;
using TikTokLiveSharp.Events.Objects;

namespace TikTokLivePro.Services;

public sealed class LiveRoomService
{
	readonly object _gate = new();
	TikTokLiveClient? _client;
	CancellationTokenSource? _cts;
	int _generation;
	string _signingKey = "";
	string _hostId = "";
	readonly Dictionary<string, long> _joinSeen = new();

	public bool IsRunning { get; private set; }
	public string ClientLanguage { get; set; } = "vi-VN";
	public event Action<string, string>? StatusChanged;
	public event Action<ViewerEvent>? EventReceived;
	public event Action<long?>? ViewersChanged;
	public event Action<string, int>? LikesReceived;
	bool _viewerKnown;
	long? _viewerValue;

	public async Task StartAsync(string username, string? signingKey)
	{
		await CloseAsync(announce: false);
		var user = username.Trim().TrimStart('@');
		if (string.IsNullOrWhiteSpace(user))
			throw new InvalidOperationException("room.needuser");

		_signingKey = signingKey?.Trim() ?? "";
		_hostId = user;
		lock (_gate)
			_joinSeen.Clear();
		var generation = ++_generation;
		var cts = new CancellationTokenSource();
		var settings = new ClientSettings
		{
			Timeout = 20,
			ReconnectInterval = 2,
			PollingInterval = 1,
			EnableCompression = true,
			ClientLanguage = ClientLanguage == "en-US" ? "en-US" : "vi-VN",
			SocketBufferSize = 10_000,
			RetryOnConnectionFailure = false,
			HandleExistingMessagesOnConnect = false,
			DownloadGiftInfo = true,
			PrintToConsole = false,
			SigningKey = string.IsNullOrWhiteSpace(_signingKey) ? null : _signingKey
		};
		var client = new TikTokLiveClient(user, null, settings);
		lock (_gate)
		{
			_client = client;
			_cts = cts;
		}

		client.OnConnected += HandleConnected;
		client.OnDisconnected += HandleDisconnected;
		client.OnLiveEnded += HandleLiveEnded;
		client.OnChatMessage += HandleChat;
		client.OnGift += HandleGift;
		client.OnJoin += HandleJoin;
		client.OnRoomUpdate += HandleRoomUpdate;
		client.OnLike += HandleLike;
		Report("connecting", "room.connecting");

		try
		{
			var roomId = await client.Start(cts.Token, error =>
			{
				if (generation == _generation)
					Report("error", Explain(error));
			});
			if (generation != _generation)
				return;
			if (string.IsNullOrWhiteSpace(roomId))
			{
				if (!cts.IsCancellationRequested)
					Report("error", "room.unreachable");
				await CloseAsync(announce: false);
				return;
			}

			IsRunning = true;
			Report("live", "room.listening");
			if (client.ViewerCount is long initial)
				PublishViewers(initial);
		}
		catch (Exception ex) when (ex is not OperationCanceledException)
		{
			if (generation == _generation)
			{
				await CloseAsync(announce: false);
				Report("error", Explain(ex));
			}
		}
	}

	public Task StopAsync() => CloseAsync(announce: true);

	async Task CloseAsync(bool announce)
	{
		TikTokLiveClient? client;
		CancellationTokenSource? cts;
		lock (_gate)
		{
			_generation++;
			client = _client;
			cts = _cts;
			_client = null;
			_cts = null;
			IsRunning = false;
		}

		if (client is not null)
		{
			client.OnConnected -= HandleConnected;
			client.OnDisconnected -= HandleDisconnected;
			client.OnLiveEnded -= HandleLiveEnded;
			client.OnChatMessage -= HandleChat;
			client.OnGift -= HandleGift;
			client.OnJoin -= HandleJoin;
			client.OnRoomUpdate -= HandleRoomUpdate;
			client.OnLike -= HandleLike;
		}

		cts?.Cancel();
		if (client is not null)
		{
			try
			{
				await client.Stop();
			}
			catch (Exception)
			{
			}
		}

		cts?.Dispose();
		ResetViewers();
		if (announce)
			Report("idle", "room.stopped");
	}

	void HandleConnected(TikTokLiveClient sender, bool connected)
	{
		if (!connected)
			return;
		IsRunning = true;
		Report("live", "room.listening");
	}

	void HandleDisconnected(TikTokLiveClient sender, bool connected)
	{
		if (IsRunning)
		{
			IsRunning = false;
			Report("idle", "room.lost");
		}
		ResetViewers();
	}

	void HandleLiveEnded(TikTokLiveClient sender, ControlMessage message)
	{
		IsRunning = false;
		ResetViewers();
		Report("ended", "room.ended");
	}

	void HandleChat(TikTokLiveClient sender, Chat chat)
	{
		var text = chat.Message?.Trim() ?? "";
		if (text.Length == 0)
			return;
		EventReceived?.Invoke(new ViewerEvent("comment", Display(chat.Sender), text, "", 0, 0));
	}

	void HandleGift(TikTokLiveClient sender, TikTokGift gift)
	{
		var name = gift.Gift?.Name?.Trim() ?? "";
		if (name.Length == 0)
			return;
		var amount = gift.Amount < 1 ? 1 : gift.Amount;
		EventReceived?.Invoke(new ViewerEvent("gift", Display(gift.Sender), "", name, gift.Gift?.Id ?? 0, amount));
	}

	void HandleLike(TikTokLiveClient sender, Like like)
	{
		var count = like.Count < 1 ? 1 : like.Count;
		if (count > 8) count = 8;
		LikesReceived?.Invoke(Guid.NewGuid().ToString("N"), (int)count);
	}

	void HandleRoomUpdate(TikTokLiveClient sender, RoomUpdate update) =>
		PublishViewers(update.NumberOfViewers);

	void PublishViewers(long? count)
	{
		if (count is < 0)
			count = null;
		if (_viewerKnown && _viewerValue == count)
			return;
		_viewerKnown = true;
		_viewerValue = count;
		ViewersChanged?.Invoke(count);
	}

	void ResetViewers()
	{
		if (!_viewerKnown && _viewerValue is null)
			return;
		_viewerKnown = false;
		_viewerValue = null;
		ViewersChanged?.Invoke(null);
	}

	void HandleJoin(TikTokLiveClient sender, Join join)
	{
		if (string.Equals(join.User?.UniqueId, _hostId, StringComparison.OrdinalIgnoreCase))
			return;
		var name = Display(join.User);
		var key = string.IsNullOrWhiteSpace(join.User?.UniqueId) ? name : join.User.UniqueId;
		var now = Environment.TickCount64;
		lock (_gate)
		{
			if (_joinSeen.TryGetValue(key, out var seen) && now - seen < 25_000)
				return;
			_joinSeen[key] = now;
			if (_joinSeen.Count > 400)
			{
				foreach (var stale in _joinSeen.Where(pair => now - pair.Value > 60_000).Select(pair => pair.Key).ToList())
					_joinSeen.Remove(stale);
			}
		}
		EventReceived?.Invoke(new ViewerEvent("join", name, "", "", 0, 0));
	}

	static string Display(User? user)
	{
		if (!string.IsNullOrWhiteSpace(user?.NickName))
			return user!.NickName;
		if (!string.IsNullOrWhiteSpace(user?.UniqueId))
			return user!.UniqueId;
		return "";
	}

	string Explain(Exception ex)
	{
		if (ex.GetType().Name.Contains("LiveNotFound", StringComparison.Ordinal))
			return "room.notlive";

		var text = ex.GetBaseException().Message ?? "";
		if (!string.IsNullOrEmpty(_signingKey))
			text = text.Replace(_signingKey, "••••", StringComparison.Ordinal);
		if (text.Length > 180)
			text = text[..180];
		return string.IsNullOrWhiteSpace(text) ? "room.unreachable" : "room.fail|" + text;
	}

	void Report(string state, string message) => StatusChanged?.Invoke(state, message);
}

public sealed record ViewerEvent(string Kind, string User, string Text, string Gift, long GiftId, long Amount);
