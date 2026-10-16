import { useState } from 'react';
import LoginPage from './components/LoginPage.jsx';
import TodoPage from './components/TodoPage.jsx';

const AUTH_KEY = 'daylist-authenticated';
const TODOS_KEY = 'daylist-todos';

function readTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(TODOS_KEY) || '[]');
    return Array.isArray(savedTodos) ? savedTodos : [];
  } catch {
    return [];
  }
}

function readAuthentication() {
  const authenticated = localStorage.getItem(AUTH_KEY) === 'true';
  window.history.replaceState(null, '', authenticated ? '#/todos' : '#/login');
  return authenticated;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(readAuthentication);
  const [todos, setTodos] = useState(readTodos);

  function handleLogin() {
    localStorage.setItem(AUTH_KEY, 'true');
    window.history.replaceState(null, '', '#/todos');
    setIsAuthenticated(true);
  }

  function handleLogout() {
    localStorage.removeItem(AUTH_KEY);
    window.history.replaceState(null, '', '#/login');
    setIsAuthenticated(false);
  }

  function updateTodos(nextTodos) {
    setTodos(nextTodos);
    localStorage.setItem(TODOS_KEY, JSON.stringify(nextTodos));
  }

  return isAuthenticated ? (
    <TodoPage todos={todos} onTodosChange={updateTodos} onLogout={handleLogout} />
  ) : (
    <LoginPage onLogin={handleLogin} />
  );
}
