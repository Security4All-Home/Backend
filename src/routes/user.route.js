const router = require("express").Router();
const userController = require("../controllers/sql/user.controller");
const verifyToken = require("../middlewares/auth.middleware").verifyToken

router.get('/', (req, res, next) => {
    userController.getAll(res, next)
})

router.post('/insert', (req, res, next) => {
    userController.insert(req, res, next);
})

router.put('/update/:iduser', (req, res, next) => {
    userController.update(req, res, next)
})

router.delete('/delete/:iduser', (req, res, next) => {
    userController.delete(req, res, next);
})

router.get('/:id', verifyToken,(req, res, next) => {
    userController.getById(req, res, next)
})

/** Get Users by house */
router.get('/house/:taxZipCode', (req, res, next) => {
    userController.getUsersByHouse(req, res, next);
})

/** Get Houses by User */
router.get('/houses/:id', (req, res, next) => {
    userController.getHousesByUser(req, res, next);
})

/** Get Sensors by User */
router.get('/sensors/:id', (req, res, next) => {
    userController.getSensorByUser(req, res, next);
})

/** Get Spaces by User */
router.get('/spaces/:id', (req, res, next) => {
    userController.getEspacosByUser(req, res, next);
})

/** Insert Space */
router.post('/insert/space', (req, res, next) => {
    userController.insertSpace(req, res, next);
})

/** Insert House */
router.post('/insert/house', (req, res, next) => {
    userController.insertHouse(req, res, next);
})

/** Update User Houses */
router.put('/updateHouses/:zipCode', (req, res, next) => {
    userController.updateUserHouses(req, res, next)
})

/** Update Sensor */
router.put('/updateSensor/:idSensor', (req, res, next) => {
    userController.updateSensor(req, res, next)
})


module.exports = router;