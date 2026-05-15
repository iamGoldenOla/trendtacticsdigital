import re

filepath = "pricing.html"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Remove "Trendtactics Digital." from the rate card header
content = content.replace('<div class="brand-line">Trendtactics Digital<span class="accent">.</span></div>', '')

# 2. Static Website pricing
content = content.replace(
    '<div class="price-main">₦500,000</div>\n        <div class="price-hosting">With Domain & Hosting: <strong>₦600,000</strong></div>',
    '<div class="price-main">₦200,000</div>\n        <div class="price-hosting">With Domain & Hosting: <strong>₦300,000</strong></div>'
)

# 3. Dynamic Website pricing
content = content.replace(
    '<div class="price-main">₦800,000</div>\n        <div class="price-hosting">With Domain & Hosting: <strong>₦900,000</strong></div>',
    '<div class="price-main">₦500,000</div>\n        <div class="price-hosting">With Domain & Hosting: <strong>₦600,000</strong></div>'
)

# 4. Landing Page pricing
content = content.replace(
    '<div class="pkg-price">₦250,000</div>\n        <div class="pkg-hosting">With Domain & Hosting: ₦350,000</div>',
    '<div class="pkg-price">₦150,000</div>\n        <div class="pkg-hosting">With Domain & Hosting: ₦250,000</div>'
)

# 5. App Development pricing
# Currently there are 2 app cards in <div class="app-grid">
old_app_grid = """<div class="app-grid">
    <div class="app-card">
      <div class="app-tier">Tier 01</div>
      <div class="app-name">Basic App</div>
      <div class="app-price-naira">₦2,500,000</div>
      <div class="app-price-usd">$4,000</div>
    </div>
    <div class="app-card">
      <div class="app-tier">Tier 02</div>
      <div class="app-name">Advanced App</div>
      <div class="app-price-naira">₦6,000,000</div>
      <div class="app-price-usd">$10,000</div>
    </div>
  </div>"""

new_app_grid = """<div class="app-grid">
    <div class="app-card" style="border-top: 3px solid var(--gold);">
      <div class="app-tier" style="color: var(--gold);">Tier 01</div>
      <div class="app-name">Basic App</div>
      <div class="app-price-naira">₦1,000,000</div>
      <div class="app-price-usd">$1,500</div>
    </div>
    <div class="app-card" style="border-top: 3px solid var(--gold);">
      <div class="app-tier" style="color: var(--gold);">Tier 02</div>
      <div class="app-name">Professional</div>
      <div class="app-price-naira">₦2,000,000</div>
      <div class="app-price-usd">$3,000</div>
    </div>
    <div class="app-card" style="border-top: 3px solid var(--gold);">
      <div class="app-tier" style="color: var(--gold);">Tier 03</div>
      <div class="app-name">Advanced Enterprise</div>
      <div class="app-price-naira">₦4,000,000</div>
      <div class="app-price-usd">$6,000</div>
    </div>
  </div>"""
  
if old_app_grid in content:
    content = content.replace(old_app_grid, new_app_grid)
else:
    # Try regex if exact match fails
    content = re.sub(r'<div class="app-grid">.*?</div>\s*</div>', new_app_grid, content, flags=re.DOTALL)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated pricing in pricing.html")
