import os
import re

files = {
    r'c:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean\tools.html': {
        'badge_icon': 'fa-tools',
        'badge_text': 'AI-Powered Marketing Tools',
        'title': 'Marketing <span class="text-accent-navy">Tools</span>',
        'subtitle': 'Powerful, free marketing tools to analyze, audit, and grow your brand. No signup required. Get instant insights and actionable recommendations.',
        'button_link': '#tools-grid',
        'button_icon': 'fa-arrow-down',
        'button_text': 'Explore Tools',
        'image': 'images/content-creation-parallex.jpg'
    },
    r'c:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean\resources.html': {
        'badge_icon': 'fa-book',
        'badge_text': 'Knowledge Hub',
        'title': 'Growth <span class="text-accent-navy">Resources</span>',
        'subtitle': 'Empowering your business with high-value digital assets. From free ebooks and tools to advanced academy courses and expert consultations.',
        'button_link': '#hub',
        'button_icon': 'fa-arrow-down',
        'button_text': 'Browse the Hub',
        'image': 'images/resources-parallelx.jpg'
    },
    r'c:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean\quiz.html': {
        'badge_icon': 'fa-chart-line',
        'badge_text': 'Free Marketing Assessment',
        'title': 'Digital Growth <span class="text-accent-navy">Quiz</span>',
        'subtitle': 'Take our free 2-minute assessment to discover the exact strategies you need to scale your revenue.',
        'button_link': '#quiz-container',
        'button_icon': 'fa-play',
        'button_text': 'Start Assessment',
        'image': 'images/quiz-parallelx.jpg'
    },
    r'c:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean\contact.html': {
        'badge_icon': 'fa-clock',
        'badge_text': 'Available 24/7',
        'title': 'Free <span class="text-accent-navy">Consultation</span>',
        'subtitle': 'Ready to transform your digital presence? Reach out to our team of experts for a custom strategy that delivers measurable results.',
        'button_link': '#contact',
        'button_icon': 'fa-arrow-down',
        'button_text': 'Send a Message',
        'image': 'images/contact-us-parallex.jpg'
    },
    r'c:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean\services.html': {
        'modify_existing': True,
        'badge_icon': 'fa-layer-group',
        'badge_text': 'End-to-End Solutions',
        'title': 'Comprehensive Digital <br><span class="text-accent-navy">Marketing Services</span>',
        'subtitle': 'From strategy to execution, we provide end-to-end digital marketing solutions that drive real business growth. Expertly crafted strategies tailored to your unique brand goals.',
        'button_link': '#detailed-services',
        'button_icon': 'fa-arrow-down',
        'button_text': 'Explore Services',
        'button2_link': 'contact.html',
        'button2_text': 'Get Free Audit',
        'image': 'images/image9.jpg'
    }
}

template = """    <section class="about-hero-redesigned" style="background: #ffffff; padding-top: 140px; color: #0A1E3F;">
        <div class="container">
            <div class="hero-layout">
                <div class="hero-content-left">
                    <div class="trust-badge-new">
                        <i class="fas {badge_icon}"></i>
                        <span>{badge_text}</span>
                    </div>

                    <h1 class="hero-title-main">
                        {title}
                    </h1>

                    <p class="hero-description-main" style="color: #4a5568; font-size: 1.25rem;">
                        {subtitle}
                    </p>

                    <div class="hero-actions-main">
                        <a href="{button_link}" class="btn-hero-primary">
                            {button_text} <i class="fas {button_icon}"></i>
                        </a>{extra_button}
                    </div>
                </div>

                <div class="hero-visual-right">
                    <div class="visual-wrapper" style="max-height: 400px; max-width: 450px;">
                        <div class="main-image-frame" style="border: 2px solid rgba(0,255,255,0.3); box-shadow: 0 20px 50px rgba(0,255,255,0.15);">
                            <img src="{image}" alt="Hero Image" class="hero-main-img" style="object-fit:cover; height:400px; width:100%;">
                        </div>
                        <div class="visual-glow-effect"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>"""

for f, data in files.items():
    try:
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        
        extra_btn = ""
        if 'button2_link' in data:
            extra_btn = f'''
                        <a href="{data['button2_link']}" class="btn-hero-outline" style="border: 2px solid #0A1E3F; color: #0A1E3F;">
                            {data['button2_text']}
                        </a>'''
        
        new_hero = template.format(
            badge_icon=data['badge_icon'],
            badge_text=data['badge_text'],
            title=data['title'],
            subtitle=data['subtitle'],
            button_link=data['button_link'],
            button_text=data['button_text'],
            button_icon=data['button_icon'],
            extra_button=extra_btn,
            image=data['image']
        )
        
        if data.get('modify_existing', False):
            # For services.html, replace the <section class="about-hero-redesigned" ... </section>
            new_content = re.sub(r'<section class="about-hero-redesigned".*?</section>', new_hero, content, flags=re.DOTALL)
        else:
            # For others, replace the <section class="service-page-hero-clean"> ... </section>
            new_content = re.sub(r'<section class="service-page-hero-clean".*?</section>', new_hero, content, flags=re.DOTALL)
        
        if new_content != content:
            with open(f, 'w', encoding='utf-8') as file:
                file.write(new_content)
            print(f"Updated {f}")
        else:
            print(f"No changes matched in {f}")
    except Exception as e:
        print(f"Error {f}: {e}")
