const users = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('../assets/scripts/jwt.js');

function login(req, res) {

    //função para validar password
    function validatePassword(bodyPassword, bdPassword) {
        return bcrypt.compareSync(bodyPassword, bdPassword)
    }

    //procurar e comparar email na bd 
    users.user.findOne({ email: req.body.email.toLowerCase() }, (err, user) => {
        //verificar se existe o user e enviar mensagem de erro se não existir
        if (err) res.send(err)
        else if (!user) res.send("Email inválido!")
        else {
            if (validatePassword(req.body.password, user.password)) {
                res.setHeader("Authorization", jwt.createAccessToken(req));
                res.setHeader("Refresh", jwt.createRefreshToken(req));
                res.send("O login foi efetuado com sucesso!")
                
            }
            else res.send("Password inválida!")
        }
    })
}

module.exports = {
    login: login,
};
