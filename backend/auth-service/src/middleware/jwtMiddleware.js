const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user_new'); // Use the same user model as registration/login

dotenv.config();

const jwtMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log('JWT Middleware: Authorization header:', req.headers['authorization']);
    if (!token) {
        console.error('JWT Middleware: No token provided');
        return res.status(403).json({ message: 'No token provided' });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            console.error('JWT Middleware: Token verification failed:', err.message);
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.userId = decoded.id;
        req.user = await User.findById(decoded.id).lean();
        if (!req.user) {
            console.error('JWT Middleware: No user found for decoded id:', decoded.id);
        }
        next();
    });
};

module.exports = jwtMiddleware;