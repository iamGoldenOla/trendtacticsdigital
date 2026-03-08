/**
 * Lead Generation Routes
 * Handles contact form submissions and newsletter signups
 */

const express = require('express');
const router = express.Router();
const leadService = require('../services/leadService');

/**
 * @route   POST /api/leads/contact
 * @desc    Process contact form submission
 * @access  Public
 */
router.post('/contact', async (req, res) => {
    try {
        const { name, email, company, service, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and message are required'
            });
        }

        const result = await leadService.saveLead({
            type: 'contact',
            name,
            email,
            company,
            service,
            message
        });

        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   POST /api/leads/newsletter
 * @desc    Process newsletter signup
 * @access  Public
 */
router.post('/newsletter', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        const result = await leadService.saveLead({
            type: 'newsletter',
            email
        });

        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
