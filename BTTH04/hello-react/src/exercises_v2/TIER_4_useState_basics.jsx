import { useState } from 'react';

function Tier4() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="tier-card" style={{ padding: 12 }}>
      <h3>Tier 4 — useState Basics</h3>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div>
          <p>Count: {count}</p>
          <button onClick={() => setCount(count + 1)}>+1</button>
        </div>
        <div>
          <input value={text} onChange={e => setText(e.target.value)} placeholder="Type..." />
          <div>You typed: {text}</div>
        </div>
        <div>
          <button onClick={() => setIsOn(!isOn)}>{isOn ? 'ON' : 'OFF'}</button>
        </div>
      </div>
    </div>
  );
}

export default Tier4;
