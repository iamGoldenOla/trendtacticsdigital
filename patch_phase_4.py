import os
import glob
import re

def create_livechat_js():
    js_content = """// Jotform AI Style Live Chat Agent - "David AI" / "Trendy AI"
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Styles
    const style = document.createElement('style');
    style.textContent = `
        /* Live Chat Widget Global Styles */
        :root {
            --chat-primary: #111827; /* Dark background matching JotForm top part */
            --chat-secondary: #f9fafb; /* Light background for chat area */
            --chat-accent: #fcd34d; /* Yellow accent color for button/badge */
            --chat-text: #1f2937;
            --chat-user-msg: #f3f4f6;
        }

        /* The FAB (Floating Action Button) */
        .chat-fab {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background-color: var(--chat-accent);
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            cursor: pointer;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            overflow: hidden;
            border: 2px solid #fff;
        }
        
        .chat-fab:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(0,0,0,0.25);
        }

        .chat-fab img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        /* The Chat Modal Container */
        .chat-modal-overlay {
            position: fixed;
            bottom: 100px;
            right: 30px;
            width: 380px;
            height: 600px;
            max-height: calc(100vh - 120px);
            background: var(--chat-secondary);
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            z-index: 10000;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            opacity: 0;
            transform: translateY(20px);
            pointer-events: none;
            transition: opacity 0.3s ease, transform 0.3s ease;
            font-family: 'Inter', sans-serif;
            border: 1px solid rgba(0,0,0,0.05);
        }

        .chat-modal-overlay.chat-open {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
        }

        /* Modal Header */
        .chat-header {
            background-color: var(--chat-primary);
            color: #fff;
            padding: 15px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .chat-header-profile {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .chat-header-avatar {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            background-color: #e5e7eb;
            overflow: hidden;
            border: 2px solid rgba(255,255,255,0.2);
        }

        .chat-header-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .chat-header-info {
            display: flex;
            flex-direction: column;
        }

        .chat-header-name {
            font-weight: 600;
            font-size: 1.05rem;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .ai-badge {
            background-color: #fff;
            color: var(--chat-primary);
            font-size: 0.65rem;
            font-weight: 800;
            padding: 2px 5px;
            border-radius: 4px;
            letter-spacing: 0.5px;
        }

        .chat-header-role {
            font-size: 0.8rem;
            color: #9ca3af;
        }

        .chat-close-btn {
            background: rgba(255,255,255,0.1);
            border: none;
            color: #fff;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s;
        }

        .chat-close-btn:hover {
            background: rgba(255,255,255,0.2);
        }

        /* Chat Body */
        .chat-body {
            flex: 1;
            background: #fff;
            padding: 20px;
            overflow-y: auto;
            position: relative;
        }

        .chat-message-ai {
            background-color: #fff;
            border: 1px solid #f3f4f6;
            padding: 15px;
            border-radius: 12px;
            border-top-left-radius: 2px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.02);
            color: var(--chat-text);
            font-size: 0.95rem;
            line-height: 1.5;
            margin-bottom: 20px;
        }

        .chat-disclaimer {
            font-size: 0.75rem;
            color: #6b7280;
            display: flex;
            align-items: center;
            gap: 6px;
            margin-bottom: 20px;
        }

        /* Chat Input Area */
        .chat-footer {
            background: #fff;
            padding: 15px 20px 20px;
            border-top: 1px solid #f3f4f6;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .chat-input-wrapper {
            display: flex;
            align-items: center;
            background: #f3f4f6;
            border-radius: 24px;
            padding: 8px 15px;
            gap: 10px;
        }
        
        .chat-attach-btn {
            color: #6b7280;
            background: none;
            border: none;
            cursor: pointer;
            padding: 5px;
            font-size: 1rem;
        }

        .chat-input-wrapper input {
            flex: 1;
            background: transparent;
            border: none;
            outline: none;
            font-size: 0.95rem;
            color: var(--chat-text);
        }

        .chat-input-wrapper input::placeholder {
            color: #9ca3af;
        }

        .chat-send-btn {
            background: var(--chat-accent);
            color: var(--chat-primary);
            border: none;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.9rem;
            transition: background 0.2s;
        }
        
        .chat-send-btn:hover {
            background: #fbbf24;
        }

        /* Bottom Action Tabs */
        .chat-actions {
            display: flex;
            justify-content: space-around;
            border-top: 1px solid #f3f4f6;
            padding-top: 15px;
        }

        .chat-action-btn {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;
            background: none;
            border: none;
            color: #6b7280;
            font-size: 0.75rem;
            cursor: pointer;
            transition: color 0.2s;
        }

        .chat-action-btn.active, .chat-action-btn:hover {
            color: var(--chat-primary);
            font-weight: 500;
        }
        
        .chat-action-btn i {
            font-size: 1.1rem;
        }

        .chat-powered-by {
            text-align: center;
            font-size: 0.65rem;
            color: #9ca3af;
            margin-top: 5px;
        }

        /* Responsive tweaks */
        @media (max-width: 480px) {
            .chat-modal-overlay {
                width: calc(100vw - 40px);
                right: 20px;
                bottom: 100px;
            }
        }
    `;
    document.head.appendChild(style);

    // 2. Build HTML Structure
    const chatContainer = document.createElement('div');
    chatContainer.innerHTML = `
        <!-- Main FAB -->
        <div class="chat-fab" id="liveChatFab">
            <img src="images/professional-ceo.png" alt="Trendy AI Chat">
        </div>

        <!-- Chat window -->
        <div class="chat-modal-overlay" id="liveChatModal">
            <div class="chat-header">
                <div class="chat-header-profile">
                    <div class="chat-header-avatar">
                        <img src="images/professional-ceo.png" alt="Trendy">
                    </div>
                    <div class="chat-header-info">
                        <span class="chat-header-name">Trendy <span class="ai-badge">AI</span></span>
                        <span class="chat-header-role">Customer Support Agent</span>
                    </div>
                </div>
                <button class="chat-close-btn" id="liveChatClose">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="chat-body">
                <div class="chat-message-ai">
                    Hi, this is Trendy. This chat is powered by AI and may be monitored for quality purposes. How can I assist you today?
                </div>
                <div class="chat-disclaimer">
                    <i class="fas fa-magic"></i> This conversation is handled by an AI Agent.
                </div>
            </div>

            <div class="chat-footer">
                <div class="chat-input-wrapper">
                    <button class="chat-attach-btn"><i class="fas fa-paperclip"></i></button>
                    <input type="text" placeholder="Type here">
                    <button class="chat-send-btn"><i class="fas fa-bars"></i></button>
                </div>
                
                <div class="chat-actions">
                    <button class="chat-action-btn active">
                        <i class="fas fa-comment-dots"></i>
                        <span>Chat</span>
                    </button>
                    <button class="chat-action-btn">
                        <i class="fas fa-microphone"></i>
                        <span>Voice</span>
                    </button>
                    <button class="chat-action-btn">
                        <i class="fas fa-history"></i>
                        <span>History</span>
                    </button>
                </div>
                
                <div class="chat-powered-by">
                    This chat is recorded. By chatting, you agree to the <u>AI Terms</u>.<br>
                    Powered by <strong>Trendtactics AI</strong>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(chatContainer);

    // 3. Logic
    const fabButton = document.getElementById('liveChatFab');
    const modal = document.getElementById('liveChatModal');
    const closeBtn = document.getElementById('liveChatClose');

    const toggleChat = () => {
        modal.classList.toggle('chat-open');
    };

    fabButton.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);
});
"""
    os.makedirs("js", exist_ok=True)
    with open("js/livechat.js", "w", encoding="utf-8") as f:
        f.write(js_content)
    print("Created js/livechat.js")

def patch_html_files():
    html_files = glob.glob("*.html")
    
    # We are going to replace <div class="top-bar-redesigned"> ... </div> (the entire block)
    # with the newly updated block structure containing 'Book a Call', Search, and Cart.
    
    new_top_bar = """<!-- Top Bar -->
    <div class="top-bar-redesigned">
        <div class="top-bar-container">
            <div class="top-bar-left">
                <div class="social-icons-top">
                    <a href="https://facebook.com/trendtactics" target="_blank"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://instagram.com/trendtactics" target="_blank"><i class="fab fa-instagram"></i></a>
                </div>
                <a href="contact.html" class="top-book-call">
                    <i class="fas fa-phone-alt" style="margin-right: 5px;"></i> Book a Call
                </a>
            </div>
            
            <div class="top-bar-center">
                <i class="fas fa-bullhorn text-accent-cyan" style="color: #00FFFF; margin-right: 8px;"></i>
                <span id="typewriter-text" class="typewriter-text">Welcome to Trendtactics Digital</span>
            </div>
            
            <div class="top-bar-right">
                <div class="top-search">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Search...">
                </div>
                <a href="academy.html" class="top-cart" title="Ebook Cart">
                    <i class="fas fa-shopping-cart"></i>
                    <span class="cart-badge">0</span>
                </a>
                <div id="google_translate_element_top"></div>
            </div>
        </div>
    </div>"""

    # We also need to inject some CSS into the <style> block of the files to handle the new top bar elements.
    new_top_bar_styles = """
        /* New Top Bar Added Styles */
        .top-book-call {
            color: #00FFFF;
            text-decoration: none;
            font-weight: 600;
            padding: 2px 10px;
            border: 1px solid rgba(0,255,255,0.4);
            border-radius: 4px;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
        }
        .top-book-call:hover {
            background: rgba(0,255,255,0.1);
            color: #fff;
        }
        
        .top-bar-left {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .top-search {
            display: flex;
            align-items: center;
            background: rgba(255,255,255,0.05);
            border-radius: 4px;
            padding: 3px 8px;
            margin-right: 15px;
            border: 1px solid rgba(255,255,255,0.1);
        }
        .top-search i {
            color: #94a3b8;
            font-size: 0.8rem;
            margin-right: 5px;
        }
        .top-search input {
            background: transparent;
            border: none;
            color: #fff;
            font-size: 0.8rem;
            width: 80px;
            outline: none;
            transition: width 0.3s;
        }
        .top-search input:focus {
            width: 120px;
        }
        .top-search input::placeholder {
            color: #64748b;
        }

        .top-cart {
            color: #cbd5e1;
            text-decoration: none;
            position: relative;
            margin-right: 15px;
            font-size: 1rem;
            transition: color 0.3s;
            display: flex;
            align-items: center;
        }
        .top-cart:hover {
            color: #00FFFF;
        }
        .cart-badge {
            position: absolute;
            top: -6px;
            right: -8px;
            background: #00FFFF;
            color: #061226;
            font-size: 0.6rem;
            font-weight: 800;
            padding: 1px 4px;
            border-radius: 10px;
        }

        @media (max-width: 992px) {
            .top-bar-left { gap: 10px; }
            .top-book-call { font-size: 0.75rem; padding: 2px 6px; }
            .top-search input { width: 50px; }
            .top-search input:focus { width: 80px; }
        }

        @media (max-width: 768px) {
            .top-bar-container { gap: 10px; flex-wrap: wrap; }
            .top-bar-redesigned { height: auto; padding: 5px 0; }
            .top-bar-center { order: 3; width: 100%; max-width: 100%; margin-top: 5px; }
            .navbar { top: 65px !important; }
            .navbar.scrolled { top: 0 !important; }
            .top-search { margin-right: 10px; }
            .top-cart { margin-right: 10px; }
        }
    """

    for html_file in html_files:
        with open(html_file, "r", encoding="utf-8") as f:
            content = f.read()

        changed = False

        # 1. Replace the inner html of the top bar
        # We find the start of <!-- Top Bar --> and the matching closing div
        start_marker = "<!-- Top Bar -->\n    <div class=\"top-bar-redesigned\">"
        if start_marker in content:
            # Simple regex to replace the block
            import re
            pattern = r'<!-- Top Bar -->\s*<div class="top-bar-redesigned">.*?</div>\s*</div>\s*</div>'
            
            # Since HTML structure spans lines, we use dotall
            new_content = re.sub(pattern, new_top_bar, content, flags=re.DOTALL)
            if new_content != content:
                content = new_content
                changed = True
        
        # 2. Inject CSS if not there
        if ".top-book-call" not in content and "</style>" in content:
            content = content.replace("</style>", new_top_bar_styles + "\n</style>", 1)
            changed = True
            
        # 3. Inject livechat.js if not there
        if "livechat.js" not in content and "</body>" in content:
            script_tag = '<script src="js/livechat.js" defer></script>'
            content = content.replace("</body>", f"{script_tag}\n</body>")
            changed = True

        if changed:
            with open(html_file, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Patched {html_file}")

if __name__ == "__main__":
    create_livechat_js()
    patch_html_files()
