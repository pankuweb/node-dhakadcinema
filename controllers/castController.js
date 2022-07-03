const Cast = require("./../models/castModel");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const sharp = require("sharp");
const AppError = require("./../utils/appError");

const {
  addCastValidation,
  updateCastValidation,
} = require("./../utils/validations/castValidation");

//Upload image
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.uploadCastPhoto = upload.single("photo");

//Resizing Image
exports.resizeCastPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `cast-profile-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/casts/${req.file.filename}`);

  req.body.photo = req.file.filename;
  next();
});

//Routecasthanddlers
exports.getAllCasts = catchAsync(async (req, res) => {
  const casts = await Cast.find();

  res.status(200).json({
    message: "success",
    results: casts.length,
    data: {
      cast: casts,
    },
  });
});

exports.getCast = catchAsync(async (req, res, next) => {
  const cast = await Cast.findById(req.params.id);
  // Cast.findOne({ _id: req.params.id })

  if (!cast) {
    return next(new AppError("No cast found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      cast,
    },
  });
});

exports.createCast = catchAsync(async (req, res, next) => {
  //Validate Data
  const body = req.body;

  const { error } = addCastValidation(body);
  if (error)
    return res.status(400).json({ error: true, msg: error.details[0].message });

  const newCast = await Cast.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      cast: newCast,
    },
  });
});

exports.updateCast = catchAsync(async (req, res, next) => {
  //Validate Data
  const { error } = updateCastValidation(req.body);
  if (error)
    return res.status(400).json({ error: true, msg: error.details[0].message });

  const cast = await Cast.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!cast) {
    return next(new AppError("No cast found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      cast,
    },
  });
});

exports.deleteCast = catchAsync(async (req, res, next) => {
  const cast = await Cast.findByIdAndDelete(req.params.id);

  if (!cast) {
    return next(new AppError("No cast found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});
