import { useState } from 'react';
import TodoItem from './TodoItem';
import TodoFilter from './TodoFilter';

function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Học React', done: false },
    { id: 2, text: 'Làm bài tập', done: true }
  ]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  function addTodo() {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input.trim(), done: false }]);
    setInput('');
  }

  function toggleTodo(id) {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  function deleteTodo(id) {
    setTodos(todos.filter(t => t.id !== id));
  }

  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.done;
    if (filter === 'completed') return t.done;
    return true;
  });

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 8, padding: 12 }}>
      <h4>Mini Todo (Tier 7)</h4>
      <div style={{ display: 'flex', gap: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Thêm việc..." />
        <button onClick={addTodo}>Thêm</button>
      </div>
      <TodoFilter filter={filter} setFilter={setFilter} />
      <div>
        {filtered.map(t => (
          <TodoItem key={t.id} todo={t} onToggle={toggleTodo} onDelete={deleteTodo} />
        ))}
      </div>
    </div>
  );
}

export default TodoApp;
