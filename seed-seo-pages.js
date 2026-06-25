const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://wtgwxnhnqdnbzpetltrt.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0Z3d4bmhucWRuYnpwZXRsdHJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNjQ2NjUsImV4cCI6MjA4MDY0MDY2NX0.3eblmq4lsnDQU33M9XqZpBqux9bi9hX2G0yUuPScHJA';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const pages = [
  {
    slug: 'services/social-media-management/lagos',
    title: 'Social Media Management Agency in Lagos | Trendtactics Digital',
    service: 'Social Media Management',
    location: 'Lagos',
    industry: 'Digital Marketing',
    h1: 'Social Media Management in Lagos',
    meta_description: 'Expert social media management services in Lagos. Grow your brand, engage your audience, and drive conversions with our AI-powered strategies.',
    content: `
      <h2>Dominate the Lagos Digital Landscape</h2>
      <p>Lagos is a fast-paced market. To succeed here, your brand needs to stand out. Our social media management services combine creative storytelling with data-driven optimization to build highly engaged online communities.</p>
      <h2>What We Offer in Lagos:</h2>
      <ul>
        <li><strong>Content Creation:</strong> Professional photography, custom graphics, and short-form video content designed to capture attention.</li>
        <li><strong>Community Management:</strong> Proactive engagement with your audience, direct message response, and comment moderation.</li>
        <li><strong>Social Advertising:</strong> High-performing ad campaigns on Instagram, Facebook, LinkedIn, and TikTok.</li>
      </ul>
    `,
    schema_markup: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Trendtactics Digital - Lagos SMM Branch",
      "image": "https://trendtacticsdigital.com/img/Trendtactics_logo.jpg",
      "url": "https://trendtacticsdigital.com/services/social-media-management/lagos",
      "telephone": "+234-800-000-0000",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Lagos",
        "addressCountry": "NG"
      },
      "priceRange": "$$$"
    },
    published: true
  },
  {
    slug: 'services/social-media-management/abuja',
    title: 'Social Media Management Agency in Abuja | Trendtactics Digital',
    service: 'Social Media Management',
    location: 'Abuja',
    industry: 'Digital Marketing',
    h1: 'Social Media Management in Abuja',
    meta_description: 'Leading social media management services in Abuja. Scale your business, build brand loyalty, and drive sales with our AI-driven solutions.',
    content: `
      <h2>Connect with Abuja\'s Elite Market</h2>
      <p>Our Abuja social media management services are tailored to connect businesses, corporate entities, and public figures with their target audience. We design bespoke, professional campaigns that match the capital city\'s expectations.</p>
      <h2>Bespoke Abuja SMM Solutions:</h2>
      <ul>
        <li><strong>Corporate Branding:</strong> Sleek, professional content reflecting your brand\'s authority and values.</li>
        <li><strong>Public Relations Management:</strong> Aligning social media outputs with corporate communication and PR strategy.</li>
        <li><strong>Targeted Lead Generation:</strong> Paid campaign targeting corporate decision-makers and high-value prospects.</li>
      </ul>
    `,
    schema_markup: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Trendtactics Digital - Abuja SMM Branch",
      "image": "https://trendtacticsdigital.com/img/Trendtactics_logo.jpg",
      "url": "https://trendtacticsdigital.com/services/social-media-management/abuja",
      "telephone": "+234-800-000-0000",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Abuja",
        "addressCountry": "NG"
      },
      "priceRange": "$$$"
    },
    published: true
  },
  {
    slug: 'services/social-media-management/port-harcourt',
    title: 'Social Media Management in Port Harcourt | Trendtactics Digital',
    service: 'Social Media Management',
    location: 'Port Harcourt',
    industry: 'Digital Marketing',
    h1: 'Social Media Management in Port Harcourt',
    meta_description: 'Growth-focused social media management in Port Harcourt. Enhance your online presence and engage customers with our creative strategies.',
    content: `
      <h2>Grow Your Brand in Port Harcourt</h2>
      <p>Port Harcourt is a major commercial hub. We help businesses here build strong social media presence to drive local traffic and generate premium leads.</p>
      <h2>Key Features of Port Harcourt SMM:</h2>
      <ul>
        <li><strong>Local Audience Targeting:</strong> Custom campaigns targeting oil-and-gas professionals, local consumers, and businesses.</li>
        <li><strong>Video Content Creation:</strong> Engaging video content showing your brand behind-the-scenes.</li>
        <li><strong>Analytics Tracking:</strong> Transparent reporting on audience growth, click-through rates, and ROI.</li>
      </ul>
    `,
    schema_markup: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Trendtactics Digital - Port Harcourt SMM Branch",
      "image": "https://trendtacticsdigital.com/img/Trendtactics_logo.jpg",
      "url": "https://trendtacticsdigital.com/services/social-media-management/port-harcourt",
      "telephone": "+234-800-000-0000",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Port Harcourt",
        "addressCountry": "NG"
      },
      "priceRange": "$$$"
    },
    published: true
  },
  {
    slug: 'services/seo/lagos',
    title: 'SEO Agency in Lagos | SEO Services | Trendtactics Digital',
    service: 'SEO',
    location: 'Lagos',
    industry: 'Digital Marketing',
    h1: 'SEO Services in Lagos',
    meta_description: 'Top-rated SEO agency in Lagos. Improve your Google rankings, drive organic traffic, and generate leads with our data-driven SEO strategies.',
    content: `
      <h2>Rank #1 on Google in Lagos</h2>
      <p>When potential customers search for your products or services, you need to be at the top. Our Lagos SEO team implements advanced on-page, off-page, and technical SEO strategies to grow your search traffic.</p>
      <h2>Our Lagos SEO Strategy:</h2>
      <ul>
        <li><strong>Local SEO:</strong> Optimizing your Google Business Profile and local keywords to attract customers in your area.</li>
        <li><strong>Technical Audits:</strong> Improving site speed, mobile responsiveness, and clean architecture.</li>
        <li><strong>Premium Link Building:</strong> Securing high-quality backlinks to boost domain authority.</li>
      </ul>
    `,
    schema_markup: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Trendtactics Digital - Lagos SEO Branch",
      "image": "https://trendtacticsdigital.com/img/Trendtactics_logo.jpg",
      "url": "https://trendtacticsdigital.com/services/seo/lagos",
      "telephone": "+234-800-000-0000",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Lagos",
        "addressCountry": "NG"
      },
      "priceRange": "$$$"
    },
    published: true
  },
  {
    slug: 'services/seo/abuja',
    title: 'SEO Agency in Abuja | SEO Services | Trendtactics Digital',
    service: 'SEO',
    location: 'Abuja',
    industry: 'Digital Marketing',
    h1: 'SEO Services in Abuja',
    meta_description: 'Boost your online visibility in Abuja. Our professional SEO services help you rank higher and reach more customers.',
    content: `
      <h2>Dominate Abuja Google Search</h2>
      <p>Enhance your online visibility in the Federal Capital Territory. Our professional SEO services are structured to help businesses in Abuja rank higher, establish domain authority, and reach more customers.</p>
      <h2>What We Focus On:</h2>
      <ul>
        <li><strong>Intent-Based Keywords:</strong> Targeting search terms used by prospective corporate clients and government entities.</li>
        <li><strong>On-Page Content Optimization:</strong> Structuring headings, meta tags, and body content for Google algorithms.</li>
        <li><strong>Mobile-First SEO:</strong> Since most traffic in Nigeria is mobile, we optimize your site to rank on smartphones.</li>
      </ul>
    `,
    schema_markup: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Trendtactics Digital - Abuja SEO Branch",
      "image": "https://trendtacticsdigital.com/img/Trendtactics_logo.jpg",
      "url": "https://trendtacticsdigital.com/services/seo/abuja",
      "telephone": "+234-800-000-0000",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Abuja",
        "addressCountry": "NG"
      },
      "priceRange": "$$$"
    },
    published: true
  },
  {
    slug: 'services/web-design/lagos',
    title: 'Web Design Agency in Lagos | Custom Websites | Trendtactics Digital',
    service: 'Web Design',
    location: 'Lagos',
    industry: 'Technology',
    h1: 'Web Design & Development in Lagos',
    meta_description: 'Creative web design agency in Lagos. We build beautiful, responsive, and high-converting websites tailored to your business goals.',
    content: `
      <h2>Stunning, High-Converting Web Design in Lagos</h2>
      <p>Your website is your online storefront. We build modern, lightning-fast, and secure websites that look amazing and turn visitors into paying customers.</p>
      <h2>Lagos Web Design Features:</h2>
      <ul>
        <li><strong>Custom Layouts:</strong> Zero templates. Every site is custom-crafted to represent your brand unique personality.</li>
        <li><strong>Responsive Design:</strong> Perfect display across desktops, tablets, and smartphones.</li>
        <li><strong>AI & Automation Integration:</strong> Integrating live chatbots, CRM systems, and smart lead collection.</li>
      </ul>
    `,
    schema_markup: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Trendtactics Digital - Lagos Web Design Branch",
      "image": "https://trendtacticsdigital.com/img/Trendtactics_logo.jpg",
      "url": "https://trendtacticsdigital.com/services/web-design/lagos",
      "telephone": "+234-800-000-0000",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Lagos",
        "addressCountry": "NG"
      },
      "priceRange": "$$$"
    },
    published: true
  },
  {
    slug: 'services/web-design/abuja',
    title: 'Web Design Agency in Abuja | Custom Websites | Trendtactics Digital',
    service: 'Web Design',
    location: 'Abuja',
    industry: 'Technology',
    h1: 'Web Design & Development in Abuja',
    meta_description: 'Premium web design services in Abuja. Get a modern, mobile-friendly website that drives growth and represents your brand.',
    content: `
      <h2>Premium Web Development for Abuja Brands</h2>
      <p>Stand out in the capital city. Get a premium, custom website designed to establish credibility and capture high-value prospects.</p>
      <h2>LMS & Web Integration:</h2>
      <ul>
        <li><strong>E-Learning & Portals:</strong> Custom client portals, learning management systems, and members areas.</li>
        <li><strong>E-commerce Systems:</strong> Secure checkout integration with Paystack, Flutterwave, and Stripe.</li>
        <li><strong>High Security:</strong> SSL setups, firewalls, and regular backups to protect your business.</li>
      </ul>
    `,
    schema_markup: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Trendtactics Digital - Abuja Web Design Branch",
      "image": "https://trendtacticsdigital.com/img/Trendtactics_logo.jpg",
      "url": "https://trendtacticsdigital.com/services/web-design/abuja",
      "telephone": "+234-800-000-0000",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Abuja",
        "addressCountry": "NG"
      },
      "priceRange": "$$$"
    },
    published: true
  },
  {
    slug: 'services/digital-marketing/lagos',
    title: 'Digital Marketing Agency in Lagos | Trendtactics Digital',
    service: 'Digital Marketing',
    location: 'Lagos',
    industry: 'Digital Marketing',
    h1: 'Digital Marketing Agency in Lagos',
    meta_description: 'Full-service digital marketing agency in Lagos. AI-powered SEO, social media, PPC, and web design to scale your business.',
    content: `
      <h2>Drive Explosive Business Growth in Lagos</h2>
      <p>We are a full-service marketing agency. We combine SEO, paid advertising, social media, and web design to build cohesive marketing systems that drive revenue.</p>
      <h2>Lagos Digital Marketing Specialties:</h2>
      <ul>
        <li><strong>Paid Ads Management:</strong> High-ROI Google Ads, Facebook Ads, and LinkedIn Ads.</li>
        <li><strong>Conversion Rate Optimization (CRO):</strong> Continuous testing and improvement to convert more traffic.</li>
        <li><strong>Content Marketing:</strong> High-quality blog posts, ebooks, and video content that establish authority.</li>
      </ul>
    `,
    schema_markup: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Trendtactics Digital - Lagos Digital Marketing Branch",
      "image": "https://trendtacticsdigital.com/img/Trendtactics_logo.jpg",
      "url": "https://trendtacticsdigital.com/services/digital-marketing/lagos",
      "telephone": "+234-800-000-0000",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Lagos",
        "addressCountry": "NG"
      },
      "priceRange": "$$$"
    },
    published: true
  },
  {
    slug: 'services/digital-marketing/abuja',
    title: 'Digital Marketing Agency in Abuja | Trendtactics Digital',
    service: 'Digital Marketing',
    location: 'Abuja',
    industry: 'Digital Marketing',
    h1: 'Digital Marketing Agency in Abuja',
    meta_description: 'Scale your brand with the best digital marketing agency in Abuja. Results-driven strategies for social, SEO, and paid ads.',
    content: `
      <h2>Results-Driven Marketing in Abuja</h2>
      <p>Leverage the power of AI to target and acquire clients in Abuja. Our team designs campaigns that address local business challenges and target corporate buyers.</p>
      <h2>Our Approach in Abuja:</h2>
      <ul>
        <li><strong>Corporate Retainers:</strong> Comprehensive digital marketing oversight and support.</li>
        <li><strong>Event Marketing:</strong> Custom social promotions for FCT conferences, events, and launches.</li>
        <li><strong>AI Analytics:</strong> Live dashboarding showing exactly where leads are coming from.</li>
      </ul>
    `,
    schema_markup: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Trendtactics Digital - Abuja Digital Marketing Branch",
      "image": "https://trendtacticsdigital.com/img/Trendtactics_logo.jpg",
      "url": "https://trendtacticsdigital.com/services/digital-marketing/abuja",
      "telephone": "+234-800-000-0000",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Abuja",
        "addressCountry": "NG"
      },
      "priceRange": "$$$"
    },
    published: true
  },
  {
    slug: 'hire/digital-marketing-agency/nigeria',
    title: 'Hire the Best Digital Marketing Agency in Nigeria | Trendtactics Digital',
    service: 'Digital Marketing',
    location: 'Nigeria',
    industry: 'Digital Marketing',
    h1: 'Hire a Top Digital Marketing Agency in Nigeria',
    meta_description: 'Looking to scale your business in Nigeria? Hire Trendtactics Digital for expert digital marketing, SEO, and growth solutions.',
    content: `
      <h2>Partner with Nigeria\'s Premiere AI-Powered Agency</h2>
      <p>Looking to scale your business? Hire Trendtactics Digital for expert digital marketing, SEO, social media management, and web design. We help you build a massive organic audience and run profitable campaigns.</p>
      <h2>Why Hire Us in Nigeria:</h2>
      <ul>
        <li><strong>Industry Leaders:</strong> Deep experience working across eCommerce, Real Estate, Finance, and Education sectors.</li>
        <li><strong>Intelligent Stack:</strong> We integrate Flowise and Supabase to automate lead acquisition and support.</li>
        <li><strong>Flexible Billing:</strong> Project-based or monthly retainer contracts to fit your goals.</li>
      </ul>
    `,
    schema_markup: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Trendtactics Digital - Nigeria HQ",
      "image": "https://trendtacticsdigital.com/img/Trendtactics_logo.jpg",
      "url": "https://trendtacticsdigital.com/hire/digital-marketing-agency/nigeria",
      "telephone": "+234-800-000-0000",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Nigeria",
        "addressCountry": "NG"
      },
      "priceRange": "$$$"
    },
    published: true
  },
  {
    slug: 'hire/seo-agency/lagos',
    title: 'Hire SEO Agency in Lagos | Rank #1 on Google | Trendtactics Digital',
    service: 'SEO',
    location: 'Lagos',
    industry: 'Digital Marketing',
    h1: 'Hire a Professional SEO Agency in Lagos',
    meta_description: 'Hire Lagos\' leading SEO experts to dominate search results, attract qualified leads, and grow your organic traffic.',
    content: `
      <h2>Work with the Ultimate Lagos SEO Agency</h2>
      <p>Hire Lagos\' leading SEO experts to dominate search results, attract qualified leads, and grow your organic traffic. We deliver trackable results with zero monthly vanity metrics.</p>
      <h2>What You Get:</h2>
      <ul>
        <li><strong>Keyword Maps:</strong> Strategic targets mapping to user intent.</li>
        <li><strong>Quality Backlink Campaigns:</strong> High authority outreach in the Nigerian and global market.</li>
        <li><strong>Regular Auditing:</strong> Technical tracking to ensure your rankings keep climbing.</li>
      </ul>
    `,
    schema_markup: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Trendtactics Digital - Lagos SEO Team",
      "image": "https://trendtacticsdigital.com/img/Trendtactics_logo.jpg",
      "url": "https://trendtacticsdigital.com/hire/seo-agency/lagos",
      "telephone": "+234-800-000-0000",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Lagos",
        "addressCountry": "NG"
      },
      "priceRange": "$$$"
    },
    published: true
  },
  {
    slug: 'hire/web-design-agency/nigeria',
    title: 'Hire Web Design Agency in Nigeria | Custom Web Development',
    service: 'Web Design',
    location: 'Nigeria',
    industry: 'Technology',
    h1: 'Hire a Premium Web Design Agency in Nigeria',
    meta_description: 'Hire Trendtactics Digital to build a stunning, secure, and SEO-friendly website that converts visitors into customers.',
    content: `
      <h2>Get a Stunning Custom Website Built by Experts</h2>
      <p>Hire Trendtactics Digital to build a stunning, secure, and SEO-friendly website that converts visitors into customers. We support all custom integrations, databases, and e-learning platforms.</p>
      <h2>Our Web Stack:</h2>
      <ul>
        <li><strong>React, Next.js, and Node.js:</strong> High-performance modern web framework.</li>
        <li><strong>Vanilla CSS:</strong> Tailored, responsive styling for perfect design fidelity.</li>
        <li><strong>Supabase Backend:</strong> Secure database, auth, and cloud storage systems.</li>
      </ul>
    `,
    schema_markup: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Trendtactics Digital - Nigeria Web Team",
      "image": "https://trendtacticsdigital.com/img/Trendtactics_logo.jpg",
      "url": "https://trendtacticsdigital.com/hire/web-design-agency/nigeria",
      "telephone": "+234-800-000-0000",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Nigeria",
        "addressCountry": "NG"
      },
      "priceRange": "$$$"
    },
    published: true
  }
];

async function seed() {
  console.log('🚀 Seeding 12 dynamic SEO pages into Supabase...');
  for (const page of pages) {
    const { data, error } = await supabase
      .from('seo_pages')
      .upsert(page, { onConflict: 'slug' })
      .select();
    
    if (error) {
      console.error(`❌ Error seeding ${page.slug}:`, error.message);
    } else {
      console.log(`✅ Seeded: ${page.slug}`);
    }
  }
  console.log('🎉 Seeding complete!');
}

seed();
