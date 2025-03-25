import React, { useState } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo} from '../services/api';

const TodoList = ({ setIsAuthenticated }) => {
  const [todos, setTodos] = useState([
    { text: "Wash the dishes", completed: false, emoji: "🍽️" },
    { text: "Learn React", completed: true, emoji: "📚" },
    { text: "Do the laundry", completed: false, emoji: "🧺" },
    { text: "Take a shower", completed: false, emoji: "🚿" },
    { text: "Buy groceries", completed: true, emoji: "🛒" },
    { text: "Make lunch", completed: false, emoji: "🥪" },
    { text: "Check the weather", completed: true, emoji: "🌤️" },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("ALL");

  const handleCreate = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        { text: newTodo.trim(), completed: false, emoji: "📝" },
      ]);
      setNewTodo("");
    }
  };

  const handleToggle = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "ALL") return true;
    if (filter === "Active") return !todo.completed;
    return todo.completed;
  });

  const incompleteCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="space-y-6">
      {/* Input Field */}
      <form onSubmit={handleCreate} className="flex gap-2">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Create a new todo..."
          className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add
        </button>
      </form>

      {/* Todo List */}
      <ul className="space-y-2">
        {filteredTodos.map((todo, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-md"
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(index)}
                className="w-5 h-5 text-blue-500 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
              />
              <span>{todo.emoji}</span>
              <span
                className={
                  todo.completed
                    ? "line-through text-gray-400 dark:text-gray-500"
                    : "text-gray-900 dark:text-white"
                }
              >
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => handleDelete(index)}
              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600"
            >
              X
            </button>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <footer className="text-sm text-gray-500 dark:text-gray-400">
        <div className="flex justify-between items-center mb-2">
          <span>{incompleteCount} items left</span>
          <button
            onClick={handleClearCompleted}
            className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            Clear Completed
          </button>
        </div>
        <div className="flex justify-around mb-2">
          {["ALL", "Active", "Completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`${
                filter === f
                  ? "text-blue-500 dark:text-blue-400"
                  : "hover:text-blue-500 dark:hover:text-blue-400"
              } transition-colors`}
            >
              {f}
            </button>
          ))}
        </div>
        <p className="text-center text-xs">Drag and drop to reorder list</p>
        <p className="text-center text-xs">
          Press{" "}
          <span className="underline cursor-pointer hover:text-blue-500 dark:hover:text-blue-400">
            here
          </span>{" "}
          to restore defult list
        </p>
        <p className="text-center text-xs mt-2">Scott Lewis</p>
        <div className="flex justify-center space-x-2 mt-1">
          <a href="#" className="hover:text-blue-500 dark:hover:textblue-400">
            🐙
          </a>
          <a href="#" className="hover:text-blue-500 dark:hover:text-blue-400">
            🐦
          </a>
          <a href="#" className="hover:text-blue-500 dark:hover:text-blue-400">
            🔗
          </a>
        </div>
      </footer>

      {/* Logout Button */}
      <button
        onClick={() => setIsAuthenticated(false)}
        className="w-full py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default TodoList;