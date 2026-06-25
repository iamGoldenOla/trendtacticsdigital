/**
 * Local Verification Script for Lead Scoring Agent
 */

require('dotenv').config({ path: 'c:/Users/Akinola Olujobi/Documents/TrendtacticsDigitalClean/backend/.env' });
const leadScoreService = require('../backend/services/leadScoreService');

async function testLeadScore() {
    console.log('🧪 Starting Lead Scoring Agent Verification...');
    
    // Check if OpenRouter keys are loaded
    const hasOpenRouter = !!(process.env.OPENROUTER_KEY_1 || process.env.OPENROUTER_KEY_2 || process.env.OPENROUTER_KEY_3);
    if (!hasOpenRouter) {
        console.warn('⚠ WARNING: No OpenRouter key configured in environment. The test will fail.');
    }

    try {
        const name = 'Sarah Jenkins';
        const company = 'Innovate Tech Ltd';
        const budgetRange = '$15,000 - $25,000';
        const projectDescription = 'We need a robust customer CRM dashboard built on Next.js to sync with our database. Needs high security, fast API response times, and standard OAuth.';
        
        console.log(`📡 Scoring lead: "${name}" from "${company}"...`);
        const result = await leadScoreService.scoreLead(name, company, budgetRange, projectDescription);
        
        console.log('\n✅ Lead Scoring Complete! Result Structure:');
        console.log('---------------------------------------------');
        console.log('Lead Name:', name);
        console.log('Assigned Score Tier:', result.score_tier);
        console.log('AI Confidence Score:', result.confidence_score);
        console.log('Justification:', result.justification);
        console.log('Drafted Outreach Subject & Body:\n');
        console.log(result.drafted_outreach);
        console.log('---------------------------------------------');
        console.log('🎉 Verification Successful!');
    } catch (err) {
        console.error('❌ Verification Failed:', err);
    }
}

testLeadScore();
