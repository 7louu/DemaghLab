//I will explain this once for  all the models
//MongoDB is a NoSQL database matesta3mlch predefined columns 
//instead it works with schemas for every model and it will store data according 
//lel schema adhika
//steps : import mongoose w baad calli function Schema() w creati model mte3ek 
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    courses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}],
    role: {type: String, enum: ['regular','instructor','admin']},
});

module.exports = mongoose.model('User',userSchema);