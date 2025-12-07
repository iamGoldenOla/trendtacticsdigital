// Blog Post functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Blog post page loaded');
    loadBlogPost();
    setupNewsletter();
    setupAnalytics();
});

// Blog data
const blogData = {
    posts: [
        {
            id: 1,
            title: 'How AI-Driven SEO Increased Traffic by 300% in 6 Months',
            excerpt: 'Discover how Trendtactics Digital used AI-powered strategies to triple organic traffic for a leading e-commerce brand in just 6 months.',
            content: `<p>In today's competitive digital landscape, traditional SEO strategies are no longer enough to achieve significant growth. This case study explores how we leveraged artificial intelligence to revolutionize our client's search engine optimization approach.</p>

<h2>The Challenge</h2>
<p>Our client, a mid-sized e-commerce retailer, was struggling with stagnant organic traffic despite implementing standard SEO practices. They needed a breakthrough solution to compete with larger competitors and achieve sustainable growth in their market.</p>

<p>The company had been using traditional SEO methods for over two years, but their organic traffic had plateaued at around 10,000 monthly visitors. With increasing competition and rising advertising costs, they needed a more sophisticated approach to drive organic growth.</p>

<h2>The AI Solution</h2>
<p>We implemented a comprehensive AI-driven SEO strategy that included machine learning-powered keyword research, automated content optimization, predictive analytics for search trends, and dynamic meta tag generation.</p>

<h3>1. AI-Powered Keyword Research</h3>
<p>We used advanced machine learning algorithms to analyze search patterns, user intent, and competitive landscapes. This allowed us to identify high-opportunity keywords that traditional tools missed.</p>

<h3>2. Automated Content Optimization</h3>
<p>Our AI system continuously monitored content performance and automatically suggested optimizations based on real-time data and search engine algorithm changes.</p>

<h3>3. Predictive Analytics</h3>
<p>We implemented predictive models to forecast search trends and seasonal patterns, allowing us to optimize content before trends peaked.</p>

<h3>4. Dynamic Meta Tag Generation</h3>
<p>Our AI system generated optimized meta titles and descriptions based on user behavior data and search intent analysis.</p>

<h2>The Results</h2>
<p>Within 6 months, our AI-powered approach delivered:</p>

<ul>
<li><strong>300% increase in organic traffic</strong> - From 10,000 to 40,000 monthly visitors</li>
<li><strong>150% improvement in conversion rates</strong> - Better targeting led to higher quality traffic</li>
<li><strong>40% reduction in bounce rate</strong> - More relevant content kept users engaged</li>
<li><strong>Top 3 rankings for 15 target keywords</strong> - Dominated competitive search terms</li>
<li><strong>200% increase in organic revenue</strong> - Direct impact on business growth</li>
</ul>

<h2>Key Success Factors</h2>
<p>The success of this campaign was driven by several key factors:</p>

<h3>Data-Driven Approach</h3>
<p>Every decision was based on comprehensive data analysis rather than assumptions or best practices alone.</p>

<h3>Continuous Optimization</h3>
<p>Our AI system continuously monitored and optimized performance, adapting to algorithm changes in real-time.</p>

<h3>User-Centric Content</h3>
<p>Content was optimized for user intent and experience, not just search engines.</p>

<h3>Technical Excellence</h3>
<p>We ensured perfect technical SEO implementation to support our content strategy.</p>

<h2>Lessons Learned</h2>
<p>This case study demonstrates that AI-driven SEO can deliver exceptional results when properly implemented. The key is combining advanced technology with deep understanding of user behavior and search engine algorithms.</p>

<p>For businesses looking to replicate this success, we recommend starting with a comprehensive audit of current SEO performance, implementing AI-powered tools gradually, and maintaining focus on user experience throughout the optimization process.</p>`,
            category: 'Case Study',
            funnel_stage: 'BOFU',
            author: 'Akinola Olujobi',
            date: '2025-06-15',
            image: '/images/blog1.jpg',
            tags: ['AI', 'SEO', 'E-commerce', 'Traffic', 'Case Study', 'ROI'],
            readTime: '8 min read',
            views: 1247,
            comments: 23,
            cta: 'Get Your Free SEO Audit'
        },
        {
            id: 2,
            title: '5 Proven Ways to Boost Your Social Media Engagement in 2025',
            excerpt: 'Learn actionable strategies to increase your brand engagement and reach on social platforms in 2025.',
            content: `<p>Social media engagement is the lifeblood of any successful digital marketing strategy. In 2025, the landscape has evolved significantly, requiring new approaches to capture and maintain audience attention.</p>

<h2>1. Leverage AI-Powered Content Creation</h2>
<p>Artificial intelligence tools can help you create more engaging content by analyzing trending topics, optimal posting times, and audience preferences. These tools can identify what content performs best with your specific audience and suggest improvements.</p>

<h2>2. Embrace Short-Form Video Content</h2>
<p>Platforms like TikTok, Instagram Reels, and YouTube Shorts dominate user attention. Focus on creating compelling short-form videos that tell your brand story and provide value to your audience.</p>

<h2>3. Implement Interactive Polls and Stories</h2>
<p>Engage your audience directly by using interactive features like polls, Q&A sessions, and behind-the-scenes content. This creates a two-way conversation and builds stronger relationships.</p>

<h2>4. Optimize for Each Platform's Algorithm</h2>
<p>Each social media platform has unique algorithms. Tailor your content strategy to maximize visibility on each platform.</p>

<h2>5. Build Authentic Community Connections</h2>
<p>Focus on building genuine relationships with your audience through consistent, valuable content and active community management.</p>`,
            category: 'Tips',
            funnel_stage: 'MOFU',
            author: 'Sarah Johnson',
            date: '2025-05-20',
            image: '/images/blog1.jpg',
            tags: ['Social Media', 'Engagement', 'Strategy', '2025', 'Content'],
            readTime: '6 min read',
            views: 892,
            comments: 15,
            cta: 'Download Social Media Strategy Template'
        },
        {
            id: 3,
            title: 'Google Latest Algorithm Update: What You Need to Know',
            excerpt: 'Stay ahead of the curve with our breakdown of the latest Google update and how it impacts your SEO strategy.',
            content: `<p>Google's latest algorithm update, rolled out in April 2025, represents one of the most significant changes to search ranking factors in recent years. Understanding these changes is crucial for maintaining and improving your search visibility.</p>

<h2>Key Changes in the Update</h2>
<p>The update focuses on three main areas:</p>

<h3>1. User Experience Signals</h3>
<p>Google now places greater emphasis on Core Web Vitals, page load speed, and mobile usability. Sites that provide excellent user experiences will see improved rankings.</p>

<h3>2. Content Quality Assessment</h3>
<p>The algorithm has become more sophisticated in evaluating content quality, including factors like expertise, authoritativeness, and trustworthiness (E-A-T).</p>

<h3>3. AI-Generated Content Detection</h3>
<p>Google has improved its ability to identify and appropriately rank AI-generated content, favoring human-created, valuable content.</p>

<h2>Action Items for SEOs</h2>
<ul>
<li>Audit your Core Web Vitals scores</li>
<li>Review and improve content quality</li>
<li>Ensure mobile optimization</li>
<li>Focus on user engagement metrics</li>
</ul>`,
            category: 'News',
            funnel_stage: 'TOFU',
            author: 'Michael Chen',
            date: '2025-04-10',
            image: '/images/blog2.jpg',
            tags: ['Google', 'Algorithm', 'SEO', 'Update', 'Technical SEO'],
            readTime: '7 min read',
            views: 1567,
            comments: 31,
            cta: 'Subscribe to SEO Updates'
        },
        {
            id: 4,
            title: 'A Beginner Guide to Content Marketing in 2025',
            excerpt: 'Everything you need to know to launch a successful content marketing campaign this year.',
            content: `<p>Content marketing has evolved significantly in 2025, with new technologies and platforms changing how we create, distribute, and measure content success. This comprehensive guide will help you navigate the modern content marketing landscape.</p>

<h2>Understanding Content Marketing Fundamentals</h2>
<p>Content marketing is a strategic marketing approach focused on creating and distributing valuable, relevant, and consistent content to attract and retain a clearly defined audience.</p>

<h2>Key Components of a Successful Content Strategy</h2>
<h3>1. Audience Research</h3>
<p>Understanding your target audience is the foundation of effective content marketing. Use tools like Google Analytics, social media insights, and customer surveys to gather data.</p>

<h3>2. Content Planning</h3>
<p>Develop a content calendar that aligns with your business goals and audience needs. Plan for different content types and distribution channels.</p>

<h3>3. Content Creation</h3>
<p>Focus on creating high-quality, valuable content that addresses your audience's pain points and interests.</p>

<h3>4. Distribution Strategy</h3>
<p>Use multiple channels to distribute your content, including owned, earned, and paid media.</p>

<h3>5. Measurement and Optimization</h3>
<p>Track key metrics and continuously optimize your content strategy based on performance data.</p>`,
            category: 'How-To',
            funnel_stage: 'MOFU',
            author: 'Emily Rodriguez',
            date: '2025-03-15',
            image: '/images/blog3.jpg',
            tags: ['Content Marketing', 'Strategy', 'Beginner', '2025', 'Guide'],
            readTime: '10 min read',
            views: 743,
            comments: 12,
            cta: 'Download Content Marketing Template'
        },
        {
            id: 5,
            title: 'The Future of Digital Marketing: AI and Automation',
            excerpt: 'Explore how artificial intelligence and automation are reshaping the digital marketing landscape.',
            content: `<p>The digital marketing landscape is undergoing a revolutionary transformation driven by artificial intelligence and automation. Understanding these changes is crucial for staying competitive in the modern marketplace.</p>

<h2>The Rise of AI in Digital Marketing</h2>
<p>Artificial intelligence is no longer a futuristic concept—it's here and actively reshaping how we approach digital marketing. From personalized content recommendations to automated campaign optimization, AI is becoming an integral part of successful marketing strategies.</p>

<h2>Key AI Applications in Marketing</h2>
<h3>1. Personalized Marketing</h3>
<p>AI enables hyper-personalized marketing experiences by analyzing user behavior, preferences, and interactions in real-time.</p>

<h3>2. Predictive Analytics</h3>
<p>Machine learning algorithms can predict customer behavior, helping marketers make data-driven decisions about campaign strategies.</p>

<h3>3. Automated Content Creation</h3>
<p>AI tools can generate content ideas, optimize headlines, and even create basic content drafts, freeing up time for creative strategy.</p>

<h3>4. Chatbots and Customer Service</h3>
<p>AI-powered chatbots provide instant customer support, improving user experience and reducing response times.</p>

<h2>Automation in Marketing</h2>
<p>Marketing automation tools streamline repetitive tasks, allowing marketers to focus on strategy and creativity while ensuring consistent execution across all channels.</p>`,
            category: 'Trends',
            funnel_stage: 'TOFU',
            author: 'David Kim',
            date: '2025-02-28',
            image: '/images/blog1.jpg',
            tags: ['AI', 'Automation', 'Future', 'Digital Marketing', 'Technology'],
            readTime: '9 min read',
            views: 1123,
            comments: 18,
            cta: 'Get AI Marketing Assessment'
        },
        {
            id: 6,
            title: 'Building a Strong Brand Identity in the Digital Age',
            excerpt: 'Learn the essential elements of creating a memorable and effective brand identity online.',
            content: `<p>In today's digital-first world, building a strong brand identity is more important than ever. Your brand identity is what sets you apart from competitors and creates lasting connections with your audience.</p>

<h2>What is Brand Identity?</h2>
<p>Brand identity encompasses all the visual, verbal, and experiential elements that represent your brand. It includes your logo, color palette, typography, messaging, and overall brand personality.</p>

<h2>Essential Elements of Digital Brand Identity</h2>
<h3>1. Visual Identity</h3>
<p>Your visual identity includes your logo, color scheme, typography, and imagery. These elements should be consistent across all digital touchpoints.</p>

<h3>2. Brand Voice and Messaging</h3>
<p>Your brand voice reflects your personality and values. It should be consistent in all communications, from social media posts to customer service interactions.</p>

<h3>3. Digital Presence</h3>
<p>Your website, social media profiles, and other digital assets should reflect your brand identity and provide a cohesive experience.</p>

<h3>4. Customer Experience</h3>
<p>Every interaction with your brand should reinforce your identity and values, creating a memorable and positive experience.</p>

<h2>Building Brand Consistency</h2>
<p>Consistency is key to building a strong brand identity. Ensure all your digital assets and communications align with your brand guidelines.</p>`,
            category: 'Branding',
            funnel_stage: 'MOFU',
            author: 'Lisa Wang',
            date: '2025-01-20',
            image: '/images/blog2.jpg',
            tags: ['Branding', 'Identity', 'Digital', 'Strategy', 'Design'],
            readTime: '7 min read',
            views: 678,
            comments: 9,
            cta: 'Get Brand Identity Audit'
        }
    ]
};

// Load blog post based on URL parameter
function loadBlogPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = parseInt(urlParams.get('id')) || 1;
    
    console.log('Loading blog post with ID:', postId);
    
    const post = blogData.posts.find(p => p.id === postId);
    if (!post) {
        displayError('Blog post not found');
        return;
    }
    
    displayBlogPost(post);
    loadRelatedPosts(post);
}

// Display blog post content
function displayBlogPost(post) {
    console.log('Displaying blog post:', post.title);
    
    // Update page title
    document.title = `${post.title} - Trendtactics Digital`;
    
    // Update breadcrumb
    const breadcrumbElement = document.getElementById('post-title-breadcrumb');
    if (breadcrumbElement) {
        breadcrumbElement.textContent = post.title.substring(0, 30) + '...';
    }
    
    // Update post meta
    const categoryElement = document.getElementById('post-category');
    if (categoryElement) categoryElement.textContent = post.category;
    
    const dateElement = document.getElementById('post-date');
    if (dateElement) dateElement.textContent = formatDate(post.date);
    
    const readTimeElement = document.getElementById('post-read-time');
    if (readTimeElement) readTimeElement.textContent = post.readTime;
    
    const funnelBadgeElement = document.getElementById('post-funnel-badge');
    if (funnelBadgeElement) {
        funnelBadgeElement.textContent = getFunnelStageName(post.funnel_stage);
        funnelBadgeElement.className = `funnel-badge ${post.funnel_stage.toLowerCase()}`;
    }
    
    // Update post content
    const titleElement = document.getElementById('post-title');
    if (titleElement) titleElement.textContent = post.title;
    
    const excerptElement = document.getElementById('post-excerpt');
    if (excerptElement) excerptElement.textContent = post.excerpt;
    
    const imageElement = document.getElementById('post-image');
    if (imageElement) {
        // Ensure absolute path for images
        const imagePath = post.image.startsWith('/') ? post.image : '/' + post.image;
        imageElement.src = imagePath;
        imageElement.alt = post.title;
        // Add error handling for broken images
        imageElement.onerror = function() {
            this.src = '/images/blog1.jpg'; // Fallback image
        };
    }
    
    const bodyElement = document.getElementById('post-body');
    if (bodyElement) bodyElement.innerHTML = post.content;
    
    // Update author info
    const authorNameElement = document.getElementById('author-name');
    if (authorNameElement) authorNameElement.textContent = post.author;
    
    const authorTitleElement = document.getElementById('author-title');
    if (authorTitleElement) authorTitleElement.textContent = getAuthorTitle(post.author);
    
    // Update stats
    const viewsElement = document.getElementById('post-views');
    if (viewsElement) viewsElement.textContent = post.views.toLocaleString();
    
    const commentsElement = document.getElementById('post-comments');
    if (commentsElement) commentsElement.textContent = post.comments;
    
    const sharesElement = document.getElementById('post-shares');
    if (sharesElement) sharesElement.textContent = Math.floor(post.views / 100);
    
    // Update tags
    displayTags(post.tags);
    
    // Update CTA
    displayCTA(post);
    
    // Update author bio
    displayAuthorBio(post);
    
    console.log('Blog post displayed successfully');
}

// Display tags
function displayTags(tags) {
    const tagsContainer = document.getElementById('post-tags');
    if (!tagsContainer) return;
    
    tagsContainer.innerHTML = tags.map(tag => `
        <span class="tag">${tag}</span>
    `).join('');
}

// Display CTA based on funnel stage
function displayCTA(post) {
    const ctaContainer = document.getElementById('post-cta');
    if (!ctaContainer) return;
    
    const ctaContent = `
        <div class="cta-content">
            <h3>${post.cta}</h3>
            <p>Ready to take your ${post.category.toLowerCase()} to the next level? Get started today with our expert team.</p>
            <a href="contact.html" class="btn btn-primary">Get Started Now</a>
        </div>
    `;
    
    ctaContainer.innerHTML = ctaContent;
}

// Display author bio
function displayAuthorBio(post) {
    const bioContainer = document.getElementById('author-bio');
    if (!bioContainer) return;
    
    const bioContent = `
        <div class="author-bio-content">
            <div class="author-bio-avatar">
                <i class="fas fa-user-circle"></i>
            </div>
            <div class="author-bio-text">
                <h4>${post.author}</h4>
                <p class="author-title">${getAuthorTitle(post.author)}</p>
                <p>${getAuthorBio(post.author)}</p>
            </div>
        </div>
    `;
    
    bioContainer.innerHTML = bioContent;
}

// Load related posts
function loadRelatedPosts(currentPost) {
    const relatedContainer = document.getElementById('related-posts');
    if (!relatedContainer) return;
    
    // Get related posts (same category or funnel stage, excluding current post)
    const relatedPosts = blogData.posts.filter(post => 
        post.id !== currentPost.id && 
        (post.category === currentPost.category || post.funnel_stage === currentPost.funnel_stage)
    ).slice(0, 3);
    
    if (relatedPosts.length === 0) {
        // If no related posts, show recent posts
        const recentPosts = blogData.posts.filter(post => post.id !== currentPost.id).slice(0, 3);
        displayRelatedPosts(recentPosts, relatedContainer);
    } else {
        displayRelatedPosts(relatedPosts, relatedContainer);
    }
}

// Display related posts
function displayRelatedPosts(posts, container) {
    container.innerHTML = posts.map(post => `
        <div class="related-post">
            <div class="related-post-image">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="related-post-content">
                <h4><a href="blog-post.html?id=${post.id}">${post.title}</a></h4>
                <span class="date">${formatDate(post.date)}</span>
                <span class="funnel-badge ${post.funnel_stage.toLowerCase()}">${getFunnelStageName(post.funnel_stage)}</span>
            </div>
        </div>
    `).join('');
}

// Helper functions
function getFunnelStageName(stage) {
    const stages = {
        'TOFU': 'Awareness',
        'MOFU': 'Consideration', 
        'BOFU': 'Decision'
    };
    return stages[stage] || stage;
}

function getAuthorTitle(author) {
    const titles = {
        'Akinola Olujobi': 'Founder & CEO',
        'Sarah Johnson': 'Social Media Strategist',
        'Michael Chen': 'SEO Specialist',
        'Emily Rodriguez': 'Content Marketing Manager',
        'David Kim': 'Digital Marketing Analyst',
        'Lisa Wang': 'Brand Strategist'
    };
    return titles[author] || 'Digital Marketing Expert';
}

function getAuthorBio(author) {
    const bios = {
        'Akinola Olujobi': 'Founder and CEO of Trendtactics Digital, with over 10 years of experience in digital marketing and AI solutions.',
        'Sarah Johnson': 'Social Media Strategist at Trendtactics Digital, specializing in community building and engagement optimization.',
        'Michael Chen': 'SEO Specialist with expertise in technical SEO and algorithm analysis.',
        'Emily Rodriguez': 'Content Marketing Manager with expertise in content strategy and audience development.',
        'David Kim': 'Digital Marketing Analyst specializing in emerging technologies and market trends.',
        'Lisa Wang': 'Brand Strategist with expertise in digital brand development and identity design.'
    };
    return bios[author] || 'Digital marketing expert with years of experience helping businesses grow online.';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Social sharing functions
function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.getElementById('post-title').textContent);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.getElementById('post-title').textContent);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.getElementById('post-title').textContent);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
}

function shareViaEmail() {
    const url = window.location.href;
    const title = document.getElementById('post-title').textContent;
    const subject = encodeURIComponent(`Check out this article: ${title}`);
    const body = encodeURIComponent(`I thought you might be interested in this article: ${title}\n\n${url}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
}

// Display error
function displayError(message) {
    console.error('Displaying error:', message);
    const postBody = document.getElementById('post-body');
    if (postBody) {
        postBody.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <h2>Post Not Found</h2>
                <p>${message}</p>
                <a href="blog.html" class="btn btn-primary">Back to Blog</a>
            </div>
        `;
    }
}

// Newsletter signup
function setupNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        showMessage('Thank you for subscribing! Check your email for confirmation.', 'success');
        this.reset();
        
        // Track the event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'newsletter_signup', {
                'event_category': 'engagement',
                'event_label': 'blog_post'
            });
        }
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show message
function showMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="message-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(messageDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentElement) {
            messageDiv.remove();
        }
    }, 5000);
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .message-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .message-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
        opacity: 0.7;
        transition: opacity 0.2s;
    }
    
    .message-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Analytics tracking
function setupAnalytics() {
    // Track page view
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            'page_title': document.title,
            'page_location': window.location.href
        });
    }
    
    // Track social shares
    document.addEventListener('click', function(e) {
        if (e.target.closest('.social-btn')) {
            const platform = e.target.closest('.social-btn').classList[1];
            if (typeof gtag !== 'undefined') {
                gtag('event', 'share', {
                    'method': platform,
                    'content_type': 'article',
                    'item_id': new URLSearchParams(window.location.search).get('id')
                });
            }
        }
    });
    
    // Track CTA clicks
    document.addEventListener('click', function(e) {
        if (e.target.closest('.post-cta .btn')) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'engagement',
                    'event_label': 'blog_post_cta'
                });
            }
        }
    });
}
