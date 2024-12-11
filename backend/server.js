//importina l express module
//importina l connectDB function mel db.js file
const express = require('express');
const connectDb = require('./config/db');
//importina userRoutes
const userRoutes = require('./routes/userRoutes');
//importina courseRoutes
const courseRoutes = require('./routes/courseRoutes');
//importina enrollementRoutes
const enrollementRoutes = require('./routes/enrollementRoutes');
//importina lessonRoutes
const lessonRoutes = require('./routes/lessonRoutes');
//creatina server express
const app = express();
const cors = require("cors")
//connectina aala database doub ma yet7all serveur
connectDb();

//data elli tji mel client tnajem tkoun fi format json 
//express maynjmch yparsi JSON data into Js scriptable objects 
//fi wost express fama built-in middleware yaaml l faza hedhy 
app.use(express.json());
// Enable CORS with custom configuration
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

// Enable CORS for all routes
app.use(cors(corsOptions));

// Optional: Set headers manually for all routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Adjust for your frontend URL
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Adjust as needed
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Adjust as needed
    res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
    next();
});

//creatina route bech nchekou ken serveur yemchi
app.get('/', (req, res) =>{
    res.send('Server is running ...');
});
//creatina route bech ntastou database connecte walle
app.get('/test-db', (req, res)=>{
    res.send('Database is connected')
});

//ajoutina routes mta3 user lel server
app.use('/api/users', userRoutes);
//ajoutina routes mta3 courses lel server
app.use('/api/courses', courseRoutes);
//ajoutina routes mta3 enrollement lel server
app.use('/api/enrollement', enrollementRoutes);
//ajoutina routes mta3 lesson lel server
app.use('/api/lesson', lessonRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`Server running on ${PORT}`);
});