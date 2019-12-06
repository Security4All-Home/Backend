const sql = require("../../sqlconnection");

const crudPackage = {
  //Create Package
  addPackage(newPackage, result) {
    sql.query("Insert into package set ?", newPackage, function(
      err,
      rows,
      fields
    ) {
      if (err) throw err;

      result(rows);
      console.log(rows.insertId)
    });
  },

  //Read All
  getAll(result) {
    sql.query("Select * from package", function(err, rows, fields) {
      if (err) next(err);

      result(null,rows);
    });
  },

  //Read By ID
  getByID(id, result) {
    sql.query(
      "Select * from package where idPackage=" + id,
      (err, rows, fields) => {
        if (err) next(err);
        result(rows, fields);
      }
    );
  },
  //Update
  updateByID(id, newPackage, result) {
    sql.query(
      "update package set ? where idPackage=?",
      [newPackage, id],
      (err, rows) => {
        if (err) next(err);
        result(rows);
      }
    );
  },

  //Delete
  deleteByID(id, result, next) {
    sql.query("delete from package where idPackage=" + id, (err, rows) => {
      if (err) next(err);
      result(rows);
    });
  }
};
module.exports = crudPackage;
