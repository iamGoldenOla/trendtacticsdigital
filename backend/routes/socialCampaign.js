/**
 * Social Media Campaign API Routes
 */

const express = require('express');
const router = express.Router();
const socialCampaignService = require('../services/socialCampaignService');
const rateLimit = require('express-rate-limit');

// Rate limiter for heavy campaign generations
const campaignLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // 10 heavy requests per window
    message: {
        success: false,
        message: 'Too many campaign generation requests. Please try again in 15 minutes.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

/**
 * @route   POST /api/v1/analysis/social-campaign
 * @desc    Generate social media calendar and Midjourney image prompts
 * @access  Public
 */
router.post('/social-campaign', campaignLimiter, async (req, res) => {
    try {
        const { topic, target_audience, platforms, duration, client_id } = req.body;

        if (!topic || !target_audience || !platforms) {
            return res.status(400).json({
                success: false,
                message: 'Topic, target audience, and target platforms are required'
            });
        }

        const campaignResult = await socialCampaignService.generateCampaign(
            topic, 
            target_audience, 
            platforms, 
            duration, 
            client_id
        );

        res.json({
            success: true,
            data: campaignResult
        });

    } catch (error) {
        console.error('Social Campaign Route Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to generate campaign blueprint'
        });
    }
});

module.exports = router;
