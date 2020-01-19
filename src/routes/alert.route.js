const route = require("express").Router();
const alertController = require("../controllers/mongo/alert.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
/**
 *
 * @swagger
 * paths:
 *  /alerts:
 *    post:
 *      tags:
 *        - alerts
 *      summary: Cria um alerta na base de dados
 *      operationId: addAlert
 *      description: Cria um alerta e adiciona-o na base de dados
 *      consumes:
 *        - application/json
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: alertItem
 *          description: Alert Item que vai ser acrescentado
 *          schema:
 *            $ref: '#/definitions/AlertItem'
 *       # - in: header
 *       #   name: x-access-token
 *       #   required: true
 *          schema:
 *            type: string
 *      responses:
 *          200:
 *            description: Alerta adicionado com sucesso
 *          400:
 *            description: Erro ao adicionar o Alerta
 *    get:
 *      tags:
 *        - alerts
 *      summary: Vai Buscar os alertas todos à base de dados
 *      operationId: getAlerts
 *      description: Vai buscar os alertas todos da base de dados
 *      parameters:
 *       # - in: header
 *       #   name: x-access-token
 *       #   required: true
 *          schema:
 *            type: string
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Os alertas foram encontrados com sucesso
 *        400:
 *          description: Erro ao procurar os Alertas
 *  /alerts/{id}:
 *    get:
 *      tags:
 *        - alerts
 *      summary: Vai buscar um alert especifico por id
 *      operationId: getAlertByID
 *      description: Vai buscar um alerta especifico com um id enviado nos parametros
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *       # - in: header
 *       #   name: x-access-token
 *       #   required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Alerta encontrado com sucesso
 *        400:
 *          description: Erro ao procurar o Alerta
 *    delete:
 *      tags:
 *        - alerts
 *      summary: Apaga um alerta
 *      operationId: removeAlert
 *      description: Remove um alerta da base de dados
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *       # - in: header
 *       #   name: x-access-token
 *       #   required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Alerta removido com sucesso
 *        400:
 *          description: Erro ao remover o Alerta
 * definitions:
 *  AlertItem:
 *    type: object
 *    properties:
 *      alertText:
 *        type: string
 *        example: O sensor de fumo ficou sem stock
 *      alertType:
 *        type: String
 *        example: warning
 */

route.post("/"/*verifyToken*/, (req, res, next) => {
  alertController.addAlert(req, res, next);
}); //Feito
route.get("/"/*verifyToken*/, (req, res, next) => {
  alertController.getAlerts(req, res, next);
}); //Feito
route.get("/:id"/*verifyToken*/, (req, res, next) => {
  alertController.getAlertById(req, res, next);
}); //Feito
route.delete("/:id"/*verifyToken*/, (req, res, next) => {
  alertController.removeAlert(req, res, next);
}); //Feito
module.exports = route;
