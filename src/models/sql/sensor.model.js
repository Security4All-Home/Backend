const sql = require("../../sqlconnection");

const crudSensor = {
  //Create
  addSensor(newSensor, result) {
    sql.query("Insert into sensor set ?", newSensor, function(
      err,
      rows,
      fields
    ) {
      if (err) throw err;

      result(null, rows);
    });
  },

  //Read All
  getAll(result) {
    sql.query("Select * from sensor", function(err, rows, fields) {
      if (err) next(err);

      result(null, rows);
    });
  },

  //Read By ID
  getByID(id, result) {
    sql.query(
      "Select * from sensor where idSensor=" + id,
      (err, rows, fields) => {
        if (err) next(err);
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
        if (err) next(err);
        result(null, rows);
      }
    );
  },

  //Delete
  deleteByID(id, result, next) {
    sql.query("delete from sensor where idSensor=" + id, (err, rows) => {
      if (err) next(err);
      result(null, rows);
    });
  }
};
module.exports = crudSensor;
