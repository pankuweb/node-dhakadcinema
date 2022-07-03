const Joi = require("joi");

//Create Category Validation
const addCouponValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string(),
    couponCode: Joi.string(),
    amount: Joi.number(),
    description: Joi.string(),
    status: Joi.string(),
    expireDate: Joi.date(),
    userLimit: Joi.string(),
    movies: Joi.array(),
  });
  return schema.validate(data);
};

//Update Category Validation
const updateCouponValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string(),
    couponCode: Joi.string(),
    amount: Joi.number(),
    description: Joi.string(),
    status: Joi.string(),
    expireDate: Joi.date(),
    userLimit: Joi.string(),
    movies: Joi.array(),
  });
  return schema.validate(data);
};

module.exports.addCouponValidation = addCouponValidation;
module.exports.updateCouponValidation = updateCouponValidation;
