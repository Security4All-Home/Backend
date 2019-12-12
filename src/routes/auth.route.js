const router = require('express').Router();
const authController = require('../controllers/sql/auth.controller')

router.post('/login', (req, res, next) => {
    authController.login(req, res, next);
})

router.post('/register', (req, res, next) => {
    authController.register(req, res, next)
})

module.exports = router;