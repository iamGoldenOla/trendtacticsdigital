$root = "C:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean"
Set-Location $root

Write-Host "--- 1. Removing LFS tracking from .gitattributes ---" -ForegroundColor Cyan
if (Test-Path ".gitattributes") {
    $ga = Get-Content .gitattributes
    # Remove LFS lines
    $ga = $ga | Where-Object { $_ -notmatch "filter=lfs" }
    if ($ga) {
        [System.IO.File]::WriteAllText(".gitattributes", ($ga -join "`r`n"), [System.Text.Encoding]::UTF8)
    }
    else {
        Remove-Item ".gitattributes"
    }
}

Write-Host "--- 2. Untracking LFS types ---" -ForegroundColor Cyan
git lfs untrack "*.mp4"
git lfs untrack "*.mov"
git lfs untrack "*.png"
git lfs untrack "*.jpg"
git lfs untrack "*.jpeg"
git lfs untrack "*.zip"

Write-Host "--- 3. Renormalizing Git Index (Converting pointers to binaries) ---" -ForegroundColor Cyan
# This might take a moment
git add --renormalize .

Write-Host "--- 4. Committing LFS Removal ---" -ForegroundColor Cyan
git commit -m "Chore: Remove Git LFS tracking and convert pointers back to binary files"

Write-Host "`n=== LFS REMOVAL COMPLETED ===" -ForegroundColor Green
