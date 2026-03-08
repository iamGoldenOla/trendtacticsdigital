import os
import re

DIR_PATH = r'c:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean'

def fix_tools():
    path = os.path.join(DIR_PATH, 'tools.html')
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Target CTA heading that needs visibility
    content = content.replace('<h2 class="cta-title" style="color: #0A1E3F !important;">Need More Advanced Tools?</h2>',
                               '<h2 class="cta-title" style="background: none !important; -webkit-text-fill-color: #0A1E3F !important; color: #0A1E3F !important; font-weight: 800; text-shadow: none !important; z-index: 10; position: relative;">Need More Advanced Tools?</h2>')
    
    # Fix 'View Services' button to look like 'Get Free Consultation'
    content = content.replace('<a href="services.html" class="btn btn-outline btn-large">View Services</a>',
                              '<a href="services.html" class="btn btn-primary btn-large" style="background: #0A1E3F !important; color: #fadb24 !important; border: none !important; font-weight: 700 !important; box-shadow: none !important;">View Services</a>')
    
    # Also standardize the Get Free Consultation button
    content = content.replace('<a href="contact.html" class="btn btn-primary btn-large">Get Free Consultation</a>',
                              '<a href="contact.html" class="btn btn-primary btn-large" style="background: #0A1E3F !important; color: #fadb24 !important; border: none !important; font-weight: 700 !important; box-shadow: none !important;">Get Free Consultation</a>')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def fix_blog():
    path = os.path.join(DIR_PATH, 'blog.html')
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # The badge might just say 'Blog' and not show. We can add a style to make it prominent
    # There is likely a .blog-hero or .hero-badge or similar that's not showing
    # Looking for: "The Trendtactics Blog" or just "BLOG"
    content = content.replace('The Trendtactics <span class="text-accent-navy">Blog</span>',
                              'The Trendtactics <span class="text-accent-navy" style="color: #0A1E3F !important; visibility: visible !important; opacity: 1 !important;">Blog</span>')
                              
    # Fix the badge 'Insights & Strategies' if it exists
    content = content.replace('<div class="trust-badge-new">', '<div class="trust-badge-new" style="background: rgba(10,30,63,0.1) !important; color: #0A1E3F !important; border-color: rgba(10,30,63,0.2) !important;">')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def fix_portfolio():
    path = os.path.join(DIR_PATH, 'portfolio.html')
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # 1. Add "Excellence" to "A Portfolio of Excellence" if missing text-fill
    content = content.replace('<h1 class="service-hero-title">A Portfolio of <span class="text-gradient">Excellence</span></h1>',
                              '<h1 class="service-hero-title">A Portfolio of <span class="text-gradient" style="background: none !important; -webkit-text-fill-color: #0A1E3F !important; color: #0A1E3F !important;">Excellence</span></h1>')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def fix_contact():
    path = os.path.join(DIR_PATH, 'contact.html')
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Reduce spacing below hero - the About hero padding/margin
    # We can add negative margin or reduce padding to #contact section
    content = content.replace('<section id="contact" style="background: #ffffff;">',
                              '<section id="contact" style="background: #ffffff; padding-top: 2rem !important; margin-top: -3rem;">')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def fix_quiz():
    path = os.path.join(DIR_PATH, 'quiz.html')
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # The quiz wrapper has its own parallax strip currently overlaying Growth Quiz Background
    # We want to add the parallax strictly around #start-screen or #quiz-container
    
    # We see:
    # <div id="start-screen">
    # We will inject a wrapper with the parallax background for the quiz-card specifically
    
    content = content.replace('<div class="quiz-card" style="position: relative; z-index: 2;">',
                              '<div class="quiz-card" style="position: relative; z-index: 2; background-image: url(\'images/quiz-parallelx.jpg\'); background-attachment: fixed; background-size: cover; background-position: center; padding: 40px; border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">\n'
                              '<div style="position: absolute; top:0; left:0; width:100%; height:100%; background: rgba(255,255,255,0.92); border-radius: 20px; z-index:0;"></div>\n'
                              '<div style="position: relative; z-index:1;">')
                              
    content = content.replace('</div>\n      <div id="result-screen"', '</div></div>\n      <div id="result-screen"')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)


print("Starting cosmetic fixes...")
fix_tools()
fix_blog()
fix_portfolio()
fix_contact()
fix_quiz()
print("Fixes applied successfully.")
