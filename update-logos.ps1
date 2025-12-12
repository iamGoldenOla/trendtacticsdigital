$logoHTML = @'
                <a href="/" style="display: flex; align-items: center; gap: 8px; text-decoration: none;">
                    <div style="display: flex; gap: 2px; align-items: flex-end;">
                        <div style="width: 4px; height: 16px; background: #00FFFF; border-radius: 1px;"></div>
                        <div style="width: 4px; height: 20px; background: #00FFFF; border-radius: 1px;"></div>
                        <div style="width: 4px; height: 24px; background: #00FFFF; border-radius: 1px;"></div>
                    </div>
                    <span style="font-family: 'Inter', sans-serif; font-weight: 700; font-size: 1.1rem; color: #FFFFFF; letter-spacing: -0.5px;">Trendtactics Digital</span>
                </a>
'@

$files = @(
    "C:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean\about.html",
    "C:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean\services.html",
    "C:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean\pricing.html",
    "C:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean\blog.html",
    "C:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean\contact.html"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        
        # Replace the image logo with CSS logo
        $content = $content -replace '<img src="/images/Trendtactics_logo\.jpg" alt="Trendtactics Digital" class="logo-img"[^>]*>', $logoHTML
        
        Set-Content $file -Value $content -NoNewline
        Write-Host "Updated: $file" -ForegroundColor Green
    }
}

Write-Host "`nAll files updated successfully!" -ForegroundColor Cyan
