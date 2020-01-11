const middlewares = {
    visualizeHeaders(req, res, next) {
        // process.stdout.write("\u001b[0J\u001b[1J\u001b[2J\u001b[0;0H\u001b[0;0W");

        console.log(req.headers);
        next()
    }
}

module.exports = middlewares;