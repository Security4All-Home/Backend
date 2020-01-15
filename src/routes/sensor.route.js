const router = require("express").Router();
const sensorController = require("../controllers/sql/sensor.controller");

//Create
/**Insert a sensor */
/**
 * @swagger
 * paths:
 *  /sensors:
 *     post:
 *        tags:
 *            - sensor
 *        summary: Adiciona um sensor à base de dados
 *        operationId: addSensor
 *        description: Adicionar um sensor à base de dados
 *        consumes:
 *            - application/json
 *        produces:
 *            - application/json
 *        parameters:
 *            - in: body
 *              name: sensorItem
 *              description: Sensor Item to add
 *              schema:
 *                $ref: '#/definitions/SensorItem'
 *        responses:
 *           200:
 *              description: item created
 *           400:
 *              description: invalid input, object invalid
 *     get:
 *        tags:
 *           - sensor
 *        summary: Vai buscar todos os sensores
 *        operationId: GetSensors
 *        description: Ir buscar os sensores à base de dados
 *        produces:
 *            - application/json
 *        responses:
 *           200:
 *              description: todos os sensores da base de dados
 *           400:
 *              description: Erro a ir buscar os sensores
 *  /sensors/{id}:
 *      get:
 *        tags:
 *           - sensor
 *        summary: Vai buscar um sensor específico
 *        operationId: GetSensorByID
 *        description: Ir buscar um sensor específico à base de dados
 *        produces:
 *          - application/json
 *        parameters:
 *          - name: id
 *            in: path
 *            required: true
 *        responses:
 *           200:
 *              description: todos os sensores da base de dados
 *           400:
 *              description: Erro a ir buscar os sensores
 *      put:
 *        tags:
 *          - sensor
 *        summary: Edita um sensor
 *        operationId: GetSensorByID
 *        description: Edita Um sensor especifico
 *        consumes:
 *          - application/json
 *        produces:
 *          - application/json
 *        parameters:
 *        - name: id
 *          in: path
 *          required: true
 *        - name: Sensor Body
 *          in: body
 *          schema:
 *            $ref: '#/definitions/SensorItem'
 *        responses:
 *           200:
 *              description: todos os sensores da base de dados
 *           400:
 *              description: Erro a ir buscar os sensores
 *      delete:
 *        tags:
 *          - sensor
 *        summary: Apaga um sensor
 *        operationId: DeleteSensor
 *        description: Apaga um sensor da base de dados
 *        produces:
 *          - application/json
 *        parameters:
 *          - name: id
 *            in: path
 *            required: true
 *        responses:
 *           200:
 *              description: Sensor removido com sucesso
 *           400:
 *              description: Erro ao apagar o sensor
 *  /sensors/house/{idHouse}:
 *       get:
 *        tags:
 *          - sensor
 *        summary: Vai buscar os sensores que estão numa casa
 *        operationId: GetSensorsInHouse
 *        description: Vai buscar todos os sensores que estão dentro dos espaços de uma casa
 *        produces:
 *          - application/json
 *        parameters:
 *          - name: idHouse
 *            in: path
 *            required: true
 *        responses:
 *          200:
 *            description: Todos os sensores da casa
 *          400:
 *            description: Erro ao ir buscar os sensores da casa
 *  /category/{idCategory}:
 *       get:
 *        tags:
 *          - sensor
 *        summary: Vai buscar os sensores numa categoria
 *        operationId: GetSensorsByCategory
 *        description: Vai buscar os sensores por categoria
 *        produces:
 *          - application/json
 *        parameters:
 *          - name: idCategory
 *            in: path
 *            required: true
 *        responses:
 *          200:
 *            description: Todos os sensores dentro da categoria
 *          400:
 *            description: Erro a ir buscar os sensores
 *  /sensors/stock:
 *       put:
 *        tags:
 *          - sensor
 *        summary: Altera o stock de múltiplos sensores
 *        operationId: UpdateSensorStock
 *        description: Altera o stock de múltiplos sensores
 *        consumes:
 *          - application/json
 *        produces:
 *          - application/json
 *        parameters:
 *          - name: stockArray
 *            in: body
 *            required: true
 *        responses:
 *          200:
 *            description: O stock foi alterado nos sensores desejados
 *          400:
 *            description: Erro ao atualizar o stock
 *  /sensors/{idSensor}/spaces/{idSpace}:
 *        put:
 *          tags:
 *            - sensor
 *          summary: Altera o estado de um sensor
 *          operationId: UpdateSensorState
 *          description: Altera o estado de um sensor na tabela sensor_space entre 1 e 0
 *          produces:
 *            - application/json
 *          parameters:
 *            - name: idSensor
 *              in: path
 *              required: true
 *            - name: idSpace
 *              in: path
 *              required: true
 *          responses:
 *            200:
 *              description: Estado atualizado corretamente
 *            400:
 *              description: Erro ao atualizar o estado
 *  /sensors/space:
 *        post:
 *          tags:
 *            - sensor
 *          summary: Acrescenta um sensor a um espaço
 *          operationId: AddSensorToSpace
 *          description: Adiciona um sensor a um espaço com o estado ativo 1
 *          produces:
 *            - application/json
 *          parameters:
 *            - name: idSensor
 *              in: query
 *              required: true
 *              schema:
 *                type: integer
 *            - name: idSpace
 *              in: query
 *              required: true
 *              schema:
 *                type:integer
 *          responses:
 *            200:
 *              description: Sensor adicionado com sucesso
 *            400:
 *              description: Erro ao adicionar o sensor
 *  /sensors/space/{idSpace}:
 *        get:
 *          tags:
 *            - sensor
 *          summary: Ir buscar os sensores num espaço
 *          operationId: GetSensorsInSpace
 *          description: Ir Buscar os sensores todos que estão num espaço
 *          produces:
 *            - application/json
 *          parameters:
 *            - name: idSpace
 *              in: path
 *              required: true
 *          responses:
 *            200:
 *              description: Sensor adicionado com sucesso
 *            400:
 *              description: Erro ao adicionar o sensor
 *        delete:
 *          tags:
 *            - sensor
 *          summary: Remover um sensor do espaço
 *          operationId: RemoveSensorFromSpace
 *          description: Remover um sensor de um espaço
 *          produces:
 *            - application/json
 *          parameters:
 *            - name: idSpace
 *              in: path
 *              required: true
 *            - name: idSensor
 *              in: query
 *              required: true
 *              schema:
 *                type: Integer
 *          responses:
 *            200:
 *              description: Sensor removido com sucesso
 *            400:
 *              description: Erro ao remover o sensor
 * definitions:
 *  SensorItem:
 *    properties:
 *      name:
 *        type: string
 *        example: sensor de vacas
 *      description:
 *        type: string
 *        example: Este sensor deteta todas as Holstein na área
 *      stock:
 *        type: integer
 *        example: 20
 *      price:
 *        type: number
 *        format: float
 *        example: 9.99
 *      idCategory:
 *        type: integer
 *        example: 1
 */
router.post("/", (req, res, next) => {
  console.log("Foste Convocado");
  sensorController.addSensor(req, res, next);
}); //Feito

//Read
router.get("/", (req, res, next) => {
  sensorController.getAll(req, res, next);
}); //Feito
//ReadByID
router.get("/:id", (req, res, next) => {
  sensorController.getByID(req, res, next);
}); //Feito
router.get("/house/:idHouse", (req, res, next) => {
  sensorController.getSensorHouse(req, res, next);
}); //Feito
//ReadBYCategory
router.get("/category/:idCategory", (req, res, next) => {
  sensorController.getByCategory(req, res, next);
}); //Feito
//Update Stock
router.put("/stock", (req, res, next) => {
  sensorController.updateSensorStock(req, res, next);
}); //Feito
//Update
router.put("/:id", (req, res, next) => {
  sensorController.updateByID(req, res, next);
}); //Feito
//Update State of sensor
router.put("/:idSensor/spaces/:idSpace", (req, res, next) => {
  sensorController.updateSensorState(req, res, next);
}); //Feito
//Delete
router.delete("/:id", (req, res, next) => {
  sensorController.deleteByID(req, res, next);
}); //Feito
router.post("/space", (req, res, next) => {
  sensorController.sensorSpace(req, res, next);
}); //Feito
router.get("/space/:idSpace", (req, res, next) => {
  sensorController.getSensorSpace(req, res, next);
}); //Feito
router.delete("/space/:idSpace", (req, res, next) => {
  console.log("req", req.query.idSensor);
  sensorController.removeSensorSpace(req, res, next);
}); //Feito
module.exports = router;
