import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import { Layers, Sparkles } from 'lucide-react';

const projectCategories = ['All', 'Full-Stack', 'Frontend', 'Backend & APIs', 'AI / ML'];

export default function ProjectsSection({ projects = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProjectModal, setActiveProjectModal] = useState(null);

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="projects" className="section" style={{ background: 'rgba(255, 255, 255, 0.015)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Recent Creations</span>
          <h2 className="section-title">
            Featured <span>Projects</span>
          </h2>
          <p className="section-subtitle">
            A curated showcase of full-stack web applications, AI portals, and scalable microservices backed by MySQL and Express.
          </p>
        </div>

        {/* Category Filters */}
        <div className="projects-filter">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="projects-grid">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
              >
                <ProjectCard
                  project={project}
                  onOpenDetails={(p) => setActiveProjectModal(p)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            <p>No projects found in this category.</p>
          </div>
        )}

        {/* Project Details Modal */}
        {activeProjectModal && (
          <ProjectModal
            project={activeProjectModal}
            onClose={() => setActiveProjectModal(null)}
          />
        )}
      </div>
    </section>
  );
}

