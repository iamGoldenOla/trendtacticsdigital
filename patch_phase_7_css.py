import os

def patch_main_css():
    css_path = 'styles/main.css'
    with open(css_path, "r", encoding="utf-8") as f:
        content = f.read()

    # We need to target the .navbar layout. 
    # Current behavior: .navbar { position: fixed; top: 0; }
    # Fix: We need the navbar to sit BELOW the top bar (which is approx ~40px on desktop)
    # The top bar is absolutely positioned by default from patch_phase_6_fixes.py, so we will handle the stacking.
    
    # 1. Update the `.navbar` definition to be pushed down.
    # The Top Bar is 40px tall. So padding/top for the main nav needs to shift.
    
    new_css = """
/* ===== TOP BAR RESPONSIVENESS (PHASE 7 FIXES) ===== */
.top-bar-redesigned {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    z-index: 99999 !important; /* Force above EVERYTHING */
    background-color: #0A1E3F !important;
    min-height: 40px;
    padding: 0;
}

.top-bar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 5px 20px;
    width: 100%;
}

/* Adjust Main Navigation to sit below Top Bar */
.navbar {
    top: 40px !important; /* Push down exactly by Top Bar height */
}

/* Push down content exactly by the height of BOTH bars (40px + 70px = 110px) */
.hero,
.hero-content-centered,
.page-hero {
    padding-top: 130px !important; 
}

/* ====== MOBILE RESPONSIVE QUERIES ====== */
@media (max-width: 1024px) {
    .top-bar-container {
        padding: 5px 10px;
    }
}

@media (max-width: 850px) {
    /* Hide the Typewriter text on smaller tablets to preserve space for buttons */
    .typewriter-text {
        display: none !important;
    }
    .top-bar-left i.fa-bullhorn {
        display: none !important;
    }
    .top-bar-left {
        max-width: 0% !important;
        margin: 0 !important;
        padding: 0 !important;
    }
    .top-bar-right {
        justify-content: center !important;
        width: 100% !important;
        flex: 100% !important;
    }
}

@media (max-width: 600px) {
    /* Mobile Phone View */
    .top-bar-redesigned {
        position: relative !important; /* Unfix on extreme mobile to let it scroll away if it's too tall */
        height: auto !important;
        padding: 10px 0 !important;
    }
    
    .top-bar-container {
        flex-direction: column !important;
        justify-content: center !important;
        gap: 10px !important;
    }
    
    .top-bar-right {
        flex-direction: row !important;
        flex-wrap: wrap !important;
        justify-content: center !important;
        gap: 15px !important;
    }
    
    .social-icons-top {
        order: 1;
    }
    .top-book-call {
        order: 2;
    }
    .top-search {
        order: 3;
        width: 100%; /* Force search to its own line */
        justify-content: center;
        margin: 5px 0;
    }
    .top-search input {
        width: 80% !important;
        text-align: center;
        background: rgba(255,255,255,0.1) !important;
        border-radius: 4px;
        padding: 4px;
    }
    .top-cart {
        order: 4;
    }
    #google_translate_element_top {
        order: 5;
    }
    .top-get-started {
        order: 6;
        width: 90%; /* Full width button on mobile */
        text-align: center;
        padding: 8px !important;
        margin-top: 5px;
    }
    
    /* Revert navbar back to top since TopBar is relative now */
    .navbar {
        top: 0 !important;
    }
}
"""
    if "/* ===== TOP BAR RESPONSIVENESS" not in content:
        content += "\n" + new_css
        with open(css_path, "w", encoding="utf-8") as f:
            f.write(content)
        print("Successfully injected responsive CSS into main.css")
    else:
        print("Responsive CSS already present in main.css")

if __name__ == "__main__":
    patch_main_css()
