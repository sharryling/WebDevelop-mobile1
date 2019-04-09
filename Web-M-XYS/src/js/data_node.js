const http = require('http')
//const fs = require('fs')
var data =[{
    pcUrl:"../images/slide_01_2000x410.jpg",
    mUrl:"../images/slide_01_640x340.jpg"
},
{
    pcUrl:"../images/slide_02_2000x410.jpg",
    mUrl:"../images/slide_02_640x340.jpg"
},
{
    pcUrl:"../images/slide_03_2000x410.jpg",
    mUrl:"../images/slide_03_640x340.jpg"
},
{
    pcUrl:"../images/slide_04_2000x410.jpg",
    mUrl:"../images/slide_04_640x340.jpg"
}
]
var server = http.createServer((request,response)=>{
    response.writeHead(200,{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'});
    response.end(JSON.stringify(data))
})
//监听端口号
server.on('request',()=>{
    console.log("coming");
    
})
//监听端口号
server.listen(3001,function(){
    
});