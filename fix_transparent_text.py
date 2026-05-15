import glob
import re

css_files = ['styles/about.css', 'styles/compact-header.css', 'styles/courses.css', 'styles/main.css']

for css_file in css_files:
    try:
        with open(css_file, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
            
        # Replace the text-fill-color lines
        new_content = re.sub(r'^\s*-webkit-text-fill-color:\s*transparent;\s*$', '', content, flags=re.MULTILINE)
        new_content = re.sub(r'^\s*text-fill-color:\s*transparent;\s*$', '', new_content, flags=re.MULTILINE)
        
        if new_content != content:
            with open(css_file, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Fixed transparent text fill in {css_file}")
    except Exception as e:
        print(f"Error processing {css_file}: {e}")
