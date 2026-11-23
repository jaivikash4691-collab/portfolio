import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, ExternalLink, Code2 } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      if (!isHomePage) return;

      const sections = navItems.map(item => item.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = document.getElementById(sections[i]);
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const handleNavClick = (e, href) => {
    if (isHomePage) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(targetId);
        setMobileMenuOpen(false);
      }
    } else {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          {/* Logo */}
          <Link to="/" className="nav-logo" aria-label="Jaivik Patel Portfolio">
            <span>J</span>aivik<span style={{ color: 'var(--accent)' }}>.</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="nav-links">
            {navItems.map((item) => {
              const secId = item.href.substring(1);
              const isActive = isHomePage && activeSection === secId;
              return (
                <a
                  key={item.label}
                  href={isHomePage ? item.href : `/${item.href}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Admin / Contact */}
          <div className="nav-actions">
            <Link to="/admin" className="btn btn-outline-accent desktop-only" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} title="Admin Dashboard">
              <Shield size={15} />
              <span>Admin</span>
            </Link>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="btn btn-primary desktop-only"
              style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}
            >
              Let's Talk
            </a>

            {/* Mobile Menu Hamburger */}
            <button
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-nav-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-nav-header">
              <span className="nav-logo">
                <span>J</span>aivik.
              </span>
              <button onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff' }}>
                <X size={24} />
              </button>
            </div>

            <div className="mobile-nav-links">
              {navItems.map((item) => {
                const secId = item.href.substring(1);
                const isActive = isHomePage && activeSection === secId;
                return (
                  <a
                    key={item.label}
                    href={isHomePage ? item.href : `/${item.href}`}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-secondary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Shield size={16} /> Admin Portal
              </Link>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Hire / Contact
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

