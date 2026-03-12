import os
import shutil

def sync_html_to_dist():
    root_dir = r"c:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean"
    dist_dir = os.path.join(root_dir, "dist")
    
    if not os.path.exists(dist_dir):
        os.makedirs(dist_dir)
        
    html_files = [f for f in os.listdir(root_dir) if f.endswith(".html")]
    
    for file in html_files:
        src = os.path.join(root_dir, file)
        dst = os.path.join(dist_dir, file)
        shutil.copy2(src, dst)
        print(f"Synced {file} to dist/")

    # Also sync main.css
    css_src = os.path.join(root_dir, "styles", "main.css")
    css_dst = os.path.join(dist_dir, "styles", "main.css")
    if os.path.exists(css_src):
        os.makedirs(os.path.dirname(css_dst), exist_ok=True)
        shutil.copy2(css_src, css_dst)
        print("Synced styles/main.css to dist/")

if __name__ == "__main__":
    sync_html_to_dist()
