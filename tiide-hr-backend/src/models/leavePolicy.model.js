module.exports = (sequelize, dataType) => {
  const leavePolicy = sequelize.define('leavePolicy', {
    title: {
      type: dataType.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please enter leave policy title' },
      },
    },
    duration: {
      type: dataType.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please enter leave policy duration' },
      },
    },
    description: {
      type: dataType.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please enter leave policy description' },
      },
    },
  });
  return leavePolicy;
};
