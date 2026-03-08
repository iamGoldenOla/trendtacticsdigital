import os
import glob
import re

def create_top_bar_html():
    return """<!-- Top Bar -->
    <div class="top-bar-redesigned" style="background-color: #0A1E3F !important; overflow: visible !important; z-index: 9999 !important;">
        <div class="top-bar-container" style="justify-content: space-between; overflow: visible !important;">
            
            <div class="top-bar-left" style="flex: 1; display: flex; align-items: center; gap: 10px; max-width: 50%;">
                <i class="fas fa-bullhorn text-accent-cyan" style="color: #00FFFF; margin-right: 8px;"></i>
                <span id="typewriter-text" class="typewriter-text" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; color: #fff;">Welcome to Trendtactics Digital</span>
            </div>
            
            <div class="top-bar-right" style="flex: 1; display: flex; align-items: center; justify-content: flex-end; gap: 15px; flex-wrap: wrap; overflow: visible !important;">
                
                <div class="social-icons-top" style="display: flex; gap: 10px;">
                    <a href="https://facebook.com/trendtactics" target="_blank" style="color:#fff;"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://instagram.com/trendtactics" target="_blank" style="color:#fff;"><i class="fab fa-instagram"></i></a>
                </div>
                
                <a href="contact.html" class="top-book-call" style="color: #fff; text-decoration: none;">
                    <i class="fas fa-phone-alt" style="margin-right: 5px;"></i> Book a Call
                </a>
                
                <div class="top-search">
                    <i class="fas fa-search" style="color: #fff;"></i>
                    <input type="text" placeholder="Search..." style="background:transparent; border:none; color:#fff;">
                </div>
                
                <a href="academy.html" class="top-cart" title="Ebook Cart" style="color: #fff;">
                    <i class="fas fa-shopping-cart"></i>
                    <span class="cart-badge">0</span>
                </a>
                
                <div id="google_translate_element_top" style="z-index: 10000; position: relative;"></div>
                
                <a href="hub.html" class="top-get-started" style="background: #00FFFF; color: #0A1E3F; font-weight: 700; padding: 4px 12px; border-radius: 4px; text-decoration: none; font-size: 0.85rem; transition: background 0.3s ease;">
                    Get Started
                </a>
            </div>
            
        </div>
    </div>"""

def patch_top_bar(content):
    pattern = r'<!-- Top Bar -->\s*<div class="top-bar-redesigned".*?</div>\s*</div>\s*</div>'
    if re.search(pattern, content, flags=re.DOTALL):
        return re.sub(pattern, create_top_bar_html(), content, flags=re.DOTALL)
    
    pattern2 = r'<!-- Top Bar -->\s*<div class="top-bar-redesigned".*?</div>\s*</div>'
    if re.search(pattern2, content, flags=re.DOTALL):
        return re.sub(pattern2, create_top_bar_html(), content, flags=re.DOTALL)
        
    return content

def remove_main_nav_get_started(content):
    # Very aggressive regex to physically rip out the Get Started List item block from nav-links
    pattern = r'<li[^>]*>\s*<a[^>]*>(?:<i[^>]*></i>\s*)?Get Started</a>\s*</li>'
    return re.sub(pattern, '', content, flags=re.IGNORECASE)

def main():
    html_files = glob.glob("*.html")
    for html_file in html_files:
        with open(html_file, "r", encoding="utf-8") as f:
            content = f.read()

        original = content
        
        # 1. Patch Top Bar (Enforce order and Dark Background)
        content = patch_top_bar(content)
            
        # 2. Bruteforce Remove from Nav
        content = remove_main_nav_get_started(content)

        if content != original:
            with open(html_file, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Patched fixes in {html_file}")

if __name__ == "__main__":
    main()
