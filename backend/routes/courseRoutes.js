const express = require('express');
const router = express.Router();
const { getCourses, getCourseById, createCourse, enrollInCourse, unenrollFromCourse } = require('../controllers/courseController');
const { protect, regularUser} = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
// Public routes
router.get('/', getCourses); // Get all courses
router.get('/:id', getCourseById); // Get a single course by ID

// Protected routes
router.post('/', protect, roleMiddleware(['admin', 'instructor']), createCourse); // Create a new course (admin or instructor only)
router.post('/:id/enroll', protect, regularUser, enrollInCourse); // Enroll in a course
router.put('/:id/unenroll', protect, unenrollFromCourse); // Unenroll from a course

module.exports = router;
