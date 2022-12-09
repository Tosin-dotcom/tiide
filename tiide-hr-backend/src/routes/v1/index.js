const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');

const levelRoute = require('./level.route');
const staffRoute = require('./staff.route');
const docsRoute = require('./docs.route');
const businessRoute = require('./business.route');
const leavePolicyRoute = require('./leavePolicy.route');
const leaveApplicationRoute = require('./leaveApplication.route');
const leaveHistoryRoute = require('./leaveHistory.route');
const roleRoute = require('./role.route');
const rolePermissionsRoute = require('./role.permission.route');
const config = require('../../config/config');
const notificationRoute = require('./notification.route');
const searchRoute = require('./search.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/roles',
    route: roleRoute,
  },
  {
    path: '/levels',
    route: levelRoute,
  },
  {
    path: '/staffs',
    route: staffRoute,
  },
  {
    path: '/business',
    route: businessRoute,
  },
  {
    path: '/permissions',
    route: rolePermissionsRoute,
  },
  {
    path: '/leavePolicy',
    route: leavePolicyRoute,
  },
  {
    path: '/leaveApplication',
    route: leaveApplicationRoute,
  },
  {
    path: '/leaveHistory',
    route: leaveHistoryRoute,
  },
  {
    path: '/notifications',
    route: notificationRoute,
  },
  {
    path: '/search',
    route: searchRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
