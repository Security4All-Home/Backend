const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const alertSchema = new Schema({
  idUser: Number,
  idHouse: {
    type: Number,
    default: 0
  },
  idSpace: { type: Number, default: 0 },
  idSensor: { type: Number, default: 0 },
  alertText: { type: String },
  createdAt: { type: Date, default: Date.now },
  alertType: { type: String }
});

const alertModel = model("alert", alertSchema);

module.exports = alertModel;
