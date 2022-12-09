module.exports = (sequelize, dataType) => {
  const Permission = sequelize.define('permission', {
    name: {
      type: dataType.STRING,
      unique: true,
    },
    description: {
      type: dataType.STRING,
    },
    groupName: {
      type: dataType.STRING,
    },
    value: {
      type: dataType.STRING,
    },
  });
  return Permission;
};
