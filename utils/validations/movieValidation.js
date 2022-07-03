const Joi = require("joi");

//Movie Validation
const addMovieValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(5),
    duration: Joi.number(),
    categories: Joi.array(),
    subtitles: Joi.array(),
    banners: Joi.array(),
    languages: Joi.array(),
    dhaakadRating: Joi.string(),
    ageGroup: Joi.array(),
    casts: Joi.array(),
    price: Joi.number(),
    offerPrice: Joi.number(),
    description: Joi.string(),
    status: Joi.string(),
  });
  return schema.validate(data);
};

const updateMovieValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(5),
    duration: Joi.number(),
    categories: Joi.array(),
    subtitles: Joi.array(),
    banners: Joi.array(),
    languages: Joi.array(),
    dhaakadRating: Joi.string(),
    ageGroup: Joi.array(),
    casts: Joi.array(),
    price: Joi.number(),
    offerPrice: Joi.number(),
    description: Joi.string(),
    status: Joi.string(),
  });
  return schema.validate(data);
};

module.exports.addMovieValidation = addMovieValidation;
module.exports.updateMovieValidation = updateMovieValidation;
