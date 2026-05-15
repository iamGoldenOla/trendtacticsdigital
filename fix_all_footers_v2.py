import os
import re

pages = [
    "index.html", "about.html", "services.html", "portfolio.html",
    "pricing.html", "contact.html", "blog.html", "careers.html",
    "resources.html", "ebooks.html", "tools.html", "quiz.html",
    "integrated-academy.html", "service-web-development.html",
    "service-app-development.html", "service-digital-marketing.html",
    "service-content-creation.html", "service-email-marketing.html",
    "service-facebook-ads.html", "service-social-media-marketing.html",
    "services.html"
]

updated = []
skipped = []

# New Quick Links block (Academy + Pricing added, external links removed)
NEW_QUICK_LINKS_UL = '''                    <li><a href="contact">Contact</a></li>
                    <li><a href="academy">Academy</a></li>
                    <li><a href="pricing">Pricing</a></li>
                </ul>'''

# Copyright bar with Akinola & Edvoura in it
COPYRIGHT_ADDITION = '''                <div style="display:flex;gap:20px;align-items:center;flex-wrap:wrap;margin-top:4px;">
                    <a href="https://akinolaolujobi.com" target="_blank" style="color:#64748b;font-size:0.82rem;text-decoration:none;" onmouseover="this.style.color='#00FFFF'" onmouseout="this.style.color='#64748b'"><i class="fas fa-external-link-alt" style="font-size:0.72em;margin-right:4px;"></i>Akinola Olujobi</a>
                    <a href="https://edvouralearninghub.com" target="_blank" style="color:#64748b;font-size:0.82rem;text-decoration:none;" onmouseover="this.style.color='#00FFFF'" onmouseout="this.style.color='#64748b'"><i class="fas fa-external-link-alt" style="font-size:0.72em;margin-right:4px;"></i>Edvoura Learning Hub</a>
                </div>'''

for page in pages:
    if not os.path.exists(page):
        skipped.append(page + " (not found)")
        continue

    with open(page, "r", encoding="utf-8") as f:
        content = f.read()

    original = content

    # ── 1. Remove external links from Quick Links ──────────────────────────────
    # Match: <li style="margin-top: 15px;"><a href="https://akinola... to end of </ul>
    content = re.sub(
        r'\s*<li\s+style="margin-top:\s*15px;">\s*<a href="https://akinolaolujobi\.com".*?</li>\s*'
        r'<li>\s*<a href="https://edvouralearninghub\.com".*?</li>',
        '',
        content,
        flags=re.DOTALL
    )

    # ── 2. Add Academy & Pricing to Quick Links if not already there ────────────
    if '<a href="academy">Academy</a>' not in content:
        # Find the </ul> that closes Quick Links (right after Contact link)
        content = re.sub(
            r'(<li><a href="contact">Contact</a></li>)\s*\n(\s*</ul>)',
            r'\1\n                    <li><a href="academy">Academy</a></li>\n'
            r'                    <li><a href="pricing">Pricing</a></li>\n\2',
            content
        )

    # ── 3. Add Akinola & Edvoura to copyright bar if not already there ─────────
    if 'akinolaolujobi.com' not in content.split('footer-bottom')[1] if 'footer-bottom' in content else True:
        content = re.sub(
            r'(<p>Copyright\s*&copy;\s*2026 Trendtactics Digital\. All rights reserved\.</p>)\s*\n(\s*</div>\s*\n\s*</div>)',
            r'\1\n' + COPYRIGHT_ADDITION + r'\n\2',
            content
        )

    if content != original:
        with open(page, "w", encoding="utf-8") as f:
            f.write(content)
        updated.append(page)
    else:
        skipped.append(page + " (no change needed)")

print("Updated:", updated)
print("Skipped:", skipped)
