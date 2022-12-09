const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { db } = require('../models');
const { userService, roleService, levelService } = require('.');

/**
 * creates a staff using model
 * @param {Object} staffBody
 * @returns {Promise<Object>}
 */

const defaultPassword = 'Tiide@123';

const createStaff = async (requestBody, businessId) => {
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }

  const level = await levelService.getLevelById(requestBody.levelId, businessId);
  const role = await db.role.findOne({ where: { id: requestBody.roleId, businessId } });
  // const role = await roleService.getRoleById(requestBody.roleId, businessId);
  if (!level) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No such level found');
  }

  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No such role found');
  }

  const userBody = {
    firstName: requestBody.firstName,
    lastName: requestBody.lastName,
    email: requestBody.email,
    password: defaultPassword,
    businessId: businessId,
    roleId: requestBody.roleId,
  };
  const user = await userService.createUser(userBody);
  const staffBody = {
    startDate: requestBody.startDate,
    userId: user.id,
    dob: requestBody.dob,
    businessId: requestBody.businessId,
    levelId: requestBody.levelId,
  };
  const staff = await db.staffs.create(staffBody);
  return staff;
};

const getAllStaffs = async (businessId) => {
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }

  const staffs = await db.users.findAll({ where: { businessId }, include: db.staffs });
  return staffs;
};

const getStaffById = async (staffId, businessId) => {
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
  const staffIdNum = parseInt(staffId);
  const allStaff = await db.users.findAll({ where: { businessId }, include: db.staffs });
  const staff = allStaff.find((ele) => {
    return ele.dataValues.staff.id === staffIdNum;
  });
  if (!staff) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No staff found');
  }
  return staff;
};

const getUserIdOfStaff = async (staffId, buisnessId) => {
  const staff = await getStaffById(staffId, buisnessId);

  return staff.dataValues.id;
};

const updateStaffById = async (businessId, staffId, requestBody) => {
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
  const userBody = {
    firstName: requestBody.firstName,
    lastName: requestBody.lastName,
    roleId: requestBody.roleId,
  };
  const staffBody = {
    startDate: requestBody.startDate,
    levelId: requestBody.levelId,
    dob: requestBody.dob,
  };
  const userId = await getUserIdOfStaff(staffId, businessId);
  db.users.update(userBody, { where: { id: userId, businessId } });
  const staff = db.staffs.update(staffBody, { where: { id: staffId } });
  return staff;
};

const deleteStaffById = async (businessId, staffId) => {
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
  const staff = await getStaffById(staffId, businessId);
  const staffUser = await db.staffs.findByPk(staff.dataValues.staff.id);
  staffUser.destroy();
  staff.destroy();
};

/**
 * It returns a list of staffs whose first name contains the given name
 * @param businessId - The id of the business you want to search for staffs
 * @param name - The name of the staff you want to search for.
 * @returns An array of staffs
 */
const searchStaffByName = async (businessId, name) => {
  if (!businessId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No business found');
  }
  name = name.toLowerCase();
  const allStaff = await getAllStaffs(businessId);
  const staffs = allStaff.filter(
    (staff) => staff.firstName.toLowerCase().includes(name) || staff.lastName.toLowerCase().includes(name)
  );
  return staffs;
};

module.exports = {
  createStaff,
  getAllStaffs,
  getStaffById,
  deleteStaffById,
  updateStaffById,
  searchStaffByName,
};
