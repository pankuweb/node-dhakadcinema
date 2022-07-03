const mongoose = require("mongoose");
const slugify = require("slugify");
// const validator = require('validator');

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    duration: {
      type: Number,
    },
    categories: {
      type: Array,
    },
    subtitles: {
      type: Array,
    },
    banners: {
      type: Array,
    },
    languages: {
      type: Array,
    },
    dhaakadRating: {
      type: String,
    },
    ageGroup: {
      type: Array,
    },
    casts: {
      type: Array,
    },
    price: {
      type: Number,
    },
    offerPrice: {
      type: Number,
    },
    description: {
      type: String,
    },
    slug: String,
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    status: {
      type: String,
      default: "Active",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// movieSchema.virtual("durationWeeks").get(function () {
//   return this.duration / 7;
// });

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
movieSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// movieSchema.pre('save', function(next) {
//   console.log('Will save document...');
//   next();
// });

// movieSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY MIDDLEWARE
// movieSchema.pre('find', function(next) {

movieSchema.pre(/^find/, function (next) {
  this.find({ secretMovie: { $ne: true } });

  this.start = Date.now();
  next();
});

movieSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

// AGGREGATION MIDDLEWARE
movieSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { secretMovie: { $ne: true } } });

  console.log(this.pipeline());
  next();
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
