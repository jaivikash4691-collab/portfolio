import React from 'react';
import { X, Github, ExternalLink, Tag, CheckCircle } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const techList = project.technologies
    ? project.technologies.split(',').map((t) => t.trim())
    : [];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div style={{ marginBottom: '1.5rem', borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: '280px' }}>
          <img
            src={project.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <span className="project-category-badge" style={{ position: 'static' }}>
            {project.category}
          </span>
          {Boolean(project.featured) && (
            <span className="project-featured-badge" style={{ position: 'static' }}>
              Featured
            </span>
          )}
        </div>

        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>
          {project.title}
        </h2>

        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.75rem' }}>
          {project.long_description || project.description}
        </p>

        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Tag size={16} color="var(--accent)" /> Technologies & Libraries
          </h4>
          <div className="project-tags">
            {techList.map((tech, idx) => (
              <span key={idx} className="project-tag" style={{ padding: '0.35rem 0.85rem', fontSize: '0.85rem' }}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noreferrer" className="btn btn-primary">
              <ExternalLink size={18} /> Live Demonstration
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noreferrer" className="btn btn-secondary">
              <Github size={18} /> GitHub Repository
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

