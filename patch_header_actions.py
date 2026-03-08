import os
import re

target_dir = r"C:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean"

new_dropdown_html = """
                    <div class="nav-item dropdown" style="margin-left: auto;">
                        <a href="#" class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style="padding: 8px 20px; color: #0A1E3F !important; font-weight: 700; border-radius: 50px; text-decoration: none;">
                            Get Started
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end shadow border-0" style="background-color: #0A1E3F; border: 1px solid #00FFFF !important; border-radius: 8px;">
                            <li><a class="dropdown-item" href="hub.html" style="color: #fff; padding: 10px 20px;">Start a project</a></li>
                            <li><a class="dropdown-item" href="quiz.html" style="color: #fff; padding: 10px 20px;">Take Free Quiz</a></li>
                        </ul>
                    </div>"""

def process_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern to match both elements, accounting for exact HTML structure and spaces/newlines
    pattern = re.compile(
        r'<a[^>]*href=["\']quiz\.html["\'][^>]*>Take Quiz</a>\s*<a[^>]*href=["\']hub\.html["\'][^>]*>Get\s*Started</a>',
        re.IGNORECASE | re.DOTALL
    )
    
    if pattern.search(content):
        new_content = pattern.sub(new_dropdown_html, content)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

def main():
    count = 0
    for root, _, files in os.walk(target_dir):
        if '.git' in root or 'node_modules' in root:
            continue
        for file in files:
            if file.endswith(".html"):
                if process_file(os.path.join(root, file)):
                    count += 1
    print(f"Patched {count} files with the new header dropdown.")

if __name__ == "__main__":
    main()
