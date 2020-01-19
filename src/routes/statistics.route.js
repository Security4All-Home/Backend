const router = require("express").Router();
const statisticsController = require("../controllers/sql/statistics.controller");
const {  verifyToken } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * paths:
 *  /statistics/numUsers:
 *      get:
 *        tags:
 *          - statistics
 *        summary: Vai Buscar o número de utilizadores registados na base de dados
 *        operationId: getNumUsers
 *        produces:
 *          - aplication/json
 *        responses:
 *          200:
 *            description: Operação bem sucedida
 *          400:
 *            description: Erro ao realizar esta operação
 *  /statistics/numSensorsSold:
 *      get:
 *        tags:
 *          - statistics
 *        summary: Vai Buscar a quantidade de sensores vendidos
 *        operationId: getNumSensorsSold
 *        produces:
 *          - aplication/json
 *        responses:
 *          200:
 *            description: Operação bem sucedida
 *          400:
 *            description: Erro ao realizar esta operação
 *  /statistics/installation:
 *      get:
 *        tags:
 *          - statistics
 *        summary: Vai Buscar o número de pedidos de instalação na base de dados
 *        operationId: getInstallation
 *        produces:
 *          - aplication/json
 *        responses:
 *          200:
 *            description: Operação bem sucedida
 *          400:
 *            description: Erro ao realizar esta operação
 *  /statistics/ordersToPay:
 *      get:
 *        tags:
 *          - statistics
 *        summary: Vai Buscar o número de encomendas por pagar na base de dados
 *        operationId: getNumOrderToPay
 *        produces:
 *          - aplication/json
 *        responses:
 *          200:
 *            description: Operação bem sucedida
 *          400:
 *            description: Erro ao realizar esta operação
 *  /statistics/numHouses:
 *      get:
 *        tags:
 *          - statistics
 *        summary: Vai Buscar o número de casas existentes na base de dados
 *        operationId: getNumHouses
 *        produces:
 *          - aplication/json
 *        responses:
 *          200:
 *            description: Operação bem sucedida
 *          400:
 *            description: Erro ao realizar esta operação
 *  /statistics/avgSensor:
 *      get:
 *        tags:
 *          - statistics
 *        summary: Vai Buscar a média de sensores por casa
 *        operationId: getAvgSensor
 *        produces:
 *          - aplication/json
 *        responses:
 *          200:
 *            description: Operação bem sucedida
 *          400:
 *            description: Erro ao realizar esta operação
 *  /statistics/usersToValidate:
 *      get:
 *        tags:
 *          - statistics
 *        summary: Vai Buscar o número de utilizadores registados que ainda não validaram a sua conta na base de dados
 *        operationId: getNumUsersToValidate
 *        produces:
 *          - aplication/json
 *        responses:
 *          200:
 *            description: Operação bem sucedida
 *          400:
 *            description: Erro ao realizar esta operação
 *  /statistics/numAchievements:
 *      get:
 *        tags:
 *          - statistics
 *        summary: Vai Buscar o número de conquistas registadas na base de dados
 *        operationId: getNumAchievements
 *        produces:
 *          - aplication/json
 *        responses:
 *          200:
 *            description: Operação bem sucedida
 *          400:
 *            description: Erro ao realizar esta operação
 */
router.get("/numUsers",  (req, res, next) => {
  statisticsController.numberOfUsers(req, res, next);
});

router.get("/numSensorsSold", (req, res, next) => {
  statisticsController.numberOfSensorsSold(req, res, next);
});

router.get("/installation", (req, res, next) => {
  statisticsController.installationRequests(req, res, next);
});

router.get("/ordersToPay", (req, res, next) => {
  statisticsController.ordersToPay(req, res, next);
});

router.get("/numHouses", (req, res, next) => {
  statisticsController.numberOfHouses(req, res, next);
});

router.get("/avgSensor", (req, res, next) => {
  statisticsController.avgSensorForHouse(req, res, next);
});

router.get("/usersToValidate", (req, res, next) => {
  statisticsController.usersToValidate(req, res, next);
});

router.get("/numAchievements", (req, res, next) => {
  statisticsController.numberOfAchievements(req, res, next);
});
module.exports = router;
