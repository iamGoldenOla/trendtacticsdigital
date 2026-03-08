/**
 * Course Routes
 * Provides endpoints for course data
 */

const express = require('express');
const router = express.Router();
const courseService = require('../services/courseService');

/**
 * @route   GET /api/courses
 * @desc    Get all published courses
 * @access  Public
 */
router.get('/', async (req, res) => {
    try {
        const courses = await courseService.getCourses();
        res.json({
            success: true,
            count: courses.length,
            data: courses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/courses/:slug
 * @desc    Get a course by slug
 * @access  Public
 */
router.get('/:slug', async (req, res) => {
    try {
        const course = await courseService.getCourseBySlug(req.params.slug);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }
        res.json({
            success: true,
            data: course
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
