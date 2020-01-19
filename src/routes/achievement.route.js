const route = require("express").Router();
const achievementController = require("../controllers/mongo/achievement.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

route.get("/all", (req, res, next) => {
  try {
    achievementController.getAll(res, next);
  } catch (err) {
    res.json({ success: false, err: err });
  }
})
route.post("/"/*verifyToken*/, (req, res, next) => {
  try {
    achievementController.insert(req, res, next);
  } catch (err) {
    res.json({ success: false, err: err });
  }
});

//Edit
route.put("/:id"/*verifyToken*/, (req, res, next) => {
  achievementController.update(req, res, next);
});
//Delete
route.delete("/:id"/*verifyToken*/, (req, res, next) => {
  achievementController.deleteAchievement(req, res, next);
});
module.exports = route;
