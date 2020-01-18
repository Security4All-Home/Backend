const sql = require("../../sqlconnection");

const crudStatistics = {
  numberOfUsers(req, res, result) {
    sql.query(
      "Select Count(idUser) as numUsers from user",
      (err, rows, fields) => {
        if (err) {
          result(err, rows);
          return;
        }
        result(null, rows);
      }
    );
  },
  numberOfSensorSold(req, res, result) {
    sql.query(
      "SELECT SUM(quantity) as Quantity FROM `sensor_order`,`order` WHERE sensor_order.idOrder=`order`.`idOrder` and `order`.`payed`=1 and `order`.`active`=1",
      (err, rows, fields) => {
        if (err) {
          result(err, rows);
          return;
        }
        result(null, rows);
      }
    );
  },
  installationRequests(req, res, result) {
    sql.query(
      "Select Count(instalation) as Instalation_Requests from `order` where `order`.instalation=1",
      (err, rows, fields) => {
        if (err) {
          result(err, rows);
          return;
        }
        result(null, rows);
      }
    );
  },
  ordersToPay(req, res, result) {
    sql.query(
      "Select Count(payed) as Orders_Payed from `order` where `order`.payed=0",
      (err, rows, fields) => {
        if (err) {
          result(err, rows);
          return;
        }
        result(null, rows);
      }
    );
  },
  numberOfHouses(req, res, result) {
    sql.query(
      "Select Count(zipCode) as TotalHouses from house",
      (err, rows, fields) => {
        if (err) {
          result(err, rows);
          return;
        }
        result(null, rows);
      }
    );
  },
  avgSensorForHouse(req, res, result) {
    sql.query(
      "SELECT COUNT(sensor_space.idSensor) as CountSensorsForHouse FROM `house_space`,sensor_space where house_space.idSpace=sensor_space.idSpace GROUP BY house_space.idHouse",
      (err, rows, fields) => {
        if (err) {
          result(err, rows);
          return;
        }
        let count = 0;
        for (let i = 0; i < rows.length; i++) {
          var data = JSON.stringify(rows[i]);
          count += parseInt(data[24]);
        }
        let avg = count / rows.length;
        result(null, avg);
      }
    );
  },
  usersToValidate(req, res, result) {
    sql.query(
      "Select Count(idUser) as totalUsersNotVerified from user where verified=0",
      (err, rows, fields) => {
        if (err) {
          result(err, rows);
          return;
        }
        result(null, rows);
      }
    );
  }
};

module.exports = crudStatistics;
