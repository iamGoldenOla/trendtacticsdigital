$root = "C:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean"
$htmlFiles = Get-ChildItem $root -Filter "*.html" -File

Write-Host "=== Fixing .html links in all HTML files ===" -ForegroundColor Cyan

foreach ($f in $htmlFiles) {
    $content = Get-Content $f.FullName -Raw -Encoding UTF8
    $original = $content

    # Fix onclick: window.location.href='page.html' -> window.location.href='page'
    $content = $content -replace "window\.location\.href='([^'#?]+)\.html'", "window.location.href='`$1'"
    $content = $content -replace 'window\.location\.href="([^"#?]+)\.html"', 'window.location.href="$1"'
    
    # Fix onclick: location.href='page.html'
    $content = $replace = $content -replace "location\.href='([^'#?]+)\.html'", "location.href='`$1'"

    if ($content -ne $original) {
        [System.IO.File]::WriteAllText($f.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "  Fixed: $($f.Name)" -ForegroundColor Green
    }
}

Write-Host "`nAdding all changes..." -ForegroundColor Yellow
Set-Location $root
git add -A

Write-Host "Committing..." -ForegroundColor Yellow
git commit -m "Fix: remove .html from onclick handlers across all pages for clean Vercel URLs"

Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host "`n=== DONE ===" -ForegroundColor Cyan
