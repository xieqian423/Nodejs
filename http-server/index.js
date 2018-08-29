
const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
const Router = require('../route');

console.log("process.cwd(): " +  process.cwd());
console.log("__dirname: " + __dirname);
console.log("__filename: " + __filename);

class HttpServer {
    constructor() {
        this.root = __dirname; //process.cwd(); //config.root;
    }

    start() {
        http.createServer((req, res) => {
            if(req.url !== "/"){
                this.routeHandler(req, res);
            }else {
                res.setHeader('Content-TYpe', "text/html;charset='utf-8'");
                fs.readFile(path.join(this.root, '../webapp/index.html'), 'utf-8', function (err, data) {
                    if(err){
                        res.end('page not found');
                    }else {
                        res.end(data);
                    }
                })
            }
            //res.writeHead(200);
            //res.end(`Requeste path: ${pathName}`);
        }).listen(8999, err => {
            if (err) {
                console.error(err);
                console.info('Failed to start server');
            } else {
                console.info(`Server started on port 8999`);
            }
        });
    }

    routeHandler (req, res) {
        var route = req.url;
        // cookie解析
        Router.get('/user/getDetails', function (req, res) {
            res.writeHead(200);
            res.end({
                name: 'tom',
                age: 24
            });
        });
    }
}

//module.exports = new HttpServer
(new HttpServer()).start();

//创建守护进程自动重启
