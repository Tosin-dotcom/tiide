const httpStatus = require('http-status');
// const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { staffService } = require('../services');

const createStaff = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;
  const staff = await staffService.createStaff(req.body, businessId);
  res.status(httpStatus.CREATED).send(staff);
});

const getStaff = catchAsync(async (req, res) => {
  // const filter = pick(req.query, ['name', 'role']);
  // const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const { businessId } = req.user.dataValues;
  const staff = await staffService.getStaffById(req.params.id, businessId);

  if (!staff) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Staff not found');
  }
  res.send(staff);
});

const getAllStaff = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;

  const allStaff = await staffService.getAllStaffs(businessId);
  res.send(allStaff);
});

const updateStaff = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;
  const staff = await staffService.updateStaffById(businessId, req.params.id, req.body);
  res.send(staff);
});

const deleteStaff = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;
  await staffService.deleteStaffById(businessId, req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const searchStaff = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;
  const staffs = await staffService.searchStaffByName(businessId, req.query.name);
  res.send(staffs);
});

module.exports = {
  createStaff,
  getStaff,
  getAllStaff,
  updateStaff,
  deleteStaff,
  searchStaff,
};
