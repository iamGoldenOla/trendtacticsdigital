// ===== MAIN JAVASCRIPT FUNCTIONALITY =====

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSmoothScrolling();
    loadContent();
    initializeAnimations();
    initializeVideoPlayer();
    initTestimonialsCarousel(); // Initialize testimonials carousel for static HTML
});

// ===== NAVIGATION FUNCTIONALITY =====
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navigation');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isActive = navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (isActive) {
                document.body.classList.add('menu-open');
            } else {
                document.body.classList.remove('menu-open');
            }
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link, .dropdown-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Dropdown menu functionality
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
    dropdownItems.forEach(item => {
        const dropdownLink = item.querySelector('.nav-link');
        const dropdownMenu = item.querySelector('.dropdown-menu');
        
        if (dropdownLink && dropdownMenu) {
            // Toggle dropdown on click (for mobile)
            dropdownLink.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    item.classList.toggle('active');
                    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
                }
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!item.contains(e.target) && window.innerWidth <= 768) {
                    item.classList.remove('active');
                    dropdownMenu.style.display = 'none';
                }
            });
        }
    });
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== CONTENT LOADING =====
async function loadContent() {
    try {
        console.log('Attempting to load content from ./data/content.json');
        const response = await fetch('./data/content.json');
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Loaded data:', data);
        
        loadBrands(data.brands);
        loadServices(data.services);
        loadTestimonials(data.testimonials);
        loadFooterLinks(data.footer);
        loadSocialLinks(data.social);
        loadLatestBlogPosts();
        
    } catch (error) {
        console.error('Error loading content:', error);
        console.log('Using fallback content data');
        loadFallbackContent();
    }
}

// ===== BRANDS SECTION =====
function loadBrands(brands) {
    const brandsGrid = document.getElementById('brands-grid');
    if (!brandsGrid || !brands) return;
    
    // Create duplicate items for infinite scroll
    const duplicatedBrands = [...brands, ...brands];
    
    let brandsHTML = '';
    duplicatedBrands.forEach(brand => {
        brandsHTML += `
            <div class="brand-item">
                <img src="${brand.logo}" alt="${brand.name}" class="brand-logo">
            </div>
        `;
    });
    
    brandsGrid.innerHTML = brandsHTML;
}

// ===== SERVICES SECTION =====
function loadServices(services) {
    const servicesGrid = document.getElementById('services-grid');
    if (!servicesGrid) return;

    servicesGrid.innerHTML = services.map(service => `
        <div class="service-card animate-fade-in-up">
            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>
            <h3 class="service-title">${service.title}</h3>
            <p class="service-description">${service.description}</p>
            <ul class="service-features">
                ${service.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <div class="service-price">${service.price}</div>
            <a href="#contact" class="btn btn-primary">Get Started</a>
        </div>
    `).join('');
}

// ===== TESTIMONIALS SECTION =====
function loadTestimonials(testimonials) {
    const testimonialsGrid = document.getElementById('testimonials-grid');
    if (!testimonialsGrid) return;

    testimonialsGrid.innerHTML = testimonials.map(testimonial => `
        <div class="testimonial-card animate-fade-in-up">
            <p class="testimonial-content">"${testimonial.content}"</p>
            <div class="testimonial-author">
                <div class="author-avatar">
                    ${testimonial.author.name.charAt(0)}
                </div>
                <div class="author-info">
                    <h4>${testimonial.author.name}</h4>
                    <p>${testimonial.author.position} at ${testimonial.author.company}</p>
                </div>
            </div>
        </div>
    `).join('');
    initTestimonialsCarousel();
}

// ===== FOOTER LINKS =====
function loadFooterLinks(footer) {
    // Services links
    const footerServices = document.getElementById('footer-services');
    if (footerServices) {
        footerServices.innerHTML = footer.services.map(service => 
            `<li><a href="#services">${service}</a></li>`
        ).join('');
    }

    // Company links
    const footerCompany = document.getElementById('footer-company');
    if (footerCompany) {
        footerCompany.innerHTML = footer.company.map(link => 
            `<li><a href="#${link.toLowerCase().replace(' ', '-')}">${link}</a></li>`
        ).join('');
    }

    // Resources links
    const footerResources = document.getElementById('footer-resources');
    if (footerResources) {
        footerResources.innerHTML = footer.resources.map(resource => 
            `<li><a href="#${resource.toLowerCase().replace(' ', '-')}">${resource}</a></li>`
        ).join('');
    }
}

// ===== SOCIAL LINKS =====
function loadSocialLinks(social) {
    const socialLinks = document.getElementById('social-links');
    if (!socialLinks) return;

    socialLinks.innerHTML = social.map(platform => `
        <a href="${platform.url}" class="social-link" target="_blank" rel="noopener noreferrer">
            <i class="${platform.icon}"></i>
        </a>
    `).join('');
}

// ===== FALLBACK CONTENT =====
function loadFallbackContent() {
    // Fallback brands
    const fallbackBrands = [
        { name: 'Brand 1', logo: './images/brand1.png' },
        { name: 'Brand 2', logo: './images/brand2.png' },
        { name: 'Brand 3', logo: './images/brand3.png' },
        { name: 'Brand 4', logo: './images/brand4.png' },
        { name: 'Brand 5', logo: './images/brand5.png' },
        { name: 'Brand 6', logo: './images/brand6.png' }
    ];
    loadBrands(fallbackBrands);

    // Fallback services
    const fallbackServices = [
        {
            title: 'Web Design & Development',
            description: 'Custom websites that convert visitors into customers.',
            icon: 'fas fa-code',
            features: ['Responsive Design', 'SEO Optimization', 'Fast Loading', 'Custom CMS'],
            price: 'From $2,500'
        },
        {
            title: 'Digital Marketing',
            description: 'Strategic marketing campaigns that drive real results.',
            icon: 'fas fa-chart-line',
            features: ['SEO & PPC', 'Social Media', 'Content Marketing', 'Analytics'],
            price: 'From $1,500'
        },
        {
            title: 'AI Solutions',
            description: 'Cutting-edge AI tools to automate and optimize your business.',
            icon: 'fas fa-robot',
            features: ['Chatbots', 'Data Analysis', 'Process Automation', 'Predictive Analytics'],
            price: 'From $3,000'
        }
    ];
    loadServices(fallbackServices);

    // Fallback testimonials
    const fallbackTestimonials = [
        {
            content: 'Trendtactics transformed our online presence completely. Our website now converts 3x better!',
            author: {
                name: 'Sarah Johnson',
                position: 'CEO',
                company: 'TechStart Inc.'
            }
        },
        {
            content: 'The AI solutions they implemented saved us 40 hours per week. Incredible ROI!',
            author: {
                name: 'Michael Chen',
                position: 'Operations Director',
                company: 'Global Solutions'
            }
        },
        {
            content: 'Professional, creative, and results-driven. Exactly what we needed for our growth.',
            author: {
                name: 'Emily Rodriguez',
                position: 'Marketing Manager',
                company: 'Innovate Labs'
            }
        }
    ];
    loadTestimonials(fallbackTestimonials);
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .brand-item');
    animateElements.forEach(el => observer.observe(el));
}

// ===== VIDEO PLAYER =====
function initializeVideoPlayer() {
    const video = document.getElementById('promo-video');
    if (!video) return;

    // Add play/pause functionality
    video.addEventListener('click', function() {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });

    // Add loading state
    video.addEventListener('loadstart', function() {
        video.style.opacity = '0.7';
    });

    video.addEventListener('canplay', function() {
        video.style.opacity = '1';
    });
}

// ===== FORM HANDLING =====
function initializeForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Show success message (replace with actual form submission)
            showNotification('Thank you! We\'ll get back to you soon.', 'success');
            
            // Reset form
            form.reset();
        });
    });
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== PERFORMANCE OPTIMIZATION =====
// Throttled scroll handler
const throttledScrollHandler = throttle(function() {
    // Handle scroll-based animations
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// ===== ACCESSIBILITY =====
function initializeAccessibility() {
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu
            const navToggle = document.getElementById('nav-toggle');
            const navMenu = document.getElementById('nav-menu');
            if (navToggle && navMenu) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });

    // Add focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(el => {
        el.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary)';
        });
        
        el.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Initialize accessibility features
initializeAccessibility();

// Testimonials Carousel
let currentTestimonial = 0;
let testimonials = [];
const VISIBLE_CARDS = 1; // Changed to 1 for single card display

function initTestimonialsCarousel() {
    const testimonialsGrid = document.getElementById('testimonials-grid');
    const navContainer = document.getElementById('testimonials-nav');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    
    if (!testimonialsGrid || !navContainer) return;
    
    // Get all testimonial cards
    testimonials = Array.from(testimonialsGrid.children);
    
    if (testimonials.length === 0) return;
    
    // Clear previous dots
    navContainer.innerHTML = '';
    
    // Calculate number of possible views (one for each testimonial)
    const numViews = testimonials.length;
    
    // Create navigation dots
    for (let i = 0; i < numViews; i++) {
        const dot = document.createElement('div');
        dot.className = `testimonial-dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToTestimonial(i));
        navContainer.appendChild(dot);
    }
    
    // Add button event listeners
    if (prevBtn) {
        prevBtn.onclick = () => {
            currentTestimonial = currentTestimonial === 0 ? numViews - 1 : currentTestimonial - 1;
            updateTestimonials();
        };
    }
    
    if (nextBtn) {
        nextBtn.onclick = () => {
            currentTestimonial = (currentTestimonial + 1) % numViews;
            updateTestimonials();
        };
    }
    
    // Auto-advance testimonials with longer interval
    if (window.testimonialsInterval) clearInterval(window.testimonialsInterval);
    window.testimonialsInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % numViews;
        updateTestimonials();
    }, 5000); // Back to 5 seconds for single card
    
    // Initial setup
    updateTestimonials();
}

function goToTestimonial(index) {
    currentTestimonial = index;
    updateTestimonials();
}

function updateTestimonials() {
    const testimonialsGrid = document.getElementById('testimonials-grid');
    const navContainer = document.getElementById('testimonials-nav');
    const dots = navContainer ? Array.from(navContainer.children) : [];
    
    if (!testimonialsGrid) return;
    
    // Calculate transform for single card display
    const cardWidth = 400; // Base card width
    const gap = 32; // Gap between cards
    const transform = -currentTestimonial * (cardWidth + gap);
    
    testimonialsGrid.style.transform = `translateX(${transform}px)`;
    
    // Update navigation dots with smooth transitions
    dots.forEach((dot, index) => {
        if (index === currentTestimonial) {
            dot.classList.add('active');
            dot.style.transform = 'scale(1.2)';
        } else {
            dot.classList.remove('active');
            dot.style.transform = 'scale(1)';
        }
    });
    
    // Update button states
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    
    if (prevBtn) {
        prevBtn.disabled = false; // Always enabled for circular navigation
        prevBtn.style.opacity = '1';
    }
    
    if (nextBtn) {
        nextBtn.disabled = false; // Always enabled for circular navigation
        nextBtn.style.opacity = '1';
    }
    
    // Add subtle animation to current card
    testimonials.forEach((card, index) => {
        if (index === currentTestimonial) {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
            card.style.zIndex = '2';
        } else {
            card.style.opacity = '0.3';
            card.style.transform = 'scale(0.95)';
            card.style.zIndex = '1';
        }
    });
}

// ===== LATEST BLOG POSTS SECTION =====
async function loadLatestBlogPosts() {
    const blogGrid = document.getElementById('blog-grid-home');
    if (!blogGrid) return;
    
    try {
        const response = await fetch('./data/blog-posts.json');
        if (!response.ok) throw new Error('Failed to load blog posts');
        const data = await response.json();
        
        // Get latest 3 posts (excluding featured)
        const latestPosts = data.posts
            .filter(post => !post.featured)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3);
        
        blogGrid.innerHTML = latestPosts.map(post => `
            <article class="blog-card-home">
                <div class="blog-card-image-home">
                    <img src="${post.image}" alt="${post.title}" loading="lazy">
                    <div class="category-badge-home">${post.category}</div>
                </div>
                <div class="blog-card-content-home">
                    <div class="post-meta-home">
                        <span class="date-home">${formatBlogDate(post.date)}</span>
                        <span class="read-time-home">${post.readTime || '5 min read'}</span>
                    </div>
                    <h3><a href="blog-post.html?id=${post.id}">${post.title}</a></h3>
                    <p>${post.excerpt}</p>
                    <div class="blog-card-footer-home">
                        <a href="blog-post.html?id=${post.id}" class="read-more-home">Read More <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            </article>
        `).join('');
    } catch (error) {
        console.error('Error loading blog posts:', error);
        blogGrid.innerHTML = '<p>Unable to load blog posts at this time.</p>';
    }
}

function formatBlogDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
} 