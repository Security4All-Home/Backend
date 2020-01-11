const fs = require("fs");
const jwt = require("jsonwebtoken");

const privateKey = process.env.privateKey//fs.readFileSync("/keys/private.key", "utf-8");
const publicKey = process.env.publicKey//fs.readFileSync("../keys/public.key", "utf-8");
const secretKey = process.env.jwtSecret
// console.log(privateKey, publicKey, "KEYS!!!");
//opções de criação do JWT para tokens de acesso
const accessSignOptions = {
    expiresIn: "30m"
}

//opções de criação do JWT para tokens de refresh
const refreshSignOptions = {
    expiresIn: "6h"
}

//opções de verificação do JWT com expire de 0,5 horas
const accessVerifyOptions = {
    expiresIn: "30m"
}

//opções de verificação do JWT com expire de seis horas
const refreshVerifyOptions = {
    expiresIn: "6h"
}

//autor do token
const author = "sd2";

function createAccessToken(req) {
    let token = jwt.sign({
        auth: author, //autor do token
        agent: req.headers["user-agent"], //saber quem é o cliente(ex: browser)
    }, secretKey,accessSignOptions);
    return token;
}

function createRefreshToken(req) {
    let token = "";
    token = jwt.sign({
        auth: author, //autor do token
        agent: req.headers["user-agent"], //saber quem é o cliente(ex: browser)
    }, secretKey, refreshSignOptions);

    return token;
}

function validateToken(req, res, next) {
    let token = req.headers.authorization;
    if (token == "" || token == null) return next({ next: "Token não existe." });

    try {
        let legitToken = jwt.verify(token, secretKey, accessVerifyOptions); //verifica a legitimidade do token

        if (legitToken.iat > legitToken.exp) next({ error: "Token expirado!" }); //verifica o tempo que passou desde a criação do token

        if (legitToken && legitToken.auth == author) { //verifica o autor do token
            res.setHeader("Authorization", createAccessToken(req));
            return next(req, res);
        }
        else next({ error: "Erro! O autor é diferente!" })
    }
    catch (err) {
        console.log(err)
        next(err);
    }
}

function refreshToken(req, res, next) {
    let token = req.headers.refresh;

    try {
        let legitToken = jwt.verify(token, secretKey, refreshVerifyOptions); //verifica a legitimidade do token

        if (legitToken.iat > legitToken.exp) next({ error: "Token expirado!" }) //verifica o tempo que passou desde a criação do token

        if (legitToken && legitToken.auth == author) { //verifica o autor do token
            res.setHeader("Authorization", createAccessToken(req));
            res.setHeader("Refresh", createRefreshToken(req));
            next()
        }
        else next({ error: "Erro! O autor é diferente!" })
    }
    catch (err) {
        next(err);
    }
}

module.exports = {
    createAccessToken: createAccessToken,
    createRefreshToken: createRefreshToken,
    validateToken: validateToken,
    refreshToken: refreshToken,
};
