const Movie = require("./../models/movieModel");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const multer = require("multer");
const sharp = require("sharp");
const {
  addMovieValidation,
  updateMovieValidation,
} = require("./../utils/validations/movieValidation");

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

exports.uploadMovieImages = upload.fields([{ name: "banners", maxCount: 3 }]);

// upload.single('image') req.file
// upload.array('images', 5) req.files

exports.resizeMovieImages = catchAsync(async (req, res, next) => {
  if (!req.files.banners) return next();

  // 2) Images
  req.body.banners = [];

  await Promise.all(
    req.files.banners.map(async (file, i) => {
      const filename = `movie-banner-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/movies/${filename}`);

      req.body.banners.push(filename);
    })
  );

  next();
});

exports.aliasTopMovies = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

exports.getAllMovies = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Movie.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const movies = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: movies.length,
    data: {
      movies,
    },
  });
});

exports.getMovie = catchAsync(async (req, res, next) => {
  const movie = await Movie.findById(req.params.id);
  // Movie.findOne({ _id: req.params.id })

  if (!movie) {
    return next(new AppError("No movie found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      movie,
    },
  });
});

exports.createMovie = catchAsync(async (req, res, next) => {
  //Validate Data
  const { error } = addMovieValidation(req.body);
  if (error)
    return res.status(400).json({ error: true, msg: error.details[0].message });

  const newMovie = await Movie.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      movie: newMovie,
    },
  });
});

exports.updateMovie = catchAsync(async (req, res, next) => {
  //Validate Data
  const { error } = updateMovieValidation(req.body);
  if (error)
    return res.status(400).json({ error: true, msg: error.details[0].message });

  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!movie) {
    return next(new AppError("No movie found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      movie,
    },
  });
});

exports.deleteMovie = catchAsync(async (req, res, next) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);

  if (!movie) {
    return next(new AppError("No movie found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});

exports.getMovieStats = catchAsync(async (req, res, next) => {
  const stats = await Movie.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: "$difficulty" },
        numMovies: { $sum: 1 },
        numRatings: { $sum: "$ratingsQuantity" },
        avgRating: { $avg: "$ratingsAverage" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
    // {
    //   $match: { _id: { $ne: 'EASY' } }
    // }
  ]);

  res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1; // 2021

  const plan = await Movie.aggregate([
    {
      $unwind: "$startDates",
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$startDates" },
        numMovieStarts: { $sum: 1 },
        movies: { $push: "$name" },
      },
    },
    {
      $addFields: { month: "$_id" },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { numMovieStarts: -1 },
    },
    {
      $limit: 12,
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      plan,
    },
  });
});
