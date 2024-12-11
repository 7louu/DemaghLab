const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    title: { type: String, required: true },
    banner : {type: String, required: true},
    description: { type: String, required: true },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    instructor: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Course',courseSchema);