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

# Get all HTML files
$files = Get-ChildItem -Path "C:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean" -Filter "*.html"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # 1. Replace Logo Image with CSS Logo (Generic pattern for header logo)
    # Matches <a href="/">...<img ... class="logo-img"...>...</a> wrapper or just the img if inside
    # We'll target the img tag specifically if it has class "logo-img"
    
    if ($content -match '<img[^>]*class=["'']logo-img["''][^>]*>') {
        # Check if it's inside an anchor tag we want to replace entirely, OR just replace the anchor content?
        # The snippets showed: 
        # <div class="nav-logo">
        #    <a href="/">
        #        <img ... class="logo-img">
        #    </a>
        # </div>
        # My previous script replaced the <img...> with the full <a>...</a> block.
        # But if the file already has <a href="/"> wrapping it, we might end up with nested <a> tags if not careful.
        # Let's replace the whole <a href="/">...<img...class="logo-img"...>...</a> block.
        
        $content = $content -replace '(?s)<a href="/">\s*<img[^>]*class="logo-img"[^>]*>\s*</a>', $logoHTML
        
        # Fallback: strict image replacement if the anchor wrapper regex fails (e.g. different spacing)
        # But replacing just <img> with <a>...</a> inside an existing <a> is invalid HTML.
        # So we try to match the wrapper.
    }
    
    # 2. Remove compact-header.css link
    if ($content -like '*compact-header.css*') {
        $content = $content -replace '<link rel="stylesheet" href="/styles/compact-header.css">', ''
    }
    
    if ($content -ne $originalContent) {
        Set-Content $file.FullName -Value $content -NoNewline
        Write-Host "Fixed: $($file.Name)" -ForegroundColor Green
    }
}
