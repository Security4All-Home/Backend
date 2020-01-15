const bcrypt = require("bcryptjs");
const authModel = require("../../models/sql/auth.model");
const userModel = require('../../models/sql/user.model');
const jwt = require('../../assets/scripts/jwt');


const authCtrl = {
    login(req, res, next) {
        try {
            authModel.login(req.body, (err, user) => {
                if (err) {
                    next(err);
                    return;
                }
                user = user[0]
                req.idUser = user.idUser
                if (user == undefined) {
                    next({ error: "Esse email Ao existe", email: req.body.email })
                    return;
                }
                console.log(user)
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    let token = jwt.createAccessToken(req);
                    console.log(token);
                    res.cookie('token', token)
                    res.set('x-access-token', token)
                    res.json({ success: true, data: user });
                } else {
                    res.json({ success: false, msg: "as passwords não correspondem" })
                }
            });
        } catch (error) {
            console.log(error, "kakakakalakalakalakalak")
            next(error);
            return;
        }
    },
    register(req, res, next) {
        try {
            userModel.insert(req.body, (err, data) => {
                if (err) {
                    next(err);
                    return;
                }

                res.json({ success: true, data: data })
            })
        } catch (error) {
            next(error);
            return;
        }
    }
}

module.exports = authCtrl;