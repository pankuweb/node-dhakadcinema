const mongoose = require("mongoose");

const castSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      unique: true,
    },
    lastName: {
      type: String,
      unique: true,
    },
    gender: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    status: {
      type: String,
    },
    photo: {
      type: String,
    },
    address: {
      type: String,
    },
    description: {
      type: String,
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
// castSchema.pre(/^findOneAnd/, async function (next) {
//   this.r = await this.findOne();
//   // console.log(this.r);
//   next();
// });

const Cast = mongoose.model("Cast", castSchema);

module.exports = Cast;
