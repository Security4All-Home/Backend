const sql = require("../../sqlconnection");

const orderModelCrud = {
    /** Ir buscar todas as orders */
    getAll(result) {
        let query = "select * from `order` left join  package on package.idPackage = order.idPackage left join sensor_order on`order`.idOrder = sensor_order.idOrder left join sensor on sensor_order.idSensor = sensor.idSensor; "

        sql.query(query, (err, rows, fields) => {
            if(err) {
                result(err, rows);
                return;
            }

            result(null, rows);
        })
    },
    getById(id, result) {
        let query = "select * from `order` left join  package on package.idPackage = order.idPackage left join sensor_order on`order`.idOrder = sensor_order.idOrder left join sensor on sensor_order.idSensor = sensor.idSensor where `order`.idOrder = " + id +";";

        sql.query(query, (err, rows,  fields) => {
            if(err) {
                result(err, rows);
                return;
            }
            result(null, rows);
        })
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
    insertOrderSensors({ sensors, idUser, idPackage = null, instalation = 0, payed = 0, active = 0 }, result) {
        let date = new Date().toISOString().split('T').join(' ').split('.')[0];

        let query = "insert into `order` (date, idPackage, idUser, instalation, payed, active) values (?, ?, ?, ?, ?, ?)"
        sql.query(query, [date, idPackage, idUser, instalation, payed, active], (err, rows, fields) => {
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

                result(null, rows2)
            })
        })
    },
    getOrdersWithPackages(result) {
        let query = "select * from `order` inner join package on package.idPackage = order.idPackage";
        sql.query(query, (err, rows, fields) => {
            if (err) {
                result(err, rows);
                return;
            }

            result(null, rows);
        })
    },
    getOrdersWithSensors(result) {
        let query = "select * from `order` inner join sensor_order on `order`.idOrder = sensor_order.idOrder inner join sensor on sensor_order.idSensor = sensor.idSensor;"

        sql.query(query, (err, rows, fields) => {
            if (err) {
                result(err, rows);
                return;
            }

            result(null, rows)
        })
    },
    updateInstaltion(id, result) {
        let query = "update `order` set instalation=IF(instalation=1,0,1) where idOrder=" + id;

        sql.query(query, (err, rows, fields) => {
            if (err) {
                result(err, rows);
                return;
            }

            result(null, rows)
        })
    },
    updatePayment(id, result) {
        let query = "update `order` set payed=IF(payed=1,0,1) where idOrder=" + id;

        sql.query(query, (err, rows, fields) => {
            if (err) {
                result(err, rows);
                return;
            }

            result(null, rows)
        })
    },
    updateActive(id, result) {
        let query = "update `order` set active=IF(active=1,0,1) where idOrder=" + id;

        sql.query(query, (err, rows, fields) => {
            if (err) {
                result(err, rows);
                return;
            }

            result(null, rows)
        })
    }
}

module.exports = orderModelCrud;