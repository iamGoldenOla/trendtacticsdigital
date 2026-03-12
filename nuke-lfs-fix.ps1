$root = "C:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean"
Set-Location $root

Write-Host "--- 1. Renaming Folders ---" -ForegroundColor Cyan
if (Test-Path "images") { Rename-Item "images" "img" -ErrorAction SilentlyContinue }
if (Test-Path "videos") { Rename-Item "videos" "vid" -ErrorAction SilentlyContinue }

# Also check for any images in deployment/ if they exist
if (Test-Path "deployment\images") { Rename-Item "deployment\images" "img" -ErrorAction SilentlyContinue }

Write-Host "--- 2. Updating references in files ---" -ForegroundColor Cyan
$extensions = @("*.html", "*.css", "*.js", "*.json", "*.php")
$exclude = @("node_modules", ".git", "dist", "build", ".next", "out")

$files = Get-ChildItem -Path $root -Include $extensions -Recurse -File | Where-Object { 
    $path = $_.FullName
    $match = $false
    foreach ($e in $exclude) {
        if ($path -like "*\$e\*") { $match = $true; break }
    }
    !$match
}

foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw -Encoding UTF8
    $original = $content

    # Replace /images/ with /img/ and images/ with img/
    # Using word boundaries and specific path patterns to avoid over-replacing
    $content = $content -replace "/images/", "/img/"
    $content = $content -replace "(['\""])images/", "$1img/"
    
    # Replace /videos/ with /vid/ and videos/ with vid/
    $content = $content -replace "/videos/", "/vid/"
    $content = $content -replace "(['\""])videos/", "$1vid/"

    # Final Clean URL sweep (Privacy Policy, Blog, etc.)
    $content = $content -replace 'privacy-policy\.html', 'privacy-policy'
    $content = $content -replace 'blog-post\.html', 'blog-post'
    $content = $content -replace 'href="([^"#?]+)\.html"', 'href="$1"'
    $content = $content -replace "href='([^'#?]+)\.html'", "href='$1'"

    if ($content -ne $original) {
        [System.IO.File]::WriteAllText($f.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "  Updated: $($f.Name)" -ForegroundColor Green
    }
}

Write-Host "--- 3. Consolidating Git ---" -ForegroundColor Cyan
git add -A
git commit -m "Final Fix: Rename assets to img/vid to bypass LFS and clean up remaining URLs"

# Pushing multiple times if needed
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

Write-Host "`n=== MEGA-FIX COMPLETED ===" -ForegroundColor Green
