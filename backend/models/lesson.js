const mongoose = require('mongoose');

const lessonSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },  
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Lesson',lessonSchema);