const express = reqiore('express');
const { protect, roleMiddleware } = require('../middlewares/authMiddleware');
const {createLesson, getLessonByCourse, getLessonById, updateLesson, deleteLesson} = require('../controllers/lessonController');

const router = express.router();






module.exports = router;