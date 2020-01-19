const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const alertSchema = new Schema({
  alertText: { type: String },
  createdAt: { type: Date, default: Date.now },
  alertType: { type: String }
});

const alertModel = model("alert", alertSchema);

module.exports = alertModel;
