const jwt = require('jsonwebtoken');
const ourJwt = require("../assets/scripts/jwt");
module.exports = {
    verifyToken(req, res, next) {
        try {
            /**
         * Verifcar o token
         * Verificar 
         */
            let token = req.headers['x-access-token'] || req.cookies.token;
            console.log(req.cookies.token)
            console.log(req.headers["x-access-token"])
            // console.log(token, "TOKEN!!!!!!!!!!!!")
            let decodedToken = jwt.decode(token)
            console.log(decodedToken, "TOKEN")
            let valid = ourJwt.validateToken(token)
            if (valid) {
                next();
            }
            else {
                console.log("O token está a faltar")
                next({ type: "JWT", error: "missing token" })
            }
        } catch (err) {
            if (err.message == undefined) next({ type: "JWT", error: "Ocorreu um erro ao ler o token" });
            else next({ type: "JWT", error: err.message });
        }
    }
}