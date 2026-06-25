/**
 * Local Verification Script for Brand Competitor Analyzer
 */

require('dotenv').config({ path: 'c:/Users/Akinola Olujobi/Documents/TrendtacticsDigitalClean/backend/.env' });
const competitorService = require('../backend/services/competitorService');

async function testAnalyzer() {
    console.log('🧪 Starting Brand Competitor Analyzer Verification...');
    
    // Check if OpenRouter keys are loaded
    const hasOpenRouter = !!(process.env.OPENROUTER_KEY_1 || process.env.OPENROUTER_KEY_2 || process.env.OPENROUTER_KEY_3);
    if (!hasOpenRouter) {
        console.warn('⚠ WARNING: No OpenRouter key configured in environment. The test will fail.');
    }

    try {
        const domain = 'trendtacticsdigital.com';
        const industry = 'Digital Marketing & Design Agency';
        
        console.log(`📡 Analyzing: "${domain}" in "${industry}"...`);
        const result = await competitorService.analyzeCompetitor(domain, industry);
        
        console.log('\n✅ Analysis Complete! Result Structure:');
        console.log('---------------------------------------------');
        console.log('Competitors Found:', result.competitors.map(c => `${c.name} (${c.domain})`).join(', '));
        console.log('SWOT Strengths Count:', result.swot_analysis.strengths.length);
        console.log('SWOT Opportunities Count:', result.swot_analysis.opportunities.length);
        console.log('Suggested Strategy Summary:', result.positioning_strategy.substring(0, 150) + '...');
        console.log('---------------------------------------------');
        console.log('🎉 Verification Successful!');
    } catch (err) {
        console.error('❌ Verification Failed:', err);
    }
}

testAnalyzer();
