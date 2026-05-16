import os
import glob

# Files to update - all HTML pages
html_files = glob.glob('*.html')
updated = []

# Patterns to replace in the NAV BUTTON ONLY (not content "Get Started" headings)
# These are the exact nav dropdown button patterns
nav_patterns = [
    # Pattern 1: dropdown button with "Get Started" text (most common)
    (
        'class="btn-get-started dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">\n                            Get Started',
        'class="btn-get-started dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">\n                            Start a Project'
    ),
    # Pattern 2: some pages have slightly different whitespace
    (
        'class="btn-get-started dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">\r\n                            Get Started',
        'class="btn-get-started dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">\r\n                            Start a Project'
    ),
    # Pattern 3: top-get-started links (sub-nav / hero) pointing to hub
    (
        'href="hub" class="top-get-started">Get Started</a>',
        'href="website-solutions#project-form" class="top-get-started">Start a Project</a>'
    ),
    # Pattern 4: some files use href="#" for the dropdown toggle
    (
        'href="#" class="btn-get-started dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Get Started</a>',
        'href="#" class="btn-get-started dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Start a Project</a>'
    ),
]

for filepath in html_files:
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        original = content
        for old, new in nav_patterns:
            content = content.replace(old, new)

        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            updated.append(filepath)
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

print(f"Updated {len(updated)} files:")
for f in updated:
    print(f"  - {f}")
