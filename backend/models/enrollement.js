const mongoose = require('mongoose');

const enrollementSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    progress: { type: Number, default: 0 }, 
});

module.exports = mongoose.model('Enrollement',enrollementSchema);