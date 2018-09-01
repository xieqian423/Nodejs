
var http = {};

function post(url, options, callback) {
    var xhr = new XMLHttpRequest();
    //使用HTTP POST请求与服务器交互数据
    xhr.open("POST", url, true);
    //设置发送数据的请求格式
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status === 200) {
            //根据服务器的响应内容格式处理响应结果
            if(xhr.getResponseHeader('content-type')==='application/json'){
                var result = JSON.parse(xhr.responseText);
                callback(result);
                //根据返回结果判断验证码是否正确
                if(result.code===-1){
                    alert('验证码错误');
                }
            } else {
                console.log(xhr.responseText);
            }
        }
    };
    xhr.send(JSON.stringify(options));
}

function get(url, options, callback) {
    var xhr = new XMLHttpRequest();
    //使用HTTP POST请求与服务器交互数据
    xhr.open("GET", url, true);
    //设置发送数据的请求格式
    //xhr.setRequestHeader('content-type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status === 200) {
            //根据服务器的响应内容格式处理响应结果
            if(xhr.getResponseHeader('content-type')==='application/json'){
                var result = JSON.parse(xhr.responseText);
                callback(result);
                //根据返回结果判断验证码是否正确
                if(result.code===-1){
                    alert('验证码错误');
                }
            } else {
                console.log(xhr.responseText);
            }
        }
    };
    xhr.send(null);
}

http.post = post;
http.get = get;