import React from 'react';
import { ExternalLink, Github, Info } from 'lucide-react';

export default function ProjectCard({ project, onOpenDetails }) {
  const techList = project.technologies
    ? project.technologies.split(',').map((t) => t.trim())
    : [];

  return (
    <div className="project-card">
      <div className="project-image-box">
        <img
          src={project.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'}
          alt={project.title}
          className="project-image"
          loading="lazy"
        />
        <span className="project-category-badge">{project.category}</span>
        {Boolean(project.featured) && (
          <span className="project-featured-badge">Featured</span>
        )}
      </div>

      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>

        <div className="project-tags">
          {techList.slice(0, 4).map((tech, idx) => (
            <span key={idx} className="project-tag">
              {tech}
            </span>
          ))}
          {techList.length > 4 && (
            <span className="project-tag">+{techList.length - 4} more</span>
          )}
        </div>

        <div className="project-links">
          <button
            onClick={() => onOpenDetails(project)}
            className="project-link-btn"
            style={{ cursor: 'pointer' }}
          >
            <Info size={16} /> Details
          </button>

          <div style={{ display: 'flex', gap: '1rem' }}>
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="project-link-btn"
                title="View Source Code"
              >
                <Github size={16} /> Code
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                className="project-link-btn"
                style={{ color: 'var(--accent)' }}
                title="Live Demonstration"
              >
                <ExternalLink size={16} /> Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

