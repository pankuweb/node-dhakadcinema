const express = require("express");
const rewardController = require("./../controllers/rewardController");
const authController = require("./../controllers/authController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route("/")
  .get(rewardController.getAllRewards)
  .post(rewardController.createReward);

router
  .route("/:id")
  .get(rewardController.getReward)
  .patch(rewardController.updateReward)
  .delete(rewardController.deleteReward);

module.exports = router;
