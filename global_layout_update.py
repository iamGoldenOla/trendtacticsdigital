import os
import re
import glob

DIR_PATH = r'c:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean'

# 1. Prepare styles
nav_css = """
/* Global Nav & Footer Overrides */
.navbar {
    background: transparent !important;
}
.nav-link {
    color: #ffffff !important;
}
.nav-link:hover, .nav-link.active {
    color: #ffffff !important;
    text-shadow: 0 0 10px rgba(255,255,255,0.8);
}
.dropdown-menu {
    background: rgba(10, 30, 63, 0.95) !important;
    backdrop-filter: blur(10px) !important;
}
.dropdown-menu a {
    color: #ffffff !important;
}
.dropdown-menu a:hover {
    color: #ffffff !important;
    background: rgba(255,255,255,0.1) !important;
}

/* --- LOVABLE REVAMPED FOOTER --- */
.site-footer {
    background-color: #061226 !important;
    color: #cbd5e1 !important;
    padding: 70px 0 0 0 !important;
    font-family: 'Inter', sans-serif !important;
    border-top: none !important;
}
.site-footer .footer-container {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1.5fr;
    gap: 50px;
    padding-bottom: 50px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    max-width: 1200px;
    margin: 0 auto;
}
@media (max-width: 992px) { .site-footer .footer-container { grid-template-columns: 1fr 1fr !important; } }
@media (max-width: 576px) { .site-footer .footer-container { grid-template-columns: 1fr !important; } }
.site-footer .footer-logo-img { height: 40px; width: auto; margin-bottom: 25px; display: block; }
.site-footer .brand-desc { font-size: 0.95rem; line-height: 1.7; color: #94a3b8; margin-bottom: 30px; max-width: 85%; }
.site-footer .social-icons { display: flex; gap: 12px; }
.site-footer .social-icons a { display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; background-color: rgba(255, 255, 255, 0.05); color: #fff; border-radius: 8px; text-decoration: none; transition: all 0.3s ease; border: 1px solid rgba(255, 255, 255, 0.05); font-size: 1.1rem; }
.site-footer .social-icons a:hover { background-color: #1e293b; border-color: #334155; color: #ffffff; transform: translateY(-3px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); }
.site-footer h4 { color: #ffffff; font-size: 1.1rem; font-weight: 600; margin-bottom: 25px; margin-top: 0; letter-spacing: 0.3px; }
.site-footer ul { list-style: none; padding: 0; margin: 0; }
.site-footer ul li { margin-bottom: 14px; }
.site-footer ul a { color: #94a3b8; text-decoration: none; font-size: 0.95rem; transition: color 0.3s ease; }
.site-footer ul a:hover { color: #ffffff; text-decoration: none; padding-left: 5px; }
.newsletter-form-lovable { display: flex; flex-direction: column; gap: 12px; margin-top: 15px; }
.newsletter-form-lovable input { padding: 12px 16px; background-color: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 6px; color: #f8fafc; width: 100%; transition: all 0.3s ease; font-size: 0.95rem; }
.newsletter-form-lovable input:focus { outline: none; border-color: #ffffff; background-color: rgba(255, 255, 255, 0.02); }
.newsletter-form-lovable button { padding: 12px 20px; background-color: #1e293b; border: 1px solid rgba(255, 255, 255, 0.1); color: #fff; border-radius: 6px; font-weight: 500; font-size: 0.95rem; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.3s ease; }
.newsletter-form-lovable button:hover { background-color: #334155; border-color: #475569; }
.site-footer .footer-bottom { padding: 25px 0; background-color: #040d1f; }
.site-footer .footer-bottom p { color: #64748b; font-size: 0.9rem; margin: 0; }
"""

# Append to main.css
with open(os.path.join(DIR_PATH, 'styles', 'main.css'), 'r', encoding='utf-8') as f:
    main_css = f.read()
if "/* Global Nav & Footer Overrides */" not in main_css:
    with open(os.path.join(DIR_PATH, 'styles', 'main.css'), 'a', encoding='utf-8') as f:
        f.write('\n' + nav_css)

master_nav = """    <nav id="navigation" class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <a href="index.html" style="display: flex; align-items: center; text-decoration: none;">
                    <img src="images/Trendtactics_digital_logo.png" alt="Trendtactics Digital"
                        style="height: 48px; width: auto;">
                </a>
            </div>
            <div class="nav-actions">
                <div class="nav-menu" id="nav-menu">
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
                    <a href="contact.html" class="nav-link" style="font-weight: bold;">Get Started</a>
                </div>
                <div class="nav-toggle" id="nav-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    </nav>"""

master_footer = """    <footer class="footer site-footer">
        <div class="container footer-container">
            <div class="footer-col brand-col">
                <a href="index.html" class="footer-logo-link">
                    <img src="images/Trendtactics_digital_logo.png" alt="Trendtactics Digital" class="footer-logo-img">
                </a>
                <p class="brand-desc">A premium multi-service brand delivering excellence with professionalism, prestige, and modern clarity across every touchpoint.</p>
                <div class="social-icons">
                    <a href="https://facebook.com/trendtactics" aria-label="Facebook" target="_blank"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://instagram.com/trendtactics" aria-label="Instagram" target="_blank"><i class="fab fa-instagram"></i></a>
                    <a href="https://twitter.com/trendtactics" aria-label="Twitter" target="_blank"><i class="fab fa-twitter"></i></a>
                    <a href="https://linkedin.com/company/trendtactics-digital" aria-label="LinkedIn" target="_blank"><i class="fab fa-linkedin-in"></i></a>
                    <a href="https://youtube.com/trendtactics" aria-label="YouTube" target="_blank"><i class="fab fa-youtube"></i></a>
                </div>
            </div>
            
            <div class="footer-col links-col">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="services.html">Services</a></li>
                    <li><a href="portfolio.html">Portfolio</a></li>
                    <li><a href="blog.html">Blog</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </div>
            
            <div class="footer-col help-col">
                <h4>Help Center</h4>
                <ul>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">Terms of Service</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Cookie Policy</a></li>
                    <li><a href="#">Refund Policy</a></li>
                    <li><a href="#">Disclaimer</a></li>
                    <li><a href="#">Consent Preferences</a></li>
                </ul>
            </div>
            
            <div class="footer-col newsletter-col">
                <h4>Subscribe to Newsletter</h4>
                <p>Get the latest updates, insights, and exclusive content delivered to your inbox.</p>
                <form class="newsletter-form-lovable" action="#">
                    <input type="email" placeholder="Enter email" required>
                    <button type="submit"><i class="fas fa-paper-plane"></i> Subscribe</button>
                </form>
            </div>
        </div>
        
        <div class="footer-bottom">
            <div class="container" style="display: flex; justify-content: space-between; align-items: center;">
                <p>Copyright &copy; 2026 Akinola Olujobi. All rights reserved.</p>
                <div id="google_translate_element_footer">
                    <div id="google_translate_element"></div>
                </div>
            </div>
        </div>
    </footer>"""

html_files = glob.glob(os.path.join(DIR_PATH, '*.html'))

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Nav replacement
    # Using regex to match from <nav id="navigation" to </nav>
    content = re.sub(r'<nav id="navigation".*?</nav>', master_nav, content, flags=re.DOTALL)
    
    # In some places <nav class="navbar"
    content = re.sub(r'<nav class="navbar.*?id="navigation".*?</nav>', master_nav, content, flags=re.DOTALL)
    
    # General fallback for any <nav> block if the above fails
    if "nav-menu" in content and "<nav" in content and 'class="navbar' in content:
        content = re.sub(r'<nav.*?class="navbar.*?</nav>', master_nav, content, flags=re.DOTALL)

    # Footer replacement
    # Capture from comment "<!-- Footer" or "<footer class="footer" to "</footer>"
    content = re.sub(r'<footer class="footer site-footer">.*?</footer>', master_footer, content, flags=re.DOTALL)
    content = re.sub(r'<!-- Footer -->.*?<footer', '<!-- Footer -->\n    <footer', content, flags=re.DOTALL)

    # Home page Logo fix specifically for old paths like "images/Trendtactics_logo.png"
    if content.find('images/Trendtactics_logo.png') != -1:
        content = content.replace('images/Trendtactics_logo.png', 'images/Trendtactics_digital_logo.png')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Mass replacement complete.")
