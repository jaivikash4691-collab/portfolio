const EducationModel = require('../models/educationModel');

const getAllEducation = async (req, res, next) => {
  try {
    const list = await EducationModel.findAll();
    return res.status(200).json({
      success: true,
      count: list.length,
      data: list
    });
  } catch (error) {
    next(error);
  }
};

const createEducation = async (req, res, next) => {
  try {
    const newId = await EducationModel.create(req.body);
    const created = await EducationModel.findById(newId);
    return res.status(201).json({
      success: true,
      message: 'Education record added successfully',
      data: created
    });
  } catch (error) {
    next(error);
  }
};

const updateEducation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await EducationModel.findById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: `Education record with ID ${id} not found`
      });
    }

    await EducationModel.update(id, req.body);
    const updated = await EducationModel.findById(id);
    return res.status(200).json({
      success: true,
      message: 'Education record updated successfully',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

const deleteEducation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await EducationModel.findById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: `Education record with ID ${id} not found`
      });
    }

    await EducationModel.delete(id);
    return res.status(200).json({
      success: true,
      message: 'Education record deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEducation,
  createEducation,
  updateEducation,
  deleteEducation
};

