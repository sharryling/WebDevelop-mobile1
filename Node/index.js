var express = require('express');
var app = express();
var session = require('express-session');
//创建了session，用户登录就会分配给一个sessionId
app.use(session({
    secret: 'hubwiz app', //secret的值建议使用随机字符串
    cookie: {maxAge: 10 * 1000 * 30} // 过期时间（毫秒）
}));
var path = require('path')

//app.use('/static', express.static(path.join(__dirname, '../Web-M-XYS')))
//设置后，相当于 前后端同源 ；或者在前端的AJAX设置xhrFields: {withCredentials: true}

//引入文件模块
var fs = require('fs')
fs.readFile("./src/data.json")
var file = path.join(__dirname, 'src/data.json'); 

//  主页输出 "Hello World"
app.get('/', function (req, res) {
    console.log("主页 GET 请求");
    res.send('Hello GET');
})

//  POST 请求
app.post('/', function (req, res) {
    console.log("主页 POST 请求");
    res.send('Hello POST');
})

//  /del_user 页面响应
app.get('/del_user', function (req, res) {
    console.log("/del_user 响应 DELETE 请求");
    if (req.session.sign) {//检查用户是否已经登录
        console.log(req.session);//打印session的值
        res.send('welecome <strong>' + req.session.name + '</strong>, 欢迎你再次登录');
    } else {//否则展示index页面
        req.session.sign = true;
        req.session.name = '汇智网';
        res.end('欢迎登陆！');
    }
})

//  /list_user 页面 GET 请求
app.get('/list_user', function (req, res) {
    console.log("/list_user GET 请求");
    console.log('session id: ', req.session.id);
    res.set({'Content-Type':'application/json','Access-Control-Allow-Origin':'*'})
    res.cookie('haha', 'name1=value1&name2=value2', {
        maxAge: 20 * 1000, path: '/', httpOnly: false
    });
    fs.readFile(file, 'utf-8', function(err, data) {
        if (err) {
            res.send('文件读取失败');
        } else {
            res.send(data.toString());
        }
    });
    
})

/* // 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function (req, res) {
    console.log("/ab*cd GET 请求");
    res.send('正则匹配');
}) */


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})

