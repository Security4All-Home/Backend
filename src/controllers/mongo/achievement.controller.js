const achievement = require("../../models/mongo/achievement.model")

const crudAchievements = {
    getAll(res, next) {
        try {
            achievement.find({}, (err, results) => {
                if (err) next(err)
                res.json({ success: true, data: results })
            })
        } catch (err) {
            next(err);
        }
    },
    insert({ body }, res, next) {
        try {
            console.log(body, "bodyyyy")
            let newAchievement = new achievement(body)

            newAchievement.save((err, savedErr) => {
                if (err) {
                    next(err);
                    return;
                }

                res.json({ success: true, msg: "Achievement saved sucessfully!" })
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = crudAchievements;