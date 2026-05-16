import os
import glob

html_files = glob.glob('*.html')
replaced_count = 0

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    old_link = 'href="hub" style="color: #fff; padding: 10px 20px;">Start a project</a>'
    new_link = 'href="website-solutions#project-form" style="color: #fff; padding: 10px 20px;">Start a project</a>'
    
    if old_link in content:
        content = content.replace(old_link, new_link)
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        replaced_count += 1

print(f'Replaced link in {replaced_count} files.')
