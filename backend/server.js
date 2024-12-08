//importina l express module
//importina l connectDB function mel db.js file
const express = require('express');
const connectDb = require('./config/db');
//creatina server express
const app = express();
//connectina aala database doub ma yet7all serveur
connectDb();

//data elli tji mel client tnajem tkoun fi format json 
//express maynjmch yparsi JSON data into Js scriptable objects 
//fi wost express fama built-in middleware yaaml l faza hedhy 
app.use(express.json());

//creatina route bech nchekou ken serveur yemchi
app.get('/', (req, res) =>{
    res.send('Server is running ...');
});
//creatina route bech ntastou database connecte walle
app.get('/test-db', (req, res)=>{
    res.send('Database is connected')
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log('Server running on ${PORT}');
});