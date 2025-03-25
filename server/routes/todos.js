const express = require('express');
const Todo = require('../models/Todo');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all todos for the authenticated user
router.get('/', auth, async (req, res) => {
    try {
        console.log('GET route hit');
        const todos = await Todo.find({ userId: req.user.id });
        res.json(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/', auth, async (req, res) => {
    try {
        console.log('POST route hit');
        const todo = new Todo({
            userId: req.user.id,
            text: req.body.text
        });
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        console.log('PUT route hit');
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            req.body,
            { new: true }
        );
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        console.log('DELETE route hit');
        const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;