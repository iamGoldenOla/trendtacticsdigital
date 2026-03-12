@echo off
setlocal enabledelayedexpansion

echo === Fixing .html links in all HTML files ===
echo.

set ROOT=C:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean
cd /d "%ROOT%"

:: Use PowerShell to do the replacements across all HTML files
powershell -Command "
$root = 'C:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean'
$htmlFiles = Get-ChildItem $root -Filter '*.html' -File

foreach ($f in $htmlFiles) {
    $content = Get-Content $f.FullName -Raw -Encoding UTF8
    $original = $content

    # Fix onclick handlers: window.location.href='page.html' -> window.location.href='page'
    $content = $content -replace `"window\.location\.href='([^']+)\.html'\`", `"window.location.href='\$1'\"`"
    $content = $content -replace 'window\.location\.href=""([^""]+)\.html""', 'window.location.href=""`$1""'

    # Fix onclick: location.href='page.html' -> location.href='page'
    $content = $content -replace `"location\.href='([^']+)\.html'\`", `"location.href='\$1'\"`"

    if ($content -ne $original) {
        [System.IO.File]::WriteAllText($f.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host `"Fixed: $($f.Name)`"
    }
}
Write-Host 'Done fixing onclick handlers.'
"

echo.
echo Adding all changes to git...
git add -A

echo.
echo Committing...
git commit -m "Fix: remove .html from onclick handlers; ensure all assets tracked"

echo.
echo Pushing to GitHub...
git push origin main

echo.
echo === DONE ===
pause
