import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';

export default function ContactSection({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please provide your name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errs.subject = 'Subject is required (at least 3 characters).';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await api.submitContact(formData);
      setLoading(false);
      setSubmitted(true);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#ff004f', '#ff3366', '#00f2fe', '#ffffff']
      });

      if (onShowToast) {
        onShowToast(response.message || 'Message sent successfully! I will reply shortly.', 'success');
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      setLoading(false);
      const errMsg = err.message || 'Failed to submit message. Please try again.';
      if (onShowToast) {
        onShowToast(errMsg, 'error');
      }
    }
  };

  return (
    <section id="contact" className="section" style={{ background: 'rgba(255, 255, 255, 0.015)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Get In Touch</span>
          <h2 className="section-title">
            Contact <span>Me</span>
          </h2>
          <p className="section-subtitle">
            Interested in hiring me for an internship or full-stack software role? Drop a message below and let's talk!
          </p>
        </div>

        <div className="contact-grid">
          {/* Left: Contact Info Details */}
          <motion.div
            className="contact-info-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '0.75rem' }}>
                Let's Discuss An Opportunity
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                I am actively seeking software engineering and full-stack developer internships. My inbox is always open whether you have a question, a project inquiry, or just want to say hi!
              </p>
            </div>

            <div className="contact-item">
              <div className="contact-icon-box">
                <Mail size={22} />
              </div>
              <div>
                <div className="contact-item-title">Email Direct</div>
                <a href="mailto:jaivik.patel@devmail.com" className="contact-item-value" style={{ color: 'var(--accent-light)' }}>
                  jaivik.patel@devmail.com
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon-box">
                <Phone size={22} />
              </div>
              <div>
                <div className="contact-item-title">Phone / WhatsApp</div>
                <div className="contact-item-value">+91 (987) 654-3210</div>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon-box">
                <MapPin size={22} />
              </div>
              <div>
                <div className="contact-item-title">Location</div>
                <div className="contact-item-value">Gujarat / Bengaluru, India (Open to Remote & Relocation)</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Working Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Sarah Jenkins"
                    className="form-control"
                    disabled={loading}
                  />
                  {errors.name && <div className="form-error">{errors.name}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">Your Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="sarah@company.com"
                    className="form-control"
                    disabled={loading}
                  />
                  {errors.email && <div className="form-error">{errors.email}</div>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Software Engineer Internship Inquiry"
                  className="form-control"
                  disabled={loading}
                />
                {errors.subject && <div className="form-error">{errors.subject}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Your Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Tell me about the role, technical stack, or project..."
                  className="form-control"
                  style={{ resize: 'vertical' }}
                  disabled={loading}
                />
                {errors.message && <div className="form-error">{errors.message}</div>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Submitting Message to MySQL...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {submitted && (
                <div style={{ marginTop: '1rem', padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                  <CheckCircle2 size={18} />
                  <span>Your message has been safely saved in the database! Thank you.</span>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

