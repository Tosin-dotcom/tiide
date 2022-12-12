const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const ApiError = require('../utils/ApiError');
const { db } = require('../models');
const logger = require('../config/logger');

/**
 * Check if a business email is already taken.
 * @param email - The email address to check
 * @returns A boolean value.
 */

const isBusinessEmailTaken = async function (email) {
  const emails = await db.business.findOne({ where: { email } });
  return !!emails;
};

/**
 * This function creates a business in the database and returns the created business.
 * @param businessBody - {
 * @returns The business object that was created.
 */
const createBusiness = async (businessBody) => {
  if (await isBusinessEmailTaken(businessBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return db.business.create(businessBody);
};

const getBusinessById = async (businessId) => {
  return db.business.findOne({
    where: { id: businessId },
    include: { all: true, nested: true },
  });
};

const getAllBusiness = async () => {
  const allBusiness = db.business.findAll({ include: { all: true, nested: true } });
  return allBusiness;
};

const getBusinessProfile = async (businessId) => {
  console.log(businessId);
  const business = db.business.findByOne({ where: { businessId: businessId } });
  return business;
};
module.exports = {
  createBusiness,
  getAllBusiness,
  getBusinessById,
  getBusinessProfile,
};
