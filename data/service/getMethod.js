'user strict'

var fs = require('fs')
const xml2js = require('xml2js')
var DienThoai = require('../model/DienThoai')
var path = __dirname + '/..'
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var XMLWriter = require('xml-writer');
//Get danh sách cửa hàng
var get_CuaHang = ()=>{
    var data = fs.readFileSync( path + '/Cua_hang/Cua_hang.xml', 'utf-8')
    return data
}

var get_DienThoai= ()=>{
    let danhSach_DienThoai = []
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
var chinhsua_DienThoai=(tenDT,giaMoi)=>{

    fs.readdirSync(path + '/Dien_thoai/').forEach(file => {
        var filePath = path + '/Dien_thoai/' + file
        data = fs.readFileSync(filePath, 'utf-8')
        var parser = new xml2js.Parser()
        parser.parseString(data, function (err, result) {
            if(result.Dien_thoai.$.Ten ===tenDT )
            {
                var dt = new DienThoai(
                    result.Dien_thoai.$.NCC,result.Dien_thoai.$.Ten,result.Dien_thoai.$.Ma_So,
                    result.Dien_thoai.$.Don_gia_Ban,result.Dien_thoai.$.NOI_BAT,result.Dien_thoai.$.RAM,
                    result.Dien_thoai.$.PIN,result.Dien_thoai.$.Bo_Nho_Trong,result.Dien_thoai.$.Chi_tiet
                )
                dt.setDonGiaBan(giaMoi)
                xw = new XMLWriter;
                xw.startDocument();
                xw.startElement('Dien_thoai');
                xw.writeAttribute('NCC', dt.getNCC());
                xw.writeAttribute('Ten', dt.getTen());
                xw.writeAttribute('Ma_So', dt.getMa_So());
                xw.writeAttribute('Don_gia_Ban', dt.getDon_gia_Ban());
                xw.writeAttribute('NOI_BAT', dt.getNOI_BAT());
                xw.writeAttribute('RAM', dt.getRAM());
                xw.writeAttribute('PIN', dt.getPIN());
                xw.writeAttribute('Bo_Nho_Trong', dt.getBo_Nho_Trong());
                xw.writeAttribute('Chi_tiet', dt.getChi_tiet());
                xw.endDocument();
                console.log(xw.toString());
                fs.writeFile(filePath, xw.toString(), 'utf8'); // write it back 
                
            }
            
        })

    })
}

module.exports = {
    get_CuaHang: get_CuaHang,
    get_DienThoai: get_DienThoai,
    chinhsua_DienThoai:chinhsua_DienThoai
    
}
