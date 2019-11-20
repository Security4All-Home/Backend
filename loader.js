const express = require('express');
const server = express();

/** Ler as variaveis de ambiente */
require('dotenv').config()

/** Database connections */
const mongoConnection = require('./src/mongoconnection');
const mysqlConnection = require('./src/sqlconnection')

/** Onde os caminhos e basicamante a aplicação está */
const app = require("./server")
const port = process.env.PORT;

server.use(app);

server.listen(port, () => {
    console.log(`Server runnig on localhost:${port}`);
})

