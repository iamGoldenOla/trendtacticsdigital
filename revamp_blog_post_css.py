import re

FILE_PATH = 'c:/Users/Akinola Olujobi/Documents/TrendtacticsDigitalClean/blog-post.html'
with open(FILE_PATH, 'r', encoding='utf-8') as f:
    html = f.read()

# Add specific CSS to force post-body text visibility and shrink CTA
new_css = """        .post-body p, .post-body span, .post-body div, .post-body li {
            color: #334155 !important;
            font-size: 1.15rem !important;
            line-height: 1.8 !important;
            margin-bottom: 25px;
        }
        .post-body h1, .post-body h2, .post-body h3, .post-body h4 {
            color: #0A1E3F !important;
            margin: 40px 0 20px 0 !important;
        }
        .post-body blockquote {
            margin: 40px 0 !important;
            padding: 30px !important;
            background: #f8f9fa !important;
            border-left: 4px solid #0066FF !important;
            border-radius: 0 12px 12px 0 !important;
            font-style: italic !important;
            font-size: 1.25rem !important;
            color: #0A1E3F !important;
        }
        /* CTA Card Overrides */
        .post-cta .cta-content {
            background: #ffffff !important;
            border: 1px solid #e2e8f0 !important;
            border-radius: 16px !important;
            padding: 40px !important;
            box-shadow: 0 10px 30px rgba(0,0,0,0.03) !important;
            max-width: 600px !important;
            margin: 50px auto !important;
            text-align: center !important;
        }
        .post-cta .cta-content h3 {
            color: #0A1E3F !important;
            font-size: 1.5rem !important;
            margin-bottom: 15px !important;
            font-weight: 700 !important;
        }
        .post-cta .cta-content p {
            color: #64748b !important;
            font-size: 1rem !important;
            margin-bottom: 25px !important;
        }
        .post-cta .cta-content .btn {
            padding: 12px 30px !important;
            font-size: 1rem !important;
        }
"""

# Find the end of my White Theme Overrides block
if '/* CTA Card Overrides */' not in html:
    html = html.replace('        .post-body h1, .post-body h2, .post-body h3, .post-body h4 {\n            color: #0A1E3F !important;\n        }', new_css)

with open(FILE_PATH, 'w', encoding='utf-8') as f:
    f.write(html)
