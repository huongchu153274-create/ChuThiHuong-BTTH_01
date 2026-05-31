import { useState } from "react";

function SimpleCRUD() {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState("");
    
    // State cho việc sửa
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

    // CREATE
    function addTask() {
        if (!input.trim()) return;
        const newTask = { id: Date.now(), text: input };
        setTasks([...tasks, newTask]);
        setInput("");
    }

    // DELETE
    function deleteTask(id) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    // Bắt đầu sửa
    function startEdit(task) {
        setEditingId(task.id);
        setEditText(task.text);
    }

    // SAVE (Update)
    function saveTask(id) {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, text: editText } : task
        ));
        setEditingId(null);
        setEditText("");
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Danh sách công việc</h2>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Việc mới..." />
            <button onClick={addTask}>Thêm</button>

            <ul>
                {tasks.map(task => (
                    <li key={task.id} style={{ marginBottom: "10px" }}>
                        {editingId === task.id ? (
                            // Giao diện khi đang ở chế độ SỬA
                            <>
                                <input 
                                    value={editText} 
                                    onChange={(e) => setEditText(e.target.value)} 
                                />
                                <button onClick={() => saveTask(task.id)}>Lưu</button>
                            </>
                        ) : (
                            // Giao diện khi ở chế độ XEM
                            <>
                                {task.text} 
                                <button onClick={() => startEdit(task)}>Sửa</button>
                                <button onClick={() => deleteTask(task.id)}>Xóa</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SimpleCRUD;