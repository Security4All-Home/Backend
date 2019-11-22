const catModel = require("../../models/sql/category.model");

const crudCat = {
    getAll(res) {
        try {
            catModel.getAll((data) => {
                res.json({ success: true, data: data });
            })
        } catch (err) {
            res.json({ success: false, err: err })
        }
    },
    insert(req, res) {
        try {
            catModel.insert(req.body, function (data) {
                res.json({success: true, data: data})
            })
        } catch (error) {
            res.json({success: false, err: error})
        }
    },
    update(req, res) {
        try {
            console.log(req.params.id, "ID!!!!!!!!!")
            catModel.update(req.params.id, req.body, function (data) {
                res.json({ success: true, data: data})
            })
        } catch (err) {
            res.json({success: false, err: err})
        }
    }
}

module.exports = crudCat;