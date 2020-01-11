const achievement = require("../../models/mongo/achievement.model")

const crudAchievements = {
    getAll(res, next) {
        achievement.find({}, (err, results) => {
            if(err) next(err)
            res.json({success: true, data: results})
        })
    }
}

module.exports = crudAchievements;