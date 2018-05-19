var app = require('http')
var url = require('url')
var query = require('querystring')
var BUS = require('./busMethod.js')
var XMLSerializer=require("xmldom").XMLSerializer
var port = 3001
var session = []

app.createServer((req, res) => {
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
            break

        case 'POST':
            switch(req.url){
                case '/DanhSachDienThoai':
                    
                    res.setHeader("Access-Control-Allow-Origin", '*')
                   
                    res.end(BUS.getDanhSachDT())
                    break
            }
            break
        }
    res.end("")
}).listen(port, (err) => {
    if(err != null)
        console.log('==> Error: ' + err)
    else
        console.log('Server is starting at port ' + port)
})