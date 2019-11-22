const sql=require("../../sqlconnection");

const crudSensor={

    //Create
    addSensor(newSensor,result){
        sql.query("Insert into sensor set ?",newSensor,function(err,rows,fields){
            if(err)throw err
            
            result(rows)
        })
    },

    //Read All
    getAll(result){
        
    },

    //Read By ID
    getByID(result){

    },
    //Update
    updateByID(result){

    },

    //Delete
    deleteByID(result){

    }

}
module.exports=crudSensor
