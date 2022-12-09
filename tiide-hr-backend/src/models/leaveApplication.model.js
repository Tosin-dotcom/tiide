module.exports = (sequelize, dataType) => {
  const leaveApplication = sequelize.define('leaveApplication', {
    title: {
      type: dataType.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please select type of leave' },
      },
    },
    startDate: {
      type: dataType.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        notNull: { msg: 'Start date cannot be null' },
      },
    },
    endDate: {
      type: dataType.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        notNull: { msg: 'End date cannot be null' },
      },
    },
    duration: {
      type: dataType.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please get leave application duration' },
      },
    },
    description: {
      type: dataType.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please enter leave application description' },
      },
    },
    status: {
      type: dataType.INTEGER,
      defaultValue: 0,
      allowNull: false,
      validate: {
        notNull: { msg: 'Status cannot be null' },
      },
    },
  });
  return leaveApplication;
};
