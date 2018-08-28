
var https = require('https');
var fs = require('fs');
var path = require('path');

const configPath = __dirname + '/cas/';

console.log(path.join(configPath, 'key.pem'));
var options = {
    key: fs.readFileSync(path.join(configPath, 'key.pem')),
    cert: fs.readFileSync(path.join(configPath, 'cert.pem'))
}

class HttpsServer {
    constructor () {}
    start () {
        https.createServer(options, function (req, res) {
            res.writeHead(200);
            res.end('this is a https server!');
        }).listen(8999);
    }
}

module.exports = HttpsServer;


