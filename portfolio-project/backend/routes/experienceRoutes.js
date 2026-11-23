const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experienceController');
const { authenticate, requireAdmin } = require('../middleware/auth');
const { validateExperience } = require('../middleware/validator');

router.get('/', experienceController.getAllExperience);
router.post('/', authenticate, requireAdmin, validateExperience, experienceController.createExperience);
router.put('/:id', authenticate, requireAdmin, validateExperience, experienceController.updateExperience);
router.delete('/:id', authenticate, requireAdmin, experienceController.deleteExperience);

module.exports = router;

