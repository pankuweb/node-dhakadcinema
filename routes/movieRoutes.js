const express = require("express");
const movieController = require("../controllers/movieController");
const authController = require("../controllers/authController");

const router = express.Router();

// router.param('id', movieController.checkID);

router
  .route("/top-5-cheap")
  .get(movieController.aliasTopMovies, movieController.getAllMovies);

router.route("/movie-stats").get(movieController.getMovieStats);
router.route("/monthly-plan/:year").get(movieController.getMonthlyPlan);

router
  .route("/")
  .get(authController.protect, movieController.getAllMovies)
  .post(
    movieController.uploadMovieImages,
    movieController.resizeMovieImages,
    movieController.createMovie
  );

router
  .route("/:id")
  .get(movieController.getMovie)
  .patch(
    movieController.uploadMovieImages,
    movieController.resizeMovieImages,
    movieController.updateMovie
  )
  .delete(authController.protect, movieController.deleteMovie);

module.exports = router;
