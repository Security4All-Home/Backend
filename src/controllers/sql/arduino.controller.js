const arduinoModel = require("../../models/sql/arduino.model");
var SerialPort = require("serialport");
var serialPort = null;

const crudArduino = {
  //Create

  addRecord(req, res, next) {

    let value = null;
    try {
      arduinoModel.addRecord(req.body, (err, data) => {
        //Ler aqui valores do sensor

        if (serialPort != null) {
          serialPort.close();
        }

        setTimeout(function () {

          serialPort = new SerialPort('/dev/cu.usbserial-14110', {
            autoOpen: false,
            baudRate: 9600,
            dataBits: 8,
            stopBits: 1
          });
          

          serialPort.open(function (error) {
            if (error) {
              console.log('failed to open: ' + error);
            } else {
              console.log('serial port opened');
              res.json({ message: "Operation Sent" });
              serialPort.on('data', function (data) {
                console.log(data.toString());
                try {
                  value = data.toString();
                } catch { }
              });
            }
          });
        });
        if (err) {
          next(err);
          return;
        }
        //console.log("DATA: " + data);
        res.status(200).json({ success: true, data: data });
      });
    } catch (error) {
      res.status(400).json({ success: false, err: error });
    }
  },
  getAll(req, res, next) {
    //Read
    try {
      arduinoModel.getAll((err, data) => {
        if (err) {
          next(err);
          return;
        }
        res.status(200).json({ success: true, data: data });
      });
    } catch (err) {
      next(err);
    }
  }

};

module.exports = crudArduino;
