const packageModel = require("../../models/sql/package.model");

const crudPackage = {

  //Create package
  addPackage(req, res, next) {
    try {
      packageModel.addPackage(
        req.body,
        function(data) {
          res.status(200).json({ success: true, data: data });
        },
        next
      );
    } catch (error) {
      res.status(400).json({ success: false, err: error });
    }
  },

  //Add Sensor List to Package
  addSensorToPackage(req,res,next) {
    try{
      packageModel.addSensorToPackage(
        req.params.idPackage,req.body.sensorList,
        function(err,data) {
          res.status(200).json({ success: true, data: data })
        },
        next
      )
    } catch (error) {

      next(err)
    }
  },

  //Get all packages
  getAll(req, res, next) {
    try {
      packageModel.getAll( (err,data) => {
        res.status(200).json({ success: true, data: data });
      }, next);
    } catch (err) {
      next(err);
    }
  },

  //Get package by ID
  getByID(req, res, next) {
    try {
      packageModel.getByID(
        req.params.id,
        (err,data) => {
          res.status(200).json({ success: true, data: data });
        },
        next
      );
    } catch (err) {
      next(err);
    }
  },

  //Change package
  updateByID(req, res, next) {
    try {
      packageModel.updateByID(
        req.params.id,
        req.body,
        (err,data) => {
          res.status(200).json({ success: true, data: data });
        },
        next
      );
    } catch (err) {
      next(err);
    }
  },

  //Delete package
  deleteByID(req, res, next) {
    try {
      packageModel.deleteByID(
        req.params.id,
        (err,data) => {
          res.status(200).json({ success: true, data: data });
        },
        next
      );
    } catch (err) {
      next(err);
    }
  }
};

module.exports = crudPackage;
