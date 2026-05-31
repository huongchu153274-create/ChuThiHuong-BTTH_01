function Contact() {
  return (
    <section id="contact" style={{ padding: '32px 0' }}>
      <div style={{ maxWidth: 1126, margin: '0 auto', textAlign: 'left' }}>
        <h2>Contact</h2>
        <p>Nếu bạn muốn liên hệ, gửi email tới <a href="mailto:huongchu153274@gmail.com">huongchu153274@gmail.com</a> hoặc gửi tin nhắn bên dưới.</p>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <input placeholder="Tên" style={{ flex: '0 0 200px', padding: 8 }} />
          <input placeholder="Email" style={{ flex: '1', padding: 8 }} />
          <button type="submit" style={{ padding: '8px 12px' }}>Gửi</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
