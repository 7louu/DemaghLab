const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const {name, email, password, role} = req.body;
        const userExists = await User.findOne({email});
        if (userExists){
            return res.status(400).json({message: 'User already exists!'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password : hashedPassword,
            role,
        });
        if (user){
            res.status(201).json({
                message: 'User registered successfully!',
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({message: 'Invalid user data!'});
        }
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
}

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      res.status(200).json({
        message: 'User Logged in successfully!',
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };  

const getUserProfile = async (req, res) => {
    console.log('User info from token:', req.user);
    try {
        const user = await User.findById(req.user.id);
        if (user) {
            res.json({
                message: 'Successfully Loaded User Profile',
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error'});
    }
};

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
};