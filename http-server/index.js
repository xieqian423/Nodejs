
const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
const mime = require('./lookup');
const config = require('./config/default');

console.log("process.cwd(): " +  process.cwd());
console.log("__dirname: " + __dirname);
console.log("__filename: " + __filename);

class HttpServer {
    constructor() {
        this.port = config.port;
        this.root = __dirname; //process.cwd(); //config.root;
        this.indexPage = config.indexPage;
    }

    start() {
        http.createServer((req, res) => {
            const pathName = path.join(this.root, path.normalize(req.url));
            this.routeHandler(pathName, req, res);
            //res.writeHead(200);
            //res.end(`Requeste path: ${pathName}`);
        }).listen(this.port, err => {
            if (err) {
                console.error(err);
                console.info('Failed to start server');
            } else {
                console.info(`Server started on port ${this.port}`);
            }
        });
    }
}

module.exports = HttpServer
