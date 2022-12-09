module.exports = (sequelize, dataType) => {
  const business = sequelize.define('business', {
    name: {
      type: dataType.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please enter business name' },
      },
    },
    email: {
      type: dataType.STRING,
      allowNull: false,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        isEmail: true,
        notNull: { msg: 'Please enter your email' },
      },
    },
    address: {
      type: dataType.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please enter Address' },
      },
    },
    taxid: {
      type: dataType.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please enter Tax Identification number' },
      },
    },
    rcno: {
      type: dataType.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please enter RC number' },
      },
    },
    cacno: {
      type: dataType.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please enter CACNo' },
      },
    },
  });
  return business;
};
