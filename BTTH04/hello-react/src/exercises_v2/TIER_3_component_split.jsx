function Tier3() {
  function UserCard({ name, email }) {
    return (
      <div style={{ padding: 8, border: '1px solid var(--border)', borderRadius: 6 }}>
        <strong>{name}</strong>
        <div style={{ fontSize: 13 }}>{email}</div>
      </div>
    );
  }

  return (
    <div className="tier-card" style={{ padding: 12 }}>
      <h3>Tier 3 — Component Split</h3>
      <p>Ví dụ tách component `UserCard`:</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <UserCard name="Minh" email="minh@example.com" />
        <UserCard name="Linh" email="linh@example.com" />
      </div>
    </div>
  );
}

export default Tier3;
