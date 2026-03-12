// Global Responsive Google Translate Widget
// Injected across all pages via global-translate.js

document.addEventListener('DOMContentLoaded', function () {
    // Inject the necessary CSS for the sleek floating widget
    const translateCSS = `
        /* Google Translate overriding styles */
        body { top: 0 !important; } /* Prevents Google from pushing the body down */
        .goog-te-banner-frame.skiptranslate,
        .goog-te-banner-frame {
            display: none !important;
        }
        
        /* Floating Widget Styles */
        #global-translate-container {
            position: fixed;
            bottom: 30px;
            left: 30px;
            z-index: 99999;
            display: flex;
            align-items: center;
            gap: 12px;
            font-family: 'Inter', sans-serif;
        }

        #global-translate-btn {
            background: #fadb24;
            color: #0A1E3F;
            border: 2px solid rgba(10,30,63,0.3);
            border-radius: 50%;
            width: 55px;
            height: 55px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 20px rgba(10,30,63,0.35);
            cursor: pointer;
            font-size: 1.5rem;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            outline: none;
            padding: 0;
        }

        #global-translate-btn:hover {
            transform: scale(1.08) translateY(-2px);
            box-shadow: 0 8px 30px rgba(10,30,63,0.45);
        }

        /* The hidden dropdown container */
        #global-translate-dropdown {
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            padding: 10px 15px;
            border: 1px solid #e2e8f0;
            opacity: 0;
            transform: translateY(10px) scale(0.95);
            pointer-events: none;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: absolute;
            bottom: 70px;
            left: 0;
        }

        #global-translate-container.open #global-translate-dropdown {
            opacity: 1;
            transform: translateY(0) scale(1);
            pointer-events: auto;
        }

        /* Add some spacing inside the container so Google's widget renders properly */
        #google_translate_element {
            margin-top: 5px;
            min-height: 40px;
        }

        /* Prevent Google Translate iframe from messing up layout */
        iframe.goog-te-menu-frame {
            box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important;
            border-radius: 8px !important;
            border: 1px solid #e2e8f0 !important;
        }
        
        /* Style the native select box injected by Google */
        .goog-te-combo {
            width: 100%;
            padding: 8px 12px;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
            background: #f8f9fa;
            color: #0A1E3F;
            font-family: 'Inter', sans-serif;
            font-size: 0.9rem;
            cursor: pointer;
            outline: none;
            transition: all 0.3s ease;
        }
        .goog-te-combo:focus {
            border-color: #00FFFF;
            box-shadow: 0 0 0 3px rgba(0, 255, 255, 0.2);
        }
        
        /* Hide the Google Translate branding completely */
        .goog-logo-link {
            display:none !important;
        } 
        .goog-te-gadget {
            color: transparent !important;
            font-size: 0px !important;
        }
        
        /* Mobile fixes */
        @media (max-width: 480px) {
            #global-translate-container {
                bottom: 20px;
                left: 20px;
            }
            #global-translate-btn {
                width: 50px;
                height: 50px;
                font-size: 1.3rem;
            }
        }
    `;

    // Create and append the style block
    const styleBlock = document.createElement('style');
    styleBlock.innerHTML = translateCSS;
    document.head.appendChild(styleBlock);

    // Build the DOM structure for the widget
    const widgetHTML = `
        <button id="global-translate-btn" title="Translate Website">
            <i class="fas fa-globe"></i>
        </button>
        <div id="global-translate-dropdown">
            <div style="font-size: 0.75rem; color: #64748b; margin-bottom: 5px; font-weight: 600;">Select Language:</div>
            <div id="google_translate_element"></div>
        </div>
    `;

    const container = document.createElement('div');
    container.id = 'global-translate-container';
    container.innerHTML = widgetHTML;
    document.body.appendChild(container);

    // Add toggle logic
    const toggleBtn = document.getElementById('global-translate-btn');
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent document click from firing immediately
        container.classList.toggle('open');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!container.contains(e.target) && container.classList.contains('open')) {
            container.classList.remove('open');
        }
    });

    // Load the official Google Translate Script
    window.googleTranslateElementInit = function () {
        new google.translate.TranslateElement({
            pageLanguage: 'en',
            autoDisplay: false
        }, 'google_translate_element');
    };

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);
});
