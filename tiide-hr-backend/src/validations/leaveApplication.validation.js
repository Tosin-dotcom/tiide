const Joi = require('joi');

const createLeaveApplication = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    description: Joi.string().max(400).required(),
    leavePolicyId: Joi.number().required(),
  }),
};

const getLeaveApplications = {
  query: Joi.object().keys({
    title: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getLeaveApplication = {
  params: Joi.object().keys({
    leaveApplicationId: Joi.number().id(),
  }),
};

const updateLeaveApplication = {
  params: Joi.object().keys({
    leaveApplicationId: Joi.required().id(),
  }),
  body: Joi.object().keys({
    title: Joi.string(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    status: Joi.number(),
    description: Joi.string().max(400),
    leavePolicyId: Joi.number(),
  }),
};

const deleteLeaveApplication = {
  params: Joi.object().keys({
    leaveApplicationId: Joi.required().id(),
  }),
};

module.exports = {
  createLeaveApplication,
  getLeaveApplications,
  getLeaveApplication,
  updateLeaveApplication,
  deleteLeaveApplication,
};
