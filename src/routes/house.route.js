const router = require("express").Router();
const houseController = require("../controllers/sql/house.controller");
const {  verifyToken } = require("../middlewares/auth.middleware");


/**
 * @swagger
 * paths:
 *  /house:
 *     get:
 *       tags:
 *         - house
 *       summary: Lista todas as casas
 *       operationId: getHouses
 *       description: Lista todas as casas
 *       produces:
 *        - application/json
 *       responses:
 *         200:
 *          description: Todos as casas
 *         400:
 *          description: Erro ao ir buscar todas as casas 
 *  /house/insertSpace:
 *     post:
 *        tags:
 *            - house
 *        summary: Adiciona um espaço
 *        operationId: insertSpace
 *        description: Adiciona um espaço à base de dados
 *        consumes:
 *            - application/json
 *        produces:
 *            - application/json
 *        parameters:
 *            - in: body
 *              schema:
 *                $ref: '#/definitions/Spaces'
 *        responses:
 *            200:
 *              description: Espaço adicionado
 *            400:
 *              description: Erro ao adicionar espaço
 *  /house/insertHouse:
 *     post:
 *        tags:
 *            - house
 *        summary: Adiciona uma casa
 *        operationId: insertHouse
 *        description: Adiciona uma casa à base de dados
 *        consumes:
 *            - application/json
 *        produces:
 *            - application/json
 *        parameters:
 *            - in: body
 *              schema:
 *                $ref: '#/definitions/Houses'
 *        responses:
 *            200:
 *              description: Casa adicionada
 *            400:
 *              description: Erro ao adicionar casa
 * /house/{id}:
 *      get:
 *          tags:
 *              - house
 *          summary: Lista as houses com o ID do user inserido
 *          operationId: getHousesByUser
 *          description: Lista as houses com o ID do user inserido
 *          produces:
 *            - application/json
 *          parameters:
 *          - name: id
 *            in: path
 *            required: true
 *          responses:
 *             200:
 *              description: Todas as houses do user indicado
 *             400:
 *              description: Erro ao ir buscar as houses
 * 
 * definitions: 
 * 
 *  Spaces:
 *    type: Object
 *    properties:
 *      idHouse:
 *        type: integer
 *        example: 222
 *      description:
 *        type: string
 *        example: "'cozinha'"
 * 
 * 
 *  Houses:
 *    type: Object
 *    properties:
 *      idUser:
 *        type: string
 *        example: '1'
 *      zipcode:
 *        type: string
 *        example: '666'
 *      local:
 *        type: string
 *        example: 'Rua Terceira'
 *      adress:
 *        type: string
 *        example: 'Terceira No 444'
 *  */


/** Get all houses */
router.get("/",  verifyToken, (req, res, next) => {
    houseController.getHouses(req, res, next)
})

/** Get Houses by User */
router.get('/:id',  verifyToken, (req, res, next) => {
    houseController.getHousesByUser(req, res, next);
})

/** Insert Space */
router.post('/insertSpace'/*verifyToken*/,  (req, res, next) => {
    houseController.insertSpace(req, res, next);
})

/** Insert House */
router.post('/insertHouse',  verifyToken, (req, res, next) => {
    houseController.insertHouse(req, res, next);
})



module.exports = router;