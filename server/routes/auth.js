// server/routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        return res.status(201).json({ message: 'User registered' });
    } catch (error) {
        console.error('Register error:', error);
        return res.status(400).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) { 
          return res.status(400).json({ message: 'Bad Login!' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
            return res.status(400).json({ message: 'Bad Login' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, {httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        // console.log('Recieved:', { username, password });
        // console.log('Found user:', user);
        // console.log('Password match:', validPassword);
        return res.status(200).json({ message: 'Logged in successfully' });
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
});

router.post('/logout', (req, res) => {
    res.clearCookie('token'); // Remove the token cookie
    return res.json({ message: 'Logged out succesfully!' });
});

module.exports = router;