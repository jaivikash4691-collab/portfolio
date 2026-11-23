process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../server');

describe('Portfolio REST API Test Suite', () => {
  let authToken = '';

  beforeAll(async () => {
    // Perform admin login to obtain JWT token for protected tests
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'admin',
        password: 'AdminPassword123!'
      });

    if (res.body && res.body.token) {
      authToken = res.body.token;
    }
  });

  describe('System Health', () => {
    it('GET /api/health should return status 200 and healthy payload', async () => {
      const res = await request(app).get('/api/health');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('healthy');
      expect(res.body).toHaveProperty('uptime');
    });
  });

  describe('Public Portfolio Endpoints', () => {
    it('GET /api/projects should return list of projects', async () => {
      const res = await request(app).get('/api/projects');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('GET /api/projects/1 should return single project details', async () => {
      const res = await request(app).get('/api/projects/1');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('title');
      expect(res.body.data).toHaveProperty('technologies');
    });

    it('GET /api/projects/99999 should return 404 for non-existent project', async () => {
      const res = await request(app).get('/api/projects/99999');
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });

    it('GET /api/skills should return skills list', async () => {
      const res = await request(app).get('/api/skills');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('GET /api/education should return education history', async () => {
      const res = await request(app).get('/api/education');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('GET /api/experience should return work experience', async () => {
      const res = await request(app).get('/api/experience');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('GET /api/certifications should return certifications list', async () => {
      const res = await request(app).get('/api/certifications');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('Contact Form Inquiries', () => {
    it('POST /api/contact should validate required fields and fail on invalid data', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({
          name: '',
          email: 'not-an-email',
          subject: 'Hi',
          message: 'Short'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.errors.length).toBeGreaterThan(0);
    });

    it('POST /api/contact should successfully store valid message', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
          subject: 'Full-Stack Software Engineer Inquiry',
          message: 'Hello Jaivik! We loved your portfolio projects and would like to invite you for an interview.'
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('id');
    });
  });

  describe('Authentication & Protected Routes', () => {
    it('POST /api/auth/login should fail with invalid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'wronguser',
          password: 'wrongpassword'
        });

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('POST /api/auth/login should succeed with valid admin credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'admin',
          password: 'AdminPassword123!'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.role).toBe('admin');
    });

    it('GET /api/stats should reject request without auth token', async () => {
      const res = await request(app).get('/api/stats');
      expect(res.statusCode).toBe(401);
    });

    it('GET /api/stats should allow access with valid admin token', async () => {
      const res = await request(app)
        .get('/api/stats')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.stats).toHaveProperty('projects');
      expect(res.body.stats).toHaveProperty('skills');
      expect(res.body.stats).toHaveProperty('totalMessages');
    });

    it('POST /api/projects should allow authorized admin to create a new project', async () => {
      const newProject = {
        title: 'QuantumTask: Distributed Task Orchestrator',
        category: 'Backend & APIs',
        description: 'Fault-tolerant distributed job queue engine built with Node.js and Redis.',
        technologies: 'Node.js, Express, Redis, MySQL',
        github_url: 'https://github.com/jaivikpatel/quantumtask',
        live_url: 'https://quantumtask-demo.vercel.app',
        featured: 0,
        order_index: 10
      };

      const res = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newProject);

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe(newProject.title);
    });
  });
});

