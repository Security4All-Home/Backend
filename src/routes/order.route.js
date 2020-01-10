const router = require("express").Router();
const orderController = require("../controllers/sql/order.controller");

/** Get all orders */
router.get("/")

/** Get one order by id */
router.get("/:id")

/** Insert an order with a Package*/
router.post("/package", (req, res, next) => {
    orderController.insertOrderPackage(req, res, next);
})

/** Insert an order with sensors */
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