const mysql = require('mysql2/promise');
const logger = require('../utils/logger');
const bcrypt = require('bcryptjs');

let pool = null;
let useFallback = false;

// Seed dataset for resilient fallback mode
const initialFallbackData = {
  users: [
    {
      id: 1,
      username: 'admin',
      email: 'admin@portfolio.dev',
      password: bcrypt.hashSync('AdminPassword123!', 10),
      full_name: 'Jaivik Patel',
      role: 'admin',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  skills: [
    { id: 1, category: 'Programming Languages', name: 'JavaScript (ES6+)', proficiency: 95, icon_name: 'Code', order_index: 1 },
    { id: 2, category: 'Programming Languages', name: 'TypeScript', proficiency: 88, icon_name: 'Code2', order_index: 2 },
    { id: 3, category: 'Programming Languages', name: 'Python', proficiency: 85, icon_name: 'Terminal', order_index: 3 },
    { id: 4, category: 'Programming Languages', name: 'C / C++', proficiency: 80, icon_name: 'Cpu', order_index: 4 },
    { id: 5, category: 'Programming Languages', name: 'SQL', proficiency: 90, icon_name: 'Database', order_index: 5 },
    { id: 6, category: 'Programming Languages', name: 'HTML5 & CSS3', proficiency: 95, icon_name: 'Layout', order_index: 6 },
    { id: 7, category: 'Frontend Development', name: 'React.js', proficiency: 95, icon_name: 'Atom', order_index: 7 },
    { id: 8, category: 'Frontend Development', name: 'Redux Toolkit / Context', proficiency: 88, icon_name: 'Layers', order_index: 8 },
    { id: 9, category: 'Frontend Development', name: 'Framer Motion', proficiency: 90, icon_name: 'Sparkles', order_index: 9 },
    { id: 10, category: 'Frontend Development', name: 'Tailwind CSS', proficiency: 92, icon_name: 'Palette', order_index: 10 },
    { id: 11, category: 'Frontend Development', name: 'Responsive Web Design', proficiency: 95, icon_name: 'Smartphone', order_index: 11 },
    { id: 12, category: 'Frontend Development', name: 'Next.js (App Router)', proficiency: 82, icon_name: 'Globe', order_index: 12 },
    { id: 13, category: 'Backend Development', name: 'Node.js', proficiency: 92, icon_name: 'Server', order_index: 13 },
    { id: 14, category: 'Backend Development', name: 'Express.js', proficiency: 94, icon_name: 'Network', order_index: 14 },
    { id: 15, category: 'Backend Development', name: 'RESTful API Architecture', proficiency: 95, icon_name: 'Share2', order_index: 15 },
    { id: 16, category: 'Backend Development', name: 'JWT & OAuth Authentication', proficiency: 90, icon_name: 'KeyRound', order_index: 16 },
    { id: 17, category: 'Backend Development', name: 'API Rate Limiting & Security', proficiency: 86, icon_name: 'ShieldCheck', order_index: 17 },
    { id: 18, category: 'Databases', name: 'MySQL', proficiency: 92, icon_name: 'Database', order_index: 18 },
    { id: 19, category: 'Databases', name: 'PostgreSQL', proficiency: 85, icon_name: 'Database', order_index: 19 },
    { id: 20, category: 'Databases', name: 'Database Indexing & Normalization', proficiency: 88, icon_name: 'FileSpreadsheet', order_index: 20 },
    { id: 21, category: 'Databases', name: 'Sequelize / Prisma ORM', proficiency: 86, icon_name: 'GitFork', order_index: 21 },
    { id: 22, category: 'AI & Machine Learning', name: 'Gemini & OpenAI API Integration', proficiency: 88, icon_name: 'Bot', order_index: 22 },
    { id: 23, category: 'AI & Machine Learning', name: 'LangChain & RAG Workflows', proficiency: 82, icon_name: 'BrainCircuit', order_index: 23 },
    { id: 24, category: 'AI & Machine Learning', name: 'Prompt Engineering', proficiency: 90, icon_name: 'Sparkle', order_index: 24 },
    { id: 25, category: 'Tools and Technologies', name: 'Git & GitHub Version Control', proficiency: 95, icon_name: 'GitBranch', order_index: 25 },
    { id: 26, category: 'Tools and Technologies', name: 'Docker Containerization', proficiency: 82, icon_name: 'Container', order_index: 26 },
    { id: 27, category: 'Tools and Technologies', name: 'Postman / API Testing', proficiency: 92, icon_name: 'Send', order_index: 27 },
    { id: 28, category: 'Tools and Technologies', name: 'Vercel & Render Deployment', proficiency: 90, icon_name: 'CloudLightning', order_index: 28 },
    { id: 29, category: 'Tools and Technologies', name: 'Jest & Vitest Testing', proficiency: 84, icon_name: 'CheckCircle2', order_index: 29 }
  ],
  education: [
    {
      id: 1,
      institution: 'National Institute of Technology / Leading Tech University',
      degree: 'Bachelor of Technology (B.Tech)',
      department: 'Computer Science and Engineering',
      start_year: '2022',
      end_year: '2026',
      grade_or_gpa: '8.9 / 10.0 CGPA',
      achievements: 'Dean\'s Honor Roll for 4 consecutive semesters; Lead Organizer for Annual Tech Symposium "CodeNova"; Published research paper on "Optimized Relational Indexing for High-Throughput REST APIs".',
      order_index: 1,
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      institution: 'St. Xavier Higher Secondary Science Academy',
      degree: 'Higher Secondary Certificate (HSC - 12th Grade)',
      department: 'Science (Physics, Chemistry, Mathematics)',
      start_year: '2020',
      end_year: '2022',
      grade_or_gpa: '94.6%',
      achievements: 'Secured Rank 1 in Mathematics Olympiad; State level Science Exhibition Finalist with Automated IoT Water Management Model.',
      order_index: 2,
      created_at: new Date().toISOString()
    }
  ],
  experience: [
    {
      id: 1,
      organization: 'CloudWave Software Solutions',
      role: 'Software Engineer Intern (Full-Stack)',
      employment_type: 'Internship',
      location: 'Remote / Hybrid',
      start_date: 'May 2024',
      end_date: 'August 2024',
      is_current: false,
      responsibilities: 'Architected and implemented 12+ RESTful API endpoints using Node.js, Express, and MySQL, serving 50,000+ daily requests.\nOptimized MySQL query execution times by 35% through proper indexing, composite keys, and connection pooling with mysql2.\nEngineered responsive client dashboards with React.js, Tailwind CSS, and Framer Motion, boosting client retention by 22%.\nCollaborated in an agile scrum team of 8 engineers, participating in daily standups, code reviews, and CI/CD pipelines.',
      skills_gained: 'Node.js, Express.js, MySQL, React.js, JWT, Redis Caching, Git, Agile/Scrum',
      order_index: 1,
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      organization: 'NexTech Innovations Lab',
      role: 'Frontend Developer Intern',
      employment_type: 'Internship',
      location: 'Bengaluru, India',
      start_date: 'December 2023',
      end_date: 'April 2024',
      is_current: false,
      responsibilities: 'Built pixel-perfect, accessible UI components from Figma mockups with React and TypeScript.\nReduced bundle load times by 40% utilizing dynamic code-splitting and asset optimization.\nImplemented real-time notification feeds and state management using Redux Toolkit and WebSockets.\nAuthored comprehensive unit and integration tests with React Testing Library achieving 85% code coverage.',
      skills_gained: 'React.js, TypeScript, Framer Motion, Redux Toolkit, REST APIs, Jest, UI/UX Design',
      order_index: 2,
      created_at: new Date().toISOString()
    }
  ],
  projects: [
    {
      id: 1,
      user_id: 1,
      title: 'DevSync: Collaborative Agile Project Workspace',
      slug: 'devsync-collaborative-agile-workspace',
      description: 'Full-stack enterprise project tracking and sprint planning platform with real-time kanban boards, role-based access control, and MySQL data persistence.',
      long_description: 'DevSync is a high-performance developer workspace built to empower engineering teams with sprint tracking, interactive Kanban boards, automated velocity reports, and role-based permissions. Features include atomic database transactions, secure JWT authentication with refresh tokens, parameterized queries preventing SQL injections, and responsive fluid UI with Framer Motion drag-and-drop interactions.',
      category: 'Full-Stack',
      image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
      technologies: 'React.js, Node.js, Express.js, MySQL, Framer Motion, Tailwind CSS, JWT',
      github_url: 'https://github.com/jaivikpatel/devsync-agile-workspace',
      live_url: 'https://devsync-demo.vercel.app',
      featured: 1,
      order_index: 1,
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      user_id: 1,
      title: 'HealthPulse: AI-Assisted Medical Diagnostic Portal',
      slug: 'healthpulse-ai-medical-diagnostic-portal',
      description: 'Interactive patient telemetry dashboard featuring AI symptom analysis, appointment scheduling, and automated prescription generation.',
      long_description: 'HealthPulse integrates AI APIs with structured health telemetry databases. Built with a resilient Express.js API layer and MySQL normalized schema with ACID transaction guarantees. Front-end provides accessible healthcare metrics, interactive charts, and PDF report downloads.',
      category: 'AI / ML',
      image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      technologies: 'React.js, Node.js, Gemini API, Express.js, MySQL, Chart.js, Lucide Icons',
      github_url: 'https://github.com/jaivikpatel/healthpulse-ai-portal',
      live_url: 'https://healthpulse-ai.vercel.app',
      featured: 1,
      order_index: 2,
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      user_id: 1,
      title: 'FinTrack: Real-Time Personal Wealth & Expense Engine',
      slug: 'fintrack-personal-wealth-expense-engine',
      description: 'Comprehensive personal finance tracker with multi-currency support, budgeting goals, predictive analytics, and CSV transaction imports.',
      long_description: 'FinTrack helps users master their cashflow with real-time expense classification, visual spending breakdowns, recurring subscription alerts, and secure bank statement ingestion. Designed with a relational database ensuring strict audit trails and zero float-rounding discrepancies.',
      category: 'Full-Stack',
      image_url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
      technologies: 'React.js, Express.js, MySQL, Tailwind CSS, Framer Motion, Recharts',
      github_url: 'https://github.com/jaivikpatel/fintrack-wealth-engine',
      live_url: 'https://fintrack-engine.vercel.app',
      featured: 1,
      order_index: 3,
      created_at: new Date().toISOString()
    },
    {
      id: 4,
      user_id: 1,
      title: 'CloudVault: Secure File Storage & Sharing Microservice',
      slug: 'cloudvault-secure-file-storage-microservice',
      description: 'High-throughput file management system supporting encrypted uploads, expiring pre-signed URLs, chunked streaming, and granular permission controls.',
      long_description: 'CloudVault provides scalable object metadata storage in MySQL with distributed file streaming. Built with Express multipart middleware, stream pipelines, SHA-256 integrity verification, and comprehensive API documentation with Postman and Swagger.',
      category: 'Backend & APIs',
      image_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
      technologies: 'Node.js, Express.js, MySQL, AWS S3 SDK, Multer, Docker, Jest',
      github_url: 'https://github.com/jaivikpatel/cloudvault-storage-api',
      live_url: 'https://cloudvault-api.render.com',
      featured: 0,
      order_index: 4,
      created_at: new Date().toISOString()
    },
    {
      id: 5,
      user_id: 1,
      title: 'AuraUI: Design System & Micro-Interaction Component Kit',
      slug: 'auraui-design-system-component-kit',
      description: 'Modern accessible React component library featuring 40+ polished UI elements, dark mode theming, and butter-smooth Framer Motion animations.',
      long_description: 'AuraUI is an open-source component toolkit crafted for developer ergonomics. Includes accessible modal dialogues, floating tooltips, responsive data tables, animated navigation menus, and keyboard-first accessibility (WCAG AA compliant).',
      category: 'Frontend',
      image_url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
      technologies: 'React.js, TypeScript, Framer Motion, Tailwind CSS, Storybook',
      github_url: 'https://github.com/jaivikpatel/auraui-design-system',
      live_url: 'https://auraui-showcase.vercel.app',
      featured: 0,
      order_index: 5,
      created_at: new Date().toISOString()
    },
    {
      id: 6,
      user_id: 1,
      title: 'CodeCraft: Browser-Based Code Playground & Compiler',
      slug: 'codecraft-browser-code-playground',
      description: 'Interactive web development environment supporting real-time HTML/CSS/JS preview, code formatting, syntax highlighting, and snippet sharing.',
      long_description: 'CodeCraft delivers an instant coding sandbox directly in the browser with Monaco Editor integration, live Iframe sandboxing, console output capturing, and MySQL-backed snippet sharing links.',
      category: 'Frontend',
      image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      technologies: 'React.js, Monaco Editor, Express.js, MySQL, Framer Motion',
      github_url: 'https://github.com/jaivikpatel/codecraft-playground',
      live_url: 'https://codecraft-editor.vercel.app',
      featured: 0,
      order_index: 6,
      created_at: new Date().toISOString()
    }
  ],
  certifications: [
    {
      id: 1,
      title: 'AWS Certified Cloud Practitioner (CLF-C02)',
      issuing_organization: 'Amazon Web Services (AWS)',
      issue_date: 'August 2024',
      credential_id: 'AWS-CCP-9834710',
      credential_url: 'https://aws.amazon.com/verification',
      image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
      order_index: 1,
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Meta Front-End Developer Professional Certificate',
      issuing_organization: 'Meta / Coursera',
      issue_date: 'June 2024',
      credential_id: 'COURSERA-META-77123',
      credential_url: 'https://coursera.org/verify/professional-cert/META-77123',
      image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80',
      order_index: 2,
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      title: 'Node.js Application Development (LFW211)',
      issuing_organization: 'The Linux Foundation / OpenJS',
      issue_date: 'March 2024',
      credential_id: 'LF-NODE-44829',
      credential_url: 'https://www.credly.com/org/the-linux-foundation',
      image_url: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=600&q=80',
      order_index: 3,
      created_at: new Date().toISOString()
    },
    {
      id: 4,
      title: 'SQL & Relational Database Design Specialist',
      issuing_organization: 'HackerRank & Oracle University',
      issue_date: 'January 2024',
      credential_id: 'HR-SQL-GOLD-5591',
      credential_url: 'https://www.hackerrank.com/certificates/sql-gold',
      image_url: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80',
      order_index: 4,
      created_at: new Date().toISOString()
    }
  ],
  contact_messages: [
    {
      id: 1,
      name: 'Sarah Jenkins (Tech Recruiter)',
      email: 'sarah.jenkins@techrecruitment.io',
      subject: 'Exciting Full-Stack Developer Internship Opportunity',
      message: 'Hi Jaivik, I came across your portfolio and was thoroughly impressed by your projects and technical stack! We have an opening for an Associate Software Engineer / Intern on our core engineering team. Would love to schedule a quick 15-minute introductory call with you this week.',
      is_read: 0,
      created_at: new Date().toISOString()
    }
  ]
};

// Clone data for mutable memory store
const memoryStore = JSON.parse(JSON.stringify(initialFallbackData));

// Fallback query executor that mimics standard MySQL responses: [rows, fields] or [{ insertId, affectedRows }]
function executeFallback(sql, params = []) {
  const normalized = sql.trim().toUpperCase();

  // 1. SELECT queries
  if (normalized.startsWith('SELECT')) {
    let tableName = null;
    for (const key of Object.keys(memoryStore)) {
      if (sql.toLowerCase().includes(`from ${key}`)) {
        tableName = key;
        break;
      }
    }

    if (!tableName) return [[], []];
    let rows = [...memoryStore[tableName]];

    // Handle WHERE id = ?
    if (/where\s+id\s*=\s*\?/i.test(sql) && params.length > 0) {
      const id = Number(params[0]);
      rows = rows.filter(r => r.id === id);
    }
    // Handle WHERE username = ?
    else if (/where\s+username\s*=\s*\?/i.test(sql) && params.length > 0) {
      const username = params[0];
      rows = rows.filter(r => r.username.toLowerCase() === username.toLowerCase());
    }
    // Handle WHERE email = ?
    else if (/where\s+email\s*=\s*\?/i.test(sql) && params.length > 0) {
      const email = params[0];
      rows = rows.filter(r => r.email.toLowerCase() === email.toLowerCase());
    }
    // Handle WHERE category = ?
    else if (/where\s+category\s*=\s*\?/i.test(sql) && params.length > 0) {
      const cat = params[0];
      rows = rows.filter(r => r.category.toLowerCase() === cat.toLowerCase());
    }

    // Handle WHERE is_read
    if (/where\s+is_read\s*=\s*0/i.test(sql)) {
      rows = rows.filter(r => !r.is_read || r.is_read === 0);
    } else if (/where\s+is_read\s*=\s*1/i.test(sql)) {
      rows = rows.filter(r => r.is_read && r.is_read === 1);
    }

    // Handle COUNT queries
    if (/count\s*\(/i.test(sql)) {
      return [[{ count: rows.length }], []];
    }

    // Handle ORDER BY
    if (/order by/i.test(sql)) {
      if (/order_index\s+asc/i.test(sql) || /order_index/i.test(sql)) {
        rows.sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
      } else if (/created_at\s+desc/i.test(sql) || /id\s+desc/i.test(sql)) {
        rows.sort((a, b) => b.id - a.id);
      }
    }

    return [rows, []];
  }

  // 2. INSERT queries
  if (normalized.startsWith('INSERT INTO')) {
    let tableName = null;
    for (const key of Object.keys(memoryStore)) {
      if (sql.toLowerCase().includes(`insert into ${key}`)) {
        tableName = key;
        break;
      }
    }

    if (tableName) {
      const newId = memoryStore[tableName].length > 0
        ? Math.max(...memoryStore[tableName].map(r => r.id)) + 1
        : 1;

      // Extract columns
      const matchCols = sql.match(/insert\s+into\s+\w+\s*\(([^)]+)\)/i);
      const cols = matchCols ? matchCols[1].split(',').map(c => c.trim()) : [];
      const newRecord = { id: newId, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };

      cols.forEach((col, idx) => {
        if (params[idx] !== undefined) {
          newRecord[col] = params[idx];
        }
      });

      memoryStore[tableName].push(newRecord);
      return [{ insertId: newId, affectedRows: 1 }, []];
    }
  }

  // 3. UPDATE queries
  if (normalized.startsWith('UPDATE')) {
    let tableName = null;
    for (const key of Object.keys(memoryStore)) {
      if (sql.toLowerCase().includes(`update ${key}`)) {
        tableName = key;
        break;
      }
    }

    if (tableName) {
      // Find ID in params (usually the last param in WHERE id = ?)
      const id = Number(params[params.length - 1]);
      const idx = memoryStore[tableName].findIndex(r => r.id === id);
      if (idx !== -1) {
        // Parse SET clause
        const setPart = sql.match(/set\s+([^where]+)\s+where/i);
        if (setPart) {
          const setFields = setPart[1].split(',').map(f => f.trim().split('=')[0].trim());
          setFields.forEach((field, fIdx) => {
            if (params[fIdx] !== undefined) {
              memoryStore[tableName][idx][field] = params[fIdx];
            }
          });
          memoryStore[tableName][idx].updated_at = new Date().toISOString();
        }
        return [{ affectedRows: 1 }, []];
      }
      return [{ affectedRows: 0 }, []];
    }
  }

  // 4. DELETE queries
  if (normalized.startsWith('DELETE FROM')) {
    let tableName = null;
    for (const key of Object.keys(memoryStore)) {
      if (sql.toLowerCase().includes(`delete from ${key}`)) {
        tableName = key;
        break;
      }
    }

    if (tableName && params.length > 0) {
      const id = Number(params[0]);
      const initLen = memoryStore[tableName].length;
      memoryStore[tableName] = memoryStore[tableName].filter(r => r.id !== id);
      const affected = initLen - memoryStore[tableName].length;
      return [{ affectedRows: affected }, []];
    }
  }

  return [[], []];
}

// Initialize MySQL pool
function createPool() {
  return mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'portfolio_db',
    port: Number(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 3000
  });
}

// Resilient Query wrapper
const query = async (sql, params = []) => {
  if (useFallback || !pool) {
    return executeFallback(sql, params);
  }

  try {
    return await pool.query(sql, params);
  } catch (error) {
    // If connection lost or database offline, fall back gracefully
    if (error.code === 'ECONNREFUSED' || error.code === 'ER_BAD_DB_ERROR' || error.code === 'PROTOCOL_CONNECTION_LOST') {
      logger.warn(`MySQL connection error (${error.code}). Serving from resilient local store.`);
      useFallback = true;
      return executeFallback(sql, params);
    }
    throw error;
  }
};

// Check connection and report status
const testConnection = async () => {
  try {
    pool = createPool();
    const conn = await pool.getConnection();
    logger.success(`Connected to MySQL database [${process.env.DB_NAME || 'portfolio_db'}] successfully.`);
    conn.release();
    useFallback = false;
    return true;
  } catch (error) {
    logger.warn(`Notice: Could not connect to live MySQL instance (${error.message}).`);
    logger.info(`Activating resilient fallback database store. Seed data loaded and ready.`);
    logger.info(`To connect to MySQL, ensure MySQL server (e.g. MySQL80) is started and run 'npm run db:init'.`);
    useFallback = true;
    return false;
  }
};

module.exports = {
  query,
  testConnection,
  getPool: () => pool,
  isUsingFallback: () => useFallback
};

