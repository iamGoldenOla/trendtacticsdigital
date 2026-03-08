import os
import re
import glob

DIR_PATH = r'c:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean'

def fix_about_and_topbar():
    about_path = os.path.join(DIR_PATH, 'about.html')
    with open(about_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Swap CEO and Mission/Vision
    swap_css = """
    <style>
        @media (min-width: 993px) {
            .philosophy-layout {
                display: flex !important;
                flex-direction: row-reverse !important;
                gap: 50px;
                align-items: center;
            }
            .philosophy-layout > div {
                flex: 1;
                /* Ensure they take equal space */
            }
        }
    </style>
    """
    if "flex-direction: row-reverse !important;" not in content:
        content = content.replace("</head>", swap_css + "</head>")

    # 2. Fix Testimonials Author Name Visibility inside trust-author-redesigned ONLY
    # This ensures we don't accidentally break white background sections
    content = re.sub(
        r'<strong\s+style="color: #0A1E3F !important;\s*opacity: 1 !important;\s*visibility: visible !important;">(.*?)</strong>',
        r'<strong style="color: #00FFFF !important; opacity: 1 !important; visibility: visible !important;">\1</strong>',
        content, flags=re.DOTALL
    )
    
    content = re.sub(
        r'<span\s+style="color: #4a5568 !important;\s*opacity: 1 !important;\s*visibility: visible !important;">(.*?)</span>',
        r'<span style="color: #cbd5e1 !important; opacity: 1 !important; visibility: visible !important;">\1</span>',
        content, flags=re.DOTALL
    )

    with open(about_path, 'w', encoding='utf-8') as f:
        f.write(content)

    # 3. Fix Top Bar Google Logo
    html_files = glob.glob(os.path.join(DIR_PATH, '*.html'))
    for file in html_files:
        with open(file, 'r', encoding='utf-8') as f:
            file_content = f.read()

        topbar_css_addition = """
        /* Hide Google Translate Logo */
        .goog-te-gadget {
            color: transparent !important;
            font-size: 0px !important;
        }
        .goog-te-gadget img {
            display: none !important;
        }
        .goog-te-gadget .goog-te-combo {
            color: #cbd5e1 !important;
            background-color: #1e293b !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            border-radius: 4px;
            padding: 3px 6px;
            font-size: 0.8rem;
            outline: none;
            cursor: pointer;
        }
        .goog-te-gadget .goog-te-combo:focus {
            border-color: #00FFFF !important;
        }
        """
        
        if "/* Hide Google Translate Logo */" not in file_content and ".top-bar-redesigned {" in file_content:
            file_content = file_content.replace(".top-bar-redesigned {", topbar_css_addition + "\n        .top-bar-redesigned {")
            with open(file, 'w', encoding='utf-8') as f:
                f.write(file_content)

if __name__ == "__main__":
    print("Fixing About page Layout, Testimonial colors, and Google Translate UI globally...")
    fix_about_and_topbar()
    print("Done")
