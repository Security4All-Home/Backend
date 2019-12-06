const express = require('express');
const server = express();


/** Ler as variaveis de ambiente */
require('dotenv').config()

/** Database connections */
const mongoConnection = require('./src/mongoconnection');
const mysqlConnection = require('./src/config/db.config');

const Role = mysqlConnection.role;

// force: true will drop the table if it already exists
mysqlConnection.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync with { force: true }');
    initial();
  });


/** Onde os caminhos e basicamante a aplicação está */
const app = require("./server")
const port = process.env.PORT;

server.use(app);

server.listen(port, () => {
    console.log(`Server runnig on localhost:${port}`);
})


function initial(){
	Role.create({
		id: 1,
		name: "USER"
	});
	
	Role.create({
		id: 2,
		name: "ADMIN"
	});
	
	Role.create({
		id: 3,
		name: "PM"
	});
}