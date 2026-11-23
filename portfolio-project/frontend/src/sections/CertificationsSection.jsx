import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';
import CertificateModal from '../components/CertificateModal';

export default function CertificationsSection({ certifications = [] }) {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certifications" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Verified Credentials</span>
          <h2 className="section-title">
            Professional <span>Certifications</span>
          </h2>
          <p className="section-subtitle">
            Industry recognized credentials validating competencies in cloud computing, front-end architecture, Node.js development, and SQL.
          </p>
        </div>

        <div className="certifications-grid">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              className="cert-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
            >
              <img
                src={cert.image_url || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80'}
                alt={cert.title}
                className="cert-image"
              />

              <div className="cert-content">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  <ShieldCheck size={14} />
                  <span>VERIFIED BADGE</span>
                </div>

                <h3 className="cert-title">{cert.title}</h3>
                <div className="cert-issuer">{cert.issuing_organization}</div>

                <div className="cert-date">
                  <Calendar size={13} style={{ display: 'inline', marginRight: 4, verticalAlign: -1 }} />
                  <span>Issued {cert.issue_date}</span>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="btn btn-secondary"
                    style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', flex: 1 }}
                  >
                    View Details
                  </button>

                  {cert.credential_url && (
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline-accent"
                      style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
                      title="Verify with issuing organization"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedCert && (
          <CertificateModal
            certificate={selectedCert}
            onClose={() => setSelectedCert(null)}
          />
        )}
      </div>
    </section>
  );
}

