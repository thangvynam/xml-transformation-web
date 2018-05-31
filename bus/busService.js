var app = require('http')
var url = require('url')
var query = require('querystring')
var BUS = require('./busMethod.js')
var XMLSerializer=require("xmldom").XMLSerializer
var port = 3001
var session = []

app.createServer((req, res) => {
    check="false"
    switch(req.method) {
        case 'GET':
            switch(req.url){
                case '/':
                    BUS.postUserName("admin","123") // này dùng phương thức POST lần đầu gửi user,pass . lần sau gửi tokenkey 
                    session.push(BUS.getCaches())
                    break
                case '/CuaHang':
                    BUS.postCuaHang()    
                    break

                case '/DanhSachDienThoai':
                    BUS.postDanhSachDienThoai()
                    break
                default:
                    res.writeHeader(404, {'Content-Type': 'text/plain'})
                    res.end("Request was not support!!!")
                    break
            }
            res.end("..")
            break

        case 'POST':
                    let body = [];
                    var resultString =""
                    result=""
                    res.setHeader("Access-Control-Allow-Origin", '*')
                    req.on('data', (chunk) => {
                        body.push(chunk)
                        resultString+=chunk
                        
                    }).on('end', () => {
                        
                        switch(req.url){
                
                            case '/DanhSachDienThoai':
                                //res.setHeader("Access-Control-Allow-Origin", '*')
                                //res.end(BUS.getDanhSachDT())
                                result= BUS.getDanhSachDT()
                                break
                            case '/login':
                                
                                body = Buffer.concat(body).toString()
                                resultString=resultString.split("&")
                                var username = resultString[0]
                                var password = resultString[1]
                            
                                BUS.postUserName(username,password) // đi qua 3000 / login
                                result=BUS.getCaches()
                            
                                break;
                            }
                            console.log(result)
                            res.end(result)
                    })
        }
        
    
}).listen(port, (err) => {
    if(err != null)
        console.log('==> Error: ' + err)
    else
        console.log('Server is starting at port ' + port)
})