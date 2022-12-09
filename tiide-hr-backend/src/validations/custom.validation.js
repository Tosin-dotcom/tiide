const { db } = require('../models');

require('dotenv').config();

const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('password must contain at least 1 letter and 1 number');
  }
  return value;
};

const description = (value, helpers) => {
  if (value.length > 100) {
    return helpers.message(`description length must be less than 100 characters`);
  }
  return value;
};
const uniqueTitle = async (title) => {
  const input = await db.get('title', title);
  if (input) {
    throw new Error('Title must be unique');
  }
};
module.exports = {
  objectId,
  password,
  description,
  uniqueTitle,
};
