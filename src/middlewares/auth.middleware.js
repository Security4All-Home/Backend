const jwt = require('jsonwebtoken');
module.exports = {
    verifyToken(req, res, next) {
        try {
            /**
         * Verifcar o token
         * Verificar 
         */
            let token = req.headers['x-access-token'];
            // console.log(req.cookies)
            // console.log(req.headers)

            let decodedToken = jwt.decode(token)
            console.log(decodedToken, "TOKEN")
            if (token) {
                next();
            }
            else {
                console.log("O token está a faltar")
                next({ type: "JWT", error: "missing token" })
            }
        } catch (err) {
            next({ type: "JWT", error: "Ocorreu um erro ao ler o token" });
        }
    }
}