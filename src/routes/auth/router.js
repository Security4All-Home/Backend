const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');
/*
module.exports = function(app) {

    const controller = require('../../controllers/auth.controller.js');
 
	app.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], controller.signup);
	
	app.post('/api/auth/signin', controller.signin);
	
	app.get('/api/test/user', [authJwt.verifyToken], controller.userContent);
	
	app.get('/api/test/pm', [authJwt.verifyToken, authJwt.isPmOrAdmin], controller.managementBoard);
	
	app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
}
*/

//---------------------------------------------
const router = require("express").Router();
const userController = require('../../controllers/auth.controller.js');



//SIGN UP
router.post('/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], userController.signup, (req, res, next) => {
    userController.insert(req, res, next);
})

//SIGN IN 
router.post('/signin',userController.signin, (req, res, next) => {
    userController.insert(req, res, next);
})

//ROTA ACESSIVEL A TODOS OS USERS
router.get('/test/user',[authJwt.verifyToken], userController.userContent, (req, res, next) => {
    userController.getById(req, res, next)
})

//ROTA APENAS ACESSIVEL AO PM E ADMIN
router.get('/test/pm/:id',[authJwt.verifyToken, authJwt.isPmOrAdmin], userController.managementBoard, (req, res, next) => {
    userController.getById(req,res, next)
})

//ROTA APENAS ACESSIVEL AO ADMIN
router.get('/test/admin', [authJwt.verifyToken, authJwt.isAdmin], userController.adminBoard, (req, res, next) => {
    userController.getById(req,res, next)
})


/*



/** Get Users by house */
/*
router.get('/house/:codigoPostal', (req, res, next) => {
    userController.getUsersByHouse(req, res, next);
})
*/

module.exports = router;