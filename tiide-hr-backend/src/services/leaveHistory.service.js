/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const { db } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * It creates a leave history in the database.
 * @param {Object} leaveHistoryBody - {
 * @returns {Promise<Object>} A promise.
 */
const createLeaveHistory = async (leaveHistoryBody, businessId) => {
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
  leaveHistoryBody.businessId = businessId;
  return db.leaveHistory.create(leaveHistoryBody);
};

const getLeaveHistories = async (businessId) => {
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
  const leaveHistory = await db.leaveHistory.findAll({ where: { businessId } });
  return leaveHistory;
};

const getLeaveHistoryById = async (id, businessId) => {
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
  return db.leaveHistory.findOne({ where: { businessId, id } });
};

const updateLeaveHistoryById = async (id, updateBody, businessId) => {
  const leaveHistory = await getLeaveHistoryById(id, businessId);
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
  if (!leaveHistory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Leave history not found');
  }
  
  const getPolicy = await db.leavePolicy.findOne({ where: { id: leaveHistory.leavePolicyId, businessId } });
  const { duration } = getPolicy;

  /** Duration update */
  let date1;
  let date2;
  if (updateBody.startDate === undefined) {
    date1 = leaveHistory.startDate;
  } else {
    date1 = new Date(updateBody.startDate);
  }

  if (updateBody.endDate === null) {
    date2 = await db.leaveHistory.endDate;
  } else {
    date2 = new Date(updateBody.endDate);
  }

  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > duration) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Leave application exceeds allowed duration');
  }
  leaveHistory.duration = diffDays;
  
  Object.assign(leaveHistory, updateBody);
  // await db.leaveHistory.update(leaveHistory, { where: { id } });
  await leaveHistory.save();
  return leaveHistory;
};

const deleteLeaveHistoryById = async (id, businessId) => {
  const leaveHistory = await getLeaveHistoryById(id, businessId);
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
  if (!leaveHistory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Leave history not found');
  }
  // await db.leaveHistory.destroy({ where: { id } });
  await leaveHistory.destroy();
  return leaveHistory;
};

module.exports = {
  createLeaveHistory,
  getLeaveHistories,
  getLeaveHistoryById,
  updateLeaveHistoryById,
  deleteLeaveHistoryById,
};
