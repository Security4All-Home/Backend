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
      "Select * from sensor where idSensor=" + sql.escape(id),
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
      "Select * from sensor where idCategory=" + sql.escape(idCategory),
      (err, rows, fields) => {
        if (err) {
          result(err, rows);
          return;
        }
        result(null, rows);
      }
    );
  },
  getSensorHouse(id, result) {
    let escapedId = sql.escape(id);
    let query = `select house.*, space.idSpace,space.description as division, sensor_space.active , sensor.* from house
    inner join house_space on house.zipCode = house_space.idHouse and house.zipCode = ${escapedId}
    inner join space on space.idSpace = house_space.idSpace
    inner join sensor_space on house_space.idSpace = sensor_space.idSpace
    inner join sensor on sensor.idSensor = sensor_space.idSensor;`;

    sql.query(query, (err, rows, fields) => {
      if (err) {
        result(err, rows);
        return;
      }
      result(null, rows);
    });
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
      if (body[i].subtract) {
        query += `update sensor set stock=IF(stock>0,stock-${sql.escape(
          body[i].number
        )},0) where idSensor=${sql.escape(body[i].id)};`;
      } else {
        query += `update sensor set stock=IF(stock>0,stock+${sql.escape(
          body[i].number
        )},0) where idSensor=${sql.escape(body[i].id)};`;
      }
    }
    sql.query(query, (err, rows) => {
      if (err) {
        result(err, rows);
        return;
      }
      result(null, rows);
    });
  },

  updateSensorState(idSensor, idSpace, result) {
    sql.query(
      `update sensor_space set active=IF(active=1,0,1) where idSensor=${sql.escape(
        idSensor
      )} and idSpace=${sql.escape(idSpace)};`,
      (err, rows) => {
        if (err) {
          result(err, rows);
          return;
        }
        result(null, rows);
      }
    );
  },
  //Delete
  deleteByID(id, result, next) {
    sql.query(
      "delete from sensor where idSensor=" + sql.escape(id),
      (err, rows) => {
        if (err) {
          result(err, rows);
          return;
        }
        result(null, rows);
      }
    );
  },
  //insert sensor into space
  sensorSpace(idSensor, idSpace, result) {
    sql.query(
      `Insert into sensor_space SET idSensor=?,idSpace=?`,
      [idSensor, idSpace],
      (err, rows) => {
        if (err) {
          console.log("ERRO?", err); //Falar com alvaro
          result(err, rows);
          return;
        }
        console.log(idSensor, idSpace);

        result(null, rows);
        console.log(rows);
      }
    );
  },
  //get sensors that are inside a space
  getSensorsInSpace(idSpace, result) {
    sql.query(
      `Select space.description as Division,sensor.*, sensor_space.active, house_space.idHouse from space,sensor_space,sensor, house_space where space.idSpace=${sql.escape(
        idSpace
      )} and sensor_space.idSpace=space.idSpace and sensor.idSensor=sensor_space.idSensor and house_space.idSpace = space.idSpace`,
      (err, rows) => {
        if (err) {
          result(err, rows);
          return;
        }
        result(null, rows);
      }
    );
  },
  //Remove sensors from space
  removeSensorSpace(idSensor, idSpace, result) {
    console.log(idSensor, idSpace);
    sql.query(
      `Delete from sensor_space where idSpace=${sql.escape(
        idSpace
      )} and idSensor=${sql.escape(idSensor)}`,
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
  }
};
module.exports = crudSensor;
