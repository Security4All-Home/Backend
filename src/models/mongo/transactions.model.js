const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const transactionsSchema = {
    idUser: {
        type: Number,
        require: true
    },
    creditUsed: {
        type: Number,
        require: true
    }, 
    date: {
        type: String,
        default: new Date().toISOString().split('T').join(' ').split('Z')[0]
    }
}

const transactionModel = model("transaction", transactionsSchema);

module.exports = transactionModel;