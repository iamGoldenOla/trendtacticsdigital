import os
import time
import re

ts = str(int(time.time()))
html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for file in html_files:
    # try utf-16 first, fallback to utf-8
    encoding = 'utf-8'
    with open(file, 'rb') as f:
        raw = f.read()
        if b'\x00' in raw[:100]:
            encoding = 'utf-16'
            
    with open(file, 'r', encoding=encoding, errors='ignore') as f:
        content = f.read()
        
    def replace_ts(match):
        return f'href="{match.group(1)}?v={ts}"'
        
    new_content = re.sub(r'href="(styles/[^"]+\.css)[^"]*"', replace_ts, content)
    
    if new_content != content:
        with open(file, 'w', encoding=encoding) as f:
            f.write(new_content)
        print(f"Busted cache in {file} ({encoding})")

print("Done busting caches!")
