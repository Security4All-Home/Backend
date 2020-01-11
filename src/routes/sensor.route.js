const router = require("express").Router();
const sensorController = require("../controllers/sql/sensor.controller");

//Create
router.post("/", (req, res, next) => {
  sensorController.addSensor(req, res, next);
});

//Read
router.get("/", (req, res, next) => {
  sensorController.getAll(req, res, next);
});
//ReadByID
router.get("/:id", (req, res, next) => {
  sensorController.getByID(req, res, next);
});
//ReadBYCategory
router.get("/category/:idCategory", (req, res, next) => {
  sensorController.getByCategory(req, res, next);
});
//Update Stock
router.put("/stock", (req, res, next) => {
  sensorController.updateSensorStock(req, res, next);
});
//Update
router.put("/:id", (req, res, next) => {
  sensorController.updateByID(req, res, next);
});

//Delete
router.delete("/:id", (req, res, next) => {
  sensorController.deleteByID(req, res, next);
});
router.post("/space", (req, res, next) => {
  sensorController.sensorSpace(req, res, next);
});
router.get("/space/:idSpace", (req, res, next) => {
  sensorController.getSensorSpace(req, res, next);
});
router.delete("/space/:idSensor/:idSpace", (req, res, next) => {
  sensorController.removeSensorSpace(req, res, next);
});
module.exports = router;
