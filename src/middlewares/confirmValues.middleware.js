/**
 * Para não ter que agora estar a ir a todos 
 * os sitios fazer a condição de enviar um erro 
 * para o caso de um campo estar vazio.
*/
module.exports = (req, res, next) => {
    console.log(req.url, req.path, req.url, req.body, req.params, req.method)

    let body = req.body;
    let params = req.params
    let url = req.url
    let method = req.method
    let move = true;

    switch(url) {
        case "/home":
            console.log("LALALALALALALALALA")
        break;
    
        case "/sensor/":
            if(method == "POST") {
                if(body.name == "") {
                    move = false
                    next({error: "sensor name can t be empty", custom: true})
                }
            }
        break;
    }

    if(move) next();
}