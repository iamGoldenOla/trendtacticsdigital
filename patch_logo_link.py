import os
import glob
import re

DIR_PATH = r'c:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean'

# 1. Add global logo visibility fix to main.css
logo_css_fix = """
/* Force Logo Legibility on Dark Backgrounds */
.navbar .nav-logo img, .nav-logo img {
    background: rgba(255, 255, 255, 0.95) !important;
    padding: 5px 12px !important;
    border-radius: 6px !important;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15) !important;
    display: block !important;
    visibility: visible !important;
    height: 48px !important;
    width: auto !important;
    backdrop-filter: blur(5px);
}
"""

with open(os.path.join(DIR_PATH, 'styles', 'main.css'), 'r', encoding='utf-8') as f:
    main_css = f.read()

if "/* Force Logo Legibility on Dark Backgrounds */" not in main_css:
    with open(os.path.join(DIR_PATH, 'styles', 'main.css'), 'a', encoding='utf-8') as f:
        f.write('\n' + logo_css_fix)

# 2. Fix the "Get Started" link globally from contact.html to hub.html
html_files = glob.glob(os.path.join(DIR_PATH, '*.html'))

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Target exactly the specific link in the navbar that we broke during the mass replace
    if '<a href="contact.html" class="nav-link" style="font-weight: bold;">Get Started</a>' in content:
        content = content.replace(
            '<a href="contact.html" class="nav-link" style="font-weight: bold;">Get Started</a>',
            '<a href="hub.html" class="nav-link" style="font-weight: bold;">Get Started</a>'
        )
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Global logo visibility and Get Started links successfully patched.")
