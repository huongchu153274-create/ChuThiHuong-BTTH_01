import { useState } from 'react';

function Tier1() {
  const [count, setCount] = useState(0);

  return (
    <div className="tier-card" style={{ padding: 12 }}>
      <h3>Tier 1 — React Flow</h3>
      <p>Component sẽ re-render khi state thay đổi.</p>
      <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Tăng</button>
        <button onClick={() => setCount(0)} style={{ marginLeft: 8 }}>Reset</button>
      </div>
    </div>
  );
}

export default Tier1;
