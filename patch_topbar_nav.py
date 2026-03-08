import os
import re

DIR_PATH = r'c:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean'

JS_PATH = os.path.join(DIR_PATH, 'js', 'main.js')

# 1. FIX JS DROPDOWN
with open(JS_PATH, 'r', encoding='utf-8') as f:
    js_content = f.read()

old_js = """                // Toggle dropdown on click (for mobile)
                dropdownLink.addEventListener('click', function (e) {
                    // Always prevent default for dropdown toggle links
                    if (dropdownLink.classList.contains('dropdown-toggle')) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // On mobile, toggle the dropdown
                        if (window.innerWidth <= 768) {
                            const isActive = item.classList.contains('active');

                            // Close other dropdowns first
                            dropdownItems.forEach(otherItem => {
                                if (otherItem !== item) {
                                    otherItem.classList.remove('active');
                                }
                            });

                            // Toggle current dropdown
                            item.classList.toggle('active');
                        }
                        // On desktop, let the hover handle it but still prevent default
                        return;
                    }
                });"""

new_js = """                // Toggle dropdown on click (for mobile)
                dropdownLink.addEventListener('click', function (e) {
                    if (dropdownLink.classList.contains('dropdown-toggle')) {
                        if (window.innerWidth <= 992) {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            const isActive = item.classList.contains('active');

                            // Close other dropdowns first
                            dropdownItems.forEach(otherItem => {
                                if (otherItem !== item) {
                                    otherItem.classList.remove('active');
                                }
                            });

                            // Toggle current dropdown
                            item.classList.toggle('active');
                        }
                        // On desktop > 992px, do nothing here so browser naturally follows the href.
                        return;
                    }
                });"""

if old_js in js_content:
    js_content = js_content.replace(old_js, new_js)
    with open(JS_PATH, 'w', encoding='utf-8') as f:
        f.write(js_content)
    print("Patched main.js successfully.")
else:
    print("main.js already patched or snippet not found!")


TOP_BAR_CSS = """
    <style>
        .top-bar-redesigned {
            background-color: #061226;
            color: #cbd5e1;
            padding: 8px 0;
            font-size: 0.85rem;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            position: relative;
            z-index: 1000;
        }
        .top-bar-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 5%;
        }
        .top-bar-left .social-icons-top a {
            color: #cbd5e1;
            margin-right: 12px;
            transition: color 0.3s ease;
        }
        .top-bar-left .social-icons-top a:hover {
            color: #00FFFF;
        }
        .top-bar-center {
            display: flex;
            align-items: center;
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            flex-grow: 1;
            justify-content: center;
            padding: 0 20px;
        }
        .typewriter-text {
            border-right: 2px solid #00FFFF;
            padding-right: 4px;
            animation: blinkCursor 0.75s step-end infinite;
        }
        @keyframes blinkCursor {
            from, to { border-color: transparent }
            50% { border-color: #00FFFF; }
        }
        .top-bar-right {
            display: flex;
            align-items: center;
        }
        /* Make translate widget small */
        #google_translate_element_top .goog-te-gadget {
            font-size: 0px !important;
            color: transparent;
        }
        #google_translate_element_top .goog-te-gadget .goog-te-combo {
            background-color: transparent;
            color: #cbd5e1;
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 4px;
            padding: 2px 5px;
            font-size: 0.8rem;
            outline: none;
        }
        
        @media (max-width: 768px) {
            .top-bar-container {
                flex-direction: column;
                gap: 8px;
                text-align: center;
            }
            .top-bar-center {
                max-width: 100%;
            }
        }
    </style>
"""

TOP_BAR_HTML = """
    <!-- Top Bar -->
    <div class="top-bar-redesigned">
        <div class="top-bar-container">
            <div class="top-bar-left">
                <div class="social-icons-top">
                    <a href="https://facebook.com/trendtactics" target="_blank"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://instagram.com/trendtactics" target="_blank"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
            <div class="top-bar-center">
                <i class="fas fa-bullhorn text-accent-cyan" style="color: #00FFFF; margin-right: 8px;"></i>
                <span id="typewriter-text" class="typewriter-text">Welcome to Trendtactics Digital</span>
            </div>
            <div class="top-bar-right">
                <div id="google_translate_element_top"></div>
            </div>
        </div>
    </div>
"""

TOP_BAR_JS = """
<script type="text/javascript">
function googleTranslateElementInitTop() {
  new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element_top');
}
</script>
<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInitTop"></script>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const phrases = [
            "Welcome to Trendtactics Digital",
            "Read our latest blog: The Future of AI",
            "Next Event: Digital Growth Webinar - Oct 25",
            "Scale your revenue with our experts",
            "" 
        ];
        let i = 0;
        let j = 0;
        let currentPhrase = [];
        let isDeleting = false;
        let isEnd = false;
        
        const typeWriterElement = document.getElementById('typewriter-text');
        
        function loop() {
            if (!typeWriterElement) return;
            
            // Add live time to the last phrase dynamically
            phrases[4] = "Current Local Time: " + new Date().toLocaleTimeString();
            
            isEnd = false;
            typeWriterElement.innerHTML = currentPhrase.join('');
            
            if (i < phrases.length) {
                if (!isDeleting && j <= phrases[i].length) {
                    currentPhrase.push(phrases[i][j]);
                    j++;
                    typeWriterElement.innerHTML = currentPhrase.join('');
                }
                
                if (isDeleting && j <= phrases[i].length) {
                    currentPhrase.pop();
                    j--;
                    typeWriterElement.innerHTML = currentPhrase.join('');
                }
                
                if (j == phrases[i].length) {
                    isEnd = true;
                    isDeleting = true;
                }
                
                if (isDeleting && j === 0) {
                    currentPhrase = [];
                    isDeleting = false;
                    i++;
                    if (i === phrases.length) {
                        i = 0;
                    }
                }
            }
            
            const speeding = Math.random() * (50 - 30) + 30;
            const normal = Math.random() * (100 - 50) + 50;
            const time = isEnd ? 2000 : isDeleting ? speeding : normal;
            
            setTimeout(loop, time);
        }
        
        if (typeWriterElement) {
            loop();
        }
    });
</script>
"""

# Iterate through all HTML files
import glob

html_files = glob.glob(os.path.join(DIR_PATH, '*.html'))
for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Double check so we don't inject multiple times
    if "top-bar-redesigned" not in content:
        # 1. Inject CSS
        content = content.replace('</head>', TOP_BAR_CSS + '</head>')
        
        # 2. Inject HTML
        content = content.replace('<nav id="navigation" class="navbar">', TOP_BAR_HTML + '<nav id="navigation" class="navbar">')
        
        # 3. Inject JS
        content = content.replace('</body>', TOP_BAR_JS + '</body>')

    # 4. Fix logo disappearing bug by enforcing opacity
    target_logo = '<img src="images/Trendtactics_digital_logo.png" alt="Trendtactics Digital"\n                        style="height: 48px; width: auto;">'
    replacement_logo = '<img src="images/Trendtactics_digital_logo.png" alt="Trendtactics Digital"\n                        style="height: 48px; width: auto; opacity: 1 !important; visibility: visible !important; display: block !important;">'
    
    # Also support single line version just in case
    target_logo2 = '<img src="images/Trendtactics_digital_logo.png" alt="Trendtactics Digital" style="height: 48px; width: auto;">'
    replacement_logo2 = '<img src="images/Trendtactics_digital_logo.png" alt="Trendtactics Digital" style="height: 48px; width: auto; opacity: 1 !important; visibility: visible !important; display: block !important;">'
    
    content = content.replace(target_logo, replacement_logo)
    content = content.replace(target_logo2, replacement_logo2)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("HTML global patching successful.")
