const orderModel = require("../../models/sql/order.model");

const orderCrud = {
    insertOrderPackage(req, res, next) {
        try {
            orderModel.insertOrderPackage(req.body, (err, data) => {
                if (err) {
                    next(err);
                    return;
                }
                res.json({ success: true, data: data })
            })
        } catch (err) {
            next(err);
        }
    },
    insertOrderSensors(req, res, next) {
        try {
            orderModel.insertOrderSensors(req.body, (err, data) => {
                if(err) {
                    next(err);
                    return;
                }

                res.json({success: true, data: data});
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = orderCrud;