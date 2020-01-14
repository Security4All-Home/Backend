const sql = require("../../sqlconnection");

const crudArduino = {
  //Create
  addRecord(newRecord, result) {
    sql.query("Insert into arduino_records set ?", newRecord, function (
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
    sql.query("Select * from arduino_records", function (err, rows, fields) {
      if (err) {
        result(err, rows);
        return;
      }
      result(null, rows);
    });
  },

  deleteAllRecords(result) {
    sql.query("Truncate table arduino_records", function (err, rows, fields) {
      if (err) {
        result(err, rows);
        return;
      }
      result(null, rows);
    });
  },
};
module.exports = crudArduino;
