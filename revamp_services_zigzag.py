import re

FILE_PATH = 'c:/Users/Akinola Olujobi/Documents/TrendtacticsDigitalClean/services.html'

with open(FILE_PATH, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace inline dark colors in the ZigZag sections to white theme colors
html = html.replace('color: var(--white); margin-bottom: 0.3rem;', 'color: #0A1E3F; margin-bottom: 0.3rem; font-weight: 700;')
html = html.replace('font-size: 0.95rem; opacity: 0.8;', 'font-size: 0.95rem; color: #4a5568;')
html = html.replace('font-size: 0.9rem; opacity: 0.8;', 'font-size: 0.95rem; color: #4a5568;')
html = html.replace('color: var(--white); margin-bottom: 0.5rem;', 'color: #0A1E3F; margin-bottom: 0.5rem; font-weight: 700;')

# Replace the specific hardcoded opacity styling in the Results section
html = html.replace('font-size: 0.95rem; opacity: 0.8; margin-bottom: 0.5rem;', 'font-size: 0.95rem; color: #4a5568; margin-bottom: 0.5rem;')

with open(FILE_PATH, 'w', encoding='utf-8') as f:
    f.write(html)
