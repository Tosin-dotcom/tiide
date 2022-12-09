const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { leaveApplicationService, leaveHistoryService } = require('../services');

const createLeaveApplication = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;
  const { id } = req.user.dataValues;
  const leaveApplication = await leaveApplicationService.createLeaveApplication(req.body, businessId, id);
  await leaveHistoryService.createLeaveHistory(req.body, businessId, id);
  res.status(httpStatus.CREATED).send(leaveApplication);
});

const getLeaveApplications = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;
  const result = await leaveApplicationService.getLeaveApplications(businessId);
  res.send(result);
});

const getLeaveApplicationsOfStaff = catchAsync(async (req, res) => {
  const { businessId, id } = req.user.dataValues;
  const result = await leaveApplicationService.getLeaveApplicationsOfStaff(businessId, id);
  res.send(result);
});

const getLeaveApplicationById = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;
  const leaveApplication = await leaveApplicationService.getLeaveApplicationById(req.params.leaveApplicationId, businessId);
  if (!leaveApplication) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Leave application not found');
  }
  res.send(leaveApplication);
});

const updateLeaveApplicationById = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;
  const leaveApplication = await leaveApplicationService.updateLeaveApplicationById(
    req.params.leaveApplicationId,
    req.body,
    businessId
  );
  await leaveHistoryService.updateLeaveHistoryById(req.params.leaveApplicationId, req.body, businessId);
  res.send(leaveApplication);
});

const deleteLeaveApplicationById = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;
  await leaveApplicationService.deleteLeaveApplicationById(req.params.leaveApplicationId, businessId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createLeaveApplication,
  getLeaveApplications,
  getLeaveApplicationById,
  updateLeaveApplicationById,
  deleteLeaveApplicationById,
  getLeaveApplicationsOfStaff,
};
