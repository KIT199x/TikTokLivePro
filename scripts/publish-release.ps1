<#
.SYNOPSIS
  Build TikTok Live Pro, zip it and publish the version to the update API.

.EXAMPLE
  .\scripts\publish-release.ps1 -Version 1.0.1 -Notes "Sửa giật hình trên luồng"
  .\scripts\publish-release.ps1 -Version 1.1.0 -Mandatory -ApiBase http://192.168.1.123:8080
#>
param(
	[Parameter(Mandatory = $true)][string]$Version,
	[string]$Notes = "",
	[switch]$Mandatory,
	[string]$ApiBase = "https://api.nguyenbakien.net",
	[string]$Secret = $env:TIKTOK_LIVE_PUBLISH_SECRET,
	[switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
if ($Version -notmatch '^\d{1,4}(\.\d{1,5}){1,3}$') { throw "Version phải có dạng 1.2.3" }

$secretFile = Join-Path $env:LOCALAPPDATA "TikTokLivePro-publish\secret.txt"
if ([string]::IsNullOrWhiteSpace($Secret) -and (Test-Path $secretFile)) { $Secret = (Get-Content $secretFile -Raw).Trim() }
if ([string]::IsNullOrWhiteSpace($Secret)) { throw "Thiếu secret. Đặt TIKTOK_LIVE_PUBLISH_SECRET hoặc tạo $secretFile" }

$root = Split-Path $PSScriptRoot -Parent
$project = Join-Path $root "TikTokLivePro.csproj"
$out = Join-Path $root "out"
$publish = Join-Path $out "publish-$Version"
$zip = Join-Path $out "TikTokLivePro-$Version.zip"

$xml = Get-Content $project -Raw -Encoding UTF8
$xml = [regex]::Replace($xml, '<ApplicationDisplayVersion>[^<]*</ApplicationDisplayVersion>', "<ApplicationDisplayVersion>$Version</ApplicationDisplayVersion>")
[IO.File]::WriteAllText($project, $xml, (New-Object Text.UTF8Encoding($false)))

if (-not $SkipBuild) {
	if (Test-Path $publish) { Remove-Item $publish -Recurse -Force }
	dotnet publish $project -f net10.0-windows10.0.19041.0 -c Release -r win-x64 `
		-p:WindowsPackageType=None -p:WindowsAppSDKSelfContained=true -p:SelfContained=true `
		-o $publish
	if ($LASTEXITCODE -ne 0) { throw "dotnet publish lỗi" }
}
if (-not (Test-Path (Join-Path $publish "TikTokLivePro.exe"))) { throw "Không thấy TikTokLivePro.exe trong $publish" }

if (Test-Path $zip) { Remove-Item $zip -Force }
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [IO.Compression.ZipFile]::Open($zip, [IO.Compression.ZipArchiveMode]::Create)
try {
	$prefix = (Resolve-Path $publish).Path.TrimEnd('\') + '\'
	Get-ChildItem $publish -Recurse -File | ForEach-Object {
		$entry = $_.FullName.Substring($prefix.Length).Replace('\', '/')
		[void][IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive, $_.FullName, $entry, [IO.Compression.CompressionLevel]::Optimal)
	}
} finally {
	$archive.Dispose()
}
$sha = (Get-FileHash $zip -Algorithm SHA256).Hash.ToLowerInvariant()
$size = (Get-Item $zip).Length
Write-Host ("Gói: {0} ({1:N1} MB) sha256={2}" -f $zip, ($size / 1MB), $sha)

$mandatoryText = if ($Mandatory) { "true" } else { "false" }
$response = curl.exe -sS -f -X POST "$($ApiBase.TrimEnd('/'))/api/tiktoklive/version" `
	-H "X-Publish-Secret: $Secret" `
	--form-string "version=$Version" `
	--form-string "notes=$Notes" `
	--form-string "mandatory=$mandatoryText" `
	-F "file=@$zip;type=application/zip"
if ($LASTEXITCODE -ne 0) { throw "Upload lỗi (curl exit $LASTEXITCODE)" }
Write-Host $response
Write-Host "Đã phát hành $Version"
