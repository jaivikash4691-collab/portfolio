const db = require('../config/db');

const CertificationModel = {
  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM certifications ORDER BY order_index ASC, id DESC');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM certifications WHERE id = ?', [id]);
    return rows[0] || null;
  },

  create: async (data) => {
    const {
      title,
      issuing_organization,
      issue_date,
      credential_id = null,
      credential_url = null,
      image_url = null,
      order_index = 0
    } = data;

    const [result] = await db.query(
      `INSERT INTO certifications (title, issuing_organization, issue_date, credential_id, credential_url, image_url, order_index)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, issuing_organization, issue_date, credential_id, credential_url, image_url, Number(order_index)]
    );
    return result.insertId;
  },

  update: async (id, data) => {
    const {
      title,
      issuing_organization,
      issue_date,
      credential_id,
      credential_url,
      image_url,
      order_index
    } = data;

    const [result] = await db.query(
      `UPDATE certifications SET 
        title = ?, 
        issuing_organization = ?, 
        issue_date = ?, 
        credential_id = ?, 
        credential_url = ?, 
        image_url = ?, 
        order_index = ? 
       WHERE id = ?`,
      [title, issuing_organization, issue_date, credential_id, credential_url, image_url, Number(order_index), id]
    );
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM certifications WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = CertificationModel;

