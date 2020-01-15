const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const achievementSchema = new Schema({
    id: {
        type: Number,
        unique: true,
    },
    description: {
        type: String,
        unique: false,
        required: true,
        default: null
    },
    type: {
        type: String,
        unique: false,
        required: true,
        default: null
    },
    goal: {
        type: Number,
        unique: false,
        required: true,
        default: null
    },
})

const achievementModel = model("achievement", achievementSchema);

module.exports = achievementModel;