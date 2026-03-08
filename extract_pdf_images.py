import fitz  # PyMuPDF
import os

pdf_dir = r"c:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean\websites portfolio"
output_dir = r"c:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean\images\portfolio"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

files = {
    "ALLENGREEN-03-06-2026_01_23_PM.pdf": "allengreen_preview.png",
    "CORDMALLABEL-Luxury-Nigerian-Fashion-House-03-06-2026_01_31_PM.pdf": "cordmall_preview.png",
    "MetalicHorse-03-06-2026_01_25_PM.pdf": "metalichorse_preview.png",
    "Midway-Health-Inc-Compassionate-Home-Healthcare-in-Chicago-03-06-2026_01_22_PM.pdf": "midway_preview.png",
    "Socrates-Educonsult-03-06-2026_01_28_PM.pdf": "socrates_preview.png"
}

for pdf_name, img_name in files.items():
    pdf_path = os.path.join(pdf_dir, pdf_name)
    output_path = os.path.join(output_dir, img_name)
    
    if os.path.exists(pdf_path):
        try:
            print(f"Processing {pdf_name}...")
            doc = fitz.open(pdf_path)
            page = doc.load_page(0)  # first page
            # Increase resolution for better quality
            zoom = 2    # zoom factor
            mat = fitz.Matrix(zoom, zoom)
            pix = page.get_pixmap(matrix=mat)
            pix.save(output_path)
            doc.close()
            print(f"Saved to {output_path}")
        except Exception as e:
            print(f"Error processing {pdf_name}: {e}")
    else:
        print(f"File not found: {pdf_path}")
