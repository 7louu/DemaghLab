const mongoose = require('mongoose');

//loadina l .env file bech najmou naccedou lel variables elli fi wostou kima mongoURI
const dotenv = require('dotenv');
//l variables elli mawjoudin fi wost .env ywalou mawjoudin fi wost process.env
//using l function config()
dotenv.config();

const connectDb = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully !");
    } catch (error) {
        console.error("Error Connecting to the database !");
    }
};
//kol file fi JS is treated like a module kima l Python so we export it so other files fl project can use it!
module.exports = connectDb();