const ProjectModel = require('../models/projectModel');

const getAllProjects = async (req, res, next) => {
  try {
    const projects = await ProjectModel.findAll();
    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await ProjectModel.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: `Project with ID ${id} not found`
      });
    }
    return res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    const newId = await ProjectModel.create(req.body);
    const createdProject = await ProjectModel.findById(newId);
    return res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: createdProject
    });
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await ProjectModel.findById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: `Project with ID ${id} not found`
      });
    }

    await ProjectModel.update(id, req.body);
    const updated = await ProjectModel.findById(id);
    return res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await ProjectModel.findById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: `Project with ID ${id} not found`
      });
    }

    await ProjectModel.delete(id);
    return res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};

