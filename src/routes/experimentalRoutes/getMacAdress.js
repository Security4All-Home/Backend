const router = require("express").Router();
const os = require('os');

router.get("/getmacadress", (req, res) => {
    let netInterface = os.networkInterfaces()
    // console.log(netInterface["Wi-Fi"])
    res.json(netInterface["Wi-Fi"]);
})

module.exports = router;