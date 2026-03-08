import os
import re
import glob

# The premium footer HTML
premium_footer = '''<!-- Master Premium Footer -->
    <footer class="footer premium-footer">
        <div class="footer-glow-top"></div>
        <div class="container relative z-10">
            <div class="footer-content footer-content-grid">
                
                <!-- Brand & Newsletter Column -->
                <div class="footer-column footer-brand-col">
                    <div class="footer-logo mb-4">
                        <a href="index.html" style="display: flex; align-items: center; gap: 10px; text-decoration: none;">
                            <div class="logo-bars">
                                <span></span><span></span><span></span>
                            </div>
                            <span class="logo-text">Trendtactics Digital</span>
                        </a>
                    </div>
                    <p class="footer-description">
                        We don't just market brands — we engineer digital growth.
                        Unlock strategy, creativity, and AI power — all in one studio.
                    </p>
                    <div class="footer-newsletter-widget">
                        <h4 class="mb-3">Join our newsletter</h4>
                        <form class="premium-newsletter-form">
                            <input type="email" placeholder="Email Address" required>
                            <button type="submit"><i class="fas fa-paper-plane"></i></button>
                        </form>
                    </div>
                </div>

                <!-- Services Column -->
                <div class="footer-column">
                    <h3 class="footer-heading">Services</h3>
                    <ul class="footer-links">
                        <li><a href="service-web-development.html">Web Development</a></li>
                        <li><a href="service-app-development.html">App Development</a></li>
                        <li><a href="service-digital-marketing.html">Digital Marketing</a></li>
                        <li><a href="service-social-media-marketing.html">Social Media Marketing</a></li>
                        <li><a href="service-facebook-ads.html">Facebook & IG Ads</a></li>
                        <li><a href="service-content-creation.html">Content Creation</a></li>
                        <li><a href="service-email-marketing.html">Email Marketing</a></li>
                    </ul>
                </div>

                <!-- Company Column -->
                <div class="footer-column">
                    <h3 class="footer-heading">Company</h3>
                    <ul class="footer-links">
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="portfolio.html">Our Work</a></li>
                        <li><a href="blog.html">Insights & Blog</a></li>
                        <li><a href="contact.html">Contact Us</a></li>
                        <li><a href="pricing.html">Pricing</a></li>
                        <li><a href="https://academy.trendtacticsdigital.com" target="_blank" rel="noopener">Academy <span class="badge-new">New</span></a></li>
                    </ul>
                </div>

                <!-- Connect Column -->
                <div class="footer-column">
                    <h3 class="footer-heading">Connect With Us</h3>
                    <div class="footer-contact-info">
                        <a href="mailto:info@trendtacticsdigital.com"><i class="fas fa-envelope"></i> info@trendtacticsdigital.com</a>
                        <a href="contact.html"><i class="fas fa-headphones-alt"></i> 24/7 Support Available</a>
                    </div>
                    <div class="premium-social-links mt-4">
                        <a href="https://linkedin.com/company/trendtactics-digital" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                        <a href="https://twitter.com/trendtactics" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                        <a href="https://instagram.com/trendtactics" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="https://facebook.com/trendtactics" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="https://youtube.com/trendtactics" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                    </div>
                </div>
                
            </div>

            <!-- Footer Bottom -->
            <div class="footer-bottom-bar">
                <div class="footer-copyright">
                    <p>&copy; 2026 Trendtactics Digital. All rights reserved.</p>
                </div>
                <div class="footer-legal-links">
                    <a href="#privacy">Privacy Policy</a>
                    <span class="separator">&middot;</span>
                    <a href="#terms">Terms of Service</a>
                    <span class="separator">&middot;</span>
                    <a href="#cookies">Cookie Policy</a>
                </div>
                <div class="footer-translation flex items-center justify-end" id="google_translate_element_footer">
                    <!-- Placeholder for translate -->
                    <div id="google_translate_element"></div>
                </div>
            </div>
        </div>
    </footer>'''

# Find all HTML files
html_files = glob.glob("*.html")
excluded_files = [f for f in html_files if f.startswith("test-") or f == "temp-brands.html"]

for filename in html_files:
    if filename in excluded_files:
        continue
    
    with open(filename, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # We want to replace everything from <footer class="footer"> to </footer>
    # Regex to find footer block
    # Note: dot matches all doesn't work well if there are multiple footers, but there should be only one main footer
    new_content = re.sub(r'<footer[^>]*class="[^"]*footer[^"]*"[^>]*>.*?</footer>', premium_footer, content, flags=re.DOTALL)
    
    if new_content != content:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated footer in {filename}")
    else:
        print(f"No footer matched or already updated in {filename}")

print("Done updating footers.")
