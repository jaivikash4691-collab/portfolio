const CertificationModel = require('../models/certificationModel');

const getAllCertifications = async (req, res, next) => {
  try {
    const list = await CertificationModel.findAll();
    return res.status(200).json({
      success: true,
      count: list.length,
      data: list
    });
  } catch (error) {
    next(error);
  }
};

const createCertification = async (req, res, next) => {
  try {
    const newId = await CertificationModel.create(req.body);
    const created = await CertificationModel.findById(newId);
    return res.status(201).json({
      success: true,
      message: 'Certification added successfully',
      data: created
    });
  } catch (error) {
    next(error);
  }
};

const updateCertification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await CertificationModel.findById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: `Certification with ID ${id} not found`
      });
    }

    await CertificationModel.update(id, req.body);
    const updated = await CertificationModel.findById(id);
    return res.status(200).json({
      success: true,
      message: 'Certification updated successfully',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

const deleteCertification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await CertificationModel.findById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: `Certification with ID ${id} not found`
      });
    }

    await CertificationModel.delete(id);
    return res.status(200).json({
      success: true,
      message: 'Certification deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCertifications,
  createCertification,
  updateCertification,
  deleteCertification
};

