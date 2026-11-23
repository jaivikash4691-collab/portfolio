const ContactModel = require('../models/contactModel');

const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    const newId = await ContactModel.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim()
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you for your message! I will get back to you promptly.',
      data: {
        id: newId
      }
    });
  } catch (error) {
    next(error);
  }
};

const getAllMessages = async (req, res, next) => {
  try {
    const messages = await ContactModel.findAll();
    const unreadCount = await ContactModel.getUnreadCount();
    return res.status(200).json({
      success: true,
      count: messages.length,
      unreadCount,
      data: messages
    });
  } catch (error) {
    next(error);
  }
};

const markMessageRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isRead = true } = req.body;
    const existing = await ContactModel.findById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: `Message with ID ${id} not found`
      });
    }

    await ContactModel.markAsRead(id, isRead);
    return res.status(200).json({
      success: true,
      message: `Message marked as ${isRead ? 'read' : 'unread'}`
    });
  } catch (error) {
    next(error);
  }
};

const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await ContactModel.findById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: `Message with ID ${id} not found`
      });
    }

    await ContactModel.delete(id);
    return res.status(200).json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContact,
  getAllMessages,
  markMessageRead,
  deleteMessage
};

