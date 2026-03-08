import os

def apply_javascript_stacking_fix():
    js_path = 'js/main.js'
    html_path = 'index.html'

    with open(js_path, "r", encoding="utf-8") as f:
        js_content = f.read()

    # The issue is that pure CSS `margin-top: Xpx` is failing because on mobile, the top bar 
    # expands dynamically based on content flow.
    # We will inject a JavaScript payload that runs on window resize and load to absolutely
    # guarantee the navbar is pushed down exactly by the dynamically calculated height of the top bar.

    js_payload = """
// ===== AUTO-STACKING FIX FOR TOP BAR & NAVBAR =====
document.addEventListener('DOMContentLoaded', function() {
    function enforceNavigationStacking() {
        const topBar = document.querySelector('.top-bar-redesigned');
        const navBar = document.querySelector('.navbar');
        const bodySpacer = document.body;

        if (topBar && navBar) {
            // Get the *exact* runtime height of the Top Bar
            const topBarHeight = topBar.getBoundingClientRect().height;

            // Force Navbar to sit exactly below it
            navBar.style.top = topBarHeight + 'px';
            
            // On mobile, the Top Bar is position: relative, so we don't push the Navbar top
            if (window.innerWidth <= 600) {
                // When relative, the DOM naturally stacks them. 
                // But we must remove the absolute `top: 0` that breaks it.
                navBar.style.top = '0px'; 
                navBar.style.position = 'relative';
            } else {
                navBar.style.top = topBarHeight + 'px';
                navBar.style.position = 'fixed';
            }
        }
    }

    // Run once on load
    enforceNavigationStacking();
    // Run again on resize to catch dynamic wrapping
    window.addEventListener('resize', enforceNavigationStacking);
    
    // Also patch the sticky header logic
    const oldScroll = window.onscroll;
    window.addEventListener('scroll', function() {
        if (window.innerWidth > 600) {
            const topBar = document.querySelector('.top-bar-redesigned');
            const navBar = document.querySelector('.navbar');
            if (topBar && navBar) {
                navBar.style.top = topBar.getBoundingClientRect().height + 'px';
            }
        } else {
            // Mobile scrolling logic
            const topBar = document.querySelector('.top-bar-redesigned');
            const navBar = document.querySelector('.navbar');
            
            // If scrolled past top bar height, make navbar sticky at top:0
            let scrollY = window.scrollY || document.documentElement.scrollTop;
            let topBarHeight = topBar ? topBar.offsetHeight : 0;
            
            if (scrollY > topBarHeight && topBar) {
                navBar.style.position = 'fixed';
                navBar.style.top = '0px';
                navBar.style.width = '100%';
            } else if (navBar) {
                navBar.style.position = 'relative';
                navBar.style.top = '0px';
            }
        }
    });
});
// ===============================================
"""
    if "// ===== AUTO-STACKING FIX FOR TOP BAR & NAVBAR =====" not in js_content:
        js_content += "\n" + js_payload
        with open(js_path, "w", encoding="utf-8") as f:
            f.write(js_content)
        print("Successfully injected JavaScript stacking behavior into main.js")
    else:
        print("Javascript stacking behavior already exists.")

if __name__ == "__main__":
    apply_javascript_stacking_fix()
