const Joi = require('joi');

const createStaff = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().email(),
    startDate: Joi.date().required(),
    roleId: Joi.number().required(),
    levelId: Joi.number().required(),
    dob: Joi.date().required(),
  }),
};

const updateStaff = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    startDate: Joi.date().required(),
    roleId: Joi.number().required(),
    levelId: Joi.number().required(),
    dob: Joi.date().required(),
  }),
};

module.exports = {
  createStaff,
  updateStaff,
};
