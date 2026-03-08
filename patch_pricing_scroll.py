import os
import glob
import re

DIR_PATH = r'c:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean'

def fix_pricing_nav():
    pricing_path = os.path.join(DIR_PATH, 'pricing.html')
    with open(pricing_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to ensure 'Get Started' is present in the nav-menu of pricing.html
    # Some older edits might have removed it or it might just be the old 'Take Quiz' that was present.
    # The standard is:
    # <a href="quiz.html" class="nav-link" style="font-weight: bold;">Take Quiz</a>
    # <a href="hub.html" class="nav-link" style="font-weight: bold;">Get Started</a>
    
    # Let's completely standardize the nav menu of pricing.html to match the global one
    standard_nav = """<div class="nav-menu" id="nav-menu">
                    <a href="index.html" class="nav-link">Home</a>
                    <a href="about.html" class="nav-link">About</a>
                    <div class="nav-item dropdown">
                        <a href="services.html" class="nav-link dropdown-toggle">Services <i class="fas fa-chevron-down"
                                style="font-size:0.8em;margin-left:6px;"></i></a>
                        <ul class="dropdown-menu">
                            <li><a href="services.html">Service Overview</a></li>
                            <li class="dropdown-header">Tech & Development</li>
                            <li><a href="service-web-development.html">Web Development</a></li>
                            <li><a href="service-app-development.html">App Development</a></li>
                            <li class="dropdown-header">Digital Growth Lab</li>
                            <li><a href="service-digital-marketing.html">Digital Marketing Overview</a></li>
                            <li><a href="service-social-media-marketing.html">Social Media Marketing</a></li>
                            <li><a href="service-facebook-ads.html">Facebook Ads</a></li>
                            <li><a href="service-content-creation.html">Content Creation</a></li>
                            <li><a href="service-email-marketing.html">Email Marketing</a></li>
                        </ul>
                    </div>
                    <div class="nav-item dropdown">
                        <a href="resources.html" class="nav-link dropdown-toggle">Resources <i
                                class="fas fa-chevron-down" style="font-size:0.8em;margin-left:6px;"></i></a>
                        <ul class="dropdown-menu">
                            <li><a href="resources.html">Resource Overview</a></li>
                            <li><a href="ebooks.html">Free Books</a></li>
                            <li><a href="tools.html">Marketing Tools</a></li>
                            <li><a href="quiz.html">Growth Quiz</a></li>
                            <li><a href="contact.html">Free Consultation</a></li>
                        </ul>
                    </div>
                    <a href="https://academy.trendtacticsdigital.com" class="nav-link" target="_blank"
                        rel="noopener noreferrer">Academy</a>
                    <a href="pricing.html" class="nav-link">Pricing</a>
                    <a href="blog.html" class="nav-link">Blog</a>
                    <a href="portfolio.html" class="nav-link">Portfolio</a>
                    <a href="contact.html" class="nav-link">Contact</a>
                    <a href="quiz.html" class="nav-link" style="font-weight: bold;">Take Quiz</a>
                    <a href="hub.html" class="nav-link" style="font-weight: bold;">Get Started</a>
                </div>"""

    # We use regex to replace the entire <div class="nav-menu" id="nav-menu"> block
    nav_pattern = re.compile(r'<div class="nav-menu" id="nav-menu">.*?</div>\s*<div class="nav-toggle" id="nav-toggle">', re.DOTALL)
    
    if nav_pattern.search(content):
        content = nav_pattern.sub(standard_nav + '\n                <div class="nav-toggle" id="nav-toggle">', content)
        with open(pricing_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Standardized nav menu in pricing.html successfully.")
    else:
        print("Could not find nav-menu pattern in pricing.html.")

def fix_topbar_scroll():
    html_files = glob.glob(os.path.join(DIR_PATH, '*.html'))
    for file in html_files:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()

        # Update the Top Bar from absolute to fixed.
        # old: position: absolute;
        # new: position: fixed;
        
        old_css = """        .top-bar-redesigned {
            background-color: #061226;
            color: #cbd5e1;
            padding: 8px 0;
            font-size: 0.85rem;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            position: absolute;"""
            
        new_css = """        .top-bar-redesigned {
            background-color: #061226;
            color: #cbd5e1;
            padding: 8px 0;
            font-size: 0.85rem;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            position: fixed;"""

        # Some files might already be fixed, or might have slightly different spacing, but we injected identical strings previously.
        if "position: absolute;" in content and ".top-bar-redesigned {" in content:
            content = content.replace("position: absolute;\n            top: 0;", "position: fixed;\n            top: 0;")
        
        # Another variant from our previous injection logic
        if old_css in content:
             content = content.replace(old_css, new_css)
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)

if __name__ == "__main__":
    print("Executing Fixes...")
    fix_pricing_nav()
    fix_topbar_scroll()
    print("Done")
