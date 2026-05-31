function Header() {
  return (
    <header className="site-header" style={{ borderBottom: '1px solid var(--border)', padding: '16px 24px' }}>
      <div style={{ maxWidth: 1126, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>My Portfolio</h1>
        <nav>
          <a href="#about" style={{ marginRight: 12 }}>About</a>
          <a href="#portfolio" style={{ marginRight: 12 }}>Portfolio</a>
          <a href="#exercises" style={{ marginRight: 12 }}>Exercises</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
