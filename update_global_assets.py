import os
import re

def update_global_assets():
    directory = r"c:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean"
    
    # 1. Favicon replacement
    favicon_pattern = re.compile(r'<link\s+rel="icon"[^>]*href="[^"]*"[^>]*>')
    new_favicon = '<link rel="icon" type="image/png" href="images/Trendtactics_digital_favicon.png">'
    
    # 2. Logo replacement in nav
    nav_logo_pattern = re.compile(r'<div class="nav-logo">.*?</div>', re.DOTALL)
    new_nav_logo = """<div class="nav-logo">
                <a href="index.html" style="display: flex; align-items: center; text-decoration: none;">
                    <img src="images/Trendtactics_digital_logo.png" alt="Trendtactics Digital" style="height: 48px; width: auto;">
                </a>
            </div>"""
            
    # 3. New Lovable Footer (exact copy from reference screenshot)
    footer_pattern = re.compile(r'<footer class="footer.*?>.*?</footer>', re.DOTALL)
    new_footer = """<footer class="footer site-footer">
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

    # Additional CSS for footer that we will inject right before </head> if not present
    footer_css = """
    <style>
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

        @media (max-width: 992px) {
            .site-footer .footer-container {
                grid-template-columns: 1fr 1fr !important;
            }
        }
        @media (max-width: 576px) {
            .site-footer .footer-container {
                grid-template-columns: 1fr !important;
            }
        }

        .site-footer .footer-logo-img {
            height: 40px;
            width: auto;
            margin-bottom: 25px;
            display: block;
        }

        .site-footer .brand-desc {
            font-size: 0.95rem;
            line-height: 1.7;
            color: #94a3b8;
            margin-bottom: 30px;
            max-width: 85%;
        }

        .site-footer .social-icons {
            display: flex;
            gap: 12px;
        }

        .site-footer .social-icons a {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            background-color: rgba(255, 255, 255, 0.05);
            color: #fff;
            border-radius: 8px;
            text-decoration: none;
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.05);
            font-size: 1.1rem;
        }

        .site-footer .social-icons a:hover {
            background-color: #1e293b;
            border-color: #334155;
            color: #00FFFF;
            transform: translateY(-3px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .site-footer h4 {
            color: #ffffff;
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 25px;
            margin-top: 0;
            letter-spacing: 0.3px;
        }

        .site-footer ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .site-footer ul li {
            margin-bottom: 14px;
        }

        .site-footer ul a {
            color: #94a3b8;
            text-decoration: none;
            font-size: 0.95rem;
            transition: color 0.3s ease;
        }

        .site-footer ul a:hover {
            color: #fff;
        }

        .site-footer .newsletter-col p {
            font-size: 0.95rem;
            color: #94a3b8;
            line-height: 1.6;
            margin-bottom: 25px;
        }

        .newsletter-form-lovable {
            display: flex;
            gap: 10px;
        }

        .newsletter-form-lovable input {
            flex: 1;
            padding: 12px 16px;
            background-color: transparent;
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 6px;
            color: #fff;
            font-family: inherit;
            font-size: 0.95rem;
            transition: border-color 0.3s;
        }

        .newsletter-form-lovable input::placeholder {
            color: #64748b;
        }

        .newsletter-form-lovable input:focus {
            outline: none;
            border-color: #00FFFF;
            background-color: rgba(255,255,255,0.02);
        }

        .newsletter-form-lovable button {
            padding: 12px 20px;
            background-color: #1e293b; 
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #fff;
            border-radius: 6px;
            font-weight: 500;
            font-size: 0.95rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
        }

        .newsletter-form-lovable button:hover {
            background-color: #334155;
            border-color: #475569;
        }

        .site-footer .footer-bottom {
            padding: 25px 0;
            background-color: #040d1f;
        }

        .site-footer .footer-bottom p {
            color: #64748b;
            font-size: 0.9rem;
            margin: 0;
        }
    </style>
</head>"""

    for filename in os.listdir(directory):
        if filename.endswith(".html"):
            filepath = os.path.join(directory, filename)
            
            # Avoid the deployment dir for now
            if "deployment" in filepath:
                continue

            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
            except UnicodeDecodeError:
                with open(filepath, 'r', encoding='latin-1', errors='ignore') as f:
                    content = f.read()
                
            original_content = content
            
            # 1. Update Favicon
            if 'favicon' in content.lower() or '<link rel="icon"' in content.lower():
                content = favicon_pattern.sub(new_favicon, content)
            else:
                # insert before </head>
                content = content.replace('</head>', f'{new_favicon}\n</head>')

            # 2. Update Nav Logo
            content = nav_logo_pattern.sub(new_nav_logo, content)

            # 3. Update Footer
            content = footer_pattern.sub(new_footer, content)
            
            # 4. Inject Footer CSS if it hasn't been added yet
            if 'LOVABLE REVAMPED FOOTER' not in content:
                content = content.replace('</head>', footer_css)

            # We only write if changed.
            if content != original_content:
                try:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                except Exception:
                    with open(filepath, 'w', encoding='latin-1', errors='ignore') as f:
                        f.write(content)
                print(f"Updated {filename}")

if __name__ == "__main__":
    update_global_assets()
