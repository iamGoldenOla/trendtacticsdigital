# fix-logo-paths.ps1
# This script updates all HTML files to use absolute paths for the logo

$files = Get-ChildItem -Filter *.html
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Replace relative logo path with absolute path
    # Handles both 'images/Trendtactics_digital_logo.png' and "images/Trendtactics_digital_logo.png"
    $newContent = $content -replace 'src="images/Trendtactics_digital_logo.png"', 'src="/images/Trendtactics_digital_logo.png"'
    $newContent = $newContent -replace "src='images/Trendtactics_digital_logo.png'", "src='/images/Trendtactics_digital_logo.png'"
    
    if ($content -ne $newContent) {
        Set-Content $file.FullName $newContent
        Write-Host "Updated $($file.Name)"
    }
}
