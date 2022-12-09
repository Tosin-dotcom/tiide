const express = require('express');
const leaveHistoryController = require('../../controllers/leaveHistory.controller');
const leaveHistoryValidation = require('../../validations/leaveHistory.validation');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');


const router = express.Router();

router
  .route('/')
  .post(auth(), validate(leaveHistoryValidation.createLeaveHistory), leaveHistoryController.createLeaveHistory)
  .get(auth(), validate(leaveHistoryValidation.getLeaveHistories), leaveHistoryController.getLeaveHistories);

router
  .route('/:leaveHistoryId')
  .get(auth(), validate(leaveHistoryValidation.getLeaveHistory), leaveHistoryController.getLeaveHistory)
  .patch(auth(), validate(leaveHistoryValidation.updateLeaveHistory), leaveHistoryController.updateLeaveHistory)
  .delete(auth(), validate(leaveHistoryValidation.deleteLeaveHistory), leaveHistoryController.deleteLeaveHistory);

module.exports = router;
