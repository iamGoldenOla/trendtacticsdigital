const express = require('express');
const router = express.Router();

// Demo data
const demoCourses = [
    {
        _id: '1',
        title: 'Complete Digital Marketing Masterclass',
        slug: 'complete-digital-marketing-masterclass',
        description: 'Learn everything you need to know about digital marketing from SEO to social media advertising.',
        shortDescription: 'Master digital marketing strategies and tactics',
        thumbnail: '/img/blog1.jpg',
        category: 'Digital Marketing',
        level: 'Beginner',
        duration: '8 weeks',
        price: 199,
        isFree: false,
        isPublished: true,
        isFeatured: true,
        instructor: {
            _id: '1',
            firstName: 'Akinola',
            lastName: 'Olujobi',
            avatar: '/img/Trendtactics-logo.jpg'
        },
        stats: {
            enrollments: 1250,
            completions: 890,
            averageRating: 4.8,
            totalRatings: 156
        },
        totalLessons: 48,
        totalDuration: 1440,
        createdAt: '2025-01-15T10:00:00.000Z'
    },
    {
        _id: '2',
        title: 'SEO Fundamentals for Beginners',
        slug: 'seo-fundamentals-for-beginners',
        description: 'Master the basics of Search Engine Optimization and improve your website rankings.',
        shortDescription: 'Learn SEO from scratch',
        thumbnail: '/img/blog2.jpg',
        category: 'SEO',
        level: 'Beginner',
        duration: '4 weeks',
        price: 99,
        isFree: false,
        isPublished: true,
        isFeatured: true,
        instructor: {
            _id: '1',
            firstName: 'Akinola',
            lastName: 'Olujobi',
            avatar: '/img/Trendtactics-logo.jpg'
        },
        stats: {
            enrollments: 890,
            completions: 650,
            averageRating: 4.7,
            totalRatings: 98
        },
        totalLessons: 24,
        totalDuration: 720,
        createdAt: '2025-01-10T10:00:00.000Z'
    },
    {
        _id: '3',
        title: 'Social Media Marketing Strategy',
        slug: 'social-media-marketing-strategy',
        description: 'Develop winning social media strategies for Facebook, Instagram, Twitter, and LinkedIn.',
        shortDescription: 'Create effective social media campaigns',
        thumbnail: '/img/blog3.jpg',
        category: 'Social Media',
        level: 'Intermediate',
        duration: '6 weeks',
        price: 149,
        isFree: false,
        isPublished: true,
        isFeatured: false,
        instructor: {
            _id: '1',
            firstName: 'Akinola',
            lastName: 'Olujobi',
            avatar: '/img/Trendtactics-logo.jpg'
        },
        stats: {
            enrollments: 650,
            completions: 420,
            averageRating: 4.6,
            totalRatings: 87
        },
        totalLessons: 36,
        totalDuration: 1080,
        createdAt: '2025-01-05T10:00:00.000Z'
    },
    {
        _id: '4',
        title: 'Google Ads Mastery',
        slug: 'google-ads-mastery',
        description: 'Learn to create and optimize Google Ads campaigns that convert.',
        shortDescription: 'Master Google Ads advertising',
        thumbnail: '/img/advert-image-generation.jpg',
        category: 'PPC',
        level: 'Advanced',
        duration: '5 weeks',
        price: 179,
        isFree: false,
        isPublished: true,
        isFeatured: true,
        instructor: {
            _id: '1',
            firstName: 'Akinola',
            lastName: 'Olujobi',
            avatar: '/img/Trendtactics-logo.jpg'
        },
        stats: {
            enrollments: 450,
            completions: 320,
            averageRating: 4.9,
            totalRatings: 76
        },
        totalLessons: 30,
        totalDuration: 900,
        createdAt: '2025-01-01T10:00:00.000Z'
    },
    {
        _id: '5',
        title: 'Content Marketing Fundamentals',
        slug: 'content-marketing-fundamentals',
        description: 'Create compelling content that attracts, engages, and converts your audience.',
        shortDescription: 'Learn content marketing basics',
        thumbnail: '/img/image-generation-4.jpg',
        category: 'Content Marketing',
        level: 'Beginner',
        duration: '4 weeks',
        price: 0,
        isFree: true,
        isPublished: true,
        isFeatured: false,
        instructor: {
            _id: '1',
            firstName: 'Akinola',
            lastName: 'Olujobi',
            avatar: '/img/Trendtactics-logo.jpg'
        },
        stats: {
            enrollments: 2100,
            completions: 1800,
            averageRating: 4.5,
            totalRatings: 234
        },
        totalLessons: 20,
        totalDuration: 600,
        createdAt: '2024-12-20T10:00:00.000Z'
    }
];

const demoUsers = [
    {
        _id: '1',
        firstName: 'Akinola',
        lastName: 'Olujobi',
        email: 'admin@trendtacticsdigital.com',
        role: 'admin',
        isEmailVerified: true,
        avatar: '/img/Trendtactics-logo.jpg',
        profile: {
            bio: 'Digital Marketing Expert and Founder of Trendtactics Digital',
            phone: '+234 123 456 7890',
            country: 'Nigeria',
            city: 'Lagos'
        }
    }
];

// Demo authentication
let currentUser = null;

// @desc    Get all courses (demo)
// @route   GET /api/demo/courses
// @access  Public
router.get('/courses', (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = demoCourses.length;

    // Build query
    let filteredCourses = [...demoCourses];

    // Filter by category
    if (req.query.category) {
        filteredCourses = filteredCourses.filter(course => 
            course.category.toLowerCase() === req.query.category.toLowerCase()
        );
    }

    // Filter by level
    if (req.query.level) {
        filteredCourses = filteredCourses.filter(course => 
            course.level.toLowerCase() === req.query.level.toLowerCase()
        );
    }

    // Filter by price
    if (req.query.price) {
        if (req.query.price === 'free') {
            filteredCourses = filteredCourses.filter(course => course.isFree);
        } else if (req.query.price === 'paid') {
            filteredCourses = filteredCourses.filter(course => !course.isFree);
        }
    }

    // Search functionality
    if (req.query.search) {
        const searchTerm = req.query.search.toLowerCase();
        filteredCourses = filteredCourses.filter(course =>
            course.title.toLowerCase().includes(searchTerm) ||
            course.description.toLowerCase().includes(searchTerm) ||
            course.shortDescription.toLowerCase().includes(searchTerm)
        );
    }

    // Sort functionality
    if (req.query.sort) {
        switch (req.query.sort) {
            case 'newest':
                filteredCourses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'oldest':
                filteredCourses.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case 'popular':
                filteredCourses.sort((a, b) => b.stats.enrollments - a.stats.enrollments);
                break;
            case 'rating':
                filteredCourses.sort((a, b) => b.stats.averageRating - a.stats.averageRating);
                break;
            case 'price-low':
                filteredCourses.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredCourses.sort((a, b) => b.price - a.price);
                break;
            default:
                filteredCourses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
    } else {
        filteredCourses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    // Pagination
    const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

    // Pagination result
    const pagination = {};

    if (endIndex < filteredCourses.length) {
        pagination.next = {
            page: page + 1,
            limit
        };
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        };
    }

    res.status(200).json({
        success: true,
        count: paginatedCourses.length,
        pagination,
        total: filteredCourses.length,
        data: paginatedCourses
    });
});

// @desc    Get featured courses (demo)
// @route   GET /api/demo/courses/featured
// @access  Public
router.get('/courses/featured', (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 6;
    const featuredCourses = demoCourses
        .filter(course => course.isFeatured)
        .sort((a, b) => b.stats.enrollments - a.stats.enrollments)
        .slice(0, limit);

    res.status(200).json({
        success: true,
        count: featuredCourses.length,
        data: featuredCourses
    });
});

// @desc    Get courses by category (demo)
// @route   GET /api/demo/courses/category/:category
// @access  Public
router.get('/courses/category/:category', (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 10;
    const categoryCourses = demoCourses
        .filter(course => 
            course.category.toLowerCase() === req.params.category.toLowerCase() &&
            course.isPublished
        )
        .sort((a, b) => b.stats.enrollments - a.stats.enrollments)
        .slice(0, limit);

    res.status(200).json({
        success: true,
        count: categoryCourses.length,
        data: categoryCourses
    });
});

// @desc    Search courses (demo)
// @route   GET /api/demo/courses/search
// @access  Public
router.get('/courses/search', (req, res) => {
    const { q } = req.query;
    const limit = parseInt(req.query.limit, 10) || 10;

    if (!q) {
        return res.status(400).json({
            success: false,
            message: 'Search query is required'
        });
    }

    const searchTerm = q.toLowerCase();
    const searchResults = demoCourses
        .filter(course =>
            course.title.toLowerCase().includes(searchTerm) ||
            course.description.toLowerCase().includes(searchTerm) ||
            course.shortDescription.toLowerCase().includes(searchTerm)
        )
        .sort((a, b) => b.stats.enrollments - a.stats.enrollments)
        .slice(0, limit);

    res.status(200).json({
        success: true,
        count: searchResults.length,
        query: q,
        data: searchResults
    });
});

// @desc    Get single course (demo)
// @route   GET /api/demo/courses/:id
// @access  Public
router.get('/courses/:id', (req, res) => {
    const course = demoCourses.find(c => c._id === req.params.id);

    if (!course) {
        return res.status(404).json({
            success: false,
            message: 'Course not found'
        });
    }

    res.status(200).json({
        success: true,
        data: course
    });
});

// @desc    Demo login
// @route   POST /api/demo/auth/login
// @access  Public
router.post('/auth/login', (req, res) => {
    const { email, password } = req.body;

    // Demo login - accept any email with password "demo123"
    if (password === 'demo123') {
        const user = demoUsers.find(u => u.email === email) || {
            _id: '2',
            firstName: 'Demo',
            lastName: 'User',
            email: email,
            role: 'student',
            isEmailVerified: true,
            avatar: '/img/Trendtactics-logo.jpg',
            profile: {
                bio: 'Demo student account',
                phone: '',
                country: 'Nigeria',
                city: 'Lagos'
            }
        };

        currentUser = user;

        res.status(200).json({
            success: true,
            message: 'Demo login successful',
            token: 'demo-jwt-token-' + Date.now(),
            user: user
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid credentials. Use password: demo123'
        });
    }
});

// @desc    Demo register
// @route   POST /api/demo/auth/register
// @access  Public
router.post('/auth/register', (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const existingUser = demoUsers.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: 'User with this email already exists'
        });
    }

    // Create demo user
    const newUser = {
        _id: (demoUsers.length + 1).toString(),
        firstName,
        lastName,
        email,
        role: 'student',
        isEmailVerified: true,
        avatar: '/img/Trendtactics-logo.jpg',
        profile: {
            bio: 'New demo student',
            phone: '',
            country: 'Nigeria',
            city: 'Lagos'
        }
    };

    demoUsers.push(newUser);
    currentUser = newUser;

    res.status(201).json({
        success: true,
        message: 'Demo registration successful',
        token: 'demo-jwt-token-' + Date.now(),
        user: newUser
    });
});

// @desc    Get current user (demo)
// @route   GET /api/demo/auth/me
// @access  Private
router.get('/auth/me', (req, res) => {
    if (!currentUser) {
        return res.status(401).json({
            success: false,
            message: 'Not authenticated'
        });
    }

    res.status(200).json({
        success: true,
        data: currentUser
    });
});

// @desc    Demo logout
// @route   POST /api/demo/auth/logout
// @access  Private
router.post('/auth/logout', (req, res) => {
    currentUser = null;
    
    res.status(200).json({
        success: true,
        message: 'Demo logout successful'
    });
});

module.exports = router; 