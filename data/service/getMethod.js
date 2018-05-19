'user strict'

var fs = require('fs')
const xml2js = require('xml2js')

var path = __dirname + '/..'
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var danhSach_DienThoai = []
//Get danh sách cửa hàng
var get_CuaHang = ()=>{
    var data = fs.readFileSync( path + '/Cua_hang/Cua_hang.xml', 'utf-8')
    return data
}

var get_DienThoai= ()=>{
    fs.readdirSync(path + '/Dien_thoai/').forEach(file => {
        var filePath = path + '/Dien_thoai/' + file
        data = fs.readFileSync(filePath, 'utf-8')
        var parser = new xml2js.Parser()
        parser.parseString(data, function (err, result) {
            danhSach_DienThoai.push({'Dien_thoai' : result.Dien_thoai})
        })

    })
    var builder = new xml2js.Builder()
    var xml = builder.buildObject(danhSach_DienThoai)
    return xml
}

module.exports = {
    get_CuaHang: get_CuaHang,
    get_DienThoai: get_DienThoai,
    
}
