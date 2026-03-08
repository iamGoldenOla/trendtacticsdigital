import re

FILE_PATH = 'c:/Users/Akinola Olujobi/Documents/TrendtacticsDigitalClean/blog-post.html'

with open(FILE_PATH, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update Hero Section to a cleaner, professional white theme version
old_hero = re.search(r'<!-- Blog Post Hero Section -->[\s\S]*?(?=<!-- Blog Post Main Content -->)', html).group(0)

new_hero = """<!-- Blog Post Hero Section -->
    <section class="page-hero blog-post-hero" style="background: #ffffff !important; border-bottom: 1px solid #f1f5f9; padding: 120px 0 60px 0;">
        <div class="container" style="max-width: 900px; margin: 0 auto; text-align: left;">
            <div class="blog-post-header">
                <div class="breadcrumb" style="font-size: 0.9rem; margin-bottom: 25px; color: #64748b; display: flex; align-items: center; gap: 10px;">
                    <a href="index.html" style="color: #0A1E3F; text-decoration: none; font-weight: 500;">Home</a>
                    <i class="fas fa-chevron-right" style="font-size: 0.7rem; color: #cbd5e1;"></i>
                    <a href="blog.html" style="color: #0A1E3F; text-decoration: none; font-weight: 500;">Blog</a>
                    <i class="fas fa-chevron-right" style="font-size: 0.7rem; color: #cbd5e1;"></i>
                    <span style="color: #0066FF; font-weight: 600;">Branding</span>
                </div>
                
                <h1 class="post-title" style="font-size: clamp(2.5rem, 4vw, 3.5rem); font-weight: 800; color: #0A1E3F; line-height: 1.2; margin-bottom: 25px; letter-spacing: -0.02em;">
                    Why Brand Identity Matters in 2026
                </h1>
                
                <div class="post-meta-premium" style="display: flex; align-items: center; gap: 30px; border-top: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9; padding: 20px 0; margin-top: 30px;">
                    <div class="author-info" style="display: flex; align-items: center; gap: 15px;">
                        <img src="images/professional-ceo.png" alt="Akinola Olujobi" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid #f1f5f9;">
                        <div>
                            <span style="display: block; font-weight: 700; color: #0A1E3F; font-size: 1rem;">Akinola Olujobi</span>
                            <span style="display: block; font-size: 0.85rem; color: #64748b;">Founder & CEO</span>
                        </div>
                    </div>
                    
                    <div style="width: 1px; height: 30px; background: #e2e8f0;"></div>
                    
                    <div class="post-stats" style="display: flex; gap: 20px; color: #64748b; font-size: 0.95rem;">
                        <span style="display: flex; align-items: center; gap: 8px;"><i class="far fa-calendar" style="color: #0066FF;"></i> Oct 10, 2025</span>
                        <span style="display: flex; align-items: center; gap: 8px;"><i class="far fa-clock" style="color: #0066FF;"></i> 6 min read</span>
                    </div>

                    <div style="margin-left: auto;">
                        <div class="social-share-mini" style="display: flex; gap: 10px;">
                            <a href="#" style="width: 35px; height: 35px; border-radius: 50%; background: #f8f9fa; display: flex; align-items: center; justify-content: center; color: #0A1E3F; transition: all 0.3s; border: 1px solid #e2e8f0;"><i class="fab fa-twitter"></i></a>
                            <a href="#" style="width: 35px; height: 35px; border-radius: 50%; background: #f8f9fa; display: flex; align-items: center; justify-content: center; color: #0A1E3F; transition: all 0.3s; border: 1px solid #e2e8f0;"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
"""
html = html.replace(old_hero, new_hero)

# 2. Update Article Content styling
old_img = '<img src="images/blog1.jpg" alt="Blog Post" src="images/blog3.jpg" id="post-image">'
new_img = '<img src="images/blog3.jpg" alt="Why Brand Identity Matters" style="width: 100%; border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.08); margin-bottom: 40px;">'
html = html.replace(old_img, new_img)

# Content Block Replacement
old_body = """<div class="post-body" id="post-body">
                    <!-- Content will be loaded here -->
                </div>"""
new_body = """<div class="post-body" style="font-size: 1.15rem; line-height: 1.8; color: #334155;">
                    <p style="font-size: 1.35rem; color: #0A1E3F; font-weight: 500; line-height: 1.6; margin-bottom: 35px;">
                        In today's hyper-competitive digital landscape, a brand is far more than just a logo or a catchy slogan. It is the comprehensive experience your customers have with your business. Here is a deep dive into why local businesses need a premium brand presence to compete in a global market.
                    </p>
                    
                    <h2 style="font-size: 2rem; color: #0A1E3F; font-weight: 700; margin: 40px 0 20px 0;">1. Trust and Credibility</h2>
                    <p style="margin-bottom: 25px;">
                        When a company presents itself in a professional, polished manner, it instantly builds trust with potential customers. People are more likely to purchase from a business that appears legitimate and established. A unified brand identity across all platforms signals reliability.
                    </p>

                    <blockquote style="margin: 40px 0; padding: 30px; background: #f8f9fa; border-left: 4px solid #0066FF; border-radius: 0 12px 12px 0; font-style: italic; font-size: 1.25rem; color: #0A1E3F;">
                        "Your brand is what other people say about you when you're not in the room. Make sure it speaks volumes about your quality."
                    </blockquote>

                    <h2 style="font-size: 2rem; color: #0A1E3F; font-weight: 700; margin: 40px 0 20px 0;">2. Consistency Leads to Recognition</h2>
                    <p style="margin-bottom: 25px;">
                        Consider the most successful brands in the world. Their messaging, color palettes, and typographic choices are so consistent that you can recognize them without even seeing their name. By establishing strict brand guidelines, you ensure that every touchpoint (social media, website, packaging) reinforces your identity in the consumer's mind.
                    </p>

                    <h2 style="font-size: 2rem; color: #0A1E3F; font-weight: 700; margin: 40px 0 20px 0;">3. Attracting the Right Talent</h2>
                    <p style="margin-bottom: 25px;">
                        A strong brand doesn’t just attract customers; it attracts top-tier talent. People want to work for companies that have a clear mission, distinct values, and a positive reputation in the market. A well-defined corporate identity makes your business a magnet for skilled professionals who can drive your company forward.
                    </p>
                </div>

                <div class="post-tags" style="display: flex; gap: 10px; margin: 40px 0; padding-top: 30px; border-top: 1px solid #f1f5f9;">
                    <span style="font-weight: 600; color: #0A1E3F; margin-right: 15px; display: flex; align-items: center;">Tags:</span>
                    <a href="#" style="padding: 6px 15px; background: #f8f9fa; border: 1px solid #e2e8f0; border-radius: 50px; color: #4a5568; text-decoration: none; font-size: 0.9rem; transition: all 0.3s;">Branding</a>
                    <a href="#" style="padding: 6px 15px; background: #f8f9fa; border: 1px solid #e2e8f0; border-radius: 50px; color: #4a5568; text-decoration: none; font-size: 0.9rem; transition: all 0.3s;">Strategy</a>
                    <a href="#" style="padding: 6px 15px; background: #f8f9fa; border: 1px solid #e2e8f0; border-radius: 50px; color: #4a5568; text-decoration: none; font-size: 0.9rem; transition: all 0.3s;">Growth</a>
                </div>

                <div class="author-bio-box" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 40px; margin: 60px 0; box-shadow: 0 10px 30px rgba(0,0,0,0.03); display: flex; gap: 30px; align-items: flex-start;">
                    <img src="images/professional-ceo.png" alt="Akinola Olujobi" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover;">
                    <div>
                        <h3 style="font-size: 1.5rem; color: #0A1E3F; margin: 0 0 10px 0; font-weight: 700;">Akinola Olujobi</h3>
                        <p style="color: #64748b; font-size: 1.05rem; line-height: 1.6; margin: 0 0 20px 0;">Digital strategist and founder of Trendtactics Digital. Passionate about helping businesses unlock their true potential through data-driven marketing and premium brand experiences.</p>
                        <a href="about.html" class="btn btn-outline" style="padding: 8px 20px; font-size: 0.9rem;">View Profile</a>
                    </div>
                </div>
"""
html = html.replace(old_body, new_body)

# Clean out old blocks that are now replaced manually
html = re.sub(r'<!-- Post Tags -->[\s\S]*?<!-- Social Sharing -->', '<!-- Social Sharing -->', html)
html = re.sub(r'<div class="social-sharing">[\s\S]*?<!-- Post Stats -->', '<!-- Post Stats -->', html)
html = re.sub(r'<div class="post-stats">[\s\S]*?<!-- CTA Section -->', '<!-- CTA Section -->', html)

with open(FILE_PATH, 'w', encoding='utf-8') as f:
    f.write(html)
