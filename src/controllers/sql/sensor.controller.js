const sensorModel = require("../../models/sql/sensor.model")

const crudSensor = {
    //Create

    addSensor(req, res) {
        try {
            sensorModel.addSensor(req.body, function (data) {
                res.status(200).json({ success: true, data: data })
            })
        } catch (error) {
            res.status(400).json({ success: false, err: error })
        }
    }
}

module.exports=crudSensor