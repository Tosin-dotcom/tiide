const httpStatus = require('http-status');
const { db } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * It creates a leave policy in the database.
 * @param {Object} leavePolicyBody - {
 * @returns {Promise<Object>} A promise.
 */
const createLeavePolicy = async (leavePolicyBody, businessId) => {
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
  const requestBody = leavePolicyBody;
  requestBody.businessId = businessId;
  return db.leavePolicy.create(leavePolicyBody);
};

const getLeavePolicies = async (businessId) => {
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
  const leavePolicy = await db.leavePolicy.findAll({ where: { businessId } });
  return leavePolicy;
};

const getLeavePolicyById = async (leavePolicyId, businessId) => {
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
  return db.leavePolicy.findOne({ where: { id: leavePolicyId } });
};

const updateLeavePolicyById = async (leavePolicyId, updateBody, businessId) => {
  const leavePolicy = await getLeavePolicyById(leavePolicyId, businessId);
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
  if (!leavePolicy) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Leave policy not found');
  }
  Object.assign(leavePolicy, updateBody);
  // await db.leavePolicy.update(leavePolicy, { where: { id: leavePolicyId } });
  await leavePolicy.save();
  return leavePolicy;
};

const deleteLeavePolicyById = async (leavePolicyId, businessId) => {
  const leavePolicy = await getLeavePolicyById(leavePolicyId, businessId);
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
  if (!leavePolicy) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Leave policy not found');
  }
  // await db.leavePolicy.destroy({ where: { id: leavePolicyId } });
  await leavePolicy.destroy();
  return leavePolicy;
};

module.exports = {
  createLeavePolicy,
  getLeavePolicies,
  getLeavePolicyById,
  updateLeavePolicyById,
  deleteLeavePolicyById,
};
