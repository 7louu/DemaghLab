const express = require('express');
const { protect} = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const {createLesson, getLessonByCourse, getLessonById, updateLesson, deleteLesson} = require('../controllers/lessonController');

const router = express.Router();

//route bech ncreatou lesson
router.post('/', protect, roleMiddleware(['admin', 'instructor']), createLesson);
//route bech njibou lesson 7asb l course id
router.get('/course/:courseId', protect, getLessonByCourse);
//route bech njibou lesson 7asb l lesson id
router.get('/:id', protect, getLessonById);
//route bech naamlou update lel lesson 7asb l id mte3ou
router.put('/:id', protect, roleMiddleware(['admin', 'instructor']) , updateLesson);
//route bech naamlou delete l lesson 7asb l id mte3ou
router.delete('/:id', protect, roleMiddleware(['admin', 'instructor']), deleteLesson);


module.exports = router;