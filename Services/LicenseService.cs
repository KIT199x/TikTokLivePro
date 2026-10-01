using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace TikTokLivePro.Services;

public sealed class LicenseService
{
	static readonly JsonSerializerOptions JsonOpts = new()
	{
		PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower,
		PropertyNameCaseInsensitive = true
	};

	readonly HttpClient _http = new() { Timeout = TimeSpan.FromSeconds(12) };
	readonly string _sessionPath;
	string? _token;

	public LicenseService()
	{
		_sessionPath = Path.Combine(FileSystem.AppDataDirectory, "license-session.json");
		_token = ReadToken();
	}

	public string LicenseKey { get; } = LoadOrCreateLicenseKey();
	public string MachineKey { get; } = CreateMachineKey();
	public TimeSpan WatchDelay { get; private set; } = TimeSpan.FromSeconds(20);
	public bool HasSession => !string.IsNullOrWhiteSpace(LicenseKey);

	public string ApiBase
	{
		get
		{
			var env = Environment.GetEnvironmentVariable("TIKTOK_LIVE_API");
			if (!string.IsNullOrWhiteSpace(env))
				return env.Trim().TrimEnd('/');
			return "http://localhost:5056";
		}
	}

	public async Task<LicenseSnapshot> SyncDeviceAsync()
	{
		var registered = await PostAsync<LicenseSnapshot>("/api/tiktoklive/licenses/sync", new
		{
			license_key = LicenseKey,
			machine_fingerprint = MachineKey,
			machine_name = Environment.MachineName
		});
		return Note(registered) ?? Offline("Không kết nối được máy chủ bản quyền.");
	}

	public async Task<LicenseSnapshot> GetLicenseAsync()
	{
		var snapshot = await PostAsync<LicenseSnapshot>("/api/tiktoklive/licenses/status", new
		{
			license_key = LicenseKey,
			machine_fingerprint = MachineKey
		});
		return Note(snapshot) ?? Offline("Không kết nối được máy chủ bản quyền.");
	}

	public async Task<LicenseSnapshot> RegisterAsync(string name, string email, string password)
	{
		var result = await PostAsync<LicenseSnapshot>("/api/tiktoklive/auth/register", new
		{
			email,
			password,
			full_name = name,
			machine_key = MachineKey,
			machine_name = Environment.MachineName
		});
		return Remember(result) ?? Offline("Không đăng ký được.");
	}

	public async Task<LicenseSnapshot> LoginAsync(string email, string password)
	{
		var result = await PostAsync<LicenseSnapshot>("/api/tiktoklive/auth/login", new
		{
			email,
			password,
			machine_key = MachineKey,
			machine_name = Environment.MachineName
		});
		return Remember(result) ?? Offline("Không đăng nhập được.");
	}

	public async Task<LicenseSnapshot> ChoosePlanAsync(string plan)
	{
		var result = await PostAsync<LicenseSnapshot>("/api/tiktoklive/licenses/choose", new
		{
			license_key = LicenseKey,
			machine_fingerprint = MachineKey,
			plan
		});
		return Note(result) ?? Offline("Không lưu được gói.");
	}

	public async Task<LicenseSnapshot> CancelPaymentAsync()
	{
		var result = await PostAsync<LicenseSnapshot>("/api/tiktoklive/licenses/back", new
		{
			license_key = LicenseKey,
			machine_fingerprint = MachineKey
		});
		return Note(result) ?? Offline("Không quay lại được.");
	}

	LicenseSnapshot? Remember(LicenseSnapshot? snapshot)
	{
		if (!string.IsNullOrWhiteSpace(snapshot?.Token))
		{
			_token = snapshot.Token;
			Directory.CreateDirectory(Path.GetDirectoryName(_sessionPath)!);
			File.WriteAllText(_sessionPath, JsonSerializer.Serialize(new SessionFile(_token)));
		}
		return snapshot;
	}

	void ClearToken()
	{
		_token = null;
		try
		{
			if (File.Exists(_sessionPath))
				File.Delete(_sessionPath);
		}
		catch (Exception)
		{
		}
	}

	string? ReadToken()
	{
		try
		{
			if (!File.Exists(_sessionPath))
				return null;
			return JsonSerializer.Deserialize<SessionFile>(File.ReadAllText(_sessionPath))?.Token;
		}
		catch (Exception)
		{
			return null;
		}
	}

	async Task<T?> PostAsync<T>(string path, object payload, string? token = null)
	{
		try
		{
			using var request = new HttpRequestMessage(HttpMethod.Post, ApiBase + path);
			request.Content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");
			if (!string.IsNullOrWhiteSpace(token))
			{
				request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
				request.Headers.TryAddWithoutValidation("X-Machine-Key", MachineKey);
			}
			using var response = await _http.SendAsync(request);
			var body = await response.Content.ReadAsStringAsync();
			if (string.IsNullOrWhiteSpace(body))
				return default;
			return JsonSerializer.Deserialize<T>(body, JsonOpts);
		}
		catch (Exception)
		{
			return default;
		}
	}

	LicenseSnapshot? Note(LicenseSnapshot? snapshot)
	{
		if (snapshot == null)
			return null;
		if (string.IsNullOrWhiteSpace(snapshot.LicenseKey))
			snapshot.LicenseKey = LicenseKey;
		if (string.IsNullOrWhiteSpace(snapshot.Screen))
			snapshot.Screen = snapshot.Allowed ? "app" : "plans";
		WatchDelay = snapshot.Screen == "pay" ? TimeSpan.FromSeconds(4) : TimeSpan.FromSeconds(20);
		return snapshot;
	}

	LicenseSnapshot Offline(string message) => new()
	{
		Success = false,
		Allowed = false,
		Offline = true,
		Status = "chua_kich_hoat",
		Screen = "plans",
		LicenseKey = LicenseKey,
		Message = message
	};

	static string LoadOrCreateLicenseKey()
	{
		const string path = @"Software\TikTokLivePro";
		try
		{
			using var key = Microsoft.Win32.Registry.CurrentUser.CreateSubKey(path, writable: true);
			var existing = key?.GetValue("LicenseKey") as string;
			if (!string.IsNullOrWhiteSpace(existing))
				return existing.Trim();
			var created = NewLicenseKey();
			key?.SetValue("LicenseKey", created, Microsoft.Win32.RegistryValueKind.String);
			return created;
		}
		catch (Exception)
		{
			return NewLicenseKey();
		}
	}

	static string NewLicenseKey()
	{
		const string alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
		var bytes = RandomNumberGenerator.GetBytes(12);
		var chars = new char[18];
		chars[0] = 'T';
		chars[1] = 'L';
		chars[2] = 'P';
		chars[3] = '-';
		var index = 4;
		for (var i = 0; i < 12; i++)
		{
			if (i > 0 && i % 4 == 0)
				chars[index++] = '-';
			chars[index++] = alphabet[bytes[i] % alphabet.Length];
		}
		return new string(chars);
	}

	static string CreateMachineKey()
	{
		var guid = "";
		try
		{
			guid = Microsoft.Win32.Registry.GetValue(
				@"HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Cryptography",
				"MachineGuid",
				"")?.ToString() ?? "";
		}
		catch (Exception)
		{
		}
		var volume = VolumeSerial();
		var raw = "tiktoklivepro|" + guid + "|" + volume;
		return Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(raw))).ToLowerInvariant();
	}

	static string VolumeSerial()
	{
		try
		{
			var root = Path.GetPathRoot(Environment.SystemDirectory) ?? "C:\\";
			if (GetVolumeInformation(root, null, 0, out var serial, out _, out _, null, 0))
				return serial.ToString();
		}
		catch (Exception)
		{
		}
		return "";
	}

	[System.Runtime.InteropServices.DllImport("kernel32.dll", CharSet = System.Runtime.InteropServices.CharSet.Unicode, SetLastError = true)]
	static extern bool GetVolumeInformation(
		string root,
		StringBuilder? volumeName,
		int volumeNameSize,
		out uint serial,
		out uint maxComponent,
		out uint flags,
		StringBuilder? fileSystem,
		int fileSystemSize);

	sealed record SessionFile(string? Token);
}

public sealed class LicenseSnapshot
{
	public bool Success { get; set; }
	public bool Allowed { get; set; }
	public bool Offline { get; set; }
	public string Message { get; set; } = "";
	public string? Token { get; set; }
	public string? Email { get; set; }
	public string? FullName { get; set; }
	public string Status { get; set; } = "chua_kich_hoat";
	public string? Plan { get; set; }
	public DateTime? EndsAt { get; set; }
	public string? LicenseKey { get; set; }
	public string Screen { get; set; } = "plans";
	public LicensePaymentInfo? Payment { get; set; }
	public List<LicensePlan> Plans { get; set; } = [];
}

public sealed class LicensePaymentInfo
{
	public decimal Amount { get; set; }
	public string? QrImageUrl { get; set; }
	public string? BankName { get; set; }
	public string? AccountNumber { get; set; }
	public string? AccountName { get; set; }
	public string? Reference { get; set; }
	public DateTime? ExpiresAt { get; set; }
}

public sealed class LicensePlan
{
	public string Code { get; set; } = "";
	public string Name { get; set; } = "";
	public string Detail { get; set; } = "";
	public decimal PriceVnd { get; set; }
	public int DurationHours { get; set; }
	public bool ActivatesImmediately { get; set; }
}
