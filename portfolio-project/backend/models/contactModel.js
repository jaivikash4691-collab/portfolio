const db = require('../config/db');

const ContactModel = {
  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM contact_messages ORDER BY created_at DESC, id DESC');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM contact_messages WHERE id = ?', [id]);
    return rows[0] || null;
  },

  create: async (data) => {
    const { name, email, subject, message } = data;
    const [result] = await db.query(
      'INSERT INTO contact_messages (name, email, subject, message, is_read) VALUES (?, ?, ?, ?, 0)',
      [name, email, subject, message]
    );
    return result.insertId;
  },

  markAsRead: async (id, isRead = 1) => {
    const [result] = await db.query(
      'UPDATE contact_messages SET is_read = ? WHERE id = ?',
      [isRead ? 1 : 0, id]
    );
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM contact_messages WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },

  getUnreadCount: async () => {
    const [rows] = await db.query('SELECT COUNT(*) as count FROM contact_messages WHERE is_read = 0');
    return rows[0] ? rows[0].count : 0;
  }
};

module.exports = ContactModel;

