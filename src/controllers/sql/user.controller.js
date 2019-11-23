const userModel = require("../../models/sql/user.model");

const userCrud = {
    getAll(res, next) {
        try {
            userModel.getAll((error, data) => {
                if (error) {
                    next(error);
                    return;
                }

                res.json({ success: true, data: data })
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
                res.json({ success: true, data: data })
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

                res.json({ success: true, data: data })
            })
        } catch (err) {
            next(err);
            return;
        }
    },
    update(req, res, next) {
        try {
            userModel.update(req.params, req.body, (err, data) => {
                if(err) {
                    next(err);
                    return;
                }

                res.json({success: true, data: data})
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

                res.json({success: true, data: data})
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

                res.json({ success: true, data });
            })
        } catch (error) {
            next(error);
            return;
        }
    }
}

module.exports = userCrud;