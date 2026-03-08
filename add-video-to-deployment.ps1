# Add single video to deployment package
Write-Host "Adding hero video to deployment package..." -ForegroundColor Cyan

# Create videos folder in dist if it doesn't exist
if (-not (Test-Path "dist\videos")) {
    New-Item -ItemType Directory -Path "dist\videos" | Out-Null
}

# Copy the single video file
Copy-Item "videos\Trendtactics-Digital-Ads.mp4" "dist\videos\" -Force
Write-Host "Copied Trendtactics-Digital-Ads.mp4 to dist/videos/" -ForegroundColor Green

# Recreate the ZIP with video included
Compress-Archive -Path "dist\*" -DestinationPath "trendtactics-digital-cpanel-LITE.zip" -Force -CompressionLevel Optimal

# Show result
$zipSize = Get-Item trendtactics-digital-cpanel-LITE.zip
$sizeMB = [math]::Round($zipSize.Length / 1MB, 2)

Write-Host "`nDeployment package updated!" -ForegroundColor Green
Write-Host "File: trendtactics-digital-cpanel-LITE.zip" -ForegroundColor Yellow
Write-Host "Size: $sizeMB MB (includes homepage hero video)" -ForegroundColor Yellow
Write-Host "`nNow upload this to cPanel and extract!" -ForegroundColor Cyan
