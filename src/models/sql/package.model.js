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

  //Read By Id com sensores correspondentes
  getByID(id, result) {
    
    let query =`Select package.*, sensor.idSensor, sensor.name as Sensor from sensor, sensor_package, package
    where package.idPackage = ${id} and sensor_package.idPackage=package.idPackage
    and sensor.idSensor = sensor_package.idSensor`
    sql.query(query,(err,rows,fields) => {
         if (err) next(err);
         else if (rows.length==0) {
           sql.query("Select * from package where idPackage=" + id, (err, rows,fields) => {
            result(null,rows)
           })
         }
         else {
          result(null, rows);
         }
         
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
  //remove sensor from package
  removeSensorFromPackage(idPackage, idSensor, result){
    console.log("PACKAGE:",idPackage, "senso", idSensor)
    sql.query(
      `Delete from sensor_package where idPackage=${idPackage} and idSensor=${idSensor}`,
      (err, rows) => {
        if (err) {
          console.log(err);
          result(err, rows);
          return;
        }
        console.log(rows);
        result(null, rows);
      }
    );

  },

  //Delete
  deleteByID(id, result, next) {
    let query=`delete from package where idPackage=${id}; delete from sensor_package where idPackage=${id}`
    sql.query(query, (err, rows) => {
      if (err){
        result(err,rows)
        return
      }
      result(rows);
    });

  }
};
module.exports = crudPackage;
