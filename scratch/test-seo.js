/**
 * Local Verification Script for SEO Sitemap & Keyword Strategist
 */

require('dotenv').config({ path: 'c:/Users/Akinola Olujobi/Documents/TrendtacticsDigitalClean/backend/.env' });
const seoService = require('../backend/services/seoService');

async function testSeo() {
    console.log('🧪 Starting SEO Sitemap & Keyword Strategist Verification...');
    
    // Check if OpenRouter keys are loaded
    const hasOpenRouter = !!(process.env.OPENROUTER_KEY_1 || process.env.OPENROUTER_KEY_2 || process.env.OPENROUTER_KEY_3);
    if (!hasOpenRouter) {
        console.warn('⚠ WARNING: No OpenRouter key configured in environment. The test will fail.');
    }

    try {
        const domain = 'trendtacticsdigital.com';
        const services = ['Web Development', 'SEO Optimization'];
        const locations = ['Lagos', 'London'];
        
        console.log(`📡 Analyzing: "${domain}" with services: ${JSON.stringify(services)}...`);
        const result = await seoService.generateStrategy(domain, services, locations);
        
        console.log('\n✅ SEO Strategy Complete! Result Structure:');
        console.log('---------------------------------------------');
        console.log('Sitemap URLs Generated Count:', result.sitemap_structure.length);
        console.log('Keyword Clusters Found:', result.keywords.map(k => k.cluster).join(', '));
        console.log('First Sitemap URL Recommendation:', result.sitemap_structure[0].url);
        console.log('---------------------------------------------');
        console.log('🎉 Verification Successful!');
    } catch (err) {
        console.error('❌ Verification Failed:', err);
    }
}

testSeo();
