const route = require("express").Router();
const achievementController = require("../controllers/mongo/achievement.controller");

route.get("/all", (req, res, next) => {
  try {
    achievementController.getAll(res, next);
  } catch (err) {
    res.json({ success: false, err: err });
  }
}),
  route.post("/", (req, res, next) => {
    try {
      achievementController.insert(req, res, next);
    } catch (err) {
      res.json({ success: false, err: err });
    }
  });

//Edit
route.put("/:id", (req, res, next) => {
  achievementController.update(req, res, next);
});
//Delete
route.delete("/:id", (req, res, next) => {
  achievementController.deleteAchievement(req, res, next);
});
module.exports = route;
