module.exports = (sequelize, dataType) => {
  const Role = sequelize.define('role', {
    title: {
      type: dataType.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please enter role title' },
      },
    },
    description: {
      type: dataType.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please enter a description' },
      },
    },
  });
  return Role;
};
