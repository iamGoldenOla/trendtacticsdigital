import re
import os

BLOG_FILE = 'c:/Users/Akinola Olujobi/Documents/TrendtacticsDigitalClean/blog.html'
BLOG_POST_FILE = 'c:/Users/Akinola Olujobi/Documents/TrendtacticsDigitalClean/blog-post.html'
JS_FILE = 'c:/Users/Akinola Olujobi/Documents/TrendtacticsDigitalClean/js/blog-post.js'

# --- 1. Modify blog.html ---
with open(BLOG_FILE, 'r', encoding='utf-8') as f:
    blog_html = f.read()

# Replace static links with ID param links for the three main cards
blog_html = blog_html.replace(
    '<h3>Mastering Digital Marketing in 2026</h3>\n                        <p>Discover the core strategies that are driving massive growth for top-tier brands this year.\n                        </p>\n                        <div class="blog-meta-premium">\n                            <span><i class="far fa-calendar"></i> Oct 15, 2025</span>\n                            <span><i class="far fa-clock"></i> 5 min read</span>\n                        </div>\n                        <a href="blog-post.html"',
    '<h3>Mastering Digital Marketing in 2026</h3>\n                        <p>Discover the core strategies that are driving massive growth for top-tier brands this year.\n                        </p>\n                        <div class="blog-meta-premium">\n                            <span><i class="far fa-calendar"></i> Oct 15, 2025</span>\n                            <span><i class="far fa-clock"></i> 5 min read</span>\n                        </div>\n                        <a href="blog-post.html?id=1"'
)

blog_html = blog_html.replace(
    '<h3>The Future of AI in Development</h3>\n                        <p>How artificial intelligence is reshaping the way we build, test, and deploy modern web\n                            applications.</p>\n                        <div class="blog-meta-premium">\n                            <span><i class="far fa-calendar"></i> Oct 12, 2025</span>\n                            <span><i class="far fa-clock"></i> 8 min read</span>\n                        </div>\n                        <a href="blog-post.html"',
    '<h3>The Future of AI in Development</h3>\n                        <p>How artificial intelligence is reshaping the way we build, test, and deploy modern web\n                            applications.</p>\n                        <div class="blog-meta-premium">\n                            <span><i class="far fa-calendar"></i> Oct 12, 2025</span>\n                            <span><i class="far fa-clock"></i> 8 min read</span>\n                        </div>\n                        <a href="blog-post.html?id=2"'
)

blog_html = blog_html.replace(
    '<h3>Why Brand Identity Matters</h3>\n                        <p>A deep dive into why local businesses need a premium brand presence to compete in a global\n                            market.</p>\n                        <div class="blog-meta-premium">\n                            <span><i class="far fa-calendar"></i> Oct 10, 2025</span>\n                            <span><i class="far fa-clock"></i> 6 min read</span>\n                        </div>\n                        <a href="blog-post.html"',
    '<h3>Why Brand Identity Matters</h3>\n                        <p>A deep dive into why local businesses need a premium brand presence to compete in a global\n                            market.</p>\n                        <div class="blog-meta-premium">\n                            <span><i class="far fa-calendar"></i> Oct 10, 2025</span>\n                            <span><i class="far fa-clock"></i> 6 min read</span>\n                        </div>\n                        <a href="blog-post.html?id=3"'
)

# Replace Recent Posts sidebar in blog.html
blog_html = blog_html.replace('<a href="blog-post.html" style="display: flex; gap: 15px; text-decoration: none;">\n                                <img src="images/blog1.jpg" alt="Post" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">\n                                <div>\n                                    <h4 style="color: #0A1E3F; font-size: 1rem; margin: 0 0 5px 0; line-height: 1.4;">Mastering Digital Marketing in 2026</h4>', '<a href="blog-post.html?id=1" style="display: flex; gap: 15px; text-decoration: none;">\n                                <img src="images/blog1.jpg" alt="Post" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">\n                                <div>\n                                    <h4 style="color: #0A1E3F; font-size: 1rem; margin: 0 0 5px 0; line-height: 1.4;">Mastering Digital Marketing in 2026</h4>')

blog_html = blog_html.replace('<a href="blog-post.html" style="display: flex; gap: 15px; text-decoration: none;">\n                                <img src="images/blog2.jpg" alt="Post" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">\n                                <div>\n                                    <h4 style="color: #0A1E3F; font-size: 1rem; margin: 0 0 5px 0; line-height: 1.4;">The Future of AI in Development</h4>', '<a href="blog-post.html?id=2" style="display: flex; gap: 15px; text-decoration: none;">\n                                <img src="images/blog2.jpg" alt="Post" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">\n                                <div>\n                                    <h4 style="color: #0A1E3F; font-size: 1rem; margin: 0 0 5px 0; line-height: 1.4;">The Future of AI in Development</h4>')

blog_html = blog_html.replace('<a href="blog-post.html" style="display: flex; gap: 15px; text-decoration: none;">\n                                <img src="images/blog3.jpg" alt="Post" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">\n                                <div>\n                                    <h4 style="color: #0A1E3F; font-size: 1rem; margin: 0 0 5px 0; line-height: 1.4;">Why Brand Identity Matters</h4>', '<a href="blog-post.html?id=3" style="display: flex; gap: 15px; text-decoration: none;">\n                                <img src="images/blog3.jpg" alt="Post" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">\n                                <div>\n                                    <h4 style="color: #0A1E3F; font-size: 1rem; margin: 0 0 5px 0; line-height: 1.4;">Why Brand Identity Matters</h4>')

with open(BLOG_FILE, 'w', encoding='utf-8') as f:
    f.write(blog_html)

# --- 2. Modify blog-post.html ---
with open(BLOG_POST_FILE, 'r', encoding='utf-8') as f:
    post_html = f.read()

# Add IDs back to elements so JS can inject content
post_html = post_html.replace('<span style="color: #0066FF; font-weight: 600;">Branding</span>', '<span id="post-category" style="color: #0066FF; font-weight: 600;">Branding</span>')
post_html = post_html.replace('<h1 class="post-title" style="', '<h1 class="post-title" id="post-title" style="')
post_html = post_html.replace('<span style="display: block; font-weight: 700; color: #0A1E3F; font-size: 1rem;">Akinola Olujobi</span>', '<span id="author-name" style="display: block; font-weight: 700; color: #0A1E3F; font-size: 1rem;">Akinola Olujobi</span>')
post_html = post_html.replace('<span style="display: block; font-size: 0.85rem; color: #64748b;">Founder & CEO</span>', '<span id="author-title" style="display: block; font-size: 0.85rem; color: #64748b;">Founder & CEO</span>')

# Fix date and time IDs
post_html = post_html.replace('<span style="display: flex; align-items: center; gap: 8px;"><i class="far fa-calendar" style="color: #0066FF;"></i> Oct 10, 2025</span>', '<span style="display: flex; align-items: center; gap: 8px;"><i class="far fa-calendar" style="color: #0066FF;"></i> <span id="post-date">Oct 10, 2025</span></span>')
post_html = post_html.replace('<span style="display: flex; align-items: center; gap: 8px;"><i class="far fa-clock" style="color: #0066FF;"></i> 6 min read</span>', '<span style="display: flex; align-items: center; gap: 8px;"><i class="far fa-clock" style="color: #0066FF;"></i> <span id="post-read-time">6 min read</span></span>')

post_html = post_html.replace('<img src="images/blog3.jpg"', '<img id="post-image" src="images/blog3.jpg"')
post_html = post_html.replace('<div class="post-body" style="', '<div id="post-body" class="post-body" style="')
post_html = post_html.replace('<div class="post-tags" style="', '<div id="post-tags" class="post-tags" style="')
post_html = post_html.replace('<div class="author-bio-box" style="', '<div id="author-bio" class="author-bio-box" style="')

# Sidebar Recent Posts ID links
post_html = post_html.replace('<a href="blog-post.html" style="display: flex; gap: 15px; text-decoration: none;">\n                            <img src="images/blog1.jpg" alt="Post" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">\n                            <div>\n                                <h4 style="color: #0A1E3F; font-size: 1rem; margin: 0 0 5px 0; line-height: 1.4; transition: color 0.3s;">Mastering Digital Marketing in 2026</h4>', '<a href="blog-post.html?id=1" style="display: flex; gap: 15px; text-decoration: none;">\n                            <img src="images/blog1.jpg" alt="Post" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">\n                            <div>\n                                <h4 style="color: #0A1E3F; font-size: 1rem; margin: 0 0 5px 0; line-height: 1.4; transition: color 0.3s;">Mastering Digital Marketing in 2026</h4>')
post_html = post_html.replace('<a href="blog-post.html" style="display: flex; gap: 15px; text-decoration: none;">\n                            <img src="images/blog2.jpg" alt="Post" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">\n                            <div>\n                                <h4 style="color: #0A1E3F; font-size: 1rem; margin: 0 0 5px 0; line-height: 1.4; transition: color 0.3s;">The Future of AI in Development</h4>', '<a href="blog-post.html?id=2" style="display: flex; gap: 15px; text-decoration: none;">\n                            <img src="images/blog2.jpg" alt="Post" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">\n                            <div>\n                                <h4 style="color: #0A1E3F; font-size: 1rem; margin: 0 0 5px 0; line-height: 1.4; transition: color 0.3s;">The Future of AI in Development</h4>')


with open(BLOG_POST_FILE, 'w', encoding='utf-8') as f:
    f.write(post_html)

print("Linked URLs and restored dynamic IDs in blog-post.html.")
