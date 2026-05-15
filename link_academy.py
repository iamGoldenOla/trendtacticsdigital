import os
import re
import glob

# ─────────────────────────────────────────────────────────────────────────────
# ACADEMY URL CONFIGURATION
# Change this one variable when the subdomain is ready:
#   ACADEMY_URL = "https://academy.trendtacticsdigital.com"
# ─────────────────────────────────────────────────────────────────────────────
ACADEMY_URL = "https://trendtactics-academy-1.vercel.app"

# Get all HTML files in the root (not subdirectories like admin pages)
pages = glob.glob("*.html")

updated = []

for page in pages:
    with open(page, "r", encoding="utf-8") as f:
        content = f.read()

    original = content

    # Replace href="academy" with the external URL
    # Use target="_blank" so it opens in new tab
    content = re.sub(
        r'href="academy"',
        f'href="{ACADEMY_URL}" target="_blank" rel="noopener"',
        content
    )

    # Replace href="academy" that already have target (avoid double target)
    # Fix any double target="_blank" target="_blank" from re-run
    content = re.sub(
        r'target="_blank" rel="noopener" target="_blank"',
        'target="_blank" rel="noopener"',
        content
    )
    # Also fix if it has rel="noopener" already
    content = re.sub(
        r'href="https://trendtactics-academy-1\.vercel\.app" target="_blank" rel="noopener" target="_blank" rel="noopener"',
        f'href="{ACADEMY_URL}" target="_blank" rel="noopener"',
        content
    )

    if content != original:
        with open(page, "w", encoding="utf-8") as f:
            f.write(content)
        updated.append(page)

print(f"Updated {len(updated)} files:")
for f in updated:
    print(f"  - {f}")
