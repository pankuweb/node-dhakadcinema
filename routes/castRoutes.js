const express = require("express");
const castController = require("./../controllers/castController");
const authController = require("./../controllers/authController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route("/")
  .get(castController.getAllCasts)
  .post(
    castController.uploadCastPhoto,
    castController.resizeCastPhoto,
    castController.createCast
  );

router
  .route("/:id")
  .get(castController.getCast)
  .patch(
    castController.uploadCastPhoto,
    castController.resizeCastPhoto,
    castController.updateCast
  )
  .delete(castController.deleteCast);

module.exports = router;
