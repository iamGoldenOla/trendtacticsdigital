import os
import glob
import re

# Fix "68 pages"
for page in glob.glob('*.html'):
    with open(page, 'r', encoding='utf-8') as f:
        content = f.read()
    new_content = content.replace("68 pages", "6-8 pages")
    if new_content != content:
        with open(page, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed 68 pages in {page}")

# Now replace the pricing grid with a CTA for Web and App service pages
pages_to_modify = ['service-web-development.html', 'service-app-development.html']

cta_html = '''
                <div class="pricing-header" style="margin-bottom: 2rem;">
                    <h2>Web & App Pricing Packages</h2>
                    <p>We've created comprehensive pricing tiers for all our Web and App Development services. View our full interactive rate card to compare features, select your currency, and find the perfect fit for your business.</p>
                </div>
                
                <div style="text-align: center; margin-bottom: 4rem;">
                    <a href="pricing" class="btn btn-primary btn-large" style="font-size: 1.2rem; padding: 15px 40px;">View Full Pricing Packages <i class="fas fa-arrow-right" style="margin-left: 8px;"></i></a>
                </div>
'''

for page in pages_to_modify:
    if os.path.exists(page):
        with open(page, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Regex to find pricing-header and pricing-grid and replace it
        pattern = r'<div class="pricing-header">.*?</div>\s*<div class="pricing-grid">.*?</div>'
        new_content = re.sub(pattern, cta_html, content, flags=re.DOTALL)
        
        if new_content != content:
            with open(page, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated pricing section in {page}")
        else:
            print(f"Could not find pricing section in {page}")
