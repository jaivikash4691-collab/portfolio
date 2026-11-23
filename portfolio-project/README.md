# Professional Full-Stack Developer Internship Portfolio

[![Node.js](https://img.shields.io/badge/Node.js-v20%2B-green?logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![Express.js](https://img.shields.io/badge/Express.js-REST_API-lightgrey?logo=express)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0%2B-orange?logo=mysql)](https://www.mysql.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-purple?logo=framer)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A complete, production-quality full-stack personal portfolio and software engineering internship showcase website. Inspired by the **GreatStack design system** (`https://www.youtube.com/watch?v=0YFrGy_mzjY`), featuring an obsidian dark theme (`#080808`), vibrant crimson-red accents (`#ff004f`), Framer Motion micro-interactions, relational MySQL data persistence, a secure Express.js REST API with JWT authentication, and an Admin Dashboard for managing projects, skills, credentials, and inbound recruiter inquiries.

---

## 🚀 Key Highlights & Architectural Features

- **Reference-Accurate Visual Direction**: Faithfully reproduces GreatStack's iconic dark aesthetic, glowing accents, signature tabbed About Me section (Skills, Experience, Education tabs with animated underline indicators), service feature cards, project gallery hover overlays, and responsive mobile sliding drawer.
- **Strict Tech Stack**:
  - **Frontend**: React 18, React Router v6, Framer Motion, Lucide React, CSS3 custom properties.
  - **Backend**: Node.js, Express.js, REST API architecture, JWT authentication, bcrypt password hashing, input validation middleware, centralized error handling.
  - **Database**: Relational MySQL with `mysql2/promise` connection pooling, normalized schema, foreign keys, timestamps, indexes, and automatic fallback store for resilient testing.
  - **Testing**: Automated backend test suite (Jest + Supertest) and frontend component test suite (Vitest + React Testing Library).
  - **Admin Dashboard**: Full CRUD management panel for projects, skills, education, experience, certifications, and recruiter contact inquiries.

---

## 📂 Project Structure

```
/portfolio-project
  ├── frontend/
  │   ├── src/
  │   │   ├── assets/             # Avatar illustration & custom badges
  │   │   ├── components/         # Navbar, Footer, ProjectCard, Modals, Toast, ScrollToTop
  │   │   ├── hooks/              # Custom React hooks
  │   │   ├── pages/              # Home, AdminLogin, AdminDashboard, NotFound
  │   │   ├── sections/           # Hero, About (Tabs), Services, Skills, Projects, Experience, Education, Certs, Contact
  │   │   ├── services/           # REST API client with JWT headers
  │   │   ├── styles/             # variables.css, index.css, components.css, admin.css
  │   │   ├── tests/              # Vitest & RTL test suites (Navbar, About, Contact)
  │   │   ├── App.jsx             # React Router configuration
  │   │   └── main.jsx            # Entry point
  │   ├── index.html
  │   ├── vite.config.js
  │   ├── vercel.json             # Vercel deployment configuration
  │   └── package.json
  ├── backend/
  │   ├── config/
  │   │   └── db.js               # MySQL pool with resilient local fallback
  │   ├── controllers/            # Auth, Projects, Skills, Edu, Exp, Certs, Contact, Stats
  │   ├── middleware/             # JWT auth, validator, centralized error handler
  │   ├── models/                 # Parameterized SQL query models
  │   ├── routes/                 # REST API router endpoints
  │   ├── scripts/
  │   │   └── initDb.js           # Automated MySQL schema and seed installer
  │   ├── tests/                  # Jest & Supertest API integration suite
  │   ├── utils/                  # JWT token helpers, logger
  │   ├── server.js               # Express application entry
  │   ├── render.yaml             # Render deployment configuration
  │   ├── .env.example
  │   └── package.json
  ├── database/
  │   ├── schema.sql              # DDL schema for portfolio_db (7 tables)
  │   └── seed.sql                # Production seed data (admin, skills, projects, certs)
  └── README.md
```

---

## 🗄️ MySQL Database Architecture (`portfolio_db`)

The database consists of 7 normalized relational tables:

1. **`users`**: Administrator credentials with bcrypt password hash (`$2b$10$...`), roles, and timestamps.
2. **`projects`**: Project titles, slugs, categories, descriptions, technology tags, live demo & GitHub repository URLs, featured flags, and order indices with foreign key constraint to `users(id)`.
3. **`skills`**: Categorized competencies across 6 domains (Programming Languages, Frontend Development, Backend Development, Databases, AI & Machine Learning, Tools and Technologies) with proficiency scores (1-100) and Lucide icon mappings.
4. **`education`**: Academic credentials, institution, degree, department, duration, CGPA/grades, and honors.
5. **`experience`**: Professional internship positions, organizations, employment types, locations, date ranges, bullet-pointed responsibilities, and acquired skills.
6. **`certifications`**: Verified technical certifications, issuing authorities (AWS, Meta, Linux Foundation, Oracle), completion dates, credential IDs, and verification URLs.
7. **`contact_messages`**: Inbound recruiter messages with contact details, subjects, message bodies, read receipts, and creation timestamps.

---

## 🔌 REST API Endpoints

### Public Endpoints
- `GET /api/health` - API server health status
- `GET /api/projects` - List all portfolio projects
- `GET /api/projects/:id` - Fetch single project details
- `GET /api/skills` - List all categorized skills
- `GET /api/education` - Retrieve academic history
- `GET /api/experience` - Retrieve internship experience
- `GET /api/certifications` - Retrieve verified credentials
- `POST /api/contact` - Submit contact inquiry (stored in MySQL)
- `POST /api/auth/login` - Admin login authentication

### Protected Endpoints (Requires `Authorization: Bearer <token>`)
- `GET /api/auth/me` - Verify admin token
- `GET /api/stats` - Admin overview metrics
- `POST /api/projects` - Add new project
- `PUT /api/projects/:id` - Update project details
- `DELETE /api/projects/:id` - Remove project
- `POST /api/skills` - Add skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill
- `POST /api/education` | `PUT` | `DELETE` - Manage education
- `POST /api/experience` | `PUT` | `DELETE` - Manage experience
- `POST /api/certifications` | `PUT` | `DELETE` - Manage certifications
- `GET /api/contact` - View all recruiter inquiries
- `PUT /api/contact/:id/read` - Toggle read/unread status
- `DELETE /api/contact/:id` - Delete inquiry

---

## 💻 Local Setup & Execution Guide

### 1. Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- MySQL Server 8.0+ (Optional: the backend includes an automated fallback database so you can run and test immediately even without MySQL running).

### 2. Configure Backend
```bash
cd portfolio-project/backend
npm install
cp .env.example .env
```
Edit `.env` with your MySQL credentials:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=portfolio_db
DB_PORT=3306
JWT_SECRET=super_secret_portfolio_jwt_key_2026_dev_secure
CLIENT_ORIGIN=http://localhost:5173
```

### 3. Initialize MySQL Database
```bash
# Creates portfolio_db, runs schema.sql, and inserts seed data
npm run db:init
```

### 4. Run Backend Server
```bash
npm start
# or for development with auto-reload:
npm run dev
```
Backend API will be running on: `http://localhost:5000`

### 5. Run Backend Tests
```bash
npm test
```

### 6. Configure & Run Frontend
In a new terminal:
```bash
cd portfolio-project/frontend
npm install
npm run dev
```
Open your browser at: `http://localhost:5173`

### 7. Run Frontend Tests & Build
```bash
# Run Vitest test suite:
npm test

# Test production build:
npm run build
```

---

## 🛡️ Admin Dashboard Demo Credentials

Navigate to `http://localhost:5173/admin` (or click the **Admin** shield button in the navigation bar/footer):

- **Username**: `admin`
- **Password**: `AdminPassword123!`

---

## 🌐 Production Deployment

### Frontend (Vercel)
1. Push the repository to GitHub.
2. Link the repository in [Vercel](https://vercel.com).
3. Set the Root Directory to `portfolio-project/frontend`.
4. Framework Preset: `Vite`.
5. Environment Variable:
   - `VITE_API_URL`: `https://your-backend-url.onrender.com/api`
6. Deploy! (`vercel.json` rewrite rules are pre-configured).

### Backend (Render)
1. In [Render](https://render.com), create a new **Web Service**.
2. Root Directory: `portfolio-project/backend`.
3. Build Command: `npm install`.
4. Start Command: `npm start`.
5. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `DB_HOST`: `<your-hosted-mysql-host>`
   - `DB_USER`: `<your-hosted-mysql-user>`
   - `DB_PASSWORD`: `<your-hosted-mysql-password>`
   - `DB_NAME`: `portfolio_db`
   - `DB_PORT`: `3306`
   - `JWT_SECRET`: `<secure-random-key>`
   - `CLIENT_ORIGIN`: `https://your-frontend-domain.vercel.app`

### Hosted MySQL Provider
You can host MySQL for free on providers like:
- **Aiven for MySQL** (Free tier available)
- **Railway.app MySQL**
- **PlanetScale** or **Clever Cloud**

Simply import `database/schema.sql` and `database/seed.sql` into your hosted database.

---

## 📄 License
MIT License. Created by Jaivik Patel. Suitable for presenting as an internship portfolio and developer profile.

