const httpStatus = require('http-status');

const catchAsync = require('../utils/catchAsync');
const { rolePermissionService } = require('../services');

const createRolePermission = catchAsync(async (req, res) => {
  const permission = await rolePermissionService.createRolePermission(req.body);
  res.status(httpStatus.CREATED).send(permission);
});

const getRolePermissions = catchAsync(async (req, res) => {
  const allRolePermissions = await rolePermissionService.getAllRolePermissions();
  res.status(httpStatus.OK).send(allRolePermissions);
});

const getRolePermissionById = catchAsync(async (req, res) => {
  const rolePermission = await rolePermissionService.getRolePermissionById(req.params.id);
  res.status(httpStatus.OK).send(rolePermission);
});

module.exports = {
  createRolePermission,
  getRolePermissions,
  getRolePermissionById,
};
