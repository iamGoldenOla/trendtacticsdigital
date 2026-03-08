# Create lightweight cPanel deployment package (excluding videos and large files)

Write-Host "Creating lightweight deployment package..." -ForegroundColor Cyan

$excludeFiles = @("images.zip")
$maxFileSizeMB = 50 # Skip files larger than 50MB

# Copy HTML files
Get-ChildItem -Path . -Filter "*.html" | ForEach-Object {
    Copy-Item $_.FullName -Destination "dist\" -Force
    Write-Host "Copied $($_.Name)" -ForegroundColor Green
}

# Copy config files
$configFiles = @(".htaccess", "robots.txt", "sitemap.xml", "rss.xml", "CNAME", "package.json")
foreach ($file in $configFiles) {
    if (Test-Path $file) {
        Copy-Item $file -Destination "dist\" -Force
        Write-Host "Copied $file" -ForegroundColor Green
    }
}

# Copy folders (excluding videos and large files)
$folders = @("js", "styles", "data", "ebooks", "components", "public")

foreach ($folder in $folders) {
    if (Test-Path $folder) {
        Copy-Item $folder -Destination "dist\" -Recurse -Force
        Write-Host "Copied $folder/" -ForegroundColor Green
    }
}

# Copy images selectively (skip images.zip and very large files)
if (Test-Path "images") {
    New-Item -ItemType Directory -Path "dist\images" -Force | Out-Null
    
    Get-ChildItem -Path "images" -File | Where-Object {
        $isExcluded = $_.Name -in $excludeFiles
        $isTooLarge = $_.Length -gt ($maxFileSizeMB * 1MB)
        return -not $isExcluded -and -not $isTooLarge
    } | ForEach-Object {
        Copy-Item $_.FullName -Destination "dist\images\" -Force
        $sizeMB = [math]::Round($_.Length / 1MB, 2)
        Write-Host "Copied $($_.Name) ($sizeMB MB)" -ForegroundColor Green
    }
    
    # Copy subdirectories (brands, team, testimonials)
    Get-ChildItem -Path "images" -Directory | ForEach-Object {
        Copy-Item $_.FullName -Destination "dist\images\" -Recurse -Force
        Write-Host "Copied images/$($_.Name)/" -ForegroundColor Green
    }
}

Write-Host "`nCompressing to ZIP..." -ForegroundColor Cyan
Compress-Archive -Path dist -DestinationPath trendtactics-digital-cpanel-LITE.zip -Force

$zipSize = Get-Item trendtactics-digital-cpanel-LITE.zip
$zipSizeMB = [math]::Round($zipSize.Length / 1MB, 2)

Write-Host "`nDeployment package created!" -ForegroundColor Green
Write-Host "File: trendtactics-digital-cpanel-LITE.zip" -ForegroundColor Yellow
Write-Host "Size: $zipSizeMB MB" -ForegroundColor Yellow
Write-Host "`nNote: Videos excluded. Upload them separately via cPanel File Manager if needed." -ForegroundColor Gray
