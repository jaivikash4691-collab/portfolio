// API Service for Portfolio Full-Stack Application
const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('portfolio_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

async function handleResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const errorMsg = data.message || `Request failed with status ${response.status}`;
    const err = new Error(errorMsg);
    err.status = response.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const api = {
  // Auth
  login: async (username, password) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    return handleResponse(res);
  },

  getMe: async () => {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  // Projects
  getProjects: async () => {
    const res = await fetch(`${BASE_URL}/projects`);
    return handleResponse(res);
  },

  getProjectById: async (id) => {
    const res = await fetch(`${BASE_URL}/projects/${id}`);
    return handleResponse(res);
  },

  createProject: async (projectData) => {
    const res = await fetch(`${BASE_URL}/projects`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(projectData)
    });
    return handleResponse(res);
  },

  updateProject: async (id, projectData) => {
    const res = await fetch(`${BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(projectData)
    });
    return handleResponse(res);
  },

  deleteProject: async (id) => {
    const res = await fetch(`${BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  // Skills
  getSkills: async (category = '') => {
    const url = category ? `${BASE_URL}/skills?category=${encodeURIComponent(category)}` : `${BASE_URL}/skills`;
    const res = await fetch(url);
    return handleResponse(res);
  },

  createSkill: async (skillData) => {
    const res = await fetch(`${BASE_URL}/skills`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(skillData)
    });
    return handleResponse(res);
  },

  updateSkill: async (id, skillData) => {
    const res = await fetch(`${BASE_URL}/skills/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(skillData)
    });
    return handleResponse(res);
  },

  deleteSkill: async (id) => {
    const res = await fetch(`${BASE_URL}/skills/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  // Education
  getEducation: async () => {
    const res = await fetch(`${BASE_URL}/education`);
    return handleResponse(res);
  },

  createEducation: async (eduData) => {
    const res = await fetch(`${BASE_URL}/education`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(eduData)
    });
    return handleResponse(res);
  },

  updateEducation: async (id, eduData) => {
    const res = await fetch(`${BASE_URL}/education/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(eduData)
    });
    return handleResponse(res);
  },

  deleteEducation: async (id) => {
    const res = await fetch(`${BASE_URL}/education/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  // Experience
  getExperience: async () => {
    const res = await fetch(`${BASE_URL}/experience`);
    return handleResponse(res);
  },

  createExperience: async (expData) => {
    const res = await fetch(`${BASE_URL}/experience`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(expData)
    });
    return handleResponse(res);
  },

  updateExperience: async (id, expData) => {
    const res = await fetch(`${BASE_URL}/experience/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(expData)
    });
    return handleResponse(res);
  },

  deleteExperience: async (id) => {
    const res = await fetch(`${BASE_URL}/experience/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  // Certifications
  getCertifications: async () => {
    const res = await fetch(`${BASE_URL}/certifications`);
    return handleResponse(res);
  },

  createCertification: async (certData) => {
    const res = await fetch(`${BASE_URL}/certifications`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(certData)
    });
    return handleResponse(res);
  },

  updateCertification: async (id, certData) => {
    const res = await fetch(`${BASE_URL}/certifications/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(certData)
    });
    return handleResponse(res);
  },

  deleteCertification: async (id) => {
    const res = await fetch(`${BASE_URL}/certifications/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  // Contact
  submitContact: async (contactData) => {
    const res = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    });
    return handleResponse(res);
  },

  getMessages: async () => {
    const res = await fetch(`${BASE_URL}/contact`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  markMessageRead: async (id, isRead) => {
    const res = await fetch(`${BASE_URL}/contact/${id}/read`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ isRead })
    });
    return handleResponse(res);
  },

  deleteMessage: async (id) => {
    const res = await fetch(`${BASE_URL}/contact/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  // Stats
  getStats: async () => {
    const res = await fetch(`${BASE_URL}/stats`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  }
};

