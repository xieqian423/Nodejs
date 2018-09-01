
const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
const mime = require('./common/lookup.js');
const Router = require('./route');

console.log("process.cwd(): " +  process.cwd());
console.log("__dirname: " + __dirname);
console.log("__filename: " + __filename);

class HttpServer {
    constructor() {
        this.root = __dirname; //process.cwd(); //config.root;
        this.webContentPath = path.join(this.root, 'webapp');
    }

    start() {
        http.createServer((req, res) => {
            const t = this;
            var pathName = req.url;
            if(req.url == '/'){
                //res.setHeader('Content-Type', "text/html;charset='utf-8'");
                pathName = path.join(this.webContentPath, 'index.html');
            }else{
                //res.setHeader('Content-Type', mime.lookup(pathName));
                pathName = path.join(this.webContentPath, pathName);
            }

            console.log('req', pathName);
            if(pathName.split('.').length > 1){
                fs.exists(pathName, function(exists){
                    console.log(pathName, exists);
                    if(!exists){
                        console.log(pathName + ' not exists.');
                        res.end('page not found');
                    }else{
                        if(req.url == '/'){
                            res.setHeader('Content-Type', "text/html;charset='utf-8'");
                        }else{
                            res.setHeader('Content-Type', mime.lookup(pathName));
                        }
                        fs.readFile(pathName, 'utf-8', function (err, data) {
                            if(err){
                                res.end('page not found');
                            }else {
                                res.end(data);
                            }
                        })
                    }
                });
            }else{
                t.routeHandler(req, res);
            }

            //if(this.isFile(pathName)){
            //    if(req.url == '/'){
            //        res.setHeader('Content-Type', "text/html;charset='utf-8'");
            //    }else{
            //        res.setHeader('Content-Type', mime.lookup(pathName));
            //    }
            //    fs.readFile(pathName, 'utf-8', function (err, data) {
            //        if(err){
            //            res.end('page not found');
            //        }else {
            //            res.end(data);
            //        }
            //    })
            //}else {
            //    this.routeHandler(req, res);
            //}
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

    isFile (req, res) {
        return fs.existsSync(req.url);
    }

    respondFile () {

    }

    routeHandler (req, res) {
        var route = req.url;
        var result = JSON.stringify({
            name: 'tom',
            age: 24
        });
        res.writeHead(200,{'Content-Type':'text/json'});
        //res.setHeader('Content-Type', 'text/json');
        res.write(result);
        res.end();
        // cookie解析
        //Router.get('/login', function (req, res) {
        //    res.writeHead(200,{'Content-Type':'application/json'});
        //    res.end({
        //        name: 'tom',
        //        age: 24
        //    });
        //});
        //
        //Router.get('/user/getDetails', function (req, res) {
        //    res.writeHead(200);
        //    res.end(JSON.stringify({
        //        name: 'tom',
        //        age: 24
        //    }));
        //});
    }
}

//module.exports = new HttpServer
(new HttpServer()).start();

//创建守护进程自动重启
