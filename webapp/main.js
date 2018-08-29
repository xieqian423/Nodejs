
const http = require('../utils/http');

function getDetail() {
    http.post('/user/getDetails',{}, function (res) {
        console.log(res);
    });
}