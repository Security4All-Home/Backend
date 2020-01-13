const router = require("express").Router();
const userController = require("../controllers/sql/user.controller");
const verifyToken = require("../middlewares/auth.middleware").verifyToken

router.get('/', (req, res, next) => {
    userController.getAll(res, next)
})

router.post('/insert', (req, res, next) => {
    userController.insert(req, res, next);
})
/*
router.post('/firstRegister', (req, res, next) => {
    userController.firstRegister(req, res, next);
})*/
router.put('/update/:iduser', (req, res, next) => {
    userController.update(req, res, next)
})

router.delete('/delete/:iduser', (req, res, next) => {
    userController.delete(req, res, next);
})

// Get by ID
router.get('/:id', (req, res, next) => {
    userController.getById(req, res, next)
})

// Get user type by id
router.get('/type/:id', (req, res, next) => {
    userController.getUserType(req, res, next)
})

/** Get Users by house */
router.get('/house/:zipCode', (req, res, next) => {
    userController.getUsersByHouse(req, res, next);
})


/** Get Sensors by User */
router.get('/sensors/:id', (req, res, next) => {
    userController.getSensorByUser(req, res, next);
})

/** Get Spaces by User */
router.get('/spaces/:id', (req, res, next) => {
    userController.getEspacosByUser(req, res, next);
})

/** Get Package by User */
router.get('/package/:id', (req, res, next) => {
    userController.getPackageByUser(req, res, next);
})

/** Get Review by User */
router.get('/review/:id', (req, res, next) => {
    userController.getReviewByUser(req, res, next);
})

/** Insert Review */
router.post('/insert/review', (req, res, next) => {
    userController.insertReview(req, res, next);
})

/** Update User Houses */
router.put('/updateHouses/:zipCode', (req, res, next) => {
    userController.updateUserHouses(req, res, next)
})

/** Update Sensor */
router.put('/updateSensor/:idSensor', (req, res, next) => {
    userController.updateSensor(req, res, next)
})

/** Add sensor to space */
router.post('/addSensorSpace', (req, res, next) => {
    userController.addSensorToSpace(req, res, next);
})

/** update order to paid */
router.put('/updatePaidOrder/:idOrder', (req, res, next) => {
    userController.updateOrderPayment(req, res, next);
})

/** update order's active state (0 or 1)   */
router.put('/deleteLogicOrder/:idOrder', (req, res, next) => {
    userController.deleteLogicOrder(req, res, next);
})

/** update user's disable state (0 or 1) */
router.put('/deleteLogic/:idUser', (req, res, next) => {
    userController.deleteLogicUser(req, res, next);
})

/** //update user type (1-Admin or 2-User) */
router.put('/editUserType/:idUser', (req, res, next) => {
    userController.editUserType(req, res, next);
})

/** verify user */
router.put('/verify/:idUser', (req, res, next) => {
    userController.verifyUser(req, res, next);
})

/** Add credits to user by id*/
router.put('/addCredit/:idUser', (req, res, next) => {
    userController.addCreditToUser(req, res, next);
})

/** take credits from an user by id*/
router.put('/takeCredit/:idUser', (req, res, next) => {
    userController.takeCreditsFromUser(req, res, next);
})


// Inserir um utilizador:
// Tabelas:
// - user
// - user_contact
// - house
// - user_house
// - order
// - space (Isto não é preciso ser logo que o user crie a sua conta).
// - package ou sensor

module.exports = router;