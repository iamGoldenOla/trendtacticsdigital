import os
import glob
import re

DIR_PATH = r'c:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean'

def patch_newsletter_js():
    js_path = os.path.join(DIR_PATH, 'js', 'newsletter.js')
    with open(js_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Update selector to include .newsletter-form-lovable
    old_selector = "const forms = document.querySelectorAll('.newsletter-form, [data-newsletter]');"
    new_selector = "const forms = document.querySelectorAll('.newsletter-form, .newsletter-form-lovable, [data-newsletter]');"

    if old_selector in content:
        content = content.replace(old_selector, new_selector)
        with open(js_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Patched newsletter.js selectors.")

def inject_newsletter_script_to_all_html():
    html_files = glob.glob(os.path.join(DIR_PATH, '*.html'))
    script_tag = '<script src="js/newsletter.js" defer></script>'

    for file in html_files:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()

        # If it has the lovable form but doesn't have the newsletter script, inject it before </body>
        if "newsletter-form-lovable" in content and script_tag not in content:
            # First, check if there's a Supabase inclusion. Since Newsletter.js uses window.supabase we need the SDK.
            # We don't want duplicate supabase SDK inclusions.
            supabase_script = '<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>'
            
            injection = ""
            if supabase_script not in content and "@supabase/supabase-js" not in content:
                # Include supabase SDK
                injection += supabase_script + "\n    "
                
            injection += script_tag + "\n</body>"
            
            content = content.replace("</body>", injection)
            
            with open(file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Injected newsletter script into {os.path.basename(file)}")

if __name__ == "__main__":
    patch_newsletter_js()
    inject_newsletter_script_to_all_html()
    print("Newsletter wiring complete.")
