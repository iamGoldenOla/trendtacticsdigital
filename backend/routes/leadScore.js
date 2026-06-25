/**
 * Lead Scoring & Qualification API Routes
 */

const express = require('express');
const router = express.Router();
const leadScoreService = require('../services/leadScoreService');
const rateLimit = require('express-rate-limit');

// Rate limiter for lead analysis
const leadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // 20 requests per window
    message: {
        success: false,
        message: 'Too many lead scoring requests. Please try again in 15 minutes.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

/**
 * @route   POST /api/v1/analysis/lead-score
 * @desc    Evaluate and score a lead, draft follow-up email
 * @access  Public
 */
router.post('/lead-score', leadLimiter, async (req, res) => {
    try {
        const { name, company, budget_range, project_description, client_id } = req.body;

        if (!name || !project_description) {
            return res.status(400).json({
                success: false,
                message: 'Name and project description are required'
            });
        }

        const scoreResult = await leadScoreService.scoreLead(
            name, 
            company, 
            budget_range, 
            project_description, 
            client_id
        );

        res.json({
            success: true,
            data: scoreResult
        });

    } catch (error) {
        console.error('Lead Scoring Route Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to complete lead scoring'
        });
    }
});

module.exports = router;
