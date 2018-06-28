'use strict'
var fs = require('fs')
var app = require('http')
var url = require('url')
var query = require('querystring')
var port = 3000
var path = __dirname 
var tokenKey = []
var user = {};

let i=0
function checkAuth(headers){
    var uid = headers.uid
    console.log('uid:'+uid)
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
               
                default:
                    res.writeHeader(404, {'Content-Type': 'text/plain'})
                    res.end("Request was not support!!!")
                    break
            }

            console.log('--> Done');
            break
        case 'POST':
            var getMethod = require('./service/getMethod.js')
            var resultString =""
            switch(req.url){
                case '/login':
                    
                    let body = [];
                    
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
                        }else{
                            var check = false;
                            fs.readdirSync(path + '/user/').forEach(file => {
                                var filePath = path + '/user/' + file
                                data = fs.readFileSync(filePath, 'utf-8')
                                if(JSON.parse(data).username===resultString[0] &&  resultString[1] === JSON.parse(data).password){
                                
                                    check=true;
                                    tokenKey.push("102")
                                    res.writeHeader(200, {'Content-Type': 'application/json'})
                                    
                                    res.end(JSON.stringify({ isLogin: 1 ,role :JSON.parse(data).role,username:resultString[0] }))
                                }
                            })
                            if(!check){
                                res.end('103')
                            }
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
                        res.end("Request was not support!!! nam nam")
                    }
                    break
                case '/phieuban':
                    
                    req.on('data', (chunk) => {
                       
                        resultString+=chunk
                        
                    }).on('end', () => {
                        
                        resultString=resultString.split("&")
                        var tenNV = resultString[0]
                        var tenKhach = resultString[1]
                        var soluong = resultString[2]
                        var ngay = resultString[3]
                        var tenDT = resultString[4]
                        var tien = resultString[5]
                        
                        var dia_chi_local ="./phieu-ban"; 
                        fs.readFile(`${dia_chi_local}/${tenNV}.json`, 'utf8', function readFileCallback(err, data){
                            var obj = {
                                table: []
                            };
                            if (err){
                                
                                if(err.syscall === "open"){
                                    console.log(tenKhach)
                                    obj.table.push({tenKhach: tenKhach, soluong:soluong,ngay:ngay,tenDT:tenDT,tien:tien});
                                    var json = JSON.stringify(obj);
                                    fs.writeFile(`${dia_chi_local}/${tenNV}.json`, json, 'utf8'); // write it back 
                                    
                                }
                            } else {
                            if(data!= "")
                                obj = JSON.parse(data); //now it an object
                            obj.table.push({tenKhach: tenKhach, soluong:soluong,ngay:ngay,tenDT:tenDT,tien:tien});
                            var json = JSON.stringify(obj); //convert it back to json
                            fs.writeFile("./phieu-ban/"+`${tenNV}.json`, json, 'utf8'); // write it back 
                        }});
                        res.end("chưa xong")
                        }
                    )
                    break
                case '/danhsachphieuban':
                    req.on('data', (chunk) => {
                        resultString+=chunk
                    }).on('end', () => {
                        var dia_chi_local ="./phieu-ban"; 
                        
                        fs.readFile(`${dia_chi_local}/${resultString}.json`, 'utf8', function readFileCallback(err, data){
                            var obj = {
                                table: []
                            };
                            if(data!="")
                                obj = JSON.parse(data); //now it an object
                            var json = JSON.stringify(obj); //convert it back to json
                            
                            res.writeHeader(200, {'Content-Type': 'application/json'})
                            res.end(json)
                        });   
                    })
                    break
                case '/chinhsua':
                    req.on('data', (chunk) => {
                        resultString+=chunk
                    }).on('end', () => {
                        var tenDT = resultString.split("&")[0]
                        var giaMoi = resultString.split("&")[1]
                        var tinhTrang = resultString.split("&")[2]
                        getMethod.chinhsua_DienThoai(tenDT,giaMoi,tinhTrang)
                        res.end("true")
                        
                    })
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
