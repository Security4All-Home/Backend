const achievement = require("../../models/mongo/achievement.model");

const crudAchievements = {
  getAll(res, next) {
    try {
      achievement.find({}, (err, results) => {
        if (err) next(err);
        res.json({ success: true, data: results });
      });
    } catch (err) {
      next(err);
    }
  },
  insert({ body }, res, next) {
    try {
      console.log(body, "bodyyyy");
      let newAchievement = new achievement(body);

      newAchievement.save((err, savedErr) => {
        if (err) {
          next(err);
          return;
        }

        res.json({ success: true, msg: "Achievement saved sucessfully!" });
      });
    } catch (err) {
      next(err);
    }
  },
  update(req, res, next) {
    try {
      achievement.findByIdAndUpdate(
        req.params.id,
        {
          description: req.body.description,
          goal: req.body.goal,
          imageType: req.body.imageType,
          imageDefault: req.body.imageDefault
        },
        { new: true },
        (err, document) => {
          if (err) {
            next(err);
            return;
          }
          console.log(document);
          res.json({ success: true, data: document });
        }
      );
    } catch (err) {
      next(err);
    }
  },

  deleteAchievement(req, res, next) {
    try {
      achievement.findByIdAndRemove(req.params.id, (err, document) => {
        if (err) {
          next(err);
          return;
        }
        res.json({ success: true, msg: "Apagado com sucesso" });
      });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = crudAchievements;
