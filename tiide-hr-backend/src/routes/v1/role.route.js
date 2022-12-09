const express = require('express');
const { roleController } = require('../../controllers');
// const { roleValidation } = require('../../validations/index');
// const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.route('/').post(auth('manageRole'), roleController.createRole).get(auth('manageRole'), roleController.getRoles);

router
  .route('/:id')
  .get(auth('manageRole'), roleController.getRole)
  .put(auth('manageRole'), roleController.updateRole)
  .delete(auth('manageRole'), roleController.deleteRole);

module.exports = router;
