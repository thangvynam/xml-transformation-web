'use strict'
var fs = require('fs')
var app = require('http')
var url = require('url')
var query = require('querystring')
var port = 3000

var tokenKey = []

function checkAuth(headers){
    var uid = headers.uid
    console.log(uid)
    for(var i = 0; i < tokenKey.length; i++){
        if(uid == tokenKey[i]){
            return true
        }
    }
    return false
}

app.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    switch(req.method) {
        case 'GET':
            var getMethod = require('./service/getMethod.js')
            switch(req.url){
                case '/CuaHang':
                   
                case '/DanhSach_Tivi':
                   
                    res.writeHeader(200, {'Content-Type': 'text/xml'})
                    var data = getMethod.get_DienThoai()
                    res.end(data)
                    break

                default:
                    res.writeHeader(404, {'Content-Type': 'text/plain'})
                    res.end("Request was not support!!!")
                    break
            }

            console.log('--> Done');
            break
        case 'POST':
            var getMethod = require('./service/getMethod.js')
            switch(req.url){
                case '/login':
                    // console.log(req.headers)
                    // console.log(req.body)
                    let body = [];
                    var resultString =""
                    req.on('data', (chunk) => {
                        body.push(chunk)
                        resultString+=chunk
                        
                    }).on('end', () => {
                        body = Buffer.concat(body).toString()
                        resultString= resultString.split("&")
                        if(resultString[0]==="admin" && resultString[1]==="123"){
                            tokenKey.push("101")
                            res.writeHeader(200, {'Content-Type': 'text/plain'})
                            res.end('101')
                        } 
                    })
                    break
                case '/CuaHang':                   
                    if(checkAuth(req.headers) === true){
                        res.writeHeader(200, {'Content-Type': 'text/xml'})
                        var data =  getMethod.get_CuaHang()
                        res.end(data)
                    }
                    else {
                        res.writeHeader(404, {'Content-Type': 'text/plain'})
                        res.end("Request was not support!!!")
                    }
                    break
                case '/DanhSachDienThoai':                   
                    if(checkAuth(req.headers) === true){
                        res.writeHeader(200, {'Content-Type': 'text/xml'})
                        var data =  getMethod.get_DienThoai()
                        res.end(data)
                    }
                    else {
                        res.writeHeader(404, {'Content-Type': 'text/plain'})
                        res.end("Request was not support!!!")
                    }
                    break

                default:
                    res.writeHeader(404, {'Content-Type': 'text/plain'})
                    res.end("Request was not support!!!")
                    break
            }
            break
        case 'PUT':
            break
        case 'DELETE':
            break
        }
}).listen(port, (err) => {
    if(err != null)
        console.log('==> Error: ' + err)
    else
        console.log('Server is starting at port ' + port)
})