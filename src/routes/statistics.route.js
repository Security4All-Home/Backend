const router = require("express").Router();
const statisticsController = require("../controllers/sql/statistics.controller");

router.get("/numUsers", (req, res, next) => {
  statisticsController.numberOfUsers(req, res, next);
});

router.get("/numSensorsSold", (req, res, next) => {
  statisticsController.numberOfSensorsSold(req, res, next);
});

router.get("/installation", (req, res, next) => {
  statisticsController.installationRequests(req, res, next);
});

router.get("/ordersToPay", (req, res, next) => {
  statisticsController.ordersToPay(req, res, next);
});

router.get("/numHouses", (req, res, next) => {
  statisticsController.numberOfHouses(req, res, next);
});

router.get("/avgSensor", (req, res, next) => {
  statisticsController.avgSensorForHouse(req, res, next);
});

router.get("/usersToValidate", (req, res, next) => {
  statisticsController.usersToValidate(req, res, next);
});

router.get("/numAchievements", (req, res, next) => {
  statisticsController.numberOfAchievements(req, res, next);
});
module.exports = router;
