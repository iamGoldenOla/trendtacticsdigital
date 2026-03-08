import os
import re

html_files = [
    "index.html", "about.html", "hub.html", "contact.html", "pricing.html", "blog.html",
    "services.html", "growth-marketing.html", "web-development.html", "ai-automation.html", "branding.html",
    "resources.html", "ebooks.html", "tools.html", "quiz.html", "academy.html", "client-portal.html",
    "single-post.html", "privacy-policy.html", "terms.html", "portfolio.html"
]

def clean_chat_widget():
    # 1. Remove chat-widget.js from all HTML files
    for filename in html_files:
        if not os.path.exists(filename):
            continue
            
        with open(filename, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            
        original_content = content
        
        # Remove the script tag for chat-widget.js
        content = re.sub(r'<script src="js/chat-widget\.js" defer></script>\s*', '', content)
        content = re.sub(r'<script src="js/chat-widget\.js"></script>\s*', '', content)
        
        if content != original_content:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Removed chat-widget.js from {filename}")

def clean_margin_top():
    # 2. Find any left-over 40px margins in css from the overlap fix
    for filename in os.listdir('styles'):
        if not filename.endswith('.css'):
            continue
            
        filepath = os.path.join('styles', filename)
        
        try:
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                
            original_content = content
            
            # The extreme forced fix was literally `body { padding-top: 40px !important; }`
            # Let's just blindly remove that specific block if it exists anywhere
            content = re.sub(r'body\s*\{\s*padding-top:\s*40px\s*!important;\s*\}', '', content, flags=re.IGNORECASE)
            
            # The `margin-top: 40px` might be attached to .navbar or body
            content = re.sub(r'\.navbar\s*\{[^}]*top:\s*40px\s*!important;[^}]*\}', '', content, flags=re.IGNORECASE)
            content = re.sub(r'\.navbar\s*\{[^}]*margin-top:\s*40px\s*!important;[^}]*\}', '', content, flags=re.IGNORECASE)
            
            if content != original_content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Removed 40px spacing from {filepath}")
        except Exception as e:
            print(f"Error reading {filepath}: {e}")

if __name__ == '__main__':
    clean_chat_widget()
    clean_margin_top()
