const express = require('express');
const { businessController } = require('../../controllers');
// const businessValidation = require('../../validations/business.validation');
// const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.route('/').post(auth(), businessController.createBusiness).get(auth(), businessController.getAllBusiness);

router.route('/:id').get(auth(), businessController.getBusiness);

router.route('/profile').get(auth(), businessController.getBusinessProfile);

module.exports = router;
