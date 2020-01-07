const mysql = require('mysql');

/**
 * Handle lost connection by mysql
 * https://stackoverflow.com/questions/20210522/nodejs-mysql-error-connection-lost-the-server-closed-the-connection
 */

const dbConfig = {
    host: process.env.serverSql,
    user: process.env.rootUserSql,
    password: process.env.rootPassSql,
    database: process.env.databaseSql,
    port: process.env.portSql,
    multipleStatements: true
    // connectTimeout: 200000
}

let connection = null;
function connectToDatabase() {
    connection = mysql.createConnection(dbConfig);

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
        // console.log(error, "Tentar apanhar erro de inatividade");
        console.log(error.code, "Connection Error Code!");
        if (error.code == "PROTOCOL_CONNECTION_LOST") {
            connection.end();
            console.log("VOLTAR A FAZER A CONEXÃO")
            connectToDatabase();
        }
    })
}

connectToDatabase();

module.exports = connection;
