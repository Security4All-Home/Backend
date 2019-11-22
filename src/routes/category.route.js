const router = require('express').Router()
const categoryController = require("../controllers/sql/category.controller")

router.get('/all', (req, res) => {
    categoryController.getAll(res);
})

router.get('/:id', (req, res) => {
    categoryController.getById(req, res)
})

router.post('/insert', (req, res) => {
    categoryController.insert(req, res)
})

router.put('/update/:id', (req, res) => {
    categoryController.update(req, res)
})

router.delete('/delete/:id', (req, res, next) => {
    categoryController.delete(req, res, next);
})

module.exports = router;