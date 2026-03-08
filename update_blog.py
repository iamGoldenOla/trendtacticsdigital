import re

# 1. Update blog.html
with open('c:/Users/Akinola Olujobi/Documents/TrendtacticsDigitalClean/blog.html', 'r', encoding='utf-8') as f:
    blog_html = f.read()

# Fix hero image
blog_html = blog_html.replace('images/blog_parrallex.jpg', 'images/digital-marketing-parallex.jpg')

# Update Unsplash images in blog.html with local ones
blog_html = re.sub(r'https://images\.unsplash\.com/[^"]+', lambda m: 'images/blog1.jpg' if '1460925895917' in m.group(0) else ('images/blog2.jpg' if '1485827404703' in m.group(0) else 'images/blog3.jpg'), blog_html)

# Add "Read More" button to blog cards
read_more_btn = '<a href="blog-post.html" class="btn btn-outline" style="margin-top: 15px; display: inline-block;">Read More</a>'
blog_html = re.sub(r'(<div class="blog-meta-premium">)([\s\S]*?)(</div>)', r'\1\2\3\n                        ' + read_more_btn, blog_html)

# Restructure layout to include sidebar
sidebar_html = """
            <div class="blog-layout-container" style="display: flex; gap: 40px; align-items: flex-start;">
                <div class="blog-main-content" style="flex: 1; min-width: 0;">
                    <div class="blog-grid-premium" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 30px;">
"""

closure_html = """
                    </div>
                </div>
                
                <aside class="blog-sidebar-layout" style="width: 350px; flex-shrink: 0; display: flex; flex-direction: column; gap: 40px;">
                    <!-- Categories -->
                    <div class="sidebar-widget" style="background: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 5px 20px rgba(0,0,0,0.05); border: 1px solid #f1f5f9;">
                        <h3 style="font-size: 1.25rem; color: #0A1E3F; margin-bottom: 20px; font-weight: 700; border-bottom: 2px solid #00FFFF; padding-bottom: 10px; display: inline-block;">Categories</h3>
                        <ul style="list-style: none; padding: 0; margin: 0;">
                            <li style="margin-bottom: 15px; border-bottom: 1px solid #f1f5f9; padding-bottom: 15px;"><a href="#" style="color: #4a5568; text-decoration: none; display: flex; justify-content: space-between;"><span>Marketing</span> <span style="color: #00FFFF; font-weight: bold;">(12)</span></a></li>
                            <li style="margin-bottom: 15px; border-bottom: 1px solid #f1f5f9; padding-bottom: 15px;"><a href="#" style="color: #4a5568; text-decoration: none; display: flex; justify-content: space-between;"><span>Technology</span> <span style="color: #00FFFF; font-weight: bold;">(8)</span></a></li>
                            <li style="margin-bottom: 15px; border-bottom: 1px solid #f1f5f9; padding-bottom: 15px;"><a href="#" style="color: #4a5568; text-decoration: none; display: flex; justify-content: space-between;"><span>Branding</span> <span style="color: #00FFFF; font-weight: bold;">(5)</span></a></li>
                            <li style="margin-bottom: 15px; border-bottom: 1px solid #f1f5f9; padding-bottom: 15px;"><a href="#" style="color: #4a5568; text-decoration: none; display: flex; justify-content: space-between;"><span>SEO Content</span> <span style="color: #00FFFF; font-weight: bold;">(14)</span></a></li>
                            <li><a href="#" style="color: #4a5568; text-decoration: none; display: flex; justify-content: space-between;"><span>Web Design</span> <span style="color: #00FFFF; font-weight: bold;">(9)</span></a></li>
                        </ul>
                    </div>
                    
                    <!-- Recent Posts -->
                    <div class="sidebar-widget" style="background: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 5px 20px rgba(0,0,0,0.05); border: 1px solid #f1f5f9;">
                        <h3 style="font-size: 1.25rem; color: #0A1E3F; margin-bottom: 20px; font-weight: 700; border-bottom: 2px solid #00FFFF; padding-bottom: 10px; display: inline-block;">Recent Posts</h3>
                        <div style="display: flex; flex-direction: column; gap: 20px;">
                            <a href="blog-post.html" style="display: flex; gap: 15px; text-decoration: none;">
                                <img src="images/blog1.jpg" alt="Post" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
                                <div>
                                    <h4 style="color: #0A1E3F; font-size: 1rem; margin: 0 0 5px 0; line-height: 1.4;">Mastering Digital Marketing in 2026</h4>
                                    <span style="color: #94a3b8; font-size: 0.85rem;"><i class="far fa-calendar"></i> Oct 15, 2025</span>
                                </div>
                            </a>
                            <a href="blog-post.html" style="display: flex; gap: 15px; text-decoration: none;">
                                <img src="images/blog2.jpg" alt="Post" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
                                <div>
                                    <h4 style="color: #0A1E3F; font-size: 1rem; margin: 0 0 5px 0; line-height: 1.4;">The Future of AI in Development</h4>
                                    <span style="color: #94a3b8; font-size: 0.85rem;"><i class="far fa-calendar"></i> Oct 12, 2025</span>
                                </div>
                            </a>
                            <a href="blog-post.html" style="display: flex; gap: 15px; text-decoration: none;">
                                <img src="images/blog3.jpg" alt="Post" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
                                <div>
                                    <h4 style="color: #0A1E3F; font-size: 1rem; margin: 0 0 5px 0; line-height: 1.4;">Why Brand Identity Matters</h4>
                                    <span style="color: #94a3b8; font-size: 0.85rem;"><i class="far fa-calendar"></i> Oct 10, 2025</span>
                                </div>
                            </a>
                        </div>
                    </div>
                    
                    <!-- Newsletter Signup -->
                    <div class="sidebar-widget" style="background: linear-gradient(135deg, #0A1E3F 0%, #1a365d 100%); padding: 30px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); color: #fff; text-align: center;">
                        <h3 style="font-size: 1.25rem; margin-bottom: 15px; font-weight: 700;">Subscribe to Newsletter</h3>
                        <p style="font-size: 0.95rem; margin-bottom: 20px; color: rgba(255,255,255,0.8); line-height: 1.6;">Get the latest digital marketing insights delivered to your inbox.</p>
                        <form class="newsletter-form" style="display: flex; flex-direction: column; gap: 10px;">
                            <input type="email" placeholder="Enter your email" required style="padding: 12px 15px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.1); color: #fff; width: 100%;">
                            <button type="submit" class="btn btn-primary" style="background: #00FFFF; color: #0A1E3F; font-weight: 700; padding: 12px; width: 100%; border-radius: 6px; border: none; cursor: pointer;">Subscribe</button>
                        </form>
                    </div>
                </aside>
            </div>
"""

blog_html = re.sub(r'<div class="blog-grid-premium">', sidebar_html, blog_html)
blog_html = re.sub(r'(<!-- CTA Banner -->)', closure_html + r'\n            \1', blog_html)

# Add media queries for layout
media_css = """
        @media (max-width: 992px) {
            .blog-layout-container {
                flex-direction: column !important;
            }
            .blog-sidebar-layout {
                width: 100% !important;
            }
        }
    </style>
"""
blog_html = blog_html.replace('</style>', media_css, 1)

with open('c:/Users/Akinola Olujobi/Documents/TrendtacticsDigitalClean/blog.html', 'w', encoding='utf-8') as f:
    f.write(blog_html)


# 2. Update blog-post.html
with open('c:/Users/Akinola Olujobi/Documents/TrendtacticsDigitalClean/blog-post.html', 'r', encoding='utf-8') as f:
    post_html = f.read()

# Make sure image is correct inside blog-post (it uses blog1.jpg instead of unsplash, but user asks to ensure 'Why Brand Identity Matters' has an image)
# Actually, the user says "this blog post does not have an image "Why Brand Identity Matters"". 
# Perhaps they want the blog-post.html title to be "Why Brand Identity Matters" and its image to be blog3.jpg
post_html = post_html.replace('id="post-image"', 'src="images/blog3.jpg" id="post-image"')

# Add Comment Section after CTA
comment_section = """
                <!-- Comments Section -->
                <div class="post-comments-section" style="margin-top: 50px; border-top: 1px solid #e2e8f0; padding-top: 40px;">
                    <h3 style="color: #0A1E3F; font-size: 1.5rem; margin-bottom: 25px;">Comments (3)</h3>
                    
                    <div class="comment-list" style="display: flex; flex-direction: column; gap: 30px; margin-bottom: 40px;">
                        <div class="comment" style="display: flex; gap: 20px;">
                            <img src="images/professional-ceo.png" alt="User" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">
                            <div>
                                <h4 style="margin: 0 0 5px 0; color: #0A1E3F;">John Doe</h4>
                                <span style="font-size: 0.85rem; color: #64748b; margin-bottom: 10px; display: block;">Oct 16, 2025</span>
                                <p style="color: #4a5568; line-height: 1.6; margin: 0;">This is exactly what I was looking for! The insights on brand identity really resonated with our struggles as a growing startup.</p>
                            </div>
                        </div>
                        <div class="comment" style="display: flex; gap: 20px;">
                            <div style="width: 50px; height: 50px; border-radius: 50%; background: #1a365d; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">SM</div>
                            <div>
                                <h4 style="margin: 0 0 5px 0; color: #0A1E3F;">Sarah Mitchell</h4>
                                <span style="font-size: 0.85rem; color: #64748b; margin-bottom: 10px; display: block;">Oct 17, 2025</span>
                                <p style="color: #4a5568; line-height: 1.6; margin: 0;">Great read. Have you considered writing a follow-up about brand voice specifically?</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="leave-comment" style="background: #f8f9fa; padding: 30px; border-radius: 12px; border: 1px solid #e2e8f0;">
                        <h3 style="color: #0A1E3F; font-size: 1.25rem; margin-bottom: 20px;">Leave a Comment</h3>
                        <form class="comment-form" style="display: flex; flex-direction: column; gap: 15px;">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <input type="text" placeholder="Your Name" required style="padding: 12px 15px; border: 1px solid #cbd5e1; border-radius: 6px; width: 100%;">
                                <input type="email" placeholder="Your Email" required style="padding: 12px 15px; border: 1px solid #cbd5e1; border-radius: 6px; width: 100%;">
                            </div>
                            <textarea placeholder="Your Comment" rows="5" required style="padding: 12px 15px; border: 1px solid #cbd5e1; border-radius: 6px; width: 100%; resize: vertical;"></textarea>
                            <button type="submit" class="btn btn-primary" style="align-self: flex-start; margin-top: 10px;">Post Comment</button>
                        </form>
                    </div>
                </div>
"""

# Insert comment section
post_html = post_html.replace('</article>', comment_section + '\n            </article>')

# Make the blog-post.html layout responsive specifically
post_html = post_html.replace('<style>', '<style>\n        @media (max-width: 992px) { .blog-post-layout { flex-direction: column !important; } .post-sidebar { width: 100% !important; margin-left: 0 !important; margin-top: 40px !important; } }\n', 1)

# Ensure sidebar flex styling
post_html = post_html.replace('<div class="container blog-post-layout">', '<div class="container blog-post-layout" style="display: flex; gap: 40px; align-items: flex-start;">')
post_html = post_html.replace('<article class="post-content">', '<article class="post-content" style="flex: 1; min-width: 0;">')
post_html = post_html.replace('<aside class="post-sidebar">', '<aside class="post-sidebar" style="width: 350px; flex-shrink: 0; display: flex; flex-direction: column; gap: 40px;">')

# Ensure categories are there dynamically (Replacing Author Bio with Categories)
categories_sidebar = """
                <!-- Categories -->
                <div class="sidebar-widget categories-widget" style="background: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 5px 20px rgba(0,0,0,0.05); border: 1px solid #f1f5f9;">
                    <h3 style="font-size: 1.25rem; color: #0A1E3F; margin-bottom: 20px; font-weight: 700; border-bottom: 2px solid #00FFFF; padding-bottom: 10px; display: inline-block;">Categories</h3>
                    <ul style="list-style: none; padding: 0; margin: 0;">
                        <li style="margin-bottom: 15px; border-bottom: 1px solid #f1f5f9; padding-bottom: 15px;"><a href="#" style="color: #4a5568; text-decoration: none; display: flex; justify-content: space-between;"><span>Marketing</span> <span style="color: #00FFFF; font-weight: bold;">(12)</span></a></li>
                        <li style="margin-bottom: 15px; border-bottom: 1px solid #f1f5f9; padding-bottom: 15px;"><a href="#" style="color: #4a5568; text-decoration: none; display: flex; justify-content: space-between;"><span>Technology</span> <span style="color: #00FFFF; font-weight: bold;">(8)</span></a></li>
                        <li style="margin-bottom: 15px; border-bottom: 1px solid #f1f5f9; padding-bottom: 15px;"><a href="#" style="color: #4a5568; text-decoration: none; display: flex; justify-content: space-between;"><span>Branding</span> <span style="color: #00FFFF; font-weight: bold;">(5)</span></a></li>
                    </ul>
                </div>
"""
post_html = post_html.replace('<aside class="post-sidebar" style="width: 350px; flex-shrink: 0; display: flex; flex-direction: column; gap: 40px;">', '<aside class="post-sidebar" style="width: 350px; flex-shrink: 0; display: flex; flex-direction: column; gap: 40px;">\n' + categories_sidebar)

# Upgrade Newsletter Signup style
new_newsletter = """
                <!-- Newsletter Signup -->
                <div class="sidebar-widget" style="background: linear-gradient(135deg, #0A1E3F 0%, #1a365d 100%); padding: 30px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); color: #fff; text-align: center;">
                    <h3 style="font-size: 1.25rem; margin-bottom: 15px; font-weight: 700;">Stay Updated</h3>
                    <p style="font-size: 0.95rem; margin-bottom: 20px; color: rgba(255,255,255,0.8); line-height: 1.6;">Get the latest digital marketing insights delivered to your inbox.</p>
                    <form class="newsletter-form" style="display: flex; flex-direction: column; gap: 10px;">
                        <input type="email" placeholder="Enter your email" required style="padding: 12px 15px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.1); color: #fff; width: 100%;">
                        <button type="submit" class="btn btn-primary" style="background: #00FFFF; color: #0A1E3F; font-weight: 700; padding: 12px; width: 100%; border-radius: 6px; border: none; cursor: pointer;">Subscribe</button>
                    </form>
                </div>
"""
post_html = re.sub(r'<div class="newsletter-signup">.*?</div>\s*</div>', new_newsletter, post_html, flags=re.DOTALL)


with open('c:/Users/Akinola Olujobi/Documents/TrendtacticsDigitalClean/blog-post.html', 'w', encoding='utf-8') as f:
    f.write(post_html)

print("Blog pages updated successfully!")
