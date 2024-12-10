const Enrollement = require('../models/enrollement');

//participi walla enrolli fi course
const enrollInCourse = async (req, res) => {
    try {
        const { id: courseId } = req.params;
        const userId = req.user.id;

        // Check if already enrolled
        const alreadyEnrolled = await Enrollement.findOne({ user: userId, course: courseId });
        if (alreadyEnrolled) {
            return res.status(400).json({ message: 'Already enrolled in this course' });
        }

        const enrollment = new Enrollement({
            user: userId,
            course: courseId,
        });

        const createdEnrollment = await enrollment.save();
        res.status(201).json(createdEnrollment);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Unenrolli men course
const unenrollFromCourse = async (req, res) => {
    try {
        const { id: courseId } = req.params;
        const userId = req.user.id;

        const enrollment = await Enrollement.findOneAndDelete({ user: userId, course: courseId });
        if (!enrollment) {
            return res.status(404).json({ message: 'Not enrolled in this course' });
        }

        res.status(200).json({ message: 'Successfully unenrolled' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    enrollInCourse,
    unenrollFromCourse,
};