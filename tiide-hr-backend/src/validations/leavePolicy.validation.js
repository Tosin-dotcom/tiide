const Joi = require('joi');
// const { uniqueTitle } = require('./custom.validation');

const createLeavePolicy = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    duration: Joi.number().required(),
    description: Joi.string().max(400),
  }),
};

const getLeavePolicies = {
  query: Joi.object().keys({
    title: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getLeavePolicy = {
  params: Joi.object().keys({
    leavePolicyId: Joi.number().id(),
  }),
};

const updateLeavePolicy = {
  params: Joi.object().keys({
    leavePolicyId: Joi.required().id(),
    title: Joi.number(),
    duration: Joi.number(),
    description: Joi.string(),
  }),
};

const deleteLeavePolicy = {
  params: Joi.object().keys({
    leavePolicyId: Joi.required().id(),
  }),
};

module.exports = {
  createLeavePolicy,
  getLeavePolicies,
  getLeavePolicy,
  updateLeavePolicy,
  deleteLeavePolicy,
};
