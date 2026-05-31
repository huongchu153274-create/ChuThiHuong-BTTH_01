function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <div style={{ display: "flex", alignItems: "center", padding: "10px", borderBottom: "1px solid #ccc" }}>
            <input 
                type="checkbox" 
                checked={todo.done} 
                onChange={() => onToggle(todo.id)} 
            />
            <span style={{ marginLeft: "10px", textDecoration: todo.done ? "line-through" : "none" }}>
                {todo.text}
            </span>
            <button onClick={() => onDelete(todo.id)} style={{ marginLeft: "auto" }}>Xóa</button>
        </div>
    );
}

export default TodoItem;