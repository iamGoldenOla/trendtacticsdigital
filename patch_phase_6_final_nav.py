import os
import glob
import re

def remove_raw_nav_link(content):
    # This targets the raw <a> tag for Get Started that isn't wrapped in an <li>
    # Example: <a href="hub.html" class="nav-link" style="font-weight: bold;">Get Started</a>
    pattern = r'<a[^>]*href=["\'][^"\']*(?:hub\.html|contact\.html)["\'][^>]*class=["\'][^"\']*nav-link[^"\']*["\'][^>]*>Get Started</a>'
    return re.sub(pattern, '', content, flags=re.IGNORECASE)

def main():
    html_files = glob.glob("*.html")
    for html_file in html_files:
        with open(html_file, "r", encoding="utf-8") as f:
            content = f.read()

        original = content
        
        # Bruteforce Remove from Nav
        content = remove_raw_nav_link(content)

        if content != original:
            with open(html_file, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Removed Get Started from {html_file}")

if __name__ == "__main__":
    main()
