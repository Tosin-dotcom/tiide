const express = require('express');
const { rolePermissionController } = require('../../controllers/index');

const router = express.Router();

router.route('/').post(rolePermissionController.createRolePermission).get(rolePermissionController.getRolePermissions);

router.route('/:id').get(rolePermissionController.getRolePermissionById);

module.exports = router;
