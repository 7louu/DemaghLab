const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware to check if the user is authenticated
const protect = async (req, res, next) => {
    let token;

    // Check if there's a Bearer token in the Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get the token from the Authorization header
            token = req.headers.authorization.split(' ')[1];

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get the user data from the decoded token and attach it to the req object
            req.user = await User.findById(decoded.id).select('-password');
            
            next();  // Continue to the next middleware or route handler
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    // If no token is found, return an error
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Middleware to check if the user is an admin
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();  // Continue to the next middleware or route handler
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};

// Middleware to check if the user is an instructor
const instructor = (req, res, next) => {
    if (req.user && req.user.role === 'instructor') {
        next();  // Continue to the next middleware or route handler
    } else {
        res.status(403).json({ message: 'Not authorized as an instructor' });
    }
};

// Middleware to check if the user is a regular user
const regularUser = (req, res, next) => {
    if (req.user && req.user.role === 'regular') {
        next();  // Continue to the next middleware or route handler
    } else {
        res.status(403).json({ message: 'Not authorized as a regular user' });
    }
};

module.exports = { protect, admin, instructor, regularUser };
