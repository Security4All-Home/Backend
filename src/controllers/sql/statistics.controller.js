const statisticsModel = require("../../models/sql/statistics.model");
const achievementModel = require("../../models/mongo/achievement.model");

const crudStatistics = {
  numberOfUsers(req, res, next) {
    try {
      statisticsModel.numberOfUsers(req, res, (err, data) => {
        if (err) {
          next(err);
          return;
        }
        res.status(200).json({
          success: true,
          data: data
        });
      });
    } catch (err) {
      next(err);
    }
  },
  numberOfSensorsSold(req, res, next) {
    try {
      statisticsModel.numberOfSensorSold(req, res, (err, data) => {
        if (err) {
          next(err);
          return;
        }
        res.status(200).json({
          success: true,
          data: data
        });
      });
    } catch (err) {
      next(err);
    }
  },
  installationRequests(req, res, next) {
    try {
      statisticsModel.installationRequests(req, res, (err, data) => {
        if (err) {
          next(err);
          return;
        }
        res.status(200).json({
          success: true,
          data: data
        });
      });
    } catch (err) {
      next(err);
    }
  },
  ordersToPay(req, res, next) {
    try {
      statisticsModel.ordersToPay(req, res, (err, data) => {
        if (err) {
          next(err);
          return;
        }
        res.status(200).json({
          success: true,
          data: data
        });
      });
    } catch (err) {
      next(err);
    }
  },
  numberOfHouses(req, res, next) {
    try {
      statisticsModel.numberOfHouses(req, res, (err, data) => {
        if (err) {
          next(err);
          return;
        }
        res.status(200).json({ success: true, data: data });
      });
    } catch (err) {
      next(err);
    }
  },
  avgSensorForHouse(req, res, next) {
    try {
      statisticsModel.avgSensorForHouse(req, res, (err, data) => {
        if (err) {
          next(err);
          return;
        }
        res.status(200).json({ success: true, data: data });
      });
    } catch (err) {
      next(err);
    }
  },
  usersToValidate(req, res, next) {
    try {
      statisticsModel.usersToValidate(req, res, (err, data) => {
        if (err) {
          next(err);
          return;
        }
        res.status(200).json({ success: true, data: data });
      });
    } catch (err) {
      next(err);
    }
  },
  numberOfAchievements(req, res, next) {
    try {
      achievementModel.countDocuments((err, count) => {
        if (err) {
          next(err);
          return;
        }
        res.status(200).json({ success: true, data: count });
      });
    } catch (err) {
      next(err);
    }
  }
};
module.exports = crudStatistics;
