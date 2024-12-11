const Lesson = require('../models/lesson');
const Course = require('../models/course');

const createLesson = async (req, res) => {
    try {
        const { title, content, course } = req.body;

        if (!title || !content || !course) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const lesson = new Lesson({
            title,
            content,
            course,
            instructor: req.user.id,  
        });

        const createdLesson = await lesson.save();
        res.status(201).json(createdLesson);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getLessonByCourse = async (req, res) => {
    try {
        const lessons = await Lesson.find({ course: req.params.courseId });
        if (lessons.length === 0) {
            return res.status(404).json({ message: 'No lessons found for this course' });
        }
        res.status(200).json(lessons);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getLessonById = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id);
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }
        res.status(200).json(lesson);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateLesson = async (req, res) => {
    try {
        const { title, content, course } = req.body;

        if (!title || !content || !course) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const lesson = await Lesson.findById(req.params.id);
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }

        if (lesson.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to update this lesson' });
        }

        lesson.title = title;
        lesson.content = content;
        lesson.course = course;

        const updatedLesson = await lesson.save();
        res.status(200).json(updatedLesson);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id);
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }

        if (lesson.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete this lesson' });
        }

        await lesson.remove();
        res.status(200).json({ message: 'Lesson deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createLesson,
    getLessonByCourse,
    getLessonById,
    updateLesson,
    deleteLesson,
}