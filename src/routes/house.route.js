const router = require("express").Router();
const houseController = require("../controllers/sql/house.controller");

/** Get all houses */
router.get("/", (req, res, next) => {
    houseController.getHouses(req, res, next)
})

/** Get Houses by User */
router.get('/:id', (req, res, next) => {
    houseController.getHousesByUser(req, res, next);
})

/** Insert Space */
router.post('/insertSpace', (req, res, next) => {
    houseController.insertSpace(req, res, next);
})

/** Insert House */
router.post('/insertHouse', (req, res, next) => {
    houseController.insertHouse(req, res, next);
})



module.exports = router;