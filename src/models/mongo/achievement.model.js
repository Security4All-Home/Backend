const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const achievementSchema = new Schema({
    id: {
        type: Number,
        /** Required */
    },
    description: {
        type: String
    },
    type: {
        type: String
    },
    goal: Number
})

const achievementModel = model("achievement", achievementSchema);

module.exports = achievementModel;