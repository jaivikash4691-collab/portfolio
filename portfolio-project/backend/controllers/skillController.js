const SkillModel = require('../models/skillModel');

const getAllSkills = async (req, res, next) => {
  try {
    const { category } = req.query;
    let skills;
    if (category) {
      skills = await SkillModel.findByCategory(category);
    } else {
      skills = await SkillModel.findAll();
    }
    return res.status(200).json({
      success: true,
      count: skills.length,
      data: skills
    });
  } catch (error) {
    next(error);
  }
};

const createSkill = async (req, res, next) => {
  try {
    const newId = await SkillModel.create(req.body);
    const created = await SkillModel.findById(newId);
    return res.status(201).json({
      success: true,
      message: 'Skill added successfully',
      data: created
    });
  } catch (error) {
    next(error);
  }
};

const updateSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await SkillModel.findById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: `Skill with ID ${id} not found`
      });
    }

    await SkillModel.update(id, req.body);
    const updated = await SkillModel.findById(id);
    return res.status(200).json({
      success: true,
      message: 'Skill updated successfully',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

const deleteSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await SkillModel.findById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: `Skill with ID ${id} not found`
      });
    }

    await SkillModel.delete(id);
    return res.status(200).json({
      success: true,
      message: 'Skill deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill
};

