const router = require('express').Router()
const categoryController = require("../controllers/sql/category.controller")

router.get('/all', (req, res) => {
    categoryController.getAll(res);
})

router.get('/:name', (req, res) => {

})

router.put('/update/:id', (req, res) => {
    categoryController.update(req, res)
})

router.delete('/delete/:name', (req, res) => {

})

module.exports = router;