filepath = "pricing.html"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# ─────────────────────────────────────────────────────────
# 1. Update E-Commerce Website price to ₦3,000,000
# ─────────────────────────────────────────────────────────
content = content.replace(
    '<div class="rc-pkg-price price-ngn">&#8358;2,000,000</div>\n                        <div class="rc-pkg-price price-usd" style="display:none;">$1,290</div>\n                        <div class="rc-pkg-hosting price-ngn">With Domain &amp; Hosting: &#8358;2,100,000</div>\n                        <div class="rc-pkg-hosting price-usd" style="display:none;">With Domain &amp; Hosting: $1,355</div>',
    '<div class="rc-pkg-price price-ngn">&#8358;3,000,000</div>\n                        <div class="rc-pkg-price price-usd" style="display:none;">$1,935</div>\n                        <div class="rc-pkg-hosting price-ngn">With Domain &amp; Hosting: &#8358;3,100,000</div>\n                        <div class="rc-pkg-hosting price-usd" style="display:none;">With Domain &amp; Hosting: $2,000</div>'
)

# ─────────────────────────────────────────────────────────
# 2. Remove Akinola/Edvoura from Quick Links
# ─────────────────────────────────────────────────────────
old_links = '                    <li style="margin-top: 15px;"><a href="https://akinolaolujobi.com" target="_blank" style="color: #00FFFF;"><i class="fas fa-external-link-alt" style="font-size: 0.8em; margin-right: 5px;"></i>Akinola Olujobi</a></li>\n                    <li><a href="https://edvouralearninghub.com" target="_blank" style="color: #00FFFF;"><i class="fas fa-external-link-alt" style="font-size: 0.8em; margin-right: 5px;"></i>Edvoura Learning Hub</a></li>'
content = content.replace(old_links, '')

# ─────────────────────────────────────────────────────────
# 2b. Add them to the copyright bar instead
# ─────────────────────────────────────────────────────────
old_copyright = '<p>Copyright &copy; 2026 Trendtactics Digital. All rights reserved.</p>'
new_copyright = '''<p>Copyright &copy; 2026 Trendtactics Digital. All rights reserved.</p>
                <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
                    <a href="https://akinolaolujobi.com" target="_blank" style="color: #64748b; font-size: 0.85rem; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#00FFFF'" onmouseout="this.style.color='#64748b'">
                        <i class="fas fa-external-link-alt" style="font-size: 0.75em; margin-right: 4px;"></i>Akinola Olujobi
                    </a>
                    <a href="https://edvouralearninghub.com" target="_blank" style="color: #64748b; font-size: 0.85rem; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#00FFFF'" onmouseout="this.style.color='#64748b'">
                        <i class="fas fa-external-link-alt" style="font-size: 0.75em; margin-right: 4px;"></i>Edvoura Learning Hub
                    </a>
                </div>'''
content = content.replace(old_copyright, new_copyright)

# ─────────────────────────────────────────────────────────
# 3. Reduce excess spacing between sections
#    The CTA section has 100px 0 120px — reduce it
# ─────────────────────────────────────────────────────────
content = content.replace(
    '<section class="cta" style="padding: 100px 0 120px; background: #ffffff; margin-bottom: 0;">',
    '<section class="cta" style="padding: 48px 0 60px; background: #ffffff; margin-bottom: 0;">'
)

# Also add inline style to faq-section to reduce its padding
content = content.replace(
    '<section class="faq-section">',
    '<section class="faq-section" style="padding: 48px 0;">'
)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Done!")
