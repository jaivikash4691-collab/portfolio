const express = require('express');
const router = express.Router();
const certificationController = require('../controllers/certificationController');
const { authenticate, requireAdmin } = require('../middleware/auth');
const { validateCertification } = require('../middleware/validator');

router.get('/', certificationController.getAllCertifications);
router.post('/', authenticate, requireAdmin, validateCertification, certificationController.createCertification);
router.put('/:id', authenticate, requireAdmin, validateCertification, certificationController.updateCertification);
router.delete('/:id', authenticate, requireAdmin, certificationController.deleteCertification);

module.exports = router;

