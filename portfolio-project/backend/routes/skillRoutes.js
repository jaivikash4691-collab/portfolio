const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');
const { authenticate, requireAdmin } = require('../middleware/auth');
const { validateSkill } = require('../middleware/validator');

router.get('/', skillController.getAllSkills);
router.post('/', authenticate, requireAdmin, validateSkill, skillController.createSkill);
router.put('/:id', authenticate, requireAdmin, validateSkill, skillController.updateSkill);
router.delete('/:id', authenticate, requireAdmin, skillController.deleteSkill);

module.exports = router;

