import { useState } from 'react';

function Tier6() {
  const [items, setItems] = useState([
    { id: 1, name: 'HTML' },
    { id: 2, name: 'CSS' }
  ]);
  const [newName, setNewName] = useState('');
  const [editId, setEditId] = useState(null);

  function handleAdd() {
    if (!newName.trim()) return;
    if (editId) {
      setItems(items.map(it => it.id === editId ? { ...it, name: newName.trim() } : it));
      setEditId(null);
    } else {
      setItems([...items, { id: Date.now(), name: newName.trim() }]);
    }
    setNewName('');
  }

  function handleEdit(item) {
    setEditId(item.id);
    setNewName(item.name);
  }

  function handleDelete(id) {
    setItems(items.filter(i => i.id !== id));
  }

  return (
    <div className="tier-card" style={{ padding: 12 }}>
      <h3>Tier 6 — Lists & CRUD</h3>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Tên" />
        <button onClick={handleAdd}>{editId ? 'Lưu' : 'Thêm'}</button>
        {editId && <button onClick={() => { setEditId(null); setNewName(''); }}>Hủy</button>}
      </div>

      <ul style={{ padding: 0, listStyle: 'none' }}>
        {items.map(it => (
          <li key={it.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
            <span>{it.name}</span>
            <span style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => handleEdit(it)}>Sửa</button>
              <button onClick={() => handleDelete(it.id)}>Xóa</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tier6;
