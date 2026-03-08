import re

FILE_PATH = 'c:/Users/Akinola Olujobi/Documents/TrendtacticsDigitalClean/services.html'

with open(FILE_PATH, 'r', encoding='utf-8') as f:
    html = f.read()

# Append CSS Overrides for Testimonials, FAQ, and CTA
new_css = """
        /* --- Testimonials, FAQ, and CTA WHITE THEME --- */
        /* Testimonials */
        .services-testimonials {
            background-color: #ffffff !important;
            background-image: none !important;
        }
        .services-testimonials::before { display: none !important; }
        .services-testimonials .section-title { color: #0A1E3F !important; }
        .services-testimonials .section-subtitle { color: #4a5568 !important; }
        .testimonial-slide {
            background: #f8f9fa !important;
            border: 1px solid #e2e8f0 !important;
            box-shadow: 0 10px 30px rgba(0,0,0,0.03) !important;
        }
        .testimonial-text { color: #334155 !important; }
        .testimonial-author h4 { color: #0A1E3F !important; }
        .testimonial-author p { color: #64748b !important; }

        /* FAQ Section */
        .services-faq {
            background-color: #f8f9fa !important; /* Slight off-white to contrast */
            border-top: 1px solid #f1f5f9;
            border-bottom: 1px solid #f1f5f9;
        }
        .services-faq .section-title { color: #0A1E3F !important; }
        .services-faq .section-subtitle { color: #4a5568 !important; }
        
        .faq-item-slim {
            background: #ffffff !important;
            border: 1px solid #e2e8f0 !important;
            box-shadow: 0 4px 15px rgba(0,0,0,0.02) !important;
        }
        .faq-q-text h3 { color: #0A1E3F !important; font-weight: 700 !important; }
        .faq-icon-slim { color: #0066FF !important; }
        .faq-a-text { border-top: 1px solid #e2e8f0 !important; }
        .faq-a-text p { color: #4a5568 !important; font-size: 1.05rem !important; }

        /* CTA Section */
        .cta-clean {
            background: #ffffff !important;
            border-top: 1px solid #f1f5f9;
        }
        .cta-clean::before, .cta-clean::after { display: none !important; }
        .cta-clean .cta-title { color: #0A1E3F !important; text-shadow: none !important; }
        .cta-clean .cta-subtitle { color: #4a5568 !important; }
"""

if "/* --- Testimonials, FAQ, and CTA WHITE THEME --- */" not in html:
    html = html.replace('</style>', new_css + '\n    </style>')

with open(FILE_PATH, 'w', encoding='utf-8') as f:
    f.write(html)
