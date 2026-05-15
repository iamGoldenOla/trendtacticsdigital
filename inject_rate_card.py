import re
import os

rate_card_path = "trendtactics-rate-card-2.html"
pricing_path = "pricing.html"
css_path = "styles/rate-card.css"

with open(rate_card_path, "r", encoding="utf-8") as f:
    rate_card_html = f.read()

# Extract styles
style_match = re.search(r'<style>(.*?)</style>', rate_card_html, re.DOTALL)
if style_match:
    styles = style_match.group(1)
else:
    print("No styles found.")
    styles = ""

# Scope the styles
styles = styles.replace("body::before", ".rate-card-wrapper::before")
styles = styles.replace("body::after", ".rate-card-wrapper::after")
styles = styles.replace("body {", ".rate-card-wrapper {")
styles = styles.replace("header, .intro-strip, main, footer { position: relative; z-index: 1; }", ".rate-card-header, .intro-strip, .rate-card-main { position: relative; z-index: 1; }")
styles = styles.replace("header {", ".rate-card-header {")
styles = styles.replace("main {", ".rate-card-main {")
styles = styles.replace("footer {", ".rate-card-footer {")

with open(css_path, "w", encoding="utf-8") as f:
    f.write(styles)

print("Created styles/rate-card.css")

# Extract HTML content
# We want to extract from <header> to </main>
html_match = re.search(r'(<header>.*?</main>)', rate_card_html, re.DOTALL)
if html_match:
    extracted_html = html_match.group(1)
    # Rename tags to match CSS
    extracted_html = extracted_html.replace("<header>", '<div class="rate-card-header">')
    extracted_html = extracted_html.replace("</header>", '</div>')
    extracted_html = extracted_html.replace("<main>", '<div class="rate-card-main">')
    extracted_html = extracted_html.replace("</main>", '</div>')
    
    wrapper_html = f'<div class="rate-card-wrapper">\n{extracted_html}\n</div>'
else:
    print("Could not extract HTML content")
    wrapper_html = ""

if wrapper_html:
    with open(pricing_path, "r", encoding="utf-8") as f:
        pricing_content = f.read()

    # Insert CSS link if not present
    if "rate-card.css" not in pricing_content:
        pricing_content = pricing_content.replace('</head>', '    <link rel="stylesheet" href="/styles/rate-card.css">\n</head>')

    # Replace compare-packages
    # We need to find the full compare-packages div.
    # It starts with <div class="compare-packages"> and ends before <!-- Get a Quote Form -->
    start_str = '<div class="compare-packages">'
    end_str = '<!-- Get a Quote Form -->'
    
    start_idx = pricing_content.find(start_str)
    end_idx = pricing_content.find(end_str)
    
    if start_idx != -1 and end_idx != -1:
        # Go back to the end of the previous line for neatness
        # or just replace the chunk
        # Wait, there's some whitespace/closing divs between the end of compare-packages and Get a Quote form.
        # <div class="compare-packages">
        # ...
        # </table>
        # </div>
        # <!-- Get a Quote Form -->
        # Let's find the </div> right before <!-- Get a Quote Form -->
        
        # We can just use a regex
        new_content = pricing_content[:start_idx] + wrapper_html + "\n\n                " + pricing_content[end_idx:]
        
        with open(pricing_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print("Updated pricing.html")
    else:
        print("Could not find compare-packages boundaries")
