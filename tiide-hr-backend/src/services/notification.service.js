const { db } = require('../models');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { userService } = require('.');

/**
 * It creates a notification in the database.
 * @param {Object} notificationBody - {
 * @returns {Promise<Object>} A promise.
 */
async function createNotification(notificationBody, businessId, userId) {
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
  // const user = await userService.createUser(userBody);
  notificationBody.businessId = businessId;
  notificationBody.userId = userId;
  // notificationBody.userId = user.id;
  return db.notifications.create(notificationBody);
}

async function getAllNotifications(businessId, userId) {
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
  return db.notifications.findAll({ where: { businessId, userId } });
}

async function getNotificationById(notificationId, businessId) {
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
  return db.notifications.findOne({ where: { businessId, id: notificationId } });
}

async function updateNotificationById(notificationId, notificationBody, businessId) {
  const notification = await getNotificationById(notificationId, businessId);
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
  if (!notification) {
    throw new Error('notification not found');
  }
  Object.assign(notification, notificationBody);
  await notification.save();
  return notification;
}
async function deleteNotificationById(notificationId, businessId) {
  const notification = await getNotificationById(notificationId, businessId);
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
  if (!notification) {
    throw new Error('notification not found');
  }
  await notification.destroy();
  return notification;
}

module.exports = {
  createNotification,
  getAllNotifications,
  getNotificationById,
  updateNotificationById,
  deleteNotificationById,
};
