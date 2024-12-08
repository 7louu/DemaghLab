//routes houma elli ydefinou kifeh serveur yrespondi lel requests mta3 L clients
//ken client yheb yekhou data men aand serveur , lezm serveur "listens" to GET methods
//ken client yheb yabaath data lel serveur , lezm serveur "listens" to POST methods
//Routes = Entry Points
//Controllers = Logic Handlers
const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

//these are functions defined fi userController elli fehm logique elli bch ysir
const {registerUser, loginUser, getUserProfile} = require('../controllers/userController');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/profile', protect, getUserProfile);

module.exports = router;