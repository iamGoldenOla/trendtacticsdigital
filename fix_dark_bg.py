import re

FILE_PATH = 'c:/Users/Akinola Olujobi/Documents/TrendtacticsDigitalClean/blog-post.html'
with open(FILE_PATH, 'r', encoding='utf-8') as f:
    html = f.read()

new_css = """        /* White Theme Overrides */
        body, main, .blog-post-main, .post-content, .blog-post-layout {
            background-color: #ffffff !important;
            color: #0A1E3F !important;
        }"""

if "body, main, .blog-post-main" not in html:
    html = html.replace("""        /* White Theme Overrides */
        body, main {
            background-color: #ffffff !important;
            color: #0A1E3F !important;
        }""", new_css)

with open(FILE_PATH, 'w', encoding='utf-8') as f:
    f.write(html)
