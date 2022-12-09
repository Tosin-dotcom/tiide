module.exports = (sequelize, dataType) => {
  const Staff = sequelize.define('staff', {
    startDate: {
      type: dataType.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        notNull: { msg: 'Start Date cannot be blank' },
      },
    },
    endDate: {
      type: dataType.DATE,
      allowNull: true,
      validate: { isDate: true },
    },
    dob: {
      type: dataType.DATE,
      allowNull: false,
      defaultValue: dataType.NOW,
      validate: {
        isDate: true,
        notNull: { msg: 'Date of Birth Date cannot be blank' },
      },
    },
  });

  return Staff;
};
