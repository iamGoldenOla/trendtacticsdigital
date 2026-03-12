import os

def global_refine():
    root_dir = r"c:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean"
    
    # 1. Define targets
    html_files = []
    for root, dirs, files in os.walk(root_dir):
        # skip git and common ignore dirs
        if '.git' in root or '.gemini' in root or 'node_modules' in root:
            continue
        for file in files:
            if file.endswith(".html"):
                html_files.append(os.path.join(root, file))

    # Academy dropdown replacement
    # Old: <a href="https://akinolaolujobi.com" class="nav-link" target="_blank" rel="noopener noreferrer">Academy</a>
    # New: <div class="nav-item dropdown"> ... Academy ... </div>
    
    academy_old = '<a href="https://akinolaolujobi.com" class="nav-link" target="_blank" rel="noopener noreferrer">Academy</a>'
    academy_new = '''                    <div class="nav-item dropdown">
                        <a href="https://akinolaolujobi.com" class="nav-link dropdown-toggle">Academy <i class="fas fa-chevron-down" style="font-size:0.8em;margin-left:6px;"></i></a>
                        <ul class="dropdown-menu">
                            <li><a href="https://akinolaolujobi.com" target="_blank">Academy Hub</a></li>
                            <li><a href="https://akinolaolujobi.com" target="_blank">Akinola Olujobi</a></li>
                        </ul>
                    </div>'''
    
    copyright_old = 'Copyright &copy; 2026 Akinola Olujobi. All rights reserved.'
    copyright_new = 'Copyright &copy; 2026 Trendtactics Digital. All rights reserved.'

    nav_container_old = '<div class="nav-container">'
    nav_container_new = '<div class="nav-container container">'

    for path in html_files:
        print(f"Refining {path}")
        try:
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            new_content = content
            
            # Update Academy dropdown if it's the old link style
            if academy_old in new_content:
                new_content = new_content.replace(academy_old, academy_new)
            
            # Update Copyright
            if copyright_old in new_content:
                new_content = new_content.replace(copyright_old, copyright_new)
            
            # Update Nav Container Width
            if nav_container_old in new_content:
                new_content = new_content.replace(nav_container_old, nav_container_new)
            
            # Special case for index.html parallax fix propagation to dist
            if "dist\\index.html" in path or "dist/index.html" in path:
                parallax_path_old = "url(/service-parallex.jpg');"
                parallax_path_new = "url('/img/service-parallex.jpg');"
                if parallax_path_old in new_content:
                    new_content = new_content.replace(parallax_path_old, parallax_path_new)

            if new_content != content:
                print(f"Updated {path}")
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
        except Exception as e:
            print(f"Error processing {path}: {e}")

if __name__ == "__main__":
    global_refine()
