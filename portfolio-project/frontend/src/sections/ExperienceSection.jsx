import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export default function ExperienceSection({ experience = [] }) {
  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Career Journey</span>
          <h2 className="section-title">
            Internships & <span>Experience</span>
          </h2>
          <p className="section-subtitle">
            Hands-on software engineering internships delivering customer-facing features, API performance optimizations, and agile collaboration.
          </p>
        </div>

        <div className="timeline-container">
          {experience.map((exp, index) => {
            const respPoints = exp.responsibilities
              ? exp.responsibilities.split('\n').filter(Boolean)
              : [];
            const skillsList = exp.skills_gained
              ? exp.skills_gained.split(',').map((s) => s.trim())
              : [];

            return (
              <motion.div
                key={exp.id}
                className="timeline-card"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-role">{exp.role}</h3>
                    <div className="timeline-org">{exp.organization}</div>
                  </div>
                  <span className="timeline-badge">{exp.employment_type || 'Internship'}</span>
                </div>

                <div className="timeline-period">
                  <Calendar size={14} />
                  <span>
                    {exp.start_date} – {exp.is_current ? 'Present' : exp.end_date}
                  </span>
                  {exp.location && (
                    <>
                      <span style={{ margin: '0 0.4rem' }}>•</span>
                      <MapPin size={14} />
                      <span>{exp.location}</span>
                    </>
                  )}
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  {respPoints.map((point, pIdx) => (
                    <div
                      key={pIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.6rem',
                        marginBottom: '0.5rem',
                        color: 'var(--text-secondary)',
                        fontSize: '0.92rem',
                        lineHeight: 1.6
                      }}
                    >
                      <CheckCircle2 size={16} color="var(--accent)" style={{ minWidth: 16, marginTop: 4 }} />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {skillsList.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                    {skillsList.map((skill, sIdx) => (
                      <span key={sIdx} className="project-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

