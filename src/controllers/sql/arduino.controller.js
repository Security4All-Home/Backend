const arduinoModel = require("../../models/sql/arduino.model");
var SerialPort = require("serialport");
let serialPort = null;

const crudArduino = {

  addRecord(req, res, next) {
    let value = null;
    let addRecord = false;


    setTimeout(function () {

      const Readline = SerialPort.parsers.Readline;
      serialPort = new SerialPort("/dev/cu.usbserial-14130", {
        baudRate: 9600
      });
      console.log('serial port opened');
      const parser = serialPort.pipe(new Readline('\r\n'))
      console.log('parser setup');
      //res.json({ message: "Operation Sent" });  
      parser.on('data', function (data) {
        value = data;
        req.body.value = value;
        try {
          arduinoModel.addRecord(req.body, (err, dataSQL) => {
            console.log(dataSQL);
            //res.status(200).json({ success: true, data: dataSQL });
            //serialPort.close();
            if (err) {
              next(err);
              return;
            }
          });
        } catch (error) {
          res.status(400).json({ success: false, err: error });
        }
      });

    }, 2000)

    
    

    /*
    var portName = "/dev/cu.usbserial-14110";
  
    var myPort = new SerialPort(portName, 9600);
  
    var Readline = SerialPort.parsers.Readline;
    var parser = new Readline();
    myPort.pipe(parser);
  
    myPort.on('open', showPortOpen);
    parser.on('data', readSerialData);
    myPort.on('close', showPortClose);
    myPort.on('error', showError);
  
    function showPortOpen() {
      console.log('port open. Data rate: ' + myPort.baudRate);
      //myPort.read(myPort);
      console.log(parser);
    }
    function readSerialData(data) {
      console.log(data);
    }
  
    function showPortClose() {
      console.log('port closed.');
    }
  
    function showError(error) {
      console.log('Serial port error: ' + error);
    }*/


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
  },

  closeArduino(req, res, next) {
    if (serialPort != null) {
      serialPort.close();
      console.log("Arduino connection closed.");
    }
  },

  deleteAllRecords(req, res, next) {
    try {
      arduinoModel.deleteAllRecords((err, data) => {
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
}

module.exports = crudArduino;
