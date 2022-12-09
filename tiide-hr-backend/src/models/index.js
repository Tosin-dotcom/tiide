const Sequelize = require('sequelize');
const { sequelize } = require('../config/config');
const logger = require('../config/logger');

const sequelizeInstance = new Sequelize(sequelize.url);
const db = {};

/*
const sequelizeInstance = new Sequelize(sequelize.database, sequelize.user, sequelize.password, {
  host: sequelize.host,
  dialect: sequelize.dialect,
  pool: {
    min: 0,
    max: 100,
    acquire: 5000,
    Idle: 1000
  },
});
*/
sequelizeInstance
  .authenticate()
  .then(() => logger.info('DB connected'))
  .catch((err) => {
    logger.error(err);
  });

db.sequelize = sequelizeInstance;
db.Sequelize = Sequelize;

db.users = require('./user.model')(sequelizeInstance, Sequelize);
db.tokens = require('./token.model')(sequelizeInstance, Sequelize);
db.staffs = require('./staff.model')(sequelizeInstance, Sequelize);
db.leavePolicy = require('./leavePolicy.model')(sequelizeInstance, Sequelize);
db.leaveApplication = require('./leaveApplication.model')(sequelizeInstance, Sequelize);
db.leaveHistory = require('./leaveHistory.model')(sequelizeInstance, Sequelize);
db.levels = require('./level.model')(sequelizeInstance, Sequelize);
db.notifications = require('./notification.model')(sequelizeInstance, Sequelize);
db.business = require('./business.model')(sequelizeInstance, Sequelize);
db.permissions = require('./role.permission.model')(sequelizeInstance, Sequelize);
db.role = require('./role.model')(sequelizeInstance, Sequelize);
db.role_permission = require('./permission.model')(sequelizeInstance, Sequelize);

// relationships for models

//= ==============================
// Define all relationships here below
//= ==============================
// db.User.hasMany(db.Role);
// db.Role.belongsTo(db.User);

// hasOne
db.users.hasOne(db.staffs);
db.staffs.belongsTo(db.users);

// leave application
db.users.hasMany(db.leaveApplication);
db.leaveApplication.belongsTo(db.users);

db.business.hasMany(db.leaveApplication);
db.leaveApplication.belongsTo(db.business);

db.leavePolicy.hasMany(db.leaveApplication);
db.leaveApplication.belongsTo(db.leavePolicy);

// leave history
db.users.hasMany(db.leaveHistory);
db.leaveHistory.belongsTo(db.users);

db.business.hasMany(db.leaveHistory);
db.leaveHistory.belongsTo(db.business);

db.leavePolicy.hasMany(db.leaveHistory);
db.leaveHistory.belongsTo(db.leavePolicy);

// leave policy
db.business.hasMany(db.leavePolicy);
db.leavePolicy.belongsTo(db.business);

// business are mapped one to many with staff
db.business.hasMany(db.users);
db.users.belongsTo(db.business);

db.business.hasMany(db.role);
db.role.belongsTo(db.business);

// hasMany
db.permissions.belongsToMany(db.role, { through: db.role_permission });
db.role.belongsToMany(db.permissions, { through: db.role_permission });

db.role.hasMany(db.users);
db.users.belongsTo(db.role);

db.levels.hasMany(db.staffs);
db.staffs.belongsTo(db.levels);

// business are mapped one to many with level
db.business.hasMany(db.levels);
db.levels.belongsTo(db.business);

// business are mapped one to many with notification
db.business.hasMany(db.notifications);
db.notifications.belongsTo(db.business);

db.users.hasMany(db.notifications);
db.notifications.belongsTo(db.users);

// staff
// db.role.hasMany(db.staffs);
// db.staffs.belongsTo(db.role);

// db.levels.hasMany(db.staffs);
// db.staffs.belongsTo(db.levels);

// business are mapped one to one with users
// db.users.hasOne(db.business, { foreignKey: 'owner' });
// db.business.belongsTo(db.users, { foreignKey: 'owner' });

// busines are mapped one to many with staff
// db.business.hasMany(db.staff);
// db.staff.belongsTo(db.business);

module.exports = {
  db,
};
