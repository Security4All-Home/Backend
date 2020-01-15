const router = require("express").Router();
const packageController = require("../controllers/sql/package.controller");

//Create package
router.post("/", (req, res, next) => {
  packageController.addPackage(req, res, next);
});

//Add Sensor List to Package
router.post("/sensor/:idPackage", (req, res, next) => {
  packageController.addSensorToPackage(req,res,next);
})

//Read package
router.get("/", (req, res, next) => {
  packageController.getAll(req, res, next);
});
//ReadByID
router.get("/:id", (req, res, next) => {
  packageController.getByID(req, res, next);
});
//Update package
router.put("/:id", (req, res, next) => {
  packageController.updateByID(req, res, next);
});
//Delete package
router.delete("/:id", (req, res, next) => {
  packageController.deleteByID(req, res, next);
});
//Remove sensor from package
router.delete("/package/:idPackage", (req, res, next) => {
  console.log("req", req.query.idSensor);
  packageController.removeSensorFromPackage(req, res, next);
});
module.exports = router;
