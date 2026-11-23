import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Database, Layers, ArrowUpRight } from 'lucide-react';

const services = [
  {
    icon: <Layout size={28} />,
    title: 'Frontend Development',
    description: 'Engineering responsive, accessible, pixel-perfect user interfaces with React.js, Tailwind CSS, and buttery smooth Framer Motion micro-interactions.'
  },
  {
    icon: <Server size={28} />,
    title: 'Backend & REST APIs',
    description: 'Architecting secure, modular, high-throughput Express.js RESTful APIs with JWT authentication, centralized error handling, and robust input validation.'
  },
  {
    icon: <Database size={28} />,
    title: 'MySQL & Relational DBs',
    description: 'Designing normalized relational schemas, indexing strategies, ACID transactional integrity, and optimized query execution with mysql2.'
  },
  {
    icon: <Layers size={28} />,
    title: 'Full-Stack Integration',
    description: 'Connecting seamless client experiences with resilient backend services, state management, automated testing, and CI/CD cloud deployment on Vercel & Render.'
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="section" style={{ background: 'rgba(255, 255, 255, 0.01)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Capabilities</span>
          <h2 className="section-title">
            My <span>Services</span>
          </h2>
          <p className="section-subtitle">
            Core technical specialties I bring to engineering teams and enterprise web initiatives.
          </p>
        </div>

        <div className="services-grid">
          {services.map((srv, index) => (
            <motion.div
              key={srv.title}
              className="service-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="service-icon-box">{srv.icon}</div>
              <h3 className="service-title">{srv.title}</h3>
              <p className="service-desc">{srv.description}</p>
              <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-light)', fontSize: '0.85rem', fontWeight: 600 }}>
                <span>Learn more</span>
                <ArrowUpRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

