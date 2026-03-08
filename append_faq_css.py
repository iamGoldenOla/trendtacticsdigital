css_content = """
/* ==========================================================================
   FAQ SECTION - MULTI-COLUMN SMALL CARDS REDESIGN
   ========================================================================== */

.faq-grid {
    display: grid !important;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)) !important;
    gap: 1.5rem !important;
    align-items: start !important;
}

.faq-item {
    background: #f8fafc !important;
    border-radius: 12px !important;
    border: 1px solid #e2e8f0 !important;
    overflow: hidden !important;
    transition: all 0.3s ease !important;
    display: flex !important;
    flex-direction: column !important;
}

.faq-question {
    padding: 1.25rem 1.5rem !important;
    font-size: 1.1rem !important;
}

.faq-answer {
    padding: 0 1.5rem !important;
}

.faq-item.active .faq-answer {
    padding: 0 1.5rem 1.5rem !important;
}
"""

with open("styles/services-premium.css", "a", encoding="utf-8") as f:
    f.write(css_content)

print("Appended FAQ CSS successfully.")
