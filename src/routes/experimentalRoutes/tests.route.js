const router = require("express").Router();
const https = require("https");

router.get("/testpage", (req, res) => {
    res.send("<h1>Test Page</h1>");
})
router.get("/testerror", (req, res) => {
    throw Error("Erro da rota /test")
})

/** Test how to make requests in basic nodejs and seting a new timeout to those
 * requests so we can control stuff
 */
router.get('/mr', (req, resp) => {
    // https://duckduckgo.com/?q=set+timeout+time+to+https.get+request+nodejs&t=brave&ia=web&iax=qa
    // https://hidden-forest-71636.herokuapp.com/user/

    let request = https.get('https://mamamamamwefwefwef.cn', (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        })

        res.on('end', () => {
            console.log(data, "dfataaaaaaaaaa")
            resp.send(data)
        })
    }).on('error', (error) => {
        console.log(error, 'error')
        // resp.send("fodeyu com erro")
    })

    request.on('socket', (socket) => {
        socket.setTimeout(5000); //miliseconds
        socket.on('timeout', () =>  {
            console.log("A conexão expuirou aakakakakakak");
            request.abort()
            resp.send("fodeyu")
        })
        console.log(socket, 'socket')
    })
})

router.get("/error", (req, res, next) => {
    next({error: "error TEste!!!!"})
}) 

module.exports = router;