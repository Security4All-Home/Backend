const alertModel = require("../../models/mongo/alert.model");

const crudAlert = {
  //Inserir Alertas
  addAlert(req, res, next) {
    try {
      console.log("Entra?", req.body);
      if (req.body.alertType.toUpperCase() === "Danger".toUpperCase()) {
        console.log("Alerta danger");
        let newAlert = alertModel({
          idUser: req.body.idUser,
          alertText: req.body.alertText,
          alertType: "Danger"
        });
        newAlert.save(err => {
          if (err) {
            res.json({ success: false, data: err });
          }
          res.status(200).json({ success: true, data: newAlert });
        });
      } else if (req.body.alertType.toUpperCase() === "Warning".toUpperCase()) {
        console.log("Alerta Warning");
        let newAlert = alertModel({
          idUser: req.body.idUser,
          idHouse: req.body.idHouse,
          idSpace: req.body.idSpace,
          idSensor: req.body.idSensor,
          alertText: req.body.alertText,
          alertType: "Warning"
        });
        newAlert.save(err => {
          if (err) {
            res.json({ success: false, data: err });
          }
          res.status(200).json({ success: true, data: newAlert });
        });
      } else if (req.body.alertType.toUpperCase() === "Success".toUpperCase()) {
        let newAlert = alertModel({
          idUser: req.body.idUser,
          idHouse: req.body.idHouse,
          idSpace: req.body.idSpace,
          idSensor: req.body.idSensor,
          alertText: req.body.alertText,
          alertType: "Success"
        });
        newAlert.save(err => {
          if (err) {
            res.json({ success: false, data: err });
          }
          res.status(200).json({ success: true, data: newAlert });
        });
      }
    } catch (err) {
      next(err);
    }
  },
  //Ir buscar Alertas
  getAlerts(req, res, next) {
    try {
      alertModel.find({}, (err, collection) => {
        if (err) {
          res.json({ success: false, data: err });
        }
        res.status(200).json({ success: true, data: collection });
      });
    } catch (err) {
      next(err);
    }
  },
  //Ir buscar Alerta Especifico
  getAlertById(req, res, next) {
    try {
      alertModel.findById(req.params.id, (err, document) => {
        if (err) {
          res.json({ success: false, data: err });
        }
        res.status(200).json({ success: true, data: document });
      });
    } catch (err) {
      next(err);
    }
  },
  //Ir buscar alertas por utilizador
  getAlertByUser(req, res, next) {
    try {
      alertModel.find({ idUser: req.params.id }, (err, collection) => {
        if (err) {
          res.json({ success: false, data: err });
        }
        res.status(200).json({ success: true, data: collection });
      });
    } catch (err) {
      next(err);
    }
  },
  //Ir buscar alerta por utilizador e casa
  getAlertByHouse(req, res, next) {
    try {
      alertModel.find(
        { idUser: req.params.idUser, idHouse: req.params.idHouse },
        (err, collection) => {
          if (err) {
            res.json({ success: false, data: err });
          }
          res.status(200).json({ success: true, data: collection });
        }
      );
    } catch (err) {
      next(err);
    }
  },
  //Ir buscar Alerta Por utilizador casa e espaço
  getAlertBySpace(req, res, next) {
    try {
      alertModel.find(
        {
          idUser: req.params.idUser,
          idHouse: req.params.idHouse,
          idSpace: req.params.idSpace
        },
        (err, collection) => {
          if (err) {
            res.json({ success: false, data: err });
          }
          res.status(200).json({ success: true, data: collection });
        }
      );
    } catch (err) {
      next(err);
    }
  },
  //Remover Alertas
  removeAlert(req, res, next) {
    try {
      alertModel.findByIdAndRemove(req.params.id, (err, collection) => {
        if (err) {
          res.json({ success: false, data: err });
        }
        res.status(200).json({ success: true, data: "Alert Removed" });
      });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = crudAlert;
