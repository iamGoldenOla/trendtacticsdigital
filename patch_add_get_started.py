import os
import re

html_files = [
    "index.html", "about.html", "hub.html", "contact.html", "pricing.html", "blog.html",
    "services.html", "growth-marketing.html", "web-development.html", "ai-automation.html", "branding.html",
    "resources.html", "ebooks.html", "tools.html", "quiz.html", "academy.html", "client-portal.html",
    "single-post.html", "privacy-policy.html", "terms.html", "portfolio.html"
]

def clean_and_inject():
    for filename in html_files:
        if not os.path.exists(filename):
            continue
            
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
            
        original_content = content
        
        # 1. Strip orphan closing tags just above the navbar if they exist
        # Often looks like </div></div></div> before <nav id="navigation"
        orphan_pattern = re.compile(r'</div>\s*</div>\s*</div>\s*(?=<nav id="navigation")', re.IGNORECASE)
        content = re.sub(orphan_pattern, '', content)
        
        # Another pattern just in case
        orphan_pattern_2 = re.compile(r'</div>\s*</div>\s*(?=<nav id="navigation")', re.IGNORECASE)
        content = re.sub(orphan_pattern_2, '', content)

        # 2. Add Get Started button inside nav-menu
        # Find the end of nav-menu which usually ends with Take Quiz or Contact
        # We look for the closing </div> that corresponds to <div class="nav-menu"...>
        # A simple hack is finding `<div class="nav-toggle"` and injecting just before it's parent closing div.
        
        if "hub.html" not in filename and 'nav-menu' in content:
            if "Get Started" not in content and '<div class="nav-toggle"' in content:
                # Injection payload
                nav_insertion = """<a href="hub.html" class="btn btn-primary btn-sm ml-auto" style="padding: 8px 20px; color: #0A1E3F !important; font-weight: 700; border-radius: 50px;">Get Started</a>"""
                
                # We replace the closing tags of nav-menu right before nav-toggle
                content = content.replace('</div>\n                <div class="nav-toggle"', f'    {nav_insertion}\n                </div>\n                <div class="nav-toggle"')
                
                # Alternate for varied tabbing
                if "Get Started" not in content:
                    content = content.replace('</div>\n            <div class="nav-toggle"', f'{nav_insertion}\n            </div>\n            <div class="nav-toggle"')
                    
                if "Get Started" not in content:
                    content = content.replace('</div>\n        <div class="nav-toggle"', f'{nav_insertion}\n        </div>\n        <div class="nav-toggle"')

        if content != original_content:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Cleaned and injected Get Started in {filename}")

if __name__ == '__main__':
    clean_and_inject()
