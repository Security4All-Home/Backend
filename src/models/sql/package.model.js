const sql = require("../../sqlconnection");

const crudPackage = {
  
  //Create Package
  addPackage(newPackage, result) {
    sql.query("Insert into package set ?; ", newPackage, function(
      err,
      rows,
      fields
    ) {
      if (err) throw err;

      result(rows);
      console.log(rows, rows.insertId, fields)
    });

  },

 //Add Sensor List to Package
  addSensorToPackage(idPackage, sensorList, result){
    let query =``
    console.log(sensorList)
    for (let i=0;i<sensorList.length;i++){
      console.log(sensorList[i])
      query += `insert into sensor_package(idSensor,idPackage) values(${sensorList[i]}, ${idPackage});`;
    }
    console.log(query)
    sql.query(query, (err, rows) => {
      if (err) {
        result(err, rows);
        return;
      }
      result(null, rows);
    });

  },
 

  //Read All
  //fazer join de packageSensors e sensors para apresentar tudo -TO DO
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
