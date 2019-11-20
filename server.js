const server = require("express").Router();

/** NPM Packages, ver se não dá para passar o invocamento das packages para o loader.js */
const bodyParser = require('body-parser');

const experimentalRoutesPath = "./src/routes/experimentalRoutes/"
const generalRoutesPath = "./src/routes/"
/** Routes */
const errorHandler = require(experimentalRoutesPath + "errorhandling.route").errorHandler;
const testRoute = require(experimentalRoutesPath + "tests.route");
const getMacAdressRoute = require(experimentalRoutesPath + "getMacAdress");

/** "Real" Routes */
const categoryRoute = require(generalRoutesPath + "category.route");
const achievementsRoute = require(generalRoutesPath + "achievement.route");

/** Middlewares */
server.use("/macadress", getMacAdressRoute);
server.use("/test", testRoute);
server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json())

/** Paths */
server.use("/cat", categoryRoute);
server.use("/achie", achievementsRoute);

server.get("/teste", (req, res) => {
    res.send("Test Page")
})
server.all("/*", (req, res) => {
    /** Custom Page when the requested route isnt available */
    // res.send("<h1 style='color: brown;'>Page not Found</h1>")
    res.json({msg: "That route doens't exist !!!"})
})

/** Middlewares Finais (Estes precisam de estar no fim (penso eu de que...)) */
server.use(errorHandler)

module.exports = server;