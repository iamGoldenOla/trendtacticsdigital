import os
import re

files = [
    "service-web-development.html",
    "service-app-development.html",
    "service-digital-marketing.html",
    "service-content-creation.html",
    "service-email-marketing.html",
    "service-facebook-ads.html",
    "service-social-media-marketing.html"
]

for filename in files:
    if not os.path.exists(filename):
        print(f"File {filename} not found.")
        continue

    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove emojis in pricing headers
    content = re.sub(r'<h2>📢\s*', '<h2>', content)
    content = re.sub(r'<h2>🔥\s*', '<h2>', content)
    content = re.sub(r'<h3>🔥\s*', '<h3>', content)
    
    # 2. Fix What We Offer color
    content = content.replace(
        'style="font-size: clamp(2rem, 4vw, 3rem); margin-bottom: 1rem; color: #0A1E3F; font-weight: 800;"',
        'style="font-size: clamp(2rem, 4vw, 3rem); margin-bottom: 1rem; color: #ffffff; font-weight: 800;"'
    )
    content = content.replace(
        'color: #4a5568; max-width: 600px; margin: 0 auto;',
        'color: rgba(255, 255, 255, 0.9); max-width: 600px; margin: 0 auto;'
    )

    # 3. For Digital Marketing, update parallax image
    if 'service-digital-marketing' in filename:
        content = content.replace(
            '<source srcset="images/digital-marketing-parallex.jpg" type="image/jpeg">',
            '<source srcset="images/digital-marketing-premium-parallax.jpg" type="image/jpeg">'
        )
        content = content.replace(
            '<img src="images/digital-marketing-parallex.jpg" alt="Comprehensive digital marketing strategy"',
            '<img src="images/digital-marketing-premium-parallax.jpg" alt="Comprehensive digital marketing strategy"'
        )

    # 4. Remove the inline <style> block completely, we will replace it with a new CSS link
    # The style block is typically <style>...</style> in the <head>
    content = re.sub(r'<style>.*?</style>', '', content, flags=re.DOTALL)

    # Make sure we link to our new services stylesheet if it's not there yet
    if 'styles/services-premium.css' not in content:
        content = content.replace('</head>', '    <link rel="stylesheet" href="styles/services-premium.css">\n</head>')

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Updated all service files successfully.")
