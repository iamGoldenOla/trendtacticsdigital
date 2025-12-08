// ===== ABOUT PAGE FUNCTIONALITY =====

document.addEventListener('DOMContentLoaded', function() {
    loadAboutContent();
    initializeAboutAnimations();
});

// Load all about page content
async function loadAboutContent() {
    try {
        const response = await fetch('./data/content.json');
        const data = await response.json();
        
        loadValues(data.values);
        loadTeam(data.team);
        loadStats(data.stats);
        loadTimeline(data.timeline);
        loadBrandsAbout(data.brands);
        loadFooterLinks(data.footer);
        loadSocialLinks(data.social);
        
    } catch (error) {
        console.log('Using fallback about content data');
        loadFallbackAboutContent();
    }
}

// Load company values
function loadValues(values) {
    const valuesGrid = document.getElementById('values-grid');
    if (!valuesGrid) return;

    valuesGrid.innerHTML = values.map(value => `
        <div class="value-card animate-fade-in-up">
            <div class="value-icon">
                <i class="${value.icon}"></i>
            </div>
            <h3>${value.title}</h3>
            <p>${value.description}</p>
        </div>
    `).join('');
}

// Load team members
function loadTeam(team) {
    const teamGrid = document.getElementById('team-grid');
    if (!teamGrid) return;

    teamGrid.innerHTML = team.map(member => `
        <div class="team-card animate-fade-in-up">
            <div class="team-avatar">
                ${member.avatar ? 
                    `<img src="${member.avatar}" alt="${member.name}" loading="lazy">` : 
                    member.name.charAt(0)
                }
            </div>
            <div class="team-info">
                <h3>${member.name}</h3>
                <div class="team-position">${member.position}</div>
                <p class="team-bio">${member.bio}</p>
                <div class="team-social">
                    ${member.social.linkedin ? 
                        `<a href="${member.social.linkedin}" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-linkedin"></i>
                        </a>` : ''
                    }
                    ${member.social.twitter ? 
                        `<a href="${member.social.twitter}" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-twitter"></i>
                        </a>` : ''
                    }
                    ${member.social.github ? 
                        `<a href="${member.social.github}" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-github"></i>
                        </a>` : ''
                    }
                </div>
            </div>
        </div>
    `).join('');
}

// Load company stats
function loadStats(stats) {
    const statsGrid = document.getElementById('stats-grid');
    if (!statsGrid) return;

    statsGrid.innerHTML = stats.map(stat => `
        <div class="stat-item" data-stat="${stat.label}">
            <span class="stat-number">${stat.number}</span>
            <div class="stat-label">${stat.label}</div>
        </div>
    `).join('');
}

// Load company timeline
function loadTimeline(timeline) {
    const timelineContainer = document.getElementById('timeline-container');
    if (!timelineContainer) return;

    timelineContainer.innerHTML = timeline.map(item => `
        <div class="timeline-item">
            <div class="timeline-content">
                <div class="timeline-date">${item.date}</div>
                <h3 class="timeline-title">${item.title}</h3>
                <p class="timeline-description">${item.description}</p>
            </div>
            <div class="timeline-dot"></div>
        </div>
    `).join('');
}

// Load brands for about page
function loadBrandsAbout(brands) {
    const brandsGrid = document.getElementById('brands-grid-about');
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

// Initialize about page animations
function initializeAboutAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                
                // Animate stats counters
                if (entry.target.classList.contains('stat-item')) {
                    animateStatCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.value-card, .team-card, .stat-item, .timeline-item');
    animateElements.forEach(el => observer.observe(el));
}

// Animate stat counter
function animateStatCounter(statElement) {
    const numberElement = statElement.querySelector('.stat-number');
    const targetText = numberElement.textContent;
    
    // Extract number from text (e.g., "500+" -> 500)
    const targetNumber = parseInt(targetText.replace(/\D/g, ''));
    const suffix = targetText.replace(/\d/g, '');
    
    if (isNaN(targetNumber)) return;
    
    let current = 0;
    const increment = targetNumber / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= targetNumber) {
            current = targetNumber;
            clearInterval(timer);
        }
        numberElement.textContent = Math.floor(current) + suffix;
    }, 30);
}

// Fallback content for about page
function loadFallbackAboutContent() {
    // Fallback values
    const fallbackValues = [
        {
            title: "Innovation",
            description: "We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions.",
            icon: "fas fa-lightbulb"
        },
        {
            title: "Excellence",
            description: "We strive for excellence in everything we do, from design to execution and results.",
            icon: "fas fa-star"
        },
        {
            title: "Integrity",
            description: "We build trust through honest communication, transparency, and ethical business practices.",
            icon: "fas fa-shield-alt"
        },
        {
            title: "Collaboration",
            description: "We believe in the power of teamwork and close collaboration with our clients.",
            icon: "fas fa-users"
        },
        {
            title: "Results",
            description: "We focus on delivering measurable, impactful results that drive real business growth.",
            icon: "fas fa-chart-line"
        },
        {
            title: "Growth",
            description: "We're committed to continuous learning and helping our clients achieve sustainable growth.",
            icon: "fas fa-seedling"
        }
    ];
    loadValues(fallbackValues);

    // Fallback team
    const fallbackTeam = [
        {
            name: "Akinola Olujobi",
            position: "Founder & CEO",
            bio: "Digital marketing expert with 10+ years of experience helping brands grow online.",
            avatar: null,
            social: {
                linkedin: "https://linkedin.com/in/akinola-olujobi",
                twitter: "https://twitter.com/akinola_olujobi"
            }
        },
        {
            name: "Sarah Johnson",
            position: "Creative Director",
            bio: "Award-winning designer passionate about creating beautiful, functional digital experiences.",
            avatar: null,
            social: {
                linkedin: "https://linkedin.com/in/sarah-johnson",
                twitter: "https://twitter.com/sarah_johnson"
            }
        },
        {
            name: "Michael Chen",
            position: "Technical Lead",
            bio: "Full-stack developer specializing in modern web technologies and AI integration.",
            avatar: null,
            social: {
                linkedin: "https://linkedin.com/in/michael-chen",
                github: "https://github.com/michaelchen"
            }
        }
    ];
    loadTeam(fallbackTeam);

    // Fallback stats
    const fallbackStats = [
        { number: "50+", label: "Projects Completed" },
        { number: "98%", label: "Client Satisfaction" },
        { number: "3x", label: "Average ROI Increase" },
        { number: "24/7", label: "Support Available" }
    ];
    loadStats(fallbackStats);

    // Fallback timeline
    const fallbackTimeline = [
        {
            date: "2020",
            title: "Company Founded",
            description: "Trendtactics Digital was founded in Lagos, Nigeria with a vision to democratize digital marketing."
        },
        {
            date: "2021",
            title: "First Milestone",
            description: "Reached our first 10 successful client projects, establishing a strong foundation and building lasting partnerships with businesses across Nigeria."
        },
        {
            date: "2022",
            title: "AI Integration",
            description: "Launched our AI-powered solutions division, helping businesses automate processes and leverage cutting-edge technology for growth."
        },
        {
            date: "2023",
            title: "Service Expansion",
            description: "Expanded our service offerings and reached 50+ successful projects, helping businesses across various industries achieve their digital goals."
        },
        {
            date: "2024",
            title: "Academy Launch",
            description: "Launched our digital marketing academy to educate and empower businesses worldwide."
        }
    ];
    loadTimeline(fallbackTimeline);

    // Fallback brands
    const fallbackBrands = [
        {
            name: "KEVTOS CATERING",
            logo: "/images/KEVTOS CATERING.jpg"
        },
        {
            name: "Realtreasure",
            logo: "/images/Realtreasure.jpg"
        },
        {
            name: "HustleNChill",
            logo: "/images/HustleNChill - My Presi 2.jpg"
        },
        {
            name: "GREENTICK",
            logo: "/images/GREENTICK - My Presi.jpg"
        },
        {
            name: "Gabson",
            logo: "/images/Gabson -PICP.jpg"
        }
    ];
    loadBrandsAbout(fallbackBrands);
}

// Add timeline animation on scroll
function initializeTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.5 });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease-out';
        timelineObserver.observe(item);
    });
}

// Initialize timeline animations
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeTimelineAnimations, 1000);
});

// Add smooth scrolling for internal links
document.addEventListener('DOMContentLoaded', function() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add parallax effect to hero section
function initializeParallax() {
    const hero = document.querySelector('.page-hero');
    if (!hero) return;

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    });
}

// Initialize parallax
document.addEventListener('DOMContentLoaded', function() {
    initializeParallax();
}); 