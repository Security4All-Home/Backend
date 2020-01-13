const router = require("express").Router();
const arduinoController = require("../controllers/sql/arduino.controller");

router.post("/", (req, res, next) => {
  arduinoController.addRecord(req, res, next);
}); //Feito

//Read
router.get("/", (req, res, next) => {
  arduinoController.getAll(req, res, next);
}); //Feito
module.exports = router;
