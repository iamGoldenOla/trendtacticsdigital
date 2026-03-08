import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

# Pattern 1 matches /* New Top Bar Added Styles */ to the end of the style tag.
pattern1 = re.compile(r'(?s)/\*\s*New Top Bar Added Styles\s*\*/.*?(?=</style>)')

# Pattern 2 matches specifically .navbar { top: 65px !important; } and .navbar.scrolled ...
pattern2 = re.compile(r'(?s)\.navbar\s*\{\s*top:\s*65px\s*!important;\s*\}\s*\.navbar\.scrolled\s*\{\s*top:\s*0\s*!important;\s*\}')

for file in html_files:
    # try utf-16 first, fallback to utf-8
    encoding = 'utf-8'
    with open(file, 'rb') as f:
        raw = f.read()
        if b'\x00' in raw[:100]:
            encoding = 'utf-16'
    
    with open(file, 'r', encoding=encoding, errors='ignore') as f:
        content = f.read()
    
    new_content = pattern1.sub('', content)
    new_content = pattern2.sub('', new_content)
    
    if new_content != content:
        with open(file, 'w', encoding=encoding) as f:
            f.write(new_content)
        print(f'Cleaned {file} ({encoding})')
        
print('Done!')
