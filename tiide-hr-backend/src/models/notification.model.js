module.exports = (sequelize, dataType) => {
  const Notification = sequelize.define('notification', {
    title: {
      type: dataType.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please enter notification title' },
      },
    },
    content: {
      type: dataType.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please enter notification content' },
      },
    },
    isRead: {
      type: dataType.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please enter notification status' },
      },
    },
  });
  return Notification;
};
