const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { authenticate, requireAdmin } = require('../middleware/auth');
const { validateProject } = require('../middleware/validator');

// Public endpoints
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);

// Protected Admin endpoints
router.post('/', authenticate, requireAdmin, validateProject, projectController.createProject);
router.put('/:id', authenticate, requireAdmin, validateProject, projectController.updateProject);
router.delete('/:id', authenticate, requireAdmin, projectController.deleteProject);

module.exports = router;

