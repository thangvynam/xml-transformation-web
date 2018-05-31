'user strict'

var fs = require('fs')
const xml2js = require('xml2js')

var path = __dirname + '/..'
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var danhSach_DienThoai = []
var caches=""
var CUA_HANG=""
var DANH_SACH_DT=""

var postUserName =(name,password)=>{
    
    var Dia_chi_Dich_vu="http://localhost:3000/login" // gửi qua DAL xử lý 
    //   var Tham_so="Ma_so_Xu_ly=TaiKhoan"
    //   var Dia_chi_Xu_ly=`${Dia_chi_Dich_vu}?${Tham_so}`
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            caches=this.responseText     
        }
    }
    xhttp.open("POST", Dia_chi_Dich_vu, false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(name+"&"+password);
}
var postCuaHang=()=>{
    var Dia_chi_Dich_vu="http://localhost:3000/CuaHang" // gửi qua DAL xử lý 
    //   var Tham_so="Ma_so_Xu_ly=TaiKhoan"
    //   var Dia_chi_Xu_ly=`${Dia_chi_Dich_vu}?${Tham_so}`
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {  
            CUA_HANG=this.responseText
            return this.responseText
        
        }
    }
    xhttp.open("POST", Dia_chi_Dich_vu, false);
    xhttp.setRequestHeader("uid", caches);
    xhttp.send();    
}
var postDanhSachDienThoai=()=>{
    var Dia_chi_Dich_vu="http://localhost:3000/DanhSachDienThoai" // gửi qua DAL xử lý 
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {  
            
            DANH_SACH_DT=this.responseText
        }
    }
    xhttp.open("POST", Dia_chi_Dich_vu, false);
    
    xhttp.setRequestHeader("uid", caches);
    xhttp.send();    
}

function getCaches(){
    return caches
}
function getDanhSachDT(){
    return DANH_SACH_DT
}

module.exports = {
    
    postUserName:postUserName,
    getCaches:getCaches,
    postCuaHang:postCuaHang,
    postDanhSachDienThoai:postDanhSachDienThoai,
    getDanhSachDT:getDanhSachDT
}
