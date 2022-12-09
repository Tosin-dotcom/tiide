const httpStatus = require('http-status');
const { db } = require('../models');
// const { rolePermissionService } = require('./');

const ApiError = require('../utils/ApiError');

const getRolePermissionByName = async (roleName) => {
  return db.permissions.findOne({
    where: { value: roleName },
    include: { all: true },
  });
};

const addPermissionToRole = async (Rolepermission, role, businessId) => {
  const permission = Object.keys(Rolepermission).filter((per) => {
    return Rolepermission[per] == true;
  });
  permission.forEach(async (name) => {
    role.addPermission(await getRolePermissionByName(name), { through: { businessId: businessId } });
  });
};

const idOfLeavePermission = async () => {
  const leave = await db.permissions.findOne({ where: { value: 'manageLeave' } });
  return leave.dataValues.id;
};

const getIdOfPeopleWithLeavePermission = async (businessId) => {
  const leaveId = await idOfLeavePermission();
  const allRoles = await db.role_permission.findAll(
    { where: { businessId: businessId, permissionId: leaveId } },
    { include: { all: true } }
  );
  //console.log(allRoles);
  return allRoles;
};
const userWithLeavePermission = async (businessId) => {
  const roles = await getIdOfPeopleWithLeavePermission(businessId);
  const users = [];
  roles.forEach(async (role) => {
    const user = await db.users.findOne({ where: { roleId: role.dataValues.roleId } });
    users.push(user.dataValues.id);
  });

  return users;
};

/**
 * It creates a role and adds permissions to it
 * @param requestBody - The request body from the client
 * @param businessId - The id of the business that the role belongs to.
 * @returns The role is being returned.
 */

const createRole = async (requestBody, businessId) => {
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
  const roleBody = requestBody;
  roleBody.businessId = businessId;
  const { permissions } = roleBody;
  //const newPermissions = permissions.filter((per) => )
  const role = await db.role.create(roleBody);
  await addPermissionToRole(permissions, role, businessId);
  return role;
};

const addPermissionToAdminRole = async (permissions, role, businessId) => {
  const all = permissions;
  all.forEach((per) => {
    role.addPermission(per, { through: { businessId: businessId } });
  });
};
/**
 * It creates a role with the title 'Admin' and description 'Admin for business' and adds all
 * permissions to it for each business
 * @param businessId - The id of the business that the admin role is being created for.
 * @returns The role is being returned.
 */

const createAdminRole = async (businessId) => {
  const roleBody = {
    title: 'Admin',
    description: 'Admin for business',
    businessId,
    permissions: {},
  };
  // const allPermissions = await rolePermissionService.getAllRolePermissions();
  const allPermissions = await db.permissions.findAll();
  const role = await db.role.create(roleBody);
  await addPermissionToAdminRole(allPermissions, role, businessId);
  return role;
};

/**
 * It returns all roles for a given business
 * @param businessId - The id of the business that you want to get the roles for.
 * @returns An array of all roles for a business
 */

const getAllRoles = async (businessId) => {
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
  const all = await userWithLeavePermission(businessId);
  const allRoles = await getIdOfPeopleWithLeavePermission(businessId);
  console.log(all);
  const allRole = db.role.findAll({ where: { businessId } }, { include: db.permissions });

  return allRole;
};

/**
 * It returns a role object with the given roleId, and includes the permissions associated with that
 * role
 * @param roleId - The id of the role you want to get.
 * @returns A promise that resolves to an object with the following properties:
 *   - id
 *   - name
 *   - permissions
 */
const getRoleById = async (roleId, businessId) => {
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
  const role = db.role.findOne({
    where: { id: roleId, businessId },
    include: db.permissions,
  });
  if (!(await role)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No such role found');
  }
  return role;
};

/**
 * It updates a role by id
 * @param roleId - The id of the role you want to update.
 * @param roleBody - The body of the request that contains the role information.
 * @param businessId - The id of the business that the role belongs to.
 * @returns The role is being returned.
 */

const updateRoleById = async (roleId, roleBody, businessId) => {
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
  const roleTable = await getRoleById(roleId);
  const role = await db.role.update(roleBody, {
    where: { id: roleId, businessId },
  });

  db.role_permission.destroy({
    where: { roleId },
  });
  const { permissions } = roleBody;
  await addPermissionToRole(permissions, roleTable);
  return role;
};

/**
 * Delete a role by id, if it exists.
 * @param roleId - The id of the role you want to delete
 * @param businessId - The id of the business that the role belongs to.
 */

const deleteRoleById = async (roleId, businessId) => {
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
  db.role.destroy({
    where: { id: roleId, businessId },
  });
};

/**
 * It takes a roleId as an argument, finds the role in the database, and returns an array of the
 * permissions associated with that role
 * @param roleId - The id of the role you want to get the permissions for.
 * @returns An array of permissions
 */

const getPermissions = async (roleId) => {
  const role = await db.role.findOne({
    where: { id: roleId },
    include: db.permissions,
  });
  const permission = role.permissions;

  const arrayPermissions = [];
  permission.forEach((per) => {
    arrayPermissions.push(per.dataValues.value);
  });
  return arrayPermissions;
};

module.exports = {
  deleteRoleById,
  updateRoleById,
  getPermissions,
  createRole,
  getAllRoles,
  getRoleById,
  createAdminRole,
};
