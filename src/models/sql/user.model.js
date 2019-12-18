const sql = require('../../sqlconnection');
const bcrypt = require("bcryptjs");
const genSaltValue = Number(process.env.genSaltValue);
let salt = bcrypt.genSaltSync(genSaltValue);

/** FAZER SANITIZEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE */

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
    getByEmail({email}, result) {

    },
    insert({ name, username, password, idType, email, taxAdress,taxZipCode, phoneNumber, nif = "", twoFactorAuth = 0 }, result) {
        // let firstQuery = `select * from user where`
        password = bcrypt.hashSync(password, salt)
        console.log(password, "PASSSS")
        let query = `insert into user 
        (name, username, password, idType, email, taxAdress,taxZipCode,nif, verified)
        values
        (${name},${username},${password},${idType},${email}, ${taxAdress},${taxZipCode},${nif}, ${twoFactorAuth});
        insert into user_contact values (LAST_INSERT_ID(), ${phoneNumber});`

        console.log(query)

        sql.query(query.replace(/\n/g, ""), (err, rows, fields) => {
            if (err) {
                err.lalalalala = query.replace(/\n/g, "")
                result(err, rows);
                return;
            }
            console.log("DONE!!!!!!!!!!!!")
            result(null, rows);
        });
    },
    getUsersByHouse({zipCode}, result) {
        let query = `select user.*, house.* 
        from user, house, user_house
        where user.idUser = house.zipCode
        and house.taxZipCode = ${taxZipCode}`;

        sql.query(query, (err, rows, fields) => {
            if(err) {
                result(err, rows);
                return;
            }

            result(null, rows);
        })
    },
    getHousesByUser({id}, result) {
        let query = `select house.zipCode, house.local, house.adress from house, user_house where user_house.idUser = ${id} and user_house.zipCode = house.zipCode `;

        sql.query(query, (err, rows, fields) => {
            if(err) {
                result(err, rows);
                return;
            }

            result(null, rows);
        })
    },
    getSensorByUser({id}, result) {
        let query = `select sensor.* from sensor, sensor_package,package, uZvFiNMuwF.order where sensor_package.idSensor = sensor.idSensor 
        and sensor_package.idPackage = package.idPackage and uZvFiNMuwF.order.idUser = ${id} `;

        sql.query(query, (err, rows, fields) => {
            if(err) {
                result(err, rows);
                return;
            }

            result(null, rows);
        })
    },
    getEspacosByUser({id}, result) {
        let query = `select space.* from sensor, space, sensor_space, sensor_package,package, uZvFiNMuwF.order where sensor_package.idSensor = sensor.idSensor and sensor_space.idSpace = space.idSpace 
        and sensor_package.idPackage = package.idPackage and uZvFiNMuwF.order.idUser = ${id} `;

        sql.query(query, (err, rows, fields) => {
            if(err) {
                result(err, rows);
                return;
            }

            result(null, rows);
        })
    },
    update({iduser}, { name, username, password, idType, email, taxZipCode, telemovel, nif }, result) {
        let query = "update user set "

        if(name != undefined || name != null) query += "name = " + name + " " 
        if(username != undefined || username != null) query += "username = " + username + " "
        if(password != undefined || password != null) query += "password = " + password + " "
        if(idType != undefined || idType !=null) query += "idType = " + idType  + " "
        if(email != undefined || email != null) query += "email = " + email  + " "
        if(taxZipCode != undefined || taxZipCode != null) query += "taxZipCode = " + taxZipCode + " " 
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