import { useState } from 'react';

function Tier5() {
  const [message, setMessage] = useState('Chưa click');

  function handleClick() {
    setMessage('Bạn đã click!');
  }

  return (
    <div className="tier-card" style={{ padding: 12 }}>
      <h3>Tier 5 — Events Basics</h3>
      <p>Message: {message}</p>
      <button onClick={handleClick}>Click me</button>
      <div style={{ marginTop: 8 }}>
        <input onKeyDown={(e) => e.key === 'Enter' && setMessage('Enter pressed')} placeholder="Press Enter" />
      </div>
    </div>
  );
}

export default Tier5;
