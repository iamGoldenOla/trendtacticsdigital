$root = "C:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean"
Set-Location $root

Write-Host "--- 1. Fixing .gitignore to ALLOW assets ---" -ForegroundColor Cyan
$gi = Get-Content .gitignore
$gi = $gi -replace '\*.mp4', '# *.mp4'
$gi = $gi -replace '\*.png', '# *.png'
$gi = $gi -replace '\*.jpg', '# *.jpg'
$gi = $gi -replace '\*.jpeg', '# *.jpeg'
$gi = $gi -replace '\*.webp', '# *.webp'
# Also add explicit allows just in case
$gi += "`n!images/`n!images/**/*`n!videos/`n!videos/**/*"
[System.IO.File]::WriteAllText(".gitignore", ($gi -join "`r`n"), [System.Text.Encoding]::UTF8)

Write-Host "--- 2. Fixing internal links to clean URLs ---" -ForegroundColor Cyan
$htmlFiles = Get-ChildItem -Path $root -Filter "*.html" -File -Recurse
foreach ($f in $htmlFiles) {
    $content = Get-Content $f.FullName -Raw -Encoding UTF8
    $original = $content
    # Fix href and onclick
    $content = $content -replace 'href="([^"#?]+)\.html"', 'href="$1"'
    $content = $content -replace "href='([^'#?]+)\.html'", "href='$1'"
    $content = $content -replace "window\.location\.href='([^'#?]+)\.html'", "window.location.href='`$1'"
    $content = $content -replace 'window\.location\.href="([^"#?]+)\.html"', 'window.location.href="$1"'
    $content = $content -replace "location\.href='([^'#?]+)\.html'", "location.href='`$1'"
    if ($content -ne $original) {
        [System.IO.File]::WriteAllText($f.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "  Fixed: $($f.Name)" -ForegroundColor Green
    }
}

Write-Host "--- 3. Force-adding all critical files ---" -ForegroundColor Cyan
git add -f images/
git add -f videos/
git add -f vercel.json me.html fix-permissions.php .htaccess .gitignore
git add -A

Write-Host "--- 4. Committing ---" -ForegroundColor Cyan
git commit -m "FINAL FIX: Clean URLs, missing assets (force added), and proper Vercel config"

Write-Host "--- 5. Pushing to GitHub (Force) ---" -ForegroundColor Cyan
# Using multiple retries for push due to connection issues
$maxRetries = 3
$retryCount = 0
$pushed = $false
while (-not $pushed -and $retryCount -lt $maxRetries) {
    Write-Host "  Pushing (Attempt $($retryCount + 1))..."
    git push origin main --force
    if ($LASTEXITCODE -eq 0) {
        $pushed = $true
        Write-Host "  Push SUCCESSFUL!" -ForegroundColor Green
    }
    else {
        $retryCount++
        if ($retryCount -lt $maxRetries) {
            Write-Host "  Push failed. Waiting 5s before retry..." -ForegroundColor Red
            Start-Sleep -Seconds 5
        }
    }
}

if (-not $pushed) {
    Write-Host "  FINAL PUSH FAILED. Please push manually when connection is stable." -ForegroundColor Red
}

Write-Host "`n=== COMPLETED ===" -ForegroundColor Cyan
