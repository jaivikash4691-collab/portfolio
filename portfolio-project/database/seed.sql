-- =======================================================
-- Portfolio Database Seed Data: portfolio_db
-- =======================================================

USE portfolio_db;

-- 1. Insert Admin User (Password: AdminPassword123!)
-- Bcrypt hash generated with 10 salt rounds
INSERT INTO users (id, username, email, password, full_name, role)
VALUES (
    1,
    'admin',
    'admin@portfolio.dev',
    '$2b$10$tZzCiqF857YfE1vNsm57h.oB9vj1xGeqv1xQYw7z4HqL9xZt47qjG', -- Hash for 'AdminPassword123!'
    'Jaivik Patel',
    'admin'
)
ON DUPLICATE KEY UPDATE full_name = VALUES(full_name);

-- 2. Insert Skills
INSERT INTO skills (category, name, proficiency, icon_name, order_index) VALUES
-- Programming Languages
('Programming Languages', 'JavaScript (ES6+)', 95, 'Code', 1),
('Programming Languages', 'TypeScript', 88, 'Code2', 2),
('Programming Languages', 'Python', 85, 'Terminal', 3),
('Programming Languages', 'C / C++', 80, 'Cpu', 4),
('Programming Languages', 'SQL', 90, 'Database', 5),
('Programming Languages', 'HTML5 & CSS3', 95, 'Layout', 6),

-- Frontend Development
('Frontend Development', 'React.js', 95, 'Atom', 7),
('Frontend Development', 'Redux Toolkit / Context', 88, 'Layers', 8),
('Frontend Development', 'Framer Motion', 90, 'Sparkles', 9),
('Frontend Development', 'Tailwind CSS', 92, 'Palette', 10),
('Frontend Development', 'Responsive Web Design', 95, 'Smartphone', 11),
('Frontend Development', 'Next.js (App Router)', 82, 'Globe', 12),

-- Backend Development
('Backend Development', 'Node.js', 92, 'Server', 13),
('Backend Development', 'Express.js', 94, 'Network', 14),
('Backend Development', 'RESTful API Architecture', 95, 'Share2', 15),
('Backend Development', 'JWT & OAuth Authentication', 90, 'KeyRound', 16),
('Backend Development', 'API Rate Limiting & Security', 86, 'ShieldCheck', 17),
('Backend Development', 'Microservices Basics', 78, 'Boxes', 18),

-- Databases
('Databases', 'MySQL', 92, 'Database', 19),
('Databases', 'PostgreSQL', 85, 'Database', 20),
('Databases', 'Database Indexing & Normalization', 88, 'FileSpreadsheet', 21),
('Databases', 'Sequelize / Prisma ORM', 86, 'GitFork', 22),
('Databases', 'Redis (Caching)', 80, 'Zap', 23),

-- AI & Machine Learning
('AI & Machine Learning', 'Gemini & OpenAI API Integration', 88, 'Bot', 24),
('AI & Machine Learning', 'LangChain & RAG Workflows', 82, 'BrainCircuit', 25),
('AI & Machine Learning', 'Prompt Engineering', 90, 'Sparkle', 26),
('AI & Machine Learning', 'Pandas & NumPy Basics', 78, 'Binary', 27),

-- Tools and Technologies
('Tools and Technologies', 'Git & GitHub Version Control', 95, 'GitBranch', 28),
('Tools and Technologies', 'Docker Containerization', 82, 'Container', 29),
('Tools and Technologies', 'Postman / API Testing', 92, 'Send', 30),
('Tools and Technologies', 'Linux / Shell Scripting', 85, 'TerminalSquare', 31),
('Tools and Technologies', 'Vercel & Render Deployment', 90, 'CloudLightning', 32),
('Tools and Technologies', 'Jest & Vitest Testing', 84, 'CheckCircle2', 33);

-- 3. Insert Education
INSERT INTO education (institution, degree, department, start_year, end_year, grade_or_gpa, achievements, order_index) VALUES
(
    'National Institute of Technology / Leading Tech University',
    'Bachelor of Technology (B.Tech)',
    'Computer Science and Engineering',
    '2022',
    '2026',
    '8.9 / 10.0 CGPA',
    'Dean\'s Honor Roll for 4 consecutive semesters; Lead Organizer for Annual Tech Symposium "CodeNova"; Published research paper on "Optimized Relational Indexing for High-Throughput REST APIs".',
    1
),
(
    'St. Xavier Higher Secondary Science Academy',
    'Higher Secondary Certificate (HSC - 12th Grade)',
    'Science (Physics, Chemistry, Mathematics)',
    '2020',
    '2022',
    '94.6%',
    'Secured Rank 1 in Mathematics Olympiad; State level Science Exhibition Finalist with Automated IoT Water Management Model.',
    2
);

-- 4. Insert Experience / Internships
INSERT INTO experience (organization, role, employment_type, location, start_date, end_date, is_current, responsibilities, skills_gained, order_index) VALUES
(
    'CloudWave Software Solutions',
    'Software Engineer Intern (Full-Stack)',
    'Internship',
    'Remote / Hybrid',
    'May 2024',
    'August 2024',
    FALSE,
    'Architected and implemented 12+ RESTful API endpoints using Node.js, Express, and MySQL, serving 50,000+ daily requests.\nOptimized MySQL query execution times by 35% through proper indexing, composite keys, and connection pooling with mysql2.\nEngineered responsive client dashboards with React.js, Tailwind CSS, and Framer Motion, boosting client retention by 22%.\nCollaborated in an agile scrum team of 8 engineers, participating in daily standups, code reviews, and CI/CD pipelines.',
    'Node.js, Express.js, MySQL, React.js, JWT, Redis Caching, Git, Agile/Scrum',
    1
),
(
    'NexTech Innovations Lab',
    'Frontend Developer Intern',
    'Internship',
    'Bengaluru, India',
    'December 2023',
    'April 2024',
    FALSE,
    'Built pixel-perfect, accessible UI components from Figma mockups with React and TypeScript.\nReduced bundle load times by 40% utilizing dynamic code-splitting and asset optimization.\nImplemented real-time notification feeds and state management using Redux Toolkit and WebSockets.\nAuthored comprehensive unit and integration tests with React Testing Library achieving 85% code coverage.',
    'React.js, TypeScript, Framer Motion, Redux Toolkit, REST APIs, Jest, UI/UX Design',
    2
);

-- 5. Insert Projects
INSERT INTO projects (user_id, title, slug, description, long_description, category, image_url, technologies, github_url, live_url, featured, order_index) VALUES
(
    1,
    'DevSync: Collaborative Agile Project Workspace',
    'devsync-collaborative-agile-workspace',
    'Full-stack enterprise project tracking and sprint planning platform with real-time kanban boards, role-based access control, and MySQL data persistence.',
    'DevSync is a high-performance developer workspace built to empower engineering teams with sprint tracking, interactive Kanban boards, automated velocity reports, and role-based permissions. Features include atomic database transactions, secure JWT authentication with refresh tokens, parameterized queries preventing SQL injections, and responsive fluid UI with Framer Motion drag-and-drop interactions.',
    'Full-Stack',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    'React.js, Node.js, Express.js, MySQL, Framer Motion, Tailwind CSS, JWT',
    'https://github.com/jaivikpatel/devsync-agile-workspace',
    'https://devsync-demo.vercel.app',
    TRUE,
    1
),
(
    'HealthPulse: AI-Assisted Medical Diagnostic Portal',
    'healthpulse-ai-medical-diagnostic-portal',
    'Interactive patient telemetry dashboard featuring AI symptom analysis, appointment scheduling, and automated prescription generation.',
    'HealthPulse integrates AI APIs with structured health telemetry databases. Built with a resilient Express.js API layer and MySQL normalized schema with ACID transaction guarantees. Front-end provides accessible healthcare metrics, interactive charts, and PDF report downloads.',
    'AI / ML',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    'React.js, Node.js, Gemini API, Express.js, MySQL, Chart.js, Lucide Icons',
    'https://github.com/jaivikpatel/healthpulse-ai-portal',
    'https://healthpulse-ai.vercel.app',
    TRUE,
    2
),
(
    'FinTrack: Real-Time Personal Wealth & Expense Engine',
    'fintrack-personal-wealth-expense-engine',
    'Comprehensive personal finance tracker with multi-currency support, budgeting goals, predictive analytics, and CSV transaction imports.',
    'FinTrack helps users master their cashflow with real-time expense classification, visual spending breakdowns, recurring subscription alerts, and secure bank statement ingestion. Designed with a relational database ensuring strict audit trails and zero float-rounding discrepancies.',
    'Full-Stack',
    'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    'React.js, Express.js, MySQL, Tailwind CSS, Framer Motion, Recharts',
    'https://github.com/jaivikpatel/fintrack-wealth-engine',
    'https://fintrack-engine.vercel.app',
    TRUE,
    3
),
(
    'CloudVault: Secure File Storage & Sharing Microservice',
    'cloudvault-secure-file-storage-microservice',
    'High-throughput file management system supporting encrypted uploads, expiring pre-signed URLs, chunked streaming, and granular permission controls.',
    'CloudVault provides scalable object metadata storage in MySQL with distributed file streaming. Built with Express multipart middleware, stream pipelines, SHA-256 integrity verification, and comprehensive API documentation with Postman and Swagger.',
    'Backend & APIs',
    'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    'Node.js, Express.js, MySQL, AWS S3 SDK, Multer, Docker, Jest',
    'https://github.com/jaivikpatel/cloudvault-storage-api',
    'https://cloudvault-api.render.com',
    FALSE,
    4
),
(
    'AuraUI: Design System & Micro-Interaction Component Kit',
    'auraui-design-system-component-kit',
    'Modern accessible React component library featuring 40+ polished UI elements, dark mode theming, and butter-smooth Framer Motion animations.',
    'AuraUI is an open-source component toolkit crafted for developer ergonomics. Includes accessible modal dialogues, floating tooltips, responsive data tables, animated navigation menus, and keyboard-first accessibility (WCAG AA compliant).',
    'Frontend',
    'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
    'React.js, TypeScript, Framer Motion, Tailwind CSS, Storybook',
    'https://github.com/jaivikpatel/auraui-design-system',
    'https://auraui-showcase.vercel.app',
    FALSE,
    5
),
(
    'CodeCraft: Browser-Based Code Playground & Compiler',
    'codecraft-browser-code-playground',
    'Interactive web development environment supporting real-time HTML/CSS/JS preview, code formatting, syntax highlighting, and snippet sharing.',
    'CodeCraft delivers an instant coding sandbox directly in the browser with Monaco Editor integration, live Iframe sandboxing, console output capturing, and MySQL-backed snippet sharing links.',
    'Frontend',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    'React.js, Monaco Editor, Express.js, MySQL, Framer Motion',
    'https://github.com/jaivikpatel/codecraft-playground',
    'https://codecraft-editor.vercel.app',
    FALSE,
    6
);

-- 6. Insert Certifications
INSERT INTO certifications (title, issuing_organization, issue_date, credential_id, credential_url, image_url, order_index) VALUES
(
    'AWS Certified Cloud Practitioner (CLF-C02)',
    'Amazon Web Services (AWS)',
    'August 2024',
    'AWS-CCP-9834710',
    'https://aws.amazon.com/verification',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    1
),
(
    'Meta Front-End Developer Professional Certificate',
    'Meta / Coursera',
    'June 2024',
    'COURSERA-META-77123',
    'https://coursera.org/verify/professional-cert/META-77123',
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80',
    2
),
(
    'Node.js Application Development (LFW211)',
    'The Linux Foundation / OpenJS',
    'March 2024',
    'LF-NODE-44829',
    'https://www.credly.com/org/the-linux-foundation',
    'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=600&q=80',
    3
),
(
    'SQL & Relational Database Design Specialist',
    'HackerRank & Oracle University',
    'January 2024',
    'HR-SQL-GOLD-5591',
    'https://www.hackerrank.com/certificates/sql-gold',
    'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80',
    4
);

-- 7. Insert Initial Contact Message
INSERT INTO contact_messages (name, email, subject, message, is_read) VALUES
(
    'Sarah Jenkins (Tech Recruiter)',
    'sarah.jenkins@techrecruitment.io',
    'Exciting Full-Stack Developer Internship Opportunity',
    'Hi Jaivik, I came across your portfolio and was thoroughly impressed by your projects and technical stack! We have an opening for an Associate Software Engineer / Intern on our core engineering team. Would love to schedule a quick 15-minute introductory call with you this week.',
    FALSE
);

