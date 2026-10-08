using System.Net;
using System.Text;

namespace TikTokLivePro.Services;

public sealed class OutputServer : IDisposable
{
	static readonly HttpClient Speech = CreateSpeechClient();
	readonly Dictionary<string, byte[]> _speechCache = new(StringComparer.Ordinal);
	readonly HttpListener _listener = new();
	readonly CancellationTokenSource _cts = new();
	readonly string _root;
	readonly string _media;
	readonly string _apiBase;
	readonly object _gate = new();
	OutputView? _view;
	string _program = """{"file":"","time":0,"playing":false,"fit":"contain","badge":false,"overlays":[],"queue":[],"stageWidth":1080}""";

	public int Port { get; }

	// LIVE Studio rejects a raw IP. This name resolves to 127.0.0.1 and matches its URL check.
	public string OutputUrl => $"http://127.0.0.1.nip.io:{Port}/?output=1";

	OutputServer(string root, string media, string apiBase, int port)
	{
		_root = root;
		_media = media;
		_apiBase = apiBase.TrimEnd('/');
		Port = port;
		_listener.Prefixes.Add($"http://127.0.0.1:{port}/");
	}

	public static OutputServer Start(string root, string media, string apiBase)
	{
		Exception? last = null;
		for (var port = 8766; port <= 8776; port++)
		{
			try
			{
				var server = new OutputServer(root, media, apiBase, port);
				server._listener.Start();
				_ = server.LoopAsync(server._cts.Token);
				return server;
			}
			catch (Exception ex) when (ex is HttpListenerException or InvalidOperationException)
			{
				last = ex;
			}
		}

		throw new InvalidOperationException("Không mở được cổng phát luồng.", last);
	}

	public void Dispose()
	{
		_cts.Cancel();
		try
		{
			_listener.Stop();
		}
		catch (ObjectDisposedException)
		{
		}
		_listener.Close();
		_cts.Dispose();
	}

	async Task LoopAsync(CancellationToken token)
	{
		while (!token.IsCancellationRequested)
		{
			HttpListenerContext context;
			try
			{
				context = await _listener.GetContextAsync();
			}
			catch (Exception) when (token.IsCancellationRequested || !_listener.IsListening)
			{
				break;
			}
			catch (HttpListenerException)
			{
				break;
			}

			_ = HandleAsync(context);
		}
	}

	async Task HandleAsync(HttpListenerContext context)
	{
		var response = context.Response;
		try
		{
			response.Headers["Access-Control-Allow-Origin"] = "*";
			response.Headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS";
			response.Headers["Access-Control-Allow-Headers"] = "Content-Type";
			var path = Uri.UnescapeDataString(context.Request.Url?.AbsolutePath ?? "/");
			if (context.Request.HttpMethod == "OPTIONS")
			{
				response.StatusCode = 204;
				return;
			}

			if (path.Equals("/api/program", StringComparison.OrdinalIgnoreCase))
			{
				await HandleProgramAsync(context);
				return;
			}

			if (path.Equals("/api/tts", StringComparison.OrdinalIgnoreCase))
			{
				await HandleSpeechAsync(context);
				return;
			}

			if (path is "/" or "/index.html")
			{
				await SendFileAsync(response, Path.Combine(_root, "index.html"), "text/html; charset=utf-8", context.Request);
				return;
			}

			if (path.Equals("/studio.css", StringComparison.OrdinalIgnoreCase))
			{
				await SendFileAsync(response, Path.Combine(_root, "studio.css"), "text/css; charset=utf-8", context.Request);
				return;
			}

			if (path.Equals("/studio.js", StringComparison.OrdinalIgnoreCase))
			{
				await SendFileAsync(response, Path.Combine(_root, "studio.js"), "text/javascript; charset=utf-8", context.Request);
				return;
			}

			if (path.Equals("/jquery.min.js", StringComparison.OrdinalIgnoreCase))
			{
				await SendFileAsync(response, Path.Combine(_root, "jquery.min.js"), "text/javascript; charset=utf-8", context.Request);
				return;
			}

			if (path.Equals("/select2.min.js", StringComparison.OrdinalIgnoreCase))
			{
				await SendFileAsync(response, Path.Combine(_root, "select2.min.js"), "text/javascript; charset=utf-8", context.Request);
				return;
			}

			if (path.Equals("/select2.min.css", StringComparison.OrdinalIgnoreCase))
			{
				await SendFileAsync(response, Path.Combine(_root, "select2.min.css"), "text/css; charset=utf-8", context.Request);
				return;
			}

			if (path.Equals("/sweetalert2.all.min.js", StringComparison.OrdinalIgnoreCase))
			{
				await SendFileAsync(response, Path.Combine(_root, "sweetalert2.all.min.js"), "text/javascript; charset=utf-8", context.Request);
				return;
			}

			if (path.Equals("/fontawesome.min.css", StringComparison.OrdinalIgnoreCase))
			{
				await SendFileAsync(response, Path.Combine(_root, "fontawesome.min.css"), "text/css; charset=utf-8", context.Request);
				return;
			}

			if (path.Equals("/fa-solid-900.woff2", StringComparison.OrdinalIgnoreCase))
			{
				await SendFileAsync(response, Path.Combine(_root, "fa-solid-900.woff2"), "font/woff2", context.Request);
				return;
			}

			if (path.StartsWith("/media/", StringComparison.OrdinalIgnoreCase))
			{
				var name = Path.GetFileName(path["/media/".Length..]);
				var file = Path.Combine(_media, name);
				var full = Path.GetFullPath(file);
				var root = Path.GetFullPath(_media + Path.DirectorySeparatorChar);
				if (!full.StartsWith(root, StringComparison.OrdinalIgnoreCase) || !File.Exists(full))
				{
					response.StatusCode = 404;
					return;
				}

				await SendFileAsync(response, full, MediaType(full), context.Request);
				return;
			}

			response.StatusCode = 404;
		}
		catch (Exception)
		{
			try
			{
				response.StatusCode = 500;
			}
			catch (Exception)
			{
			}
		}
		finally
		{
			try
			{
				response.OutputStream.Close();
			}
			catch (Exception)
			{
			}
		}
	}

	async Task HandleProgramAsync(HttpListenerContext context)
	{
		var response = context.Response;
		if (context.Request.HttpMethod == "POST")
		{
			using var reader = new StreamReader(context.Request.InputStream, Encoding.UTF8);
			var body = await reader.ReadToEndAsync();
			if (body.Length > 262_144)
				body = body[..262_144];
			OutputView? view;
			lock (_gate)
			{
				_program = string.IsNullOrWhiteSpace(body) ? _program : body;
				view = _view;
			}
			var age = view is null ? double.MaxValue : (DateTime.UtcNow - view.Seen).TotalSeconds;
			var reply = age < 5
				? "{\"output\":{\"w\":" + view!.Width + ",\"h\":" + view.Height + ",\"dpr\":" + view.Dpr.ToString(System.Globalization.CultureInfo.InvariantCulture) + "}}"
				: """{"output":null}""";
			var replyBytes = Encoding.UTF8.GetBytes(reply);
			response.ContentType = "application/json; charset=utf-8";
			response.Headers["Cache-Control"] = "no-store";
			response.ContentLength64 = replyBytes.Length;
			await response.OutputStream.WriteAsync(replyBytes);
			return;
		}

		var query = context.Request.QueryString;
		if (int.TryParse(query["vw"], out var vw) && int.TryParse(query["vh"], out var vh) && vw > 0 && vh > 0)
		{
			double.TryParse(query["dpr"], System.Globalization.NumberStyles.Float, System.Globalization.CultureInfo.InvariantCulture, out var dpr);
			lock (_gate)
				_view = new OutputView(vw, vh, dpr > 0 ? Math.Round(dpr, 2) : 1, DateTime.UtcNow);
		}

		string json;
		lock (_gate)
			json = _program;
		var bytes = Encoding.UTF8.GetBytes(json);
		response.ContentType = "application/json; charset=utf-8";
		response.Headers["Cache-Control"] = "no-store";
		response.ContentLength64 = bytes.Length;
		await response.OutputStream.WriteAsync(bytes);
	}

	static HttpClient CreateSpeechClient()
	{
		var client = new HttpClient { Timeout = TimeSpan.FromSeconds(10) };
		client.DefaultRequestHeaders.UserAgent.ParseAdd("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36");
		return client;
	}

	async Task HandleSpeechAsync(HttpListenerContext context)
	{
		var response = context.Response;
		var text = (context.Request.QueryString["q"] ?? "").Trim();
		if (text.Length == 0)
		{
			response.StatusCode = 400;
			return;
		}
		if (text.Length > 400)
			text = text[..400];

		byte[]? audio;
		lock (_gate)
			_speechCache.TryGetValue(text, out audio);
		if (audio is null)
		{
			audio = await SpeechFromApiAsync(text) ?? await SpeechFromGoogleAsync(text);
			if (audio is null)
			{
				response.StatusCode = 502;
				return;
			}
			lock (_gate)
			{
				if (_speechCache.Count >= 200)
					_speechCache.Clear();
				_speechCache[text] = audio;
			}
		}

		response.ContentType = "audio/mpeg";
		response.Headers["Cache-Control"] = "no-store";
		response.ContentLength64 = audio.Length;
		await response.OutputStream.WriteAsync(audio);
	}

	async Task<byte[]?> SpeechFromApiAsync(string text)
	{
		if (string.IsNullOrWhiteSpace(_apiBase))
			return null;
		try
		{
			using var upstream = await Speech.GetAsync($"{_apiBase}/api/tiktoklive/tts?lang=vi&q={Uri.EscapeDataString(text)}");
			if (!upstream.IsSuccessStatusCode)
				return null;
			var audio = await upstream.Content.ReadAsByteArrayAsync();
			return audio.Length > 0 ? audio : null;
		}
		catch (Exception ex) when (ex is HttpRequestException or TaskCanceledException)
		{
			return null;
		}
	}

	static async Task<byte[]?> SpeechFromGoogleAsync(string text)
	{
		try
		{
			using var output = new MemoryStream();
			foreach (var chunk in SpeechChunks(text))
			{
				var url = "https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=" + Uri.EscapeDataString(chunk);
				using var upstream = await Speech.GetAsync(url);
				if (!upstream.IsSuccessStatusCode)
					return null;
				await upstream.Content.CopyToAsync(output);
			}
			return output.ToArray();
		}
		catch (Exception ex) when (ex is HttpRequestException or TaskCanceledException)
		{
			return null;
		}
	}

	sealed record OutputView(int Width, int Height, double Dpr, DateTime Seen);

	static IEnumerable<string> SpeechChunks(string text)
	{
		const int limit = 180;
		var current = new StringBuilder();
		foreach (var word in text.Split(' ', StringSplitOptions.RemoveEmptyEntries))
		{
			var piece = word.Length > limit ? word[..limit] : word;
			if (current.Length > 0 && current.Length + piece.Length + 1 > limit)
			{
				yield return current.ToString();
				current.Clear();
			}
			if (current.Length > 0)
				current.Append(' ');
			current.Append(piece);
		}
		if (current.Length > 0)
			yield return current.ToString();
	}

	static async Task SendFileAsync(HttpListenerResponse response, string path, string contentType, HttpListenerRequest request)
	{
		if (!File.Exists(path))
		{
			response.StatusCode = 404;
			return;
		}

		var length = new FileInfo(path).Length;
		long start = 0;
		var end = length - 1;
		var partial = false;
		var range = request.Headers["Range"];
		if (!string.IsNullOrEmpty(range) && range.StartsWith("bytes=", StringComparison.OrdinalIgnoreCase))
		{
			var piece = range[6..].Split(',')[0];
			var bits = piece.Split('-');
			if (bits[0].Length > 0 && long.TryParse(bits[0], out var parsedStart))
				start = parsedStart;
			if (bits.Length > 1 && bits[1].Length > 0 && long.TryParse(bits[1], out var parsedEnd))
				end = parsedEnd;
			if (start < 0)
				start = 0;
			if (end >= length)
				end = length - 1;
			if (start > end || start >= length)
			{
				response.StatusCode = 416;
				response.Headers["Content-Range"] = $"bytes */{length}";
				return;
			}

			partial = true;
		}

		var count = end - start + 1;
		response.ContentType = contentType;
		response.Headers["Accept-Ranges"] = "bytes";
		response.Headers["Cache-Control"] = contentType.StartsWith("video/", StringComparison.OrdinalIgnoreCase)
			? "no-cache"
			: "no-store";
		response.StatusCode = partial ? 206 : 200;
		if (partial)
			response.Headers["Content-Range"] = $"bytes {start}-{end}/{length}";
		response.ContentLength64 = count;

		await using var stream = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
		stream.Seek(start, SeekOrigin.Begin);
		var buffer = new byte[64 * 1024];
		var left = count;
		while (left > 0)
		{
			var read = await stream.ReadAsync(buffer.AsMemory(0, (int)Math.Min(buffer.Length, left)));
			if (read == 0)
				break;
			await response.OutputStream.WriteAsync(buffer.AsMemory(0, read));
			left -= read;
		}
	}

	static string MediaType(string path) => Path.GetExtension(path).ToLowerInvariant() switch
	{
		".css" => "text/css; charset=utf-8",
		".js" => "text/javascript; charset=utf-8",
		".html" => "text/html; charset=utf-8",
		".webm" => "video/webm",
		".mov" => "video/quicktime",
		".mkv" => "video/x-matroska",
		".m4v" => "video/mp4",
		_ => "video/mp4"
	};
}
