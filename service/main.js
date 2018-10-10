
var express = require('express');
var session = require('express-session');

var app = express();

app.get('/',function (req,res) {
    res.sendfile(__dirname + "/" + "index.html");
});


app.get('/login',function (req,res) {
    var name = req.query.name;
    var pwd = req.query.pwd;

    /*
    var selectSQL = "select * from user where uname = '" + name + "' and pwd = '" + pwd + "'";
    connection.query(selectSQL, function (err, rs) {
        if (err) throw  err;
        console.log(rs);
        console.log('OK');
        res.sendfile(__dirname + "/" + "OK.html");
    })
    */
});

app.get('/register.html',function (req,res) {
    res.sendfile(__dirname + "/" + "register.html");
});


app.get('/register',function (req,res) {
    var  name=req.query.name;
    var  pwd=req.query.pwd;
    var  user={uname:name,pwd:pwd};
    /*
    connection.query('insert into user set ?',user,function (err,rs) {
        if (err) throw  err;
        console.log('ok');
        res.sendfile(__dirname + "/" + "index.html" );
    })
    */
});

var  server=app.listen(7744,function () {
    console.log("start");
});

//https://blog.csdn.net/cramon/article/details/54983591
//https://www.cnblogs.com/imwtr/p/4360341.html
//https://www.cnblogs.com/htoooth/p/7340628.html