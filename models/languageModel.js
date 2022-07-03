const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
    },
    status: {
      type: String,
      default: "Active",
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
// languageSchema.pre(/^findOneAnd/, async function (next) {
//   this.r = await this.findOne();
//   // console.log(this.r);
//   next();
// });

const Language = mongoose.model("Language", languageSchema);

module.exports = Language;
