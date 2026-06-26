// Global Responsive Google Translate Widget & Dynamic Grid Dropdowns
// Injected across all pages via global-translate.js

document.addEventListener('DOMContentLoaded', function () {
    // 1. DYNAMIC DROPDOWN RESTRUCTURING FOR SERVICES & ACADEMY/RESOURCES
    const dropdowns = document.querySelectorAll('.nav-item.dropdown');
    dropdowns.forEach(dropdown => {
        const toggleLink = dropdown.querySelector('.dropdown-toggle');
        if (!toggleLink) return;
        
        const text = toggleLink.textContent.trim().toLowerCase();
        
        if (text.includes('services')) {
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu && !menu.classList.contains('dropdown-grid-menu')) {
                menu.className = 'dropdown-menu dropdown-grid-menu services-grid';
                menu.innerHTML = `
                <div class="dropdown-grid-container">
                    <div class="dropdown-featured-side">
                        <div>
                            <h4>Why Trendtactics?</h4>
                            <p>We blend cutting-edge development with data-driven marketing to scale your business exponentially.</p>
                        </div>
                        <a href="contact.html" class="dropdown-featured-cta">Get Started <i class="fas fa-arrow-right"></i></a>
                    </div>
                    <div class="dropdown-links-side">
                        <div class="dropdown-links-column">
                            <span class="dropdown-column-title">Tech & Development</span>
                            <a href="service-web-development.html" class="dropdown-grid-link">
                                <span class="dropdown-link-title">Web Development</span>
                                <span class="dropdown-link-desc">High-performance custom & E-commerce sites.</span>
                            </a>
                            <a href="service-app-development.html" class="dropdown-grid-link">
                                <span class="dropdown-link-title">App Development</span>
                                <span class="dropdown-link-desc">Native & hybrid mobile applications.</span>
                            </a>
                            <a href="website-solutions.html" class="dropdown-grid-link">
                                <span class="dropdown-link-title">Website Solutions</span>
                                <span class="dropdown-link-desc">Find the perfect digital footprint.</span>
                            </a>
                        </div>
                        <div class="dropdown-links-column">
                            <span class="dropdown-column-title">Digital Growth Lab</span>
                            <a href="service-digital-marketing.html" class="dropdown-grid-link">
                                <span class="dropdown-link-title">Digital Marketing</span>
                                <span class="dropdown-link-desc">SEO, search ads, and lead generation.</span>
                            </a>
                            <a href="service-social-media-marketing.html" class="dropdown-grid-link">
                                <span class="dropdown-link-title">Social Media</span>
                                <span class="dropdown-link-desc">Grow, engage and monetize audiences.</span>
                            </a>
                            <a href="service-facebook-ads.html" class="dropdown-grid-link">
                                <span class="dropdown-link-title">Facebook & IG Ads</span>
                                <span class="dropdown-link-desc">ROI-focused social acquisition.</span>
                            </a>
                            <a href="service-content-creation.html" class="dropdown-grid-link">
                                <span class="dropdown-link-title">Content Creation</span>
                                <span class="dropdown-link-desc">Stunning copywriting, photos, & videos.</span>
                            </a>
                            <a href="service-email-marketing.html" class="dropdown-grid-link">
                                <span class="dropdown-link-title">Email Marketing</span>
                                <span class="dropdown-link-desc">Automated flows to boost customer lifetime value.</span>
                            </a>
                        </div>
                    </div>
                </div>`;
            }
        } else if (text.includes('resources') || text.includes('academy')) {
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu && !menu.classList.contains('dropdown-grid-menu')) {
                menu.className = 'dropdown-menu dropdown-grid-menu academy-grid';
                menu.innerHTML = `
                <div class="dropdown-grid-container">
                    <div class="dropdown-featured-side yellow-theme">
                        <div>
                            <h4>Academy & Insights</h4>
                            <p>Master the digital landscape with our high-impact training programs and resources.</p>
                        </div>
                        <a href="https://academy.trendtacticsdigital.com" target="_blank" rel="noopener" class="dropdown-featured-cta">Visit Academy <i class="fas fa-external-link-alt"></i></a>
                    </div>
                    <div class="dropdown-links-side">
                        <div class="dropdown-links-column">
                            <span class="dropdown-column-title">Resources Hub</span>
                            <a href="resources.html" class="dropdown-grid-link">
                                <span class="dropdown-link-title">Resource Overview</span>
                                <span class="dropdown-link-desc">Browse templates, guides & audits.</span>
                            </a>
                            <a href="tools.html" class="dropdown-grid-link">
                                <span class="dropdown-link-title">Marketing Tools</span>
                                <span class="dropdown-link-desc">Software & utilities we use to grow.</span>
                            </a>
                            <a href="quiz.html" class="dropdown-grid-link">
                                <span class="dropdown-link-title">Growth Quiz</span>
                                <span class="dropdown-link-desc">Check your brand's digital health score.</span>
                            </a>
                        </div>
                        <div class="dropdown-links-column">
                            <span class="dropdown-column-title">Insights</span>
                            <a href="blog.html" class="dropdown-grid-link">
                                <span class="dropdown-link-title">Insights Blog</span>
                                <span class="dropdown-link-desc">Articles on design, dev & marketing.</span>
                            </a>
                            <a href="ebooks.html" class="dropdown-grid-link">
                                <span class="dropdown-link-title">Free Books</span>
                                <span class="dropdown-link-desc">Premium marketing & SEO downloads.</span>
                            </a>
                            <a href="contact.html" class="dropdown-grid-link">
                                <span class="dropdown-link-title">Free Consultation</span>
                                <span class="dropdown-link-desc">1-on-1 strategy call with our team.</span>
                            </a>
                        </div>
                    </div>
                </div>`;
            }
        }
    });

    // 2. STYLING & INJECTION FOR LANGUAGE TRANSLATOR GRID
    const translateCSS = `
        /* Google Translate overrides */
        body { top: 0 !important; } 
        .goog-te-banner-frame.skiptranslate,
        .goog-te-banner-frame {
            display: none !important;
        }
        
        /* Translator Container default (Desktop top-bar placement) */
        #global-translate-container {
            position: relative;
            z-index: 9999;
            display: inline-flex;
            align-items: center;
            gap: 12px;
            font-family: 'Inter', sans-serif;
        }

        #global-translate-btn {
            background: transparent !important;
            color: #94a3b8 !important;
            border: 1px solid rgba(255, 255, 255, 0.15) !important;
            border-radius: 4px !important;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: none !important;
            cursor: pointer;
            font-size: 0.95rem;
            transition: all 0.2s ease;
            outline: none;
            padding: 0;
        }

        #global-translate-btn:hover {
            border-color: #fadb24 !important;
            color: #fadb24 !important;
            background: rgba(255, 255, 255, 0.05) !important;
        }

        /* The solid grid dropdown container opening downwards */
        #global-translate-dropdown {
            background: #000000 !important;
            border-radius: 8px;
            padding: 12px !important;
            border: 1px solid #222222 !important;
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
            pointer-events: none;
            transition: all 0.2s ease;
            position: absolute;
            top: 40px;
            right: 0;
            width: 280px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.5) !important;
        }

        #global-translate-container.open #global-translate-dropdown {
            opacity: 1;
            transform: translateY(0) scale(1);
            pointer-events: auto;
        }

        .lang-grid-title {
            font-size: 0.8rem;
            font-weight: 800;
            color: #fadb24 !important; /* Accent Yellow title */
            text-transform: uppercase;
            letter-spacing: 0.8px;
            margin-bottom: 10px;
            border-bottom: 1px solid #222222;
            padding-bottom: 6px;
        }

        .lang-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
        }

        .lang-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            background: #111111 !important;
            border: 1px solid #222222 !important;
            color: #ffffff !important;
            padding: 8px 12px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.85rem;
            font-weight: 600;
            transition: all 0.2s ease;
            text-align: left;
        }

        .lang-btn:hover {
            border-color: #0047FF !important;
            background: #0047FF !important;
            color: #ffffff !important;
        }

        .lang-btn.active {
            border-color: #fadb24 !important;
            background: #111111 !important;
            color: #fadb24 !important;
        }

        /* Hide Google combo select and branding */
        #google_translate_element,
        .goog-logo-link,
        .goog-te-gadget {
            display: none !important;
        }

        /* Mobile overrides: Float translation widget at bottom-left on mobile */
        @media (max-width: 1024px) {
            #global-translate-container {
                position: fixed !important;
                bottom: 20px !important;
                left: 20px !important;
                z-index: 99999 !important;
            }
            #global-translate-btn {
                background: #0047FF !important;
                color: #ffffff !important;
                border: 2px solid #ffffff !important;
                border-radius: 50% !important;
                width: 50px !important;
                height: 50px !important;
                font-size: 1.3rem !important;
            }
            #global-translate-btn:hover {
                border-color: #fadb24 !important;
                color: #ffffff !important;
                background: #0047FF !important;
            }
            #global-translate-dropdown {
                position: absolute !important;
                bottom: 60px !important;
                top: auto !important;
                left: 0 !important;
                right: auto !important;
                width: 260px !important;
                transform: translateY(10px) scale(0.95) !important;
            }
            #global-translate-container.open #global-translate-dropdown {
                transform: translateY(0) scale(1) !important;
            }
        }
    `;

    // Create and append the style block
    const styleBlock = document.createElement('style');
    styleBlock.innerHTML = translateCSS;
    document.head.appendChild(styleBlock);

    // Build the DOM structure for the translator widget
    const widgetHTML = `
        <button id="global-translate-btn" title="Translate Website">
            <i class="fas fa-globe"></i>
        </button>
        <div id="global-translate-dropdown">
            <div class="lang-grid-title">Select Language</div>
            <div class="lang-grid">
                <button class="lang-btn" data-lang="en">🇬🇧 English</button>
                <button class="lang-btn" data-lang="es">🇪🇸 Spanish</button>
                <button class="lang-btn" data-lang="fr">🇫🇷 French</button>
                <button class="lang-btn" data-lang="de">🇩🇪 German</button>
                <button class="lang-btn" data-lang="pt">🇵🇹 Portuguese</button>
                <button class="lang-btn" data-lang="it">🇮🇹 Italian</button>
                <button class="lang-btn" data-lang="zh-CN">🇨🇳 Chinese</button>
                <button class="lang-btn" data-lang="ar">🇸🇦 Arabic</button>
            </div>
            <div id="google_translate_element"></div>
        </div>
    `;

    // Create translation container
    const container = document.createElement('div');
    container.id = 'global-translate-container';
    container.innerHTML = widgetHTML;

    // Inject container and CTA button depending on viewport layout
    function positionHeaderElements() {
        const isMobile = window.innerWidth <= 1024;
        const callBlock = document.querySelector('.nav-call-block');
        const topBarRight = document.querySelector('.header-top-bar .top-bar-right');
        const navMenu = document.querySelector('#nav-menu');
        const menuWrapper = document.querySelector('.nav-menu-wrapper');
        const socialLinks = document.querySelector('.social-links-grid');
        const middleRight = document.querySelector('.header-middle-row .middle-right');

        // Always make sure translate element is in DOM
        if (!document.getElementById('global-translate-container')) {
            document.body.appendChild(container);
        }

        if (isMobile) {
            // Mobile adjustments:
            // 1. Move CTA to hamburger menu (#nav-menu) at the bottom
            if (callBlock && navMenu && callBlock.parentElement !== navMenu) {
                navMenu.appendChild(callBlock);
            }
            // 2. Move Translate widget to body so it floats at bottom-left
            if (container.parentElement !== document.body) {
                document.body.appendChild(container);
            }
            // 3. Move social links back to middle row on mobile if they were moved
            if (socialLinks && middleRight && socialLinks.parentElement !== middleRight) {
                middleRight.appendChild(socialLinks);
            }
        } else {
            // Desktop adjustments:
            // 1. Move CTA into top bar right (.header-top-bar .top-bar-right)
            if (topBarRight) {
                if (callBlock && callBlock.parentElement !== topBarRight) {
                    topBarRight.appendChild(callBlock);
                }
                // 2. Move Translate container into top bar right before Book a Call
                if (container.parentElement !== topBarRight) {
                    if (callBlock && callBlock.parentElement === topBarRight) {
                        topBarRight.insertBefore(container, callBlock);
                    } else {
                        topBarRight.appendChild(container);
                    }
                }
            } else {
                // Fallback for pages that might not have the new redesign top bar
                if (callBlock && menuWrapper && callBlock.parentElement !== menuWrapper) {
                    menuWrapper.appendChild(callBlock);
                }
                if (menuWrapper && container.parentElement !== menuWrapper) {
                    if (callBlock && callBlock.parentElement === menuWrapper) {
                        menuWrapper.insertBefore(container, callBlock);
                    } else {
                        menuWrapper.appendChild(container);
                    }
                }
            }

            // 3. Move social links to the center of the top bar
            const topBarContainer = document.querySelector('.header-top-bar .header-container');
            const topBarLeft = document.querySelector('.header-top-bar .top-bar-left');
            if (topBarContainer) {
                // Ensure left side does not wrap and takes only needed space to keep it on a single line
                if (topBarLeft) {
                    topBarLeft.style.flex = '0 0 auto';
                    topBarLeft.style.whiteSpace = 'nowrap';
                    topBarLeft.style.display = 'flex';
                    topBarLeft.style.alignItems = 'center';
                }
                // Ensure right side takes only needed space
                if (topBarRight) {
                    topBarRight.style.flex = '0 0 auto';
                    topBarRight.style.display = 'flex';
                    topBarRight.style.justifyContent = 'flex-end';
                    topBarRight.style.alignItems = 'center';
                }

                let topBarCenter = topBarContainer.querySelector('.top-bar-center');
                if (!topBarCenter) {
                    topBarCenter = document.createElement('div');
                    topBarCenter.className = 'top-bar-center';
                    topBarCenter.style.display = 'flex';
                    topBarCenter.style.justifyContent = 'flex-end'; // Align social links to the right of the center area
                    topBarCenter.style.paddingRight = '60px'; // Give breathing room and push away from translator widget
                    topBarCenter.style.alignItems = 'center';
                    topBarCenter.style.flex = '1'; // Occupy remaining space to push social links rightwards
                    
                    if (topBarLeft && topBarLeft.nextSibling) {
                        topBarContainer.insertBefore(topBarCenter, topBarLeft.nextSibling);
                    } else {
                        topBarContainer.appendChild(topBarCenter);
                    }
                }
                if (socialLinks && socialLinks.parentElement !== topBarCenter) {
                    topBarCenter.appendChild(socialLinks);
                }
            }
        }
    }

    // Initialize layout positions
    positionHeaderElements();

    // Listen to resize to shift layout responsively
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(positionHeaderElements, 100);
    });

    // Toggle logic for translation dropdown
    const toggleBtn = document.getElementById('global-translate-btn');
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        container.classList.toggle('open');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!container.contains(e.target) && container.classList.contains('open')) {
            container.classList.remove('open');
        }
    });

    // Custom language buttons event listener
    const langButtons = container.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const langCode = this.getAttribute('data-lang');
            
            const googleSelect = document.querySelector('.goog-te-combo');
            if (googleSelect) {
                googleSelect.value = langCode;
                googleSelect.dispatchEvent(new Event('change'));
                
                langButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                container.classList.remove('open');
            } else {
                console.warn("Google Translate widget is still loading.");
            }
        });
    });

    // Loop to auto-highlight selected language
    const checkGoogleSelect = setInterval(() => {
        const googleSelect = document.querySelector('.goog-te-combo');
        if (googleSelect) {
            clearInterval(checkGoogleSelect);
            const currentLang = googleSelect.value || 'en';
            langButtons.forEach(btn => {
                if (btn.getAttribute('data-lang') === currentLang) {
                    btn.classList.add('active');
                }
            });
        }
    }, 500);

    // Load official Google Translate script
    window.googleTranslateElementInit = function () {
        new google.translate.TranslateElement({
            pageLanguage: 'en',
            autoDisplay: false
        }, 'google_translate_element');
    };

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);
});
