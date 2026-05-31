function ProjectCard({ title, category, image, description, tags }) {
  return (
    <div className={`project-card ${category}`} style={{ border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
      <div className="project-image">
        <img src={image} alt={title} style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
      </div>
      <div style={{ padding: 12 }}>
        <div style={{ fontSize: 12, color: 'var(--text)' }}>{category}</div>
        <h3 style={{ margin: '6px 0' }}>{title}</h3>
        <p style={{ margin: '8px 0', color: 'var(--text)' }}>{description}</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {tags?.map(tag => (
            <span key={tag} style={{ background: 'var(--accent)', color: '#fff', padding: '4px 8px', borderRadius: 16, fontSize: 12 }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
