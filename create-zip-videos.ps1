param(
    [string]$sourceFolder = "videos",
    [string]$zipFileName = "videos-only.zip"
)

Write-Host "Creating ZIP file using .NET compression..." -ForegroundColor Cyan

# Get the full paths
$sourcePath = Join-Path $PWD $sourceFolder
$zipPath = Join-Path $PWD $zipFileName

# Remove existing zip file if it exists
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
    Write-Host "Removed existing $zipFileName" -ForegroundColor Yellow
}

# Create ZIP using .NET System.IO.Compression.ZipFile
try {
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    
    $compressionLevel = [System.IO.Compression.CompressionLevel]::Optimal
    $includeBaseDirectory = $false
    
    [System.IO.Compression.ZipFile]::CreateFromDirectory($sourcePath, $zipPath, $compressionLevel, $includeBaseDirectory)
    
    Write-Host "`n✅ Successfully created $zipFileName" -ForegroundColor Green
    
    # Show file size
    $zipSize = Get-Item $zipPath
    $sizeMB = [math]::Round($zipSize.Length / 1MB, 2)
    Write-Host "📦 Size: $sizeMB MB" -ForegroundColor Yellow
    Write-Host "`nThis ZIP file is compatible with cPanel and Linux unzip!" -ForegroundColor Green
    
} catch {
    Write-Host "`nError creating ZIP: $_" -ForegroundColor Red
    Write-Host "`nTrying alternative method..." -ForegroundColor Yellow
    
    # Fallback: Copy files to dist folder for manual zipping
    Write-Host "Files are ready in '$sourceFolder' folder." -ForegroundColor Gray
    Write-Host 'Please right-click on the folder and select Send to > Compressed folder' -ForegroundColor Gray
}
