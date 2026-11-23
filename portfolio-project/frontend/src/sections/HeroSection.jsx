import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail, Twitter, Code, Terminal, Database, Sparkles } from 'lucide-react';
import avatarImg from '../assets/avatar.svg';

const roles = [
  'Full-Stack Developer',
  'Software Engineer Intern',
  'React & Node.js Specialist',
  'MySQL & Database Architect'
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        const nextText = isDeleting
          ? currentRole.substring(0, displayText.length - 1)
          : currentRole.substring(0, displayText.length + 1);
        setDisplayText(nextText);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const handleDownloadCV = () => {
    // Generates a mock resume download or links to resume
    const link = document.createElement('a');
    link.href = '/favicon.svg'; // Fallback file or dedicated resume
    link.download = 'Jaivik_Patel_FullStack_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Hero Intro */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="hero-tag">
              <Sparkles size={16} />
              <span>Available for Software Engineering Internships</span>
            </div>

            <h1 className="hero-title">
              Hi, I'm <span className="highlight">Jaivik Patel</span>
            </h1>

            <div className="hero-typing">
              <span>I build</span>
              <span className="typed-text">{displayText}</span>
              <span className="cursor"></span>
            </div>

            <p className="hero-bio">
              A computer science student and passionate full-stack developer dedicated to architecting high-performance web applications, scalable REST APIs, and delightful interactive user experiences.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                <span>View Projects</span>
                <ArrowRight size={18} />
              </a>
              <button onClick={handleDownloadCV} className="btn btn-secondary" title="Download CV / Resume">
                <Download size={18} />
                <span>Download CV</span>
              </button>
            </div>

            <div className="hero-socials">
              <a href="https://github.com/jaivikpatel" target="_blank" rel="noreferrer" className="social-link" title="GitHub">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com/in/jaivikpatel" target="_blank" rel="noreferrer" className="social-link" title="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="mailto:jaivik.patel@devmail.com" className="social-link" title="Email Direct">
                <Mail size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-link" title="Twitter / X">
                <Twitter size={18} />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Avatar with Floating Tech Badges */}
          <motion.div
            className="hero-avatar-wrapper"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <div className="avatar-container">
              <div className="avatar-backdrop-glow"></div>
              <img src={avatarImg} alt="Jaivik Patel Developer Avatar" className="avatar-image" />

              {/* Floating Tech Badges */}
              <div className="floating-badge badge-top-left">
                <Code size={16} color="var(--accent)" />
                <span>React 18 & Framer</span>
              </div>

              <div className="floating-badge badge-bottom-right">
                <Database size={16} color="var(--cyan)" />
                <span>MySQL Relational DB</span>
              </div>

              <div className="floating-badge badge-bottom-left">
                <Terminal size={16} color="var(--accent-light)" />
                <span>Node.js & Express</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

