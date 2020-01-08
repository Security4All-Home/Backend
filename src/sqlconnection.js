const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.serverSql,
    user: process.env.rootUserSql,
    password: process.env.rootPassSql,
    database:   process.env.databaseSql,
    port: process.env.portSql,
    multipleStatements: true
})

connection.connect((err) => {
    if (err) {
        console.log(err, "Error ocurred in mysql")
        return;
    }
    console.time('tempo de atividade DB');
    console.log('SQL Database connected with the id ' + connection.threadId)
})

connection.on('end', (parameter) => {
    // Não é isto que apanha o erro quando a conexão fecha por demasiado tempo de inatividade
    console.log(parameter)
})

connection.on('error', (error) => {
    console.timeEnd('tempo de atividade DB');
    console.log(error, "Tentar apanhar erro de inatividade");
})
module.exports = connection