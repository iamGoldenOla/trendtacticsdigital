// Blog functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Blog page loaded');
    loadBlogPosts();
});

// Simple blog data
const blogData = {
    posts: [
        {
            id: 1,
            title: 'How AI-Driven SEO Increased Traffic by 300% in 6 Months',
            excerpt: 'Discover how Trendtactics Digital used AI-powered strategies to triple organic traffic for a leading e-commerce brand in just 6 months.',
            category: 'Case Study',
            date: '2025-06-15',
            image: '/images/blog1.jpg',
            featured: true,
            views: 1247,
            comments: 23
        },
        {
            id: 2,
            title: '5 Proven Ways to Boost Your Social Media Engagement in 2025',
            excerpt: 'Learn actionable strategies to increase your brand engagement and reach on social platforms in 2025.',
            category: 'Tips',
            date: '2025-05-20',
            image: '/images/blog1.jpg',
            featured: false,
            views: 892,
            comments: 15
        },
        {
            id: 3,
            title: 'Google Latest Algorithm Update: What You Need to Know',
            excerpt: 'Stay ahead of the curve with our breakdown of the latest Google update and how it impacts your SEO strategy.',
            category: 'News',
            date: '2025-04-10',
            image: '/images/blog2.jpg',
            featured: false,
            views: 1567,
            comments: 31
        },
        {
            id: 4,
            title: 'A Beginner Guide to Content Marketing in 2025',
            excerpt: 'Everything you need to know to launch a successful content marketing campaign this year.',
            category: 'How-To',
            date: '2025-03-15',
            image: '/images/blog3.jpg',
            featured: false,
            views: 743,
            comments: 12
        },
        {
            id: 5,
            title: 'The Future of Digital Marketing: AI and Automation',
            excerpt: 'Explore how artificial intelligence and automation are reshaping the digital marketing landscape.',
            category: 'Trends',
            date: '2025-02-28',
            image: '/images/blog1.jpg',
            featured: false,
            views: 1123,
            comments: 18
        },
        {
            id: 6,
            title: 'Building a Strong Brand Identity in the Digital Age',
            excerpt: 'Learn the essential elements of creating a memorable and effective brand identity online.',
            category: 'Branding',
            date: '2025-01-20',
            image: '/images/blog2.jpg',
            featured: false,
            views: 678,
            comments: 9
        }
    ]
};

function loadBlogPosts() {
    console.log('Loading blog posts...');
    displayFeaturedPost();
    displayBlogGrid();
    updateRecentPosts();
}

function displayFeaturedPost() {
    const featuredPost = blogData.posts.find(post => post.featured);
    const featuredSection = document.querySelector('.featured-post');
    
    if (featuredPost && featuredSection) {
        featuredSection.innerHTML = `
            <div class="featured-post-content">
                <div class="featured-post-image">
                    <img src="${featuredPost.image}" alt="${featuredPost.title}">
                    <div class="featured-badge">Featured</div>
                </div>
                <div class="featured-post-text">
                    <div class="post-meta">
                        <span class="category">${featuredPost.category}</span>
                        <span class="date">${formatDate(featuredPost.date)}</span>
                    </div>
                    <h2>${featuredPost.title}</h2>
                    <p>${featuredPost.excerpt}</p>
                    <div class="post-stats">
                        <span><i class="fas fa-eye"></i> ${featuredPost.views.toLocaleString()}</span>
                        <span><i class="fas fa-comments"></i> ${featuredPost.comments}</span>
                    </div>
                    <a href="blog-post.html?id=${featuredPost.id}" class="btn btn-primary">Read Full Article</a>
                </div>
            </div>
        `;
    }
}

function displayBlogGrid() {
    const regularPosts = blogData.posts.filter(post => !post.featured);
    const blogGrid = document.querySelector('.blog-grid');
    
    if (blogGrid) {
        blogGrid.innerHTML = regularPosts.map(post => `
            <article class="blog-card">
                <div class="blog-card-image">
                    <img src="${post.image}" alt="${post.title}">
                    <div class="category-badge">${post.category}</div>
                </div>
                <div class="blog-card-content">
                    <div class="post-meta">
                        <span class="date">${formatDate(post.date)}</span>
                    </div>
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <div class="post-stats">
                        <span><i class="fas fa-eye"></i> ${post.views.toLocaleString()}</span>
                        <span><i class="fas fa-comments"></i> ${post.comments}</span>
                    </div>
                    <div class="blog-card-footer">
                        <a href="blog-post.html?id=${post.id}" class="read-more">Read More</a>
                    </div>
                </div>
            </article>
        `).join('');
    }
}

function updateRecentPosts() {
    const recentPosts = blogData.posts.slice(0, 5);
    const recentPostsList = document.querySelector('.recent-posts-list');
    
    if (recentPostsList) {
        recentPostsList.innerHTML = recentPosts.map(post => `
            <li>
                <div class="recent-post-image">
                    <img src="${post.image}" alt="${post.title}">
                </div>
                <div class="recent-post-content">
                    <h4><a href="blog-post.html?id=${post.id}">${post.title}</a></h4>
                    <span class="date">${formatDate(post.date)}</span>
                </div>
            </li>
        `).join('');
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
