import React, { useState } from 'react';
import { register, login } from '../services/api';

const Auth = ({ setIsAuthenticated }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        console.log("Auth Handle Submit hit!");
        try {
            if (isLogin) {
                await login(formData);
            } else {
                await register(formData);
            }
            setIsAuthenticated(true);
        }   catch (error) {
            console.error('Error:', error.message, error.response?.data);
            setError(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
      <div className = 'space-y-4'>  
        <form onSubmit = {handleSubmit} className = 'space-y-4'>
            {error && <p className='text-red-500'>{error}</p>} {/* Display error message */}
            
                <input
                    type = 'text'
                    value = {formData.username}
                    onChange = {(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder = 'Username'
                    className = 'w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
            
            
                <input
                    type = 'password'
                    value = {formData.password}
                    onChange = {(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder = 'Password'
                    className = 'w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
            
            <button 
                type = 'submit'
                className = 'w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
            >
                    {isLogin ? 'Login' : 'Register'}
                </button>
            </form>
            <button 
                type = 'button' 
                onClick = {() => setIsLogin(!isLogin)}
                className = 'w-full py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors'
            >
                Switch to {isLogin ? 'Register' : 'Login'}
            </button>
        
    </div>
    );
};

export default Auth;