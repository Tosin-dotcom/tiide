const { db } = require('../models');

const createRolePermission = async (roleBody) => {
  return db.permissions.create(roleBody);
};

const getAllRolePermissions = async () => {
  const allRolePermissions = await db.permissions.findAll({ include: db.role });
  return allRolePermissions;
};

const getRolePermissionById = async (roleId) => {
  return db.permissions.findOne({
    where: { id: roleId },
  });
};

module.exports = {
  createRolePermission,
  getAllRolePermissions,
  getRolePermissionById,
};
