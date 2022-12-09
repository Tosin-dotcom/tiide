const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { leavePolicyService } = require('../services');

const createLeavePolicy = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;
  const leavePolicy = await leavePolicyService.createLeavePolicy(req.body, businessId);
  res.status(httpStatus.CREATED).send(leavePolicy);
});

const getLeavePolicies = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;
  const result = await leavePolicyService.getLeavePolicies(businessId);
  res.send(result);
});

const getLeavePolicy = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;
  const leavePolicy = await leavePolicyService.getLeavePolicyById(req.params.leavePolicyId, businessId);
  if (!leavePolicy) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Leave policy not found');
  }
  res.send(leavePolicy);
});

const updateLeavePolicy = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;
  const leavePolicy = await leavePolicyService.updateLeavePolicyById(req.params.leavePolicyId, req.body, businessId);
  res.status(httpStatus.ACCEPTED).send(leavePolicy);
});

const deleteLeavePolicy = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;
  await leavePolicyService.deleteLeavePolicyById(req.params.leavePolicyId, businessId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createLeavePolicy,
  getLeavePolicies,
  getLeavePolicy,
  updateLeavePolicy,
  deleteLeavePolicy,
};
