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
    },
    //GET houses by user
    getHousesByUser(req, res, next) {
        try {
            houseModel.getHousesByUser(req.params, (err, data) => {
                if (err) {
                    next(err);
                    return;
                }

                res.json({
                    success: true,
                    data
                });
            })
        } catch (error) {
            next(error);
            return;
        }
    },
    insertSpace(req, res, next) {
        try {
            houseModel.insertSpace(req.body, (error, data) => {
                if (error) {
                    next(error);
                    return;
                }

                res.json({
                    success: true,
                    data: data
                })
            })
        } catch (err) {
            next(err);
            return;
        }
    },
    insertHouse(req, res, next) {
        try {
            houseModel.insertHouse(req.body, (error, data) => {
                if (error) {
                    next(error);
                    return;
                }

                res.json({
                    success: true,
                    data: data
                })
            })
        } catch (err) {
            next(err);
            return;
        }
    }
}

module.exports = houseController