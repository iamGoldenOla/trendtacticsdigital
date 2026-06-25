const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

// Import routes
const authRoutes = require('./backend/routes/auth');
const userRoutes = require('./backend/routes/users');
const courseRoutes = require('./backend/routes/courses');
const enrollmentRoutes = require('./backend/routes/enrollments');
const paymentRoutes = require('./backend/routes/payments');
const analyticsRoutes = require('./backend/routes/analytics');
const adminRoutes = require('./backend/routes/admin');
const leadRoutes = require('./backend/routes/leads');

// Import middleware
const { authenticateToken } = require('./backend/middleware/auth');
const errorHandler = require('./backend/middleware/errorHandler');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://akinolaolujobi:trn@XNPkGkggGgg01Xze3dy@trendtactics-lms-cluste.x4jfrqv.mongodb.net/trendtactics-lms?retryWrites=true&w=majority&appName=trendtactics-lms-cluster', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://unpkg.com", "https://js.stripe.com"],
            imgSrc: ["'self'", "data:", "https:", "blob:"],
            connectSrc: ["'self'", "https://api.stripe.com", "wss:", "ws:"]
        }
    }
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(compression());
app.use(morgan('combined'));
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authenticateToken, userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', authenticateToken, enrollmentRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/analytics', authenticateToken, analyticsRoutes);
app.use('/api/admin', authenticateToken, adminRoutes);
app.use('/api/leads', leadRoutes);

// Serve React app for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use(errorHandler);

// Socket.IO for real-time features
io.on('connection', (socket) => {
    console.log('🔌 User connected:', socket.id);

    // Join user to their personal room
    socket.on('join-user-room', (userId) => {
        socket.join(`user-${userId}`);
        console.log(`User ${userId} joined their room`);
    });

    // Join course room for live sessions
    socket.on('join-course', (courseId) => {
        socket.join(`course-${courseId}`);
        console.log(`User joined course ${courseId}`);
    });

    // Handle live chat messages
    socket.on('send-message', (data) => {
        io.to(`course-${data.courseId}`).emit('new-message', {
            userId: data.userId,
            message: data.message,
            timestamp: new Date(),
            userName: data.userName
        });
    });

    // Handle progress updates
    socket.on('progress-update', (data) => {
        io.to(`user-${data.userId}`).emit('progress-updated', data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('🔌 User disconnected:', socket.id);
    });
});

// Global socket instance for use in other files
app.set('io', io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`🚀 LMS Server running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 API URL: http://localhost:${PORT}/api`);
    console.log(`🎓 LMS Platform: http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
        mongoose.connection.close();
    });
});

module.exports = app; 