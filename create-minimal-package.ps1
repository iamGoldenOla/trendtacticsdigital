# Create minimal deployment package without images
Write-Host "Creating minimal deployment package (no images)..." -ForegroundColor Cyan

# Get all files except large images
$distPath = Join-Path $PWD "dist"
$zipPath = Join-Path $PWD "trendtactics-digital-MINIMAL.zip"

# Remove old zip if exists
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

# Create list of files to include (exclude large image folders but keep videos)
$allFiles = Get-ChildItem -Path $distPath -Recurse
$filesToInclude = $allFiles | Where-Object {
    $_.FullName -notmatch '\\images\\' -and 
    $_.FullName -notmatch '\\portfolio\\' -and
    $_.Extension -notin @('.jpg','.jpeg','.png','.gif','.webp')
}

# Create ZIP
Compress-Archive -Path $filesToInclude.FullName -DestinationPath $zipPath -Force

# Show result
$zipSize = Get-Item $zipPath
$sizeMB = [math]::Round($zipSize.Length / 1MB, 2)

Write-Host "`nMinimal package created!" -ForegroundColor Green
Write-Host "File: trendtactics-digital-MINIMAL.zip" -ForegroundColor Yellow
Write-Host "Size: $sizeMB MB (excludes images)" -ForegroundColor Yellow
Write-Host "`nUpload this first, then upload images separately." -ForegroundColor Cyan
