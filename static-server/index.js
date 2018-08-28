
const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
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
        //res.setHeader("content-type", 'text/html');
        res.setHeader("content-type", mime.lookup(pathName));
        readStream.pipe(res);
    }

    respondRedirect(req, res) {
        const location = req.url + '/';
        res.writeHead(301, {
            'Location': location,
            'Content-Type': 'text/html'
        });
        res.end(`Redirecting to <a href='${location}'>${location}</a>`);
    }

    respondDirectory(pathname, req, res) {
        const indexPage = path.join(pathname, this.indexPage);
        if(fs.existsSync(indexPage)){
            this.respondFile(indexPage, req, res);
        }else{
            fs.readdir(pathname, (err, files) => {
                if(err){
                    res.writeHead(500);
                    return res.end(err);
                }
                const requestPath = url.parse(req.url).pathname;
                let content = `<h1>Index of ${requestPath}</h1>`;
                files.forEach(file => {
                    let itemLink = path.join(requestPath, file);
                    const  stat = fs.statSync(path.join(pathname,file));
                    if(stat && stat.isDirectory()){
                        itemLink = path.join(itemLink, '/');
                    }
                    content += `<p><a href='${itemLink}'>${file}</a></p>`;
                });
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.end(content);
            })

        }
    }

    respondNotFound(req, res){
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.end(`<h1>Not Found</h1><p>The requested URL ${req.url} was not found on this server.</p>`);
    }
}

module.exports = StaticServer;