const orderModel = require("../../models/sql/order.model");

const orderCrud = {
  getAll(req, res, next) {
    try {
      orderModel.getAll((err, data) => {
        if (err) {
          next(err);
          return;
        }

        res.json({ success: true, data: data });
      });
    } catch (err) {
      next(err);
    }
  },
  getById(req, res, next) {
    try {
      orderModel.getById(req.params.idOrder, (err, result) => {
        if (err) {
          next(err);
          return;
        }
        res.json({ success: true, data: result });
      });
    } catch (error) {
      next(error);
    }
  },
  insertOrderPackage(req, res, next) {
    try {
      orderModel.insertOrderPackage(req.body, (err, data) => {
        if (err) {
          next(err);
          return;
        }
        res.json({ success: true, data: data });
      });
    } catch (err) {
      next(err);
    }
  },
  insertOrderSensors(req, res, next) {
    try {
      orderModel.insertOrderSensors(req.body, (err, data) => {
        if (err) {
          next(err);
          return;
        }

        res.json({ success: true, data: data });
      });
    } catch (error) {
      next(error);
    }
  },
  getOrdersWithPackages(req, res, next) {
    try {
      orderModel.getOrdersWithPackages((err, results) => {
        if (err) {
          next(err);
          return;
        }

        res.json({ success: true, data: results });
      });
    } catch (err) {
      next(err);
    }
  },
  getOrdersWithSensors(req, res, next) {
    try {
      orderModel.getOrdersWithSensors((err, results) => {
        if (err) {
          next(err);
          return;
        }

        res.json({ success: true, data: results });
      });
    } catch (err) {
      next(err);
    }
  },
  updateInstaltion(req, res, next) {
    try {
      orderModel.updateInstaltion(req.params.id, (err, rows) => {
        if (err) {
          next(err);
          return;
        }

        res.json({ success: true, data: rows });
      });
    } catch (err) {
      next(err);
    }
  },
  updatePayment(req, res, next) {
    try {
      orderModel.updatePayment(req.params.id, (err, rows) => {
        if (err) {
          next(err);
          return;
        }

        res.json({ success: true, data: rows });
      });
    } catch (err) {
      next(err);
    }
  },
  updateActive(req, res, next) {
    try {
      orderModel.updateActive(req.params.id, (err, rows) => {
        if (err) {
          next(err);
          return;
        }

        res.json({ success: true, data: rows });
      });
    } catch (err) {
      next(err);
    }
  },
  deleteById(req, res, next) {
    try {
      orderModel.deleteById(req.params.id, (err, rows) => {
        if (err) {
          next(err);
          return;
        }
        res.json({ success: true, data: rows });
      });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = orderCrud;
