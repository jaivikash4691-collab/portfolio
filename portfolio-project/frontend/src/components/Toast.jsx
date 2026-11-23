import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  const bgStyles = {
    success: 'rgba(16, 185, 129, 0.95)',
    error: 'rgba(239, 68, 68, 0.95)',
    info: 'rgba(255, 0, 79, 0.95)'
  };

  const icons = {
    success: <CheckCircle2 size={20} color="#fff" />,
    error: <AlertCircle size={20} color="#fff" />,
    info: <Info size={20} color="#fff" />
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        background: bgStyles[type] || bgStyles.info,
        color: '#ffffff',
        padding: '0.85rem 1.5rem',
        borderRadius: 'var(--radius-full)',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
        zIndex: 3000,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontWeight: 600,
        fontSize: '0.95rem',
        maxWidth: '90vw'
      }}
    >
      {icons[type]}
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          style={{ background: 'transparent', color: '#fff', marginLeft: '0.5rem', cursor: 'pointer' }}
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

