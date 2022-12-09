const { db } = require('../models');

/**
 * This function creates a business in the database and returns the created business.
 * @param businessBody - {
 * @returns The business object that was created.
 */

const createBusiness = async (businessBody) => {
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
