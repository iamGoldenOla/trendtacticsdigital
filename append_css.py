css_content = """
/* ==========================================================================
   PREMIUM "WHAT WE OFFER" SIDE-BY-SIDE SECTION
   ========================================================================== */

.premium-wwo-section {
    padding: 100px 0;
    background-color: var(--soft-gray, #f8f9fa);
    position: relative;
    overflow: hidden;
}

.wwo-header {
    margin-bottom: 4rem;
}

.premium-title {
    font-size: clamp(2rem, 4vw, 3.2rem);
    color: #0A1E3F;
    font-weight: 800;
    margin-bottom: 1rem;
    position: relative;
    display: inline-block;
}

.premium-title::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: #00FFFF;
    border-radius: 2px;
}

.premium-subtitle {
    font-size: 1.15rem;
    color: rgba(10, 30, 63, 0.7);
    max-width: 600px;
    margin: 1.5rem auto 0;
    line-height: 1.6;
}

.wwo-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
}

.wwo-features-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.wwo-feature-card {
    display: flex;
    gap: 1.5rem;
    background: #ffffff;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.03);
    border-left: 4px solid transparent;
    transition: all 0.3s ease;
}

.wwo-feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
    border-left-color: #00FFFF;
}

.wwo-icon {
    flex-shrink: 0;
    width: 55px;
    height: 55px;
    background: linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(10, 30, 63, 0.05) 100%);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0A1E3F;
    font-size: 1.4rem;
}

.wwo-text h3 {
    font-size: 1.25rem;
    color: #0A1E3F;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.wwo-text p {
    color: #4a5568;
    line-height: 1.6;
    margin: 0;
    font-size: 0.95rem;
}

.wwo-image-col {
    position: relative;
    height: 100%;
}

.wwo-image-wrapper {
    position: sticky;
    top: 100px;
    border-radius: 24px;
}

.wwo-main-image {
    width: 100%;
    aspect-ratio: 4/5;
    object-fit: cover;
    border-radius: 24px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.wwo-floating-card {
    position: absolute;
    bottom: -30px;
    left: -30px;
    background: #ffffff;
    padding: 1.5rem;
    border-radius: 16px;
    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    gap: 1rem;
    z-index: 2;
    animation: float 6s ease-in-out infinite;
}

.floating-icon {
    font-size: 2rem;
    color: #00FFFF;
}

.floating-text strong {
    display: block;
    color: #0A1E3F;
    font-size: 1.1rem;
}

.floating-text span {
    color: #64748B;
    font-size: 0.85rem;
}

.wwo-cta-banner {
    background: linear-gradient(135deg, #0A1E3F 0%, #051024 100%);
    border-radius: 20px;
    padding: 3rem;
    margin-top: 4rem;
    position: relative;
    overflow: hidden;
}

.wwo-cta-banner::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 50%;
    height: 200%;
    background: radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%);
}

.wwo-cta-content h3 {
    color: #ffffff;
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 1rem;
}

.wwo-cta-content p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.1rem;
    margin-bottom: 2rem;
}

.wwo-btn {
    background: #00FFFF !important;
    color: #0A1E3F !important;
    font-weight: 700 !important;
    border: none !important;
    display: inline-block;
    padding: 15px 30px;
    font-size: 1.1rem;
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.3s ease;
}

.wwo-btn:hover {
    background: #ffffff !important;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 255, 255, 0.2) !important;
}

@keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
}

@media (max-width: 991px) {
    .wwo-grid {
        grid-template-columns: 1fr;
    }
    
    .hidden-mobile {
        display: none;
    }
    
    .wwo-floating-card {
        bottom: 20px;
        left: 20px;
    }
}
"""

with open("styles/services-premium.css", "a", encoding="utf-8") as f:
    f.write(css_content)
