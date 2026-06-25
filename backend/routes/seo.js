/**
 * SEO Sitemap & Keyword Analysis API Routes
 */

const express = require('express');
const router = express.Router();
const seoService = require('../services/seoService');
const rateLimit = require('express-rate-limit');

// Rate limiter for heavy analytics tools
const seoLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // 10 heavy requests per window
    message: {
        success: false,
        message: 'Too many SEO strategy requests. Please try again in 15 minutes.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

/**
 * @route   POST /api/v1/analysis/seo
 * @desc    Generate programmatic SEO sitemap and keyword strategies
 * @access  Public
 */
router.post('/seo', seoLimiter, async (req, res) => {
    try {
        const { domain, services, locations, client_id } = req.body;

        if (!domain || !services || !locations) {
            return res.status(400).json({
                success: false,
                message: 'Domain, services, and locations are required'
            });
        }

        const seoResult = await seoService.generateStrategy(domain, services, locations, client_id);

        res.json({
            success: true,
            data: seoResult
        });

    } catch (error) {
        console.error('SEO Strategy Route Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to generate SEO strategy sitemap'
        });
    }
});

module.exports = router;
