// Performance Optimizer for Trendtactics Digital
// Handles lazy loading, critical CSS, and performance optimizations

(function() {
    'use strict';
    
    // ===== LAZY LOADING FOR IMAGES =====
    function initLazyLoading() {
        // Use native lazy loading if supported
        if ('loading' in HTMLImageElement.prototype) {
            const images = document.querySelectorAll('img[data-src]');
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        } else {
            // Fallback: Intersection Observer for older browsers
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
        
        // Lazy load videos
        const videos = document.querySelectorAll('video[data-src]');
        videos.forEach(video => {
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        video.src = video.dataset.src;
                        video.load();
                        videoObserver.unobserve(video);
                    }
                });
            });
            videoObserver.observe(video);
        });
        
        // Lazy load iframes
        const iframes = document.querySelectorAll('iframe[data-src]');
        iframes.forEach(iframe => {
            const iframeObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        iframe.src = iframe.dataset.src;
                        iframeObserver.unobserve(iframe);
                    }
                });
            });
            iframeObserver.observe(iframe);
        });
    }
    
    // ===== CRITICAL CSS INLINING =====
    function loadCriticalCSS() {
        // Critical CSS is already inlined in <head>
        // This function loads non-critical CSS asynchronously
        const nonCriticalCSS = [
            '/styles/shared-effects.css',
            '/styles/about.css',
            '/styles/images.css'
        ];
        
        nonCriticalCSS.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.media = 'print';
            link.onload = function() {
                this.media = 'all';
            };
            document.head.appendChild(link);
        });
    }
    
    // ===== PRELOAD KEY RESOURCES =====
    function preloadResources() {
        // Preload critical fonts
        const fontPreloads = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
            'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap'
        ];
        
        fontPreloads.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = href;
            document.head.appendChild(link);
        });
        
        // Preload critical images
        const criticalImages = [
            '/images/Trendtactics_logo.jpg'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
    
    // ===== DEFER NON-CRITICAL SCRIPTS =====
    function deferScripts() {
        const scripts = document.querySelectorAll('script[data-defer]');
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            newScript.src = script.src;
            newScript.async = true;
            script.parentNode.replaceChild(newScript, script);
        });
    }
    
    // ===== OPTIMIZE ANIMATIONS =====
    function optimizeAnimations() {
        // Reduce motion for users who prefer it
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--transition-fast', '0s');
            document.documentElement.style.setProperty('--transition-normal', '0s');
            document.documentElement.style.setProperty('--transition-slow', '0s');
        }
    }
    
    // ===== INITIALIZE ON DOM READY =====
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initLazyLoading();
            loadCriticalCSS();
            preloadResources();
            deferScripts();
            optimizeAnimations();
        });
    } else {
        initLazyLoading();
        loadCriticalCSS();
        preloadResources();
        deferScripts();
        optimizeAnimations();
    }
    
    // ===== PERFORMANCE MONITORING =====
    if ('PerformanceObserver' in window) {
        // Monitor Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
        });
        
        try {
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
            // Browser doesn't support LCP
        }
        
        // Monitor First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                console.log('FID:', entry.processingStart - entry.startTime);
            });
        });
        
        try {
            fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
            // Browser doesn't support FID
        }
    }
})();

