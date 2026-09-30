using System.Runtime.InteropServices;
using Microsoft.UI.Windowing;
using Windows.Graphics;
using WinRT.Interop;

namespace TikTokLivePro;

static class StageWindow
{
	const int GwlExStyle = -20;
	const int WsExNoRedirectionBitmap = 0x00200000;
	const uint MonitorDefaultToNearest = 2;

	static readonly EnumWindowsProc EnumProc = ClearNoRedirection;

	static Microsoft.Maui.Controls.Window? _maui;
	static AppWindow? _appWindow;
	static OverlappedPresenter? _presenter;
	static RectInt32 _saved;
	static double _minWidth;
	static double _minHeight;
	static bool _staging;
	static bool _attached;
	static Microsoft.UI.Xaml.DispatcherTimer? _timer;

	public static void Attach(Microsoft.UI.Xaml.Window platformWindow)
	{
		if (_attached)
			return;
		_attached = true;
		var hwnd = WindowNative.GetWindowHandle(platformWindow);
		var id = Microsoft.UI.Win32Interop.GetWindowIdFromWindow(hwnd);
		_appWindow = AppWindow.GetFromWindowId(id);
		_presenter = _appWindow.Presenter as OverlappedPresenter;
		_maui = Application.Current?.Windows.FirstOrDefault();
		MakeCapturable(hwnd);
		_timer = new Microsoft.UI.Xaml.DispatcherTimer { Interval = TimeSpan.FromSeconds(1) };
		_timer.Tick += (_, _) => MakeCapturable(hwnd);
		_timer.Start();
	}

	public static void SetStage(bool on)
	{
		if (_appWindow is null || _presenter is null || on == _staging)
			return;

		if (on)
		{
			var hwnd = Microsoft.UI.Win32Interop.GetWindowFromWindowId(_appWindow.Id);
			var monitor = MonitorFromWindow(hwnd, MonitorDefaultToNearest);
			var info = new MonitorInfo { cbSize = Marshal.SizeOf<MonitorInfo>() };
			if (!GetMonitorInfo(monitor, ref info))
				return;

			var workW = info.rcWork.Right - info.rcWork.Left;
			var workH = info.rcWork.Bottom - info.rcWork.Top;
			var height = workH;
			var width = height * 9 / 16;
			if (width > workW)
			{
				width = workW;
				height = width * 16 / 9;
			}

			var x = info.rcWork.Left + (workW - width) / 2;
			var y = info.rcWork.Top + (workH - height) / 2;
			_saved = new RectInt32(_appWindow.Position.X, _appWindow.Position.Y, _appWindow.Size.Width, _appWindow.Size.Height);
			if (_maui is not null)
			{
				_minWidth = _maui.MinimumWidth;
				_minHeight = _maui.MinimumHeight;
				_maui.MinimumWidth = 180;
				_maui.MinimumHeight = 320;
			}

			_presenter.SetBorderAndTitleBar(false, false);
			_presenter.IsResizable = false;
			_appWindow.Title = "TikTok Live Pro";
			_appWindow.MoveAndResize(new RectInt32(x, y, width, height));
			_staging = true;
			MakeCapturable(hwnd);
			return;
		}

		_presenter.SetBorderAndTitleBar(true, true);
		_presenter.IsResizable = true;
		_appWindow.Title = "TikTok Live Pro";
		if (_saved.Width > 0 && _saved.Height > 0)
			_appWindow.MoveAndResize(_saved);
		if (_maui is not null)
		{
			_maui.MinimumWidth = _minWidth > 0 ? _minWidth : 980;
			_maui.MinimumHeight = _minHeight > 0 ? _minHeight : 680;
		}
		_staging = false;
	}

	static void MakeCapturable(IntPtr root)
	{
		if (root == IntPtr.Zero)
			return;
		ClearNoRedirection(root, IntPtr.Zero);
		EnumChildWindows(root, EnumProc, IntPtr.Zero);
	}

	static bool ClearNoRedirection(IntPtr hwnd, IntPtr lParam)
	{
		var style = GetWindowLongPtr(hwnd, GwlExStyle);
		if ((style & WsExNoRedirectionBitmap) != 0)
			SetWindowLongPtr(hwnd, GwlExStyle, style & ~WsExNoRedirectionBitmap);
		return true;
	}

	delegate bool EnumWindowsProc(IntPtr hwnd, IntPtr lParam);

	[StructLayout(LayoutKind.Sequential)]
	struct Rect
	{
		public int Left;
		public int Top;
		public int Right;
		public int Bottom;
	}

	[StructLayout(LayoutKind.Sequential, CharSet = CharSet.Auto)]
	struct MonitorInfo
	{
		public int cbSize;
		public Rect rcMonitor;
		public Rect rcWork;
		public uint dwFlags;
	}

	[DllImport("user32.dll", EntryPoint = "GetWindowLongPtrW")]
	static extern nint GetWindowLongPtr(IntPtr hWnd, int nIndex);

	[DllImport("user32.dll", EntryPoint = "SetWindowLongPtrW")]
	static extern nint SetWindowLongPtr(IntPtr hWnd, int nIndex, nint dwNewLong);

	[DllImport("user32.dll")]
	static extern bool EnumChildWindows(IntPtr hwnd, EnumWindowsProc lpEnumFunc, IntPtr lParam);

	[DllImport("user32.dll")]
	static extern IntPtr MonitorFromWindow(IntPtr hwnd, uint dwFlags);

	[DllImport("user32.dll", CharSet = CharSet.Auto)]
	static extern bool GetMonitorInfo(IntPtr hMonitor, ref MonitorInfo lpmi);
}
