const trans = require("../../models/mongo/transactions.model");

const transactionsController = {
    getAll(res, next) {
        trans.find({}, (err, results) => {
            if(err) {
                next(err);
                return;
            }
            res.json({success: true, data: results})
        })
    },
    insert({body}, res, next) {
        let newTrans = new trans({
            id: body.idUser,
            creditUsed: body.creditUsed
        })

        newTrans.save((err, savedErr) => {
            if(err) {
                next(err);
                return
            }

            res.json({success: true, msg: "Transaction saved sucessfully!"})
        })
    }
}