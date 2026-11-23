const db = require('../config/db');

const SkillModel = {
  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM skills ORDER BY order_index ASC, id ASC');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM skills WHERE id = ?', [id]);
    return rows[0] || null;
  },

  findByCategory: async (category) => {
    const [rows] = await db.query('SELECT * FROM skills WHERE category = ? ORDER BY order_index ASC', [category]);
    return rows;
  },

  create: async (data) => {
    const { category, name, proficiency, icon_name = 'Code', order_index = 0 } = data;
    const [result] = await db.query(
      'INSERT INTO skills (category, name, proficiency, icon_name, order_index) VALUES (?, ?, ?, ?, ?)',
      [category, name, Number(proficiency), icon_name, Number(order_index)]
    );
    return result.insertId;
  },

  update: async (id, data) => {
    const { category, name, proficiency, icon_name, order_index } = data;
    const [result] = await db.query(
      'UPDATE skills SET category = ?, name = ?, proficiency = ?, icon_name = ?, order_index = ? WHERE id = ?',
      [category, name, Number(proficiency), icon_name, Number(order_index), id]
    );
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM skills WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = SkillModel;

