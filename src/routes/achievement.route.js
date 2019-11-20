const route = require("express").Router();
const achievementController = require("../controllers/mongo/achievement.controller")

route.get("/all", (req, res) => {
    try {
        achievementController.getAll(res)
    } catch (err) {
        res.json({ success: false, err: err })
    }
})

module.exports = route;