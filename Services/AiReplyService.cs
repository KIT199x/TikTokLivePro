using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using TikTokLivePro.Models;

namespace TikTokLivePro.Services;

public sealed partial class AiReplyService
{
	const string SkipToken = "BO_QUA";
	const int MaxReplyChars = 160;
	const int HistorySize = 6;

	static readonly HttpClient Http = new() { Timeout = TimeSpan.FromSeconds(30) };
	readonly Queue<(string User, string Comment, string Reply)> _history = new();

	public async Task<string?> ReplyAsync(VoiceSettings voice, string apiKey, string user, string comment, CancellationToken token = default)
	{
		if (string.IsNullOrWhiteSpace(apiKey) && !IsLocal(voice.AiBaseUrl))
			throw new InvalidOperationException("Chưa nhập API key cho AI.");

		var messages = new List<object> { new { role = "system", content = BuildPrompt(voice) } };
		lock (_history)
		{
			foreach (var turn in _history)
			{
				messages.Add(new { role = "user", content = $"{turn.User}: {turn.Comment}" });
				messages.Add(new { role = "assistant", content = turn.Reply });
			}
		}
		messages.Add(new { role = "user", content = $"{(string.IsNullOrWhiteSpace(user) ? "Người xem" : user)}: {comment}" });

		var content = await SendAsync(voice, apiKey, messages, includeTemperature: true, token);
		var folded = Fold(content).Trim();
		if (folded.Contains("bo_qua", StringComparison.Ordinal) || (folded.StartsWith("bo qua", StringComparison.Ordinal) && folded.Length < 12))
			return null;
		var reply = CleanReply(content);
		if (reply.Length == 0)
			return null;

		lock (_history)
		{
			_history.Enqueue((user, comment, reply));
			while (_history.Count > HistorySize)
				_history.Dequeue();
		}
		return reply;
	}

	static async Task<string> SendAsync(VoiceSettings voice, string apiKey, List<object> messages, bool includeTemperature, CancellationToken token)
	{
		object payload = includeTemperature
			? new { model = voice.AiModel, messages, temperature = 0.7 }
			: new { model = voice.AiModel, messages };
		using var request = new HttpRequestMessage(HttpMethod.Post, voice.AiBaseUrl.TrimEnd('/') + "/chat/completions")
		{
			Content = JsonContent.Create(payload)
		};
		if (!string.IsNullOrWhiteSpace(apiKey))
		{
			request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey.Trim());
			if (voice.AiBaseUrl.Contains("anthropic.com", StringComparison.OrdinalIgnoreCase))
			{
				request.Headers.TryAddWithoutValidation("x-api-key", apiKey.Trim());
				request.Headers.TryAddWithoutValidation("anthropic-version", "2023-06-01");
			}
		}

		HttpResponseMessage response;
		try
		{
			response = await Http.SendAsync(request, token);
		}
		catch (HttpRequestException ex)
		{
			throw new InvalidOperationException($"Không kết nối được AI. Kiểm tra mạng và Base URL. ({ex.Message})");
		}
		catch (TaskCanceledException) when (!token.IsCancellationRequested)
		{
			throw new InvalidOperationException($"AI ({voice.AiModel}) phản hồi quá lâu.");
		}

		using var _ = response;
		var body = await response.Content.ReadAsStringAsync(token);
		if (!response.IsSuccessStatusCode)
		{
			// Reasoning models only accept the default temperature.
			if (includeTemperature && (int)response.StatusCode == 400 && body.Contains("temperature", StringComparison.OrdinalIgnoreCase))
				return await SendAsync(voice, apiKey, messages, includeTemperature: false, token);
			throw new InvalidOperationException($"AI trả lỗi {(int)response.StatusCode}: {Shorten(ErrorMessage(body), 200)}");
		}

		using var doc = JsonDocument.Parse(body);
		return doc.RootElement.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString() ?? "";
	}

	static string BuildPrompt(VoiceSettings voice)
	{
		var prompt = new StringBuilder();
		prompt.AppendLine(voice.Persona);
		if (!string.IsNullOrWhiteSpace(voice.Knowledge))
		{
			prompt.AppendLine();
			prompt.AppendLine("Thông tin về phiên live, sản phẩm và chính sách (chỉ dùng thông tin này, không bịa thêm):");
			prompt.AppendLine(voice.Knowledge);
		}
		prompt.AppendLine();
		prompt.AppendLine("Quy tắc bắt buộc:");
		prompt.AppendLine("- Luôn trả lời bằng tiếng Việt có dấu, tự nhiên như đang nói trên livestream.");
		prompt.AppendLine($"- Trả lời thật ngắn gọn, 1 đến 2 câu, tối đa {MaxReplyChars} ký tự.");
		prompt.AppendLine("- Câu trả lời sẽ được đọc thành giọng nói: không dùng emoji, ký hiệu, markdown, đường link hay chữ viết tắt khó đọc.");
		prompt.AppendLine("- Không chào lại và không gọi tên người xem ở đầu câu, hệ thống sẽ tự gọi tên.");
		prompt.AppendLine("- Nếu không biết thông tin thì nói khéo là sẽ kiểm tra lại, không bịa giá hay chính sách.");
		prompt.AppendLine($"- Nếu bình luận là spam, vô nghĩa, quảng cáo hoặc khiếm nhã thì chỉ trả lời đúng một từ: {SkipToken}");
		return prompt.ToString();
	}

	static string CleanReply(string text)
	{
		var value = MarkdownRegex().Replace(text ?? "", " ");
		value = EmojiRegex().Replace(value, "");
		value = SpaceRegex().Replace(value, " ").Trim().Trim('"', '\'', ' ');
		if (value.Length <= MaxReplyChars)
			return value;
		var cut = value[..MaxReplyChars];
		var end = cut.LastIndexOfAny(['.', '!', '?', '…']);
		return end >= MaxReplyChars / 2 ? cut[..(end + 1)] : cut.TrimEnd(',', ' ') + "…";
	}

	static string ErrorMessage(string body)
	{
		try
		{
			using var doc = JsonDocument.Parse(body);
			var root = doc.RootElement.ValueKind == JsonValueKind.Array && doc.RootElement.GetArrayLength() > 0
				? doc.RootElement[0]
				: doc.RootElement;
			if (root.TryGetProperty("error", out var error))
			{
				if (error.ValueKind == JsonValueKind.String)
					return error.GetString() ?? body;
				if (error.TryGetProperty("message", out var message))
					return message.GetString() ?? body;
			}
		}
		catch (JsonException)
		{
		}
		return body;
	}

	static bool IsLocal(string baseUrl) =>
		Uri.TryCreate(baseUrl, UriKind.Absolute, out var uri) && (uri.IsLoopback || uri.Host.EndsWith(".local", StringComparison.OrdinalIgnoreCase));

	static string Shorten(string text, int max) => text.Length > max ? text[..max] + "…" : text;

	static string Fold(string text)
	{
		var normalized = (text ?? "").ToLowerInvariant().Replace('đ', 'd').Normalize(NormalizationForm.FormD);
		var builder = new StringBuilder(normalized.Length);
		foreach (var ch in normalized)
		{
			if (System.Globalization.CharUnicodeInfo.GetUnicodeCategory(ch) != System.Globalization.UnicodeCategory.NonSpacingMark)
				builder.Append(ch);
		}
		return builder.ToString();
	}

	[GeneratedRegex(@"[*_#`>~|\[\]]|https?://\S+")]
	private static partial Regex MarkdownRegex();

	[GeneratedRegex(@"[\p{So}\p{Cs}\uFE0F\u200D]")]
	private static partial Regex EmojiRegex();

	[GeneratedRegex(@"\s+")]
	private static partial Regex SpaceRegex();
}
