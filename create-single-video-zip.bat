@echo off
echo Creating ZIP with single video file...
powershell -Command "Remove-Item 'videos-only.zip' -Force -ErrorAction SilentlyContinue"
powershell -Command "$videoPath = Join-Path $PWD 'videos\Trendtactics-Digital-Ads.mp4'; $zipPath = Join-Path $PWD 'videos-only.zip'; Add-Type -AssemblyName System.IO.Compression.FileSystem; $compression = [System.IO.Compression.CompressionLevel]::Optimal; $zip = [System.IO.Compression.ZipFile]::Open($zipPath, 'Create'); $entry = $zip.CreateEntryFromFile($videoPath, 'Trendtactics-Digital-Ads.mp4', $compression); $zip.Dispose(); Write-Host 'Created videos-only.zip successfully!' -ForegroundColor Green; $size = (Get-Item $zipPath).Length / 1MB; Write-Host \"Size: $([math]::Round($size, 2)) MB\" -ForegroundColor Yellow"
echo Done!
pause
