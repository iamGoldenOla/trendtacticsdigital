import re

JS_FILE = 'c:/Users/Akinola Olujobi/Documents/TrendtacticsDigitalClean/js/blog-post.js'
with open(JS_FILE, 'r', encoding='utf-8') as f:
    js_content = f.read()

# Replace displayTags
old_display_tags = """// Display tags
function displayTags(tags) {
    const tagsContainer = document.getElementById('post-tags');
    if (!tagsContainer) return;
    
    tagsContainer.innerHTML = tags.map(tag => `
        <span class="tag">${tag}</span>
    `).join('');
}"""

new_display_tags = """// Display tags
function displayTags(tags) {
    const tagsContainer = document.getElementById('post-tags');
    if (!tagsContainer) return;
    
    tagsContainer.innerHTML = '<span style="font-weight: 600; color: #0A1E3F; margin-right: 15px; display: flex; align-items: center;">Tags:</span>' + tags.map(tag => `
        <a href="#" style="padding: 6px 15px; background: #f8f9fa; border: 1px solid #e2e8f0; border-radius: 50px; color: #4a5568; text-decoration: none; font-size: 0.9rem; transition: all 0.3s;" onmouseover="this.style.background='#e2e8f0'" onmouseout="this.style.background='#f8f9fa'">${tag}</a>
    `).join('');
}"""
js_content = js_content.replace(old_display_tags, new_display_tags)

# Replace displayAuthorBio
old_display_author_bio = """// Display author bio
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
}"""

new_display_author_bio = """// Display author bio
function displayAuthorBio(post) {
    const bioContainer = document.getElementById('author-bio');
    if (!bioContainer) return;
    
    const bioContent = `
        <img src="images/professional-ceo.png" alt="${post.author}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover;">
        <div style="flex: 1;">
            <h3 style="font-size: 1.5rem; color: #0A1E3F; margin: 0 0 10px 0; font-weight: 700;">${post.author}</h3>
            <p style="color: #64748b; font-size: 1.05rem; line-height: 1.6; margin: 0 0 20px 0;">${getAuthorBio(post.author)}</p>
            <a href="about.html" class="btn btn-outline" style="padding: 8px 20px; font-size: 0.9rem;">View Profile</a>
        </div>
    `;
    
    bioContainer.innerHTML = bioContent;
}"""
js_content = js_content.replace(old_display_author_bio, new_display_author_bio)

# Define new posts data to replace old blogData
new_posts_content = """<p style="font-size: 1.35rem; color: #0A1E3F; font-weight: 500; line-height: 1.6; margin-bottom: 35px;">
    In today's hyper-competitive digital landscape, adapting rapidly is the key to sustained growth. Here is a deep dive into how modern strategies drive massive success for forward-thinking brands.
</p>
<h2 style="font-size: 2rem; color: #0A1E3F; font-weight: 700; margin: 40px 0 20px 0;">1. Trust and Credibility</h2>
<p style="margin-bottom: 25px;">
    When a company presents itself in a professional, polished manner, it instantly builds trust with potential customers. People are more likely to purchase from a business that appears legitimate and established.
</p>
<blockquote style="margin: 40px 0; padding: 30px; background: #f8f9fa; border-left: 4px solid #0066FF; border-radius: 0 12px 12px 0; font-style: italic; font-size: 1.25rem; color: #0A1E3F;">
    "Your strategy is what other people say about you when you're not in the room. Make sure it speaks volumes about your quality."
</blockquote>
<h2 style="font-size: 2rem; color: #0A1E3F; font-weight: 700; margin: 40px 0 20px 0;">2. Consistency Leads to Recognition</h2>
<p style="margin-bottom: 25px;">
    Consider the most successful brands in the world. Their messaging, color palettes, and typographic choices are so consistent that you can recognize them without even seeing their name.
</p>
<h2 style="font-size: 2rem; color: #0A1E3F; font-weight: 700; margin: 40px 0 20px 0;">3. Attracting the Right Talent</h2>
<p style="margin-bottom: 25px;">
    A strong brand doesn't just attract customers; it attracts top-tier talent. People want to work for companies that have a clear mission, distinct values, and a positive reputation in the market.
</p>"""

js_content = re.sub(
    r'const blogData = \{[\s\S]*?\}\];\n\};',
    f"""const blogData = {{
    posts: [
        {{
            id: 1,
            title: 'Mastering Digital Marketing in 2026',
            excerpt: 'Discover the core strategies that are driving massive growth for top-tier brands this year.',
            content: `{new_posts_content}`,
            category: 'Marketing',
            funnel_stage: 'TOFU',
            author: 'Akinola Olujobi',
            date: '2025-10-15',
            image: '/images/blog1.jpg',
            tags: ['Marketing', 'Strategy', 'Growth', '2026'],
            readTime: '5 min read',
            views: 1247,
            comments: 23,
            cta: 'Get Your Free SEO Audit'
        }},
        {{
            id: 2,
            title: 'The Future of AI in Development',
            excerpt: 'How artificial intelligence is reshaping the way we build, test, and deploy modern web applications.',
            content: `{new_posts_content}`,
            category: 'Technology',
            funnel_stage: 'MOFU',
            author: 'Sarah Johnson',
            date: '2025-10-12',
            image: '/images/blog2.jpg',
            tags: ['AI', 'Development', 'Tech', 'Future', 'Web'],
            readTime: '8 min read',
            views: 892,
            comments: 15,
            cta: 'Consult Our Development Team'
        }},
        {{
            id: 3,
            title: 'Why Brand Identity Matters',
            excerpt: 'A deep dive into why local businesses need a premium brand presence to compete in a global market.',
            content: `{new_posts_content}`,
            category: 'Branding',
            funnel_stage: 'BOFU',
            author: 'Akinola Olujobi',
            date: '2025-10-10',
            image: '/images/blog3.jpg',
            tags: ['Branding', 'Identity', 'Strategy', 'Design'],
            readTime: '6 min read',
            views: 1567,
            comments: 31,
            cta: 'Request a Brand Audit'
        }}
    ]
}};""",
    js_content
)

with open(JS_FILE, 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Updated JS successfully!")
