const achievement = require("../../models/mongo/achievement.model")

const crudAchievements = {
    getAll(res, next) {
        achievement.find({}, (err, results) => {
            if (err) next(err)
            res.json({ success: true, data: results })
        })
    },
    insert({ body }, res, next) {
        let newAchievement = new achievement({
            id: body.id,
            description: body.description,
            type: body.type,
            goal: body.goal
        })

        newAchievement.save((err, savedErr) => {
            if (err) {
                next(err);
                return
            }

            res.json({ success: true, msg: "Achievement saved sucessfully!" })
        })
    }
}

module.exports = crudAchievements;