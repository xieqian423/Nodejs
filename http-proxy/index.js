
var http = require('http');
var opt = {
    host: '',
    port: '',
    method: '',
    path: '',
    headers:{}
};

class HttpProxy {
    construtor () {}
    start () {
        var body = '';
        var req = http.request(opt, function (res) {
            res.on('data', function (d) {
                body += d;
            }).on('end', function () {
                console.log(res.headers);
                console.log(res.body);
            });
        }).on('error', function (e) {
            console.log("Got error: " + e.message);
        });

        req.end();
    }
}