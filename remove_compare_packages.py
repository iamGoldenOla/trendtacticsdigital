import os
import re
import glob

# Find all service pages
pages = glob.glob("service-*.html")
# Also check if services.html has it just in case
if os.path.exists("services.html"):
    pages.append("services.html")

updated = []

for page in pages:
    with open(page, "r", encoding="utf-8") as f:
        content = f.read()

    original = content

    # Regex to match the Compare Packages Table section and remove it
    # We use non-greedy matching to go from the comment to the closing div
    # just before <!-- Get a Quote Form -->
    pattern = r'\s*<!-- Compare Packages Table -->.*?(?=<!-- Get a Quote Form -->)'
    
    content = re.sub(pattern, '\n\n                ', content, flags=re.DOTALL)

    if content != original:
        with open(page, "w", encoding="utf-8") as f:
            f.write(content)
        updated.append(page)

print(f"Removed 'Compare Packages' from {len(updated)} files:")
for f in updated:
    print(f"  - {f}")
