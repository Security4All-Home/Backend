const router = require("express").Router();
const orderController = require("../controllers/sql/order.controller");

/** Get all orders */
router.get("/", (req, res, next) => {
    orderController.getAll(req, res, next);
})

/** Get one order by id 
 * saber se a order tem package ou sensores e trabalhar com isso
*/
router.get("/:id")

/**  view all orders */
router.get("/", (req, res, next) => {
    
})
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
})

/** Insert an order with sensors */

/**
 * @swagger
 *  /order/sensors:
 *    post:
 *      tags:
 *          - "order"
 *      description: Inserir uma order com sensores
 */
router.post("/sensors", (req, res, next) => {
    orderController.insertOrderSensors(req, res, next);
})

/** Update an order */
router.put("/:id")

/** delete an order
 * é possivel que ao apagar uma order tenha que se apagar um user tambem
 */
router.delete("/:id")

module.exports = router