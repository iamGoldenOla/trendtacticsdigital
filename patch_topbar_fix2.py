import os
import glob

DIR_PATH = r'c:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean'

def fix_topbar_and_logo():
    html_files = glob.glob(os.path.join(DIR_PATH, '*.html'))
    for file in html_files:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()

        # 1. Update the injected CSS for top-bar to properly position absolute and push navbar
        if "position: relative;" in content and "z-index: 1000;" in content and ".top-bar-redesigned" in content:
            # We want to replace the top-bar CSS block with an improved one
            old_css = """.top-bar-redesigned {
            background-color: #061226;
            color: #cbd5e1;
            padding: 8px 0;
            font-size: 0.85rem;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            position: relative;
            z-index: 1000;
        }"""
            
            new_css = """.top-bar-redesigned {
            background-color: #061226;
            color: #cbd5e1;
            padding: 8px 0;
            font-size: 0.85rem;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 40px;
            overflow: hidden;
            z-index: 1001;
        }
        .navbar {
            top: 40px !important;
            transition: top 0.3s ease, background 0.3s ease !important;
        }
        .navbar.scrolled {
            top: 0 !important;
        }"""
            
            content = content.replace(old_css, new_css)
            
            # Also update mobile flex direction to row to fit 40px height
            old_media = """@media (max-width: 768px) {
            .top-bar-container {
                flex-direction: column;
                gap: 8px;
                text-align: center;
            }
            .top-bar-center {
                max-width: 100%;
            }
        }"""
            
            new_media = """@media (max-width: 768px) {
            .top-bar-container {
                flex-direction: row;
                justify-content: space-between;
                gap: 5px;
            }
            .top-bar-center {
                max-width: 50%;
                font-size: 0.70rem;
            }
            .typewriter-text {
                max-width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            #google_translate_element_top .goog-te-combo {
                width: 60px;
                padding: 1px;
            }
            .top-bar-redesigned {
                height: 40px;
            }
        }"""
            content = content.replace(old_media, new_media)

        # 2. Fix the logo disappearing by adding data-optimized="true"
        # We search for the nav logo img tags and add it.
        target_logo1 = 'style="height: 48px; width: auto; opacity: 1 !important; visibility: visible !important; display: block !important;">'
        if target_logo1 in content and 'data-optimized="true"' not in content:
            content = content.replace(target_logo1, 'data-optimized="true" ' + target_logo1)

        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)

if __name__ == "__main__":
    print("Fixing Top Bar CSS and Logo Data Attributes...")
    fix_topbar_and_logo()
    print("Done")
