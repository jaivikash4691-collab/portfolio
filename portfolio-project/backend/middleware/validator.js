// Input validation middleware for API endpoints

const validateContact = (req, res, next) => {
  const { name, email, subject, message } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Name is required and must be at least 2 characters long.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('A valid email address is required.');
  }

  if (!subject || typeof subject !== 'string' || subject.trim().length < 3) {
    errors.push('Subject is required and must be at least 3 characters long.');
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    errors.push('Message is required and must be at least 10 characters long.');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password are required.'
    });
  }
  next();
};

const validateProject = (req, res, next) => {
  const { title, description, category, technologies } = req.body;
  const errors = [];

  if (!title || !title.trim()) errors.push('Project title is required.');
  if (!description || !description.trim()) errors.push('Project description is required.');
  if (!category || !category.trim()) errors.push('Project category is required.');
  if (!technologies) errors.push('Technologies are required.');

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }
  next();
};

const validateSkill = (req, res, next) => {
  const { category, name, proficiency } = req.body;
  const errors = [];

  if (!category || !category.trim()) errors.push('Category is required.');
  if (!name || !name.trim()) errors.push('Skill name is required.');
  if (proficiency === undefined || proficiency === null || proficiency < 1 || proficiency > 100) {
    errors.push('Proficiency must be an integer between 1 and 100.');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }
  next();
};

const validateEducation = (req, res, next) => {
  const { institution, degree, department, start_year, end_year } = req.body;
  const errors = [];

  if (!institution || !institution.trim()) errors.push('Institution is required.');
  if (!degree || !degree.trim()) errors.push('Degree is required.');
  if (!department || !department.trim()) errors.push('Department is required.');
  if (!start_year || !start_year.trim()) errors.push('Start year is required.');
  if (!end_year || !end_year.trim()) errors.push('End year is required.');

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }
  next();
};

const validateExperience = (req, res, next) => {
  const { organization, role, start_date, end_date, responsibilities } = req.body;
  const errors = [];

  if (!organization || !organization.trim()) errors.push('Organization is required.');
  if (!role || !role.trim()) errors.push('Role is required.');
  if (!start_date || !start_date.trim()) errors.push('Start date is required.');
  if (!end_date || !end_date.trim()) errors.push('End date is required.');
  if (!responsibilities || !responsibilities.trim()) errors.push('Responsibilities are required.');

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }
  next();
};

const validateCertification = (req, res, next) => {
  const { title, issuing_organization, issue_date } = req.body;
  const errors = [];

  if (!title || !title.trim()) errors.push('Certification title is required.');
  if (!issuing_organization || !issuing_organization.trim()) errors.push('Issuing organization is required.');
  if (!issue_date || !issue_date.trim()) errors.push('Issue date is required.');

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }
  next();
};

module.exports = {
  validateContact,
  validateLogin,
  validateProject,
  validateSkill,
  validateEducation,
  validateExperience,
  validateCertification
};

