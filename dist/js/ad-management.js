// Ad Management System for Blog

class AdManager {
    constructor() {
        this.adSpots = {
            'ad-spot-top': { size: '300x250', type: 'banner' },
            'ad-spot-middle': { size: '300x250', type: 'banner' },
            'ad-spot-bottom': { size: '300x600', type: 'skyscraper' }
        };
        this.adNetwork = 'adsense'; // 'adsense', 'custom', 'none'
        this.isAdBlocked = false;
        
        this.init();
    }

    init() {
        this.checkAdBlock();
        this.loadAds();
        this.setupAdRefresh();
    }

    // Check if ad blocker is active
    checkAdBlock() {
        const testAd = document.createElement('div');
        testAd.className = 'adsbygoogle';
        testAd.style.display = 'block';
        testAd.style.height = '1px';
        testAd.style.width = '1px';
        testAd.style.position = 'absolute';
        testAd.style.left = '-10000px';
        
        document.body.appendChild(testAd);
        
        setTimeout(() => {
            if (testAd.offsetHeight === 0) {
                this.isAdBlocked = true;
                this.showAdBlockMessage();
            }
            document.body.removeChild(testAd);
        }, 100);
    }

    // Show message when ad blocker is detected
    showAdBlockMessage() {
        const adSpots = document.querySelectorAll('.sidebar-ad-spot');
        adSpots.forEach(spot => {
            const container = spot.querySelector('.ad-container');
            if (container) {
                container.innerHTML = `
                    <div class="ad-block-message">
                        <i class="fas fa-exclamation-triangle"></i>
                        <p>Please disable your ad blocker to support our content</p>
                        <small>Ads help us keep this site free</small>
                    </div>
                `;
            }
        });
    }

    // Load ads based on network
    loadAds() {
        switch (this.adNetwork) {
            case 'adsense':
                this.loadGoogleAdSense();
                break;
            case 'custom':
                this.loadCustomAds();
                break;
            default:
                this.showPlaceholderAds();
        }
    }

    // Load Google AdSense ads
    loadGoogleAdSense() {
        // Check if AdSense is loaded
        if (typeof adsbygoogle === 'undefined') {
            console.log('Google AdSense not loaded');
            this.showPlaceholderAds();
            return;
        }

        // Load ads for each spot
        Object.keys(this.adSpots).forEach(spotId => {
            const spot = document.getElementById(spotId);
            if (spot) {
                this.createAdSenseAd(spot, this.adSpots[spotId]);
            }
        });
    }

    // Create Google AdSense ad
    createAdSenseAd(spot, adConfig) {
        const container = spot.querySelector('.ad-container');
        if (!container) return;

        // Clear placeholder
        container.innerHTML = '';

        // Create AdSense ad
        const adElement = document.createElement('ins');
        adElement.className = 'adsbygoogle';
        adElement.style.display = 'block';
        adElement.setAttribute('data-ad-client', 'YOUR_ADSENSE_CLIENT_ID'); // Replace with your client ID
        adElement.setAttribute('data-ad-slot', this.getAdSlot(adConfig.type));
        adElement.setAttribute('data-ad-format', 'auto');
        adElement.setAttribute('data-full-width-responsive', 'true');

        container.appendChild(adElement);

        // Push ad to AdSense
        try {
            (adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
            console.error('AdSense error:', error);
            this.showPlaceholderAd(container, adConfig);
        }
    }

    // Get AdSense ad slot ID (you'll need to replace these with your actual slot IDs)
    getAdSlot(type) {
        const slots = {
            'banner': 'YOUR_BANNER_AD_SLOT_ID',
            'skyscraper': 'YOUR_SKYSCRAPER_AD_SLOT_ID'
        };
        return slots[type] || 'YOUR_DEFAULT_AD_SLOT_ID';
    }

    // Load custom ads
    loadCustomAds() {
        Object.keys(this.adSpots).forEach(spotId => {
            const spot = document.getElementById(spotId);
            if (spot) {
                this.createCustomAd(spot, this.adSpots[spotId]);
            }
        });
    }

    // Create custom ad
    createCustomAd(spot, adConfig) {
        const container = spot.querySelector('.ad-container');
        if (!container) return;

        // Example custom ad content
        const adContent = this.getCustomAdContent(adConfig);
        container.innerHTML = adContent;
    }

    // Get custom ad content
    getCustomAdContent(adConfig) {
        const ads = [
            {
                title: 'Premium Digital Marketing Course',
                description: 'Learn advanced strategies from industry experts',
                cta: 'Enroll Now',
                link: '#',
                image: '/images/blog1.jpg'
            },
            {
                title: 'Free SEO Audit',
                description: 'Get a comprehensive analysis of your website',
                cta: 'Get Free Audit',
                link: '#',
                image: '/images/blog2.jpg'
            },
            {
                title: 'AI Marketing Tools',
                description: 'Automate your marketing with AI',
                cta: 'Learn More',
                link: '#',
                image: '/images/blog3.jpg'
            }
        ];

        const randomAd = ads[Math.floor(Math.random() * ads.length)];
        
        return `
            <div class="custom-ad">
                <div class="custom-ad-content">
                    <h4>${randomAd.title}</h4>
                    <p>${randomAd.description}</p>
                    <a href="${randomAd.link}" class="btn btn-primary btn-small">${randomAd.cta}</a>
                </div>
            </div>
        `;
    }

    // Show placeholder ads
    showPlaceholderAds() {
        Object.keys(this.adSpots).forEach(spotId => {
            const spot = document.getElementById(spotId);
            if (spot) {
                this.showPlaceholderAd(spot.querySelector('.ad-container'), this.adSpots[spotId]);
            }
        });
    }

    // Show placeholder ad
    showPlaceholderAd(container, adConfig) {
        if (!container) return;
        
        container.innerHTML = `
            <div class="ad-placeholder">
                <i class="fas fa-ad"></i>
                <p>Ad Space</p>
                <span>${adConfig.size}</span>
            </div>
        `;
    }

    // Setup ad refresh (for testing)
    setupAdRefresh() {
        // Refresh ads every 30 seconds (for testing purposes)
        // Remove this in production
        setInterval(() => {
            if (this.adNetwork === 'custom') {
                this.loadCustomAds();
            }
        }, 30000);
    }

    // Track ad impressions
    trackAdImpression(spotId) {
        // Send analytics data
        if (typeof gtag !== 'undefined') {
            gtag('event', 'ad_impression', {
                'event_category': 'ads',
                'event_label': spotId
            });
        }
    }

    // Track ad clicks
    trackAdClick(spotId) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'ad_click', {
                'event_category': 'ads',
                'event_label': spotId
            });
        }
    }
}

// Initialize ad management when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.adManager = new AdManager();
});

// Add CSS for custom ads and ad block message
const adStyles = `
    .custom-ad {
        padding: 20px;
        text-align: center;
        background: linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(0, 255, 255, 0.05) 100%);
        border-radius: var(--radius-lg);
        transition: all var(--transition-normal);
    }

    .custom-ad:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 255, 255, 0.2);
    }

    .custom-ad h4 {
        color: var(--primary);
        font-size: 1rem;
        margin-bottom: 8px;
        font-weight: 600;
    }

    .custom-ad p {
        color: var(--white);
        opacity: 0.8;
        font-size: 0.85rem;
        margin-bottom: 15px;
        line-height: 1.4;
    }

    .custom-ad .btn {
        font-size: 0.8rem;
        padding: 6px 12px;
    }

    .ad-block-message {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 30px 20px;
        text-align: center;
        color: var(--white);
        opacity: 0.8;
    }

    .ad-block-message i {
        font-size: 2rem;
        color: var(--primary);
        margin-bottom: 15px;
    }

    .ad-block-message p {
        font-size: 0.9rem;
        margin-bottom: 8px;
        font-weight: 500;
    }

    .ad-block-message small {
        font-size: 0.75rem;
        opacity: 0.6;
    }
`;

// Inject ad styles
const styleSheet = document.createElement('style');
styleSheet.textContent = adStyles;
document.head.appendChild(styleSheet); 