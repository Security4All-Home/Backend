const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const achievementSchema = new Schema({
  description: {
    type: String,
    unique: false,
    required: true,
    default: null
  },
  goal: {
    type: String,
    unique: false,
    required: true,
    default: null
  },
  imageType: {
    type: { type: String, default: null },
    image: { type: String, default: null }
  },
  imageDefault: {
    type: String,
    default:
      "https://pbs.twimg.com/media/ENwUVtvWkAA3k5x?format=png&name=360x360"
  }
});

const achievementModel = model("achievement", achievementSchema);

module.exports = achievementModel;
