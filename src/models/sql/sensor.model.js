const sql = require("../../sqlconnection");

const crudSensor = {
  //Create
  addSensor(newSensor, result) {
    sql.query("Insert into sensor set ?", newSensor, function(
      err,
      rows,
      fields
    ) {
      if (err) {
        result(err, rows);
        return;
      }

      result(null, rows);
    });
  },

  //Read All
  getAll(result) {
    sql.query("Select * from sensor", function(err, rows, fields) {
      if (err) {
        result(err, rows);
        return;
      }
      result(null, rows);
    });
  },

  //Read By ID
  getByID(id, result) {
    sql.query(
      "Select * from sensor where idSensor=" + id,
      (err, rows, fields) => {
        if (err) {
          result(err, rows);
          return;
        }
        result(null, rows);
      }
    );
  },
  //Read By category
  getByCategory(idCategory, result) {
    sql.query(
      "Select * from sensor where idCategory=" + idCategory,
      (err, rows, fields) => {
        if (err) {
          result(err, rows);
          return;
        }
        result(null, rows);
      }
    );
  },
  //Update
  updateByID(id, newSensor, result) {
    sql.query(
      "update sensor set ? where idSensor=?",
      [newSensor, id],
      (err, rows) => {
        if (err) {
          result(err, rows);
          return;
        }
        result(null, rows);
      }
    );
  },
  //Update Stock when it receives an order
  updateSensorStock(body, result) {
    let query = ``;
    console.log("sensors", body);
    for (let i = 0; i < body.length; i++) {
      console.log("sensor", body[i].number);
      query += `update sensor set stock=IF(stock>0,stock-${body[i].number},0) where idSensor=${body[i].id};`;
    }
    sql.query(query, (err, rows) => {
      if (err) {
        result(err, rows);
        return;
      }
      result(null, rows);
    });
  },
  //Delete
  deleteByID(id, result, next) {
    sql.query("delete from sensor where idSensor=" + id, (err, rows) => {
      if (err) {
        result(err, rows);
        return;
      }
      result(null, rows);
    });
  }
};
module.exports = crudSensor;
