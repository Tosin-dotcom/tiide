const { db } = require('../models');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { userService } = require('.');

const idOfLeavePermission = async () => {
  const leave = await db.permissions.findOne({ where: { value: 'manageLeave' } });
  return leave.dataValues.id;
};

const getIdOfPeopleWithLeavePermission = async (businessId) => {
  const leaveId = await idOfLeavePermission();
  const allRoles = await db.role_permission.findAll(
    { where: { businessId: businessId, permissionId: leaveId } },
    { include: { all: true } }
  );
  //console.log(allRoles);
  return allRoles;
};
const userWithLeavePermission = async (businessId) => {
  const roles = await getIdOfPeopleWithLeavePermission(businessId);
  const users = [];
  roles.forEach(async (role) => {
    const user = await db.users.findOne({ where: { roleId: role.dataValues.roleId } });
    users.push(user.dataValues.id);
  });

  return users;
};

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
  userWithLeavePermission,
};
