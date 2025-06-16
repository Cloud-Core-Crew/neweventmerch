const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user_new'); // Use the same user model as registration/login

dotenv.config();

const jwtMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.userId = decoded.id;
        req.user = await User.findById(decoded.id).lean();
        next();
    });
};

module.exports = jwtMiddleware;