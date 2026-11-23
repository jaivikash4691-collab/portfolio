const express = require('express');
const router = express.Router();
const educationController = require('../controllers/educationController');
const { authenticate, requireAdmin } = require('../middleware/auth');
const { validateEducation } = require('../middleware/validator');

router.get('/', educationController.getAllEducation);
router.post('/', authenticate, requireAdmin, validateEducation, educationController.createEducation);
router.put('/:id', authenticate, requireAdmin, validateEducation, educationController.updateEducation);
router.delete('/:id', authenticate, requireAdmin, educationController.deleteEducation);

module.exports = router;

