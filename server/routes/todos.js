const express = require('express');
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    console.log('GET route hit');
    const todos = await Todo.find({ userId: req.user.id });
    res.json(todos);
});

router.post('/', auth, async (req, res) => {
    console.log('POST route hit');
    const todo = new Todo({
        userId: req.user.id,
        text: req.body.text
    });
    await todo.save();
    res.status(201).json(todo);
});

router.put('/:id', auth, async (req, res) => {
    console.log('PUT route hit');
    const todo = await Todo.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        req.body,
        { new: true }
    );
    res.json(todo);
});

router.delete('/:id', auth, async (req, res) => {
    
    await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: 'Todo deleted' });
});

module.exports = router;