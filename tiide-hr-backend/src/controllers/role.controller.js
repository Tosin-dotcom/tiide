const httpStatus = require('http-status');

const catchAsync = require('../utils/catchAsync');
const { roleService } = require('../services');

const createRole = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;

  const role = await roleService.createRole(req.body, businessId);
  res.status(httpStatus.CREATED).send(role);
});

const getRoles = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;
  const allRoles = await roleService.getAllRoles(businessId);
  res.status(httpStatus.OK).send(allRoles);
});

const getRole = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;
  const role = await roleService.getRoleById(req.params.id, businessId);
  res.status(httpStatus.OK).send(role);
});

const updateRole = async (req, res) => {
  const { businessId } = req.user.dataValues;
  const role = await roleService.updateRoleById(req.params.id, req.body, businessId);
  res.status(httpStatus.OK).send(role);
};

const deleteRole = async (req, res) => {
  const { businessId } = req.user.dataValues;
  await roleService.deleteRoleById(req.params.id, businessId);
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  updateRole,
  createRole,
  deleteRole,
  getRoles,
  getRole,
};
