const db = require('../config/db');

const EducationModel = {
  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM education ORDER BY order_index ASC, id DESC');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM education WHERE id = ?', [id]);
    return rows[0] || null;
  },

  create: async (data) => {
    const { institution, degree, department, start_year, end_year, grade_or_gpa = null, achievements = null, order_index = 0 } = data;
    const [result] = await db.query(
      `INSERT INTO education (institution, degree, department, start_year, end_year, grade_or_gpa, achievements, order_index)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [institution, degree, department, start_year, end_year, grade_or_gpa, achievements, Number(order_index)]
    );
    return result.insertId;
  },

  update: async (id, data) => {
    const { institution, degree, department, start_year, end_year, grade_or_gpa, achievements, order_index } = data;
    const [result] = await db.query(
      `UPDATE education SET 
        institution = ?, 
        degree = ?, 
        department = ?, 
        start_year = ?, 
        end_year = ?, 
        grade_or_gpa = ?, 
        achievements = ?, 
        order_index = ? 
       WHERE id = ?`,
      [institution, degree, department, start_year, end_year, grade_or_gpa, achievements, Number(order_index), id]
    );
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM education WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = EducationModel;

