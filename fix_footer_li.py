import os
import glob

# Pattern to look for
old_pattern = '<li><a href="blog">Blog</a>\n                    <a href="careers" class="nav-link">Careers</a></li>'
new_pattern = '<li><a href="blog">Blog</a></li>\n                    <li><a href="careers" class="nav-link">Careers</a></li>'

old_pattern2 = '<li><a href="blog">Blog</a>\r\n                    <a href="careers" class="nav-link">Careers</a></li>'
new_pattern2 = '<li><a href="blog">Blog</a></li>\n                    <li><a href="careers">Careers</a></li>'

files = glob.glob("*.html")
modified = 0

for file in files:
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()
    
    if old_pattern in content or old_pattern2 in content:
        content = content.replace(old_pattern, new_pattern)
        content = content.replace(old_pattern2, new_pattern2)
        
        # Also clean up "nav-link" class on footer careers link if it's there
        content = content.replace('<li><a href="careers" class="nav-link">Careers</a></li>', '<li><a href="careers">Careers</a></li>')
        
        with open(file, "w", encoding="utf-8") as f:
            f.write(content)
        modified += 1
        print(f"Fixed {file}")

print(f"Total files fixed: {modified}")
