const router = require('express').Router();
const authController = require('../controllers/sql/auth.controller')


/**
 * @swagger
 *  /auth/login:
 *    post:
 *        tags:
 *            - Authentication
 *        summary: Rota para Autenticar o user
 *        description: Só depois de aceder esta rota com o username e passsword corretas é que é atribuido um token ao user para poder fazer pedidos ás outras rotas.
 *        consumes:
 *            application/json
 *        produces:
 *            application/json
 *        parameters:
 *            - in: body
 *              required: true
 *              name: userInfo
 *              schema:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                      password:
 *                          type: string
 */
router.post('/login', (req, res, next) => {
    authController.login(req, res, next);
})



router.post('/register', (req, res, next) => {
    authController.register(req, res, next)
})

module.exports = router;