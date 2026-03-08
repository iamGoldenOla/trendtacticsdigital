import os
import re
import glob

page_images = {
    'service-web-development.html': 'images/website-development-parallex.jpg',
    'service-app-development.html': 'images/app-development=parallex.jpg',
    'service-digital-marketing.html': 'images/digital-marketing-premium-parallax.jpg',
    'service-social-media-marketing.html': 'images/social-media-parallelx.jpg',
    'service-facebook-ads.html': 'images/facebook-ads-parallelx.jpg',
    'service-content-creation.html': 'images/content-creation-parallex.jpg',
    'service-email-marketing.html': 'images/email-marketing-parallele.jpg'
}

def fix_what_we_offer():
    files = glob.glob('service-*.html')
    
    for filename in files:
        if filename not in page_images:
            continue
            
        with open(filename, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            
        # Find the whole section.
        # It could be 'service-content-section content-block-bg' or 'services-detail content-block-bg'
        pattern = re.compile(r'<section class="(?:services-detail|service-content-section)[^>]*content-block-bg.*?</section>', re.DOTALL)
        match = pattern.search(content)
        if not match:
            print(f"Could not find services section in {filename}")
            continue
            
        section_html = match.group(0)
        
        # Extract title and subtitle
        title_match = re.search(r'<h2[^>]*>(.*?)</h2>', section_html, re.DOTALL)
        title = title_match.group(1).strip() if title_match else "What We Offer"
        title = re.sub(r'<[^>]+>', '', title).strip()
        
        p_match = re.search(r'</h2>\s*<p[^>]*>(.*?)</p>', section_html, re.DOTALL)
        subtitle = p_match.group(1).strip() if p_match else "Comprehensive solutions tailored to your business needs"
        subtitle = re.sub(r'<[^>]+>', '', subtitle).strip()
        
        # Extract features
        features = []
        # Support service-3d-card or service-feature-card
        parts = re.split(r'<div class="(?:service-3d-card|service-feature-card)"[^>]*>', section_html)
        for part in parts[1:]:
            icon_match = re.search(r'<i class="(.*?)"></i>', part)
            icon = icon_match.group(1) if icon_match else 'fas fa-check'
            
            h3_match = re.search(r'<h3>(.*?)</h3>', part, re.DOTALL)
            h3 = h3_match.group(1).strip() if h3_match else 'Feature'
            
            p_text_match = re.search(r'<p>(.*?)</p>', part, re.DOTALL)
            p_text = p_text_match.group(1).strip() if p_text_match else 'Description'
            
            # Avoid picking up empty cards or fragments
            if h3 == 'Feature' and p_text == 'Description':
                continue
                
            features.append({'icon': icon, 'title': h3, 'desc': p_text})
            
        # Extract CTA (Assuming it might not exist on all pages)
        cta_match = re.search(r'<div class="quote-cta-content">(.*?)</div>\s*</div>', section_html, re.DOTALL)
        cta_title = "Ready to Get Started?"
        cta_desc = "Get a custom quote tailored to your marketing needs."
        if cta_match:
            cta_html = cta_match.group(1)
            cta_h3 = re.search(r'<h3>(.*?)</h3>', cta_html)
            if cta_h3: cta_title = cta_h3.group(1).strip()
            cta_p = re.search(r'<p>(.*?)</p>', cta_html)
            if cta_p: cta_desc = cta_p.group(1).strip()

        new_html = f'''
        <!-- Premium What We Offer Section -->
        <section class="premium-wwo-section" id="services-detail">
            <div class="container relative z-10">
                <div class="wwo-header text-center mb-16">
                    <h2 class="premium-title">{title}</h2>
                    <p class="premium-subtitle">{subtitle}</p>
                </div>
                
                <div class="wwo-grid">
                    <!-- Content Column (Left) -->
                    <div class="wwo-content-col">
                        <div class="wwo-features-list">
        '''
        
        for feat in features:
            new_html += f'''
                            <div class="wwo-feature-card">
                                <div class="wwo-icon"><i class="{feat['icon']}"></i></div>
                                <div class="wwo-text">
                                    <h3>{feat['title']}</h3>
                                    <p>{feat['desc']}</p>
                                </div>
                            </div>
            '''
            
        side_img = page_images[filename]
        
        new_html += f'''
                        </div>
                    </div>
                    
                    <!-- Image Column (Right) -->
                    <div class="wwo-image-col hidden-mobile">
                        <div class="wwo-image-wrapper sticky-top">
                            <img src="{side_img}" alt="{title}" class="wwo-main-image shadow-premium">
                            <!-- Decorative element -->
                            <div class="wwo-floating-card">
                                <div class="floating-icon"><i class="fas fa-check-circle text-cyan"></i></div>
                                <div class="floating-text">
                                    <strong>Premium Service</strong>
                                    <span>High quality execution</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- CTA Banner -->
                <div class="wwo-cta-banner mt-16">
                    <div class="wwo-cta-content text-center">
                        <h3>{cta_title}</h3>
                        <p>{cta_desc}</p>
                        <a href="contact.html" class="btn btn-primary btn-large wwo-btn">Request a Free Quote</a>
                    </div>
                </div>
            </div>
        </section>
        '''
        
        new_content = content[:match.start()] + new_html + content[match.end():]
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated 'What We Offer' on {filename}")

if __name__ == "__main__":
    fix_what_we_offer()
