/**
 * Parallax Effect Handler
 * Uses requestAnimationFrame for smooth performance
 * Automatically disables on mobile devices
 */

(function() {
    'use strict';

    // Detect mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // If mobile or reduced motion, disable parallax
    if (isMobile || prefersReducedMotion) {
        return;
    }

    // Parallax elements
    const parallaxElements = [];
    let rafId = null;
    let ticking = false;

    /**
     * Initialize parallax elements
     */
    function initParallax() {
        // Find all parallax containers
        const containers = document.querySelectorAll('.parallax, .parallax-strip');
        
        containers.forEach(container => {
            const inner = container.querySelector('.parallax-inner');
            if (inner) {
                parallaxElements.push({
                    container: container,
                    inner: inner,
                    speed: parseFloat(container.dataset.speed) || 0.5
                });
            }
        });

        // Initialize scroll listener
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize, { passive: true });
        
        // Initial calculation
        handleScroll();
    }

    /**
     * Handle scroll event
     */
    function handleScroll() {
        if (!ticking) {
            rafId = requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    /**
     * Handle resize event
     */
    function handleResize() {
        // Recalculate on resize
        if (rafId) {
            cancelAnimationFrame(rafId);
        }
        handleScroll();
    }

    /**
     * Update parallax positions
     */
    function updateParallax() {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;

        parallaxElements.forEach(element => {
            const rect = element.container.getBoundingClientRect();
            const elementTop = rect.top + scrollY;
            const elementHeight = rect.height;
            
            // Check if element is in viewport
            if (rect.bottom >= 0 && rect.top <= windowHeight) {
                // Calculate parallax offset
                const scrolled = scrollY - elementTop + windowHeight;
                const offset = scrolled * element.speed;
                
                // Apply transform
                element.inner.style.transform = `translate3d(0, ${offset}px, 0)`;
            }
        });

        ticking = false;
    }

    /**
     * Cleanup function
     */
    function cleanup() {
        if (rafId) {
            cancelAnimationFrame(rafId);
        }
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initParallax);
    } else {
        initParallax();
    }

    // Cleanup on page unload
    window.addEventListener('beforeunload', cleanup);

    // Export for manual control if needed
    window.ParallaxController = {
        init: initParallax,
        cleanup: cleanup,
        isEnabled: !isMobile && !prefersReducedMotion
    };

})();



