const router = require("express").Router();
const fs = require("fs");
const { connection, model, schema } = require("../../mongoconnection");


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
    //process.stdout.write("\u001b[0J\u001b[1J\u001b[2J\u001b[0;0H\u001b[0;0W");
    // balbla(err)
    try {
        console.log(err, "ERRO SEM SER TRATADO!")
        if (err) {
            let customError = { // This the error that goes to the user
                msg: "",
                status: 400 //For now it's always this code
            }
            customError = diferenciateErrors(err, customError);
            console.log(customError, "costumeError!!!")
            // console.log(typeof err, "typeof err!!!")
            logsToDatabase("error testing", "Estes erros vão para aqui mas são só para testar") //Depois vou mudar o type
            res.status(customError.status).json({ success: false, error: customError.msg, err: customError.errore })
        }
        else next();

    } catch (catchedErr) {
        res.json({ success: false, msg: "Internal server error", error: catchedErr })
    }
}

function diferenciateErrors(err, custom) {
    /** Depois talvez se possa usar um Switch
     * We have to make custom errors for the user, for the log file, (more to come?)
     */
    try {

        if (err.sql != undefined) {
            let queryType = err.sql.split(" ");

            switch (queryType[0].toUpperCase()) {
                case "SELECT":
                    custom.msg = "There was an error retrieving your data!"
                    break;
                case "UPDATE":
                    custom.msg = "There was an error updating your data!"
                    break;

                case "DELETE":
                    custom.msg = "There was an error deleting what you want xD!"
                    break;

                case "INSERT":
                    custom.msg = "There was an error inserting your data!"
                    break;
            }
        }
        /** Fazer a mesma coisa para os diferentes tipos de erros que tivermos */
        // if (JSON.stringify(err).includes('jwt') || JSON.stringify(err).includes('Token')) {
        //     custom.msg = "ERrro no JWT";
        // }

        if (err.type != undefined) {

            if (err.type.toUpperCase() == "JWT") {
                custom.msg = "Erro No JWT!!!"
                custom.errore = err
            }
        }



        if (err.custom) {
            custom.msg = err.error;
            console.log("erro apanhado no middleware confirm values");
        }
        console.log(custom, "FUNCIONAAAAAAAAAAAAAAAA!!!!")


        return custom;
    } catch (err) {
        throw err;
    }
}

/** O model dos erros vai ficar aqui */
let errorSchema = new schema({
    // errorType: {
    //     type: String
    // },
    description: {
        type: String
    },
    date: {
        type: String,
        default: new Date().toISOString().split('T').join(' ').split('Z')[0]
    },
    message: {
        type: String
    }
})

let error = model('errorLogs', errorSchema);

function logsToDatabase(/*errorType,*/ errorMessage, description = "") {
    let newError = new error({
        /*errorType: errorType,*/
        description: description,
        message: errorMessage
    })

    newError.save((err, savedErr) => {
        if (err) {
            writingToLogFile() // Vai para o logfile que é para termos registo
            return;
        }
        console.log(savedErr, "Erro Gravado com sucesso !!!")
    })
}

function balbla(error) {
    console.log("EEEEEEEE");
    console.log(process);
    console.log(error);
}


function writingToLogFile() {
    return;
}

module.exports = {
    errorHandler: errorHandler,
    router: router
};