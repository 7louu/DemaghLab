const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    courses: [{type: mongoose.Schema.Types.ObjectId, ref: 'course'}],
    role: {type: String, enum: ['regular','instructor','admin']},
});

module.exports = mongoose.model('User',userSchema);