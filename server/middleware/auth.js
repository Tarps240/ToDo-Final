const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    console.log('Auth middleware called');
    console.log('Cookies:', req.cookies);
    const token = req.cookies.token;
    if (!token) {
        console.log('No token found in cookies');
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        console.log('MIDDLEWARE Auth Hit - Token found, attempting verification');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token verified successfully');
        req.user = decoded;
        next();
    } catch (error) {
        console.log('Token verification failed:', error.message);
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = auth;