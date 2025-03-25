const express = require('express');
const Todo = require('../models/Todo');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all todos for the authenticated user
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user.todos);
    }   catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new todo
router.post('/', auth, async (req, res) => {
    try {
        const { text } = req.body;
        const user = await User.findBiId(req.user.id);
        user.todos.push({ text });
        await user.save();
        res.status(201).json(user.todos);
    }   catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a todo
router.put('/:id', auth, async (req, res) => {
    try {
        const { completed } = req.body;
        const user = await User.findById(req.user.id);
        const todo = user.todos.id(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        todo.completed = cokpleted;
        await user.save();
        res.json(user.todos);
    }   catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a todo
router.delete('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.todos = user.todos.filter((todo) => todo._id.toString() !== req.params.id);
        await user.save();
        res.json(user.todos);
    }   catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;