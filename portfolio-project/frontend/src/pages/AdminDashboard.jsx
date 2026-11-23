import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderGit2,
  Code2,
  Briefcase,
  GraduationCap,
  Award,
  Mail,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  Eye,
  RefreshCw,
  X
} from 'lucide-react';
import { api } from '../services/api';
import Toast from '../components/Toast';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Data states
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [messages, setMessages] = useState([]);

  // Toast
  const [toast, setToast] = useState({ message: '', type: 'info' });

  // Modals for CRUD
  const [modalType, setModalType] = useState(null); // 'project' | 'skill' | 'message'
  const [editingItem, setEditingItem] = useState(null);

  // Form states
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Full-Stack',
    description: '',
    long_description: '',
    technologies: '',
    github_url: '',
    live_url: '',
    image_url: '',
    featured: 0
  });

  const [skillForm, setSkillForm] = useState({
    category: 'Programming Languages',
    name: '',
    proficiency: 85,
    icon_name: 'Code'
  });

  const [activeMessageView, setActiveMessageView] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'info' }), 4000);
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [statsRes, projRes, skillRes, expRes, eduRes, certRes, msgRes] = await Promise.allSettled([
        api.getStats(),
        api.getProjects(),
        api.getSkills(),
        api.getExperience(),
        api.getEducation(),
        api.getCertifications(),
        api.getMessages()
      ]);

      if (statsRes.status === 'fulfilled' && statsRes.value?.stats) {
        setStats(statsRes.value.stats);
      }
      if (projRes.status === 'fulfilled' && projRes.value?.data) {
        setProjects(projRes.value.data);
      }
      if (skillRes.status === 'fulfilled' && skillRes.value?.data) {
        setSkills(skillRes.value.data);
      }
      if (expRes.status === 'fulfilled' && expRes.value?.data) {
        setExperience(expRes.value.data);
      }
      if (eduRes.status === 'fulfilled' && eduRes.value?.data) {
        setEducation(eduRes.value.data);
      }
      if (certRes.status === 'fulfilled' && certRes.value?.data) {
        setCertifications(certRes.value.data);
      }
      if (msgRes.status === 'fulfilled' && msgRes.value?.data) {
        setMessages(msgRes.value.data);
      }
    } catch (err) {
      showToast('Error syncing with backend', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('portfolio_admin_token');
    localStorage.removeItem('portfolio_admin_user');
    navigate('/admin/login');
  };

  // PROJECT CRUD
  const handleOpenProjectModal = (proj = null) => {
    if (proj) {
      setEditingItem(proj);
      setProjectForm({
        title: proj.title,
        category: proj.category,
        description: proj.description,
        long_description: proj.long_description || '',
        technologies: proj.technologies,
        github_url: proj.github_url || '',
        live_url: proj.live_url || '',
        image_url: proj.image_url || '',
        featured: proj.featured ? 1 : 0
      });
    } else {
      setEditingItem(null);
      setProjectForm({
        title: '',
        category: 'Full-Stack',
        description: '',
        long_description: '',
        technologies: 'React.js, Node.js, Express.js, MySQL',
        github_url: '',
        live_url: '',
        image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
        featured: 0
      });
    }
    setModalType('project');
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.updateProject(editingItem.id, projectForm);
        showToast('Project updated successfully!');
      } else {
        await api.createProject(projectForm);
        showToast('New project created successfully!');
      }
      setModalType(null);
      loadAllData();
    } catch (err) {
      showToast(err.message || 'Operation failed', 'error');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.deleteProject(id);
      showToast('Project removed successfully.');
      loadAllData();
    } catch (err) {
      showToast(err.message || 'Failed to delete project', 'error');
    }
  };

  // SKILL CRUD
  const handleOpenSkillModal = (skill = null) => {
    if (skill) {
      setEditingItem(skill);
      setSkillForm({
        category: skill.category,
        name: skill.name,
        proficiency: skill.proficiency,
        icon_name: skill.icon_name || 'Code'
      });
    } else {
      setEditingItem(null);
      setSkillForm({
        category: 'Programming Languages',
        name: '',
        proficiency: 85,
        icon_name: 'Code'
      });
    }
    setModalType('skill');
  };

  const handleSaveSkill = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.updateSkill(editingItem.id, skillForm);
        showToast('Skill updated successfully!');
      } else {
        await api.createSkill(skillForm);
        showToast('New skill added to database!');
      }
      setModalType(null);
      loadAllData();
    } catch (err) {
      showToast(err.message || 'Operation failed', 'error');
    }
  };

  const handleDeleteSkill = async (id) => {
    if (!window.confirm('Are you sure you want to remove this skill?')) return;
    try {
      await api.deleteSkill(id);
      showToast('Skill deleted successfully.');
      loadAllData();
    } catch (err) {
      showToast(err.message || 'Failed to delete skill', 'error');
    }
  };

  // MESSAGE ACTIONS
  const handleToggleReadMessage = async (msg) => {
    try {
      await api.markMessageRead(msg.id, !msg.is_read);
      showToast(`Message marked as ${!msg.is_read ? 'read' : 'unread'}`);
      loadAllData();
    } catch (err) {
      showToast('Failed to update message status', 'error');
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Delete this message permanently?')) return;
    try {
      await api.deleteMessage(id);
      showToast('Message deleted.');
      if (activeMessageView?.id === id) setActiveMessageView(null);
      loadAllData();
    } catch (err) {
      showToast('Failed to delete message', 'error');
    }
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <Link to="/" className="nav-logo" style={{ fontSize: '1.4rem' }}>
            <span>J</span>aivik<span style={{ color: 'var(--accent)' }}>.</span>
          </Link>
        </div>

        <nav className="admin-nav">
          <button
            className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <LayoutDashboard size={18} />
            <span className="sidebar-text">Overview</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <FolderGit2 size={18} />
            <span className="sidebar-text">Projects</span>
            <span className="admin-badge-count">{projects.length}</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            <Code2 size={18} />
            <span className="sidebar-text">Skills</span>
            <span className="admin-badge-count">{skills.length}</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'experience' ? 'active' : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            <Briefcase size={18} />
            <span className="sidebar-text">Experience</span>
            <span className="admin-badge-count">{experience.length}</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'education' ? 'active' : ''}`}
            onClick={() => setActiveTab('education')}
          >
            <GraduationCap size={18} />
            <span className="sidebar-text">Education</span>
            <span className="admin-badge-count">{education.length}</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'certifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('certifications')}
          >
            <Award size={18} />
            <span className="sidebar-text">Certifications</span>
            <span className="admin-badge-count">{certifications.length}</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            <Mail size={18} />
            <span className="sidebar-text">Messages</span>
            {stats?.unreadMessages > 0 && (
              <span className="admin-badge-count" style={{ background: 'var(--accent)', color: '#fff' }}>
                {stats.unreadMessages}
              </span>
            )}
          </button>
        </nav>

        <div className="admin-user-card">
          <div className="user-details">
            <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 700 }}>Jaivik Patel</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Admin Role</div>
          </div>
          <button
            onClick={handleLogout}
            className="action-btn btn-delete"
            title="Log Out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        <div className="admin-topbar">
          <div>
            <h1 className="admin-page-title">
              {activeTab === 'overview' && 'System Dashboard'}
              {activeTab === 'projects' && 'Projects Management'}
              {activeTab === 'skills' && 'Skills Management'}
              {activeTab === 'experience' && 'Internship & Experience Records'}
              {activeTab === 'education' && 'Education Records'}
              {activeTab === 'certifications' && 'Certifications & Credentials'}
              {activeTab === 'messages' && 'Inbound Inquiries & Messages'}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Connected to MySQL Database: <code style={{ color: 'var(--accent-light)' }}>portfolio_db</code>
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button onClick={loadAllData} className="btn btn-secondary" title="Sync database">
              <RefreshCw size={16} /> Sync
            </button>
            <Link to="/" target="_blank" className="btn btn-outline-accent">
              <ExternalLink size={16} /> View Live Site
            </Link>
          </div>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div>
            <div className="admin-stats-grid">
              <div className="stat-metric-card">
                <div className="stat-metric-icon"><FolderGit2 size={24} /></div>
                <div>
                  <div className="stat-metric-val">{stats?.projects ?? projects.length}</div>
                  <div className="stat-metric-label">Total Projects</div>
                </div>
              </div>

              <div className="stat-metric-card">
                <div className="stat-metric-icon" style={{ color: 'var(--cyan)', background: 'rgba(0, 242, 254, 0.1)' }}><Code2 size={24} /></div>
                <div>
                  <div className="stat-metric-val">{stats?.skills ?? skills.length}</div>
                  <div className="stat-metric-label">Skills Categorized</div>
                </div>
              </div>

              <div className="stat-metric-card">
                <div className="stat-metric-icon" style={{ color: 'var(--emerald)', background: 'rgba(16, 185, 129, 0.1)' }}><Briefcase size={24} /></div>
                <div>
                  <div className="stat-metric-val">{stats?.experience ?? experience.length}</div>
                  <div className="stat-metric-label">Internship Positions</div>
                </div>
              </div>

              <div className="stat-metric-card">
                <div className="stat-metric-icon" style={{ color: 'var(--amber)', background: 'rgba(245, 158, 11, 0.1)' }}><Mail size={24} /></div>
                <div>
                  <div className="stat-metric-val">{stats?.totalMessages ?? messages.length}</div>
                  <div className="stat-metric-label">Recruiter Inquiries</div>
                </div>
              </div>
            </div>

            {/* Recent Messages Quick View */}
            <div className="admin-table-wrapper" style={{ marginTop: '2rem' }}>
              <div className="table-toolbar">
                <h3 style={{ fontSize: '1.1rem', color: '#fff' }}>Recent Inbound Messages</h3>
                <button onClick={() => setActiveTab('messages')} className="btn btn-secondary" style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}>
                  View All
                </button>
              </div>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Sender</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.slice(0, 5).map((msg) => (
                    <tr key={msg.id}>
                      <td style={{ fontWeight: 600, color: '#fff' }}>{msg.name}</td>
                      <td>{msg.email}</td>
                      <td>{msg.subject}</td>
                      <td>
                        <span className="timeline-badge" style={{ background: msg.is_read ? 'rgba(255,255,255,0.05)' : 'rgba(255,0,79,0.15)', color: msg.is_read ? 'var(--text-muted)' : 'var(--accent-light)' }}>
                          {msg.is_read ? 'Read' : 'Unread'}
                        </span>
                      </td>
                      <td>{new Date(msg.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {messages.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No messages recorded yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="admin-table-wrapper">
            <div className="table-toolbar">
              <h3 style={{ fontSize: '1.1rem', color: '#fff' }}>Active Portfolio Projects ({projects.length})</h3>
              <button onClick={() => handleOpenProjectModal()} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                <Plus size={16} /> Add Project
              </button>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Technologies</th>
                  <th>Featured</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((proj) => (
                  <tr key={proj.id}>
                    <td style={{ fontWeight: 600, color: '#fff' }}>{proj.title}</td>
                    <td><span className="project-category-badge" style={{ position: 'static' }}>{proj.category}</span></td>
                    <td style={{ fontSize: '0.85rem' }}>{proj.technologies}</td>
                    <td>{proj.featured ? <span style={{ color: 'var(--accent)' }}>★ Yes</span> : 'No'}</td>
                    <td>
                      <div className="table-actions">
                        <button onClick={() => handleOpenProjectModal(proj)} className="action-btn" title="Edit">
                          <Edit size={15} />
                        </button>
                        <button onClick={() => handleDeleteProject(proj.id)} className="action-btn btn-delete" title="Delete">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* SKILLS TAB */}
        {activeTab === 'skills' && (
          <div className="admin-table-wrapper">
            <div className="table-toolbar">
              <h3 style={{ fontSize: '1.1rem', color: '#fff' }}>Technical Skills ({skills.length})</h3>
              <button onClick={() => handleOpenSkillModal()} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                <Plus size={16} /> Add Skill
              </button>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Skill Name</th>
                  <th>Category</th>
                  <th>Proficiency</th>
                  <th>Icon</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((skill) => (
                  <tr key={skill.id}>
                    <td style={{ fontWeight: 600, color: '#fff' }}>{skill.name}</td>
                    <td>{skill.category}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span>{skill.proficiency}%</span>
                        <div style={{ width: '80px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
                          <div style={{ width: `${skill.proficiency}%`, height: '100%', background: 'var(--accent)', borderRadius: '4px' }}></div>
                        </div>
                      </div>
                    </td>
                    <td><code>{skill.icon_name}</code></td>
                    <td>
                      <div className="table-actions">
                        <button onClick={() => handleOpenSkillModal(skill)} className="action-btn" title="Edit">
                          <Edit size={15} />
                        </button>
                        <button onClick={() => handleDeleteSkill(skill.id)} className="action-btn btn-delete" title="Delete">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* EXPERIENCE TAB */}
        {activeTab === 'experience' && (
          <div className="admin-table-wrapper">
            <div className="table-toolbar">
              <h3 style={{ fontSize: '1.1rem', color: '#fff' }}>Internship & Work Experience ({experience.length})</h3>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Organization</th>
                  <th>Period</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {experience.map((exp) => (
                  <tr key={exp.id}>
                    <td style={{ fontWeight: 600, color: '#fff' }}>{exp.role}</td>
                    <td>{exp.organization}</td>
                    <td>{exp.start_date} – {exp.end_date}</td>
                    <td><span className="timeline-badge">{exp.employment_type}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* EDUCATION TAB */}
        {activeTab === 'education' && (
          <div className="admin-table-wrapper">
            <div className="table-toolbar">
              <h3 style={{ fontSize: '1.1rem', color: '#fff' }}>Academic Records ({education.length})</h3>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Degree</th>
                  <th>Institution</th>
                  <th>Department</th>
                  <th>Duration</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {education.map((edu) => (
                  <tr key={edu.id}>
                    <td style={{ fontWeight: 600, color: '#fff' }}>{edu.degree}</td>
                    <td>{edu.institution}</td>
                    <td>{edu.department}</td>
                    <td>{edu.start_year} – {edu.end_year}</td>
                    <td>{edu.grade_or_gpa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* CERTIFICATIONS TAB */}
        {activeTab === 'certifications' && (
          <div className="admin-table-wrapper">
            <div className="table-toolbar">
              <h3 style={{ fontSize: '1.1rem', color: '#fff' }}>Certifications ({certifications.length})</h3>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Certification</th>
                  <th>Issuer</th>
                  <th>Date</th>
                  <th>Credential ID</th>
                </tr>
              </thead>
              <tbody>
                {certifications.map((cert) => (
                  <tr key={cert.id}>
                    <td style={{ fontWeight: 600, color: '#fff' }}>{cert.title}</td>
                    <td>{cert.issuing_organization}</td>
                    <td>{cert.issue_date}</td>
                    <td><code>{cert.credential_id}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* MESSAGES TAB */}
        {activeTab === 'messages' && (
          <div className="admin-table-wrapper">
            <div className="table-toolbar">
              <h3 style={{ fontSize: '1.1rem', color: '#fff' }}>Recruiter Inbound Inquiries ({messages.length})</h3>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Sender</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr key={msg.id}>
                    <td style={{ fontWeight: 600, color: '#fff' }}>{msg.name}</td>
                    <td><a href={`mailto:${msg.email}`} style={{ color: 'var(--cyan)' }}>{msg.email}</a></td>
                    <td>{msg.subject}</td>
                    <td>{new Date(msg.created_at).toLocaleDateString()}</td>
                    <td>
                      <span className="timeline-badge" style={{ background: msg.is_read ? 'rgba(255,255,255,0.05)' : 'rgba(255,0,79,0.15)', color: msg.is_read ? 'var(--text-muted)' : 'var(--accent-light)' }}>
                        {msg.is_read ? 'Read' : 'Unread'}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button onClick={() => setActiveMessageView(msg)} className="action-btn" title="View Full Message">
                          <Eye size={15} />
                        </button>
                        <button onClick={() => handleToggleReadMessage(msg)} className="action-btn" title="Toggle Read Status">
                          <CheckCircle size={15} />
                        </button>
                        <button onClick={() => handleDeleteMessage(msg.id)} className="action-btn btn-delete" title="Delete">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* PROJECT FORM MODAL */}
        {modalType === 'project' && (
          <div className="modal-backdrop" onClick={() => setModalType(null)}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={() => setModalType(null)}>
                <X size={20} />
              </button>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff' }}>
                {editingItem ? 'Edit Project' : 'Create New Portfolio Project'}
              </h2>
              <form onSubmit={handleSaveProject}>
                <div className="form-group">
                  <label className="form-label">Project Title *</label>
                  <input
                    type="text"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Category *</label>
                    <select
                      value={projectForm.category}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                      className="form-control"
                    >
                      <option value="Full-Stack">Full-Stack</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Backend & APIs">Backend & APIs</option>
                      <option value="AI / ML">AI / ML</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Featured on Home?</label>
                    <select
                      value={projectForm.featured}
                      onChange={(e) => setProjectForm({ ...projectForm, featured: Number(e.target.value) })}
                      className="form-control"
                    >
                      <option value={1}>Yes (Featured)</option>
                      <option value={0}>No (Normal)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Technologies (Comma separated) *</label>
                  <input
                    type="text"
                    value={projectForm.technologies}
                    onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Short Description *</label>
                  <textarea
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    className="form-control"
                    rows="2"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Detailed Description / Architecture</label>
                  <textarea
                    value={projectForm.long_description}
                    onChange={(e) => setProjectForm({ ...projectForm, long_description: e.target.value })}
                    className="form-control"
                    rows="3"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">GitHub Repository URL</label>
                    <input
                      type="url"
                      value={projectForm.github_url}
                      onChange={(e) => setProjectForm({ ...projectForm, github_url: e.target.value })}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Live Demo URL</label>
                    <input
                      type="url"
                      value={projectForm.live_url}
                      onChange={(e) => setProjectForm({ ...projectForm, live_url: e.target.value })}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Preview Image URL</label>
                  <input
                    type="text"
                    value={projectForm.image_url}
                    onChange={(e) => setProjectForm({ ...projectForm, image_url: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                    {editingItem ? 'Save Changes' : 'Create Project'}
                  </button>
                  <button type="button" onClick={() => setModalType(null)} className="btn btn-secondary">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* SKILL FORM MODAL */}
        {modalType === 'skill' && (
          <div className="modal-backdrop" onClick={() => setModalType(null)}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
              <button className="modal-close-btn" onClick={() => setModalType(null)}>
                <X size={20} />
              </button>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: '#fff' }}>
                {editingItem ? 'Edit Skill' : 'Add Technical Skill'}
              </h2>
              <form onSubmit={handleSaveSkill}>
                <div className="form-group">
                  <label className="form-label">Skill Name *</label>
                  <input
                    type="text"
                    value={skillForm.name}
                    onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select
                    value={skillForm.category}
                    onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                    className="form-control"
                  >
                    <option value="Programming Languages">Programming Languages</option>
                    <option value="Frontend Development">Frontend Development</option>
                    <option value="Backend Development">Backend Development</option>
                    <option value="Databases">Databases</option>
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="Tools and Technologies">Tools and Technologies</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Proficiency Percentage ({skillForm.proficiency}%)</label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={skillForm.proficiency}
                    onChange={(e) => setSkillForm({ ...skillForm, proficiency: Number(e.target.value) })}
                    style={{ width: '100%', accentColor: 'var(--accent)' }}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Lucide Icon Identifier</label>
                  <input
                    type="text"
                    value={skillForm.icon_name}
                    onChange={(e) => setSkillForm({ ...skillForm, icon_name: e.target.value })}
                    className="form-control"
                    placeholder="Code, Server, Database, Cpu, etc."
                  />
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                    {editingItem ? 'Save Skill' : 'Add Skill'}
                  </button>
                  <button type="button" onClick={() => setModalType(null)} className="btn btn-secondary">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MESSAGE DETAIL MODAL */}
        {activeMessageView && (
          <div className="modal-backdrop" onClick={() => setActiveMessageView(null)}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={() => setActiveMessageView(null)}>
                <X size={20} />
              </button>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#fff' }}>
                {activeMessageView.subject}
              </h2>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                From: <strong style={{ color: '#fff' }}>{activeMessageView.name}</strong> ({activeMessageView.email}) • Received: {new Date(activeMessageView.created_at).toLocaleString()}
              </div>
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem', whiteSpace: 'pre-line' }}>
                {activeMessageView.message}
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href={`mailto:${activeMessageView.email}?subject=Re: ${encodeURIComponent(activeMessageView.subject)}`} className="btn btn-primary">
                  <Mail size={16} /> Reply via Email
                </a>
                <button onClick={() => setActiveMessageView(null)} className="btn btn-secondary">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {toast.message && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'info' })} />
      )}
    </div>
  );
}

