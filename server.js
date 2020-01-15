const server = require("express").Router();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

/** Swagger */
const swaggerJSDocs = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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
const sanitizerMiddleware = require(ourMiddlewarePath + "sanitizer.middleware");
const packageRoute = require(generalRoutesPath + "package.route")
const orderRoute = require(generalRoutesPath + "order.route")
const houseRoute = require(generalRoutesPath + "house.route")
const authRoute = require(generalRoutesPath + "auth.route");
const alertRoute = require(generalRoutesPath + "alert.route");

const arduinoRoute = require(generalRoutesPath + "arduino.route");
/** Our middlewares */
const testMiddleware = require(ourMiddlewarePath + "test/test.mid.js");
const confirmMiddleware = require(ourMiddlewarePath + 'confirmValues.middleware.js')
const authMiddleware = require(ourMiddlewarePath + "auth.middleware.js")
//const sanitizerMiddleware = require(ourMiddlewarePath + "sanitizer.middleware")


/** Middlewares */
server.use(cors()) // Não pode ficar assim depois
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cookieParser());

/** Middleware for Swagger Documentation */
console.log(`http://localhost:${process.env.PORT}`)
let swaggerConfig = {
  swagger: "2.0",
  swaggerDefinition: {
    info: {
      title: "Sec4All Documentation",
      description: "All routes in Sec4All Project \n Github: https://github.com/Security4All-Home/Backend",
      version: "1.0.0",
      contact: {
        name: "Sec4AllSupp",
        email: "sec4allsupp@gmail.com"
      },
      servers: [`http://localhost:${process.env.PORT}`]
    },
  },
  apis: ['./server.js', './src/routes/*.route.js']
}

const swaggerOptions = {
  explorer: true
}

const swaggerDocs = swaggerJSDocs(swaggerConfig);
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, swaggerOptions))

server.use("/macadress", getMacAdressRoute);
server.use("/test", testRoute);
server.use(confirmMiddleware);

/** Paths */
server.use("/auth", authRoute);


server.use("/order", orderRoute);
server.use("/category",categoryRoute);
server.use("/achievement", achievementsRoute);
server.use("/sensors", sensorRoute);
server.use("/user", userRoute);
server.use("/packages", packageRoute);
server.use("/alerts", alertRoute);
server.use("/house", houseRoute);
server.use("/arduino", arduinoRoute);

/**
 * @swagger
 *  /home:
 *    get:
 *      summary: "Só para ter uma landing Page para a API"
 *      tags:
 *        - "home"
 *      description: Só para dizer olá
 */
server.get("/home", (req, res) => {
  // res.send(`
  //   <h1 style="color: green; font-family: "Comic Sans MS", cursive, sans-serif">Bem Vindo à nossa API</h1>
  //   `);
  res.json({asda: "ad"})
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
