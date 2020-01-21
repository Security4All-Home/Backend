const sql = require("../../sqlconnection");

const houseModel = {
    getHouses(result) {
        let query = "select * from house";

        sql.query(query, (err, rows, fields) => {
            if(err) {
                result(err, rows);
            }
            else {
                result(null, rows);
            }
        })
    },
    getHousesByUser({id}, result) {
        let query = `select house.zipCode, house.local,
         house.adress from house, user_house where 
         user_house.idUser = ${id} and user_house.zipCode = house.zipCode `;

        sql.query(query, (err, rows, fields) => {
            if(err) {
                result(err, rows);
                return;
            }

            result(null, rows);
        })
    },
    insertSpace({idHouse, description}, result) {
        let query = `INSERT INTO space (description)
        VALUES
        (${description});
        insert into house_space values (${idHouse},LAST_INSERT_ID());`
        console.log("QUERY:"+ query)

        sql.query(query.replace(/\n/g, ""), (err, rows, fields) => {
            if (err) {
                err.lalalalala = query.replace(/\n/g, "")
                result(err, rows);
                return;
            }
            result(null, rows);
        });
    },
    insertHouse({idUser, zipCode, local, adress}, result) {
        let query = `insert into house 
        (zipCode, local, adress)
        values
        (${zipCode}, ${local}, ${adress});
        insert into user_house (zipCode, idUser) values (${zipCode},${idUser});`

        sql.query(query.replace(/\n/g, ""), (err, rows, fields) => {
            if (err) {
                err.lalalalala = query.replace(/\n/g, "")
                result(err, rows);
                return;
            }
            
            result(null, rows);
        });
    },
 
}

module.exports = houseModel;