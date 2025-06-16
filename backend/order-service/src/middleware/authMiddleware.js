const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  console.log('Auth middleware:', req.method, req.url);
  console.log('Authorization header:', req.headers['authorization']);
  
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    console.error('No authorization header');
    return res.status(401).json({ 
      error: 'Unauthorized',
      message: 'No authorization header provided'
    });
  }
  
  const token = authHeader.split(' ')[1];
  if (!token) {
    console.error('Invalid token format');
    return res.status(401).json({ 
      error: 'Unauthorized',
      message: 'Invalid token format'
    });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      username: decoded.username
    };
    console.log('Token verified for user:', req.user.id);
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(403).json({ 
      error: 'Forbidden',
      message: 'Invalid or expired token',
      details: err.message
    });
  }
};
