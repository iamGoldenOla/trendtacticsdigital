/**
 * Project Proposal & Estimator API Routes
 */

const express = require('express');
const router = express.Router();
const proposalService = require('../services/proposalService');
const rateLimit = require('express-rate-limit');

// Rate limiter for heavy proposal generation
const proposalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // 10 heavy requests per window
    message: {
        success: false,
        message: 'Too many proposal requests. Please try again in 15 minutes.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

/**
 * @route   POST /api/v1/analysis/proposal
 * @desc    Generate a project proposal and cost estimate
 * @access  Public
 */
router.post('/proposal', proposalLimiter, async (req, res) => {
    try {
        const { project_name, description, budget_range, timeline_preference, client_id } = req.body;

        if (!project_name || !description) {
            return res.status(400).json({
                success: false,
                message: 'Project name and description are required'
            });
        }

        const proposalResult = await proposalService.generateProposal(
            project_name, 
            description, 
            budget_range, 
            timeline_preference, 
            client_id
        );

        res.json({
            success: true,
            data: proposalResult
        });

    } catch (error) {
        console.error('Proposal Route Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to generate proposal'
        });
    }
});

module.exports = router;
