import re

filename = 'styles/services-premium.css'

with open(filename, 'r', encoding='utf-8') as f:
    css = f.read()

old_grid = r'\.faq-grid\s*{\s*display:\s*grid;\s*gap:\s*1\.5rem;\s*}'

new_grid = '''
.faq-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5rem;
    align-items: start;
}'''

css_replaced = re.sub(old_grid, new_grid.strip(), css, count=1)

if css_replaced != css:
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(css_replaced)
    print("Replaced .faq-grid successfully.")
else:
    print("Could not find .faq-grid to replace.")
