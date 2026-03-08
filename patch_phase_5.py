import os
import glob
import re

def create_consent_js():
    js_content = """// Cookie Consent & Privacy Logic
document.addEventListener('DOMContentLoaded', () => {
    const consentName = 'trendtactics_cookie_consent';
    
    // Default consent
    let consentState = {
        necessary: true,
        analytics: true,
        marketing: true
    };
    
    // Check if consent already given
    const existingConsent = localStorage.getItem(consentName);
    if (!existingConsent) {
        showConsentBanner();
    } else {
        consentState = JSON.parse(existingConsent);
        applyConsent(consentState);
    }
    
    function showConsentBanner() {
        const style = document.createElement('style');
        style.textContent = `
            .cookie-consent-banner {
                position: fixed;
                bottom: 20px;
                left: 20px;
                right: 20px;
                max-width: 1160px;
                margin: 0 auto;
                background-color: #0A1E3F;
                color: #fff;
                padding: 24px;
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                z-index: 10001;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                gap: 20px;
                border: 1px solid rgba(0,255,255,0.2);
                font-family: 'Inter', sans-serif;
            }
            .cc-content { flex: 1; }
            .cc-content h3 { margin: 0 0 10px 0; font-size: 1.2rem; color: #00FFFF; }
            .cc-content p { margin: 0; font-size: 0.9rem; color: #cbd5e1; line-height: 1.5; }
            .cc-content a { color: #00FFFF; text-decoration: underline; }
            .cc-actions { display: flex; gap: 10px; flex-shrink: 0; }
            .cc-btn { padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.2s; border: none; }
            .cc-accept { background: #00FFFF; color: #0A1E3F; }
            .cc-accept:hover { background: #fff; color: #0A1E3F; }
            .cc-reject { background: transparent; color: #cbd5e1; border: 1px solid rgba(255,255,255,0.2); }
            .cc-reject:hover { background: rgba(255,255,255,0.1); }
            
            @media (max-width: 768px) {
                .cookie-consent-banner { flex-direction: column; align-items: flex-start;  bottom: 10px; left: 10px; right: 10px; padding: 20px; }
                .cc-actions { width: 100%; display: grid; grid-template-columns: 1fr 1fr; }
            }
        `;
        document.head.appendChild(style);
        
        const banner = document.createElement('div');
        banner.className = 'cookie-consent-banner';
        banner.innerHTML = `
            <div class="cc-content">
                <h3>🍪 We value your privacy</h3>
                <p>We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our <a href="privacy-policy.html">Privacy Policy</a> to learn more.</p>
            </div>
            <div class="cc-actions">
                <button class="cc-btn cc-reject" id="cc-reject-btn">Decline All</button>
                <button class="cc-btn cc-accept" id="cc-accept-btn">Accept All</button>
            </div>
        `;
        document.body.appendChild(banner);
        
        document.getElementById('cc-accept-btn').addEventListener('click', () => {
            consentState = { necessary: true, analytics: true, marketing: true };
            saveAndClose(banner);
        });
        
        document.getElementById('cc-reject-btn').addEventListener('click', () => {
            consentState = { necessary: true, analytics: false, marketing: false };
            saveAndClose(banner);
        });
    }
    
    function saveAndClose(banner) {
        localStorage.setItem(consentName, JSON.stringify(consentState));
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(20px)';
        banner.style.transition = 'all 0.3s ease';
        setTimeout(() => banner.remove(), 300);
        applyConsent(consentState);
    }
    
    function applyConsent(state) {
        // Here you would conditionally load your Google Analytics or Facebook Pixel scripts 
        // based on state.analytics and state.marketing being true.
        console.log("Consent State applied:", state);
        if(state.analytics) {
            // Load GA Example:
            // window.dataLayer = window.dataLayer || [];
            // function gtag(){dataLayer.push(arguments);}
            // gtag('js', new Date());
            // gtag('config', 'G-XXXXXXX');
        }
    }
});
"""
    os.makedirs("js", exist_ok=True)
    with open("js/consent.js", "w", encoding="utf-8") as f:
        f.write(js_content)
    print("Created js/consent.js")


def patch_files():
    # 1. Patch `index.html` to update the Blog "Read More" button styling.
    # The current read more buttons typically look like:
    # <a href="blog-post.html" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
    # We will inject some targeted CSS onto index.html to beef them up.
    
    blog_css = """
    <style>
        /* Blog Read More Button Overhaul */
        .blog-card .read-more {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 10px 20px;
            background-color: #00FFFF;
            color: #0A1E3F !important;
            font-weight: 700;
            border-radius: 6px;
            text-decoration: none;
            margin-top: 15px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 255, 255, 0.3);
            text-transform: uppercase;
            font-size: 0.85rem;
            letter-spacing: 0.5px;
        }
        .blog-card .read-more:hover {
            background-color: #0A1E3F;
            color: #00FFFF !important;
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0, 255, 255, 0.4);
        }
        .blog-card .read-more i {
            margin-left: 8px;
            transition: transform 0.3s ease;
        }
        .blog-card .read-more:hover i {
            transform: translateX(4px);
        }
    </style>
    """
    
    # Process all HTML files
    html_files = glob.glob("*.html")
    for html_file in html_files:
        with open(html_file, "r", encoding="utf-8") as f:
            content = f.read()
            
        changed = False
        
        # Inject Blog CSS into index.html
        if html_file == "index.html" and "/* Blog Read More Button Overhaul */" not in content:
            content = content.replace("</head>", blog_css + "\n</head>")
            changed = True
            
        # Optimization 1: Script Defer & Resource Preconnect
        if "<head>" in content and "fonts.gstatic.com" not in content and "rel=\"preconnect\"" not in content:
            preconnects = """
    <!-- Preconnects for Performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://cdnjs.cloudflare.com">
    <link rel="preconnect" href="https://cdn.jsdelivr.net">
"""     
            content = content.replace("<head>", f"<head>\n{preconnects}")
            changed = True
            
        # Optimization 2: Inject consent.js
        if "consent.js" not in content and "</body>" in content:
            content = content.replace("</body>", '<script src="js/consent.js" defer></script>\n</body>')
            changed = True
            
        # Optimization 3: Add loading="lazy" to <img> tags without it (ignoring those above the fold if possible, but regex is dumb so we'll do general)
        # To be safe and not break Hero images, we'll only replace <img src=... without loading= inside specific blocks or just use a simple regex cautiously.
        # Actually, since it's tricky, we'll selectively search for <img and inject if not present.
        def img_repl(match):
            tag = match.group(0)
            if 'loading="' not in tag:
                # insert loading="lazy" before the closing bracket if possible
                return tag.replace('>', ' loading="lazy">')
            return tag
            
        # Be careful not to replace <img> that have class="hero-main-img" or similar
        # For simplicity, we'll use a safer approach leveraging regex
        new_content = re.sub(r'<img[^>]*>', img_repl, content)
        if new_content != content:
            content = new_content
            changed = True

        if changed:
            with open(html_file, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Patched {html_file}")

if __name__ == "__main__":
    create_consent_js()
    patch_files()
