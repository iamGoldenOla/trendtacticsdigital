import re

def rebrand_page(filepath, active_link):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        print(f"Rebranding {filepath}...")
        
        # 1. Inject Top Bar and update Main Nav Bar
        # The target is the <nav id="navigation" class="navbar"> ... </nav> block.
        
        nav_pattern = re.compile(r'<nav id="navigation" class="navbar">.*?</nav>', re.DOTALL)
        
        # The new navigation structure including the top bar
        new_nav = f"""<div class="top-bar">
        <div class="container top-bar-container">
            <div class="top-bar-social">
                <a href="https://facebook.com/trendtactics" target="_blank" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="https://instagram.com/trendtactics" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                <a href="https://linkedin.com/company/trendtactics-digital" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
            </div>
            <div class="top-bar-announcement">
                <span class="typewriter-text">🔥 We don't just market brands — we engineer digital growth! 🔥</span>
            </div>
            <div class="top-bar-cta">
                <a href="quiz.html" class="btn-top-bar">Take Quiz</a>
            </div>
        </div>
    </div>
    
    <nav id="navigation" class="navbar premium-navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <a href="index.html" style="display: flex; align-items: center; gap: 8px; text-decoration: none;">
                    <div style="display: flex; gap: 2px; align-items: flex-end;">
                        <div style="width: 4px; height: 16px; background: #00FFFF; border-radius: 1px;"></div>
                        <div style="width: 4px; height: 20px; background: #00FFFF; border-radius: 1px;"></div>
                        <div style="width: 4px; height: 24px; background: #00FFFF; border-radius: 1px;"></div>
                    </div>
                    <span style="font-family: 'Inter', sans-serif; font-weight: 700; font-size: 1.1rem; color: #FFFFFF; letter-spacing: -0.5px;">Trendtactics Digital</span>
                </a>
            </div>
            <div class="nav-actions">
                <div class="nav-menu" id="nav-menu">
                    <a href="index.html" class="nav-link {'active' if active_link == 'Home' else ''}">Home</a>
                    <a href="about.html" class="nav-link {'active' if active_link == 'About' else ''}">About</a>
                    <div class="nav-item dropdown">
                        <a href="services.html" class="nav-link dropdown-toggle {'active' if active_link == 'Services' else ''}">Services <i class="fas fa-chevron-down" style="font-size:0.8em;margin-left:6px;"></i></a>
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
                        <a href="resources.html" class="nav-link dropdown-toggle {'active' if active_link == 'Resources' else ''}">Resources <i class="fas fa-chevron-down" style="font-size:0.8em;margin-left:6px;"></i></a>
                        <ul class="dropdown-menu">
                            <li><a href="resources.html">Resource Overview</a></li>
                            <li><a href="ebooks.html">Free Books</a></li>
                            <li><a href="tools.html">Marketing Tools</a></li>
                            <li><a href="quiz.html">Growth Quiz</a></li>
                            <li><a href="https://academy.trendtacticsdigital.com">Academy</a></li>
                            <li><a href="contact.html">Free Consultation</a></li>
                            <li><a href="services.html">View All Resources</a></li>
                        </ul>
                    </div>
                    <a href="pricing.html" class="nav-link {'active' if active_link == 'Pricing' else ''}">Pricing</a>
                    <a href="blog.html" class="nav-link {'active' if active_link == 'Blog' else ''}">Blog</a>
                    <a href="portfolio.html" class="nav-link {'active' if active_link == 'Portfolio' else ''}">Portfolio</a>
                    <a href="contact.html" class="nav-link {'active' if active_link == 'Contact' else ''}">Contact</a>
                </div>
                <div class="nav-toggle" id="nav-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="nav-cta">
                    <a href="hub.html" class="btn btn-primary">Get Started</a>
                </div>
            </div>
        </div>
    </nav>"""
        
        if '<nav id="navigation" class="navbar premium-navbar">' not in content:
            content = nav_pattern.sub(new_nav, content)
            
        # 2. Add Top Bar CSS if it doesn't exist
        top_bar_css = """
    <style>
        /* Top Navigation Bar */
        .top-bar {
            background-color: #030d22;
            color: #ffffff;
            padding: 8px 0;
            font-size: 0.85rem;
            position: relative;
            z-index: 1001;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .top-bar-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        .top-bar-social {
            display: flex;
            gap: 15px;
        }
        .top-bar-social a {
            color: rgba(255, 255, 255, 0.7);
            transition: color 0.3s ease, transform 0.3s ease;
        }
        .top-bar-social a:hover {
            color: #00FFFF;
            transform: translateY(-2px);
        }
        .top-bar-announcement {
            flex-grow: 1;
            text-align: center;
            overflow: hidden;
            white-space: nowrap;
        }
        .typewriter-text {
            color: #00FFFF;
            font-weight: 500;
            letter-spacing: 0.5px;
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            margin: 0 auto;
            animation: typing 4s steps(50, end), blink-caret .75s step-end infinite;
        }
        @keyframes typing {
            from { width: 0 }
            to { width: 100% }
        }
        .btn-top-bar {
            background-color: transparent;
            color: #00FFFF;
            border: 1px solid #00FFFF;
            padding: 4px 12px;
            border-radius: 4px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            font-size: 0.8rem;
        }
        .btn-top-bar:hover {
            background-color: #00FFFF;
            color: #030d22;
        }
        
        @media (max-width: 768px) {
            .top-bar-announcement { display: none; }
            .top-bar-container { justify-content: space-between; }
        }
        
        /* Adjust navbar to account for top bar */
        .navbar.premium-navbar {
            position: sticky;
            top: 0;
            z-index: 1000;
        }
    </style>
</head>"""
        
        if '/* Top Navigation Bar */' not in content:
            content = content.replace('</head>', top_bar_css)
            
        # 3. Inject Premium Footer
        footer_pattern = re.compile(r'<footer class="footer[^>]*>.*?</footer>', re.DOTALL)
        
        new_footer = """<footer class="footer premium-footer">
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
    </footer>"""
        
        if '<footer class="footer premium-footer">' not in content:
            content = footer_pattern.sub(new_footer, content)
            
        # Write back changes
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
            
        print(f"Successfully rebranded {filepath}")
            
    except Exception as e:
        print(f"Error processing {filepath}: {str(e)}")

# Process target files
rebrand_page('pricing.html', 'Pricing')
rebrand_page('blog.html', 'Blog')
rebrand_page('portfolio.html', 'Portfolio')
rebrand_page('contact.html', 'Contact')

