import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '6rem', fontWeight: 900, color: 'var(--accent)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
        404
      </h1>
      <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '1rem' }}>
        Page Not Found
      </h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '440px', marginBottom: '2rem' }}>
        The page you are looking for might have been moved, removed, or is temporarily unavailable.
      </p>
      <Link to="/" className="btn btn-primary">
        <Home size={18} /> Return to Home
      </Link>
    </div>
  );
}

