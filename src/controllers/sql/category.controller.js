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
    update(req, res) {
        try {
            console.log(req.params.id, "ID!!!!!!!!!")
            catModel.upda(req.params.id, req.body, function (data) {
                res.json({ success: true, data: data})
            })
        } catch (err) {
            res.json({success: false, err: err})
        }
    }
}

module.exports = crudCat;