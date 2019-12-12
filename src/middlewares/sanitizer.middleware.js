const sql = require('../sqlconnection');
module.exports = function (req, res, next) {
    // Sanitize Body of the response
    if (req.body != {}) {
        for(let key in req.body) {
            console.log(key, req.body[key])
            req.body[key] = sql.escape(req.body[key])
            console.log(req.body[key])
        }
    }
    if(req.params != {}) {
        for (let key in req.params) {
            console.log(key, req.params[key])
            req.params[key] = sql.escape(req.params[key])
            console.log(req.params[key])
        }
    }
    next();
}