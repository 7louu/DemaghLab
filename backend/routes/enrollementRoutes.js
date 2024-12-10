const express = require('express');
const router = express.Router();
const { protect, regularUser} = require('../middleware/authMiddleware');
const {enrollInCourse, unenrollFromCourse} = require('../controllers/enrollementController');

router.post('/:id/enroll', protect, regularUser, enrollInCourse); // Enroll in a course
router.put('/:id/unenroll', protect, unenrollFromCourse); // Unenroll from a course

module.exports = router;