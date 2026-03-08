import os

def patch_main_css_overlap():
    css_path = 'styles/main.css'
    with open(css_path, "r", encoding="utf-8") as f:
        content = f.read()

    # The previous patch tried `.navbar { top: 40px !important; }` but it seems 
    # either specificity failed or Javascript is overriding it. We will force a physical spacer.
    
    new_css = """
/* ===== EXTREME FORCED TOP BAR FIX ===== */
body {
    padding-top: 40px !important; /* Physically push the entire body down */
}

/* On mobile where TopBar wraps to multiline, we need more space */
@media (max-width: 600px) {
    body {
        padding-top: 0 !important; /* Body doesn't need padding if topbar is relative */
    }
}

/* Force navbar down exactly the height of the top bar */
#navigation.navbar {
    top: 40px !important;
    margin-top: 0 !important;
}

/* The Top bar itself must be at absolute 0 */
.top-bar-redesigned {
    top: 0 !important;
    position: fixed !important;
}

/* Scrolled state of the main nav must ALSO stay below the top bar */
#navigation.navbar.scrolled {
    top: 40px !important; 
}

/* On Mobile phone view */
@media (max-width: 600px) {
    #navigation.navbar {
        top: 0 !important; 
        position: relative !important; 
    }
    #navigation.navbar.scrolled {
        position: fixed !important;
        top: 0 !important;
    }
}
"""
    if "/* ===== EXTREME FORCED" not in content:
        content = content.replace("/* ===== TOP BAR RESPONSIVENESS (PHASE 7 FIXES) ===== */", new_css + "\n/* ===== TOP BAR RESPONSIVENESS (PHASE 7 FIXES) ===== */")
        with open(css_path, "w", encoding="utf-8") as f:
            f.write(content)
        print("Successfully injected forced overlap fix into main.css")
    else:
        print("Forced overlap CSS already present in main.css")

if __name__ == "__main__":
    patch_main_css_overlap()
