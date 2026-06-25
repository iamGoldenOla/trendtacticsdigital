/**
 * Local Verification Script for Project Proposal & Estimator Agent
 */

require('dotenv').config({ path: 'c:/Users/Akinola Olujobi/Documents/TrendtacticsDigitalClean/backend/.env' });
const proposalService = require('../backend/services/proposalService');

async function testProposal() {
    console.log('🧪 Starting Project Proposal & Estimator Agent Verification...');
    
    // Check if OpenRouter keys are loaded
    const hasOpenRouter = !!(process.env.OPENROUTER_KEY_1 || process.env.OPENROUTER_KEY_2 || process.env.OPENROUTER_KEY_3);
    if (!hasOpenRouter) {
        console.warn('⚠ WARNING: No OpenRouter key configured in environment. The test will fail.');
    }

    try {
        const projectName = 'Trendtactics E-commerce App';
        const description = 'A cross-platform mobile app for selling physical products with Stripe payment integration, notifications, and cart.';
        const budgetRange = '$5,000 - $10,000';
        const timelinePreference = 'Standard';
        
        console.log(`📡 Analyzing project requirements: "${projectName}"...`);
        const result = await proposalService.generateProposal(projectName, description, budgetRange, timelinePreference);
        
        console.log('\n✅ Proposal Strategy Complete! Result Structure:');
        console.log('---------------------------------------------');
        console.log('Project Name:', result.project_name);
        console.log('Features Count:', result.features.length);
        console.log('Features List:', result.features.map(f => f.name).join(', '));
        console.log('Cost Breakdown Items Count:', result.pricing_breakdown.length);
        console.log('Total Estimated Cost:', `$${result.total_estimated_cost}`);
        console.log('Estimated Timeline:', result.timeline);
        console.log('---------------------------------------------');
        console.log('🎉 Verification Successful!');
    } catch (err) {
        console.error('❌ Verification Failed:', err);
    }
}

testProposal();
