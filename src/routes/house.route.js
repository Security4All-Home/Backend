const router = require("express").Router();
const houseController = require("../controllers/sql/house.controller");

/** Get all houses */
router.get("/", (req, res, next) => {
    houseController.getHouses(req, res, next)
})


module.exports = router;