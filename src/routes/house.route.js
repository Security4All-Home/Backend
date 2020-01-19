const router = require("express").Router();
const houseController = require("../controllers/sql/house.controller");
const {  verifyToken } = require("../middlewares/auth.middleware");

/** Get all houses */
router.get("/",  verifyToken, (req, res, next) => {
    houseController.getHouses(req, res, next)
})

/** Get Houses by User */
router.get('/:id',  verifyToken, (req, res, next) => {
    houseController.getHousesByUser(req, res, next);
})

/** Insert Space */
router.post('/insertSpace', verifyToken,  (req, res, next) => {
    houseController.insertSpace(req, res, next);
})

/** Insert House */
router.post('/insertHouse',  verifyToken, (req, res, next) => {
    houseController.insertHouse(req, res, next);
})



module.exports = router;