// Social Sharing Functions for Trendtactics Digital
// Handles sharing to Facebook, LinkedIn, X (Twitter), WhatsApp, and more

(function() {
    'use strict';
    
    const baseUrl = 'https://trendtacticsdigital.com';
    
    // Get current page URL and title
    function getPageInfo() {
        const url = window.location.href;
        const title = document.querySelector('meta[property="og:title"]')?.content || 
                     document.title || 
                     'Trendtactics Digital - We Engineer Digital Growth';
        const description = document.querySelector('meta[property="og:description"]')?.content || 
                           document.querySelector('meta[name="description"]')?.content ||
                           'Unlock strategy, creativity, and AI power — all in one studio.';
        const image = document.querySelector('meta[property="og:image"]')?.content ||
                     `${baseUrl}/images/Trendtactics_logo.jpg`;
        
        return { url, title, description, image };
    }
    
    // Share to Facebook
    function shareToFacebook() {
        const { url, title, description, image } = getPageInfo();
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(shareUrl, 'facebook-share', 'width=600,height=400');
    }
    
    // Share to LinkedIn
    function shareToLinkedIn() {
        const { url, title, description } = getPageInfo();
        const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        window.open(shareUrl, 'linkedin-share', 'width=600,height=400');
    }
    
    // Share to X (Twitter)
    function shareToTwitter() {
        const { url, title, description } = getPageInfo();
        const text = `${title} - ${description}`;
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        window.open(shareUrl, 'twitter-share', 'width=600,height=400');
    }
    
    // Share to WhatsApp
    function shareToWhatsApp() {
        const { url, title } = getPageInfo();
        const text = `${title} ${url}`;
        const shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(shareUrl, 'whatsapp-share');
    }
    
    // Share via Email
    function shareViaEmail() {
        const { url, title, description } = getPageInfo();
        const subject = encodeURIComponent(`Check out: ${title}`);
        const body = encodeURIComponent(`${description}\n\nRead more: ${url}`);
        const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
        window.location.href = mailtoUrl;
    }
    
    // Copy link to clipboard
    async function copyToClipboard() {
        const { url } = getPageInfo();
        try {
            await navigator.clipboard.writeText(url);
            
            // Show success message
            const toast = document.createElement('div');
            toast.className = 'share-toast';
            toast.textContent = 'Link copied to clipboard!';
            toast.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #00FFFF;
                color: #0A1E3F;
                padding: 12px 24px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                z-index: 10000;
                animation: slideIn 0.3s ease;
            `;
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => toast.remove(), 300);
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
            alert('Failed to copy link. Please copy manually: ' + url);
        }
    }
    
    // Initialize share buttons
    function initShareButtons() {
        // Add click handlers to share buttons
        document.querySelectorAll('[data-share="facebook"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                shareToFacebook();
            });
        });
        
        document.querySelectorAll('[data-share="linkedin"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                shareToLinkedIn();
            });
        });
        
        document.querySelectorAll('[data-share="twitter"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                shareToTwitter();
            });
        });
        
        document.querySelectorAll('[data-share="whatsapp"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                shareToWhatsApp();
            });
        });
        
        document.querySelectorAll('[data-share="email"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                shareViaEmail();
            });
        });
        
        document.querySelectorAll('[data-share="copy"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                copyToClipboard();
            });
        });
    }
    
    // Export functions globally
    window.SocialShare = {
        facebook: shareToFacebook,
        linkedin: shareToLinkedIn,
        twitter: shareToTwitter,
        whatsapp: shareToWhatsApp,
        email: shareViaEmail,
        copy: copyToClipboard
    };
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initShareButtons);
    } else {
        initShareButtons();
    }
})();

