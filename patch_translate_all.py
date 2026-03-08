import os
import re

directory = r"C:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean"

# We want to remove a few specific patterns of old translation code
translation_patterns = [
    # The div element itself
    r'<div\s+id="google_translate_element"[^>]*>.*?</div>',
    
    # Custom floating wrappers in blog-post.html
    r'<div\s+id="floating-translate-btn".*?</div>\s*</div>',
    
    # Old google translate init scripts
    r'<script[^>]*>\s*function\s+googleTranslateElementInit(?:Top)?\s*\(\)\s*\{.*?\n?\s*\}\s*</script>',
    
    # The external loaded script
    r'<script\s+type="text/javascript"\s+src="//translate\.google\.com/translate_a/element\.js\?cb=[^"]*"></script>',
    
    # Specific snippet from blog post that moves the translate widget
    r'<script>\s*// Move Google Translate widget into floating widget.*?</script>'
]

files_updated = 0

for root, _, files in os.walk(directory):
    # Skip deployment, backend, node_modules, .git
    if any(skip in root for skip in ['deployment', 'backend', 'node_modules', '.git', 'trendtacticsdigital']):
        continue
        
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                
            original_content = content
            
            # Remove old stuff using regex
            for pattern in translation_patterns:
                content = re.sub(pattern, '', content, flags=re.DOTALL | re.IGNORECASE)
                
            # Also remove any stranded <div id="google_translate_element_footer"> wrappers
            content = re.sub(r'<div\s+id="google_translate_element_footer">\s*</div>', '', content, flags=re.DOTALL)
            content = re.sub(r'<div\s+id="google_translate_element_top"[^>]*>.*?</div>', '', content, flags=re.DOTALL)

            # Check if the new script is already injected
            if 'src="js/global-translate.js"' not in content:
                # Inject before </body>
                injection = '\n    <script src="js/global-translate.js" defer></script>\n</body>'
                content = content.replace('</body>', injection)
            
            if content != original_content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                files_updated += 1
                print(f"Updated {file}")

print(f"Update complete. Modified {files_updated} HTML files.")
