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
//Update
router.put("/:id", (req, res, next) => {
  sensorController.updateByID(req, res, next);
});
//Delete
router.delete("/:id", (req, res, next) => {
  sensorController.deleteByID(req, res, next);
});
module.exports = router;
