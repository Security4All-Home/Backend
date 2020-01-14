const router = require("express").Router();
const arduinoController = require("../controllers/sql/arduino.controller");

router.post("/", (req, res, next) => {
  arduinoController.addRecord(req, res, next);
});
router.get("/", (req, res, next) => {
  arduinoController.getAll(req, res, next);
});
router.post("/close", (req, res, next) => {
  arduinoController.closeArduino(req, res, next);
});
router.post("/delete", (req, res, next) => {
  arduinoController.deleteAllRecords(req, res, next);
})
module.exports = router;
