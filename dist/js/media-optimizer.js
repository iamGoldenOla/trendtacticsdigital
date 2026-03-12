/**
 * Media Optimizer
 * Handles image compression, responsive loading, and video optimization
 */

(function() {
    'use strict';

    // Image optimization configuration
    const IMAGE_CONFIG = {
        sizes: [480, 800, 1200, 2000],
        formats: {
            modern: ['webp', 'avif'],
            fallback: 'jpeg'
        },
        quality: {
            webp: 85,
            avif: 80,
            jpeg: 90
        }
    };

    // Video optimization configuration
    const VIDEO_CONFIG = {
        resolutions: [
            { width: 854, height: 480, label: '480p' },
            { width: 1280, height: 720, label: '720p' },
            { width: 1920, height: 1080, label: '1080p' }
        ],
        codecs: {
            mp4: 'video/mp4; codecs="avc1.42E01E"',
            webm: 'video/webm; codecs="vp9"',
            h265: 'video/mp4; codecs="hev1.1.6.L93.B0"'
        }
    };

    /**
     * Generate responsive image srcset
     */
    function generateImageSrcset(imagePath, baseName) {
        const srcset = [];
        const pathParts = imagePath.split('/');
        const fileName = pathParts[pathParts.length - 1];
        const basePath = imagePath.substring(0, imagePath.lastIndexOf('/'));
        const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.')) || baseName;
        const ext = fileName.substring(fileName.lastIndexOf('.')) || '.jpg';

        // Generate srcset for each size
        IMAGE_CONFIG.sizes.forEach(size => {
            // In production, these would be actual optimized files
            // For now, we'll use the original with size parameter or serve responsive via CSS
            srcset.push(`${imagePath}?w=${size} ${size}w`);
        });

        return srcset.join(', ');
    }

    /**
     * Generate responsive picture element sources
     */
    function generatePictureSources(imagePath, alt) {
        const sources = [];
        const pathParts = imagePath.split('/');
        const fileName = pathParts[pathParts.length - 1];
        const basePath = imagePath.substring(0, imagePath.lastIndexOf('/'));
        const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.')) || 'image';
        const ext = fileName.substring(fileName.lastIndexOf('.')) || '.jpg';

        // Generate WebP sources
        IMAGE_CONFIG.sizes.forEach(size => {
            sources.push({
                type: 'image/webp',
                srcset: `${imagePath}?w=${size}&format=webp ${size}w`,
                sizes: `(max-width: ${size}px) ${size}px, ${size}px`
            });
        });

        // Generate AVIF sources (if supported)
        if (supportsAVIF()) {
            IMAGE_CONFIG.sizes.forEach(size => {
                sources.push({
                    type: 'image/avif',
                    srcset: `${imagePath}?w=${size}&format=avif ${size}w`,
                    sizes: `(max-width: ${size}px) ${size}px, ${size}px`
                });
            });
        }

        return sources;
    }

    /**
     * Check if browser supports AVIF
     */
    function supportsAVIF() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
    }

    /**
     * Optimize image element
     */
    function optimizeImage(img) {
        if (img.dataset.optimized === 'true') return;

        const imagePath = img.src || img.dataset.src;
        if (!imagePath) return;

        // Add lazy loading if not present
        if (!img.hasAttribute('loading')) {
            img.loading = 'lazy';
        }

        // Add async decoding if not present
        if (!img.hasAttribute('decoding')) {
            img.decoding = 'async';
        }

        // Generate responsive srcset
        const srcset = generateImageSrcset(imagePath);
        if (srcset) {
            img.srcset = srcset;
            img.sizes = '(max-width: 480px) 480px, (max-width: 800px) 800px, (max-width: 1200px) 1200px, 2000px';
        }

        img.dataset.optimized = 'true';
    }

    /**
     * Optimize picture element
     */
    function optimizePicture(picture) {
        if (picture.dataset.optimized === 'true') return;

        const img = picture.querySelector('img');
        if (!img) return;

        const imagePath = img.src || img.dataset.src;
        if (!imagePath) return;

        // Generate sources
        const sources = generatePictureSources(imagePath);

        // Add sources to picture element
        sources.forEach(source => {
            const sourceEl = document.createElement('source');
            sourceEl.type = source.type;
            sourceEl.srcset = source.srcset;
            sourceEl.sizes = source.sizes;
            picture.insertBefore(sourceEl, img);
        });

        // Optimize fallback image
        optimizeImage(img);

        picture.dataset.optimized = 'true';
    }

    /**
     * Optimize video element
     */
    function optimizeVideo(video) {
        if (video.dataset.optimized === 'true') return;

        // Add preload="metadata" for better performance
        if (!video.hasAttribute('preload')) {
            video.preload = 'metadata';
        }

        // Add playsinline for mobile
        if (!video.hasAttribute('playsinline')) {
            video.playsInline = true;
        }

        // Generate multiple source elements for different resolutions
        const sources = video.querySelectorAll('source');
        if (sources.length === 0) {
            // If no sources, add responsive sources
            const videoSrc = video.src || video.querySelector('source')?.src;
            if (videoSrc) {
                VIDEO_CONFIG.resolutions.forEach(res => {
                    const source = document.createElement('source');
                    source.src = `${videoSrc}?resolution=${res.label}`;
                    source.type = VIDEO_CONFIG.codecs.mp4;
                    source.setAttribute('data-resolution', res.label);
                    video.appendChild(source);
                });
            }
        }

        // Optimize poster image if present
        if (video.poster) {
            const posterImg = new Image();
            posterImg.src = video.poster;
            optimizeImage(posterImg);
        }

        video.dataset.optimized = 'true';
    }

    /**
     * Initialize media optimization
     */
    function initMediaOptimization() {
        // Optimize all images
        const images = document.querySelectorAll('img:not([data-optimized])');
        images.forEach(optimizeImage);

        // Optimize all picture elements
        const pictures = document.querySelectorAll('picture:not([data-optimized])');
        pictures.forEach(optimizePicture);

        // Optimize all videos
        const videos = document.querySelectorAll('video:not([data-optimized])');
        videos.forEach(optimizeVideo);

        // Use Intersection Observer for lazy loading
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        optimizeImage(img);
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px'
            });

            // Observe images with data-src
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    /**
     * Compress image using Canvas API (client-side compression)
     * Note: This is a fallback. Real compression should be done server-side.
     */
    function compressImage(img, quality = 0.85, maxWidth = 2000) {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const image = new Image();

            image.crossOrigin = 'anonymous';
            image.onload = () => {
                // Calculate dimensions
                let width = image.width;
                let height = image.height;

                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;

                // Draw and compress
                ctx.drawImage(image, 0, 0, width, height);
                canvas.toBlob(
                    blob => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            reject(new Error('Compression failed'));
                        }
                    },
                    'image/jpeg',
                    quality
                );
            };

            image.onerror = reject;
            image.src = img.src;
        });
    }

    /**
     * Get optimal image size based on viewport
     */
    function getOptimalImageSize() {
        const viewportWidth = window.innerWidth;
        const devicePixelRatio = window.devicePixelRatio || 1;
        const effectiveWidth = viewportWidth * devicePixelRatio;

        if (effectiveWidth <= 480) return 480;
        if (effectiveWidth <= 800) return 800;
        if (effectiveWidth <= 1200) return 1200;
        return 2000;
    }

    /**
     * Get optimal video resolution based on viewport
     */
    function getOptimalVideoResolution() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if (viewportWidth <= 480 || viewportHeight <= 480) return '480p';
        if (viewportWidth <= 1280 || viewportHeight <= 720) return '720p';
        return '1080p';
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMediaOptimization);
    } else {
        initMediaOptimization();
    }

    // Re-optimize on dynamic content load
    const mutationObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) { // Element node
                    if (node.tagName === 'IMG') {
                        optimizeImage(node);
                    } else if (node.tagName === 'PICTURE') {
                        optimizePicture(node);
                    } else if (node.tagName === 'VIDEO') {
                        optimizeVideo(node);
                    } else {
                        // Check children
                        node.querySelectorAll('img:not([data-optimized])').forEach(optimizeImage);
                        node.querySelectorAll('picture:not([data-optimized])').forEach(optimizePicture);
                        node.querySelectorAll('video:not([data-optimized])').forEach(optimizeVideo);
                    }
                }
            });
        });
    });

    // Start observing
    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Export for manual use
    window.MediaOptimizer = {
        optimizeImage,
        optimizePicture,
        optimizeVideo,
        compressImage,
        getOptimalImageSize,
        getOptimalVideoResolution,
        generateImageSrcset,
        generatePictureSources
    };

})();

