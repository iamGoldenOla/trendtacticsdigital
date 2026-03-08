import re

TOOLS_PATH = 'c:/Users/Akinola Olujobi/Documents/TrendtacticsDigitalClean/tools.html'
with open(TOOLS_PATH, 'r', encoding='utf-8') as f:
    tools_html = f.read()

# Force absolute removal of the huge gaps in tools
force_tools_css = """
        /* Force Remove CTA Spacing */
        section.cta {
            background-color: #ffffff !important;
            padding: 40px 0 !important;
            margin-top: 0 !important;
            border-top: 1px solid #f1f5f9 !important;
        }
        .tools-main-section {
            padding-bottom: 2rem !important;
            margin-bottom: 0 !important;
        }
"""
if "/* Force Remove CTA Spacing */" not in tools_html:
    tools_html = tools_html.replace('</style>', force_tools_css + '\n    </style>')

# Force text visibility inline on tools
tools_html = tools_html.replace('<h2 class="cta-title">Need More Advanced Tools?</h2>', '<h2 class="cta-title" style="color: #0A1E3F !important;">Need More Advanced Tools?</h2>')
tools_html = tools_html.replace('<p class="cta-subtitle">\n                Get personalized marketing strategies and expert consultation to take your business to the next level.\n            </p>', '<p class="cta-subtitle" style="color: #4a5568 !important;">\n                Get personalized marketing strategies and expert consultation to take your business to the next level.\n            </p>')

with open(TOOLS_PATH, 'w', encoding='utf-8') as f:
    f.write(tools_html)


QUIZ_PATH = 'c:/Users/Akinola Olujobi/Documents/TrendtacticsDigitalClean/quiz.html'
with open(QUIZ_PATH, 'r', encoding='utf-8') as f:
    quiz_html = f.read()

# Force the hero gap removal
quiz_html = quiz_html.replace('margin-top: 4rem;', 'margin-top: 1rem;')

with open(QUIZ_PATH, 'w', encoding='utf-8') as f:
    f.write(quiz_html)

