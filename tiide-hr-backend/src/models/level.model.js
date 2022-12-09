module.exports = (sequelize, dataType) => {
  const Level = sequelize.define('level', {
    title: {
      type: dataType.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please enter level title' },
      },
    },
    description: {
      type: dataType.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please enter level description' },
      },
    },
    salary: {
      type: dataType.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please enter level salary' },
      },
    },
    isActive: {
      type: dataType.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please enter level status' },
      },
    },
  });
  return Level;
};
