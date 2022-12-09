const httpStatus = require('http-status');
const { db } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * It creates a leave application in the database.
 * @param {Object} leaveApplicationBody - {
 * @returns {Promise<Object>} A promise.
 */
const createLeaveApplication = async (leaveApplicationBody, businessId, userId) => {
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }

  const getPolicy = await db.leavePolicy.findOne({ where: { id: leaveApplicationBody.leavePolicyId, businessId } });
  const { duration } = getPolicy;

  /** Duration verification */
  const date1 = new Date(leaveApplicationBody.startDate);
  const date2 = new Date(leaveApplicationBody.endDate);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > duration) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Leave application exceeds allowed duration');
  }
  leaveApplicationBody.duration = diffDays;
  leaveApplicationBody.businessId = businessId;
  leaveApplicationBody.userId = userId;
  return db.leaveApplication.create(leaveApplicationBody);
};

const getLeaveApplications = async (businessId) => {
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
  const leaveApplication = await db.leaveApplication.findAll({ where: { businessId } });
  return leaveApplication;
};

const getLeaveApplicationsOfStaff = async (businessId, userId) => {
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
  const leaveApplication = await db.leaveApplication.findAll({ where: { businessId, userId } });
  return leaveApplication;
};

const getLeaveApplicationById = async (leaveApplicationId, businessId) => {
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
  return db.leaveApplication.findOne({ where: { id: leaveApplicationId, businessId } });
};

const updateLeaveApplicationById = async (leaveApplicationId, updateBody, businessId) => {
  const leaveApplication = await getLeaveApplicationById(leaveApplicationId, businessId);
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
  if (!leaveApplication) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Leave application not found');
  }

  const getPolicy = await db.leavePolicy.findOne({ where: { id: leaveApplication.leavePolicyId, businessId } });
  const { duration } = getPolicy;

  /** Duration update */
  let date1;
  let date2;
  if (updateBody.startDate === undefined) {
    date1 = leaveApplication.startDate;
  } else {
    date1 = new Date(updateBody.startDate);
  }

  if (updateBody.endDate === null) {
    date2 = await db.leaveApplication.endDate;
  } else {
    date2 = new Date(updateBody.endDate);
  }

  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > duration) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Leave application exceeds allowed duration');
  }
  leaveApplication.duration = diffDays;

  Object.assign(leaveApplication, updateBody);
  // await db.leaveApplication.update(leaveApplication, { where: { id: leaveApplicationId, businessId } });
  await leaveApplication.save();
  return leaveApplication;
};

const deleteLeaveApplicationById = async (leaveApplicationId, businessId) => {
  const leaveApplication = await getLeaveApplicationById(leaveApplicationId, businessId);
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
  if (!leaveApplication) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Leave application not found');
  }
  // await db.leaveApplication.destroy({ where: { id: leaveApplicationId, businessId } });
  await leaveApplication.destroy();
  return leaveApplication;
};

module.exports = {
  createLeaveApplication,
  getLeaveApplications,
  getLeaveApplicationById,
  updateLeaveApplicationById,
  deleteLeaveApplicationById,
  getLeaveApplicationsOfStaff,
};
