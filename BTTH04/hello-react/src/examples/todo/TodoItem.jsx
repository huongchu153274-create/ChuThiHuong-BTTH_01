function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: 8, borderBottom: '1px solid var(--border)' }}>
      <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />
      <div style={{ flex: 1, textDecoration: todo.done ? 'line-through' : 'none' }}>{todo.text}</div>
      <button onClick={() => onDelete(todo.id)}>Xóa</button>
    </div>
  );
}

export default TodoItem;
