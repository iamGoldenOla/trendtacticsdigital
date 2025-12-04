// Services Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize services page
    initServicesPage();
    
    // Initialize category navigation
    initCategoryNavigation();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize animations
    initAnimations();
    
    // Animate statistics on scroll
    animateStats();
    
    // Initialize service showcase
    initServiceShowcase();
    
    // Initialize service card animations
    initServiceCardAnimations();
    
    // Temporarily disable data loading to prevent errors
    // loadServicesData().catch(error => {
    //     console.warn('Services data loading failed, but page will continue to function:', error);
    // });
});

// Initialize services page
function initServicesPage() {
    console.log('Services page initialized');
    
    // Add scroll event listener for navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Load services data from JSON
async function loadServicesData() {
    try {
        console.log('Loading services data...');
        const response = await fetch('data/content.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Services data loaded successfully:', data);
        
        // Load detailed services
        if (data.services && data.services.length > 0) {
            loadDetailedServices(data.services);
        } else {
            console.warn('No services data found in JSON');
        }
        
        // Load footer content
        loadFooterContent(data);
        
    } catch (error) {
        console.error('Error loading services data:', error);
        
        // Try alternative path
        try {
            console.log('Trying alternative path...');
            const response = await fetch('./data/content.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Services data loaded successfully with alternative path:', data);
            
            // Load detailed services
            if (data.services && data.services.length > 0) {
                loadDetailedServices(data.services);
            }
            
            // Load footer content
            loadFooterContent(data);
            
        } catch (secondError) {
            console.error('Error with alternative path:', secondError);
            showErrorMessage('Failed to load services data. Please refresh the page.');
        }
    }
}

// Load detailed services sections
function loadDetailedServices(services) {
    const detailedServicesContainer = document.getElementById('detailed-services');
    
    if (!detailedServicesContainer || !services) return;
    
    let servicesHTML = '';
    
    services.forEach(service => {
        servicesHTML += `
            <div class="service-section" id="${service.id}">
                <div class="service-header">
                    <div class="service-icon-large">
                        <i class="${service.icon}"></i>
                    </div>
                    <div class="service-info">
                        <h2>${service.title}</h2>
                        <p>${service.description}</p>
                        <div class="service-stats">
                            ${service.stats.map(stat => `
                                <div class="stat">
                                    <span class="stat-number">${stat.value}</span>
                                    <span class="stat-label">${stat.label}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="service-subcategories">
                    ${service.subcategories.map(subcategory => `
                        <div class="subcategory-card">
                            <div class="subcategory-header">
                                <i class="${subcategory.icon}"></i>
                                <h3>${subcategory.title}</h3>
                            </div>
                            <p>${subcategory.description}</p>
                            <ul class="subcategory-features">
                                ${subcategory.features.map(feature => `
                                    <li>${feature}</li>
                                `).join('')}
                            </ul>
                            <div class="subcategory-cta">
                                <span class="price">${subcategory.price}</span>
                                <a href="contact.html" class="btn btn-primary">Get Started</a>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    detailedServicesContainer.innerHTML = servicesHTML;
    
    // Add animation classes
    addAnimationClasses();
}

// Load footer content
function loadFooterContent(data) {
    // Load social links
    const socialLinksContainer = document.getElementById('social-links');
    if (socialLinksContainer && data.socialLinks) {
        socialLinksContainer.innerHTML = data.socialLinks.map(link => `
            <a href="${link.url}" class="social-link" target="_blank" rel="noopener">
                <i class="${link.icon}"></i>
            </a>
        `).join('');
    }
    
    // Load footer services
    const footerServicesContainer = document.getElementById('footer-services');
    if (footerServicesContainer && data.footerServices) {
        footerServicesContainer.innerHTML = data.footerServices.map(service => `
            <li><a href="services.html#${service.id}">${service.name}</a></li>
        `).join('');
    }
    
    // Load footer company links
    const footerCompanyContainer = document.getElementById('footer-company');
    if (footerCompanyContainer && data.footerCompany) {
        footerCompanyContainer.innerHTML = data.footerCompany.map(link => `
            <li><a href="${link.url}">${link.name}</a></li>
        `).join('');
    }
    
    // Load footer resources
    const footerResourcesContainer = document.getElementById('footer-resources');
    if (footerResourcesContainer && data.footerResources) {
        footerResourcesContainer.innerHTML = data.footerResources.map(resource => `
            <li><a href="${resource.url}">${resource.name}</a></li>
        `).join('');
    }
}

// Initialize category navigation
function initCategoryNavigation() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            scrollToCategory(category);
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Scroll to specific category
function scrollToCategory(categoryId) {
    const targetSection = document.getElementById(categoryId);
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Add highlight effect
        targetSection.style.animation = 'pulse 1s ease-in-out';
        setTimeout(() => {
            targetSection.style.animation = '';
        }, 1000);
    }
}

// Initialize smooth scrolling
function initSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize animations
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.category-card, .service-section, .process-step, .subcategory-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Add animation classes
function addAnimationClasses() {
    // Add staggered animation delays
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    const serviceSections = document.querySelectorAll('.service-section');
    serviceSections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.2}s`;
    });
    
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => {
        step.style.animationDelay = `${index * 0.15}s`;
    });
}

// Show error message
function showErrorMessage(message) {
    console.error('Error:', message);
    
    // Check if error message already exists
    let errorDiv = document.getElementById('services-error-message');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.id = 'services-error-message';
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff4757;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-size: 14px;
            max-width: 300px;
            animation: slideIn 0.3s ease-out;
        `;
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(errorDiv);
    }
    
    errorDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-weight: bold;">⚠️</span>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: none; border: none; color: white; cursor: pointer; font-size: 18px; margin-left: auto;">
                ×
            </button>
        </div>
    `;
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (errorDiv && errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 10000);
}

// Service category filter functionality
function filterServices(category) {
    const allSections = document.querySelectorAll('.service-section');
    const categoryCards = document.querySelectorAll('.category-card');
    
    // Remove active class from all category cards
    categoryCards.forEach(card => card.classList.remove('active'));
    
    // Add active class to selected category
    const selectedCard = document.querySelector(`[data-category="${category}"]`);
    if (selectedCard) {
        selectedCard.classList.add('active');
    }
    
    // Show/hide service sections
    allSections.forEach(section => {
        if (category === 'all' || section.id === category) {
            section.style.display = 'block';
            section.classList.add('fade-in-up');
        } else {
            section.style.display = 'none';
            section.classList.remove('fade-in-up');
        }
    });
}

// Price calculator functionality
function calculateServicePrice(serviceType, features = []) {
    const basePrices = {
        'web-design': 2500,
        'digital-marketing': 1500,
        'ai-solutions': 3000,
        'brand-strategy': 2000,
        'ecommerce': 5000,
        'consulting': 500
    };
    
    const featureMultipliers = {
        'responsive-design': 1.2,
        'ecommerce': 1.5,
        'cms': 1.3,
        'seo': 1.4,
        'ppc': 1.6,
        'social-media': 1.2,
        'chatbots': 1.3,
        'analytics': 1.2,
        'automation': 1.4
    };
    
    let basePrice = basePrices[serviceType] || 1000;
    let totalPrice = basePrice;
    
    features.forEach(feature => {
        if (featureMultipliers[feature]) {
            totalPrice *= featureMultipliers[feature];
        }
    });
    
    return Math.round(totalPrice);
}

// Contact form integration
function handleServiceInquiry(serviceType, subcategory) {
    // Store service selection in localStorage for contact form
    localStorage.setItem('selectedService', JSON.stringify({
        type: serviceType,
        subcategory: subcategory,
        timestamp: new Date().toISOString()
    }));
    
    // Redirect to contact page
    window.location.href = 'contact.html?service=' + encodeURIComponent(serviceType);
}

// Performance monitoring
function trackServiceInteraction(action, serviceType, subcategory = null) {
    // Track user interactions for analytics
    const interaction = {
        action: action,
        serviceType: serviceType,
        subcategory: subcategory,
        timestamp: new Date().toISOString(),
        page: 'services'
    };
    
    // Send to analytics (placeholder for actual implementation)
    console.log('Service interaction:', interaction);
    
    // Store in localStorage for analytics
    const interactions = JSON.parse(localStorage.getItem('serviceInteractions') || '[]');
    interactions.push(interaction);
    localStorage.setItem('serviceInteractions', JSON.stringify(interactions));
}

// Export functions for global access
window.ServicesPage = {
    filterServices,
    calculateServicePrice,
    handleServiceInquiry,
    trackServiceInteraction
};

// Animate statistics
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateNumber(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateNumber(element, target) {
    let current = 0;
    const increment = target / 100;
    const suffix = element.getAttribute('data-suffix') || '';
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        const suffix = element.getAttribute('data-suffix') || '';
        element.textContent = Math.floor(current) + suffix;
    }, 20);
}

// Service showcase functionality
function initServiceShowcase() {
    const serviceItems = document.querySelectorAll('.service-icon-item');
    const serviceDesc = document.getElementById('service-desc');
    const digitalMarketingSubs = document.getElementById('digital-marketing-subs');
    const serviceIconsContainer = document.querySelector('.service-icons');
    
    // Auto-scroll variables
    let currentScrollIndex = 0;
    let autoScrollInterval = null;
    
    const serviceDescriptions = {
        'web-development': 'Custom, responsive websites that convert visitors into customers with modern design and seamless user experience. We build fast, reliable websites that engage users and drive growth.',
        'app-development': 'Cross-platform and native mobile apps designed for user retention and scalability. Intuitive apps that scale with your business and delight users.',
        'digital-marketing': 'Comprehensive digital marketing solutions including Email Marketing, Content Creation, Social Media Marketing, and Facebook Ads. Data-driven marketing that moves the needle — from awareness to conversion.'
    };
    
    function autoScrollServices() {
        if (serviceIconsContainer && serviceItems.length > 0) {
            // Move to next service
            currentScrollIndex = (currentScrollIndex + 1) % serviceItems.length;
            const activeItem = serviceItems[currentScrollIndex];
            
            // Remove active class from all items
            serviceItems.forEach(item => item.classList.remove('active'));
            
            // Add active class to current item
            activeItem.classList.add('active');
            
            // Scroll to center the active item
            const cardWidth = activeItem.offsetWidth;
            const gap = 24; // gap between cards
            const containerWidth = serviceIconsContainer.clientWidth;
            const totalCardWidth = cardWidth + gap;
            const scrollPosition = (currentScrollIndex * totalCardWidth) - (containerWidth / 2) + (cardWidth / 2);
            
            serviceIconsContainer.scrollTo({
                left: Math.max(0, scrollPosition),
                behavior: 'smooth'
            });
            
            // Update description
            const serviceType = activeItem.getAttribute('data-service');
            if (serviceDescriptions[serviceType]) {
                serviceDesc.style.opacity = '0';
                setTimeout(() => {
                    serviceDesc.textContent = serviceDescriptions[serviceType];
                    serviceDesc.style.opacity = '1';
                }, 200);
            }
            
            // Automatically show/hide Digital Marketing sub-services
            if (digitalMarketingSubs) {
                if (serviceType === 'digital-marketing') {
                    digitalMarketingSubs.classList.add('active');
                } else {
                    digitalMarketingSubs.classList.remove('active');
                }
            }
        }
    }
    
    // Click handlers for service items
    serviceItems.forEach(item => {
        item.addEventListener('click', function() {
            const serviceType = this.getAttribute('data-service');
            
            // Pause auto-scroll when user clicks
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
                autoScrollInterval = null;
            }
            
            // Remove active class from all items
            serviceItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Update current scroll index
            const clickedIndex = Array.from(serviceItems).indexOf(this);
            currentScrollIndex = clickedIndex;
            
            // Scroll to center the clicked item
            if (serviceIconsContainer) {
                const cardWidth = this.offsetWidth;
                const gap = 24;
                const totalCardWidth = cardWidth + gap;
                const containerWidth = serviceIconsContainer.clientWidth;
                const scrollPosition = (clickedIndex * totalCardWidth) - (containerWidth / 2) + (cardWidth / 2);
                
                serviceIconsContainer.scrollTo({
                    left: Math.max(0, scrollPosition),
                    behavior: 'smooth'
                });
            }
            
            // Show/hide Digital Marketing sub-services
            if (digitalMarketingSubs) {
                if (serviceType === 'digital-marketing') {
                    digitalMarketingSubs.classList.add('active');
                } else {
                    digitalMarketingSubs.classList.remove('active');
                }
            }
            
            // Update description
            if (serviceDescriptions[serviceType]) {
                serviceDesc.style.opacity = '0';
                setTimeout(() => {
                    serviceDesc.textContent = serviceDescriptions[serviceType];
                    serviceDesc.style.opacity = '1';
                }, 200);
            }
            
            // Resume auto-scroll after 5 seconds
            setTimeout(() => {
                if (serviceIconsContainer && !autoScrollInterval) {
                    autoScrollInterval = setInterval(autoScrollServices, 3000);
                }
            }, 5000);
        });
    });
    
    // Start auto-scrolling every 3 seconds
    if (serviceIconsContainer && serviceItems.length > 0) {
        // Initialize with first card
        serviceItems[0].classList.add('active');
        if (serviceDescriptions['web-development']) {
            serviceDesc.textContent = serviceDescriptions['web-development'];
        }
        
        // Start auto-scroll after initial delay
        setTimeout(() => {
            autoScrollInterval = setInterval(autoScrollServices, 3000);
        }, 3000);
        
        // Pause auto-scroll on hover
        serviceIconsContainer.addEventListener('mouseenter', () => {
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
                autoScrollInterval = null;
            }
        });
        
        // Resume auto-scroll on mouse leave
        serviceIconsContainer.addEventListener('mouseleave', () => {
            if (!autoScrollInterval) {
                autoScrollInterval = setInterval(autoScrollServices, 3000);
            }
        });
    }
}

// Add scroll-triggered animations for service cards
function initServiceCardAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize service card animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    initServiceCardAnimations();
    initServicesTestimonialsSlider();
});

// Services Testimonials Slider
function initServicesTestimonialsSlider() {
    const slider = document.getElementById('services-testimonials-slider');
    const prevBtn = document.getElementById('services-testimonial-prev');
    const nextBtn = document.getElementById('services-testimonial-next');
    const dotsContainer = document.getElementById('services-testimonial-dots');
    
    if (!slider || !prevBtn || !nextBtn || !dotsContainer) return;
    
    const slides = slider.querySelectorAll('.testimonial-slide');
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Set slider width based on number of slides
    const sliderWrapper = slider.closest('.testimonials-slider-wrapper');
    if (sliderWrapper) {
        const wrapperWidth = sliderWrapper.offsetWidth;
        slider.style.width = `${totalSlides * 100}%`;
        slides.forEach(slide => {
            slide.style.width = `${wrapperWidth}px`;
        });
    }
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('testimonial-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    function updateSlider() {
        const sliderWrapper = slider.closest('.testimonials-slider-wrapper');
        if (sliderWrapper) {
            const wrapperWidth = sliderWrapper.offsetWidth;
            const translateX = currentSlide * wrapperWidth;
            slider.style.transform = `translateX(-${translateX}px)`;
        }
        
        // Update dots
        dotsContainer.querySelectorAll('.testimonial-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Ensure current slide is visible
        slides.forEach((slide, index) => {
            slide.style.opacity = index === currentSlide ? '1' : '0';
            slide.style.position = index === currentSlide ? 'relative' : 'absolute';
        });
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Initialize
    updateSlider();
    
    // Auto-play
    let autoplayInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    const sliderWrapper = slider.closest('.testimonials-slider-wrapper');
    if (sliderWrapper) {
        sliderWrapper.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
        sliderWrapper.addEventListener('mouseleave', () => {
            autoplayInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const sliderWrapper = slider.closest('.testimonials-slider-wrapper');
        if (sliderWrapper) {
            const wrapperWidth = sliderWrapper.offsetWidth;
            slider.style.width = `${totalSlides * 100}%`;
            slides.forEach(slide => {
                slide.style.width = `${wrapperWidth}px`;
            });
            updateSlider();
        }
    });
}

// FAQ Toggle Function (global for onclick)
window.toggleServicesFAQ = function(element) {
    const faqItem = element.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
} 