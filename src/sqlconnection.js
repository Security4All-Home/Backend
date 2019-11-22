const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.serverSql,
    user: process.env.rootUserSql,
    password: process.env.rootPassSql,
    database:   process.env.databaseSql,
    port: process.env.portSql
})

connection.connect((err) => {
    if (err) {
        console.log(err, "Error ocurred in mysql")
        return;
    }

    console.log('SQL Database connected with the id ' + connection.threadId)
})

module.exports = connection