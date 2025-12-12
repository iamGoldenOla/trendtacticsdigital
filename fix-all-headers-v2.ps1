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
    try {
        $content = Get-Content $file.FullName -Raw
        $originalContent = $content
        $modified = $false
        
        # 1. Replace Logo Image with CSS Logo
        
        # Pattern A: Wrapped in anchor <a href="/">...<img...>...</a> (non-greedy match for content between)
        if ($content -match '(?s)<a href="/">\s*<img[^>]*class=["'']logo-img["''][^>]*>\s*</a>') {
            $content = $content -replace '(?s)<a href="/">\s*<img[^>]*class=["'']logo-img["''][^>]*>\s*</a>', $logoHTML
            $modified = $true
        }
        # Pattern B: Standalone Image <img...class="logo-img"...> (if Pattern A didn't match/replace)
        elseif ($content -match '<img[^>]*class=["'']logo-img["''][^>]*>') {
            # Be careful not to replace if it's already fixed (the new HTML doesn't have class="logo-img")
            # But wait, the new HTML creates an anchor with inner divs. It does NOT contain class="logo-img".
            # So searching for class="logo-img" is safe.
            $content = $content -replace '<img[^>]*class=["'']logo-img["''][^>]*>', $logoHTML
            $modified = $true
        }
        
        # 2. Remove compact-header.css link
        if ($content -like '*compact-header.css*') {
            $content = $content -replace '\s*<link rel="stylesheet" href="/styles/compact-header.css">', ''
            $modified = $true
        }
        
        if ($modified) {
            Set-Content $file.FullName -Value $content -NoNewline
            Write-Host "Fixed: $($file.Name)" -ForegroundColor Green
        }
    }
    catch {
        Write-Host "Error processing $($file.Name): $_" -ForegroundColor Red
    }
}
