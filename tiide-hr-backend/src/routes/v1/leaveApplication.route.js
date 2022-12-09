const express = require('express');
const leaveApplicationController = require('../../controllers/leaveApplication.controller');
const leaveApplicationValidation = require('../../validations/leaveApplication.validation');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(
    auth(),
    validate(leaveApplicationValidation.createLeaveApplication),
    leaveApplicationController.createLeaveApplication
  )
  .get(auth(), validate(leaveApplicationValidation.getLeaveApplications), leaveApplicationController.getLeaveApplications);

router.route('/user').get(auth(), leaveApplicationController.getLeaveApplicationsOfStaff);

router
  .route('/:leaveApplicationId')
  .get(auth(), validate(leaveApplicationValidation.getLeaveApplication), leaveApplicationController.getLeaveApplicationById)
  .patch(
    auth(),
    validate(leaveApplicationValidation.updateLeaveApplication),
    leaveApplicationController.updateLeaveApplicationById
  )
  .delete(
    auth(),
    validate(leaveApplicationValidation.deleteLeaveApplication),
    leaveApplicationController.deleteLeaveApplicationById
  );

module.exports = router;
