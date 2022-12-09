const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { notificationService } = require('../services');

const createNotification = catchAsync(async (req, res) => {
  const { businessId, id } = req.user.dataValues;
  const notification = await notificationService.createNotification(req.body, businessId, id);
  res.status(httpStatus.CREATED).send(notification);
});

const getNotifications = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;
  const userId = req.user.dataValues.id;
  const result = await notificationService.getAllNotifications(businessId, userId);
  res.send(result);
});

const getNotification = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;
  const notification = await notificationService.getNotificationById(req.params.notificationId, businessId);
  if (!notification) {
    throw new ApiError(httpStatus.NOT_FOUND, 'notification not found');
  }
  res.send(notification);
});

const updateNotification = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;
  const notification = await notificationService.updateNotificationById(req.params.notificationId, req.body, businessId);
  res.send(notification);
});

const deleteNotification = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;
  await notificationService.deleteNotificationById(req.params.notificationId, businessId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createNotification,
  getNotifications,
  getNotification,
  updateNotification,
  deleteNotification,
};
