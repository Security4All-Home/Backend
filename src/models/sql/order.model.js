const sql = require("../../sqlconnection");

const orderModelCrud = {
    /** Ir buscar todas as orders */
    getAll(result) {
        
    },

    /** Método para inserir uma encomenda quando se encomenda um package */
    insertOrderPackage({ idPackage, idUser, instalation, payed, active }, result) {
        /** Pode ser preciso fazer a confirmação se um user está a encomendar um package que á tinha encomendado */
        let date = new Date().toISOString().split('T').join(' ').split('.')[0];
        let query = "insert into `order` (date, idPackage, idUser, instalation, payed, active)  values (?, ?, ?, ?, ?, ?) ";
        query = query.replace(/\n/g, " ");
        sql.query(query, [date, idPackage, idUser, instalation, payed, active], (err, rows, fields) => {
            if (err) {
                result(err, rows);
                return;
            }

            result(null, rows)
        })
    },
    insertOrderSensors({ sensors, idUser, instalation, payed, active }, result) {
        let date = new Date().toISOString().split('T').join(' ').split('.')[0];

            let query = "insert into `order` (date, idPackage, idUser, instalation, payed, active) values (?, Null, ?, ?, ?, ?)"
            sql.query(query, [date, idUser, instalation, payed, active], (err, rows, fields) => {
                if (err) {
                    result(err, rows);
                    return;
                }
                let query2 = ""
                console.log(rows)
                for (let sensor of sensors) {
                    query2 += `insert into sensor_order (idOrder, idSensor, quantity) values (${rows.insertId}, ${sensor.idSensor}, ${sensor.quantity});`;
                }

                sql.query(query2, (err2, rows2, fields2) => {
                    if (err2) {
                        sql.query("delete from `order` where idOrder = " + rows.insertId, (error, rows) => {
                            if (err) {
                                console.log(error, "Erro ao apagar a order")
                                return;
                            }
                            console.log(rows, "Row apagada com sucesso")
                        })
                        result(err2, rows2);
                        return;
                    }

                    result({ success: true, data: rows2 })
                })
            })
    }
}

module.exports = orderModelCrud;