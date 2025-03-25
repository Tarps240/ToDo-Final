import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true // Send cookies when making requests
});

export const register = (data) => {
    console.log('Request URL:', api.getUri({ url: '/auth/register' }));
    return api.post('/auth/register', data);
};

// export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const logout = () => api.post('/auth/logout');
export const getTodos = () => api.get('/todos');
export const createTodo = (text) => api.post('/todos', { text });
export const updateTodo = (id, completed) => api.put(`/todos/${id}`, { completed });
export const deleteTodo = (id) => api.delete(`/todos/${id}`);