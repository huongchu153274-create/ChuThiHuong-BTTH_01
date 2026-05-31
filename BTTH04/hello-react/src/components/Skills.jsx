const skills = [
  { name: 'HTML5', level: 95, category: 'frontend' },
  { name: 'CSS', level: 90, category: 'frontend' },
  { name: 'JavaScript', level: 85, category: 'frontend' },
  { name: 'React', level: 88, category: 'frontend' },
  { name: 'Node.js', level: 70, category: 'backend' }
];

function Skills() {
  return (
    <section id="skills" style={{ padding: '24px 0' }}>
      <div style={{ maxWidth: 1126, margin: '0 auto', textAlign: 'left' }}>
        <h2>Skills</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {skills.map(s => (
            <div key={s.name} style={{ minWidth: 120, padding: 8, border: '1px solid var(--border)', borderRadius: 8 }}>
              <strong>{s.name}</strong>
              <div style={{ height: 8, background: 'var(--code-bg)', marginTop: 8, borderRadius: 4 }}>
                <div style={{ width: `${s.level}%`, height: '100%', background: 'var(--accent)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
