import re

with open('portfolio.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to replace everything from '<!-- Category Filters -->' to '<!-- CTA -->'
pattern = r'<!-- Category Filters -->.*?<!-- CTA -->'

replacement = '''<!-- Premium Portfolio Section -->
  <section class=\"portfolio-premium-section\" style=\"padding: 5rem 0; background: transparent;\">
    <div class=\"container\">
      
      <!-- Filters (Clean Look) -->
      <div style=\"display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 4rem;\">
        <button class=\"btn btn-primary\" style=\"border-radius: 50px; padding: 0.6rem 2rem; font-weight: 600; box-shadow: 0 4px 15px rgba(0, 255, 255, 0.2);\">All Projects</button>
        <button class=\"btn btn-outline\" style=\"border-radius: 50px; padding: 0.6rem 2rem; border-color: rgba(0,255,255,0.3); color: #fff; font-weight: 500;\">Web Design</button>
        <button class=\"btn btn-outline\" style=\"border-radius: 50px; padding: 0.6rem 2rem; border-color: rgba(0,255,255,0.3); color: #fff; font-weight: 500;\">Digital Marketing</button>
        <button class=\"btn btn-outline\" style=\"border-radius: 50px; padding: 0.6rem 2rem; border-color: rgba(0,255,255,0.3); color: #fff; font-weight: 500;\">Branding</button>
        <button class=\"btn btn-outline\" style=\"border-radius: 50px; padding: 0.6rem 2rem; border-color: rgba(0,255,255,0.3); color: #fff; font-weight: 500;\">SEO</button>
      </div>

      <!-- Portfolio Grid -->
      <div style=\"display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2.5rem;\">
        
        <!-- Item 1 -->
        <div style=\"border-radius: 20px; overflow: hidden; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 15px 35px rgba(0,0,0,0.2); transition: transform 0.3s, box-shadow 0.3s; cursor: pointer; display: flex; flex-direction: column; backdrop-filter: blur(10px);\" onmouseover=\"this.style.transform='translateY(-10px)'; this.style.boxShadow='0 20px 40px rgba(0, 255, 255, 0.15)'\" onmouseout=\"this.style.transform='translateY(0)'; this.style.boxShadow='0 15px 35px rgba(0,0,0,0.2)'\">
          <div style=\"height: 260px; overflow: hidden; position: relative;\">
            <img src=\"https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80\" alt=\"E-Commerce Redesign\" style=\"width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);\" onmouseover=\"this.style.transform='scale(1.08)'\" onmouseout=\"this.style.transform='scale(1)'\" />
            <div style=\"position: absolute; top: 1.2rem; right: 1.2rem; background: rgba(0, 255, 255, 0.9); color: #0a1e3f; padding: 0.4rem 1rem; border-radius: 30px; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.5px;\">Web Design</div>
          </div>
          <div style=\"padding: 2rem; flex-grow: 1; display: flex; flex-direction: column;\">
            <h3 style=\"font-size: 1.4rem; color: #fff; margin-bottom: 0.8rem; font-weight: 600;\">Luxuria E-Commerce</h3>
            <p style=\"color: #b0c4de; font-size: 1rem; margin-bottom: 2rem; line-height: 1.6; flex-grow: 1;\">Complete redesign and replatforming resulting in a 140% increase in mobile conversions and a stunning brand presence.</p>
            <a href=\"#\" style=\"color: #00ffff; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; font-size: 1.05rem; transition: gap 0.3s;\" onmouseover=\"this.style.gap='0.8rem'\" onmouseout=\"this.style.gap='0.5rem'\">View Case Study <i class=\"fas fa-arrow-right\"></i></a>
          </div>
        </div>

        <!-- Item 2 -->
        <div style=\"border-radius: 20px; overflow: hidden; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 15px 35px rgba(0,0,0,0.2); transition: transform 0.3s, box-shadow 0.3s; cursor: pointer; display: flex; flex-direction: column; backdrop-filter: blur(10px);\" onmouseover=\"this.style.transform='translateY(-10px)'; this.style.boxShadow='0 20px 40px rgba(0, 255, 255, 0.15)'\" onmouseout=\"this.style.transform='translateY(0)'; this.style.boxShadow='0 15px 35px rgba(0,0,0,0.2)'\">
          <div style=\"height: 260px; overflow: hidden; position: relative;\">
            <img src=\"https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80\" alt=\"SEO Growth Campaign\" style=\"width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);\" onmouseover=\"this.style.transform='scale(1.08)'\" onmouseout=\"this.style.transform='scale(1)'\" />
            <div style=\"position: absolute; top: 1.2rem; right: 1.2rem; background: rgba(0, 255, 255, 0.9); color: #0a1e3f; padding: 0.4rem 1rem; border-radius: 30px; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.5px;\">SEO & Content</div>
          </div>
          <div style=\"padding: 2rem; flex-grow: 1; display: flex; flex-direction: column;\">
            <h3 style=\"font-size: 1.4rem; color: #fff; margin-bottom: 0.8rem; font-weight: 600;\">FinTech Growth Engine</h3>
            <p style=\"color: #b0c4de; font-size: 1rem; margin-bottom: 2rem; line-height: 1.6; flex-grow: 1;\">Scaled organic traffic from 10k to 150k monthly visitors in under 8 months using data-driven content architectures.</p>
            <a href=\"#\" style=\"color: #00ffff; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; font-size: 1.05rem; transition: gap 0.3s;\" onmouseover=\"this.style.gap='0.8rem'\" onmouseout=\"this.style.gap='0.5rem'\">View Case Study <i class=\"fas fa-arrow-right\"></i></a>
          </div>
        </div>

        <!-- Item 3 -->
        <div style=\"border-radius: 20px; overflow: hidden; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 15px 35px rgba(0,0,0,0.2); transition: transform 0.3s, box-shadow 0.3s; cursor: pointer; display: flex; flex-direction: column; backdrop-filter: blur(10px);\" onmouseover=\"this.style.transform='translateY(-10px)'; this.style.boxShadow='0 20px 40px rgba(0, 255, 255, 0.15)'\" onmouseout=\"this.style.transform='translateY(0)'; this.style.boxShadow='0 15px 35px rgba(0,0,0,0.2)'\">
          <div style=\"height: 260px; overflow: hidden; position: relative;\">
            <img src=\"https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80\" alt=\"Social Media Campaign\" style=\"width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);\" onmouseover=\"this.style.transform='scale(1.08)'\" onmouseout=\"this.style.transform='scale(1)'\" />
            <div style=\"position: absolute; top: 1.2rem; right: 1.2rem; background: rgba(0, 255, 255, 0.9); color: #0a1e3f; padding: 0.4rem 1rem; border-radius: 30px; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.5px;\">Digital Marketing</div>
          </div>
          <div style=\"padding: 2rem; flex-grow: 1; display: flex; flex-direction: column;\">
            <h3 style=\"font-size: 1.4rem; color: #fff; margin-bottom: 0.8rem; font-weight: 600;\">Global SaaS Launch</h3>
            <p style=\"color: #b0c4de; font-size: 1rem; margin-bottom: 2rem; line-height: 1.6; flex-grow: 1;\">Orchestrated a cross-platform ad strategy that decreased Cost-Per-Acquisition by 45% while doubling lead volume securely.</p>
            <a href=\"#\" style=\"color: #00ffff; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; font-size: 1.05rem; transition: gap 0.3s;\" onmouseover=\"this.style.gap='0.8rem'\" onmouseout=\"this.style.gap='0.5rem'\">View Case Study <i class=\"fas fa-arrow-right\"></i></a>
          </div>
        </div>
        
        <!-- Item 4 -->
        <div style=\"border-radius: 20px; overflow: hidden; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 15px 35px rgba(0,0,0,0.2); transition: transform 0.3s, box-shadow 0.3s; cursor: pointer; display: flex; flex-direction: column; backdrop-filter: blur(10px);\" onmouseover=\"this.style.transform='translateY(-10px)'; this.style.boxShadow='0 20px 40px rgba(0, 255, 255, 0.15)'\" onmouseout=\"this.style.transform='translateY(0)'; this.style.boxShadow='0 15px 35px rgba(0,0,0,0.2)'\">
          <div style=\"height: 260px; overflow: hidden; position: relative;\">
            <img src=\"https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80\" alt=\"B2B Branding\" style=\"width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);\" onmouseover=\"this.style.transform='scale(1.08)'\" onmouseout=\"this.style.transform='scale(1)'\" />
            <div style=\"position: absolute; top: 1.2rem; right: 1.2rem; background: rgba(0, 255, 255, 0.9); color: #0a1e3f; padding: 0.4rem 1rem; border-radius: 30px; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.5px;\">Branding</div>
          </div>
          <div style=\"padding: 2rem; flex-grow: 1; display: flex; flex-direction: column;\">
            <h3 style=\"font-size: 1.4rem; color: #fff; margin-bottom: 0.8rem; font-weight: 600;\">Enterprise Identity Refresh</h3>
            <p style=\"color: #b0c4de; font-size: 1rem; margin-bottom: 2rem; line-height: 1.6; flex-grow: 1;\">Modernized the brand identity for a 20-year-old logistics firm, driving a 30% increase in brand sentiment across executives.</p>
            <a href=\"#\" style=\"color: #00ffff; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; font-size: 1.05rem; transition: gap 0.3s;\" onmouseover=\"this.style.gap='0.8rem'\" onmouseout=\"this.style.gap='0.5rem'\">View Case Study <i class=\"fas fa-arrow-right\"></i></a>
          </div>
        </div>

        <!-- Item 5 -->
        <div style=\"border-radius: 20px; overflow: hidden; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 15px 35px rgba(0,0,0,0.2); transition: transform 0.3s, box-shadow 0.3s; cursor: pointer; display: flex; flex-direction: column; backdrop-filter: blur(10px);\" onmouseover=\"this.style.transform='translateY(-10px)'; this.style.boxShadow='0 20px 40px rgba(0, 255, 255, 0.15)'\" onmouseout=\"this.style.transform='translateY(0)'; this.style.boxShadow='0 15px 35px rgba(0,0,0,0.2)'\">
          <div style=\"height: 260px; overflow: hidden; position: relative;\">
            <img src=\"https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80\" alt=\"Social Media\" style=\"width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);\" onmouseover=\"this.style.transform='scale(1.08)'\" onmouseout=\"this.style.transform='scale(1)'\" />
            <div style=\"position: absolute; top: 1.2rem; right: 1.2rem; background: rgba(0, 255, 255, 0.9); color: #0a1e3f; padding: 0.4rem 1rem; border-radius: 30px; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.5px;\">Social Media</div>
          </div>
          <div style=\"padding: 2rem; flex-grow: 1; display: flex; flex-direction: column;\">
            <h3 style=\"font-size: 1.4rem; color: #fff; margin-bottom: 0.8rem; font-weight: 600;\">Viral Apparel Campaign</h3>
            <p style=\"color: #b0c4de; font-size: 1rem; margin-bottom: 2rem; line-height: 1.6; flex-grow: 1;\">Designed a creative Instagram and TikTok strategy that generated 2M+ organic impressions in one week.</p>
            <a href=\"#\" style=\"color: #00ffff; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; font-size: 1.05rem; transition: gap 0.3s;\" onmouseover=\"this.style.gap='0.8rem'\" onmouseout=\"this.style.gap='0.5rem'\">View Case Study <i class=\"fas fa-arrow-right\"></i></a>
          </div>
        </div>

        <!-- Item 6 -->
        <div style=\"border-radius: 20px; overflow: hidden; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 15px 35px rgba(0,0,0,0.2); transition: transform 0.3s, box-shadow 0.3s; cursor: pointer; display: flex; flex-direction: column; backdrop-filter: blur(10px);\" onmouseover=\"this.style.transform='translateY(-10px)'; this.style.boxShadow='0 20px 40px rgba(0, 255, 255, 0.15)'\" onmouseout=\"this.style.transform='translateY(0)'; this.style.boxShadow='0 15px 35px rgba(0,0,0,0.2)'\">
          <div style=\"height: 260px; overflow: hidden; position: relative;\">
            <img src=\"https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80\" alt=\"Data Analytics\" style=\"width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);\" onmouseover=\"this.style.transform='scale(1.08)'\" onmouseout=\"this.style.transform='scale(1)'\" />
            <div style=\"position: absolute; top: 1.2rem; right: 1.2rem; background: rgba(0, 255, 255, 0.9); color: #0a1e3f; padding: 0.4rem 1rem; border-radius: 30px; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.5px;\">Web Design</div>
          </div>
          <div style=\"padding: 2rem; flex-grow: 1; display: flex; flex-direction: column;\">
            <h3 style=\"font-size: 1.4rem; color: #fff; margin-bottom: 0.8rem; font-weight: 600;\">B2B Analytics Dashboard</h3>
            <p style=\"color: #b0c4de; font-size: 1rem; margin-bottom: 2rem; line-height: 1.6; flex-grow: 1;\">Built an interactive front-end portal to help clients visualize data, reducing support tickets by 60%.</p>
            <a href=\"#\" style=\"color: #00ffff; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; font-size: 1.05rem; transition: gap 0.3s;\" onmouseover=\"this.style.gap='0.8rem'\" onmouseout=\"this.style.gap='0.5rem'\">View Case Study <i class=\"fas fa-arrow-right\"></i></a>
          </div>
        </div>

      </div>
      
      <!-- Load More Button -->
      <div style=\"text-align: center; margin-top: 5rem;\">
        <a href=\"#\" class=\"btn btn-primary btn-large\" style=\"border-radius: 50px; padding: 1.2rem 4rem; font-size: 1.1rem; background: linear-gradient(135deg, #0a1e3f, #00ffff); color: #fff; box-shadow: 0 8px 25px rgba(0,255,255,0.4); text-transform: uppercase; letter-spacing: 1px;\">Load More Projects</a>
      </div>

    </div>
  </section>

  <!-- CTA -->'''

new_content, count = re.subn(pattern, replacement, content, flags=re.DOTALL)

if count > 0:
    with open('portfolio.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Successfully applied premium dark-glass portfolio layout.')
else:
    print('Pattern not found in portfolio.html')
