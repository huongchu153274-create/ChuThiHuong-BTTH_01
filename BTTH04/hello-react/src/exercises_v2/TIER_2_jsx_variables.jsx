function Tier2() {
  const name = 'Chử Thị Hương';
  const skills = ['HTML', 'CSS', 'JavaScript'];

  return (
    <div className="tier-card" style={{ padding: 12 }}>
      <h3>Tier 2 — JSX Variables</h3>
      <p>Xin chào {name}!</p>
      <p>Kỹ năng: {skills.join(', ')}</p>
    </div>
  );
}

export default Tier2;
