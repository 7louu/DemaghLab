const express = require('express');
const router = express.Router();
const { getCourses, getCourseById, createCourse, enrollInCourse, unenrollFromCourse } = require('../controllers/courseController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getCourses); // Get all courses
router.get('/:id', getCourseById); // Get a single course by ID

// Protected routes
router.post('/', protect, admin, createCourse); // Create a new course (admin or instructor only)
router.post('/:id/enroll', protect, enrollInCourse); // Enroll in a course
router.post('/:id/unenroll', protect, unenrollFromCourse); // Unenroll from a course

module.exports = router;
