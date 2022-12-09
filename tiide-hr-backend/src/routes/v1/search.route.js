const express = require('express');
const { staffController } = require('../../controllers');

const validate = require('../../middlewares/validate');
const { searchValidation } = require('../../validations');

const auth = require('../../middlewares/auth');

const router = express.Router();

router.route('/').get(auth(), validate(searchValidation.searchStaff), staffController.searchStaff);

module.exports = router;
