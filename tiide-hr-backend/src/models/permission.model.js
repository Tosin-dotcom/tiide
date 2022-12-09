module.exports = (sequelize, dataType) => {
  const rolePermission = sequelize.define('rolepermission', {
    permissionId: {
      type: dataType.INTEGER,
    },
    roleId: {
      type: dataType.INTEGER,
    },
    businessId: {
      type: dataType.INTEGER,
    },
  });
  return rolePermission;
};
