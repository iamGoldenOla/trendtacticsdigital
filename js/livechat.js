// Jotform AI Style Live Chat Agent - "Trendy AI"
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Styles
    const style = document.createElement('style');
    style.textContent = `
        /* Live Chat Widget Global Styles */
        :root {
            --chat-primary: #0A1E3F; /* Dark Navy brand color */
            --chat-secondary: rgba(255, 255, 255, 0.85); /* Glassmorphism background */
            --chat-accent: #00FFFF; /* Cyan accent color */
            --chat-text: #1f2937;
            --chat-user-msg: rgba(10, 30, 63, 0.1); /* Light navy for user message bubble */
        }

        /* The FAB (Floating Action Button) */
        .chat-fab {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 65px;
            height: 65px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--chat-primary), #1a3a6e);
            box-shadow: 0 8px 25px rgba(10,30,63,0.3);
            cursor: pointer;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease;
            overflow: hidden;
            border: 2px solid var(--chat-accent);
        }
        
        .chat-fab:hover {
            transform: scale(1.1) translateY(-5px);
            box-shadow: 0 12px 30px rgba(0, 255, 255, 0.4);
        }

        .chat-fab img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 1 !important;
            visibility: visible !important;
            display: block !important;
        }
        
        /* The Chat Modal Container */
        .chat-modal-overlay {
            position: fixed;
            bottom: 110px;
            right: 30px;
            width: 380px;
            height: 600px;
            max-height: calc(100vh - 140px);
            background: var(--chat-secondary);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-radius: 20px;
            box-shadow: 0 15px 40px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.2) inset;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            opacity: 0;
            transform: translateY(30px) scale(0.95);
            pointer-events: none;
            transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
            font-family: 'Inter', sans-serif;
            border: 1px solid rgba(255, 255, 255, 0.5);
        }

        .chat-modal-overlay.chat-open {
            opacity: 1;
            transform: translateY(0) scale(1);
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
            flex: 1 1 auto;
            background: #fff;
            padding: 20px;
            overflow-y: auto;
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 15px;
            min-height: 0; /* CRITICAL for Flexbox scrolling */
        }

        .chat-message-ai, .chat-message-user {
            padding: 12px 16px;
            border-radius: 12px;
            font-size: 0.95rem;
            line-height: 1.5;
            max-width: 85%;
            word-wrap: break-word;
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .chat-message-ai {
            background-color: #f8fafc;
            color: var(--chat-text);
            align-self: flex-start;
            border-top-left-radius: 4px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.03);
            border: 1px solid #e2e8f0;
        }

        .chat-message-user {
            background: linear-gradient(135deg, var(--chat-primary), #1a3a6e);
            color: #ffffff;
            align-self: flex-end;
            border-top-right-radius: 4px;
            box-shadow: 0 4px 10px rgba(10,30,63,0.15);
        }

        .chat-disclaimer {
            font-size: 0.75rem;
            color: #6b7280;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            margin-bottom: 5px;
        }

        .typing-indicator {
            display: flex;
            gap: 4px;
            padding: 12px 16px;
            background-color: #f3f4f6;
            border-radius: 12px;
            border-top-left-radius: 2px;
            align-self: flex-start;
            width: fit-content;
        }

        .typing-dot {
            width: 6px;
            height: 6px;
            background-color: #9ca3af;
            border-radius: 50%;
            animation: typing 1.4s infinite ease-in-out both;
        }

        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }

        @keyframes typing {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }

        /* Chat Input Area */
        /* Suggested Questions */
        .chat-suggestions {
            display: none;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 10px;
            padding: 0 10px;
        }

        .suggestion-chip {
            background: #fff;
            border: 1px solid var(--chat-accent);
            color: var(--chat-primary);
            padding: 6px 12px;
            border-radius: 16px;
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.3s ease;
            white-space: nowrap;
        }

        .suggestion-chip:hover {
            background: var(--chat-accent);
            color: #000;
        }

        .chat-footer {
            padding: 15px 20px;
            background: #fff;
            border-top: 1px solid #f3f4f6;
            display: flex;
            flex-direction: column;
            gap: 15px;
            flex-shrink: 0; /* Ensures footer is cleanly pinned to bottom */
            z-index: 2;
        }

        .chat-input-wrapper {
            display: flex;
            align-items: center;
            background: #f3f4f6;
            border-radius: 24px;
            padding: 8px 15px;
            gap: 10px;
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
            background: linear-gradient(135deg, var(--chat-primary), #1a3a6e);
            color: var(--chat-accent);
            border: none;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
            transition: all 0.2s ease;
            box-shadow: 0 4px 10px rgba(10,30,63,0.15);
        }
        
        .chat-send-btn:hover {
            transform: scale(1.1) rotate(5deg);
            box-shadow: 0 6px 15px rgba(10,30,63,0.25);
        }

        .chat-send-btn:active {
            transform: scale(0.95);
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
    const avatarPath = "images/trendy_chatlive_image.jpg";

    const chatContainer = document.createElement('div');
    chatContainer.innerHTML = `
        <!-- Main FAB -->
        <div class="chat-fab" id="liveChatFab">
            <img src="${avatarPath}" alt="Trendy AI Chat">
        </div>

        <!-- Chat window -->
        <div class="chat-modal-overlay" id="liveChatModal">
            <div class="chat-header">
                <div class="chat-header-profile">
                    <div class="chat-header-avatar">
                        <img src="${avatarPath}" alt="Trendy">
                    </div>
                    <div class="chat-header-info">
                        <span class="chat-header-name">Trendy <span class="ai-badge">AI</span></span>
                        <span class="chat-header-role">Intelligent Growth Agent</span>
                    </div>
                </div>
                <button class="chat-close-btn" id="liveChatClose">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="chat-body" id="chat-body">
                <div class="chat-disclaimer">
                    <i class="fas fa-bolt"></i> Welcome to the Trendtactics Digital help center!
                </div>
                <div class="chat-message-ai">
                    Hi! I'm Trendy, your AI Growth Agent. How can I assist you with your digital marketing today?
                </div>
            </div>

            <div class="chat-suggestions" id="chat-suggestions">
                <div class="suggestion-chip">How can you help my business?</div>
                <div class="suggestion-chip">Pricing plans</div>
                <div class="suggestion-chip">Recent projects</div>
            </div>

            <div class="chat-footer">
                <div class="chat-input-wrapper">
                    <input type="text" id="chatInput" placeholder="Ask me anything about our services...">
                    <button class="chat-send-btn" id="chatSendBtn"><i class="fas fa-paper-plane"></i></button>
                </div>
            
            <div class="chat-actions">
                <button class="chat-action-btn active">
                    <i class="fas fa-comment-dots"></i>
                    <span>Chat</span>
                </button>
                <button class="chat-action-btn">
                    <i class="fas fa-bullhorn"></i>
                    <span>Services</span>
                </button>
                <button class="chat-action-btn">
                    <i class="fas fa-rocket"></i>
                    <span>Pricing</span>
                </button>
            </div>
            
            <div class="chat-powered-by">
                Intelligent insights provided by <strong>Trendtactics AI</strong>
            </div>
        </div>
    </div>
    `;
    document.body.appendChild(chatContainer);

    // 3. Logic & Static Knowledge Engine
    const fabButton = document.getElementById('liveChatFab');
    const modal = document.getElementById('liveChatModal');
    const closeBtn = document.getElementById('liveChatClose');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('chatSendBtn');
    const chatBody = document.getElementById('chat-body'); // Changed ID here

    const toggleChat = () => {
        modal.classList.toggle('chat-open');
        if (modal.classList.contains('chat-open')) {
            setTimeout(() => chatInput.focus(), 300);
        }
    };

    fabButton.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    const scrollToBottom = () => {
        chatBody.scrollTo({
            top: chatBody.scrollHeight,
            behavior: 'smooth'
        });
    };

    // Knowledge Engine Database
    const knowledgeBase = [
        // Greetings
        {
            keywords: ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening", "howdy"],
            response: "Hello! 👋 I'm <strong>Trendy</strong>, your Trendtactics Digital AI Growth Agent. I'm here to help you discover how we can grow your business.<br><br>To get you the best advice — <strong>what does your business do?</strong>",
            chips: ["I run an e-commerce store", "I have a local business", "I offer professional services", "I run a startup"]
        },
        // Business types
        {
            keywords: ["ecommerce", "e-commerce", "online store", "sell products", "shopify", "products"],
            response: "🛒 For <strong>e-commerce businesses</strong>, we recommend:<br><br>📢 <strong>Facebook & Instagram Ads</strong> — drive immediate sales<br>🔍 <strong>SEO & Content</strong> — long-term organic traffic<br>📧 <strong>Email Marketing</strong> — retain customers & boost repeat purchases<br><br>Our e-commerce clients typically see a <strong>3x ROAS</strong> within 60 days. Would you like pricing details or a free strategy call?",
            chips: ["Facebook Ads pricing", "Email marketing details", "Book free consultation"]
        },
        {
            keywords: ["local business", "restaurant", "salon", "clinic", "store", "retail"],
            response: "📍 For <strong>local businesses</strong>, we focus on:<br><br>🗺️ <strong>Local SEO</strong> — so customers find you on Google Maps<br>📱 <strong>Social Media</strong> — build community and loyalty<br>📣 <strong>Facebook/Instagram Ads</strong> — hyper-targeted to your area<br>🌐 <strong>Website</strong> — professional online presence<br><br>What's your top priority?",
            chips: ["I need a website", "Help with local SEO", "Run local ads", "Pricing"]
        },
        {
            keywords: ["startup", "new business", "launching", "just started"],
            response: "🚀 We <strong>love working with startups</strong>! We recommend starting with:<br><br>🌐 Brand Identity + Website — your foundation<br>📣 Social Media — build your audience from day one<br>🎯 Targeted Ads — get your first customers fast<br>📧 Email List Building — own your audience<br><br>Would you like a <strong>free strategy consultation</strong> to map out the right approach?",
            chips: ["Book a free strategy call", "What does a website cost?", "What results can I expect?"]
        },
        // Services overview
        {
            keywords: ["services", "what do you offer", "what do you do", "offer", "solutions"],
            response: "We offer <strong>7 core digital services</strong>:<br><br>🌐 <strong>Web Development</strong> — from $2,500<br>📱 <strong>App Development</strong> — from $5,000<br>📊 <strong>Digital Marketing</strong> — from $1,500/mo<br>📱 <strong>Social Media Marketing</strong> — from $800/mo<br>📣 <strong>Facebook & Meta Ads</strong> — from $1,000/mo<br>🎥 <strong>Content Creation</strong> — from $500/mo<br>📧 <strong>Email Marketing</strong> — from $600/mo<br><br>Which area interests you most?",
            chips: ["Web Development", "Social Media", "Facebook Ads", "Pricing plans"]
        },
        // Pricing
        {
            keywords: ["pricing", "cost", "how much", "price", "fee", "charge", "plans", "package", "budget", "affordable", "cheap"],
            response: "💰 Our pricing packages:<br><br>🌱 <strong>Starter</strong> — $500/month<br>SEO + Social Media (2 platforms) + Monthly report<br><br>🚀 <strong>Growth</strong> — $1,500/month<br>Everything in Starter + Ads + Content + Email Marketing<br><br>🏢 <strong>Enterprise</strong> — Custom pricing<br>Full-service: Web dev + All channels + Dedicated manager<br><br>We also do <strong>custom packages</strong>. Want a personalized quote?",
            chips: ["Get a custom quote", "Tell me about Growth plan", "Book free consultation"]
        },
        // Web Development
        {
            keywords: ["website", "web development", "web design", "build a site", "new website", "redesign"],
            response: "🌐 Our <strong>Web Development</strong> service includes:<br><br>✅ Custom responsive design<br>✅ SEO optimization from day 1<br>✅ Fast loading & Custom CMS<br>✅ Security & SSL<br>✅ 1 year of support<br><br>💰 <strong>Starting from $2,500</strong><br>⏱️ Delivered in <strong>4-8 weeks</strong><br><br>Would you like to discuss your project?",
            chips: ["Get a web design quote", "See our portfolio", "Book consultation"]
        },
        // App Development
        {
            keywords: ["app", "mobile app", "ios", "android", "application"],
            response: "📱 Our <strong>App Development</strong> service delivers:<br><br>✅ Native iOS & Android apps<br>✅ Cross-platform solutions<br>✅ API integration<br>✅ App Store submission<br><br>💰 <strong>Starting from $5,000</strong><br><br>What kind of app do you have in mind?",
            chips: ["E-commerce app", "Service booking app", "Custom app quote"]
        },
        // Social Media
        {
            keywords: ["social media", "instagram", "tiktok", "linkedin", "twitter", "facebook page", "social"],
            response: "📱 Our <strong>Social Media Marketing</strong> includes:<br><br>✅ Content creation & posting<br>✅ Community management<br>✅ Growth strategy<br>✅ Analytics & reporting<br><br>💰 <strong>Starting from $800/month</strong><br><br>We manage your presence across all major platforms — so you can focus on running your business. Which platforms matter most to you?",
            chips: ["Instagram & TikTok", "LinkedIn (B2B)", "All platforms", "What are the results?"]
        },
        // Facebook Ads
        {
            keywords: ["facebook ads", "meta ads", "ads", "advertising", "paid ads", "ppc", "campaign"],
            response: "📣 Our <strong>Facebook & Meta Ads</strong> service includes:<br><br>✅ Campaign strategy & setup<br>✅ Audience targeting<br>✅ Creative development<br>✅ A/B testing<br>✅ Weekly performance reports<br><br>💰 <strong>Starting from $1,000/month</strong> + ad spend<br>📊 Our clients average a <strong>3x ROAS</strong><br><br>Do you currently run ads, or would this be your first campaign?",
            chips: ["I run ads and want better results", "First campaign", "What's the minimum ad budget?"]
        },
        // Email Marketing
        {
            keywords: ["email marketing", "newsletter", "automation", "email", "drip", "email list"],
            response: "📧 Our <strong>Email Marketing</strong> service includes:<br><br>✅ Email strategy & design<br>✅ Automation sequences<br>✅ List management & segmentation<br>✅ Monthly analytics<br><br>💰 <strong>Starting from $600/month</strong><br><br>Email has the <strong>highest ROI</strong> of any channel — $42 return per $1 spent on average. Do you have an existing email list?",
            chips: ["Yes, I have a list", "Starting from zero", "Book a consultation"]
        },
        // Content Creation
        {
            keywords: ["content", "video", "photography", "copywriting", "blog", "graphic", "creative", "content creation"],
            response: "🎥 Our <strong>Content Creation</strong> service includes:<br><br>✅ Video production<br>✅ Professional photography<br>✅ Copywriting<br>✅ Graphic design<br>✅ Blog content<br><br>💰 <strong>Starting from $500/month</strong><br><br>Great content is the fuel for all your marketing. What type of content do you need most?",
            chips: ["Social media videos", "SEO blog articles", "Product photography"]
        },
        // SEO
        {
            keywords: ["seo", "search engine", "google ranking", "traffic", "organic", "rank"],
            response: "🔍 Our <strong>SEO services</strong> include:<br><br>✅ Technical SEO audit & fixes<br>✅ Keyword research & strategy<br>✅ Content optimization<br>✅ Backlink building<br>✅ Monthly ranking reports<br><br>📊 SEO results typically show in <strong>3-6 months</strong>. It's the <strong>best long-term investment</strong> in digital marketing.<br><br>Would you like a free SEO audit of your website?",
            chips: ["Free SEO audit", "SEO pricing", "Faster results with ads"]
        },
        // Results / ROI
        {
            keywords: ["roi", "results", "proof", "success", "case study", "portfolio", "examples"],
            response: "📈 What our clients have achieved:<br><br>✅ <strong>3x average ROI increase</strong><br>✅ <strong>98% client satisfaction rate</strong><br>✅ <strong>50+ successful projects</strong><br>✅ Clients in e-commerce, real estate, healthcare, SaaS & more<br><br>We focus on measurable KPIs — you always know what you're getting. Want to see specific examples for your industry?",
            chips: ["View portfolio", "Book free consultation", "What industry do you specialize in?"]
        },
        // Timeline
        {
            keywords: ["how long", "timeline", "when", "results", "how soon", "how fast", "time"],
            response: "⏱️ Realistic timelines for our services:<br><br>⚡ <strong>Ads</strong> — Results in 1-2 weeks<br>📱 <strong>Social Media</strong> — Growth in 4-8 weeks<br>📧 <strong>Email</strong> — Revenue in 2-4 weeks<br>🌐 <strong>Website</strong> — Live in 4-8 weeks<br>🔍 <strong>SEO</strong> — Organic leads in 3-6 months<br><br>We set clear goals so you're never guessing. What's your deadline or goal for the next 90 days?"
        },
        // Process / Get Started
        {
            keywords: ["get started", "how to start", "process", "onboarding", "begin", "next step"],
            response: "🚀 Our simple 5-step process:<br><br><strong>1. Discovery Call</strong> — We learn about your goals<br><strong>2. Strategy & Proposal</strong> — Custom plan for your budget<br><strong>3. Onboarding</strong> — Setup in 1-2 business days<br><strong>4. Execution</strong> — Campaigns launch & growth begins<br><strong>5. Reporting</strong> — Regular updates & optimization<br><br>Want to start with Step 1 — a <strong>free discovery call</strong>?",
            chips: ["Book a free discovery call", "Pricing first", "What results to expect?"]
        },
        // Contract / flexibility
        {
            keywords: ["contract", "locked", "cancel", "commitment", "month-to-month", "flexible", "binding"],
            response: "✅ <strong>We offer flexible month-to-month contracts</strong> — no long-term lock-ins.<br><br>• 30-day cancellation notice<br>• You own all your assets<br>• No hidden fees<br>• Transparent monthly reporting<br><br>We earn your business every month! 💪 Any other questions?",
            chips: ["Pricing details", "Book consultation"]
        },
        // Support
        {
            keywords: ["support", "help desk", "response time", "after hours", "customer service"],
            response: "🛟 Our support structure:<br><br>🕐 <strong>Starter</strong> — Business hours, 24hr response<br>⚡ <strong>Growth</strong> — Business hours, 4hr response<br>🔥 <strong>Enterprise</strong> — 24/7 priority support<br><br>You can reach us via our contact page, live chat, or by booking a call. We're here whenever you need us!"
        },
        // Location
        {
            keywords: ["where", "location", "based", "office", "lagos", "nigeria", "london", "uk", "canada", "usa", "global", "international"],
            response: "🌍 We're a <strong>global digital agency</strong> with offices in:<br><br>🇳🇬 Lagos, Nigeria<br>🇬🇧 London, UK<br>🇨🇦 Toronto, Canada<br>🇺🇸 New York City, USA<br><br>We serve clients <strong>worldwide</strong> across all time zones. Where is your business based?",
            chips: ["Nigeria", "UK", "USA", "Another country"]
        },
        // Academy
        {
            keywords: ["academy", "course", "learn", "training", "diy", "self-learn", "education"],
            response: "🎓 We have the <strong>Trendtactics Academy</strong>! It offers courses in:<br><br>• Digital Marketing fundamentals<br>• Social Media strategy<br>• SEO techniques<br>• Email marketing<br>• Business growth strategies<br><br>Visit <strong>academy.trendtacticsdigital.com</strong> to enroll. Would you rather learn yourself, or have our team handle it?",
            chips: ["Visit Academy", "Have your team handle it", "What's the price difference?"]
        },
        // Founder
        {
            keywords: ["founder", "who is", "ceo", "akinola", "olujobi", "owner", "who started"],
            response: "Trendtactics Digital was founded by <strong>Akinola Olujobi</strong> — a passionate digital strategist committed to delivering excellence, professionalism, and measurable growth for businesses worldwide.<br><br>We're headquartered in Lagos with offices in London, Toronto, and NYC. 🌍"
        },
        // Book / Consultation
        {
            keywords: ["book", "schedule", "consult", "free call", "meeting", "appointment", "talk to someone"],
            response: "📅 Let's make it happen!<br><br><strong>Book your FREE 30-minute strategy consultation</strong> — we'll review your digital presence, identify growth opportunities, and recommend the right services for your goals.<br><br>Zero commitment. 100% value.<br><br><a href='contact.html' style='display:inline-block;margin-top:8px;padding:8px 16px;background:#0A1E3F;color:#fadb24;border-radius:8px;font-weight:700;text-decoration:none;'>Book Free Consultation →</a>"
        },
        // Thanks
        {
            keywords: ["thank you", "thanks", "helpful", "appreciate", "great", "perfect", "awesome"],
            response: "You're very welcome! 😊 I'm always here if you have more questions.<br><br>🔗 <strong>Quick links:</strong><br><a href='services.html' style='color:#00bdff;font-weight:bold;'>Our Services</a> | <a href='pricing.html' style='color:#00bdff;font-weight:bold;'>Pricing</a> | <a href='contact.html' style='color:#00bdff;font-weight:bold;'>Book a Call</a>"
        },
        // Digital Marketing
        {
            keywords: ["digital marketing", "marketing", "grow", "growth", "scale", "brand"],
            response: "📊 Our full <strong>Digital Marketing</strong> service covers:<br><br>✅ SEO & PPC management<br>✅ Social media marketing<br>✅ Content marketing<br>✅ Email campaigns<br>✅ Analytics & reporting<br><br>💰 <strong>Starting from $1,500/month</strong><br><br>We build a complete digital strategy tailored to your goals and budget. Would you like to see what's possible for your business?",
            chips: ["Get a strategy session", "See case studies", "View pricing"]
        }
    ];

    // AI Context and Follow-up Questions Engine
    let conversationState = {
        askedQuestions: 0,
        knowsIndustry: false,
        knowsGoal: false
    };

    const followUpQuestions = [
        "By the way, what industry is your business in?",
        "What is your primary goal right now? (e.g., getting more leads, brand awareness)",
        "Are you currently running any digital marketing campaigns?",
        "What's your biggest challenge with marketing right now?"
    ];

    const generateResponse = (message) => {
        message = message.toLowerCase();
        let baseResponse = "";
        let foundMatch = false;

        // Find match in knowledge base
        for (const item of knowledgeBase) {
            for (const keyword of item.keywords) {
                if (message.includes(keyword)) {
                    // Update suggestion chips if available
                    if (item.chips) {
                        const suggestions = document.getElementById('chat-suggestions');
                        if (suggestions) {
                            suggestions.innerHTML = item.chips.map(c => `<button class="suggestion-chip">${c}</button>`).join('');
                            suggestions.style.display = 'flex';
                            const chips = suggestions.querySelectorAll('.suggestion-chip');
                            chips.forEach(chip => {
                                chip.onclick = () => {
                                    chatInput.value = chip.innerText;
                                    attemptSend();
                                    suggestions.style.display = 'none';
                                };
                            });
                        }
                    }
                    baseResponse = item.response;
                    foundMatch = true;
                    break;
                }
            }
            if (foundMatch) break;
        }

        // Default fallback
        if (!foundMatch) {
            baseResponse = "That's a great question! While I might not have a specific answer for that, our expert team will. 🙌<br><br>👉 <a href='contact.html' style='color:#00FFFF;font-weight:bold;'>Contact our team directly</a> for a personalized answer, or ask me about our <strong>services, pricing, or process</strong>!";
        }

        // --- Proactive Intelligence Follow-up ---
        // If the AI hasn't asked a question recently and the user didn't ask a closing question
        conversationState.askedQuestions++;

        if (conversationState.askedQuestions % 2 === 0 && !message.includes("bye") && !message.includes("thank")) {
            // Pick a random question that makes sense
            const randomFollowUp = followUpQuestions[Math.floor(Math.random() * followUpQuestions.length)];
            baseResponse += `<br><br><span style="color:#64748b; font-size:0.9em;"><em>${randomFollowUp}</em></span>`;
        }

        return baseResponse;
    };

    const attemptSend = () => {
        const text = chatInput.value.trim();
        if (!text) return;

        // 1. Add User Message
        const userDiv = document.createElement('div');
        userDiv.className = 'chat-message-user';
        userDiv.textContent = text;
        chatBody.appendChild(userDiv);

        // Save and clear input
        const userQuery = text;
        chatInput.value = '';
        scrollToBottom();

        // 2. Add Typing Indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        chatBody.appendChild(typingDiv);
        scrollToBottom();

        // 3. Process AI Response realistically (delay of 1-2 seconds)
        const delay = Math.random() * (1800 - 800) + 800; // Random delay between 0.8s and 1.8s

        setTimeout(() => {
            // Remove typing indicator
            chatBody.removeChild(typingDiv);

            // Fetch answer from knowledge engine
            const aiResponse = generateResponse(userQuery);

            // Append AI Answer
            const aiDiv = document.createElement('div');
            aiDiv.className = 'chat-message-ai';
            aiDiv.innerHTML = aiResponse; // Use innerHTML to allow bold/links
            chatBody.appendChild(aiDiv);
            scrollToBottom();

        }, delay);
    };

    // Proactive Intelligence
    let chatActive = false;
    let suggestionShown = false;

    const showSuggestions = () => {
        const suggestions = document.getElementById('chat-suggestions');
        if (suggestions) suggestions.style.display = 'flex';

        const chips = suggestions?.querySelectorAll('.suggestion-chip');
        chips?.forEach(chip => {
            chip.onclick = () => {
                const text = chip.innerText;
                chatInput.value = text;
                attemptSend();
                if (suggestions) suggestions.style.display = 'none';
            };
        });
    };

    const addMessage = (message, type) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message-${type}`;
        msgDiv.innerHTML = message;
        chatBody.appendChild(msgDiv);
        scrollToBottom();
    };

    const triggerProactiveMessage = () => {
        if (!modal.classList.contains('chat-open') && !suggestionShown) {
            setTimeout(() => {
                if (!modal.classList.contains('chat-open')) {
                    addMessage("Hello! 👋 I noticed you're exploring Trendtactics. I'm Trendy, your growth assistant. Do you have any questions about our digital marketing or AI services?", 'ai');
                    suggestionShown = true;
                    showSuggestions();
                    fabButton.style.boxShadow = '0 0 20px #fadb24';
                }
            }, 10000); // 10 seconds delay
        }
    };

    triggerProactiveMessage();

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            chatActive = true;
            attemptSend();
        }
    });

    sendBtn.addEventListener('click', () => {
        chatActive = true;
        attemptSend();
    });
});
