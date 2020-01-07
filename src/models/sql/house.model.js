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
    }
}

module.exports = houseModel;