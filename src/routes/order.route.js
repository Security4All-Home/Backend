const router = require("express").Router();
const orderController = require("../controllers/sql/order.controller");

/** Get all orders  with sensors*/
router.get("/withpackages", (req, res, next) => {
    orderController.getOrdersWithPackages(req, res, next);
})

/** Get all orders with packages */
router.get("/withsensors", (req, res, next) => {
    orderController.getOrdersWithSensors(req, res, next);
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

/** Update an order installation */
router.put("/instalation/:id", (req, res, next) => {
    orderController.updateInstaltion(req, res, next)
})

router.put("/payment/:id", (req, res, next) => {
    orderController.updatePayment(req, res, next)
})

router.put("/active/:id", (req, res, next) => {
    orderController.updateActive(req, res, next)
})

/** delete an order
 * é possivel que ao apagar uma order tenha que se apagar um user tambem
 */
router.delete("/:id")

module.exports = router