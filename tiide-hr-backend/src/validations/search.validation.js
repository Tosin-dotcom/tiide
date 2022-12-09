const Joi = require('joi');

const searchStaff = {
  query: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

module.exports = { searchStaff };
