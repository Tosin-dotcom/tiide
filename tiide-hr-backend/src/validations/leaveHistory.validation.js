const Joi = require('joi');

const createLeaveHistory = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    duration: Joi.number().required(),
    description: Joi.string().max(400).required(),
    leavePolicyId: Joi.number().required(),
  }),
};

const getLeaveHistories = {
  query: Joi.object().keys({
    title: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getLeaveHistory = {
  params: Joi.object().keys({
    leaveHistoryId: Joi.number().id(),
  }),
};

const updateLeaveHistory = {
  params: Joi.object().keys({
    leaveHistoryId: Joi.required().id(),
  }),
};

const deleteLeaveHistory = {
  params: Joi.object().keys({
    leaveHistoryId: Joi.required().id(),
  }),
};

module.exports = {
  createLeaveHistory,
  getLeaveHistories,
  getLeaveHistory,
  updateLeaveHistory,
  deleteLeaveHistory,
};
