# Read the index.html file
$content = Get-Content "C:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean\index.html" -Raw

# Read the new testimonials HTML
$newTestimonials = Get-Content "C:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean\new-testimonials.html" -Raw

# Find and replace the testimonials section
# Pattern: from "<!-- Testimonials Section" to "</section>" before "<!-- Latest Blog"
$pattern = '(?s)<!-- Testimonials Section.*?</section>\s+(?=<!-- Latest Blog)'
$content = $content -replace $pattern, $newTestimonials

# Save the updated file
Set-Content "C:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean\index.html" -Value $content -NoNewline

Write-Host "✅ Testimonials section replaced successfully!" -ForegroundColor Green
