import os
import re

def unified_sync():
    root_dir = r"c:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean"
    paths = [root_dir, os.path.join(root_dir, "dist")]
    
    academy_old = "https://academy.trendtacticsdigital.com"
    academy_new = "https://akinolaolujobi.com"
    
    # 1. Update Academy links everywhere
    for base in paths:
        for root, dirs, files in os.walk(base):
            if "node_modules" in root or ".git" in root or ".next" in root:
                continue
            for file in files:
                if file.endswith((".html", ".js")):
                    path = os.path.join(root, file)
                    try:
                        with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                            content = f.read()
                        
                        new_content = content.replace(academy_old, academy_new)
                        
                        if new_content != content:
                            print(f"Updating Academy link in {path}")
                            with open(path, 'w', encoding='utf-8') as f:
                                f.write(new_content)
                    except Exception as e:
                        print(f"Error updating {path}: {e}")

    # 2. Fix blog-post.html redundant images in both locations
    blog_paths = [
        os.path.join(root_dir, "blog-post.html"),
        os.path.join(root_dir, "dist", "blog-post.html")
    ]
    
    # regex to remove the hero strip banner
    # <section class="blog-hero-banner"> ... <div class="blog-hero-image-strip"> ... </div> ... </section>
    hero_strip_pattern = r'<div class="blog-hero-image-strip">.*?<img id="post-image" src="(?:/img/|images/)blog3.jpg".*?</div>'
    
    # regex to remove the article post-image
    article_img_pattern = r'<div class="post-image">.*?<img id="post-image" src="(?:/img/|images/)blog3.jpg".*?</div>'

    for path in blog_paths:
        if os.path.exists(path):
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            # Remove line 1108 style strip
            new_content = re.sub(hero_strip_pattern, '', content, flags=re.DOTALL)
            # Remove article style image
            new_content = re.sub(article_img_pattern, '', new_content, flags=re.DOTALL)
            
            if new_content != content:
                print(f"Removed redundant images in {path}")
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)

    # 3. Sync careers.html to dist
    careers_src = os.path.join(root_dir, "careers.html")
    careers_dest = os.path.join(root_dir, "dist", "careers.html")
    if os.path.exists(careers_src):
        import shutil
        shutil.copy2(careers_src, careers_dest)
        print("Synced careers.html to dist/")

if __name__ == "__main__":
    unified_sync()
