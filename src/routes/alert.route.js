const route = require("express").Router();
const alertController = require("../controllers/mongo/alert.controller");

route.post("/", (req, res, next) => {
  alertController.addAlert(req, res, next);
}); //Working
route.get("/", (req, res, next) => {
  alertController.getAlerts(req, res, next);
}); //Working
route.get("/:id", (req, res, next) => {
  alertController.getAlertById(req, res, next);
}); //Working
route.get("/users/:id", (req, res, next) => {
  alertController.getAlertByUser(req, res, next);
}); //Working
route.get("/users/:idUser/houses/:idHouse", (req, res, next) => {
  alertController.getAlertByHouse(req, res, next);
}); //Working
route.get(
  "/users/:idUser/houses/:idHouse/spaces/:idSpace",
  (req, res, next) => {
    alertController.getAlertBySpace(req, res, next);
  }
); //Working
route.delete("/:id", (req, res, next) => {
  alertController.removeAlert(req, res, next);
}); //Working
module.exports = route;
