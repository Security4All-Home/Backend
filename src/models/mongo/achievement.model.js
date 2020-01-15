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
    image: {
        type: String,
        unique: false,
        required: true,
        default: null
    },
    imageDefault: {
        type: String,
        default: "https://pbs.twimg.com/media/ENwUVtvWkAA3k5x?format=png&name=360x360"
    }
})

const achievementModel = model("achievement", achievementSchema);

module.exports = achievementModel;