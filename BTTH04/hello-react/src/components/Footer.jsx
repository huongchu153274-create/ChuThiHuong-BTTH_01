function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '20px 24px', marginTop: 40 }}>
      <div style={{ maxWidth: 1126, margin: '0 auto', textAlign: 'center' }}>
        <small>© {new Date().getFullYear()} — My Portfolio</small>
      </div>
    </footer>
  );
}

export default Footer;
