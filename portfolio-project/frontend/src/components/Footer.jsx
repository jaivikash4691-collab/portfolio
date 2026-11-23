import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Twitter, Shield, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <div className="nav-logo" style={{ marginBottom: '0.75rem' }}>
              <span>J</span>aivik<span style={{ color: 'var(--accent)' }}>.</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '380px', fontSize: '0.95rem' }}>
              Aspiring Full-Stack Software Engineer & Intern. Crafting resilient web applications, robust REST APIs, and delightful interactive user experiences.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#fff' }}>Quick Links</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <li><a href="#about">About Me</a></li>
                <li><a href="#skills">Technical Skills</a></li>
                <li><a href="#projects">Featured Projects</a></li>
                <li><a href="#experience">Internships</a></li>
                <li><a href="#contact">Get In Touch</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#fff' }}>Connect</h4>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <a href="https://github.com/jaivikpatel" target="_blank" rel="noreferrer" className="social-link" title="GitHub">
                  <Github size={18} />
                </a>
                <a href="https://linkedin.com/in/jaivikpatel" target="_blank" rel="noreferrer" className="social-link" title="LinkedIn">
                  <Linkedin size={18} />
                </a>
                <a href="mailto:jaivik.patel@devmail.com" className="social-link" title="Email">
                  <Mail size={18} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-link" title="Twitter/X">
                  <Twitter size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Jaivik Patel. Built with React.js, Express.js & MySQL.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              Crafted with <Heart size={14} color="var(--accent)" fill="var(--accent)" /> for Excellence
            </span>
            <Link to="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)' }}>
              <Shield size={14} /> Admin Access
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

