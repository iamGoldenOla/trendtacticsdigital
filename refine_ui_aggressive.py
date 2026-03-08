import os
import re

def aggressive_ui_cleanup():
    directory = r"c:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean"
    
    # Files to explicitly convert to white background
    white_bg_files = ['pricing.html', 'portfolio.html', 'contact.html', 'resources.html', 'ebooks.html', 'tools.html', 'quiz.html', 'hub.html', 'about.html', 'service-web-development.html']
    
    # 1. Nav Logo regex to clean up all the broken nested divs from previous replacements
    nav_logo_cleanup_pattern = re.compile(r'<div class="nav-logo">.*?<div class="nav-actions">', re.DOTALL)
    new_nav_wrapper = """<div class="nav-logo">
                <a href="index.html" style="display: flex; align-items: center; text-decoration: none;">
                    <img src="images/Trendtactics_digital_logo.png" alt="Trendtactics Digital" style="height: 48px; width: auto;">
                </a>
            </div>
            <div class="nav-actions">"""
            
    # 2. Typewriter & Fire Emoji cleanup (more permissive regex)
    typewriter_pattern = re.compile(r'<span class="typewriter-text[^>]*>.*?We don\'t just market brands.*?</span>', re.DOTALL | re.IGNORECASE)
    new_top_bar_text = '<span class="top-bar-text fw-bold" style="color: #ffffff; letter-spacing: 0.5px;">We don\'t just market brands — we engineer digital growth!</span>'

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
            
            # Application 1: Nav Logo Cleanup (if the broken text is still there)
            if 'Trendtactics' in content and '<div class="nav-actions">' in content:
                 content = nav_logo_cleanup_pattern.sub(new_nav_wrapper, content)
            
            # Application 2: Top Bar Cleanup
            content = typewriter_pattern.sub(new_top_bar_text, content)
            
            # Application 3: Aggressive White Background conversion
            if filename in white_bg_files:
                # Strip out inline dark gradients and white text colors from hero sections
                content = re.sub(r'background:\s*linear-gradient\([^)]+#0A1E3F[^)]+\);?', 'background: #ffffff;', content)
                content = re.sub(r'color:\s*white;?', 'color: #0A1E3F;', content)
                content = re.sub(r'color:\s*rgba\(255,\s*255,\s*255,\s*0\.9\);?', 'color: #4a5568;', content)
                content = re.sub(r'color:\s*rgba\(255,255,255,0\.9\);?', 'color: #4a5568;', content)
                content = re.sub(r'color:\s*rgba\(255,\s*255,\s*255,\s*0\.7\);?', 'color: #718096;', content)
                content = re.sub(r'color:\s*rgba\(255,255,255,0\.7\);?', 'color: #718096;', content)
                content = re.sub(r'background:\s*rgba\(10,\s*30,\s*63,\s*0\.9\);?', 'background: #f8f9fa;', content)
                content = re.sub(r'background:\s*rgba\(10,30,63,0\.9\);?', 'background: #f8f9fa;', content)
                content = re.sub(r'border:\s*1px\s+solid\s+rgba\(0,\s*255,\s*255,\s*0\.2\);?', 'border: 1px solid #e2e8f0;', content)
                content = re.sub(r'border:\s*1px\s+solid\s+rgba\(0,255,255,0\.2\);?', 'border: 1px solid #e2e8f0;', content)

            # Write changes if modified
            if content != original_content:
                try:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                except Exception:
                    with open(filepath, 'w', encoding='latin-1', errors='ignore') as f:
                        f.write(content)
                print(f"Aggressively Refined UI on {filename}")

if __name__ == "__main__":
    aggressive_ui_cleanup()
