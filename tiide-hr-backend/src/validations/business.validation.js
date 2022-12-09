const Joi = require('joi');

const createBusiness = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    CACno: Joi.number().required(),
    owner: Joi.number().required(),
  }),
};

module.exports = {
  createBusiness,
};
