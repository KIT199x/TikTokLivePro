namespace TikTokLivePro;

public partial class App : Application
{
	public App()
	{
		InitializeComponent();
	}

	protected override Window CreateWindow(IActivationState? activationState)
	{
		return new Window(new MainPage())
		{
			Title = "TikTok Live Pro",
			Width = 1360,
			Height = 900,
			MinimumWidth = 980,
			MinimumHeight = 680
		};
	}
}
