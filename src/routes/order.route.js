const router = require("express").Router();
const orderController = require("../controllers/sql/order.controller");

/** Get all orders  with sensors*/
router.get("/packages", (req, res, next) => {
  orderController.getOrdersWithPackages(req, res, next);
});

/** Get all orders with packages */
router.get("/sensors", (req, res, next) => {
  orderController.getOrdersWithSensors(req, res, next);
});

/** Get one order by id
 * saber se a order tem package ou sensores e trabalhar com isso
 */
router.get("/:idOrder", (req, res, next) => {
  orderController.getById(req, res, next);
});

/**  view all orders */
router.get("/", (req, res, next) => {
  orderController.getAll(req, res, next);
});
/** Insert an order with a Package*/
/**
 * @swagger
 *  /order/package:
 *    post:
 *      tags:
 *          - "order"
 *      description: Inserir uma order com uma package
 */
router.post("/package", (req, res, next) => {
  orderController.insertOrderPackage(req, res, next);
});

/** Insert an order with sensors */

/**
 * @swagger
 *  /order/sensors:
 *    post:
 *      tags:
 *          - "order"
 *      summary: Inserir sensores numa order
 *      description: Inserir uma order com sensores
 *      produces:
 *          - application/json
 *      consumes:
 *          - application/json
 *      parameters:
 *          - in: body
 *            name: body
 *            required: true
 *            schema:
 *              type: object
 *              properties:
 *                       type: object
 *                       sensors:
 *                            type: array
 *                            items:
 *                               type: object
 *                               properties:
 *                                 idSensor:
 *                                         type: integer
 *                                 quantity:
 *                                         type: integer
 *                       idUser:
 *                             type: integer
 *                       instalation:
 *                             type: number
 *                       payed:
 *                             type: number
 *                       active:
 *                             type: number
 *
 */
// sensors, idUser, instalation, payed, active
router.post("/sensors", (req, res, next) => {
  orderController.insertOrderSensors(req, res, next);
});

/** Update an order installation */
router.put("/instalation/:id", (req, res, next) => {
  orderController.updateInstaltion(req, res, next);
});

router.put("/payment/:id", (req, res, next) => {
  orderController.updatePayment(req, res, next);
});

router.put("/active/:id", (req, res, next) => {
  orderController.updateActive(req, res, next);
});

/** delete an order
 * é possivel que ao apagar uma order tenha que se apagar um user tambem
 */
router.delete("/:id", (req, res, next) => {
  orderController.deleteById(req, res, next);
});

module.exports = router;
