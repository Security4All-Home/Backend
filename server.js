const server = require("express").Router();

/** NPM Packages, ver se não dá para passar o invocamento das packages para o loader.js */
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const experimentalRoutesPath = "./src/routes/experimentalRoutes/";
const generalRoutesPath = "./src/routes/";
const ourMiddlewarePath = "./src/middlewares/";
/** Routes */
const errorHandler = require(experimentalRoutesPath + "errorhandling.route")
  .errorHandler;
const testRoute = require(experimentalRoutesPath + "tests.route");
const getMacAdressRoute = require(experimentalRoutesPath + "getMacAdress");


/** "Real" Routes */
const categoryRoute = require(generalRoutesPath + "category.route");
const achievementsRoute = require(generalRoutesPath + "achievement.route");
const sensorRoute = require(generalRoutesPath + "sensor.route");
const userRoute = require(generalRoutesPath + "user.route");
const packageRoute = require(generalRoutesPath + "package.route")
const authRoute = require(generalRoutesPath+"auth.route")
const orderRoute = require(generalRoutesPath + "order.route")
const houseRoute = require(generalRoutesPath + "house.route")
/** Our middlewares */
const testMiddleware = require(ourMiddlewarePath + "test/test.mid.js");
//const sanitizerMiddleware = require(ourMiddlewarePath + "sanitizer.middleware")


/** Middlewares */
server.use(cors()) // Não pode ficar assim depois
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cookieParser());
// server.use(testMiddleware.visualizeHeaders);
// server.use(sanitizerMiddleware)

server.use("/macadress", getMacAdressRoute);
server.use("/test", testRoute);

/** Paths */
server.use("/auth", authRoute);

server.use("/category", categoryRoute);
server.use("/achievement", achievementsRoute);
server.use("/sensors", sensorRoute);
server.use("/user", userRoute);
server.use("/packages", packageRoute);
server.use("/house", houseRoute);

server.get("/home", (req, res) => {
  res.send(`
    <h1 style="color: green; font-family: "Comic Sans MS", cursive, sans-serif">Bem Vindo à nossa API </h1>
    `);
});

server.get("/teste", (req, res) => {
  res.send("Test Page");
});

/** Caminho que avisa que que o caminho pedido não existe */
server.all("/*", (req, res) => {
  /** Custom Page when the requested route isnt available */
  // res.send("<h1 style='color: brown;'>Page not Found</h1>")
  res
    .status(404)
    .json({ success: false, msg: "That route doens't exist !!!", status: 404 });
});

/** Middlewares Finais (Estes precisam de estar no fim (penso eu de que...)) */
server.use(errorHandler);

module.exports = server;
