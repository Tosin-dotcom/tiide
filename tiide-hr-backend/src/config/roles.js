const { db } = require('../models');
// const allRoles = {
//   user: [],
//   admin: [
//     {
//       permissionName: 'Get User',
//       description: 'Get all users',
//       groupName: 'user',
//       value: 'getUser',
//     },
//     {
//       permissionName: 'Create User',
//       description: 'Create a user',
//       groupName: 'user',
//       value: 'createUser',
//     },
//     {
//       permissionName: 'Update User',
//       description: 'Update a user',
//       groupName: 'user',
//       value: 'updateUser',
//     },
//     {
//       permissionName: 'DeleteUser',
//       description: 'Delete a user',
//       groupName: 'user',
//       value: 'deleteUser',
//     },
//     {
//       permissionName: 'Get Leave',
//       description: 'Get all leaves',
//       groupName: 'leave',
//       value: 'getLeave',
//     },
//   ],
// };

const getPermission = async (roleId) => {
  const role = db.role.findOne({
    where: { id: roleId },
    include: db.permissions,
  });
  // const role = await roleService.getRoleById(roleId);
  const permission = role.permissions;
  const arrayPermissions = [];
  permission.forEach((per) => {
    arrayPermissions.push(per.dataValues.value);
  });
  return arrayPermissions;
};

// const roles = Object.keys(allRoles);
// const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  // roles,
  // roleRights,
  getPermission,
};
