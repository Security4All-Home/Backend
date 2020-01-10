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
    insert({ name, username, password, idType, email, taxAdress,taxZipCode, phoneNumber, nif = "", twoFactorAuth = 0}, result) {
        /** TODO:
         * Tem que se inserir aqui também valores nas tabelas user_house e house
         * ou criar outro método para inserir esses valores visto que para um user se
         * registar tem que escolher um pacote por isso registar a sua casa.
         * Para inserir uma (order) vai ser num método diferente
         */
        let inserteId = 0
        password = bcrypt.hashSync(password, salt)
        /** Usar o rows.insertId */
        let query = `insert into user 
        (name, username, password, idType, email, taxAdress,taxZipCode,nif, verified)
        values
        (${name},${username},${password},${idType},${email}, ${taxAdress},${taxZipCode},${nif}, ${twoFactorAuth});
        insert into user_contact values (LAST_INSERT_ID(), ${phoneNumber});`

        console.log(query)

        sql.query(query.replace(/\n/g, ""), (err, rows, fields) => {
            if (err) {

                result(err, rows);
                return;
            }
            
            console.log("DONE!!!!!!!!!!!!")
            result(null, rows);
        });
    },

    //TODO 
    /*
    firstRegister({credit, name, username, password, email, nif, taxAdress, taxZipCode, contacto, idPackage,instalation, zipCode, local, adress}, result){
        let query = `select price from package where idPackage= ${idPackage}  
        case price <= ${credit} then (
            insert into  user (name, username, password, email, nif, taxAdress, taxZipCode, credit) values (${name},${username},${password},${email},${nif},${taxAdress},${taxZipCode},${credit});
            insert into user_contact values (LAST_INSERT_ID(),${contacto} );
            insert into uZvFiNMuwF.order(date,idPackage, idUser, instalation,payed) values (CURRENT_TIMESTAMP(),(select MAX(idUser) from user), ${instalation},1);
            insert into house (zipCode, local, adress) values(${zipCode}, ${local}, ${adress});
            insert into user_house(zipCode, idUser) values(${zipCode},(select MAX(idUser) from user));)
        end`

        sql.query(query.replace(/\n/g, ""), (err, rows, fields) => {
            if (err) {
                err.lalalalala = query.replace(/\n/g, "")
                result(err, rows);
                return;
            }
            
            result(null, rows);
        });

    },*/
    
    insertReview({text, idUser, idSensor, date}, result) {
        let query = `insert into review 
        (text, idUser, idSensor, date)
        values
        (${text}, ${idUser}, ${idSensor}, ${date});`

        sql.query(query.replace(/\n/g, ""), (err, rows, fields) => {
            if (err) {
                err.lalalalala = query.replace(/\n/g, "")
                result(err, rows);
                return;
            }
            
            result(null, rows);
        });
    },
    getUsersByHouse({zipCode}, result) {
        let query = `
        select user.* 
        from user, house, user_house 
        where user_house.zipCode = ${zipCode} 
        and user.idUser = user_house.idUser 
        and house.zipCode = user_house.zipCode`;

        sql.query(query, (err, rows, fields) => {
            if(err) {
                result(err, rows);
                return;
            }

            result(null, rows);
        })
    },
   
    getSensorByUser({id}, result) {
        let query = `select sensor.* from sensor, user_house, house_space, sensor_space where 
        sensor_space.idSensor = sensor.idSensor and sensor_space.idSpace = house_space.idSpace 
        and user_house.idUser = ${id} `;

        sql.query(query, (err, rows, fields) => {
            if(err) {
                result(err, rows);
                return;
            }

            result(null, rows);
        })
    },
    getEspacosByUser({id}, result) {
        let query = `select space.* from space, user_house, house_space 
        where user_house.idUser = ${id} 
        and user_house.zipCode=house_space.idHouse 
        and house_space.idSpace= space.idSpace`;

        sql.query(query, (err, rows, fields) => {
            if(err) {
                result(err, rows);
                return;
            }

            result(null, rows);
        })
    },
    getPackageByUser({id}, result) {
        let query = `select package.* from uZvFiNMuwF.order, package 
        where order.idUser = ${id} 
        and package.idPackage = order.idPackage`;

        sql.query(query, (err, rows, fields) => {
            if(err) {
                result(err, rows);
                return;
            }

            result(null, rows);
        })
    },
    getReviewByUser({id}, result) {
        let query = `select review.* from review 
        where review.idUser = ${id}`;

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
    updateUserHouses({zipCode},{local, adress}, result) { // as user_houses is only composed by the primary keys this 
        //function will update the house data
       
        let query = ` update house set` 

        if(local != undefined || local != null) query += ` local = ${local}, ` 
        if(adress != undefined || adress != null) query += `adress=  ${adress} ` 

        query += `where zipCode = ${zipCode}`

        sql.query(query, (err, rows, fields) => {
            if(err) {
                result(err, rows);
                return;
            }

            result(null, rows);
        })
    },
    updateSensor({idSensor},{name, description, stock, price, idCategory}, result) { 
        let query = `update sensor set`
        if(name != undefined || name != null) query += ` name = ${name}, ` 
        if(description != undefined || description != null) query += `description = ${description}, ` 
        if(stock != undefined || stock != null) query += `stock = ${stock}, ` 
        if(price != undefined || price != null) query += `price = ${price}, ` 
        if(idCategory != undefined || idCategory != null) query += `idCategory = ${idCategory} `  

        query += ` where idSensor = ${idSensor}`

        sql.query(query, (err, rows, fields) => {
            if(err) {
                result(err, rows);
                return;
            }

            result(null, rows);
        })
    },

    addSensorToSpace(req,{idSpace, idSensor}, result) {
        let query = `insert into sensor_space
        (idSpace, idSensor) 
        values 
        (${idSpace}, ${idSensor});`

        sql.query(query.replace(/\n/g, ""), (err, rows, fields) => {
            if (err) {
                err.lalalalala = query.replace(/\n/g, "")
                result(err, rows);
                return;
            }
            
            result(null, rows);
        });
    },

    //alterar o campo payment na tabela order
    updateOrderPayment({idOrder},{}, result) { 

        let query = `update uZvFiNMuwF.order set payed = 1` 
        query += ` where idOrder = ${idOrder}`
        console.log(query)
        sql.query(query, (err, rows, fields) => {
            if(err) {
                result(err, rows);
                return;
            }

            result(null, rows);
        })
    },

    //alterar o campo active para 0 na tabela order   
    deleteLogicOrder({idOrder},{}, result) { 
        let query = `update uZvFiNMuwF.order set active = 0` 
        query += ` where idOrder = ${idOrder}`

        sql.query(query, (err, rows, fields) => {
            if(err) {
                result(err, rows);
                return;
            }

            result(null, rows);
        })
    },

    //delete logic num user
    deleteLogicUser({idUser},{}, result) { 
        let query = `update uZvFiNMuwF.user set disabled = 1` 
        query += ` where idUser = ${idUser}`

        sql.query(query, (err, rows, fields) => {
            if(err) {
                result(err, rows);
                return;
            }

            result(null, rows);
        })
    },

    //Add credits to user by id
    addCreditToUser({idUser},{credit}, result) { 

        let query = `update uZvFiNMuwF.user set` 
        if(credit != undefined || credit != null) query += ` credit = credit + ${credit} `
        query += ` where idUser = ${idUser}`
        console.log(query)
        sql.query(query, (err, rows, fields) => {
            if(err) {
                result(err, rows);
                return;
            }

            result(null, rows);
        })
    },

    //take credits from an user by id
    takeCreditsFromUser({idUser},{credit}, result) { 

        let query = `update user set` 
        if(credit != undefined || credit != null) query += ` credit = credit - ${credit} `
        query += ` where idUser = ${idUser}`
        console.log(query)
        sql.query(query, (err, rows, fields) => {
            if(err) {
                result(err, rows);
                return;
            }

            result(null, rows);
        })
    },


    
    delete({iduser}, result) {
        /**
         * Como temos relações temos que eliminar as entradas do user
         * em todas as tabelas antes de eliminar o user
         * as tabelas podem ser:
         * order
         * user_house
         * user_contact
         * review
         * 
         * Nota:
         * Há tabelas em que não queremos apagar os registos porque senão não ficamos com o históorico do 
         * que aconteceu.
         * Por isso o que vamos fazer aqui vai ser um "virtual delete" em que vamos apenas desativar o user.
         * Desta maneira continuamos com um histórico do user e das suas ações
         * Depois é melhor fazer um outro delete para realmente apagar o user.
         */
        let query = `
        update user set disabled = 1 where idUser = ${iduser}
        `;

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