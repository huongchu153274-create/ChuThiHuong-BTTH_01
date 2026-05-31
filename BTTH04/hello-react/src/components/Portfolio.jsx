import { useState } from 'react';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

function Portfolio() {
  const [items] = useState(projects);
  const [filter, setFilter] = useState('all');

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))]

  const filteredItems = filter === 'all' ? items : items.filter(i => i.category === filter);

  return (
    <section id="portfolio" style={{ padding: '32px 0' }}>
      <div style={{ maxWidth: 1126, margin: '0 auto', textAlign: 'left' }}>
        <h2>Portfolio</h2>

        <div style={{ display: 'flex', gap: 8, margin: '12px 0 24px' }}>
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{ padding: '8px 14px', borderRadius: 20, border: filter===c ? '2px solid var(--accent)' : '1px solid var(--border)', background: filter===c ? 'var(--accent)' : 'transparent', color: filter===c ? '#fff' : 'inherit' }}>
              {c === 'all' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {filteredItems.map(p => (
            <ProjectCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
