import { useState } from 'react';

const FILTERS = ['All', 'Active', 'Completed'];

export default function TodoPage({ todos, onTodosChange, onLogout }) {
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('All');
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const remaining = todos.filter((todo) => !todo.completed).length;
  const visibleTodos = todos.filter((todo) => {
    if (filter === 'Active') return !todo.completed;
    if (filter === 'Completed') return todo.completed;
    return true;
  });

  function addTodo(event) {
    event.preventDefault();
    const title = newTodo.trim();
    if (!title) return;
    onTodosChange([{ id: crypto.randomUUID(), title, completed: false }, ...todos]);
    setNewTodo('');
  }

  function toggleTodo(id) {
    onTodosChange(todos.map((todo) => (
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )));
  }

  function deleteTodo(id) {
    onTodosChange(todos.filter((todo) => todo.id !== id));
  }

  function clearCompleted() {
    onTodosChange(todos.filter((todo) => !todo.completed));
  }

  function startEditing(todo) {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
  }

  function saveEdit(event, id) {
    event.preventDefault();
    const title = editingTitle.trim();
    if (!title) return;
    onTodosChange(todos.map((todo) => (
      todo.id === id ? { ...todo, title } : todo
    )));
    setEditingId(null);
    setEditingTitle('');
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingTitle('');
  }

  return (
    <main className="todo-layout">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Daylist home">
          <span className="brand-mark" aria-hidden="true">d</span>
          <span>daylist</span>
        </a>
        <div className="topbar-right">
          <span className="today-label">YOUR PERSONAL SPACE</span>
          <button className="logout-button" type="button" onClick={onLogout}>
            <span className="logout-icon" aria-hidden="true">↗</span> Log out
          </button>
        </div>
      </header>

      <section className="todo-content" aria-labelledby="todo-title">
        <div className="welcome-row">
          <div>
            <p className="eyebrow">A fresh page</p>
            <h1 id="todo-title">Your day, <span>in focus.</span></h1>
            <p className="muted welcome-copy">Small steps add up. What would you like to get done?</p>
          </div>
          <div className="date-badge"><span className="date-sun">☼</span><span>MAKE TODAY COUNT</span></div>
        </div>

        <form className="add-todo-form" onSubmit={addTodo}>
          <span className="add-icon" aria-hidden="true">＋</span>
          <input
            aria-label="New todo"
            placeholder="Add something to your day..."
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
          />
          <button className="primary-button add-button" type="submit" disabled={!newTodo.trim()}>
            Add task <span aria-hidden="true">↵</span>
          </button>
        </form>

        <div className="list-heading">
          <div className="task-count"><h2>Your tasks</h2><span>{todos.length}</span></div>
          <div className="filter-tabs" role="tablist" aria-label="Filter tasks">
            {FILTERS.map((item) => (
              <button
                className={`filter-tab${filter === item ? ' active' : ''}`}
                type="button"
                role="tab"
                aria-selected={filter === item}
                key={item}
                onClick={() => setFilter(item)}
              >{item}</button>
            ))}
          </div>
        </div>

        <div className="todo-list" aria-live="polite">
          {visibleTodos.length > 0 ? visibleTodos.map((todo) => (
            <article className={`todo-item${todo.completed ? ' completed' : ''}`} key={todo.id}>
              <button
                className="check-button"
                type="button"
                aria-label={todo.completed ? `Mark ${todo.title} active` : `Complete ${todo.title}`}
                aria-pressed={todo.completed}
                onClick={() => toggleTodo(todo.id)}
              >{todo.completed && <span aria-hidden="true">✓</span>}</button>
              {editingId === todo.id ? (
                <form className="edit-todo-form" onSubmit={(event) => saveEdit(event, todo.id)}>
                  <input
                    aria-label="Edit task title"
                    autoFocus
                    value={editingTitle}
                    onChange={(event) => setEditingTitle(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Escape') cancelEdit();
                    }}
                  />
                  <button className="edit-save-button" type="submit" disabled={!editingTitle.trim()}>Save</button>
                  <button className="edit-cancel-button" type="button" onClick={cancelEdit}>Cancel</button>
                </form>
              ) : (
                <>
                  <span className="todo-title">{todo.title}</span>
                  <button className="edit-button" type="button" onClick={() => startEditing(todo)}>Edit</button>
                </>
              )}
              <button className="delete-button" type="button" aria-label={`Delete ${todo.title}`} onClick={() => deleteTodo(todo.id)}>×</button>
            </article>
          )) : (
            <div className="empty-state">
              <span className="empty-icon" aria-hidden="true">✳</span>
              <p className="empty-title">{filter === 'All' ? 'A little room to begin' : `No ${filter.toLowerCase()} tasks`}</p>
              <p>{filter === 'All' ? 'Add a task above and make today yours.' : 'Try another filter or add a new task.'}</p>
            </div>
          )}
        </div>

        <footer className="todo-footer">
          <span><span className="footer-dot" /> <strong>{remaining}</strong> {remaining === 1 ? 'task' : 'tasks'} left to do</span>
          <div className="todo-footer-actions">
            {todos.some((todo) => todo.completed) && (
              <button className="clear-completed-button" type="button" onClick={clearCompleted}>Clear completed</button>
            )}
            <span className="footer-note">TAKE IT ONE STEP AT A TIME <span aria-hidden="true">✦</span></span>
          </div>
        </footer>
      </section>
      <div className="page-decoration" aria-hidden="true">✳</div>
    </main>
  );
}
