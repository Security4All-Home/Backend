const router = require("express").Router();
const userController = require("../controllers/sql/user.controller");
const verifyToken = require("../middlewares/auth.middleware").verifyToken

/**
 * @swagger
 * paths:
 *  /user:
 *     get:
 *       tags:
 *         - user
 *       summary: Lista todos os users
 *       operationId: getAll
 *       description: Lista todos os sensores
 *       produces:
 *        - application/json
 *       responses:
 *         200:
 *          description: Todos os users
 *         400:
 *          description: Erro ao ir buscar todos os users 
 *     post:
 *        tags:
 *            - user
 *        summary: Adiciona um user
 *        operationId: insert
 *        description: Adicionar um user à base de dados
 *        consumes:
 *            - application/json
 *        produces:
 *            - application/json
 *        parameters:
 *            - in: body
 *              schema:
 *                $ref: '#/definitions/UserObject'
 *        responses:
 *            200:
 *              description: Utilizador adicionado
 *            400:
 *              description: Erro ao adicionar utilizador
 * /user/{id}:
 *      get:
 *          tags:
 *              - user
 *          summary: Lista o user com o ID inserido
 *          operationId: getById
 *          description: Lista o user com o ID inserido
 *          produces:
 *            - application/json
 *          parameters:
 *          - name: id
 *            in: path
 *            required: true
 *          responses:
 *             200:
 *              description: Dados do Utilizador
 *             400:
 *              description: Erro ao ir buscar os dados do utilizador 
 *      put:
 *        tags:
 *          - user
 *        summary: Editar um user
 *        operationId: update
 *        description: Edita Um user dado um id
 *        consumes:
 *          - application/json
 *        produces:
 *          - application/json
 *        parameters:
 *        - name: id
 *          in: path
 *          required: true
 *        - name: UserObject
 *          in: body
 *          schema:
 *            $ref: '#/definitions/UserObject'
 *        responses:
 *             200:
 *              description: Update User
 *             400:
 *              description: Erro ao actualizar o User
 * 
 *      delete:
 *        tags:
 *          - user
 *        summary: Apaga um user
 *        operationId: delete
 *        description: Apaga um user da base de dados
 *        produces:
 *          - application/json
 *        parameters:
 *          - name: id
 *            in: path
 *            required: true 
 *        responses:
 *             200:
 *              description: Delete User
 *             400:
 *              description: Erro ao eliminar o User
 * 
 * /user/type/{id}:
 *      get:
 *          tags:
 *              - user
 *          summary: Get user type by id
 *          operationId: getUserType
 *          description: Lista o tipo de user com o ID inserido
 *          produces:
 *            - application/json
 *          parameters:
 *            - name: id
 *              in: path
 *              required: true 
 *          responses:
 *             200:
 *              description: User Type associado ao id User
 *             400:
 *              description: Erro ao ir buscar o User Type associado ao id User 
 * /user/house/{zipCode}:
 *      get:
 *          tags:
 *              - user
 *          summary: Get Users by house 
 *          operationId: getUsersByHouse
 *          description: Lista o user com o zipCode inserido
 *          produces:
 *            - application/json
 *          parameters:
 *            - name: zipCode
 *              in: path
 *              required: true 
 *          responses:
 *             200:
 *              description: Todos os users associados  a casa 
 *             400:
 *              description: Erro ao ir buscar todos os users associados  a casa 
 * /user/sensors/{id}:
 *      get:
 *          tags:
 *              - user
 *          summary: Get Sensors by User 
 *          operationId: getSensorByUser
 *          description: Lista os sensores com o id do user inserido
 *          produces:
 *            - application/json
 *          parameters:
 *            - name: id
 *              in: path
 *              required: true 
 *          responses:
 *             200:
 *              description: Todos os sensores do user
 *             400:
 *              description: Erro ao ir buscar todos os sensores do user 
 * /user/spaces/{id}:
 *      get:
 *          tags:
 *              - user
 *          summary: Get Spaces by User 
 *          operationId: getEspacosByUser
 *          description: Lista os espaços com o id do user inserido
 *          produces:
 *            - application/json
 *          parameters:
 *            - name: id
 *              in: path
 *              required: true 
 *          responses:
 *             200:
 *              description: Todos os espacos do user
 *             400:
 *              description: Erro ao ir buscar todos os espacos do user 
 * /user/package/{id}:
 *      get:
 *          tags:
 *              - user
 *          summary: Get Package by User 
 *          operationId: getPackageByUser
 *          description: Lista o pacote correspondente ao id do user inserido
 *          produces:
 *            - application/json
 *          parameters:
 *            - name: id
 *              in: path
 *              required: true 
 *          responses:
 *             200:
 *              description: Todos os packages do User
 *             400:
 *              description: Erro ao ir buscar Todos os packages do User
 * /user/review/{id}:
 *      get:
 *          tags:
 *              - user
 *          summary: Get Review by User 
 *          operationId: getReviewByUser
 *          description: Lista as reviews correspondente ao id do user inserido
 *          produces:
 *            - application/json
 *          parameters:
 *            - name: id
 *              in: path
 *              required: true
 *          responses:
 *            200:
 *              description: Todas as reviews do user
 *            400:
 *              description: Erro ao ir buscar as reviews do user
 * 
 * /user/firstRegister:
 *      post:
 *        tags:
 *            - user
 *        summary: Adiciona um novo user
 *        operationId: firstRegister
 *        description: Adiciona um novo user verificando se o valor que este pretende inserir corresponte ao valor do pacote selecionado
 *        consumes:
 *            - application/json
 *        produces:
 *            - application/json
 *        parameters:
 *            - in: body
 *              name: review
 *              description: add review
 *              schema:
 *                $ref: '#/definitions/NewUser'
 *        responses:
 *          200:
 *            description: item created
 *          400:
 *            description:invalid input, object invalid
 * 
 * /user/insert/review:
 *      post:
 *        tags:
 *            - user
 *        summary: Adiciona uma review 
 *        operationId: insertReview
 *        description: Adicionar uma review à base de dados
 *        consumes:
 *            - application/json
 *        produces:
 *            - application/json
 *        parameters:
 *            - in: body
 *              name: review
 *              description: add review
 *              schema:
 *                $ref: '#/definitions/Review'
 *        responses:
 *          200:
 *            description: item created
 *          400:
 *            description:invalid input, object invalid
 * 
 * /user/updateHouses/{zipCode}:
 *      put:
 *        tags:
 *          - user
 *        summary: Update User houses
 *        operationId: updateUserHouses
 *        description: Update User houses 
 *        produces:
 *          - application/json
 *        parameters:
 *         - name: zipCode
 *           in: path
 *           required: true
 *         - name: Sensor Body
 *           in: body
 *           schema:
 *            $ref: '#/definitions/UserHouse'
 *        responses:
 *            200:
 *              description: Estado atualizado corretamente
 *            400:
 *              description: Erro ao atualizar o estado
 * /user/deleteLogic/{idUser}:
 *    put:
 *        tags:
 *          - user
 *        summary: Update User state
 *        operationId: deleteLogicUser
 *        description: Update User state 
 *        produces:
 *          - application/json
 *        parameters:
 *         - name: idUser
 *           in: path
 *           required: true
 *         - name: User state
 *           in: body
 *           schema:
 *            $ref: '#/definitions/UserState'
 *        responses:
 *            200:
 *              description: Estado atualizado corretamente
 *            400:
 *              description: Erro ao atualizar o estado      
 * /user/editUserType/{idUser}:
 *    put:
 *        tags:
 *          - user
 *        summary: Update User type
 *        operationId: editUserType
 *        description: Update User type 
 *        produces:
 *          - application/json
 *        parameters:
 *         - name: idUser
 *           in: path
 *           required: true
 *         - name: User type
 *           in: body
 *           schema:
 *            $ref: '#/definitions/UserType'
 *        responses:
 *            200:
 *              description: Estado atualizado corretamente
 *            400:
 *              description: Erro ao atualizar o estado    
 * /user/verify/{idUser}:
 *    put:
 *        tags:
 *          - user
 *        summary: Verify User type
 *        operationId: verifyUser
 *        description: Verify User
 *        produces:
 *          - application/json
 *        parameters:
 *         - name: idUser
 *           in: path
 *           required: true

 *        responses:
 *            200:
 *              description: Estado atualizado corretamente
 *            400:
 *              description: Erro ao atualizar o estado    
 * /user/addCredit/{idUser}:
 *    put:
 *        tags:
 *          - user
 *        summary: Add Credit to  User
 *        operationId: addCreditToUser
 *        description: Add credit
 *        produces:
 *          - application/json
 *        parameters:
 *         - name: idUser
 *           in: path
 *           required: true
 *         - name: User credit
 *           in: body
 *           schema:
 *            $ref: '#/definitions/UserCredit'
 *        responses:
 *            200:
 *              description: Estado atualizado corretamente
 *            400:
 *              description: Erro ao atualizar o estado
 * /user/takeCredit/{idUser}:
 *    put:
 *        tags:
 *          - user
 *        summary: Take Credits to  User
 *        operationId: takeCreditFromUser
 *        description: take credits
 *        produces:
 *          - application/json
 *        parameters:
 *         - name: idUser
 *           in: path
 *           required: true
 *         - name: User credit
 *           in: body
 *           schema:
 *            $ref: '#/definitions/UserCredit'
 *        responses:
 *            200:
 *              description: Estado atualizado corretamente
 *            400:
 *              description: Erro ao atualizar o estado
 * 
 * definitions: 
 *  Review:
 *    type: Object
 *    properties:
 *      text:
 *        type: string
 *        example: 'so bom'
 *      idUser:
 *        type: integer
 *        example: 1
 *      idSensor:
 *        type: integer
 *        example: 2
 *      date:
 *        type: string
 *        example: '2019-07-22 00:00:00'
 * 
 * 
 *  UserObject:
 *    type: Object
 *    properties:
 *      name:
 *        type: string
 *        example: ze
 *      username:
 *        type: string
 *        example: ze123
 *      password:
 *        type: string
 *        example: 1234567
 *      idType:
 *        type: integer
 *        example: 1
 *      email:
 *        type: string
 *        example: zeasd@ze.com
 *      taxAdress:
 *        type: string
 *        example: 12345
 *      taxZipCode:
 *        type: string
 *        example: 12345
 *      twoFactorAuth:
 *        type: integer
 *        example: 1
 *      disabled:
 *        type: integer
 *        example: 0
 *      points:
 *        type: integer
 *        example: 0
 *      credit:
 *        type: number
 *        example: 0
 *      image:
 *        type: string
 *        example: aqui
 * 
 *  UserHouse:
 *    type: Object
 *    properties:
 *      local:
 *        type: string
 *        example: rua do la
 *      adress:
 *        type: string
 *        example: rua do ali
 *  UserState:
 *    type: Object
 *    properties:
 *      disabled:
 *        type: integer
 *        example: 0
 *  UserType:
 *    type: Object
 *    properties:
 *      idType:
 *        type: integer
 *        example: 1 
 *  UserCredit:
 *    type: Object
 *    properties:
 *      credit:
 *        type: number
 *        example: 10 
 *  NewUser:
 *    type: Object
 *    properties:
 *      credit:
 *        type: number
 *        example: 400 
 *      name:
 *        type: string
 *        example: "'Alberto'"
 *      username:
 *        type: string
 *        example: "'AlbertoJJ'" 
 *      password:
 *        type: string
 *        example: "'1234d7'" 
 *      email:
 *        type: string
 *        example: "'alberto'"
 *      nif:
 *        type: integer
 *        example: 222333444 
 *      taxAdress:
 *        type: string
 *        example: "'Rua do Alberto'"
 *      taxZipCode:
 *        type: string
 *        example: "'1234568a'"
 *      contacto:
 *        type: integer
 *        example: 919191919
 *      idPackage:
 *        type: integer
 *        example: 1
 *      instalation:
 *        type: integer
 *        example: 1
 *      zipCode:
 *        type: string
 *        example: "'12345678a'"
 *      local:
 *        type: string
 *        example: "'Local'"
 *      adress:
 *        type: string
 *        example: "'Rua do Alberto'" 
 *      active:
 *        type: integer
 *        example: 1
 *      instaled:
 *        type: integer
 *        example: 0  
 *  */


router.get('/', (req, res, next) => {
    userController.getAll(res, next)
})

router.post('/', (req, res, next) => {
    userController.insert(req, res, next);
})
router.post('/firstRegister', (req, res, next) => {
    userController.firstRegister(req, res, next);
})

router.put('/:iduser', (req, res, next) => {
    userController.update(req, res, next)
})

// Delete from BD of a unverified user
router.delete('/:iduser', (req, res, next) => {
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