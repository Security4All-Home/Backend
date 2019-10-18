const express = require("express");

const server = express();

/** Routes */
const errorHandler = require("./src/routes/errorhandling.route").errorHandler;
const testRoute = require("./src/routes/tests.route");

const port = 8002;

server.use("/test", testRoute)
server.get("/test", (req, res) => {
    res.send("Test Page")
})
server.all("/*", (req, res) => {
    /** Custom Page when the requested route isnt available */
    res.send("<h1 style='color: brown;'>Page not Found</h1>")
})
server.use(errorHandler)
server.listen(port, () => {
    console.log(`Server runnig on localhost:${port}`);
})