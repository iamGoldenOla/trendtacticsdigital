$root = "C:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean"
$out = "$root\trendtactics-FULL-DEPLOY-FINAL.zip"

if (Test-Path $out) { Remove-Item $out -Force; Write-Host "Removed old zip." }

# All HTML pages to include
$htmlFiles = @(
    "index.html", "about.html", "services.html", "blog.html", "blog-post.html",
    "portfolio.html", "contact.html", "pricing.html", "academy.html", "ebooks.html",
    "tools.html", "quiz.html", "shop.html", "hub.html", "me.html", "login.html",
    "register.html", "dashboard.html", "client-dashboard.html", "analytics-dashboard.html",
    "academy-enroll.html", "trendy-ai.html", "privacy-policy.html", "coming-soon.html",
    "courses.html",
    "service-app-development.html", "service-content-creation.html",
    "service-digital-marketing.html", "service-email-marketing.html",
    "service-facebook-ads.html", "service-social-media-marketing.html",
    "service-web-development.html"
)

# Other root-level files
$rootFiles = @(
    ".htaccess", "robots.txt", "sitemap.xml", "rss.xml", "fix-permissions.php"
)

# Folders to include entirely
$folders = @("images", "js", "styles", "videos", "ebooks", "data", "components", "public", "downloads")

# Build file list
$filesToZip = @()

foreach ($f in $htmlFiles) {
    $p = Join-Path $root $f
    if (Test-Path $p) { $filesToZip += $p }
    else { Write-Host "MISSING: $f" }
}

foreach ($f in $rootFiles) {
    $p = Join-Path $root $f
    if (Test-Path $p) { $filesToZip += $p }
    else { Write-Host "MISSING: $f" }
}

# Use 7-Zip if available, otherwise use .NET
$7z = "C:\Program Files\7-Zip\7z.exe"
if (Test-Path $7z) {
    Write-Host "Using 7-Zip for speed..."
    # Build include list file for 7zip
    $listFile = "$env:TEMP\ziplist.txt"
    $filesToZip | Out-File $listFile -Encoding utf8
    foreach ($dir in $folders) {
        $dp = Join-Path $root $dir
        if (Test-Path $dp) { Add-Content $listFile "$dp\*" }
    }
    & $7z a -tzip $out "@$listFile" -mmt=on
}
else {
    Write-Host "Using .NET compression..."
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    $zip = [System.IO.Compression.ZipFile]::Open($out, 'Create')

    # Add root files
    foreach ($fullPath in $filesToZip) {
        $entryName = [System.IO.Path]::GetFileName($fullPath)
        if ($entryName -eq ".htaccess") { $entryName = ".htaccess" }
        [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $fullPath, $entryName, 'Optimal') | Out-Null
        Write-Host "  + $entryName"
    }

    # Add folders recursively
    foreach ($dir in $folders) {
        $dp = Join-Path $root $dir
        if (Test-Path $dp) {
            Get-ChildItem $dp -Recurse -File | ForEach-Object {
                $entry = $_.FullName.Substring($root.Length + 1).Replace('\', '/')
                [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $_.FullName, $entry, 'Optimal') | Out-Null
            }
            Write-Host "  + $dir/ (all files)"
        }
    }

    $zip.Dispose()
}

$size = [math]::Round((Get-Item $out).Length / 1MB, 1)
Write-Host ""
Write-Host "====================================="
Write-Host "DONE! Zip created: $out"
Write-Host "Size: $size MB"
Write-Host "====================================="
