// Trendtactics Digital - Allen: Intelligent Chat Assistant
// Advanced knowledge base with proactive questioning and contextual responses

(function () {
    'use strict';

    // ===== COMPREHENSIVE KNOWLEDGE BASE =====
    const KNOWLEDGE_BASE = {
        // Company info
        company: {
            name: "Trendtactics Digital",
            founder: "Akinola Olujobi",
            founded: "2020",
            locations: "Lagos, London, Toronto, and NYC",
            tagline: "We Engineer Digital Growth",
            description: "A full-service digital marketing agency combining strategy, creativity, and AI technology to transform businesses worldwide.",
            website: "https://trendtacticsdigital.com"
        },

        // Services with details
        services: {
            webDevelopment: {
                name: "Web Development",
                desc: "Custom, responsive websites built to convert visitors into customers. Includes SEO optimization, fast loading, and custom CMS.",
                price: "Starting from $2,500",
                link: "service-web-development.html",
                deliverables: ["Responsive design", "SEO optimization", "Custom CMS", "Fast loading speeds", "Security & SSL"]
            },
            appDevelopment: {
                name: "App Development",
                desc: "Native and cross-platform mobile apps for iOS and Android. Built with scalability and user experience in mind.",
                price: "Starting from $5,000",
                link: "service-app-development.html",
                deliverables: ["iOS & Android apps", "Cross-platform solutions", "API integration", "App Store submission"]
            },
            digitalMarketing: {
                name: "Digital Marketing",
                desc: "Data-driven marketing campaigns including SEO, PPC, content, and analytics to drive real measurable results.",
                price: "Starting from $1,500/month",
                link: "service-digital-marketing.html",
                deliverables: ["SEO & PPC", "Social media marketing", "Content marketing", "Analytics & reporting"]
            },
            socialMedia: {
                name: "Social Media Marketing",
                desc: "Strategic social media management and growth across Instagram, Facebook, LinkedIn, TikTok, and more.",
                price: "Starting from $800/month",
                link: "service-social-media-marketing.html",
                deliverables: ["Content creation", "Community management", "Growth strategy", "Analytics"]
            },
            facebookAds: {
                name: "Facebook & Meta Ads",
                desc: "High-converting Facebook and Instagram ad campaigns with targeted audiences and optimized spend.",
                price: "Starting from $1,000/month + ad spend",
                link: "service-facebook-ads.html",
                deliverables: ["Campaign setup", "Audience targeting", "Creative development", "A/B testing", "Weekly reports"]
            },
            contentCreation: {
                name: "Content Creation",
                desc: "Professional video, photography, copywriting, and graphics that tell your brand story and engage your audience.",
                price: "Starting from $500/month",
                link: "service-content-creation.html",
                deliverables: ["Video production", "Photography", "Copywriting", "Graphic design", "Blog content"]
            },
            emailMarketing: {
                name: "Email Marketing",
                desc: "Automated email sequences and newsletters that nurture leads and drive repeat business.",
                price: "Starting from $600/month",
                link: "service-email-marketing.html",
                deliverables: ["Email strategy", "Template design", "Automation sequences", "List management", "Analytics"]
            }
        },

        // Pricing packages
        pricing: {
            starter: { name: "Starter", price: "$500/month", features: "SEO, Social Media (2 platforms), Monthly report" },
            growth: { name: "Growth", price: "$1,500/month", features: "Everything in Starter + Ads management, Content creation, Email marketing" },
            enterprise: { name: "Enterprise", price: "Custom", features: "Full-service: Web dev, All marketing channels, Dedicated manager, 24/7 support" },
            link: "pricing.html"
        },

        // Process
        process: [
            { step: 1, title: "Discovery Call", desc: "We learn about your business goals, target audience, and current challenges." },
            { step: 2, title: "Strategy & Proposal", desc: "Our team crafts a custom digital strategy tailored to your budget and goals." },
            { step: 3, title: "Onboarding", desc: "We set up all tools, accounts, and workflows and introduce you to your dedicated manager." },
            { step: 4, title: "Execution", desc: "Our experts launch campaigns, build assets, and start driving growth." },
            { step: 5, title: "Reporting & Optimization", desc: "You receive regular reports and we continuously optimize for better results." }
        ],

        // FAQs
        faqs: {
            timeline: "Results vary by service. SEO typically shows results in 3-6 months. Ads and social media can show results within days to weeks. Web projects are typically delivered within 4-8 weeks.",
            roi: "Our clients typically see 3x average ROI increase. We focus on measurable KPIs so you always know what you're getting.",
            contracts: "We offer flexible month-to-month contracts with a 30-day cancellation notice. No long-term lock-ins — we earn your business every month.",
            support: "We offer 24/7 support for Enterprise clients. Growth and Starter plans have dedicated business-hours support with a 4-hour response time.",
            reporting: "All clients receive monthly performance reports. Growth and Enterprise clients get weekly updates.",
            industries: "We work with e-commerce, SaaS, real estate, healthcare, fashion, restaurants, and many other industries.",
            location: "We serve clients globally from our offices in Lagos, London, Toronto, and NYC.",
            academy: "Our Trendtactics Academy offers courses and resources to help business owners learn digital marketing. Visit academy.trendtacticsdigital.com"
        },

        // Contact info
        contact: {
            page: "contact.html",
            consultation: "Book a free consultation at contact.html",
            quiz: "Not sure what you need? Take our Growth Quiz at quiz.html"
        }
    };

    // ===== CONVERSATION STATE =====
    const conversationState = {
        history: [],
        askedFollowUp: false,
        userBusiness: null,
        stage: 'greeting' // greeting, discovering, helping, closing
    };

    // ===== SMART RESPONSE ENGINE =====
    function getSmartResponse(userInput) {
        const input = userInput.toLowerCase().trim();
        const state = conversationState;

        // Update stage based on conversation length
        if (state.history.length > 6) state.stage = 'helping';

        // --- Intent Detection ---

        // Greetings
        if (/^(hi|hello|hey|good morning|good afternoon|good evening|howdy|yo)\b/.test(input)) {
            return {
                text: "Hello! 👋 I'm **Allen**, Trendtactics Digital's AI assistant. I'm here to help you discover how we can grow your business.\n\nTo give you the best advice, could you tell me: **what does your business do?**",
                followUp: "What industry or niche are you in?",
                suggestedReplies: ["I run an e-commerce store", "I have a local business", "I offer professional services", "I run a startup"]
            };
        }

        // What can you do / help
        if (/what can you (do|help|offer)|how can you help/.test(input)) {
            return {
                text: "I can answer any questions about Trendtactics Digital's **services, pricing, process**, and how we help businesses grow. I can also help match you with the right service for your goals.\n\nWhat's your biggest challenge right now?",
                suggestedReplies: ["I need more website traffic", "I want more social media followers", "I need a new website", "I want to run ads"]
            };
        }

        // Business type capture
        if (/e-?commerce|online store|shop|products|sell|retail/.test(input)) {
            state.userBusiness = 'ecommerce';
            return {
                text: "Great! For **e-commerce businesses**, we typically recommend a combination of:\n\n• 📢 **Facebook & Instagram Ads** — to drive immediate sales\n• 🔍 **SEO & Content** — for long-term organic traffic\n• 📧 **Email Marketing** — to retain customers and boost repeat purchases\n\nWould you like to know more about any of these, or get a **free strategy consultation**?",
                suggestedReplies: ["Tell me about Facebook Ads", "Tell me about Email Marketing", "Book a free consultation", "How much does it cost?"]
            };
        }

        if (/local business|brick and mortar|restaurant|salon|clinic|shop|store/.test(input)) {
            state.userBusiness = 'local';
            return {
                text: "Perfect! For **local businesses**, we usually focus on:\n\n• 🗺️ **Local SEO** — so customers find you on Google Maps\n• 📱 **Social Media** — to build community and loyalty\n• 📣 **Facebook/Instagram Ads** — hyper-targeted to your area\n• 🌐 **Website** — a professional online presence\n\nWhat's your top priority right now?",
                suggestedReplies: ["I need a website", "Help me with local SEO", "I want to run local ads", "What's your pricing?"]
            };
        }

        if (/startup|new business|just started|launching/.test(input)) {
            state.userBusiness = 'startup';
            return {
                text: "Exciting! We **love working with startups**. For new businesses, we recommend:\n\n• 🌐 **Brand Identity + Website** — your foundation\n• 📣 **Social Media Presence** — build your audience from day one\n• 🎯 **Targeted Ads** — get your first customers fast\n• 📧 **Email List Building** — own your audience\n\nWould you like to start with a **free strategy call** to map out the right approach?",
                suggestedReplies: ["Yes, let's book a call", "What's the minimum budget?", "Tell me about website pricing", "What results can I expect?"]
            };
        }

        // Services questions
        if (/service|what do you (do|offer|provide)|offer/.test(input) && !/social|email|facebook|content|app|web/.test(input)) {
            const serviceList = Object.values(KNOWLEDGE_BASE.services)
                .map(s => `• **${s.name}** — ${s.desc.split('.')[0]}`)
                .join('\n');
            return {
                text: `We offer **7 core services** to grow your business:\n\n${serviceList}\n\nWhich area are you most interested in?`,
                suggestedReplies: ["Web Development", "Social Media Marketing", "Facebook & Meta Ads", "Email Marketing"]
            };
        }

        // Web Development
        if (/web(site)?\s*(dev|design|build|create)|new website|redesign|website/.test(input)) {
            const s = KNOWLEDGE_BASE.services.webDevelopment;
            return {
                text: `Our **${s.name}** service includes:\n\n${s.deliverables.map(d => `✅ ${d}`).join('\n')}\n\n💰 **${s.price}**\n\nTimeline: Typically **4-8 weeks** from start to launch.\n\nWould you like to discuss your project or get a custom quote?`,
                suggestedReplies: ["Get a custom quote", "How long does it take?", "Can I see examples?", "Book a free consultation"],
                link: s.link
            };
        }

        // App Development
        if (/app|mobile|ios|android/.test(input)) {
            const s = KNOWLEDGE_BASE.services.appDevelopment;
            return {
                text: `Our **${s.name}** service delivers:\n\n${s.deliverables.map(d => `✅ ${d}`).join('\n')}\n\n💰 **${s.price}**\n\nWe build for both iOS and Android with a focus on UX and performance. What kind of app do you have in mind?`,
                suggestedReplies: ["E-commerce app", "Service booking app", "Social platform", "Get a quote"],
                link: s.link
            };
        }

        // Social Media
        if (/social media|instagram|tiktok|linkedin|twitter|x\.com/.test(input)) {
            const s = KNOWLEDGE_BASE.services.socialMedia;
            return {
                text: `Our **${s.name}** service covers:\n\n${s.deliverables.map(d => `✅ ${d}`).join('\n')}\n\n💰 **${s.price}**\n\nWe manage your presence across all major platforms so you can focus on running your business. Which platforms are most important to you?`,
                suggestedReplies: ["Instagram & TikTok", "LinkedIn (B2B)", "Facebook", "All platforms", "What are the results?"],
                link: s.link
            };
        }

        // Facebook Ads / Paid Ads
        if (/facebook|meta|ads|advertising|paid|ppc|google ads/.test(input)) {
            const s = KNOWLEDGE_BASE.services.facebookAds;
            return {
                text: `Our **${s.name}** service includes:\n\n${s.deliverables.map(d => `✅ ${d}`).join('\n')}\n\n💰 **${s.price}**\n\n📊 **Our ads clients average a 3x ROAS (Return on Ad Spend)**.\n\nDo you currently run any ads, or would this be your first campaign?`,
                suggestedReplies: ["I run ads already and want better results", "This is my first time", "What's the minimum ad budget?", "Book a free audit"],
                link: s.link
            };
        }

        // Email Marketing
        if (/email|newsletter|automation|drip/.test(input)) {
            const s = KNOWLEDGE_BASE.services.emailMarketing;
            return {
                text: `Our **${s.name}** service delivers:\n\n${s.deliverables.map(d => `✅ ${d}`).join('\n')}\n\n💰 **${s.price}**\n\nEmail marketing has the **highest ROI of any digital channel** — on average $42 for every $1 spent. Do you currently have an email list?`,
                suggestedReplies: ["Yes, I have a list", "No, starting from zero", "How many emails per month?", "Book a consultation"],
                link: s.link
            };
        }

        // Content Creation
        if (/content|video|photo|copywriting|blog|graphic|creative/.test(input)) {
            const s = KNOWLEDGE_BASE.services.contentCreation;
            return {
                text: `Our **${s.name}** service includes:\n\n${s.deliverables.map(d => `✅ ${d}`).join('\n')}\n\n💰 **${s.price}**\n\nGreat content is the fuel for all your marketing. What type of content do you need most?`,
                suggestedReplies: ["Videos for social media", "Blog articles for SEO", "Product photography", "All of the above"],
                link: s.link
            };
        }

        // Pricing questions
        if (/price|cost|how much|fee|charge|budget|afford|expensive/.test(input)) {
            const p = KNOWLEDGE_BASE.pricing;
            return {
                text: `Here's an overview of our pricing packages:\n\n**🌱 ${p.starter.name}** — ${p.starter.price}\n${p.starter.features}\n\n**🚀 ${p.growth.name}** — ${p.growth.price}\n${p.growth.features}\n\n**🏢 ${p.enterprise.name}** — ${p.enterprise.price}\n${p.enterprise.features}\n\nWe also offer **custom packages** tailored to your specific needs. Want a personalized quote?`,
                suggestedReplies: ["Get a custom quote", "What's included in Growth?", "I have a limited budget", "Book a free consultation"],
                link: p.link
            };
        }

        // Timeline / Results questions
        if (/how long|timeline|when|results|how soon|how fast/.test(input)) {
            return {
                text: `Here's a realistic timeline for our services:\n\n⚡ **Ads (Facebook/Google)** — Results in **1-2 weeks**\n📱 **Social Media** — Growth visible in **4-8 weeks**\n🔍 **SEO** — Organic leads in **3-6 months**\n🌐 **Website** — Launched in **4-8 weeks**\n📧 **Email Marketing** — Revenue in **2-4 weeks**\n\nWe set clear goals and milestones so you're never in the dark. What's your business goal for the next 90 days?`
            };
        }

        // Process / How it works
        if (/how (does it|do you|does the process|it work)|process|steps|onboarding|get started|start/.test(input)) {
            const steps = KNOWLEDGE_BASE.process.map(p => `**Step ${p.step}: ${p.title}**\n${p.desc}`).join('\n\n');
            return {
                text: `Here's how working with us looks:\n\n${steps}\n\nThe whole onboarding process takes just **1-2 business days**. Ready to take Step 1?`,
                suggestedReplies: ["Book a free discovery call", "Tell me more about pricing", "What results can I expect?"]
            };
        }

        // ROI / Results proof
        if (/roi|results|proof|case study|worked|success|testimonial|portfolio/.test(input)) {
            return {
                text: `Here's what our clients have achieved with us:\n\n📈 **3x average ROI increase**\n✅ **98% client satisfaction rate**\n🚀 **50+ successful projects**\n⭐ **10,000+ customers helped**\n\nWe've worked with businesses in e-commerce, real estate, healthcare, SaaS, and more across Nigeria, UK, USA, and Canada.\n\nWant to see our portfolio or discuss what results are possible for YOUR business?`,
                suggestedReplies: ["View portfolio", "Book a free consultation", "What industry do you specialize in?"]
            };
        }

        // Contract / Commitment
        if (/contract|commitment|locked|cancel|month-to-month|flexible/.test(input)) {
            return {
                text: `Great question! We offer **flexible month-to-month contracts** — no long-term lock-ins.\n\n• ✅ 30-day cancellation notice\n• ✅ You own all your assets and data\n• ✅ No hidden fees\n• ✅ Transparent monthly reporting\n\nWe earn your business every single month. 💪 Any other questions before you get started?`,
                suggestedReplies: ["What's included in the contract?", "Book a free consultation", "Tell me about pricing"]
            };
        }

        // Support
        if (/support|help|contact|reach|respond|response time/.test(input)) {
            return {
                text: `Our support structure:\n\n🕐 **Starter Plan** — Business hours, 24hr response\n⚡ **Growth Plan** — Business hours, 4hr response\n🔥 **Enterprise Plan** — 24/7 priority support\n\nYou can also reach us via:\n📧 Our contact page\n📞 Book a call directly\n💬 This chat!\n\nWould you like to schedule a free consultation?`,
                suggestedReplies: ["Book a consultation", "What's your email?", "Tell me about pricing"]
            };
        }

        // Location / Where
        if (/where|location|based|office|country|lagos|nigeria|london|uk|canada|usa/.test(input)) {
            return {
                text: `We're a **global digital agency** with offices in:\n\n🇳🇬 Lagos, Nigeria\n🇬🇧 London, UK\n🇨🇦 Toronto, Canada\n🇺🇸 New York City, USA\n\nWe serve clients **worldwide** and work remotely with businesses across all time zones. Where are you based?`,
                suggestedReplies: ["I'm in Nigeria", "I'm in the UK", "I'm in the USA", "I'm in another country"]
            };
        }

        // Academy
        if (/academy|course|learn|training|teach|diy|self/.test(input)) {
            return {
                text: `We have our own **Trendtactics Academy**! 🎓\n\nIt offers courses and resources to help business owners learn:\n• Digital Marketing fundamentals\n• Social Media strategy\n• SEO techniques\n• Email marketing\n• Business growth strategies\n\nVisit **academy.trendtacticsdigital.com** to enroll. Would you prefer to learn yourself, or have our team handle it for you?`,
                suggestedReplies: ["Visit the Academy", "I'd rather have your team handle it", "What's the difference in results?"]
            };
        }

        // Book / Consult / Meet
        if (/book|schedule|consult|free call|meeting|appointment|talk/.test(input)) {
            return {
                text: `Let's make it happen! 🎯\n\n**Book your FREE strategy consultation** — we'll review your current digital presence, identify growth opportunities, and recommend the best services for your goals.\n\n📅 Available Monday-Friday, 9am-6pm (your timezone)\n⏱️ 30-minute call, zero commitment\n\n**Ready to book?**`,
                suggestedReplies: ["Book now →"],
                cta: { text: "Book a Free Consultation", link: "contact.html" }
            };
        }

        // Goodbye
        if (/bye|goodbye|thanks|thank you|that's all|all good/.test(input)) {
            return {
                text: `It was a pleasure chatting! 😊\n\nFeel free to come back anytime, or:\n\n📋 **Read our full services** — services.html\n💰 **View pricing** — pricing.html\n📞 **Book a free consultation** — contact.html\n\nLet's grow your business together! 🚀`
            };
        }

        // Minimum budget / small budget
        if (/small budget|limited|tight|cheap|affordable|can't afford/.test(input)) {
            return {
                text: `We work with businesses of **all sizes and budgets**! 💚\n\nFor smaller budgets, we recommend:\n\n🌱 **Starter Package** — from $500/month\n• Focused on 1-2 channels that give you the best bang for your buck\n\nOr start with a **one-time project** like a website ($2,500) that you own forever and builds your foundation for growth.\n\nWhat's your current monthly marketing budget?`,
                suggestedReplies: ["Less than $500/month", "$500-$1,500/month", "$1,500+/month", "Not sure — help me decide"]
            };
        }

        // ===== DEFAULT: INTELLIGENT FALLBACK WITH FOLLOW-UP =====
        // Try to extract what they might need and ask a clarifying question
        const followUpQuestions = [
            "Could you tell me more about your business — what do you sell or offer?",
            "What's the #1 result you're hoping to achieve in the next 3 months?",
            "Are you looking to get more website traffic, social media followers, or paying customers?",
            "Do you currently have a website and social media presence?"
        ];
        const randomFollowUp = followUpQuestions[state.history.length % followUpQuestions.length];

        return {
            text: `I want to make sure I give you the most relevant advice! 🤔\n\n${randomFollowUp}`,
            suggestedReplies: ["Tell me about all services", "View pricing", "Book a free consultation", "How do you work?"]
        };
    }

    // ===== CHAT UI BUILDER =====
    function initChatbot() {
        if (document.getElementById('chatbot-toggle')) return;

        // --- FAB Button ---
        const chatbotBtn = document.createElement('button');
        chatbotBtn.id = 'chatbot-toggle';
        chatbotBtn.setAttribute('aria-label', 'Open chat with Allen');
        chatbotBtn.innerHTML = '<img src="img/professional-ceo.png" alt="Allen" style="width: 100%; height: 100%; object-fit: cover; display: block;">';
        chatbotBtn.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            width: 62px;
            height: 62px;
            border-radius: 50%;
            background: #ffffff;
            border: 2px solid #0047FF;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(0, 0, 0,0.35);
            z-index: 99999;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            overflow: hidden;
        `;

        // Notification badge
        const badge = document.createElement('span');
        badge.id = 'chat-badge';
        badge.textContent = '1';
        badge.style.cssText = `
            position: absolute;
            top: -4px;
            right: -4px;
            background: #ef4444;
            color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            font-size: 0.7rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: sans-serif;
        `;
        chatbotBtn.style.position = 'fixed';
        chatbotBtn.appendChild(badge);

        chatbotBtn.addEventListener('mouseenter', () => {
            chatbotBtn.style.transform = 'scale(1.08) translateY(-2px)';
            chatbotBtn.style.boxShadow = '0 8px 30px rgba(0, 0, 0,0.45)';
        });
        chatbotBtn.addEventListener('mouseleave', () => {
            chatbotBtn.style.transform = 'scale(1)';
            chatbotBtn.style.boxShadow = '0 4px 20px rgba(0, 0, 0,0.35)';
        });

        // --- Chat Window ---
        const chatbotWindow = document.createElement('div');
        chatbotWindow.id = 'chatbot-window';
        chatbotWindow.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 24px;
            width: 370px;
            max-height: 580px;
            background: #ffffff;
            border-radius: 20px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 20px 60px rgba(0,0,0,0.15);
            display: none;
            flex-direction: column;
            z-index: 99998;
            overflow: hidden;
            font-family: 'Inter', sans-serif;
        `;

        chatbotWindow.innerHTML = `
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #000000, #1a3a6e); color: white; padding: 16px 18px; display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden; border: 2px solid rgba(250,219,36,0.4); display: flex; align-items: center; justify-content: center;">
                        <img src="img/professional-ceo.png" alt="Allen" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <div>
                        <div style="font-weight: 700; font-size: 0.95rem;">Allen</div>
                        <div style="font-size: 0.75rem; opacity: 0.8; display: flex; align-items: center; gap: 5px;">
                            <span style="width: 7px; height: 7px; background: #22c55e; border-radius: 50%; display: inline-block;"></span>
                            Trendtactics AI Assistant
                        </div>
                    </div>
                </div>
                <button id="chatbot-close" style="background: rgba(255,255,255,0.1); border: none; color: white; width: 32px; height: 32px; border-radius: 8px; cursor: pointer; font-size: 1.1rem; display: flex; align-items: center; justify-content: center; transition: background 0.2s;">&times;</button>
            </div>

            <!-- Messages -->
            <div id="chatbot-messages" style="padding: 16px; flex: 1; overflow-y: auto; max-height: 370px; display: flex; flex-direction: column; gap: 12px; background: #f8fafc;">
                <div class="chat-msg bot-msg" style="background: white; border-radius: 16px 16px 16px 4px; padding: 12px 14px; max-width: 85%; border: 1px solid #e2e8f0; box-shadow: 0 1px 4px rgba(0,0,0,0.05);">
                    <p style="margin: 0; font-size: 0.88rem; line-height: 1.5; color: #1e293b;">👋 Hi! I'm <strong>Allen</strong>, your Trendtactics Digital assistant.<br><br>I can help you find the right digital services to grow your business. What brings you here today?</p>
                </div>
            </div>

            <!-- Quick replies -->
            <div id="quick-replies" style="padding: 10px 14px; display: flex; gap: 6px; flex-wrap: wrap; background: #f8fafc; border-top: 1px solid #e2e8f0;">
                <button class="quick-reply-chip" data-q="What services do you offer?">Our services</button>
                <button class="quick-reply-chip" data-q="What are your pricing plans?">Pricing</button>
                <button class="quick-reply-chip" data-q="How do I get started?">Get started</button>
                <button class="quick-reply-chip" data-q="Book a free consultation">Free consultation</button>
            </div>

            <!-- Input -->
            <div style="padding: 12px 14px; background: white; border-top: 1px solid #e2e8f0;">
                <form id="chatbot-form" style="display: flex; gap: 8px; align-items: center;">
                    <input id="chatbot-input" type="text" placeholder="Type your question..." style="flex: 1; padding: 10px 14px; border: 1.5px solid #e2e8f0; border-radius: 12px; outline: none; font-size: 0.88rem; font-family: inherit; color: #1e293b; transition: border 0.2s;" />
                    <button type="submit" style="width: 38px; height: 38px; background: #000000; color: #fadb24; border: none; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.2s;">
                        <i class="fas fa-paper-plane" style="font-size: 0.85rem;"></i>
                    </button>
                </form>
                <p style="text-align: center; font-size: 0.7rem; color: #94a3b8; margin: 6px 0 0;">Powered by Trendtactics Digital 🚀</p>
            </div>
        `;

        // Style quick reply chips
        const chipStyle = document.createElement('style');
        chipStyle.textContent = `
            .quick-reply-chip {
                background: white;
                border: 1.5px solid #e2e8f0;
                border-radius: 20px;
                padding: 5px 12px;
                font-size: 0.78rem;
                cursor: pointer;
                color: #000000;
                font-weight: 600;
                font-family: 'Inter', sans-serif;
                transition: all 0.2s;
                white-space: nowrap;
            }
            .quick-reply-chip:hover {
                background: #000000;
                color: #fadb24;
                border-color: #000000;
            }
            .chat-msg {
                animation: chatSlide 0.25s ease;
            }
            @keyframes chatSlide {
                from { opacity: 0; transform: translateY(8px); }
                to { opacity: 1; transform: translateY(0); }
            }
            #chatbot-input:focus {
                border-color: #000000 !important;
            }
            #chatbot-close:hover {
                background: rgba(255,255,255,0.2) !important;
            }
        `;
        document.head.appendChild(chipStyle);

        document.body.appendChild(chatbotBtn);
        document.body.appendChild(chatbotWindow);

        // ===== EVENT LISTENERS =====
        chatbotBtn.addEventListener('click', () => {
            const isVisible = chatbotWindow.style.display === 'flex';
            chatbotWindow.style.display = isVisible ? 'none' : 'flex';
            badge.style.display = 'none'; // Hide badge on open
            if (!isVisible) {
                document.getElementById('chatbot-input').focus();
            }
        });

        document.getElementById('chatbot-close').addEventListener('click', () => {
            chatbotWindow.style.display = 'none';
        });

        // Quick reply chips
        document.getElementById('quick-replies').addEventListener('click', (e) => {
            const chip = e.target.closest('.quick-reply-chip');
            if (chip) handleUserMessage(chip.dataset.q);
        });

        // Form submit
        document.getElementById('chatbot-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('chatbot-input');
            const text = input.value.trim();
            if (text) {
                handleUserMessage(text);
                input.value = '';
            }
        });

        // ===== PROACTIVE GREETING =====
        setTimeout(() => {
            if (chatbotWindow.style.display !== 'flex') {
                badge.textContent = '1';
                badge.style.display = 'flex';
                chatbotBtn.style.animation = 'pulse 1s ease 3';
                const pulseStyle = document.createElement('style');
                pulseStyle.textContent = `
                    @keyframes pulse {
                        0%, 100% { box-shadow: 0 4px 20px rgba(0, 0, 0,0.35); }
                        50% { box-shadow: 0 4px 30px rgba(0, 0, 0,0.6), 0 0 0 8px rgba(0, 0, 0,0.1); }
                    }
                `;
                document.head.appendChild(pulseStyle);
            }
        }, 8000);
    }

    // ===== MESSAGE HANDLER =====
    function handleUserMessage(userText) {
        const messagesDiv = document.getElementById('chatbot-messages');
        const quickReplies = document.getElementById('quick-replies');

        // Show user message
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-msg';
        userMsg.style.cssText = 'display: flex; justify-content: flex-end;';
        userMsg.innerHTML = `<div style="background: #000000; color: white; border-radius: 16px 16px 4px 16px; padding: 10px 14px; max-width: 80%; font-size: 0.88rem; line-height: 1.5;">${escapeHTML(userText)}</div>`;
        messagesDiv.appendChild(userMsg);

        // Track history
        conversationState.history.push({ role: 'user', text: userText });

        // Show typing indicator
        const typingEl = document.createElement('div');
        typingEl.id = 'typing-indicator';
        typingEl.style.cssText = 'display: flex; align-items: center; gap: 6px;';
        typingEl.innerHTML = `
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 16px 16px 16px 4px; padding: 10px 16px; display: flex; gap: 4px; align-items: center;">
                <span style="width: 7px; height: 7px; background: #94a3b8; border-radius: 50%; animation: bounce 0.8s infinite;"></span>
                <span style="width: 7px; height: 7px; background: #94a3b8; border-radius: 50%; animation: bounce 0.8s 0.1s infinite;"></span>
                <span style="width: 7px; height: 7px; background: #94a3b8; border-radius: 50%; animation: bounce 0.8s 0.2s infinite;"></span>
            </div>
        `;
        const bounceStyleExists = document.getElementById('bounce-style');
        if (!bounceStyleExists) {
            const bs = document.createElement('style');
            bs.id = 'bounce-style';
            bs.textContent = `@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }`;
            document.head.appendChild(bs);
        }
        messagesDiv.appendChild(typingEl);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;

        // Get response with delay to feel natural
        setTimeout(() => {
            // Remove typing indicator
            typingEl.remove();

            // Get smart response
            const response = getSmartResponse(userText);
            conversationState.history.push({ role: 'bot', text: response.text });

            // Format text (bold **text**)
            const formatted = response.text
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n/g, '<br>');

            const botMsg = document.createElement('div');
            botMsg.className = 'chat-msg bot-msg';
            botMsg.style.cssText = 'background: white; border-radius: 16px 16px 16px 4px; padding: 12px 14px; max-width: 88%; border: 1px solid #e2e8f0; box-shadow: 0 1px 4px rgba(0,0,0,0.05);';

            let msgContent = `<p style="margin: 0; font-size: 0.88rem; line-height: 1.55; color: #1e293b;">${formatted}</p>`;

            // Add CTA button if present
            if (response.cta) {
                msgContent += `<a href="${response.cta.link}" style="display: inline-block; margin-top: 10px; padding: 8px 16px; background: #000000; color: #fadb24; border-radius: 8px; font-size: 0.82rem; font-weight: 700; text-decoration: none;">${response.cta.text} →</a>`;
            }

            botMsg.innerHTML = msgContent;
            messagesDiv.appendChild(botMsg);

            // Update quick reply chips
            if (response.suggestedReplies && response.suggestedReplies.length > 0) {
                quickReplies.innerHTML = response.suggestedReplies
                    .map(r => `<button class="quick-reply-chip" data-q="${r}">${r}</button>`)
                    .join('');
            } else {
                quickReplies.innerHTML = `
                    <button class="quick-reply-chip" data-q="Tell me more about pricing">Pricing</button>
                    <button class="quick-reply-chip" data-q="Book a free consultation">Book consultation</button>
                    <button class="quick-reply-chip" data-q="What services do you offer?">Services</button>
                `;
            }

            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }, 800 + Math.random() * 400); // Natural typing delay
    }

    function escapeHTML(str) {
        return str.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
    }

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChatbot);
    } else {
        initChatbot();
    }
})();
