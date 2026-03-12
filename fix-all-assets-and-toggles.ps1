# fix-all-assets-and-toggles.ps1
# This script performs a global cleanup and path correction for Trendtactics Digital

$files = Get-ChildItem -Filter *.html
foreach ($file in $files) {
    Write-Host "Processing $($file.Name)..."
    $content = Get-Content $file.FullName -Raw
    
    # 1. Convert relative paths to absolute paths
    # Images
    $content = $content -replace 'src="images/', 'src="/images/'
    $content = $content -replace "src='images/", "src='/images/"
    $content = $content -replace 'href="images/', 'href="/images/'
    $content = $content -replace "href='images/", "href='/images/"
    
    # JS
    $content = $content -replace 'src="js/', 'src="/js/'
    $content = $content -replace "src='js/", "src='/js/"
    
    # Styles
    $content = $content -replace 'href="styles/', 'href="/styles/'
    $content = $content -replace "href='styles/", "href='/styles/"
    
    # Videos
    $content = $content -replace 'src="videos/', 'src="/videos/'
    $content = $content -replace "src='videos/", "src='/videos/"

    # 2. Remove legacy language toggle code (if present)
    # This is a bit complex with regex because of the many empty lines, 
    # so we'll target specific markers if possible, or just the IDs.
    
    # Remove the top-bar-redesigned if it exists in HTML
    $content = $content -replace '(?s)<div class="top-bar-redesigned".*?</div>', ''
    
    # Remove google_translate_element_top if it exists in HTML
    $content = $content -replace '(?s)<div id="google_translate_element_top".*?</div>', ''

    Set-Content $file.FullName $content
}

Write-Host "✨ Global asset and toggle fix complete!"
