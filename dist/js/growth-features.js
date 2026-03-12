// Growth & Conversion Features for Trendtactics Digital
// Includes chatbot, exit-intent popups, push notifications, and referral system

(function () {
    'use strict';

    // ===== EXIT-INTENT POPUP =====
    function initExitIntentPopup() {
        let exitIntentShown = localStorage.getItem('exitIntentShown') === 'true';
        if (exitIntentShown) return;

        let mouseY = 0;
        document.addEventListener('mouseout', (e) => {
            if (!e.toElement && !e.relatedTarget && e.clientY < 10) {
                showExitIntentPopup();
            }
        });

        function showExitIntentPopup() {
            const popup = document.createElement('div');
            popup.id = 'exit-intent-popup';
            popup.innerHTML = `
                <div class="exit-popup-overlay"></div>
                <div class="exit-popup-content">
                    <button class="exit-popup-close" aria-label="Close">&times;</button>
                    <div class="exit-popup-body">
                        <h3>Wait! Don't Miss Out</h3>
                        <p>Get our FREE Digital Marketing Guide and unlock the secrets to 3x your online growth!</p>
                        <form class="exit-popup-form" data-newsletter data-source="exit-intent">
                            <input type="email" placeholder="Enter your email" required>
                            <button type="submit">Get Free Guide</button>
                        </form>
                        <p class="exit-popup-note">Join 10,000+ marketers getting exclusive insights</p>
                    </div>
                </div>
            `;

            popup.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            `;

            const style = document.createElement('style');
            style.textContent = `
                .exit-popup-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(10, 30, 63, 0.9);
                    backdrop-filter: blur(5px);
                }
                .exit-popup-content {
                    position: relative;
                    background: white;
                    padding: 2rem;
                    border-radius: 16px;
                    max-width: 500px;
                    width: 90%;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                    animation: slideUp 0.3s ease;
                }
                .exit-popup-close {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: none;
                    border: none;
                    font-size: 2rem;
                    cursor: pointer;
                    color: #666;
                    line-height: 1;
                }
                .exit-popup-body h3 {
                    margin-top: 0;
                    color: #0A1E3F;
                    font-size: 1.5rem;
                }
                .exit-popup-body p {
                    color: #666;
                    margin-bottom: 1.5rem;
                }
                .exit-popup-form {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 1rem;
                }
                .exit-popup-form input {
                    flex: 1;
                    padding: 12px;
                    border: 2px solid #ddd;
                    border-radius: 8px;
                    font-size: 1rem;
                }
                .exit-popup-form button {
                    padding: 12px 24px;
                    background: #00FFFF;
                    color: #0A1E3F;
                    border: none;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                }
                .exit-popup-note {
                    font-size: 0.85rem;
                    color: #999;
                    margin: 0;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { transform: translateY(50px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
            document.body.appendChild(popup);

            popup.querySelector('.exit-popup-close').addEventListener('click', () => {
                popup.remove();
                localStorage.setItem('exitIntentShown', 'true');
            });

            popup.querySelector('.exit-popup-overlay').addEventListener('click', () => {
                popup.remove();
                localStorage.setItem('exitIntentShown', 'true');
            });

            localStorage.setItem('exitIntentShown', 'true');
        }
    }

    // ===== LIGHTWEIGHT CHATBOT/FAQ ASSISTANT =====
    // ===== LIGHTWEIGHT CHATBOT/FAQ ASSISTANT =====
    // Chatbot logic moved to js/chat-widget.js for global availability


    // ===== PUSH NOTIFICATIONS (Browser API) =====
    function initPushNotifications() {
        if ('Notification' in window && 'serviceWorker' in navigator) {
            // Request permission
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log('Push notifications enabled');
                }
            });
        }
    }

    // ===== REFERRAL SYSTEM =====
    function initReferralSystem() {
        // Generate referral link
        function generateReferralLink(userId) {
            const baseUrl = window.location.origin;
            return `${baseUrl}/?ref=${userId}`;
        }

        // Track referrals
        function trackReferral() {
            const urlParams = new URLSearchParams(window.location.search);
            const refId = urlParams.get('ref');
            if (refId) {
                localStorage.setItem('referral_source', refId);
                localStorage.setItem('referral_date', new Date().toISOString());

                // Track in analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'referral', {
                        'event_category': 'acquisition',
                        'event_label': refId
                    });
                }
            }
        }

        trackReferral();

        // Export referral functions
        window.ReferralSystem = {
            generateLink: generateReferralLink,
            track: trackReferral
        };
    }

    // Initialize all features
    function init() {
        // Only show exit intent on homepage and blog pages
        if (window.location.pathname === '/' ||
            window.location.pathname.includes('/blog')) {
            setTimeout(initExitIntentPopup, 3000); // Show after 3 seconds
        }

        // initChatbot(); // Moved to chat-widget.js
        initPushNotifications();
        initReferralSystem();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

