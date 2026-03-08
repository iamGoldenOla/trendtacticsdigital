import os
import re

html_files = [
    "index.html", "about.html", "hub.html", "contact.html", "pricing.html", "blog.html",
    "services.html", "growth-marketing.html", "web-development.html", "ai-automation.html", "branding.html",
    "resources.html", "ebooks.html", "tools.html", "quiz.html", "academy.html", "client-portal.html",
    "single-post.html", "privacy-policy.html", "terms.html", "portfolio.html"
]

def revert_top_bar_html():
    # Regex to find the entire top bar block. 
    # It starts with `<div class="top-bar-redesigned"` and ends with `<!-- Navbar -->` or `<nav class="navbar"`
    # But safer: we just regex the block.
    
    # We will use simple string finding if the block is consistent, or regex if safer.
    
    for filename in html_files:
        if not os.path.exists(filename):
            continue
            
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
            
        original_content = content
        
        # 1. Remove Top Bar
        # We know it starts with `<!-- Top Bar -->` or `<div class="top-bar-redesigned"`
        topbar_pattern = re.compile(r'<!-- Top Bar -->.*?<div class="top-bar-redesigned".*?</div>\s*</div>\s*</div>', re.DOTALL)
        
        content = re.sub(topbar_pattern, '', content)
        
        # Second pass in case the closing tags didn't match perfectly, just aggressively zap it if the comment is missing
        topbar_pattern_2 = re.compile(r'<div class="top-bar-redesigned".*?</div>\s*</div>\s*</div>', re.DOTALL)
        content = re.sub(topbar_pattern_2, '', content)

        # 2. Add Get Started back to main nav
        # We need to insert it right before the closing </ul> of .nav-links
        if "hub.html" not in content and 'nav-links' in content:
            # Check if it already has Get Started
            if "Get Started" not in content[content.find('nav-links'):content.find('</nav>')]:
                nav_insertion = """<li><a href="hub.html" class="btn btn-primary btn-sm ml-auto" style="padding: 8px 20px; color: #0A1E3F !important; font-weight: 700; border-radius: 50px;">Get Started</a></li>"""
                content = content.replace('</ul>\n            </div>\n            <div class="hamburger">', f'    {nav_insertion}\n                </ul>\n            </div>\n            <div class="hamburger">')
                
                # Alternate formulation if it didn't match
                if "Get Started" not in content[content.find('nav-links'):content.find('</nav>')]:
                    content = content.replace('</ul>\n        </div>\n        <div class="hamburger">', f'    {nav_insertion}\n            </ul>\n        </div>\n        <div class="hamburger">')

        if content != original_content:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Reverted Top Bar in {filename}")

def revert_css_js():
    # Revert main.css
    css_path = 'styles/main.css'
    if os.path.exists(css_path):
        with open(css_path, 'r', encoding='utf-8') as f:
            css = f.read()
            
        # Strip Phase 7 CSS by looking for the blocks
        css = re.sub(r'/\* ===== TOP BAR RESPONSIVENESS \(PHASE 7 FIXES\) ===== \*/.*?/\* ===== TOP BAR RESPONSIVENESS \(PHASE 7 FIXES\) ===== \*/', '', css, flags=re.DOTALL)
        css = re.sub(r'/\* ===== EXTREME FORCED TOP BAR FIX ===== \*/.*?/\* ===== TOP BAR RESPONSIVENESS \(PHASE 7 FIXES\) ===== \*/', '', css, flags=re.DOTALL)
        
        # Strip Phase 6 CSS related to top bar
        css = re.sub(r'/\* ===== TOP NAVIGATION BAR ===== \*/.*?(?=/\* ===== HEADER ===== \*/)', '', css, flags=re.DOTALL)
        
        with open(css_path, 'w', encoding='utf-8') as f:
            f.write(css)
        print("Reverted Top Bar CSS from main.css")
        
    js_path = 'js/main.js'
    if os.path.exists(js_path):
        with open(js_path, 'r', encoding='utf-8') as f:
            js = f.read()
            
        js = re.sub(r'// ===== AUTO-STACKING FIX FOR TOP BAR & NAVBAR =====.*?// ===============================================', '', js, flags=re.DOTALL)
        
        with open(js_path, 'w', encoding='utf-8') as f:
            f.write(js)
        print("Reverted Top Bar JS from main.js")

if __name__ == '__main__':
    revert_top_bar_html()
    revert_css_js()
