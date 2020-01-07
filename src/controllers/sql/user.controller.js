const userModel = require("../../models/sql/user.model");

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
    insert(req, res, next) {
        try {
            userModel.insert(req.body, (error, data) => {
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
            userModel.insertHouse(req.body, (error, data) => {
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
    insertSpace(req, res, next) {
        try {
            userModel.insertSpace(req.body, (error, data) => {
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
    //GET houses by user
    getHousesByUser(req, res, next) {
        try {
            userModel.getHousesByUser(req.params, (err, data) => {
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