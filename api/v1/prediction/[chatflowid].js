/**
 * Vercel Serverless Function: Secure Flowise Prediction Proxy
 * 
 * This function securely proxies chat widget requests to Flowise,
 * injecting the API key server-side so it is never exposed to the browser.
 * 
 * Environment Variables (set in Vercel Dashboard):
 *   FLOWISE_API_KEY  - Your Flowise API key (e.g. the "trendyai" key)
 *   FLOWISE_URL      - Your Flowise instance URL (e.g. https://flowise.trendtacticsdigital.com)
 */

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Enable CORS for the chat widget
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { chatflowid } = req.query;

    if (!chatflowid) {
        return res.status(400).json({ error: 'Missing chatflowid' });
    }

    const flowiseUrl = process.env.FLOWISE_URL || 'https://flowise.trendtacticsdigital.com';
    const apiKey = process.env.FLOWISE_API_KEY;

    const url = `${flowiseUrl}/api/v1/prediction/${chatflowid}`;

    const headers = {
        'Content-Type': 'application/json',
    };

    if (apiKey) {
        headers['Authorization'] = `Bearer ${apiKey}`;
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(req.body),
        });

        let data;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error('Flowise proxy error:', error.message);
        return res.status(500).json({
            error: 'Failed to connect to AI Chat Service',
            message: error.message,
        });
    }
}
