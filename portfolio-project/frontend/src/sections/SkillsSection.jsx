import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code,
  Layout,
  Server,
  Database,
  Cpu,
  Terminal,
  CheckCircle2,
  Atom,
  Layers,
  Sparkles,
  Palette,
  Smartphone,
  Globe,
  Network,
  Share2,
  KeyRound,
  ShieldCheck,
  Boxes,
  FileSpreadsheet,
  GitFork,
  Zap,
  Bot,
  BrainCircuit,
  Binary,
  GitBranch,
  Container,
  Send,
  CloudLightning,
  Code2
} from 'lucide-react';

const iconMap = {
  Code: <Code size={20} />,
  Code2: <Code2 size={20} />,
  Layout: <Layout size={20} />,
  Server: <Server size={20} />,
  Database: <Database size={20} />,
  Cpu: <Cpu size={20} />,
  Terminal: <Terminal size={20} />,
  Atom: <Atom size={20} />,
  Layers: <Layers size={20} />,
  Sparkles: <Sparkles size={20} />,
  Palette: <Palette size={20} />,
  Smartphone: <Smartphone size={20} />,
  Globe: <Globe size={20} />,
  Network: <Network size={20} />,
  Share2: <Share2 size={20} />,
  KeyRound: <KeyRound size={20} />,
  ShieldCheck: <ShieldCheck size={20} />,
  Boxes: <Boxes size={20} />,
  FileSpreadsheet: <FileSpreadsheet size={20} />,
  GitFork: <GitFork size={20} />,
  Zap: <Zap size={20} />,
  Bot: <Bot size={20} />,
  BrainCircuit: <BrainCircuit size={20} />,
  Binary: <Binary size={20} />,
  GitBranch: <GitBranch size={20} />,
  Container: <Container size={20} />,
  Send: <Send size={20} />,
  CloudLightning: <CloudLightning size={20} />,
  CheckCircle2: <CheckCircle2 size={20} />
};

const categories = [
  'All',
  'Programming Languages',
  'Frontend Development',
  'Backend Development',
  'Databases',
  'AI & Machine Learning',
  'Tools and Technologies'
];

export default function SkillsSection({ skills = [] }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Technical Stack</span>
          <h2 className="section-title">
            Skills & <span>Expertise</span>
          </h2>
          <p className="section-subtitle">
            A comprehensive breakdown of my programming languages, frameworks, database architectures, and engineering tools.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="skills-category-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="skills-grid"
        >
          {filteredSkills.map((skill) => (
            <motion.div
              layout
              key={skill.id || skill.name}
              className="skill-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="skill-header">
                <div className="skill-meta">
                  <div className="skill-icon-wrapper">
                    {iconMap[skill.icon_name] || <Code size={20} />}
                  </div>
                  <div>
                    <h4 className="skill-name">{skill.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {skill.category}
                    </span>
                  </div>
                </div>
                <span className="skill-percentage">{skill.proficiency}%</span>
              </div>

              {/* Animated Progress Bar */}
              <div className="skill-progress-bar">
                <motion.div
                  className="skill-progress-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.proficiency}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

