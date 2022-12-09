const { db } = require('../models');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

/**
 * It creates a level in the database.
 * @param {Object} levelBody - {
 * @returns {Promise<Object>} A promise.
 */
async function createLevel(levelBody, businessId) {
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
    levelBody.businessId = businessId;
    return db.levels.create(levelBody)
}

async function getAllLevels(businessId) {
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
  return db.levels.findAll({where: { businessId }});
}

async function getLevelById(levelId, businessId) {
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
  return db.levels.findOne({where: { businessId, id: levelId }});
}

async function updateLevelById(levelId, levelBody, businessId) {
  const level = await getLevelById(levelId, businessId);
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
  if (!level) {
    throw new Error('Level not found');
  }
  Object.assign(level, levelBody);
  await level.save();
  return level;
}
async function deleteLevelById(levelId, businessId) {
  const level = await getLevelById(levelId, businessId);
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
  if (!level) {
    throw new Error('Level not found');
  }
  await level.destroy();
  return level;
}

module.exports = {
  createLevel,
  getAllLevels,
  getLevelById,
  updateLevelById,
  deleteLevelById,
};
