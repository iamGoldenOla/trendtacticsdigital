import os
import glob
import re

html_files = glob.glob('*.html')

pages = [
    'index', 'about', 'services', 'resources', 'ebooks', 'tools', 'quiz', 
    'pricing', 'blog', 'portfolio', 'contact', 'hub', 'service-web-development',
    'service-app-development', 'service-digital-marketing', 'service-social-media-marketing',
    'service-facebook-ads', 'service-content-creation', 'service-email-marketing'
]

for file in html_files:
    try:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        with open(file, 'r', encoding='latin-1') as f:
            content = f.read()
            
    original_content = content
    
    for page in pages:
        # Patern 1: href="/page" or href="page"
        pattern = r'href=([\'"])/?' + page + r'/?([\'"])'
        replacement = r'href=\g<1>' + page + r'.html\g<2>'
        content = re.sub(pattern, replacement, content)
        
        # Pattern 2: href="/page.html" -> href="page.html" (remove leading slash)
        pattern3 = r'href=([\'"])/' + page + r'\.html([\'"])'
        replacement3 = r'href=\g<1>' + page + r'.html\g<2>'
        content = re.sub(pattern3, replacement3, content)
        
    # Replace href="/" with href="index.html"
    content = re.sub(r'href=([\'"])/([\'"])', r'href=\g<1>index.html\g<2>', content)

    if content != original_content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Fixed links in {file}')
print('Done!')
