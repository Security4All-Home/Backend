const sql = require('../../sqlconnection');

const authModel = {
    login({ email, password }, result) {
        console.log(email, password)
        /**
         * Vou precisar:
         * Email
         * Password
         */

         // não devia mandar a pass
        let query = `select * from user where email like '${email}'` // Por agora enviamos tudo de volta

        sql.query(query/*.replace(/\n/g)*/, (err, rows, fields) => {
            if (err) {
                result(err, rows);
                return;
            }
            result(null, rows);
        })

    }
}

module.exports = authModel;