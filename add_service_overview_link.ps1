$targetPath = "c:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean"

# Define the old and new HTML snippets
$oldHtml = '<li class="dropdown-header">Tech & Development</li>'
$newHtml = '<li><a href="services.html">Service Overview</a></li>
                            <li class="dropdown-header">Tech & Development</li>'

# Get all HTML files in the directory
$htmlFiles = Get-ChildItem -Path $targetPath -Filter "*.html" -File

$filesUpdated = 0

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw

    # escaping manually since sometimes backslashes get messy
    $oldHtmlEscaped = [regex]::Escape($oldHtml)

    # Check if the file contains the old HTML (and hasn't been updated yet)
    if ($content -match $oldHtmlEscaped -and ($content -notmatch '<li><a href="services.html">Service Overview</a></li>\s*<li class="dropdown-header">Tech & Development</li>')) {
        
        $newContent = $content -replace $oldHtmlEscaped, $newHtml
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        Write-Host "Updated $($file.Name)"
        $filesUpdated++
    }
}

Write-Host "Total files updated: $filesUpdated"
