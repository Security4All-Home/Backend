const catModel = require("../../models/sql/category.model");

const crudCat = {
    getAll(res, next) {
        try {
            catModel.getAll((data) => {
                res.json({ success: true, data: data });
            }, next)
        } catch (err) {
            next(error)
        }
    },
    getById(req, res, next) {
        try {
            catModel.getById(req.params, (data) => {
                res.json({ success: true, data: data })
            }, next)
        } catch (error) {
            next(error)
        }
    },
    insert(req, res, next) {
        try {
            catModel.insert(req.body, function (data) {
                res.json({ success: true, data: data })
            }, next)
        } catch (error) {
            next(error)
        }
    },
    update(req, res, next) {
        try {
            catModel.update(req.params.id, req.body, function (data) {
                res.json({ success: true, data: data })
            }, next)
        } catch (err) {
            next(error)
        }
    },
    delete(req, res, next) {
        try {
            catModel.delete(req.params, function (data) {
                res.json({ success: true, data: data })
            }, next)
        } catch (error) {
            next(error)
        }
    },
    delete(req, res, next) {
        try {
            catModel.delete(req.params, function (data) {
                res.json({success: true, data: data})
            }, next)
        } catch (error) {
            next(error) && res.json({success: false, err: error})
        }
    }
}

module.exports = crudCat;