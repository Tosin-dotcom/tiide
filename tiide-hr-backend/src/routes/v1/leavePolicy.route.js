const express = require('express');
const leavePolicyController = require('../../controllers/leavePolicy.controller');
const leavePolicyValidation = require('../../validations/leavePolicy.validation');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(leavePolicyValidation.createLeavePolicy), leavePolicyController.createLeavePolicy)
  .get(auth(), validate(leavePolicyValidation.getLeavePolicies), leavePolicyController.getLeavePolicies);

router
  .route('/:leavePolicyId')
  .get(auth(), validate(leavePolicyValidation.getLeavePolicy), leavePolicyController.getLeavePolicy)
  .patch(auth(), validate(leavePolicyValidation.updateLeavePolicy), leavePolicyController.updateLeavePolicy)
  .delete(auth(), validate(leavePolicyValidation.deleteLeavePolicy), leavePolicyController.deleteLeavePolicy);

module.exports = router;
