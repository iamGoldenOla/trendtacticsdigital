import re

FILE_PATH = 'c:/Users/Akinola Olujobi/Documents/TrendtacticsDigitalClean/blog-post.html'

with open(FILE_PATH, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the sidebar body with the beautiful new components
sidebar_old = re.search(r'<!-- Author Bio -->[\s\S]*?(?=</aside>)', html).group(0)

sidebar_new = """<!-- Author Bio Sidebar -->
                <div class="sidebar-widget author-widget" style="background: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 5px 20px rgba(0,0,0,0.05); border: 1px solid #f1f5f9; text-align: center;">
                    <img src="images/professional-ceo.png" alt="Akinola Olujobi" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; margin-bottom: 15px; border: 3px solid #f8f9fa;">
                    <h3 style="font-size: 1.25rem; color: #0A1E3F; margin-bottom: 5px; font-weight: 700;">Akinola Olujobi</h3>
                    <span style="display: block; font-size: 0.85rem; color: #0066FF; margin-bottom: 15px; font-weight: 600;">Digital Strategist</span>
                    <p style="font-size: 0.95rem; color: #64748b; line-height: 1.6; margin-bottom: 20px;">Helping brands dominate their local and global markets with expert precision.</p>
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <a href="#" style="width: 32px; height: 32px; border-radius: 50%; background: #f1f5f9; display: flex; align-items: center; justify-content: center; color: #0A1E3F; transition: all 0.3s;"><i class="fab fa-twitter"></i></a>
                        <a href="#" style="width: 32px; height: 32px; border-radius: 50%; background: #f1f5f9; display: flex; align-items: center; justify-content: center; color: #0A1E3F; transition: all 0.3s;"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                
                <!-- Recent Posts -->
                <div class="sidebar-widget" style="background: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 5px 20px rgba(0,0,0,0.05); border: 1px solid #f1f5f9;">
                    <h3 style="font-size: 1.25rem; color: #0A1E3F; margin-bottom: 20px; font-weight: 700; border-bottom: 2px solid #00FFFF; padding-bottom: 10px; display: inline-block;">Recent Posts</h3>
                    <div style="display: flex; flex-direction: column; gap: 20px;">
                        <a href="blog-post.html" style="display: flex; gap: 15px; text-decoration: none;">
                            <img src="images/blog1.jpg" alt="Post" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
                            <div>
                                <h4 style="color: #0A1E3F; font-size: 1rem; margin: 0 0 5px 0; line-height: 1.4; transition: color 0.3s;">Mastering Digital Marketing in 2026</h4>
                                <span style="color: #94a3b8; font-size: 0.85rem;"><i class="far fa-calendar"></i> Oct 15, 2025</span>
                            </div>
                        </a>
                        <a href="blog-post.html" style="display: flex; gap: 15px; text-decoration: none;">
                            <img src="images/blog2.jpg" alt="Post" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
                            <div>
                                <h4 style="color: #0A1E3F; font-size: 1rem; margin: 0 0 5px 0; line-height: 1.4; transition: color 0.3s;">The Future of AI in Development</h4>
                                <span style="color: #94a3b8; font-size: 0.85rem;"><i class="far fa-calendar"></i> Oct 12, 2025</span>
                            </div>
                        </a>
                    </div>
                </div>
                
                <!-- Newsletter Signup -->
                <div class="sidebar-widget" style="background: linear-gradient(135deg, #0A1E3F 0%, #1a365d 100%); padding: 30px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); color: #fff; text-align: center;">
                    <h3 style="font-size: 1.25rem; margin-bottom: 15px; font-weight: 700;">Stay Updated</h3>
                    <p style="font-size: 0.95rem; margin-bottom: 20px; color: rgba(255,255,255,0.8); line-height: 1.6;">Get the latest digital marketing insights delivered to your inbox.</p>
                    <form class="newsletter-form" style="display: flex; flex-direction: column; gap: 10px;">
                        <input type="email" placeholder="Enter your email" required style="padding: 12px 15px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.1); color: #fff; width: 100%;">
                        <button type="submit" class="btn btn-primary" style="background: #00FFFF; color: #0A1E3F; font-weight: 700; padding: 12px; width: 100%; border-radius: 6px; border: none; cursor: pointer; transition: all 0.3s;">Subscribe</button>
                    </form>
                </div>
"""

html = html.replace(sidebar_old, sidebar_new)

with open(FILE_PATH, 'w', encoding='utf-8') as f:
    f.write(html)
