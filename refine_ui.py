import os
import re

def refine_ui_globally():
    directory = r"c:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean"
    
    # Files to explicitly convert to white background
    white_bg_files = ['pricing.html', 'portfolio.html', 'contact.html', 'resources.html', 'ebooks.html', 'tools.html', 'quiz.html', 'hub.html', 'about.html']
    
    # 1. Nav Logo regex to clean up all the broken nested divs from previous replacements
    nav_logo_cleanup_pattern = re.compile(r'<div class="nav-logo">.*?<div class="nav-actions">', re.DOTALL)
    new_nav_wrapper = """<div class="nav-logo">
                <a href="index.html" style="display: flex; align-items: center; text-decoration: none;">
                    <img src="images/Trendtactics_digital_logo.png" alt="Trendtactics Digital" style="height: 48px; width: auto;">
                </a>
            </div>
            <div class="nav-actions">"""
            
    # 2. Typewriter & Fire Emoji cleanup
    typewriter_pattern = re.compile(r'<span class="typewriter-text fw-bold">.*?</span>', re.DOTALL)
    new_top_bar_text = '<span class="fw-bold" style="color: #ffffff; letter-spacing: 0.5px;">We don\'t just market brands — we engineer digital growth!</span>'

    # 3. CSS for White Backgrounds on specific pages
    white_bg_css = """
    <style>
        /* --- WHITE BACKGROUND UI REFINEMENTS --- */
        .pricing-hero, .portfolio-hero, .contact-hero, .resource-hero, .auth-hero, .about-hero {
            background: #ffffff !important;
            color: #0A1E3F !important;
            border-bottom: 1px solid #e2e8f0;
        }
        .pricing-hero-title, .portfolio-hero-title, .contact-hero-title, .resource-hero-title, .auth-hero-title, .about-title {
            color: #0A1E3F !important;
        }
        .pricing-hero-subtitle, .portfolio-hero-subtitle, .contact-hero-subtitle, .resource-hero-subtitle, .auth-hero-subtitle, .about-subtitle {
            color: #4a5568 !important;
        }
        .pricing-hero-badge, .portfolio-hero-badge, .contact-hero-badge, .resource-hero-badge, .auth-hero-badge, .about-badge {
            background: rgba(10, 30, 63, 0.05) !important;
            border-color: rgba(10, 30, 63, 0.1) !important;
            color: #0088cc !important;
        }
        .pricing-stat-item .stat-label {
            color: #4a5568 !important;
        }
        .pricing-stat-item .stat-number {
            color: #0A1E3F !important;
            text-shadow: none !important;
        }
        /* Hide dark mode decorative background patterns */
        .pricing-hero-background, .pricing-hero-pattern, .portfolio-hero-pattern, .floating-icon {
            display: none !important;
        }
    </style>
</head>"""

    for filename in os.listdir(directory):
        if filename.endswith(".html"):
            filepath = os.path.join(directory, filename)
            
            # Avoid deployment folder
            if "deployment" in filepath:
                continue

            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
            except UnicodeDecodeError:
                with open(filepath, 'r', encoding='latin-1', errors='ignore') as f:
                    content = f.read()
                
            original_content = content
            
            # Application 1: Nav Logo Cleanup
            content = nav_logo_cleanup_pattern.sub(new_nav_wrapper, content)
            
            # Application 2: Top Bar Cleanup
            content = typewriter_pattern.sub(new_top_bar_text, content)
            
            # Application 3: Only apply White Background CSS to specific target pages
            if filename in white_bg_files:
                if 'WHITE BACKGROUND UI REFINEMENTS' not in content:
                    content = content.replace('</head>', white_bg_css)

            # Write changes if modified
            if content != original_content:
                try:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                except Exception:
                    with open(filepath, 'w', encoding='latin-1', errors='ignore') as f:
                        f.write(content)
                print(f"Refined UI on {filename}")

if __name__ == "__main__":
    refine_ui_globally()
