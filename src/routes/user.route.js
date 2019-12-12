const router = require("express").Router();
const userController = require("../controllers/sql/user.controller");

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

router.get('/:id', (req, res, next) => {
    userController.getById(req, res, next)
})

/** Get Users by house */
router.get('/house/:taxZipCode', (req, res, next) => {
    userController.getUsersByHouse(req, res, next);
})


module.exports = router;