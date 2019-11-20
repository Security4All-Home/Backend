const server = require("express").Router();
// const server = express();

/** Routes */
const errorHandler = require("./src/routes/experimentalRoutes/errorhandling.route").errorHandler;
const testRoute = require("./src/routes/experimentalRoutes/tests.route");
const getMacAdressRoute = require("./src/routes/experimentalRoutes/getMacAdress");


server.use("/macadress", getMacAdressRoute);
server.use("/test", testRoute);

server.get("/test", (req, res) => {
    res.send("Test Page")
})
server.all("/*", (req, res) => {
    /** Custom Page when the requested route isnt available */
    res.send("<h1 style='color: brown;'>Page not Found</h1>")
})
server.use(errorHandler)

module.exports = server;