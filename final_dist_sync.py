import os
import shutil

def sync_dist():
    root_dir = r"c:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean"
    dist_dir = os.path.join(root_dir, "dist")
    
    if not os.path.exists(dist_dir):
        print("Dist folder not found.")
        return

    # Sync all root .html files to dist if they exist in dist
    for file in os.listdir(root_dir):
        if file.endswith(".html"):
            src = os.path.join(root_dir, file)
            dest = os.path.join(dist_dir, file)
            if os.path.exists(dest):
                shutil.copy2(src, dest)
                print(f"Synced {file} to dist/")

if __name__ == "__main__":
    sync_dist()
