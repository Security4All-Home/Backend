const sql = require("../../sqlconnection");
const bcrypt = require("bcryptjs");
const genSaltValue = Number(process.env.genSaltValue);
let salt = bcrypt.genSaltSync(genSaltValue);

/** FAZER SANITIZEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE */

const userCrud = {
  getAll(result) {
    let query = "select * from user";
    sql.query(query, (err, rows, fields) => {
      if (err) {
        result(err, rows);
        return;
      }
      result(null, rows);
    });
  },
  getById({ id }, result) {
    let query = "select * from user where idUser = " + id;

    sql.query(query, (err, rows, fieds) => {
      if (err) {
        result(err, rows);
        return;
      }

      result(null, rows);
    });
  },
  // Get user type by id
  getUserType({ id }, result) {
    let query = "select idType from user where idUser = " + id;

    sql.query(query, (err, rows, fieds) => {
      if (err) {
        result(err, rows);
        return;
      }

      result(null, rows);
    });
  },
  getByEmail({ email }, result) {},
  insert(
    {
      name,
      username,
      password,
      idType,
      email,
      taxAdress,
      taxZipCode,
      phoneNumber,
      nif = "",
      twoFactorAuth = 0
    },
    result
  ) {
    /** TODO:
     * Tem que se inserir aqui também valores nas tabelas user_house e house
     * ou criar outro método para inserir esses valores visto que para um user se
     * registar tem que escolher um pacote por isso registar a sua casa.
     * Para inserir uma (order) vai ser num método diferente
     */
    let inserteId = 0;
    password = bcrypt.hashSync(password, salt);
    /** Usar o rows.insertId */
    let query = `insert into user 
        (name, username, password, idType, email, taxAdress,taxZipCode,nif, verified)
        values
        (${name},${username},${password},${idType},${email}, ${taxAdress},${taxZipCode},${nif}, ${twoFactorAuth});
        insert into user_contact values (LAST_INSERT_ID(), ${phoneNumber});`;

    console.log(query);

    sql.query(query.replace(/\n/g, ""), (err, rows, fields) => {
      if (err) {
        result(err, rows);
        return;
      }

      console.log("DONE!!!!!!!!!!!!");
      result(null, rows);
    });
  },

  //TODO
  firstRegister(
    {
      credit,
      name,
      username,
      password,
      email,
      nif,
      taxAdress,
      taxZipCode,
      contacto,
      idPackage,
      instalation,
      zipCode,
      local,
      adress,
      active,
      instaled
    },
    result
  ) {
    let query1 = `select price from package where idPackage= ${idPackage}`;
    console.log(query1.replace(/\n/g, ""), "QUERYYYYYYYYYYYY");
    sql.query(query1.replace(/\n/g, ""), (err1, rows1, fields) => {
      if (err1) {
        result(err1, rows1);
        return;
      }
      if (rows1[0].price <= credit) {
        password = bcrypt.hashSync(password, salt);
        let query2 = `insert into  user (name, username, password, email, nif, taxAdress, taxZipCode, credit) values ('${name}','${username}','${password}','${email}',${nif},'${taxAdress}','${taxZipCode}',${credit});
                insert into house (zipCode, local, adress) values('${zipCode}', '${local}', '${adress}');`;
        sql.query(query2.replace(/\n/g, ""), (err2, rows2, fields) => {
          if (err2) {
            result(err2, rows2);
            return;
          }
          let query3 = `select MAX(idUser) as lastId from user`;
          sql.query(query3.replace(/\n/g, ""), (err3, rows3, fields) => {
            if (err3) {
              result(err3, rows3);
              return;
            }
            let lastInsertedId = rows3[0].lastId;
            let date = new Date()
              .toISOString()
              .split("T")
              .join(" ")
              .split(".")[0];
            let query4 =
              `  
                            insert into user_contact values (` +
              lastInsertedId +
              `, ${contacto});
                            insert into user_house(zipCode, idUser) values('${zipCode}',` +
              lastInsertedId +
              `);
                            insert into uZvFiNMuwF.order(date, idPackage, idUser, instalation, payed, active, instaled) values ('` +
              date +
              `',${idPackage},` +
              lastInsertedId +
              `, ${instalation},1, ${active}, ${instaled});`;
            sql.query(query4.replace(/\n/g, ""), (err4, rows4, fields) => {
              if (err4) {
                err4.lalalalala = query4.replace(/\n/g, "");
                result(err4, rows4);
                return;
              }
              result(null, rows4);
            });
          });
        });
      } else {
        console.log(credit + "SALDO INSUFICIENTE" + rows1[0].price);
      }
    });
  },
  insertReview(newReview, result) {
    let query = `insert into review set?`;

    sql.query(query, newReview, (err, rows, fields) => {
      if (err) {
        err.lalalalala = query.replace(/\n/g, "");
        result(err, rows);
        return;
      }

      result(null, rows);
    });
  },
  getUsersByHouse({ zipCode }, result) {
    let query = `
        select user.* 
        from user, house, user_house 
        where user_house.zipCode = ${zipCode} 
        and user.idUser = user_house.idUser 
        and house.zipCode = user_house.zipCode`;

    sql.query(query, (err, rows, fields) => {
      if (err) {
        result(err, rows);
        return;
      }

      result(null, rows);
    });
  },

  getSensorByUser({ id }, result) {
    let query = `select sensor.* from sensor, user_house, house_space, sensor_space where 
        sensor_space.idSensor = sensor.idSensor and sensor_space.idSpace = house_space.idSpace 
        and user_house.idUser = ${id} `;

    sql.query(query, (err, rows, fields) => {
      if (err) {
        result(err, rows);
        return;
      }

      result(null, rows);
    });
  },
  getEspacosByUser({ id }, result) {
    let query = `select space.* from space, user_house, house_space 
        where user_house.idUser = ${id} 
        and user_house.zipCode=house_space.idHouse 
        and house_space.idSpace= space.idSpace`;

    sql.query(query, (err, rows, fields) => {
      if (err) {
        result(err, rows);
        return;
      }

      result(null, rows);
    });
  },
  getPackageByUser({ id }, result) {
    let query = `select package.* from uZvFiNMuwF.order, package 
        where order.idUser = ${id} 
        and package.idPackage = order.idPackage`;

    sql.query(query, (err, rows, fields) => {
      if (err) {
        result(err, rows);
        return;
      }

      result(null, rows);
    });
  },
  getReviewByUser({ id }, result) {
    let query = `select review.* from review 
        where review.idUser = ${id}`;

    sql.query(query, (err, rows, fields) => {
      if (err) {
        result(err, rows);
        return;
      }

      result(null, rows);
    });
  },
  getReviewBySensor({ idSensor }, result) {
    let query = `select review.* from review 
        where review.idSensor = ${idSensor}`;

    sql.query(query, (err, rows, fields) => {
      if (err) {
        result(err, rows);
        return;
      }

      result(null, rows);
    });
  },
  update(
    { iduser },
    {
      name,
      username,
      password,
      idType,
      email,
      taxAdress,
      taxZipCode,
      twoFactorAuth,
      disabled,
      points,
      credit,
      image
    },
    result
  ) {
    let query = "update user set ";

    if (name != undefined || name != null) query += ",name = '" + name + "' ";
    if (username != undefined || username != null)
      query += ",username = '" + username + "'";
    if (password != undefined || password != null)
      query += ",password = '" + password + "' ";
    if (idType != undefined || idType != null)
      query += ",idType = '" + idType + "' ";
    if (email != undefined || email != null)
      query += ",email = '" + email + "' ";
    if (taxAdress != undefined || taxAdress != null)
      query += ",taxAdress = '" + taxAdress + "' ";
    if (taxZipCode != undefined || taxZipCode != null)
      query += ",taxZipCode = '" + taxZipCode + "' ";
    if (twoFactorAuth != undefined || twoFactorAuth != null)
      query += ",twoFactorAuth = '" + twoFactorAuth + "' ";
    if (disabled != undefined || disabled != null)
      query += ",disabled = '" + disabled + "' ";
    if (points != undefined || points != null)
      query += ",points = '" + points + "' ";
    if (credit != undefined || credit != null)
      query += ",credit = " + credit + " ";
    if (image != undefined || image != null)
      query += ",image = '" + image + "' ";

    query += `where idUser = ${iduser}`;
    query = query.replace(",", "");
    sql.query(query, (err, rows, fields) => {
      if (err) {
        result(err, rows);
        return;
      }

      result(null, rows);
    });
  },
  updateUserHouses({ zipCode }, { local, adress }, result) {
    // as user_houses is only composed by the primary keys this
    //function will update the house data

    let query = ` update house set`;

    if (local != undefined || local != null) query += ` local = ${local}, `;
    if (adress != undefined || adress != null) query += `adress=  ${adress} `;

    query += `where zipCode = ${zipCode}`;

    sql.query(query, (err, rows, fields) => {
      if (err) {
        result(err, rows);
        return;
      }

      result(null, rows);
    });
  },
  updateSensor(
    { idSensor },
    { name, description, stock, price, idCategory },
    result
  ) {
    let query = `update sensor set`;
    if (name != undefined || name != null) query += ` name = ${name}, `;
    if (description != undefined || description != null)
      query += `description = ${description}, `;
    if (stock != undefined || stock != null) query += `stock = ${stock}, `;
    if (price != undefined || price != null) query += `price = ${price}, `;
    if (idCategory != undefined || idCategory != null)
      query += `idCategory = ${idCategory} `;

    query += ` where idSensor = ${idSensor}`;

    sql.query(query, (err, rows, fields) => {
      if (err) {
        result(err, rows);
        return;
      }

      result(null, rows);
    });
  },

  addSensorToSpace(req, { idSpace, idSensor }, result) {
    let query = `insert into sensor_space
        (idSpace, idSensor) 
        values 
        (${idSpace}, ${idSensor});`;

    sql.query(query.replace(/\n/g, ""), (err, rows, fields) => {
      if (err) {
        err.lalalalala = query.replace(/\n/g, "");
        result(err, rows);
        return;
      }

      result(null, rows);
    });
  },

  //alterar o campo payment na tabela order
  updateOrderPayment({ idOrder }, {}, result) {
    let query = `update uZvFiNMuwF.order set payed = 1`;
    query += ` where idOrder = ${idOrder}`;
    console.log(query);
    sql.query(query, (err, rows, fields) => {
      if (err) {
        result(err, rows);
        return;
      }

      result(null, rows);
    });
  },

  //update user's disable state (0 or 1)
  deleteLogicUser({ idUser }, { disabled }, result) {
    let query = `update uZvFiNMuwF.user set disabled = ${disabled}`;
    query += ` where idUser = ${idUser}`;

    sql.query(query, (err, rows, fields) => {
      if (err) {
        result(err, rows);
        return;
      }

      result(null, rows);
    });
  },

  //update user type (1-Admin or 2-User)
  editUserType({ idUser }, { idType }, result) {
    let query = `update uZvFiNMuwF.user set idType = ${idType}`;
    query += ` where idUser = ${idUser}`;

    sql.query(query, (err, rows, fields) => {
      if (err) {
        result(err, rows);
        return;
      }

      result(null, rows);
    });
  },

  //verify user
  verifyUser({ idUser }, {}, result) {
    let query = `update uZvFiNMuwF.user set verified = 1`;
    query += ` where idUser = ${idUser}`;

    sql.query(query, (err, rows, fields) => {
      if (err) {
        result(err, rows);
        return;
      }

      result(null, rows);
    });
  },

  //Add credits to user by id
  addCreditToUser({ idUser }, { credit }, result) {
    let query = `update uZvFiNMuwF.user set`;
    if (credit != undefined || credit != null)
      query += ` credit = credit + ${credit} `;
    query += ` where idUser = ${idUser}`;
    console.log(query);
    sql.query(query, (err, rows, fields) => {
      if (err) {
        result(err, rows);
        return;
      }

      result(null, rows);
    });
  },

  //take credits from an user by id
  takeCreditsFromUser({ idUser }, { credit }, result) {
    let query = `update user set`;
    if (credit != undefined || credit != null)
      query += ` credit = credit - ${credit} `;
    query += ` where idUser = ${idUser}`;
    console.log(query);
    sql.query(query, (err, rows, fields) => {
      if (err) {
        result(err, rows);
        return;
      }

      result(null, rows);
    });
  },

  delete({ iduser }, result) {
    /**
     * Como temos relações temos que eliminar as entradas do user
     * em todas as tabelas antes de eliminar o user
     * as tabelas podem ser:
     * order
     * user_house
     * user_contact
     * review
     *
     * Nota:
     * Há tabelas em que não queremos apagar os registos porque senão não ficamos com o históorico do
     * que aconteceu.
     * Por isso o que vamos fazer aqui vai ser um "virtual delete" em que vamos apenas desativar o user.
     * Desta maneira continuamos com um histórico do user e das suas ações
     * Depois é melhor fazer um outro delete para realmente apagar o user.
     */
    let query = `
        delete from user where idUser = ${iduser}`;

    sql.query(query, (err, rows, fields) => {
      if (err) {
        result(err, rows);
        return;
      }

      result(null, rows);
    });
  }
};

module.exports = userCrud;
