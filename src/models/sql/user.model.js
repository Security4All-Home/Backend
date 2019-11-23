const sql = require('../../sqlconnection');

const userCrud = {
    getAll(result) {
        let query = 'select * from user';
        sql.query(query, (err, rows, fields) => {
            if (err) {
                result(err, rows);
                return;
            }
            result(null, rows);
        })
    },
    getById({id}, result) {
        let query = 'select * from user where idUser = ' + id;

        sql.query(query, (err, rows, fieds) => {
            if(err) {
                result(err, rows);
                return;
            }

            result(null, rows);
        })
    },
    insert({ name, username, password, idType, email, codigoPostal, telemovel, nif }, result) {
        let query = `insert into user 
        (name, username, password, idType, email, codigoPostal, telemovel, nif, verified)
        values
        ("${name}","${username}","${password}",${idType},"${email}",${codigoPostal},${telemovel},${nif},False)`

        sql.query(query, (err, rows, fields) => {
            if (err) {
                result(err, rows);
                return;
            }
            result(null, rows);
        });
    },
    getUsersByHouse({codigoPostal}, result) {
        let query = `select user.*, house.* 
        from user, house
        where user.codigoPostal = house.codigoPostal
        and house.codigoPostal = ${codigoPostal}`;

        sql.query(query, (err, rows, fields) => {
            if(err) {
                result(err, rows);
                return;
            }

            result(null, rows);
        })
    },
    update({iduser}, { name, username, password, idType, email, codigoPostal, telemovel, nif }, result) {
        let query = "update user set "

        if(name != undefined || name != null) query += "name = '" + name + "' " 
        if(username != undefined || username != null) query += "username = '" + username + "' "
        if(password != undefined || password != null) query += "password = '" + password + "' "
        if(idType != undefined || idType !=null) query += "idType = " + idType  + " "
        if(email != undefined || email != null) query += "email = '" + email  + "' "
        if(codigoPostal != undefined || codigoPostal != null) query += "codigoPostal = " + codigoPostal + " " 
        if(telemovel != undefined || telemovel != null) query += "telemovel = " + telemovel + " " 
        if(nif != undefined || nif != null) query += "nif = " + nif + " "

        query += `where idUser = ${iduser}`

        sql.query(query, (err, rows, fields) => {
            if(err) {
                result(err, rows);
                return;
            }

            result(null, rows);
        })
    },
    delete({iduser}, result) {
        let query = `delete from user where idUser = ${iduser}`;

        sql.query(query, (err, rows, fields) => {
            if(err) {
                result(err, rows);
                return; 
            }

            result(null, rows);
        })

    }
}

module.exports = userCrud;