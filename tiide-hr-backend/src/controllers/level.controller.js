const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { levelService } = require('../services');

const createLevel = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;
    const level = await levelService.createLevel(req.body, businessId);
    res.status(httpStatus.CREATED).send(level);
  });

const getLevels = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;
  const result = await levelService.getAllLevels(businessId);
  res.send(result);
});

const getLevel = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;
  const level = await levelService.getLevelById(req.params.levelId, businessId);
  if (!level) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Level not found');
  }
  res.send(level);
});

const updateLevel = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;
  const level = await levelService.updateLevelById(req.params.levelId, req.body, businessId);
  res.send(level);
});

const deleteLevel = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;
  await levelService.deleteLevelById(req.params.levelId, businessId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createLevel,
  getLevels,
  getLevel,
  updateLevel,
  deleteLevel,
};
