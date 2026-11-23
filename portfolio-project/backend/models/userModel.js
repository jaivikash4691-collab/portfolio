const db = require('../config/db');

const UserModel = {
  findByUsername: async (username) => {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0] || null;
  },

  findById: async (id) => {
    const [rows] = await db.query('SELECT id, username, email, full_name, role, created_at FROM users WHERE id = ?', [id]);
    return rows[0] || null;
  },

  findByEmail: async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] || null;
  },

  create: async (userData) => {
    const { username, email, password, full_name, role = 'admin' } = userData;
    const [result] = await db.query(
      'INSERT INTO users (username, email, password, full_name, role) VALUES (?, ?, ?, ?, ?)',
      [username, email, password, full_name, role]
    );
    return result.insertId;
  }
};

module.exports = UserModel;

