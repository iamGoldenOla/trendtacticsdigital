$root = "C:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean"
$htmlFiles = Get-ChildItem -Path $root -Filter "*.html" -File -Recurse

Write-Host "=== Fixing .html links and force-adding assets ===" -ForegroundColor Cyan

foreach ($f in $htmlFiles) {
    Write-Host "Processing $($f.FullName)..."
    $content = Get-Content $f.FullName -Raw -Encoding UTF8
    $original = $content

    # 1. Fix href="page.html" -> href="page"
    # Matches href="about.html", href="./about.html", href="/about.html"
    # Doesn't match external links or links with hashes/queries
    $content = $content -replace 'href="([^"#?]+)\.html"', 'href="$1"'
    $content = $content -replace "href='([^'#?]+)\.html'", "href='$1'"

    # 2. Fix onclickHandlers: window.location.href='page.html'
    $content = $content -replace "window\.location\.href='([^'#?]+)\.html'", "window.location.href='`$1'"
    $content = $content -replace 'window\.location\.href="([^"#?]+)\.html"', 'window.location.href="$1"'
    $content = $content -replace "location\.href='([^'#?]+)\.html'", "location.href='`$1'"

    if ($content -ne $original) {
        [System.IO.File]::WriteAllText($f.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "  Fixed links in: $($f.Name)" -ForegroundColor Green
    }
}

# Ensure assets are added
Set-Location $root
Write-Host "`nForce-adding images and videos..." -ForegroundColor Yellow
git add -f images/
git add -f videos/
git add -A

Write-Host "Committing changes..." -ForegroundColor Yellow
git commit -m "Fix: clean URLs and ensure all image/video assets are tracked for Vercel"

Write-Host "Retrying push..." -ForegroundColor Yellow
git push origin main
