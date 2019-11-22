const router = require("express").Router();
const fs = require("fs");

/** Dont know but this function only gets called when there are erros
 * In this function we could do a render of a error page
 */
function errorHandler(err, req, res, next) {
    if (err) {
        console.log(err, "Função de erro")
        // fs.writeFile(), é bem capaz de não ser assim tão simples
        // res.send("<h1 style='color: red;'>Error Page</h1>");
        res.json({success: false, error: err})
    }
    else next();
}
module.exports = {
    errorHandler: errorHandler,
    router: router
};

/** Error Handling, Could do a route for error handling...... */
// router.use((err, req, res, next) => {
//     console.log("Entrou na rota de erro");
//     if (err) {

//         /** It has to have a next to somewhere */
//         // next();
//         // or
//         // next(err);
//         console.log(err, "ERRO!!!!!!!!!!!!!!!1")
//         next(err);
//     }


//     next();
// })

/*
No longer comes with express
server.use(express.errorHandler({dumpExceptions: true, showStack: true}));
*/
// router.use((err, req, res, next) => { // Não está a fazer nada.
//     process.on('uncaughtException', (exception) => {
//         console.log(exception, "Exception!!!!!")
//     })
// })

