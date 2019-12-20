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

        console.log(jwt.decode(token))
        if (token) {

        }
        else {

        }
        next();
    }
}