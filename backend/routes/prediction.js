const express = require('express');
const router = express.Router();

/**
 * Secure prediction proxy route for Flowise
 * Forwards chat widget queries securely without exposing the Flowise API key to the client
 */
router.post('/:chatflowid', async (req, res) => {
    try {
        const { chatflowid } = req.params;
        // In the Docker network, the Flowise container is accessible at http://trendyai-flowise:3001
        const flowiseHost = process.env.FLOWISE_URL || 'http://trendyai-flowise:3001';
        const url = `${flowiseHost}/api/v1/prediction/${chatflowid}`;
        
        const apiKey = process.env.FLOWISE_API_KEY;
        const headers = {
            'Content-Type': 'application/json',
        };
        
        if (apiKey) {
            headers['Authorization'] = `Bearer ${apiKey}`;
        }

        console.log(`Forwarding prediction request for chatflow ${chatflowid} to Flowise...`);

        // Forward the request using native fetch (supported in Node 18+)
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(req.body)
        });

        // Parse response
        let data;
        try {
            data = await response.json();
        } catch (e) {
            data = await response.text();
        }

        if (!response.ok) {
            console.error(`Flowise error status: ${response.status}`, data);
            return res.status(response.status).json(data);
        }

        res.json(data);
    } catch (error) {
        console.error('Flowise Secure Proxy Error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to communicate with AI Chat Service',
            error: error.message
        });
    }
});

module.exports = router;
