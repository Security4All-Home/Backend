const mysql = require("mysql");
const progressBar = require("progress")

/**
 * Handle lost connection by mysql
 * https://stackoverflow.com/questions/20210522/nodejs-mysql-error-connection-lost-the-server-closed-the-connection
 */
let progress;
const dbConfig = {
  host: process.env.serverSql,
  user: process.env.rootUserSql,
  password: process.env.rootPassSql,
  database: process.env.databaseSql,
  port: process.env.portSql,
  multipleStatements: true
  // connectTimeout: 1860000
};

/**
 * recover after fatal, ver depois (https://stackoverflow.com/questions/33652697/node-js-process-cannot-recover-after-mysql-turned-off-then-turn-on)
 */
let connection = null;
let tabelsArray = ["user", "order", "package", "sensor", "space"];
let index = 0;
function connectToDatabase() {
  connection = mysql.createConnection(dbConfig);

  connection.connect(err => {
    if (err) {
      console.log(err, "Error ocurred in mysql");
      let timerDB = setTimeout(() => {
        connectToDatabase();
        clearInterval(timerDB);
      }, 5000); // We introduce a delay before attempting to reconnect,
    }
    // connection.query('SET PERSIST interactive_timeout=1860000;')
    console.time("tempo de atividade DB");
    console.log("SQL Database connected with the id " + connection.threadId);

    let timerRestartDB = setTimeout(() => {
      if(index == tabelsArray.length) index = 0;
      let query = "select * from " + tabelsArray[index] + ";";
      connection.query(query, (err, rows, fields) => {
        if(err) {
          throw err;
        }
        index++;
        console.log(query, "Query para evitar que a DB vá abaixo!!!!");
      }, 1850000);
    })
  });

  connection.on("end", parameter => {
    // Não é isto que apanha o erro quando a conexão fecha por demasiado tempo de inatividade
    console.log(parameter);
  });

  connection.on("error", error => {
    console.timeEnd("tempo de atividade DB");
    // console.log(error, "Tentar apanhar erro de inatividade");
    console.log(error.code, "Connection Error Code!");
    if (error.code === "PROTOCOL_CONNECTION_LOST") {
      connectToDatabase();
    } else {
      throw error;
    }
  });
}

function restartDB() {
  // progress = new progressBar(':bar Recomeçar DB\n ', {total: 50});
  // progress.tick();



}
connectToDatabase();

module.exports = connection;
