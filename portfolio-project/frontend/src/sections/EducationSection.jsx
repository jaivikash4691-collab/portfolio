import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar, BookmarkCheck } from 'lucide-react';

export default function EducationSection({ education = [] }) {
  return (
    <section id="education" className="section" style={{ background: 'rgba(255, 255, 255, 0.015)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Academic Background</span>
          <h2 className="section-title">
            My <span>Education</span>
          </h2>
          <p className="section-subtitle">
            Formal foundation in Computer Science, algorithms, data structures, and software engineering principles.
          </p>
        </div>

        <div className="timeline-container">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              className="timeline-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="timeline-header">
                <div>
                  <h3 className="timeline-role">{edu.degree}</h3>
                  <div className="timeline-org">{edu.institution}</div>
                </div>
                {edu.grade_or_gpa && (
                  <span className="timeline-badge" style={{ color: 'var(--cyan)', borderColor: 'rgba(0, 242, 254, 0.3)', background: 'rgba(0, 242, 254, 0.08)' }}>
                    Grade / GPA: {edu.grade_or_gpa}
                  </span>
                )}
              </div>

              <div className="timeline-period">
                <Calendar size={14} />
                <span>
                  {edu.start_year} – {edu.end_year}
                </span>
                <span style={{ margin: '0 0.4rem' }}>•</span>
                <GraduationCap size={14} />
                <span>{edu.department}</span>
              </div>

              {edu.achievements && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  <Award size={18} color="var(--accent)" style={{ minWidth: 18, marginTop: 3 }} />
                  <span>{edu.achievements}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

