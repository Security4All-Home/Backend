const sql = require("../../sqlconnection");

const crudCategory = {
    /** Aqui faz sentido ir buscar todas as categorias */
    getAll(result) {
        sql.query('select * from category', (error, results, fields) => {
            if (error) throw error;
            // console.log([results])
            result(results);
        })
    },

    /** Update a category */
    upda(id, {name, description }, result) {
        console.log({ id, name, description }, "lalalalala")
        let query = "set "
        if (name != undefined && name != null) {
            query += `name = '${name}'`
        }
        if (description != undefined && descriprion != null) {
            query += `description = '${description}'`
        }
        sql.query(`
        update category
        ${query}
        where idCatgory = ${id}
        `, (error, results, fields) => {
            if (error) {
                // console.log(error, "ERROR!!!!!!!!!!!!!!")
                throw error
            }
            result(results)
        })
    }
}

module.exports = crudCategory;