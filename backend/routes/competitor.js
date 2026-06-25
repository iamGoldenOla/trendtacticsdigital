/**
 * Competitor Analysis API Routes
 */

const express = require('express');
const router = express.Router();
const competitorService = require('../services/competitorService');
const rateLimit = require('express-rate-limit');

// Rate limiting specifically for heavy analysis tools
const analysisLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // 10 heavy requests per window
    message: {
        success: false,
        message: 'Too many competitor analysis requests. Please try again in 15 minutes.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

/**
 * @route   POST /api/v1/analysis/competitor
 * @desc    Run competitor identification & SWOT analysis on a domain
 * @access  Public (Can be secured via API keys)
 */
router.post('/competitor', analysisLimiter, async (req, res) => {
    try {
        const { domain, industry, client_id } = req.body;

        if (!domain) {
            return res.status(400).json({
                success: false,
                message: 'Target domain is required for analysis'
            });
        }

        const analysisResult = await competitorService.analyzeCompetitor(domain, industry, client_id);

        res.json({
            success: true,
            data: analysisResult
        });

    } catch (error) {
        console.error('Competitor Analysis Route Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to complete competitor analysis'
        });
    }
});

module.exports = router;
