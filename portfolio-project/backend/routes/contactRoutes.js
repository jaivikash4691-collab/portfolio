const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { authenticate, requireAdmin } = require('../middleware/auth');
const { validateContact } = require('../middleware/validator');

// Public contact submission
router.post('/', validateContact, contactController.submitContact);

// Protected Admin message management
router.get('/', authenticate, requireAdmin, contactController.getAllMessages);
router.put('/:id/read', authenticate, requireAdmin, contactController.markMessageRead);
router.delete('/:id', authenticate, requireAdmin, contactController.deleteMessage);

module.exports = router;

