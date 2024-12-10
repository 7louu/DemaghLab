const Course = require('../models/course');

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
        const course = await Course.findById(req.params.id);
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

        const createdCourse = await course.save();
        res.status(201).json(createdCourse);
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
};

module.exports = {
    getCourses,
    getCourseById,
    createCourse,
};