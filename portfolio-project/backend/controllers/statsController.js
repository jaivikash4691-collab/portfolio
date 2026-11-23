const db = require('../config/db');

const getDashboardStats = async (req, res, next) => {
  try {
    const [projectRows] = await db.query('SELECT COUNT(*) as count FROM projects');
    const [skillRows] = await db.query('SELECT COUNT(*) as count FROM skills');
    const [certRows] = await db.query('SELECT COUNT(*) as count FROM certifications');
    const [expRows] = await db.query('SELECT COUNT(*) as count FROM experience');
    const [eduRows] = await db.query('SELECT COUNT(*) as count FROM education');
    const [msgRows] = await db.query('SELECT COUNT(*) as count FROM contact_messages');
    const [unreadRows] = await db.query('SELECT COUNT(*) as count FROM contact_messages WHERE is_read = 0');

    return res.status(200).json({
      success: true,
      stats: {
        projects: projectRows[0] ? projectRows[0].count : 0,
        skills: skillRows[0] ? skillRows[0].count : 0,
        certifications: certRows[0] ? certRows[0].count : 0,
        experience: expRows[0] ? expRows[0].count : 0,
        education: eduRows[0] ? eduRows[0].count : 0,
        totalMessages: msgRows[0] ? msgRows[0].count : 0,
        unreadMessages: unreadRows[0] ? unreadRows[0].count : 0
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats
};

