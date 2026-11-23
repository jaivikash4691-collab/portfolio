const db = require('../config/db');

const ProjectModel = {
  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM projects ORDER BY order_index ASC, id DESC');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM projects WHERE id = ?', [id]);
    return rows[0] || null;
  },

  findBySlug: async (slug) => {
    const [rows] = await db.query('SELECT * FROM projects WHERE slug = ?', [slug]);
    return rows[0] || null;
  },

  create: async (data) => {
    const {
      user_id = 1,
      title,
      slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      description,
      long_description = null,
      category,
      image_url = null,
      technologies,
      github_url = null,
      live_url = null,
      featured = 0,
      order_index = 0
    } = data;

    const [result] = await db.query(
      `INSERT INTO projects (user_id, title, slug, description, long_description, category, image_url, technologies, github_url, live_url, featured, order_index)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [user_id, title, slug, description, long_description, category, image_url, technologies, github_url, live_url, featured ? 1 : 0, order_index]
    );
    return result.insertId;
  },

  update: async (id, data) => {
    const {
      title,
      slug,
      description,
      long_description,
      category,
      image_url,
      technologies,
      github_url,
      live_url,
      featured,
      order_index
    } = data;

    const [result] = await db.query(
      `UPDATE projects SET 
        title = ?, 
        slug = ?, 
        description = ?, 
        long_description = ?, 
        category = ?, 
        image_url = ?, 
        technologies = ?, 
        github_url = ?, 
        live_url = ?, 
        featured = ?, 
        order_index = ? 
       WHERE id = ?`,
      [title, slug, description, long_description, category, image_url, technologies, github_url, live_url, featured ? 1 : 0, order_index, id]
    );
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM projects WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = ProjectModel;

