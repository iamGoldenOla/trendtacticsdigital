def replace_block(content, start_marker, end_marker, new_block):
    start_idx = content.find(start_marker)
    if start_idx == -1: return content, False
    end_idx = content.find(end_marker, start_idx)
    if end_idx == -1: return content, False
    end_idx += len(end_marker)
    
    return content[:start_idx] + new_block + content[end_idx:], True

with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

nav_start = '<nav id="navigation" class="navbar">'
nav_end = '</nav>'
nav_block = index_html[index_html.find(nav_start):index_html.find(nav_end)+len(nav_end)]

footer_start = '<footer class="footer site-footer">'
footer_end = '</footer>'
footer_block = index_html[index_html.find(footer_start):index_html.find(footer_end)+len(footer_end)]

with open('quiz.html', 'r', encoding='utf-8') as f:
    quiz_html = f.read()

quiz_html, nav_replaced = replace_block(quiz_html, '<nav id="navigation"', '</nav>', nav_block)
quiz_html, footer_replaced = replace_block(quiz_html, '<footer', '</footer>', footer_block)

print("Nav replaced:", nav_replaced)
print("Footer replaced:", footer_replaced)

with open('quiz.html', 'w', encoding='utf-8') as f:
    f.write(quiz_html)
