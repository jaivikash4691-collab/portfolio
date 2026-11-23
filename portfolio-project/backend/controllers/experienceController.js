const ExperienceModel = require('../models/experienceModel');

const getAllExperience = async (req, res, next) => {
  try {
    const list = await ExperienceModel.findAll();
    return res.status(200).json({
      success: true,
      count: list.length,
      data: list
    });
  } catch (error) {
    next(error);
  }
};

const createExperience = async (req, res, next) => {
  try {
    const newId = await ExperienceModel.create(req.body);
    const created = await ExperienceModel.findById(newId);
    return res.status(201).json({
      success: true,
      message: 'Experience record added successfully',
      data: created
    });
  } catch (error) {
    next(error);
  }
};

const updateExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await ExperienceModel.findById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: `Experience record with ID ${id} not found`
      });
    }

    await ExperienceModel.update(id, req.body);
    const updated = await ExperienceModel.findById(id);
    return res.status(200).json({
      success: true,
      message: 'Experience record updated successfully',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

const deleteExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await ExperienceModel.findById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: `Experience record with ID ${id} not found`
      });
    }

    await ExperienceModel.delete(id);
    return res.status(200).json({
      success: true,
      message: 'Experience record deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllExperience,
  createExperience,
  updateExperience,
  deleteExperience
};

