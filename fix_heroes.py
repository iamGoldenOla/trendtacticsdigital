import os
import re

files = ['portfolio.html', 'contact.html']

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    if file == 'portfolio.html':
        match = re.search(r'<section class=\"portfolio-hero.*?</section>', content, re.DOTALL)
        badge = 'Proven Results'
        title = 'Our <span class=\"text-gradient\">Portfolio</span>'
        desc = 'Explore our diverse work in digital marketing, web design, creative media, and ad campaigns. Each project reflects our commitment to innovation and results.'
        btn_href = '#portfolio-filters'
        btn_text = 'View Our Work'
        img_src = 'images/portfolio_parallele.jpg'
        img_alt = 'Portfolio Showcase'
    else:
        match = re.search(r'<section class=\"page-hero.*?</section>', content, re.DOTALL)
        badge = '24/7 Support'
        title = 'Let\'s Talk <span class=\"text-gradient\">Growth</span>'
        desc = 'Ready to transform your business? Get in touch with our team of digital experts and let\'s discuss your custom strategy.'
        btn_href = '.contact-main'
        btn_text = 'Send Message'
        img_src = 'images/contact-us-parallex.jpg'
        img_alt = 'Contact Us'

    if match:
        old_hero = match.group(0)
        
        new_hero = f'''<!-- Redesigned Hero Section -->
    <section class=\"service-page-hero-clean\">
      <div class=\"container\">
        <div class=\"service-hero-grid\">
          <div class=\"service-hero-content\">
            <div class=\"service-hero-badge\">{badge}</div>
            <h1 class=\"service-hero-title\">{title}</h1>
            <p class=\"service-hero-subtitle\">{desc}</p>
            <div class=\"service-hero-actions\">
              <a href=\"{btn_href}\" class=\"btn btn-primary btn-large\">{btn_text}</a>
            </div>
          </div>
          <div class=\"service-hero-image-wrapper\">
            <img src=\"{img_src}\" alt=\"{img_alt}\" class=\"service-hero-img\">
          </div>
        </div>
      </div>
    </section>'''
        
        content = content.replace(old_hero, new_hero)
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Replaced hero in {file}')
    else:
        print(f'Match not found in {file}')
