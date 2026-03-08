const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const http = require('http');
const socketIo = require('socket.io');

// Load environment variables
require('dotenv').config();

const FRONTEND_PORT = 8000;
const BACKEND_PORT = 5000;

// --- FRONTEND SERVER (Port 8000) ---
const frontendApp = express();
frontendApp.use(cors());

// Log all requests to frontend
frontendApp.use((req, res, next) => {
    console.log(`[Frontend] ${new Date().toLocaleTimeString()} - ${req.method} ${req.url}`);
    next();
});

// Serve static files from the root directory
frontendApp.use(express.static(__dirname));

// Specifically handle main pages if needed
frontendApp.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

const frontendServer = frontendApp.listen(FRONTEND_PORT, '0.0.0.0', () => {
    console.log(`\n🟢 Frontend Server running at:`);
    console.log(`   - http://localhost:${FRONTEND_PORT}`);
    console.log(`   - http://127.0.0.1:${FRONTEND_PORT}`);
});

// --- BACKEND SERVER (Port 5000) ---
const backendApp = express();
backendApp.use(cors());
backendApp.use(express.json());

// Log all requests to backend
backendApp.use((req, res, next) => {
    console.log(`[Backend] ${new Date().toLocaleTimeString()} - ${req.method} ${req.url}`);
    next();
});

// Root route to help users find the website
backendApp.get('/', (req, res) => {
    res.send(`
        <html>
            <body style="font-family: sans-serif; padding: 2rem; line-height: 1.6;">
                <h1>🚀 Trendtactics LMS API</h1>
                <p>The backend API is running correctly on port 5000.</p>
                <div style="background: #f4f4f4; padding: 1rem; border-radius: 8px;">
                    <p><strong>To view the main website/academy, please visit:</strong></p>
                    <a href="http://localhost:8000" style="font-size: 1.2rem; color: #00FFFF; text-decoration: none; font-weight: bold;">http://localhost:8000</a>
                </div>
            </body>
        </html>
    `);
});

// Mock/Simple API implementation based on what's needed
backendApp.get('/api/health', (req, res) => {
    res.json({ success: true, status: 'API is running' });
});

// Attempt to use real AI routes if available
try {
    const aiRoutes = require('./backend/routes/ai');
    backendApp.use('/api/ai', aiRoutes);
    console.log('✅ AI routes loaded (OpenRouter ready)');
} catch (err) {
    console.warn('⚠️ Could not load real AI routes, falling back to basic API');

    // Basic AI chat fallback
    backendApp.post('/api/ai/chat', (req, res) => {
        res.json({
            success: true,
            data: {
                message: "This is a local AI response. To use real AI, ensure your backend is fully configured with API keys."
            }
        });
    });
}

// Attempt to use real lead routes if available
try {
    const leadRoutes = require('./backend/routes/leads');
    backendApp.use('/api/leads', leadRoutes);
    console.log('✅ Lead routes loaded');
} catch (err) {
    console.warn('⚠️ Could not load lead routes');
}

// Attempt to use real course routes if available
try {
    const courseRoutes = require('./backend/routes/courses');
    backendApp.use('/api/courses', courseRoutes);
    console.log('✅ Course routes loaded');
} catch (err) {
    console.warn('⚠️ Could not load course routes');
}

const backendServer = http.createServer(backendApp);
const io = socketIo(backendServer, {
    cors: { origin: `http://localhost:${FRONTEND_PORT}`, methods: ["GET", "POST"] }
});

backendServer.listen(BACKEND_PORT, '0.0.0.0', () => {
    console.log(`\n🚀 Backend LMS Server running at:`);
    console.log(`   - http://localhost:${BACKEND_PORT}`);
    console.log(`   - http://127.0.0.1:${BACKEND_PORT}`);
    console.log(`   - API Base URL: http://localhost:${BACKEND_PORT}/api\n`);
});

// Error handling
[frontendServer, backendServer].forEach(s => {
    s.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.error(`❌ Port ${err.port} is already in use. Please close any other servers.`);
        } else {
            console.error('❌ Server error:', err);
        }
    });
});
