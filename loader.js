const express = require('express');
require('dotenv').config()
const mongoConnection = require('./src/mongoconnection');
const mysqlConnection = require('./src/sqlconnection')
const port = 8002;


const server = express();


server.listen(port, () => {
    console.log(`Server runnig on localhost:${port}`);
})

