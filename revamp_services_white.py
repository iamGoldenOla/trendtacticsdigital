import re

FILE_PATH = 'c:/Users/Akinola Olujobi/Documents/TrendtacticsDigitalClean/services.html'

with open(FILE_PATH, 'r', encoding='utf-8') as f:
    html = f.read()

# Add White Theme Overrides directly to the style section
new_css = """
        /* --- WHITE THEME PREMIUM OVERRIDES --- */
        body, main {
            background-color: #ffffff !important;
            color: #0A1E3F !important;
        }

        /* Stats Showcase Container */
        .services-stats-showcase {
            background: #ffffff !important;
            background-image: none !important;
            border-bottom: 1px solid #f1f5f9;
        }
        .services-stats-showcase::before { display: none !important; }
        
        .stat-item {
            background: #f8f9fa !important;
            border: 1px solid #e2e8f0 !important;
            box-shadow: 0 5px 15px rgba(0,0,0,0.02) !important;
        }
        .stat-item:hover {
            background: #ffffff !important;
            border-color: #00FFFF !important;
            box-shadow: 0 15px 35px rgba(0,0,0,0.05) !important;
        }
        .stat-number { color: #0A1E3F !important; }
        .stat-label { color: #64748b !important; font-weight: 600 !important; }
        
        /* Service Icon Showcase */
        .showcase-title { color: #0A1E3F !important; text-shadow: none !important; }
        .service-icon-item {
            background: #ffffff !important;
            border: 1px solid #e2e8f0 !important;
            box-shadow: 0 5px 15px rgba(0,0,0,0.03) !important;
        }
        .service-icon-item span { color: #4a5568 !important; }
        .service-icon-item i { color: #0066FF !important; }
        .service-icon-item:hover, .service-icon-item.active {
            background: #f8f9fa !important;
            border-color: #0066FF !important;
            box-shadow: 0 15px 35px rgba(0,0,0,0.08) !important;
        }
        .service-icon-item:hover span, .service-icon-item.active span { color: #0A1E3F !important; }
        .service-description {
            background: #ffffff !important;
            border: 1px solid #e2e8f0 !important;
            box-shadow: 0 10px 30px rgba(0,0,0,0.03) !important;
        }
        .service-description p { color: #334155 !important; }
        
        /* Sub Services */
        .connector-circle { background: #ffffff !important; }
        .sub-service-card {
            background: #ffffff !important;
            border: 1px solid #e2e8f0 !important;
            box-shadow: 0 5px 15px rgba(0,0,0,0.02) !important;
        }
        .sub-service-card::before { display: none !important; }
        .sub-service-card span { color: #4a5568 !important; }
        .sub-service-card:hover {
            background: #f8f9fa !important;
            border-color: #0066FF !important;
            transform: translateY(-5px) !important;
            box-shadow: 0 15px 35px rgba(0,0,0,0.06) !important;
        }
        .sub-service-card:hover i { color: #0066FF !important; }
        .sub-service-card:hover span { color: #0A1E3F !important; }

        /* Overview Parallax Section */
        .services-overview {
            background: #f8f9fa !important;
        }
        .parallax-categories img {
            opacity: 0.08 !important;
            filter: grayscale(100%) !important;
        }
        .section-title { color: #0A1E3F !important; }
        .section-subtitle { color: #4a5568 !important; }
        .category-card {
            background: #ffffff !important;
            border: 1px solid #e2e8f0 !important;
            box-shadow: 0 10px 30px rgba(0,0,0,0.04) !important;
        }
        .category-card:hover {
            border-color: #0066FF !important;
            box-shadow: 0 20px 40px rgba(0,0,0,0.08) !important;
            transform: translateY(-10px) !important;
        }
        .category-card h3 { color: #0A1E3F !important; text-align: left; margin-top: 15px; }
        .category-card p { color: #64748b !important; text-align: left; }
        .category-link { color: #0066FF !important; font-weight: 700; }
        
        /* ZigZag Section */
        .detailed-services { background: #ffffff !important; }
        .zigzag-section { background: #ffffff !important; }
        .zigzag-content .section-title { color: #0A1E3F !important; }
        .zigzag-content .section-subtitle { color: #4a5568 !important; }
        .step-text h3 { color: #0A1E3F !important; font-weight: 700 !important; }
        .step-text p { color: #4a5568 !important; font-size: 1.1rem !important; line-height: 1.6; }
        
        /* Remove lingering dark overlays */
        .bg-overlay-dark { display: none !important; }
        .content-block-bg-image img.image-filter-darken { opacity: 0.1 !important; filter: grayscale(100%) brightness(1.5) !important; }

        /* Ensure link visibility */
        .category-link { background: none; color: #0066FF; padding: 0; font-weight: 700; transition: color 0.3s; }
        .category-link:hover { color: #0044cc; text-decoration: underline; }
"""

if "/* --- WHITE THEME PREMIUM OVERRIDES --- */" not in html:
    html = html.replace('</style>', new_css + '\n    </style>')

with open(FILE_PATH, 'w', encoding='utf-8') as f:
    f.write(html)
