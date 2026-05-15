import re

def update_header_footer():
    # Read index.html to get the gold standard header and footer
    with open('index.html', 'r', encoding='utf-8') as f:
        index_content = f.read()
        
    nav_match = re.search(r'<nav id="navigation" class="navbar">.*?</nav>', index_content, re.DOTALL)
    footer_match = re.search(r'<footer class="footer site-footer">.*?</footer>', index_content, re.DOTALL)
    
    if not nav_match or not footer_match:
        print("Could not find nav or footer in index.html")
        return
        
    nav_html = nav_match.group(0)
    footer_html = footer_match.group(0)
    
    # Read quiz.html
    with open('quiz.html', 'r', encoding='utf-8') as f:
        quiz_content = f.read()
        
    # Replace nav in quiz.html
    new_quiz_content = re.sub(r'<nav[^>]*>.*?</nav>', nav_html, quiz_content, flags=re.DOTALL)
    if new_quiz_content == quiz_content:
        # Maybe it doesn't have a nav tag?
        print("No nav tag replaced in quiz.html")
    
    # Replace footer in quiz.html
    # Some pages might use different footer classes
    new_quiz_content = re.sub(r'<footer[^>]*>.*?</footer>', footer_html, new_quiz_content, flags=re.DOTALL)
    if new_quiz_content == quiz_content:
        print("No footer tag replaced in quiz.html")
        
    with open('quiz.html', 'w', encoding='utf-8') as f:
        f.write(new_quiz_content)
        
    print("Successfully updated quiz.html header and footer!")

if __name__ == '__main__':
    update_header_footer()
