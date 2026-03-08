import re

# Fix tools.html visibility and spacing
TOOLS_PATH = 'c:/Users/Akinola Olujobi/Documents/TrendtacticsDigitalClean/tools.html'

with open(TOOLS_PATH, 'r', encoding='utf-8') as f:
    tools_html = f.read()

spacing_overrides = """
        /* Fix CTA Visibility & excessive spacing between main section and CTA */
        .tools-main-section {
            padding-bottom: 2rem !important; /* Reduce excessive gap */
        }
        .cta {
            background-color: #ffffff !important;
            padding: 4rem 0 !important;
            margin-top: 0 !important;
        }
        .cta::before, .cta::after { display: none !important; }
        .cta .cta-title, .cta h2 {
            color: #0A1E3F !important;
            text-shadow: none !important;
        }
        .cta .cta-subtitle, .cta p {
            color: #4a5568 !important;
        }
"""

if "/* Fix CTA Visibility & excessive spacing between main section and CTA */" not in tools_html:
    tools_html = tools_html.replace('</style>', spacing_overrides + '\n    </style>')

with open(TOOLS_PATH, 'w', encoding='utf-8') as f:
    f.write(tools_html)
