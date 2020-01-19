const router = require("express").Router();
const arduinoController = require("../controllers/sql/arduino.controller");
const {  verifyToken } = require("../middlewares/auth.middleware");


router.post("/",  verifyToken, (req, res, next) => {
  arduinoController.addRecord(req, res, next);
});
router.get("/", verifyToken,  (req, res, next) => {
  arduinoController.getAll(req, res, next);
});
router.post("/close",  verifyToken, (req, res, next) => {
  arduinoController.closeArduino(req, res, next);
});
router.post("/delete",  verifyToken, (req, res, next) => {
  arduinoController.deleteAllRecords(req, res, next);
})
module.exports = router;
