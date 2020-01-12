const router = require("express").Router();
const sensorController = require("../controllers/sql/sensor.controller");

//Create
/**Insert a sensor */
/**
 * @swagger
 *  /sensors/:
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
 * definitions:
 *  SensorItem:
 *    type: Object
 *    required:
 *    - name
 *    - description
 *    - stock
 *    - price
 *    - idCategory
 *    properties:
 *      name:
 *        type: string
 *        example: sensor de vacas
 *      description:
 *        type: string
 *        example: Este sensor deteta todas as Holstein na área
 *      stock:
 *        type: number
 *        example: 20
 *      price:
 *        type: number
 *        example: 9.99
 *      idCategory:
 *        type:number
 *        example:1
 */
router.post("/", (req, res, next) => {
  sensorController.addSensor(req, res, next);
});

//Read
router.get("/", (req, res, next) => {
  sensorController.getAll(req, res, next);
});
//ReadByID
router.get("/:id", (req, res, next) => {
  sensorController.getByID(req, res, next);
});
router.get("/house/:idHouse", (req, res, next) => {
  sensorController.getSensorHouse(req, res, next);
});
//ReadBYCategory
router.get("/category/:idCategory", (req, res, next) => {
  sensorController.getByCategory(req, res, next);
});
//Update Stock
router.put("/stock", (req, res, next) => {
  sensorController.updateSensorStock(req, res, next);
});
//Update
router.put("/:id", (req, res, next) => {
  sensorController.updateByID(req, res, next);
});
//Update State of sensor
router.put("/:idSensor/spaces/:idSpace", (req, res, next) => {
  sensorController.updateSensorState(req, res, next);
});
//Delete
router.delete("/:id", (req, res, next) => {
  sensorController.deleteByID(req, res, next);
});
router.post("/space", (req, res, next) => {
  sensorController.sensorSpace(req, res, next);
});
router.get("/space/:idSpace", (req, res, next) => {
  sensorController.getSensorSpace(req, res, next);
});
router.delete("/space/:idSensor/:idSpace", (req, res, next) => {
  sensorController.removeSensorSpace(req, res, next);
});
module.exports = router;
