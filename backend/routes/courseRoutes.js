const express = require('express');
const router = express.Router();
const { getCourses, getCourseById, createCourse, enrollInCourse, unenrollFromCourse } = require('../controllers/courseController');
const protect = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
// Public routes
router.get('/', getCourses); // Get all courses
router.get('/:id', getCourseById); // Get a single course by ID

// Protected routes
router.post('/', protect, roleMiddleware(['admin', 'instructor']), createCourse); // Create a new course (admin or instructor only)


module.exports = router;
