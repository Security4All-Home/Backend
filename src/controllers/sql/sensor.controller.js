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
  }, //This can be used to know information about the sensor(state,stock,other information)
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
  }, //Update sensor information
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
  }, //Update sensor stock for when there is an order the stock update automatically
  updateSensorStock(req, res, next) {
    try {
      sensorModel.updateSensorStock(
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
