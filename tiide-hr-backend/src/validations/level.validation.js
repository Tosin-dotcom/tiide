const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createLevel = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    salary: Joi.string().required(),
    isActive: Joi.boolean().required(),
  }),
};

const getLevels = {
  query: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getLevel = {
  params: Joi.object().keys({
    levelId: Joi.string().custom(objectId),
  }),
};

const updateLevel = {
  params: Joi.object().keys({
    levelId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      description: Joi.string(),
      salary: Joi.string(),
      isActive: Joi.boolean(),
    })
    .min(1),
};

const deleteLevel = {
  params: Joi.object().keys({
    levelId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createLevel,
  getLevels,
  getLevel,
  updateLevel,
  deleteLevel,
};
