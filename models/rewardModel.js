const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    couponCode: {
      type: String,
    },
    amount: {
      type: Number,
    },
    description: {
      type: String,
    },
    expireDate: {
      type: Date,
    },
    userLimit: {
      type: String,
    },
    status: {
      type: String,
      default: "Active",
    },
    movies: {
      type: Array,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// findByIdAndUpdate
// findByIdAndDelete
// rewardSchema.pre(/^findOneAnd/, async function (next) {
//   this.r = await this.findOne();
//   // console.log(this.r);
//   next();
// });

const Reward = mongoose.model("Reward", rewardSchema);

module.exports = Reward;
