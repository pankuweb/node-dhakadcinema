const Reward = require("./../models/rewardModel");
const catchAsync = require("../utils/catchAsync");

const {
  addCouponValidation,
  updateCouponValidation,
} = require("./../utils/validations/couponValidation");

//Routerewardhanddlers
//1
exports.getAllRewards = catchAsync(async (req, res) => {
  const rewards = await Reward.find();

  res.status(200).json({
    message: "success",
    results: rewards.length,
    data: {
      reward: rewards,
    },
  });
});

exports.getReward = catchAsync(async (req, res, next) => {
  const reward = await Reward.findById(req.params.id);
  // Reward.findOne({ _id: req.params.id })

  if (!reward) {
    return next(new AppError("No reward found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      reward,
    },
  });
});

exports.createReward = catchAsync(async (req, res, next) => {
  //Validate Data
  const body = req.body;

  const { error } = addCouponValidation(body);
  if (error)
    return res.status(400).json({ error: true, msg: error.details[0].message });

  const newReward = await Reward.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      reward: newReward,
    },
  });
});

exports.updateReward = catchAsync(async (req, res, next) => {
  //Validate Data
  const { error } = updateCastValidation(req.body);
  if (error)
    return res.status(400).json({ error: true, msg: error.details[0].message });

  const reward = await Reward.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!reward) {
    return next(new AppError("No reward found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      reward,
    },
  });
});

exports.deleteReward = catchAsync(async (req, res, next) => {
  const reward = await Reward.findByIdAndDelete(req.params.id);

  if (!reward) {
    return next(new AppError("No reward found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});
