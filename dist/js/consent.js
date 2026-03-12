// Cookie Consent & Privacy Logic
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
