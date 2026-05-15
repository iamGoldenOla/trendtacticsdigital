import os
import re
import glob

html_files = glob.glob('*.html')

search_pattern = r'(<li class="dropdown-header">Tech &amp; Development</li>)'
replace_pattern = r'\1\n                            <li><a href="website-solutions">Website Solutions Guide</a></li>'

for file_path in html_files:
    if file_path == 'admin-website-solutions.html':
        continue # This one doesn't have the standard header

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if it's already added
    if 'href="website-solutions"' in content:
        continue

    # Replace
    new_content = re.sub(search_pattern, replace_pattern, content)

    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file_path}")
    else:
        print(f"Pattern not found or unchanged in {file_path}")

