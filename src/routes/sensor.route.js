const route = require("express").Router()
const sensorController=require("../controllers/sql/sensor.controller")

route.post("/",(req,res)=>{
    sensorController.addSensor(req,res)
})

module.exports=route