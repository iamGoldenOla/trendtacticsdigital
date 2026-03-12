// Dynamic Sitemap Generator for Trendtactics Digital
// This script generates sitemap.xml dynamically including all pages and blog posts

async function generateSitemap() {
    const baseUrl = 'https://trendtacticsdigital.com';
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Static pages
    const staticPages = [
        { url: '/', priority: '1.0', changefreq: 'weekly' },
        { url: '/about.html', priority: '0.9', changefreq: 'monthly' },
        { url: '/services.html', priority: '0.9', changefreq: 'weekly' },
        { url: '/service-web-development.html', priority: '0.8', changefreq: 'monthly' },
        { url: '/service-app-development.html', priority: '0.8', changefreq: 'monthly' },
        { url: '/service-digital-marketing.html', priority: '0.8', changefreq: 'monthly' },
        { url: '/service-email-marketing.html', priority: '0.8', changefreq: 'monthly' },
        { url: '/service-social-media-marketing.html', priority: '0.8', changefreq: 'monthly' },
        { url: '/service-content-creation.html', priority: '0.8', changefreq: 'monthly' },
        { url: '/service-facebook-ads.html', priority: '0.8', changefreq: 'monthly' },
        { url: '/pricing.html', priority: '0.9', changefreq: 'monthly' },
        { url: '/portfolio.html', priority: '0.8', changefreq: 'weekly' },
        { url: '/contact.html', priority: '0.9', changefreq: 'monthly' },
        { url: '/academy.html', priority: '0.8', changefreq: 'weekly' },
        { url: '/ebooks.html', priority: '0.7', changefreq: 'weekly' },
        { url: '/tools.html', priority: '0.7', changefreq: 'monthly' },
        { url: '/quiz.html', priority: '0.7', changefreq: 'monthly' },
        { url: '/shop.html', priority: '0.6', changefreq: 'weekly' },
        { url: '/hub.html', priority: '0.8', changefreq: 'monthly' },
        { url: '/trendy-ai.html', priority: '0.7', changefreq: 'monthly' },
        { url: '/resources.html', priority: '0.7', changefreq: 'monthly' }
    ];
    
    // Fetch blog posts
    let blogPosts = [];
    try {
        const response = await fetch('/data/blog-posts.json');
        const data = await response.json();
        blogPosts = data.posts || [];
    } catch (error) {
        console.error('Error loading blog posts:', error);
    }
    
    // Generate sitemap XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
`;
    
    // Add static pages
    staticPages.forEach(page => {
        sitemap += `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
    });
    
    // Add blog posts
    blogPosts.forEach(post => {
        const slug = post.slug || `blog-${post.id}`;
        const postDate = post.date || currentDate;
        sitemap += `  <url>
    <loc>${baseUrl}/blog/${slug}.html</loc>
    <lastmod>${postDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${post.featured ? '0.9' : '0.7'}</priority>
`;
        
        // Add image if available
        if (post.image) {
            sitemap += `    <image:image>
      <image:loc>${baseUrl}${post.image}</image:loc>
      <image:title>${post.title}</image:title>
    </image:image>
`;
        }
        
        sitemap += `  </url>
`;
    });
    
    sitemap += `</urlset>`;
    
    return sitemap;
}

// Export for Node.js usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateSitemap };
}

