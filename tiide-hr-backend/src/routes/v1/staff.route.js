const express = require('express');
const { staffController } = require('../../controllers');

const validate = require('../../middlewares/validate');
const { staffValidation } = require('../../validations');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(staffValidation.createStaff), staffController.createStaff)
  .get(auth(), staffController.getAllStaff);
router
  .route('/:id')
  .get(auth(), staffController.getStaff)
  .put(auth(), validate(staffValidation.updateStaff), staffController.updateStaff)
  .delete(auth(), staffController.deleteStaff);

module.exports = router;
