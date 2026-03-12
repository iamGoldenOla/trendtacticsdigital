// Blog Content Recommendation Engine
// Shows "Most Read", "Trending", and "Similar Posts" sections

(async function() {
    'use strict';
    
    // Fetch blog posts
    async function fetchBlogPosts() {
        try {
            const response = await fetch('/data/blog-posts.json');
            const data = await response.json();
            return data.posts || [];
        } catch (error) {
            console.error('Error fetching blog posts:', error);
            return [];
        }
    }
    
    // Get most read posts (by views)
    function getMostRead(posts, limit = 5) {
        return [...posts]
            .sort((a, b) => (b.views || 0) - (a.views || 0))
            .slice(0, limit);
    }
    
    // Get trending posts (recent + high views)
    function getTrending(posts, limit = 5) {
        const recentDate = new Date();
        recentDate.setDate(recentDate.getDate() - 30); // Last 30 days
        
        return [...posts]
            .filter(post => {
                const postDate = new Date(post.date);
                return postDate >= recentDate;
            })
            .sort((a, b) => {
                const aScore = (a.views || 0) + (a.comments || 0) * 10;
                const bScore = (b.views || 0) + (b.comments || 0) * 10;
                return bScore - aScore;
            })
            .slice(0, limit);
    }
    
    // Get similar posts (by tags/category)
    function getSimilarPosts(currentPost, allPosts, limit = 3) {
        if (!currentPost) return [];
        
        const currentTags = currentPost.tags || [];
        const currentCategory = currentPost.category || '';
        
        return allPosts
            .filter(post => {
                if (post.id === currentPost.id) return false;
                
                // Match by tags
                const postTags = post.tags || [];
                const tagMatches = currentTags.filter(tag => 
                    postTags.some(pt => pt.toLowerCase() === tag.toLowerCase())
                ).length;
                
                // Match by category
                const categoryMatch = post.category === currentCategory;
                
                return tagMatches > 0 || categoryMatch;
            })
            .sort((a, b) => {
                const aTags = a.tags || [];
                const bTags = b.tags || [];
                const aMatches = currentTags.filter(t => 
                    aTags.some(at => at.toLowerCase() === t.toLowerCase())
                ).length;
                const bMatches = currentTags.filter(t => 
                    bTags.some(bt => bt.toLowerCase() === t.toLowerCase())
                ).length;
                
                if (a.category === currentCategory && b.category !== currentCategory) return -1;
                if (b.category === currentCategory && a.category !== currentCategory) return 1;
                
                return bMatches - aMatches;
            })
            .slice(0, limit);
    }
    
    // Render post card
    function renderPostCard(post, showCategory = true) {
        const slug = post.slug || `blog-${post.id}`;
        const date = new Date(post.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        return `
            <article class="recommended-post-card">
                ${post.image ? `
                    <a href="/blog/${slug}.html" class="post-image-link">
                        <img src="${post.image}" alt="${post.title}" loading="lazy" class="post-thumbnail">
                    </a>
                ` : ''}
                <div class="post-content">
                    ${showCategory && post.category ? `
                        <span class="post-category">${post.category}</span>
                    ` : ''}
                    <h3 class="post-title">
                        <a href="/blog/${slug}.html">${post.title}</a>
                    </h3>
                    <p class="post-excerpt">${post.excerpt || ''}</p>
                    <div class="post-meta">
                        <span class="post-date">${date}</span>
                        ${post.readTime ? `<span class="post-read-time">${post.readTime}</span>` : ''}
                        ${post.views ? `<span class="post-views">${post.views} views</span>` : ''}
                    </div>
                </div>
            </article>
        `;
    }
    
    // Render recommendation section
    function renderSection(title, posts, containerId) {
        const container = document.getElementById(containerId);
        if (!container || !posts.length) return;
        
        container.innerHTML = `
            <h3 class="recommendations-title">${title}</h3>
            <div class="recommendations-grid">
                ${posts.map(post => renderPostCard(post)).join('')}
            </div>
        `;
    }
    
    // Initialize recommendations
    async function initRecommendations() {
        const posts = await fetchBlogPosts();
        if (!posts.length) return;
        
        // Get current post (if on blog post page)
        const currentPostSlug = window.location.pathname.match(/\/blog\/([^\/]+)\.html/);
        let currentPost = null;
        
        if (currentPostSlug) {
            currentPost = posts.find(p => 
                (p.slug || `blog-${p.id}`) === currentPostSlug[1]
            );
        }
        
        // Render Most Read
        const mostRead = getMostRead(posts);
        renderSection('Most Read', mostRead, 'most-read-posts');
        
        // Render Trending
        const trending = getTrending(posts);
        renderSection('Trending Now', trending, 'trending-posts');
        
        // Render Similar Posts (only on blog post pages)
        if (currentPost) {
            const similar = getSimilarPosts(currentPost, posts);
            renderSection('Similar Posts', similar, 'similar-posts');
        }
    }
    
    // Add CSS styles
    function addStyles() {
        if (document.getElementById('blog-recommendations-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'blog-recommendations-styles';
        style.textContent = `
            .recommendations-title {
                font-size: 1.5rem;
                font-weight: 700;
                margin-bottom: 1.5rem;
                color: var(--base-dark, #0A1E3F);
            }
            
            .recommendations-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                gap: 1.5rem;
                margin-bottom: 3rem;
            }
            
            .recommended-post-card {
                background: white;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            
            .recommended-post-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 8px 24px rgba(0,0,0,0.15);
            }
            
            .post-image-link {
                display: block;
                overflow: hidden;
                height: 200px;
            }
            
            .post-thumbnail {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.3s ease;
            }
            
            .recommended-post-card:hover .post-thumbnail {
                transform: scale(1.05);
            }
            
            .post-content {
                padding: 1.5rem;
            }
            
            .post-category {
                display: inline-block;
                background: rgba(0, 255, 255, 0.1);
                color: #00FFFF;
                padding: 0.25rem 0.75rem;
                border-radius: 4px;
                font-size: 0.75rem;
                font-weight: 600;
                text-transform: uppercase;
                margin-bottom: 0.75rem;
            }
            
            .post-title {
                margin: 0 0 0.75rem 0;
                font-size: 1.1rem;
                line-height: 1.4;
            }
            
            .post-title a {
                color: var(--base-dark, #0A1E3F);
                text-decoration: none;
                transition: color 0.3s ease;
            }
            
            .post-title a:hover {
                color: #00FFFF;
            }
            
            .post-excerpt {
                color: #666;
                font-size: 0.9rem;
                line-height: 1.6;
                margin-bottom: 1rem;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            
            .post-meta {
                display: flex;
                gap: 1rem;
                font-size: 0.85rem;
                color: #999;
                flex-wrap: wrap;
            }
            
            @media (max-width: 768px) {
                .recommendations-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            addStyles();
            initRecommendations();
        });
    } else {
        addStyles();
        initRecommendations();
    }
})();

