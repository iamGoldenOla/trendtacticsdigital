import re

FILE_PATH = 'c:/Users/Akinola Olujobi/Documents/TrendtacticsDigitalClean/services.html'

with open(FILE_PATH, 'r', encoding='utf-8') as f:
    html = f.read()

# Make sure our previously injected CSS overrides actually force the color.
# We will use !important everywhere on .cta-clean elements
html = html.replace('.cta-clean .cta-title { color: #0A1E3F !important; text-shadow: none !important; }', '.cta-clean .cta-title, .cta-clean h2 { color: #0A1E3F !important; text-shadow: none !important; }')
html = html.replace('.cta-clean .cta-subtitle { color: #4a5568 !important; }', '.cta-clean .cta-subtitle, .cta-clean p { color: #4a5568 !important; }')

# In case it was hardcoded inline as well
html = html.replace('<h2 class="cta-title">Ready to Transform Your Business?</h2>', '<h2 class="cta-title" style="color: #0A1E3F !important;">Ready to Transform Your Business?</h2>')
html = html.replace('<p class="cta-subtitle">\n                    Let\'s discuss how our expert services can help you achieve your digital growth goals and drive real\n                    measurable results.\n                </p>', '<p class="cta-subtitle" style="color: #4a5568 !important;">\n                    Let\'s discuss how our expert services can help you achieve your digital growth goals and drive real\n                    measurable results.\n                </p>')

with open(FILE_PATH, 'w', encoding='utf-8') as f:
    f.write(html)
