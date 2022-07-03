const Category = require("./../models/categoryModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");
const {
  addCategoryValidation,
  updateCategoryValidation,
} = require("./../utils/validations/categoryValidation");

//Routecategoryhanddlers
exports.getAllCategories = catchAsync(async (req, res) => {
  const categories = await Category.find();

  res.status(200).json({
    message: "success",
    results: categories.length,
    data: {
      category: categories,
    },
  });
});

exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  // Category.findOne({ _id: req.params.id })

  if (!category) {
    return next(new AppError("No category found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
});

exports.createCategory = catchAsync(async (req, res, next) => {
  //Validate Data
  const { error } = addCategoryValidation(req.body);
  if (error)
    return res.status(400).json({ error: true, msg: error.details[0].message });

  const newCategory = await Category.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      category: newCategory,
    },
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  //Validate Data
  const { error } = updateCategoryValidation(req.body);
  if (error)
    return res.status(400).json({ error: true, msg: error.details[0].message });

  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    return next(new AppError("No category found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return next(new AppError("No category found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});
