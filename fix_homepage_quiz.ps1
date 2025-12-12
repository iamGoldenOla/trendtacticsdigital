# Read temporary files
$brandsContent = Get-Content "C:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean\temp-brands.html" -Raw
$testimonialsContent = Get-Content "C:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean\temp-testimonials.html" -Raw

# 1. FIX HOMEPAGE (index.html)
$indexPath = "C:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean\index.html"
$indexHtml = Get-Content $indexPath -Raw

# Replace Brands Grid
# Matches <div class="brands-grid" id="brands-grid">...</div> (approx)
# Or simpler: replace the exact previous placeholder or content
# The current file has <div class="brands-grid" id="brands-grid">\s*<!-- Brands will be loaded from JSON -->\s*</div>
# But it might differ slightly. Let's try to match the container.

if ($indexHtml -match '(?s)<div class="brands-grid" id="brands-grid">.*?</div>') {
    $indexHtml = $indexHtml -replace '(?s)<div class="brands-grid" id="brands-grid">.*?</div>', $brandsContent
    Write-Host "Replaced Brands in index.html" -ForegroundColor Green
}
else {
    Write-Host "Could not find Brands container in index.html" -ForegroundColor Yellow
}

# Replace Testimonials
# The current testimonials section starts with <!-- Testimonials Section - Modern Scrolling Design -->
# and ends before <!-- Blog Section --> (if it exists) or just find the section tag.
# Since the previous version had literal \n, regex matching might be tricky if we don't account for them.
# We'll match from <!-- Testimonials Section - Modern Scrolling Design --> down to the closing </section> of that block.
# Assuming the next section starts with <!-- 

if ($indexHtml -match '(?s)<!-- Testimonials Section - Modern Scrolling Design -->.*?<section class="testimonials">.*?</section>') {
    $indexHtml = $indexHtml -replace '(?s)<!-- Testimonials Section - Modern Scrolling Design -->.*?<section class="testimonials">.*?</section>', $testimonialsContent
    Write-Host "Replaced Testimonials in index.html" -ForegroundColor Green
}
else {
    # It might be the messy version with \n literals. Let's try a broader match or just overwrite if unique marker found.
    # The messy version looks like: <!-- Testimonials Section - Modern Scrolling Design -->\n <section...
    # The regex dot matches newlines with (?s), but literal \n characters are just characters.
    # Let's try matching the comment.
    if ($indexHtml -match '(?s)<!-- Testimonials Section - Modern Scrolling Design -->.*?(?=<!-- Latest Blog Section|<!-- FAQ Section)') {
        # This is risky if markers aren't there.
        # Let's try simply replacing everything between the specific comments.
        # Actually, the file likely ends shortly after or has other sections.
        # Safest is to find the messy block.
        # Let's try replacing the specific messy string if possible? No, too long.
         
        # Let's try finding the start and the end of the section by looking for the next unique ID or comment.
        # The next section seems to be <!-- Latest Blog Section --> (or similar, or footer).
        # Looking at file: Line 850 is scripts. Line 430 is testimonials.
        # It ends around line 550?
        # Next section marker in index.html line 430+?
        # I don't see a clear "Next Section" marker in the snippet view I had earlier.
        # I'll rely on the </section> tag closing the testimonials.
        # <section class="testimonials"> ... </section>
         
        $indexHtml = $indexHtml -replace '(?s)<!-- Testimonials Section - Modern Scrolling Design -->.*?<section class="testimonials">.*?</section>', $testimonialsContent
    }
}

Set-Content $indexPath -Value $indexHtml -NoNewline


# 2. FIX QUIZ PAGE (quiz.html)
$quizPath = "C:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean\quiz.html"
$quizHtml = Get-Content $quizPath -Raw

# Get Header and Footer from index.html (the raw string in memory now has the updates, so let's use the ORIGINAL file or just extract from cleaned $indexHtml)
# We want the <nav id="navigation" ... </nav> block.
$headerMatch = [regex]::Match($indexHtml, '(?s)<nav id="navigation".*?</nav>')
if ($headerMatch.Success) {
    $fullHeader = $headerMatch.Value
    # Replace header in quiz.html
    # quiz.html has <header class="navbar" ... </header>
    $quizHtml = $quizHtml -replace '(?s)<header class="navbar".*?</header>', $fullHeader
    Write-Host "Replaced Header in quiz.html" -ForegroundColor Green
}

# Get Footer from index.html
# <footer class="footer"> ... </footer>
$footerMatch = [regex]::Match($indexHtml, '(?s)<footer class="footer">.*?</footer>')
if ($footerMatch.Success) {
    $fullFooter = $footerMatch.Value
    # Replace footer in quiz.html
    # quiz.html has <footer style="...">...</footer>
    $quizHtml = $quizHtml -replace '(?s)<footer style=.*?</footer>', $fullFooter
    Write-Host "Replaced Footer in quiz.html" -ForegroundColor Green
}

Set-Content $quizPath -Value $quizHtml -NoNewline
Write-Host "Updates Complete!" -ForegroundColor Cyan
