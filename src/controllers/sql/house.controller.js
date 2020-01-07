const houseModel = require("../../models/sql/house.model");

const houseController = {
    getHouses(req, res, next) {
        try {
            houseModel.getHouses((err, rows) => {
                if(err) {
                    next(err); return;
                }
                else {
                    res.json({success: true, data: rows})
                }
            })
        } catch (err) {

        }
    }
}

module.exports = houseController