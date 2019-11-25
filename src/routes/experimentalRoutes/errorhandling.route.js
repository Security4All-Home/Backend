const router = require("express").Router();
const fs = require("fs");

/**
 * Handle lost connection by mysql
 * https://stackoverflow.com/questions/20210522/nodejs-mysql-error-connection-lost-the-server-closed-the-connection
 */

/** 
 * Notas: 
 * Os erros que acontecem neste ficheiro têm que ser tratdos com o try catch e o envio de um res.json
 * Os erros nas outras páginas são apanhados também num try catch, mas depois são enviados para 
 * este error handler através na função next 
 * Ex: next(error)
 */
function errorHandler(err, req, res, next) {
    /** Clear the console
     * Link: https://stackoverflow.com/questions/9006988/node-js-on-windows-how-to-clear-console/38492871#38492871
     */
    process.stdout.write("\u001b[0J\u001b[1J\u001b[2J\u001b[0;0H\u001b[0;0W");
    try {

        if (err) {
            
            let customError = { // This the error that goes to the user
                msg: "",
                status: 400 //For now it's always this code
            }
            customError = diferenciateErrors(err, customError);
            console.log(err, "errorHandler!!!")
            console.log(typeof err, "typeof err!!!")
            res.status(customError.status).json({ success: false, error: customError.msg })
        }
        else next();

    } catch (err) {
        res.json({ success: false, msg: "Internal server error", error: err })
    }
}

function diferenciateErrors(err, custom) {
    /** Depois talvez se possa usar um Switch
     * We have to make custom errors for the user, for the log file, (more to come?)
     */


    if (err.sql != undefined) {
        let queryType = err.sql.split(" ");

        switch (queryType[0]) {
            case "select":
                custom.msg = "There was an error retrieving your data!"
                break;
        }
    }

    /** Fazer a mesma coisa para os diferentes tipos de erros que tivermos */

    return custom;
}

module.exports = {
    errorHandler: errorHandler,
    router: router
};


