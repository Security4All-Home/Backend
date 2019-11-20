const achievement = require("../../models/mongo/achievement.model")

const crudAchievements = {
    getAll(res) {
        achievement.find({}, (err, results) => {
            if(err) throw err
            res.json({success: true, data: results})
        })
    }
}

module.exports = crudAchievements;