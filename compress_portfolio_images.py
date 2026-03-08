from PIL import Image
import os

img_dir = r"c:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean\images\portfolio"
if not os.path.exists(img_dir):
    print("Directory not found")
    exit()

for filename in os.listdir(img_dir):
    if filename.endswith(".png"):
        filepath = os.path.join(img_dir, filename)
        try:
            print(f"Compressing {filename}...")
            with Image.open(filepath) as img:
                # Resize if too large (e.g., max width 1200)
                if img.width > 1200:
                    ratio = 1200 / float(img.width)
                    new_height = int(float(img.height) * ratio)
                    img = img.resize((1200, new_height), Image.Resampling.LANCZOS)
                
                # Convert to RGB and save as JPEG for better compression
                rgb_img = img.convert("RGB")
                new_filename = filename.replace(".png", ".jpg")
                new_filepath = os.path.join(img_dir, new_filename)
                rgb_img.save(new_filepath, "JPEG", quality=85, optimize=True)
                
                print(f"Saved compressed JPEG to {new_filepath}")
                # Optional: remove original png to save space, but let's keep it safe for now or just update HTML to use .jpg
        except Exception as e:
            print(f"Error compressing {filename}: {e}")
