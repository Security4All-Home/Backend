const sql = require('../sqlconnection');

recMid = (layer) => {
    let isArr = null
    let isObjArr = typeof layer == 'object' ? true : false
    newBody = newBody;

    if (isObjArr == true) {
        if (Array.isArray(layer)) isArr = true;
        else isArr = false;
    }
    if (isArr == null) {
        console.log('É só uma ' + typeof layer, layer + '\n');
    }
    else {
        if(isArr) {
            for (let i = 0; i < layer.length; i++) {
                if (typeof layer[i] == 'object' && Array.isArray(layer[i]) == true) {
                    console.log("É Array \n", layer[i]);
                    // newBody
                    recMid(layer[i]);
                }
                else if (typeof layer[i] == 'object' && Array.isArray(layer[i]) == false) {
                    console.log("É Objecto \n", layer[i])
                    recMid(layer[i])
                }
                else {
                    console.log(`É ${typeof layer[i]}`, layer[i])
                    secObj
                }
            }
        }
        else {
            for(let key in layer) {
                if (typeof layer[key] == 'object' && Array.isArray(layer[key]) == true) {
                    console.log("É Array \n", layer[key]);
                    recMid(layer[key]);
                }
                else if (typeof layer[key] == 'object' && Array.isArray(layer[key]) == false) {
                    console.log("É Objecto \n", layer[key])
                    recMid(layer[key])
                }
                else {
                    console.log(`É ${typeof layer[key]}!!!!!!!!!!!!!!!!1 \n`, layer[key])
                }
            }
        }
    }
}

module.exports = function (req, res, next) {
    // Sanitize Body of the response
    let newBody = {};
    if (req.body != {}) {
        recMid(req.body);
        req.body = newBody
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