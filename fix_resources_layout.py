import re

# Fix resources.html
RESOURCES_PATH = 'c:/Users/Akinola Olujobi/Documents/TrendtacticsDigitalClean/resources.html'

with open(RESOURCES_PATH, 'r', encoding='utf-8') as f:
    resources_html = f.read()

# The issue is the CTA banner is inside the resources-grid-premium div. It shouldn't be.
resources_html = resources_html.replace('                <div class="resource-card-premium">\n                    <div class="resource-icon-premium"><i class="fas fa-comments"></i></div>\n                    <h3>Consultation</h3>\n                    <p>Book a free 15-minute consultation with our digital marketing experts to discuss your business\n                        strategy and goals.</p>\n                    <a href="contact.html" class="btn btn-primary btn-large">Book Now</a>\n                </div>\n            </div>\n\n            <!-- CTA Banner -->', '                <div class="resource-card-premium">\n                    <div class="resource-icon-premium"><i class="fas fa-comments"></i></div>\n                    <h3>Consultation</h3>\n                    <p>Book a free 15-minute consultation with our digital marketing experts to discuss your business\n                        strategy and goals.</p>\n                    <a href="contact.html" class="btn btn-primary btn-large">Book Now</a>\n                </div>\n            </div>\n        </div>\n    </section>\n\n    <!-- CTA Banner -->\n    <section style="background: #ffffff; padding-bottom: 80px;">\n        <div class="container">\n            <div class="wwo-cta-banner">')

resources_html = resources_html.replace('            </div>\n        </div>\n    </section>\n\n    <!-- Footer -->', '            </div>\n        </div>\n    </section>\n\n    <!-- Footer -->')

master_footer = """    <!-- Master Premium Footer -->
    <footer class="footer site-footer">
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
    </footer>
    <script src="js/browser-compat.js"></script>
    <script src="js/main.js"></script>
    <script src="js/chat-widget.js" defer></script>
</body>
</html>"""

# Replace the old basic footer with the master footer
resources_html = re.sub(r'<!-- Footer -->.*?</html>', master_footer, resources_html, flags=re.DOTALL)

with open(RESOURCES_PATH, 'w', encoding='utf-8') as f:
    f.write(resources_html)
