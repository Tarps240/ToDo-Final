const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    text: { type: String, required:true },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    todos: [todoSchema], // Array to store todos for this user
});

module.exports = mongoose.model('User', userSchema);