import React, { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo, logout } from '../services/api';

const TodoList = ({ setIsAuthenticated }) => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    // Fetch todos on mount and when todos change.
    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await getTodos();
            setTodos(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newTodo) return;
        await createTodo({ text: newTodo });
        setNewTodo('');
        fetchTodos(); // Live update
    };

    const handleUpdate = async (id, completed) => {
        await updateTodo(id, { completed: !completed });
        fetchTodos(); // Live update
    };

    const handleDelete = async (id) => {
        await deleteTodo(id);
        fetchTodos(); // Live update
    };

    const handleLogout = async () => {
        try {
            await logout();
            setIsAuthenticated(false); // Redirect to login
        }   catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className='max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md animate-fade-in'>
            <button
                onClick={handleLogout}
                className='mb-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors'
            >
                Logout
            </button>
            <form onSubmit = {handleCreate} className = 'flex gap-2 mb-6'>
                <input
                    value = {newTodo}
                    onChange = {(e) => setNewTodo(e.target.value)}
                    placeholder = 'New todo'
                    className = 'flex-1 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <button 
                    type = 'submit'
                    className = 'px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors'
                >
                    Add
                </button>
            </form>
            <ul className = 'space-y-4'>
              {todos.map((todo) => (
                <li 
                    key = {todo._id}
                    className = 'flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors'
                >
                   <div className = 'flex items-center gap-3'> 
                    <input
                        type = 'checkbox'
                        checked = {todo.completed}
                        onChange = {() => handleUpdate(todo._id, todo.completed)}
                        className = 'w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500'
                    />
                    <span className = {todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}>
                        {todo.text}
                    </span>
                     </div>
                    <button 
                        onClick = {() => handleDelete(todo._id)}
                        className = 'px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors'
                    >
                        Delete
                    </button>
                </li>
              ))}
            </ul>
        </div>
    );
};

export default TodoList;