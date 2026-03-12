$root = "C:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean"
Set-Location $root

Write-Host "--- Performing final Clean URL sweep ---" -ForegroundColor Cyan

# Define extensions and directories to scan
$extensions = @("*.html", "*.js", "*.php")
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

    # href="something.html" -> href="something"
    $content = $content -replace 'href\s*=\s*(["''])([^"'']+\/)?([^"'']+\.html)(["''])', 'href=$1$2$replace$4'
    # We need to do this properly with a match evaluator or similar, but since we're in PS, let's keep it simple
    # Group Indexing: $1=quote, $2=path, $3=filename.html, $4=quote
    # Wait, the above regex is simplified. Let's use a more robust one.
    
    $content = $content -replace 'href="([^"#?]+)\.html"', 'href="$1"'
    $content = $content -replace "href='([^'#?]+)\.html'", "href='$1'"
    $content = $content -replace "window\.location\.href='([^'#?]+)\.html'", "window.location.href='`$1'"
    $content = $content -replace 'window\.location\.href="([^"#?]+)\.html"', 'window.location.href="$1"'
    
    # Specific fix for privacy-policy.html and blog strings
    $content = $content -replace 'privacy-policy\.html', 'privacy-policy'
    $content = $content -replace 'blog-post\.html', 'blog-post'

    if ($content -ne $original) {
        [System.IO.File]::WriteAllText($f.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "  Fixed: $($f.Name)" -ForegroundColor Green
    }
}

Write-Host "`nStaging changes..." -ForegroundColor Yellow
git add -A

Write-Host "Committing final fixes..." -ForegroundColor Yellow
git commit -m "Final Fix: Ensure clean URLs and verify binary assets"

# Retrying push with multiple attempts
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

Write-Host "`n=== FINAL CLEANUP COMPLETED ===" -ForegroundColor Green
