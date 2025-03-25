import React, { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo, logout } from '../services/api';

const TodoList = ({ setIsAuthenticated }) => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            setIsLoading(true);
            const response = await getTodos();
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newTodo.trim()) return;
        
        try {
            setIsLoading(true);
            const response = await createTodo(newTodo);
            setTodos(prevTodos => [...prevTodos, response.data]);
            setNewTodo('');
        } catch (error) {
            console.error('Error creating todo:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async (id, completed) => {
        try {
            setIsLoading(true);
            const response = await updateTodo(id, !completed);
            setTodos(prevTodos => 
                prevTodos.map(todo => 
                    todo._id === id ? response.data : todo
                )
            );
        } catch (error) {
            console.error('Error updating todo:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            setIsLoading(true);
            await deleteTodo(id);
            setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            setIsAuthenticated(false);
        }   catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleCreate}>
                <input
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="New todo..."
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Adding...' : 'Add'}
                </button>
            </form>
            <ul>
                {todos.map((todo) => (
                    <li key={todo._id}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleUpdate(todo._id, todo.completed)}
                            disabled={isLoading}
                        />
                        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                            {todo.text}
                        </span>
                        <button 
                            onClick={() => handleDelete(todo._id)}
                            disabled={isLoading}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default TodoList;