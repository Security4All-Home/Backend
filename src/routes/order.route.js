const router = require("express").Router();
const orderController = require("../controllers/sql/order.controller");

/** Get all orders */
router.get("/")

/** Get one order by id */
router.get("/:id")

/** Insert an order */
router.post("/insert")

/** Update an order */
router.put("/update/:id")

/** delete an order
 * é possivel que ao apagar uma order tenha que se apagar um user tambem
 */
router.delete("/delete/:id")

module.exports = router