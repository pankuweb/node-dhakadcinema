const Language = require("./../models/languageModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");
const {
  addLanguageValidation,
  updateLanguageValidation,
} = require("./../utils/validations/languageValidation");

//Routelanguagehanddlers
exports.getAllLanguages = catchAsync(async (req, res) => {
  const languages = await Language.find();

  res.status(200).json({
    message: "success",
    results: languages.length,
    data: {
      language: languages,
    },
  });
});

exports.getLanguage = catchAsync(async (req, res, next) => {
  const language = await Language.findById(req.params.id);
  // Language.findOne({ _id: req.params.id })

  if (!language) {
    return next(new AppError("No language found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      language,
    },
  });
});

exports.createLanguage = catchAsync(async (req, res, next) => {
  //Validate Data
  const { error } = addLanguageValidation(req.body);
  if (error)
    return res.status(400).json({ error: true, msg: error.details[0].message });

  const newLanguage = await Language.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      language: newLanguage,
    },
  });
});

exports.updateLanguage = catchAsync(async (req, res, next) => {
  //Validate Data
  const { error } = updateLanguageValidation(req.body);
  if (error)
    return res.status(400).json({ error: true, msg: error.details[0].message });

  const language = await Language.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!language) {
    return next(new AppError("No language found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      language,
    },
  });
});

exports.deleteLanguage = catchAsync(async (req, res, next) => {
  const language = await Language.findByIdAndDelete(req.params.id);

  if (!language) {
    return next(new AppError("No language found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});
