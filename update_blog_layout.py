import re
import os

BLOG_FILE = 'c:/Users/Akinola Olujobi/Documents/TrendtacticsDigitalClean/blog.html'
BLOG_POST_FILE = 'c:/Users/Akinola Olujobi/Documents/TrendtacticsDigitalClean/blog-post.html'

# --- 1. Fix BLOG.HTML Sidebar Position ---
with open(BLOG_FILE, 'r', encoding='utf-8') as f:
    blog_html = f.read()

# I need to find the `</div>\n                </div>\n                \n                <aside class="blog-sidebar-layout"` closure in blog.html,
# and move the LAST `</div>` after the aside.
sidebar_start = blog_html.find('<aside class="blog-sidebar-layout"')
if sidebar_start != -1:
    # Before the aside, there is:
    #             </div> <!-- closes blog-grid-premium -->
    #                     </div>
    #                 </div>
    # We want:
    #             </div> <!-- closes blog-grid-premium -->
    #                 </div> <!-- closes blog-main-content -->
    #                 <aside ...
    #             </div> <!-- closes blog-layout-container -->
    
    # Let's replace the snippet specifically
    search_str = """
            </div>

            
                    </div>
                </div>
                
                <aside class="blog-sidebar-layout\""""
    # Wait, my previous replacement inserted:
    # """
    #                 </div>
    #             </div>
    #             
    #             <aside class="blog-sidebar-layout\""""
    
    # Just replace all the nested div closings around aside in blog.html
    # Look for the end of the post loop
    # It ends with `<a href="blog-post.html" class="btn btn-outline" style="margin-top: 15px; display: inline-block;">Read More</a></div></div>`
    # Then `</div>` for blog-grid-premium
    # We need to restructure the DOM closure securely.
    
    # Let's just fix the end of blog-grid-premium explicitly:
    blog_html = re.sub(
        r'(</div>\s+</div>\s+</div>\s+)(</div>\s+</div>\s+)(<aside class="blog-sidebar-layout")',
        r'\1\n                </div>\n                \3',
        blog_html
    )
    # The above regex might be fragile. Let's do a more explicit replace:
    
    bad_structure = """
            </div>

            
                    </div>
                </div>
                
                <aside class="blog-sidebar-layout" style="width: 350px; flex-shrink: 0; display: flex; flex-direction: column; gap: 40px;">"""
    
    good_structure = """
            </div>

                </div>
                
                <aside class="blog-sidebar-layout" style="width: 350px; flex-shrink: 0; display: flex; flex-direction: column; gap: 40px;">"""
    
    if bad_structure in blog_html:
        blog_html = blog_html.replace(bad_structure, good_structure)
        
    # And at the end of the aside, we have to close `.blog-layout-container`
    aside_end = """                        </form>
                    </div>
                </aside>
            </div>"""
    
    # Look for <!-- CTA Banner -->
    cta_banner = """                </aside>
            </div>

            <!-- CTA Banner -->"""
    
    if cta_banner not in blog_html:
        blog_html = blog_html.replace("""                </aside>
            </div>""", """                </aside>
            </div>

            <!-- CTA Banner -->""")

# Ensure we rewrite blog_html properly
with open(BLOG_FILE, 'w', encoding='utf-8') as f:
    f.write(blog_html)

# --- 2. Fix BLOG-POST.HTML Background ---
with open(BLOG_POST_FILE, 'r', encoding='utf-8') as f:
    post_html = f.read()

white_theme_styles = """
    <style>
        /* White Theme Overrides */
        body, main {
            background-color: #ffffff !important;
            color: #0A1E3F !important;
        }
        .blog-post-hero {
            background-color: #f8f9fa !important;
            background-image: none !important;
            color: #0A1E3F !important;
            border-bottom: 1px solid #e2e8f0;
            padding-top: 120px !important;
        }
        #post-title-breadcrumb, #post-category, #post-date, #post-read-time, .breadcrumb a, .breadcrumb {
            color: #4a5568 !important;
        }
        .post-title {
            color: #0A1E3F !important;
        }
        .post-excerpt {
            color: #4a5568 !important;
        }
        .author-name, .author-title {
            color: #0A1E3F !important;
        }
        .blog-post-cta {
            background: linear-gradient(135deg, #0A1E3F 0%, #1a365d 100%) !important;
            color: #ffffff !important;
        }
        .blog-post-cta .cta-title, .blog-post-cta .cta-subtitle {
            color: #ffffff !important;
        }
        .post-body p, .post-body span, .post-body div {
            color: #1e293b !important;
        }
        .post-body h1, .post-body h2, .post-body h3, .post-body h4 {
            color: #0A1E3F !important;
        }
    </style>
"""

if "/* White Theme Overrides */" not in post_html:
    post_html = post_html.replace('</head>', white_theme_styles + '</head>')

# Ensure sidebar flex logic correctly wrapped if it was broken
with open(BLOG_POST_FILE, 'w', encoding='utf-8') as f:
    f.write(post_html)

print("Applied fixes via python script.")
