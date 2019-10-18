const router = require("express").Router();

router.get("/testpage", (req, res) => {
    res.send("<h1>Test Page</h1>");
})
router.get("/testerror", (req, res) => {
    throw Error("Erro da rota /test")
})

module.exports = router;