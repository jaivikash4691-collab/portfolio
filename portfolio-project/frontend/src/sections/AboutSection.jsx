import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Award, Briefcase, GraduationCap, Code } from 'lucide-react';

export default function AboutSection({ skills = [], experience = [], education = [] }) {
  const [activeTab, setActiveTab] = useState('skills');

  // Filter highlights for tabs
  const topSkills = skills.slice(0, 6);
  const recentExp = experience.slice(0, 3);
  const recentEdu = education.slice(0, 2);

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Get To Know Me</span>
          <h2 className="section-title">
            About <span>Me</span>
          </h2>
          <p className="section-subtitle">
            A developer passionate about solving real-world challenges through elegant, test-driven software engineering.
          </p>
        </div>

        <div className="about-grid">
          {/* Left Column: Visual Profile Card with Stats */}
          <motion.div
            className="about-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src="https://images.unsplash.com/photo-1534972195531-a756b1126f24?auto=format&fit=crop&w=800&q=80"
              alt="Jaivik Patel Coding Setup"
              className="about-card-image"
            />
            <div className="about-stats-overlay">
              <div className="stat-item">
                <div className="stat-number">2+</div>
                <div className="stat-label">Years of Coding</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">15+</div>
                <div className="stat-label">Projects Built</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio & GreatStack Signature Tabs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
              I am a dedicated Computer Science undergraduate actively seeking software engineering internship opportunities. My technical foundation spans across modern full-stack development, including React.js frontend engineering, Express.js microservices, and structured MySQL database modeling.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.8 }}>
              I thrive on building scalable products from concept to deployment. Whether tuning SQL query performance with composite indexes or orchestrating smooth Framer Motion interfaces, I focus on craftsmanship, code cleanliness, and measurable user impact.
            </p>

            {/* GreatStack Signature Tab Navigation */}
            <div className="about-tabs-nav">
              <button
                className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
                onClick={() => setActiveTab('skills')}
              >
                Skills Overview
                {activeTab === 'skills' && <motion.div layoutId="tab-indicator" className="tab-indicator" />}
              </button>

              <button
                className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
                onClick={() => setActiveTab('experience')}
              >
                Experience / Internships
                {activeTab === 'experience' && <motion.div layoutId="tab-indicator" className="tab-indicator" />}
              </button>

              <button
                className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
                onClick={() => setActiveTab('education')}
              >
                Education
                {activeTab === 'education' && <motion.div layoutId="tab-indicator" className="tab-indicator" />}
              </button>
            </div>

            {/* Tab Content Display */}
            <div className="tab-content">
              <AnimatePresence mode="popLayout" initial={false}>
                {activeTab === 'skills' && (
                  <motion.div
                    key="skills-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="tab-list"
                  >
                    {topSkills.map((s) => (
                      <div key={s.id} className="tab-list-item">
                        <span className="tab-item-title">{s.name} ({s.proficiency}%)</span>
                        <span className="tab-item-desc">{s.category} - Proficient in real-world application & design patterns.</span>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'experience' && (
                  <motion.div
                    key="exp-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="tab-list"
                  >
                    {recentExp.map((exp) => (
                      <div key={exp.id} className="tab-list-item">
                        <span className="tab-item-title">
                          {exp.role} @ {exp.organization}
                        </span>
                        <span className="tab-item-desc">
                          {exp.start_date} - {exp.end_date} | {exp.location}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'education' && (
                  <motion.div
                    key="edu-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="tab-list"
                  >
                    {recentEdu.map((edu) => (
                      <div key={edu.id} className="tab-list-item">
                        <span className="tab-item-title">{edu.degree}</span>
                        <span className="tab-item-desc">
                          {edu.institution} ({edu.start_year} - {edu.end_year}) | CGPA: {edu.grade_or_gpa}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

