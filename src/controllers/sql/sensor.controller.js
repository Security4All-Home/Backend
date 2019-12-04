const sensorModel = require("../../models/sql/sensor.model");

const crudSensor = {
  //Create

  addSensor(req, res, next) {
    try {
      sensorModel.addSensor(
        req.body,
        (err, data) => {
          res.status(200).json({ success: true, data: data });
        },
        next
      );
    } catch (error) {
      res.status(400).json({ success: false, err: error });
    }
  },
  getAll(req, res, next) {
    //Read
    try {
      sensorModel.getAll((err, data) => {
        res.status(200).json({ success: true, data: data });
      }, next);
    } catch (err) {
      next(err);
    }
  },
  getByID(req, res, next) {
    //Read By ID
    try {
      sensorModel.getByID(
        req.params.id,
        (err, data) => {
          res.status(200).json({ success: true, data: data });
        },
        next
      );
    } catch (err) {
      next(err);
    }
  },
  getByCategory(req, res, next) {
    try {
      sensorModel.getByCategory(
        req.params.idCategory,
        (err, data) => {
          console.log("Isto é uma datinha", data);
          res.status(200).json({ success: true, data: data });
        },
        next
      );
    } catch (err) {
      next(err);
    }
  },
  updateByID(req, res, next) {
    try {
      sensorModel.updateByID(
        req.params.id,
        req.body,
        (err, data) => {
          res.status(200).json({ success: true, data: data });
        },
        next
      );
    } catch (err) {
      next(err);
    }
  },
  deleteByID(req, res, next) {
    try {
      sensorModel.deleteByID(
        req.params.id,
        (err, data) => {
          res.status(200).json({ success: true, data: data });
        },
        next
      );
    } catch (err) {
      next(err);
    }
  }
};

module.exports = crudSensor;
