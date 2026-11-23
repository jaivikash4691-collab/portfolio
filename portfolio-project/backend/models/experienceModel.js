const db = require('../config/db');

const ExperienceModel = {
  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM experience ORDER BY order_index ASC, id DESC');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM experience WHERE id = ?', [id]);
    return rows[0] || null;
  },

  create: async (data) => {
    const {
      organization,
      role,
      employment_type = 'Internship',
      location = null,
      start_date,
      end_date,
      is_current = 0,
      responsibilities,
      skills_gained = null,
      order_index = 0
    } = data;

    const [result] = await db.query(
      `INSERT INTO experience (organization, role, employment_type, location, start_date, end_date, is_current, responsibilities, skills_gained, order_index)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [organization, role, employment_type, location, start_date, end_date, is_current ? 1 : 0, responsibilities, skills_gained, Number(order_index)]
    );
    return result.insertId;
  },

  update: async (id, data) => {
    const {
      organization,
      role,
      employment_type,
      location,
      start_date,
      end_date,
      is_current,
      responsibilities,
      skills_gained,
      order_index
    } = data;

    const [result] = await db.query(
      `UPDATE experience SET 
        organization = ?, 
        role = ?, 
        employment_type = ?, 
        location = ?, 
        start_date = ?, 
        end_date = ?, 
        is_current = ?, 
        responsibilities = ?, 
        skills_gained = ?, 
        order_index = ? 
       WHERE id = ?`,
      [organization, role, employment_type, location, start_date, end_date, is_current ? 1 : 0, responsibilities, skills_gained, Number(order_index), id]
    );
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM experience WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = ExperienceModel;

