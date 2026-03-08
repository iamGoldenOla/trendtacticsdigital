# Create ZIP with single video file only
$videoFile = "videos\Trendtactics-Digital-Ads.mp4"
$zipName = "videos-only-SINGLE.zip"

# Remove old zip if exists
if (Test-Path $zipName) {
    Remove-Item $zipName -Force
    Write-Host "Removed old $zipName" -ForegroundColor Yellow
}

# Create new ZIP with just the one video
Add-Type -AssemblyName System.IO.Compression.FileSystem
$compression = [System.IO.Compression.CompressionLevel]::Optimal

$zip = [System.IO.Compression.ZipFile]::Open($zipName, 'Create')
$entry = $zip.CreateEntryFromFile($videoFile, "Trendtactics-Digital-Ads.mp4", $compression)
$zip.Dispose()

Write-Host "`nSuccessfully created $zipName" -ForegroundColor Green
$size = (Get-Item $zipName).Length / 1MB
Write-Host "Size: $([math]::Round($size, 2)) MB" -ForegroundColor Yellow
Write-Host "`nThis ZIP contains ONLY the homepage hero video!" -ForegroundColor Cyan
