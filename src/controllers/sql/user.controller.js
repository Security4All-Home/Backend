const userModel = require("../../models/sql/user.model");
const houseController = require("../../models/sql/house.model");

const userCrud = {
    getAll(res, next) {
        try {
            userModel.getAll((error, data) => {
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
    getById(req, res, next) {
        try {
            userModel.getById(req.params, (error, data) => {
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
    // Get user type by id
    getUserType(req, res, next) {
        try {
            userModel.getUserType(req.params, (error, data) => {
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
    insert(req, res, next) {
        try {
            let finalData = {}
            userModel.insert(req.body.user, (error, data) => {
                if (error) {
                    next(error);
                    return;
                }
                
                finalData.userId = data.insertId

                houseModel.insert(req.body.house)
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

    /*
    firstRegister(req, res, next) {
        try {
            userModel.firstRegister(req.body, (error, data) => {
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
    */
    
    insertReview(req, res, next) {
        try {
            userModel.insertReview(req.body, (error, data) => {
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
    
    update(req, res, next) {
        try {
            userModel.update(req.params, req.body, (err, data) => {
                if (err) {
                    next(err);
                    return;
                }

                res.json({
                    success: true,
                    data: data
                })
            })
        } catch (error) {
            next(error);
            return;
        }
    },
    delete(req, res, next) {
        try {
            userModel.delete(req.params, (error, data) => {
                if (error) {
                    next(error);
                    return;
                }

                res.json({
                    success: true,
                    data: data
                })
            })
        } catch (error) {
            next(error);
            return;
        }
    },
    getUsersByHouse(req, res, next) {
        try {
            userModel.getUsersByHouse(req.params, (err, data) => {
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
    
    //UPDATE USERSHOUSES
    updateUserHouses(req, res, next) {
        try {
            userModel.updateUserHouses(req.params, req.body, (err, data) => {
                if (err) {
                    next(err);
                    return;
                }

                res.json({
                    success: true,
                    data: data
                })
            })
        } catch (error) {
            next(error);
            return;
        }
    },
    //get sensores by user
    getSensorByUser(req, res, next) {
        try {
            userModel.getSensorByUser(req.params, (error, data) => {
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

    //update sensores by user

    updateSensor(req, res, next) {
        try {
            userModel.updateSensor(req.params, req.body, (err, data) => {
                if (err) {
                    next(err);
                    return;
                }

                res.json({
                    success: true,
                    data: data
                })
            })
        } catch (error) {
            next(error);
            return;
        }
    },

    //add sensor to space
    addSensorToSpace(req, res, next) {
        try {
            userModel.addSensorToSpace(req.params, req.body, (err, data) => {
                if (err) {
                    next(err);
                    return;
                }

                res.json({
                    success: true,
                    data: data
                })
            })
        } catch (error) {
            next(error);
            return;
        }
    },

    //update order to paid
    updateOrderPayment(req, res, next) {
        try {
            userModel.updateOrderPayment(req.params, req.body, (err, data) => {
                if (err) {
                    next(err);
                    return;
                }

                res.json({
                    success: true,
                    data: data
                })
            })
        } catch (error) {
            next(error);
            return;
        }
    },

    //update order's active state (0 or 1)   
    deleteLogicOrder(req, res, next) {
        try {
            userModel.deleteLogicOrder(req.params, req.body, (err, data) => {
                if (err) {
                    next(err);
                    return;
                }

                res.json({
                    success: true,
                    data: data
                })
            })
        } catch (error) {
            next(error);
            return;
        }
    },

    //update user's disable state (0 or 1) 
    deleteLogicUser(req, res, next) {
        try {
            userModel.deleteLogicUser(req.params, req.body, (err, data) => {
                if (err) {
                    next(err);
                    return;
                }

                res.json({
                    success: true,
                    data: data
                })
            })
        } catch (error) {
            next(error);
            return;
        }
    },

    //update user type (1-Admin or 2-User) 
    editUserType(req, res, next) {
        try {
            userModel.editUserType(req.params, req.body, (err, data) => {
                if (err) {
                    next(err);
                    return;
                }

                res.json({
                    success: true,
                    data: data
                })
            })
        } catch (error) {
            next(error);
            return;
        }
    },

    //verify user 
    verifyUser(req, res, next) {
        try {
            userModel.verifyUser(req.params, req.body, (err, data) => {
                if (err) {
                    next(err);
                    return;
                }

                res.json({
                    success: true,
                    data: data
                })
            })
        } catch (error) {
            next(error);
            return;
        }
    },

    //Add credits to user by id
    addCreditToUser(req, res, next) {
        try {
            userModel.addCreditToUser(req.params, req.body, (err, data) => {
                if (err) {
                    next(err);
                    return;
                }

                res.json({
                    success: true,
                    data: data
                })
            })
        } catch (error) {
            next(error);
            return;
        }
    },

     //take credits from an user by id
     takeCreditsFromUser(req, res, next) {
        try {
            userModel.takeCreditsFromUser(req.params, req.body, (err, data) => {
                if (err) {
                    next(err);
                    return;
                }

                res.json({
                    success: true,
                    data: data
                })
            })
        } catch (error) {
            next(error);
            return;
        }
    },

    //get espaços by user
    getEspacosByUser(req, res, next) {
        try {
            userModel.getEspacosByUser(req.params, (error, data) => {
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

    //get package by user
    getPackageByUser(req, res, next) {
        try {
            userModel.getPackageByUser(req.params, (error, data) => {
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

    //get review by user
    getReviewByUser(req, res, next) {
        try {
            userModel.getReviewByUser(req.params, (error, data) => {
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

}

module.exports = userCrud;