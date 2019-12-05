const mongoose = require("mongoose");
let rootUser = process.env.rootUserMongo
let rootPass = process.env.rootPassMongo

mongoose.connect(`mongodb+srv://${rootUser}:${rootPass}@devdbs4a-rxrjs.mongodb.net/test?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true })

let con = mongoose.connection

// console.log({rootUser, rootPass})
con.once('open', () => {
    console.log('Mongoose connected sucessfuly');
})

con.on('error', (err) => {
    console.log(err, "An error as ocured in Mongo Database");
})

module.exports = {
    connection: con,
    model: mongoose.model,
    schema: mongoose.Schema
};