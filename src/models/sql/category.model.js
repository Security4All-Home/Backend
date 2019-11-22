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

    /** Insert a new Category */
    insert({name, description}, result) {
        if (name == undefined || name == null) throw Error("Name can't be empty")
        if (description == undefined || description == null) throw Error("Descripiton can t be empty")
        let query = `insert into category (name, description) values ("${name}", "${description}");`;
        sql.query(query, (error, rows, fields) => {
            if(error) throw error

            result(rows);
        })
    },
    /** Update a category */
    update(id, {name, description }, result) {
        // console.log({ id, name, description }, "lalalalala")
        let query = "set "
        if (name != undefined || name != null) {
            query += `name = '${name}'`
        }
        if (description != undefined || descriprion != null) {
            query += `description = '${description}'`
        }
        sql.query(`
        update category
        ${query}
        where idCategory = ${id}
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