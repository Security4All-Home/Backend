const jwt = require('jsonwebtoken');
module.exports = {
    verifyToken(req, res, next) {
        /**
         * Verifcar o token
         * Verificar 
         */
        let token = req.headers['x-access-token'];
        // console.log(req.cookies)
        // console.log(req.headers)

        console.log(jwt.decode(token), "TOKEN")
        if (token) {
            next();
        }
        else {
            console.log("O token está a faltar")
            next({type: "JWT", error: "missing token"})
        }
    }
}