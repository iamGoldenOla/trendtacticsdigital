// ===== REACT COMPONENTS =====

// Main App Component
const App = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const response = await fetch('./data/content.json');
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.log('Using fallback data');
            setData(getFallbackData());
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="react-app">
            <ContactForm />
            <NewsletterSignup />
            <CookieConsent />
        </div>
    );
};

// Loading Spinner Component
const LoadingSpinner = () => (
    <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading...</p>
    </div>
);

// Contact Form Component
const ContactForm = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        company: '',
        service: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submitStatus, setSubmitStatus] = React.useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                company: '',
                service: '',
                message: ''
            });
            
            // Reset status after 3 seconds
            setTimeout(() => setSubmitStatus(null), 3000);
        }, 2000);
    };

    return (
        <div id="contact-form" className="contact-form-modal" style={{display: 'none'}}>
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Get Your Free Consultation</h3>
                    <button className="modal-close" onClick={() => document.getElementById('contact-form').style.display = 'none'}>
                        &times;
                    </button>
                </div>
                
                {submitStatus === 'success' ? (
                    <div className="success-message">
                        <i className="fas fa-check-circle"></i>
                        <h4>Thank you!</h4>
                        <p>We've received your message and will get back to you within 24 hours.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Full Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="email">Email Address *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="company">Company</label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="service">Service Interest</label>
                            <select
                                id="service"
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                            >
                                <option value="">Select a service</option>
                                <option value="web-design">Web Design & Development</option>
                                <option value="digital-marketing">Digital Marketing</option>
                                <option value="ai-solutions">AI Solutions</option>
                                <option value="brand-strategy">Brand Strategy</option>
                                <option value="ecommerce">E-commerce Solutions</option>
                                <option value="consulting">Consulting & Strategy</option>
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="message">Message *</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                required
                            ></textarea>
                        </div>
                        
                        <button 
                            type="submit" 
                            className="btn btn-primary btn-large w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

// Newsletter Signup Component
const NewsletterSignup = () => {
    const [email, setEmail] = React.useState('');
    const [isSubscribed, setIsSubscribed] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate subscription
        setIsSubscribed(true);
        setEmail('');
        
        setTimeout(() => setIsSubscribed(false), 3000);
    };

    return (
        <div className="newsletter-signup">
            <div className="newsletter-content">
                <h4>Stay Updated</h4>
                <p>Get the latest digital marketing insights and tips delivered to your inbox.</p>
                
                {isSubscribed ? (
                    <div className="success-message">
                        <i className="fas fa-check"></i>
                        <span>Successfully subscribed!</span>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="newsletter-form">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn btn-primary">
                            Subscribe
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

// Cookie Consent Component
const CookieConsent = () => {
    const [showConsent, setShowConsent] = React.useState(true);

    const acceptCookies = () => {
        localStorage.setItem('cookiesAccepted', 'true');
        setShowConsent(false);
    };

    const declineCookies = () => {
        localStorage.setItem('cookiesAccepted', 'false');
        setShowConsent(false);
    };

    React.useEffect(() => {
        const cookiesAccepted = localStorage.getItem('cookiesAccepted');
        if (cookiesAccepted !== null) {
            setShowConsent(false);
        }
    }, []);

    if (!showConsent) return null;

    return (
        <div className="cookie-consent">
            <div className="cookie-content">
                <p>
                    We use cookies to enhance your experience and analyze our traffic. 
                    By clicking "Accept", you consent to our use of cookies.
                </p>
                <div className="cookie-buttons">
                    <button onClick={declineCookies} className="btn btn-outline">
                        Decline
                    </button>
                    <button onClick={acceptCookies} className="btn btn-primary">
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
};

// Service Card Component
const ServiceCard = ({ service }) => (
    <div className="service-card animate-fade-in-up">
        <div className="service-icon">
            <i className={service.icon}></i>
        </div>
        <h3 className="service-title">{service.title}</h3>
        <p className="service-description">{service.description}</p>
        <ul className="service-features">
            {service.features.map((feature, index) => (
                <li key={index}>{feature}</li>
            ))}
        </ul>
        <div className="service-price">{service.price}</div>
        <button 
            className="btn btn-primary"
            onClick={() => {
                document.getElementById('contact-form').style.display = 'flex';
                // Pre-fill service
                const serviceSelect = document.querySelector('#service');
                if (serviceSelect) {
                    serviceSelect.value = service.title.toLowerCase().replace(/\s+/g, '-');
                }
            }}
        >
            {service.cta}
        </button>
    </div>
);

// Testimonial Card Component
const TestimonialCard = ({ testimonial }) => (
    <div className="testimonial-card animate-fade-in-up">
        <div className="testimonial-rating">
            {[...Array(testimonial.rating)].map((_, i) => (
                <i key={i} className="fas fa-star"></i>
            ))}
        </div>
        <p className="testimonial-content">"{testimonial.content}"</p>
        <div className="testimonial-author">
            <div className="author-avatar">
                {testimonial.author.avatar ? (
                    <img src={testimonial.author.avatar} alt={testimonial.author.name} />
                ) : (
                    testimonial.author.name.charAt(0)
                )}
            </div>
            <div className="author-info">
                <h4>{testimonial.author.name}</h4>
                <p>{testimonial.author.position} at {testimonial.author.company}</p>
            </div>
        </div>
    </div>
);

// Stats Counter Component
const StatsCounter = ({ stat }) => {
    const [count, setCount] = React.useState(0);
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.5 }
        );

        const element = document.querySelector(`[data-stat="${stat.label}"]`);
        if (element) {
            observer.observe(element);
        }

        return () => observer.disconnect();
    }, [stat.label]);

    React.useEffect(() => {
        if (isVisible) {
            const target = parseInt(stat.number.replace(/\D/g, ''));
            const increment = target / 50;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                setCount(Math.floor(current));
            }, 30);

            return () => clearInterval(timer);
        }
    }, [isVisible, stat.number]);

    return (
        <div className="stat-item" data-stat={stat.label}>
            <div className="stat-number">
                {stat.number.includes('+') ? `${count}+` : 
                 stat.number.includes('%') ? `${count}%` :
                 stat.number.includes('x') ? `${count}x` :
                 stat.number}
            </div>
            <div className="stat-label">{stat.label}</div>
        </div>
    );
};

// Fallback data function
const getFallbackData = () => ({
    brands: [
        { name: 'Brand 1', logo: '/images/brand1.png' },
        { name: 'Brand 2', logo: '/images/brand2.png' },
        { name: 'Brand 3', logo: '/images/brand3.png' }
    ],
    services: [
        {
            title: 'Web Design & Development',
            description: 'Custom websites that convert visitors into customers.',
            icon: 'fas fa-code',
            features: ['Responsive Design', 'SEO Optimization', 'Fast Loading'],
            price: 'From $2,500',
            cta: 'Get Started'
        }
    ],
    testimonials: [
        {
            content: 'Trendtactics transformed our online presence completely.',
            author: {
                name: 'Sarah Johnson',
                position: 'CEO',
                company: 'TechStart Inc.'
            },
            rating: 5
        }
    ],
    footer: {
        services: ['Web Design', 'Digital Marketing', 'AI Solutions'],
        company: ['About Us', 'Our Team', 'Contact'],
        resources: ['Blog', 'Case Studies', 'Support']
    },
    social: [
        {
            platform: 'LinkedIn',
            url: 'https://linkedin.com/company/trendtactics-digital',
            icon: 'fab fa-linkedin'
        }
    ]
});

// Render the React app
ReactDOM.render(<App />, document.getElementById('react-app'));

// ===== ADDITIONAL CSS FOR REACT COMPONENTS =====
const additionalStyles = `
    .loading-spinner {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 200px;
        color: var(--gray-600);
    }

    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid var(--gray-200);
        border-top: 4px solid var(--primary);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: var(--spacing-md);
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .contact-form-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    }

    .modal-content {
        background: var(--white);
        border-radius: var(--radius-xl);
        padding: var(--spacing-2xl);
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: var(--shadow-xl);
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--spacing-xl);
    }

    .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--gray-500);
        padding: var(--spacing-sm);
    }

    .modal-close:hover {
        color: var(--gray-700);
    }

    .form-group {
        margin-bottom: var(--spacing-lg);
    }

    .form-group label {
        display: block;
        margin-bottom: var(--spacing-sm);
        font-weight: 500;
        color: var(--gray-700);
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
        width: 100%;
        padding: var(--spacing-md);
        border: 1px solid var(--gray-300);
        border-radius: var(--radius-md);
        font-size: 1rem;
        transition: border-color var(--transition-fast);
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }

    .success-message {
        text-align: center;
        padding: var(--spacing-2xl);
        color: var(--accent);
    }

    .success-message i {
        font-size: 3rem;
        margin-bottom: var(--spacing-md);
    }

    .newsletter-signup {
        background: var(--gradient-primary);
        color: var(--white);
        padding: var(--spacing-2xl);
        border-radius: var(--radius-xl);
        margin: var(--spacing-2xl) 0;
    }

    .newsletter-content {
        text-align: center;
    }

    .newsletter-form {
        display: flex;
        gap: var(--spacing-md);
        max-width: 400px;
        margin: var(--spacing-lg) auto 0;
    }

    .newsletter-form input {
        flex: 1;
        padding: var(--spacing-md);
        border: none;
        border-radius: var(--radius-md);
        font-size: 1rem;
    }

    .cookie-consent {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: var(--gray-900);
        color: var(--white);
        padding: var(--spacing-lg);
        z-index: 1000;
    }

    .cookie-content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--spacing-lg);
    }

    .cookie-buttons {
        display: flex;
        gap: var(--spacing-md);
    }

    .testimonial-rating {
        color: var(--secondary);
        margin-bottom: var(--spacing-md);
    }

    .stat-item {
        text-align: center;
        padding: var(--spacing-xl);
    }

    .stat-number {
        font-size: 3rem;
        font-weight: 700;
        color: var(--primary);
        margin-bottom: var(--spacing-sm);
    }

    .stat-label {
        color: var(--gray-600);
        font-weight: 500;
    }

    .w-full {
        width: 100%;
    }

    @media (max-width: 768px) {
        .newsletter-form {
            flex-direction: column;
        }

        .cookie-content {
            flex-direction: column;
            text-align: center;
        }

        .modal-content {
            margin: var(--spacing-lg);
            padding: var(--spacing-lg);
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

function showGlobalError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'global-error';
    errorDiv.textContent = message;
    document.body.prepend(errorDiv);
    setTimeout(() => errorDiv.remove(), 5000);
} 