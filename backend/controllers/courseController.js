const Course = require('../models/course');
const Enrollement = require('../models/enrollement');

//get l courses elli mawjoudin l kol
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json({courses});
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
};

//get course specifique bel id mte3ou 
const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById();
        if (!course){
            return res.status(404).json({message: 'Course not found!'});
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
};

//creati course
const createCourse = async (req, res, next) => {
    try {
        const {title, description, instructor} = req.body;
        
        if (!title || !description || !instructor){
            return res.status(400).json({message: 'All fields are required'})
        }

        const course = new Course({
            title,
            description,
            instructor : req.user.id,
        });

        const createdCourse = await Course.save();
        res.status(201).json(createdCourse);
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
};

//participi walla enrolli fi course
const enrollInCourse = async (req, res) => {
    try {
        const { id: courseId } = req.params;
        const userId = req.user.id;

        // Check if already enrolled
        const alreadyEnrolled = await Enrollment.findOne({ user: userId, course: courseId });
        if (alreadyEnrolled) {
            return res.status(400).json({ message: 'Already enrolled in this course' });
        }

        const enrollment = new Enrollment({
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

        const enrollment = await Enrollment.findOneAndDelete({ user: userId, course: courseId });
        if (!enrollment) {
            return res.status(404).json({ message: 'Not enrolled in this course' });
        }

        res.status(200).json({ message: 'Successfully unenrolled' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getCourses,
    getCourseById,
    createCourse,
    enrollInCourse,
    unenrollFromCourse,
};