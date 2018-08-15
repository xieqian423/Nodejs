
const http = require('http');
const path = require('path');
const fs = require('fs');
//const url = require('url');
const mime = require('./lookup');
const config = require('./config/default');

console.log("process.cwd(): " +  process.cwd());
console.log("__dirname: " + __dirname);
console.log("__filename: " + __filename);

class StaticServer {
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

    routeHandler(pathName, req, res) {
        fs.stat(pathName, (err, stat) => {
            if(!err){
              //this.respondFile(pathName, req, res);
                const requestPath = url.parse(req.url).pathname;
                console.log("req.url: " + req.url);
                console.log("url.parse: " + url.parse(req.url));
                if(requestPath.lastIndexOf("/") == requestPath.length-1 && stat.isDirectory()){
                    this.respondDirectory(pathName, req, res);
                }else if (stat.isDirectory()) {
                    this.respondRedirect(req, res);
                } else {
                    this.respondFile(pathName, req, res);
                }
            }else {
              this.respondNotFound(req, res);
            }
        });
    }

    respondFile(pathName, req, res) {
        const readStream = fs.createReadStream(pathName);
        res.setHeader("Content-Type", mime.lookup(pathName));
        readStream.pipe(res);
    }

    respondRedirect(req, res) {

    }

    respondDirectory(pathname, req, res) {

    }

    respondNotFound(req, res){
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.end(`<h1>Not Found</h1><p>The requested URL ${req.url} was not found on this server.</p>`);
    }
}

module.exports = StaticServer;