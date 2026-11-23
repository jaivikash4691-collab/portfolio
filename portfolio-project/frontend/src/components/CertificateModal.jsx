import React from 'react';
import { X, ExternalLink, Award, Calendar, ShieldCheck } from 'lucide-react';

export default function CertificateModal({ certificate, onClose }) {
  if (!certificate) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div style={{ marginBottom: '1.5rem', borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: '240px' }}>
          <img
            src={certificate.image_url || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80'}
            alt={certificate.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', marginBottom: '0.5rem' }}>
          <Award size={20} />
          <span style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase' }}>Verified Credential</span>
        </div>

        <h2 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '0.75rem' }}>
          {certificate.title}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
          <p><strong style={{ color: '#fff' }}>Issuer:</strong> {certificate.issuing_organization}</p>
          <p><strong style={{ color: '#fff' }}>Completion Date:</strong> {certificate.issue_date}</p>
          {certificate.credential_id && (
            <p><strong style={{ color: '#fff' }}>Credential ID:</strong> <code style={{ color: 'var(--cyan)' }}>{certificate.credential_id}</code></p>
          )}
        </div>

        <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
          {certificate.credential_url && (
            <a href={certificate.credential_url} target="_blank" rel="noreferrer" className="btn btn-primary">
              <ExternalLink size={18} /> Verify Credential Online
            </a>
          )}
          <button onClick={onClose} className="btn btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

