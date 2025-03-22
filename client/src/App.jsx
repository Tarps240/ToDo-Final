import React, { useState } from 'react';
import Auth from './components/Auth';
import TodoList from './components/TodoList';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className={darkMode ? 'dark' : ''}>
            <div className="min-h-screen bg-gradient-to-r from-[var(--color-light)] to-[var(--color-button)] dark:from-[var(--color-dark)] dark:to-[var(--color-light)] flex items-center justify-center p-4">
                <div className="w-full max-w-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <header className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">TODO</h1>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="text-2xl text-gray-800 dark:text-white"
                            aria-label="Toggle theme"
                        >
                            {darkMode ? '🌞' : '🌜'}
                        </button>
                    </header>
                    {isAuthenticated ? (
                        <TodoList setIsAuthenticated={setIsAuthenticated} />
                    ) : (
                        <Auth setIsAuthenticated={setIsAuthenticated} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;