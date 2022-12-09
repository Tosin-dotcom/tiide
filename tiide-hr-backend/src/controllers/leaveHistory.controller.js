const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { leaveHistoryService, leaveApplicationService } = require('../services');

const createLeaveHistory = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;
  const leaveHistory = await leaveHistoryService.createLeaveHistory(req.body, businessId);
  res.status(httpStatus.CREATED).send(leaveHistory);
});

const getLeaveHistories = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;
  const result = await leaveHistoryService.getLeaveHistories(businessId);
  res.send(result);
});

const getLeaveHistory = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;
  const leaveHistory = await leaveHistoryService.getLeaveHistoryById(req.params.leaveHistoryId, businessId);
  if (!leaveHistory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Leave history not found');
  }
  res.send(leaveHistory);
});

const updateLeaveHistory = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;
  const leaveHistory = await leaveHistoryService.updateLeaveHistoryById(req.params.leaveHistoryId, req.body, businessId);
  await leaveApplicationService.updateLeaveApplicationById(req.params.leaveHistoryId, req.body, businessId);
  res.send(leaveHistory);
});

const deleteLeaveHistory = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;
  await leaveHistoryService.deleteLeaveHistoryById(req.params.leaveHistoryId, businessId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createLeaveHistory,
  getLeaveHistories,
  getLeaveHistory,
  updateLeaveHistory,
  deleteLeaveHistory,
};
