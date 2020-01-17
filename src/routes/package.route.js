const router = require("express").Router();
const packageController = require("../controllers/sql/package.controller");
/**
 * @swagger
 * paths:
 *  /packages:
 *    post:
 *        tags:
 *            - package
 *        summary: Adiciona um package à base de dados
 *        operationId: addPackage
 *        description: Adiciona um package à base de dados
 *        consumes:
 *            - application/json
 *        produces:
 *            - application/json
 *        parameters:
 *            - in: body
 *              name: packageItem
 *              description: Package Item to add
 *              schema:
 *                $ref: '#/definitions/PackageItem'
 *        responses:
 *            200:
 *              description: Item created
 *            400:
 *              description: invalid input, object invalid
 *    get:
 *        tags:
 *            - package
 *        summary: Vai buscar todos os packages à base de dados
 *        operationId: GetPackages
 *        description: Ir buscar todos os packages à base de dados
 *        produces:
 *            - application/json
 *        responses:
 *            200:
 *              description: Todos os packages da base de dados
 *            400:
 *              description: Erro a ir buscar os packages
 *  /packages/{id}:
 *    get:
 *        tags:
 *            - package
 *        summary: Vai buscar um package específico
 *        operationId: GetPackageByID
 *        description: Ir buscar um package específico à base de dados
 *        produces: 
 *            - application/json
 *        parameters:
 *            - name: id
 *              in: path
 *              required: true
 *        responses:
 *              200:
 *                description: package especifico da base de dados
 *              400:
 *                description: Erro a ir buscar o package
 *    put:
 *        tags:
 *            - package
 *        summary: Edita um package
 *        operationId: GetPackageByID
 *        description: Editar um package específico
 *        consumes:
 *            - application/json
 *        produces:
 *            - application/json
 *        parameters:
 *            - name: id
 *              in: path
 *              required: true
 *            - name: Package Body
 *              in: body
 *              schema:
 *                $ref: '#definitions/PackageItem'
 *        responses:
 *              200:
 *                description: Package editado
 *              400:
 *                description: Erro a editar package
 *    delete:
 *        tags:
 *            - package
 *        summary: Elimina um package
 *        operationId: DeletePackage
 *        description: Apagar um package da base de dados
 *        produces:
 *            - application/json
 *        parameters:
 *            - name: id
 *              in: path
 *              required: true
 *        responses:
 *              200:
 *                description: Package removido com sucesso
 *              400:
 *                description: Erro ao apagar package
 *  /packages/package/{idPackage}:
 *    delete:
 *        tags:
 *            - package
 *        summary: Elimina sensor de um package
 *        operationId: RemoveSensorFromPackage
 *        description: Remover um sensor de uma package
 *        produces:
 *            - application/json
 *        parameters:
 *            - name: idPackage
 *              in: path
 *              required: true
 *              schema:
 *                type: Integer
 *            - name: idSensor
 *              in: query
 *              required: true
 *              schema:
 *                type: Integer
 *        responses:
 *              200:
 *                description: Sensor removido do package com sucesso
 *              400:
 *                description: Erro ao remover sensor do package
 * definitions:
 *  PackageItem:
 *    properties:
 *      name:
 *        type: string
 *        example: pro
 *      description:
 *        type: string
 *        example: Package Pro (Package Basic + sistema de deteção de fumo )
 *      price:
 *        type: number
 *        format: float
 *        examples: 24.99
 */  
//Create package
router.post("/", (req, res, next) => {
  packageController.addPackage(req, res, next);
});

//Add Sensor List to Package
router.post("/sensor/:idPackage", (req, res, next) => {
  packageController.addSensorToPackage(req,res,next);
})

//Read package
router.get("/", (req, res, next) => {
  packageController.getAll(req, res, next);
});
//ReadByID
router.get("/:id", (req, res, next) => {
  packageController.getByID(req, res, next);
});
//Update package
router.put("/:id", (req, res, next) => {
  packageController.updateByID(req, res, next);
});
//Delete package
router.delete("/:id", (req, res, next) => {
  packageController.deleteByID(req, res, next);
});
//Remove sensor from package
router.delete("/package/:idPackage", (req, res, next) => {
  console.log("req", req.query.idSensor);
  packageController.removeSensorFromPackage(req, res, next);
});
module.exports = router;
