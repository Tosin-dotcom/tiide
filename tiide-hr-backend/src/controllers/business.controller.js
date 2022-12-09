const httpStatus = require('http-status');
// const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const catchAsync = require('../utils/catchAsync');
const { businessService, roleService } = require('../services');
const { db } = require('../models');

const createBusiness = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;
  if (businessId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'this user is already registered to a business');
  }
  const business = await businessService.createBusiness(req.body);
  const adminRole = await roleService.createAdminRole(business.id);
  const userId = req.user.dataValues.id;

  db.users.update(
    {
      businessId: business.id,
      roleId: adminRole.id,
    },
    { where: { id: userId } }
  );
  const todayDate = new Date();
  db.staffs.create({ startDate: todayDate, userId });
  res.status(httpStatus.CREATED).send(business);
});

const getBusiness = catchAsync(async (req, res) => {
  const business = await businessService.getBusinessById(req.params.id);
  if (!business) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Business not found');
  }
  res.send(business);
});

const getAllBusiness = catchAsync(async (req, res) => {
  const allBusiness = await businessService.getAllBusiness();
  res.send(allBusiness);
});

const getBusinessProfile = catchAsync(async (req, res) => {
  const { businessId } = req.user.dataValues;
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }

  const business = await businessService.getBusinessProfile(businessId);
  res.send(business);
});

module.exports = {
  createBusiness,
  getBusiness,
  getAllBusiness,
  getBusinessProfile,
};
