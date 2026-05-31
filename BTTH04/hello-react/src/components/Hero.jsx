function Hero() {
  const avatar = "https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/652482931_2135055377270150_5698673402893623222_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGS0MlAAHtj6YqL3rbmuEyzzgmrQYSB-i3OCatBhIH6LRTGWDuxmaOV8yz06Bk8zGVkr6y17xqAnhfpilguD5OU&_nc_ohc=KCtErbJElS4Q7kNvwEUQLg7&_nc_oc=AdpOS_6iY_XQyN56rnyVwdJEyuzbMhrxsrb7Jz3AuvQAVp7RHR9cdXqskZMIu7FCVZc&_nc_zt=23&_nc_ht=scontent.fhan17-1.fna&_nc_gid=m3cH6di9XqRQmzYZk1C3pA&_nc_ss=7b2a8&oh=00_Af8L7HQKbcAEJRpueKzfBvOZO5cBa7ZmGshBebSTdz5XCA&oe=6A2210EA";

  return (
    <section id="hero" style={{ padding: '48px 0' }}>
      <div style={{ maxWidth: 1126, margin: '0 auto', display: 'flex', gap: 20, alignItems: 'center' }}>
        <img src={avatar} alt="Chử Thị Hương avatar" style={{ width: 140, height: 140, objectFit: 'cover', borderRadius: '50%', border: '3px solid var(--accent-bg)' }} />
        <div style={{ textAlign: 'left' }}>
          <h2 style={{ fontSize: 40, margin: '8px 0' }}>Chử Thị Hương</h2>
          <p style={{ fontSize: 18, color: 'var(--text)' }}>Sinh viên năm 2, Đại học Thủy Lợi — đang học và khám phá lập trình Frontend (HTML, CSS, JavaScript, React). Thích thiết kế giao diện thân thiện và học cách tối ưu trải nghiệm người dùng.</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
