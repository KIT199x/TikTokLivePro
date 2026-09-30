using System.Net;
using System.Text;

namespace TikTokLivePro.Services;

public sealed class OutputServer : IDisposable
{
	readonly HttpListener _listener = new();
	readonly CancellationTokenSource _cts = new();
	readonly string _root;
	readonly string _media;
	readonly object _gate = new();
	string _program = """{"file":"","time":0,"playing":false,"fit":"contain","badge":false,"overlays":[],"queue":[],"stageWidth":1080}""";

	public int Port { get; }

	// LIVE Studio rejects a raw IP. This name resolves to 127.0.0.1 and matches its URL check.
	public string OutputUrl => $"http://127.0.0.1.nip.io:{Port}/?output=1";

	OutputServer(string root, string media, int port)
	{
		_root = root;
		_media = media;
		Port = port;
		_listener.Prefixes.Add($"http://127.0.0.1:{port}/");
	}

	public static OutputServer Start(string root, string media)
	{
		Exception? last = null;
		for (var port = 8766; port <= 8776; port++)
		{
			try
			{
				var server = new OutputServer(root, media, port);
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
			lock (_gate)
				_program = string.IsNullOrWhiteSpace(body) ? _program : body;
			response.StatusCode = 204;
			return;
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
