/**
 * Local Verification Script for Social Media Campaign Blueprint & Image Prompt Generator
 */

require('dotenv').config({ path: 'c:/Users/Akinola Olujobi/Documents/TrendtacticsDigitalClean/backend/.env' });
const socialCampaignService = require('../backend/services/socialCampaignService');

async function testSocialCampaign() {
    console.log('🧪 Starting Social Media Campaign Blueprint Agent Verification...');
    
    // Check if OpenRouter keys are loaded
    const hasOpenRouter = !!(process.env.OPENROUTER_KEY_1 || process.env.OPENROUTER_KEY_2 || process.env.OPENROUTER_KEY_3);
    if (!hasOpenRouter) {
        console.warn('⚠ WARNING: No OpenRouter key configured in environment. The test will fail.');
    }

    try {
        const topic = 'Programmatic SEO for SaaS Growth';
        const targetAudience = 'SaaS Founders and Head of Marketing';
        const platforms = ['LinkedIn', 'Twitter'];
        const duration = '3 Days';
        
        console.log(`📡 Generating campaign for topic: "${topic}"...`);
        const result = await socialCampaignService.generateCampaign(topic, targetAudience, platforms, duration);
        
        console.log('\n✅ Social Campaign Blueprint Generation Complete! Result Structure:');
        console.log('---------------------------------------------');
        console.log('Topic:', result.topic);
        console.log('Target Audience:', result.target_audience);
        console.log('Platforms:', result.platforms);
        console.log('Calendar Items Count:', result.content_calendar.length);
        console.log('\nDay 1 Post Preview:');
        console.log('Title:', result.content_calendar[0].title);
        console.log('Platform:', result.content_calendar[0].platform);
        console.log('Caption:', result.content_calendar[0].caption);
        console.log('Image Prompt:', result.content_calendar[0].image_prompt);
        console.log('---------------------------------------------');
        console.log('🎉 Verification Successful!');
    } catch (err) {
        console.error('❌ Verification Failed:', err);
    }
}

testSocialCampaign();
