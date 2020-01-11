const router = require('express').Router()
const categoryController = require("../controllers/sql/category.controller")

router.get('/all', (req, res, next) => {
    categoryController.getAll(res, next);
})

router.get('/:id', (req, res, next) => {
    categoryController.getById(req, res, next)
})

router.post('/insert', (req, res, next) => {
    categoryController.insert(req, res, next)
})

router.put('/update/:id', (req, res, next) => {
    categoryController.update(req, res, next)
})

router.delete('/delete/:id', (req, res, next) => {
    categoryController.delete(req, res, next);
})

module.exports = router;