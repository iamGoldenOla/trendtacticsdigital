import os
import glob

# The old Quick Links block (without Academy & Pricing, with external links)
OLD_LINKS = '''                     <li><a href="contact">Contact</a></li>
                     <li style="margin-top: 15px;"><a href="https://akinolaolujobi.com" target="_blank" style="color: #00FFFF;"><i class="fas fa-external-link-alt" style="font-size: 0.8em; margin-right: 5px;"></i>Akinola Olujobi</a></li>
                     <li><a href="https://edvouralearninghub.com" target="_blank" style="color: #00FFFF;"><i class="fas fa-external-link-alt" style="font-size: 0.8em; margin-right: 5px;"></i>Edvoura Learning Hub</a></li>
                 </ul>'''

# New Quick Links block (with Academy & Pricing added, external links removed)
NEW_LINKS = '''                     <li><a href="contact">Contact</a></li>
                     <li><a href="academy">Academy</a></li>
                     <li><a href="pricing">Pricing</a></li>
                 </ul>'''

# Old copyright bar (no external links)
OLD_COPYRIGHT = '''                <p>Copyright &copy; 2026 Trendtactics Digital. All rights reserved.</p>

            </div>
        </div>'''

# New copyright bar (with Akinola & Edvoura links)
NEW_COPYRIGHT = '''                <p>Copyright &copy; 2026 Trendtactics Digital. All rights reserved.</p>
                <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
                    <a href="https://akinolaolujobi.com" target="_blank" style="color: #64748b; font-size: 0.85rem; text-decoration: none;" onmouseover="this.style.color='#00FFFF'" onmouseout="this.style.color='#64748b'">
                        <i class="fas fa-external-link-alt" style="font-size: 0.75em; margin-right: 4px;"></i>Akinola Olujobi
                    </a>
                    <a href="https://edvouralearninghub.com" target="_blank" style="color: #64748b; font-size: 0.85rem; text-decoration: none;" onmouseover="this.style.color='#00FFFF'" onmouseout="this.style.color='#64748b'">
                        <i class="fas fa-external-link-alt" style="font-size: 0.75em; margin-right: 4px;"></i>Edvoura Learning Hub
                    </a>
                </div>

            </div>
        </div>'''

# Also handle pricing.html which already had its own pattern applied (slightly different whitespace)
OLD_COPYRIGHT_PRICING = '''                <p>Copyright &copy; 2026 Trendtactics Digital. All rights reserved.</p>
                <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">'''

# pricing.html specific old Quick Links (already was fixed but needs Academy/Pricing)
OLD_PRICING_LINKS = '''                    <li><a href="contact">Contact</a></li>
                </ul>'''
NEW_PRICING_LINKS = '''                    <li><a href="contact">Contact</a></li>
                    <li><a href="academy">Academy</a></li>
                    <li><a href="pricing">Pricing</a></li>
                </ul>'''

# Get all HTML files to update (main public pages only)
pages = [
    "index.html", "about.html", "services.html", "portfolio.html",
    "pricing.html", "contact.html", "blog.html", "careers.html",
    "resources.html", "ebooks.html", "tools.html", "quiz.html",
    "integrated-academy.html"
]

updated = []
skipped = []

for page in pages:
    if not os.path.exists(page):
        skipped.append(page)
        continue
    
    with open(page, "r", encoding="utf-8") as f:
        content = f.read()
    
    original = content
    
    # 1. Fix Quick Links — remove external links, add Academy & Pricing
    if OLD_LINKS in content:
        content = content.replace(OLD_LINKS, NEW_LINKS)
    elif OLD_PRICING_LINKS in content and "akinolaolujobi" not in content.split(OLD_PRICING_LINKS)[0].split("Quick Links")[-1]:
        # For pricing.html which already had links removed
        content = content.replace(OLD_PRICING_LINKS, NEW_PRICING_LINKS, 1)
    
    # 2. Fix copyright bar — only add if not already there
    if OLD_COPYRIGHT in content:
        content = content.replace(OLD_COPYRIGHT, NEW_COPYRIGHT, 1)
    
    if content != original:
        with open(page, "w", encoding="utf-8") as f:
            f.write(content)
        updated.append(page)
    else:
        skipped.append(page + " (no match)")

print("Updated:", updated)
print("Skipped:", skipped)
