import os

def fix_css():
    # 1. Clean up index.html
    html_path = 'index.html'
    try:
        with open(html_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # The exact block we want to strip out:
        import re
        content = re.sub(r'<style>[\s\S]*?/\* Blog Read More Button Overhaul \*/[\s\S]*?</style>\n', '', content)
        
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Cleaned index.html")
    except Exception as e:
        print(f"Error on index.html: {e}")

    # 2. Add real styling to styles/main.css
    css_path = 'styles/main.css'
    try:
        with open(css_path, 'r', encoding='utf-8') as f:
            css_content = f.read()

        new_css = """
/* Phase 5 - Blog Home Read More Button Overhaul */
.read-more-home {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 10px 20px !important;
    background-color: #00FFFF !important;
    color: #0A1E3F !important;
    font-weight: 700 !important;
    border-radius: 6px !important;
    text-decoration: none !important;
    margin-top: 15px !important;
    transition: all 0.3s ease !important;
    box-shadow: 0 4px 12px rgba(0, 255, 255, 0.3) !important;
    text-transform: uppercase !important;
    font-size: 0.85rem !important;
    letter-spacing: 0.5px !important;
}

.read-more-home:hover {
    background-color: #0A1E3F !important;
    color: #00FFFF !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 16px rgba(0, 255, 255, 0.4) !important;
}

.read-more-home i {
    margin-left: 8px !important;
    transition: transform 0.3s ease !important;
}

.read-more-home:hover i {
    transform: translateX(4px) !important;
}
"""
        if "Phase 5 - Blog Home Read More" not in css_content:
            with open(css_path, 'a', encoding='utf-8') as f:
                f.write(new_css)
            print("Appended new CSS to styles/main.css")
        else:
            print("CSS already exists.")
            
    except Exception as e:
        print(f"Error on main.css: {e}")

if __name__ == '__main__':
    fix_css()
