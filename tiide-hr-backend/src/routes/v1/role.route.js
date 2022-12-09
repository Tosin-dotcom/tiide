const express = require('express');
const { roleController } = require('../../controllers');
// const { roleValidation } = require('../../validations/index');
// const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.route('/').post(auth(), roleController.createRole).get(auth(), roleController.getRoles);

router
  .route('/:id')
  .get(auth(), roleController.getRole)
  .put(auth(), roleController.updateRole)
  .delete(auth(), roleController.deleteRole);

module.exports = router;
