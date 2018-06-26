'user strict'

var fs = require('fs')
const xml2js = require('xml2js')

var path = __dirname + '/..'
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var danhSach_DienThoai = []
var caches=""
var CUA_HANG=""
var DANH_SACH_DT=""
var cachesAmin=""
var postChinhSua= (string )=>{
    var Dia_chi_Dich_vu="http://localhost:3000/chinhsua" // gửi qua DAL xử lý 
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", Dia_chi_Dich_vu, false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(string);
    return xhttp.responseText
}

var postPhieuBan= (string )=>{
    var Dia_chi_Dich_vu="http://localhost:3000/phieuban" // gửi qua DAL xử lý 
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
               
        }
    }
    xhttp.open("POST", Dia_chi_Dich_vu, false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(string);
}

var postUserName =(name,password)=>{
    
    var Dia_chi_Dich_vu="http://localhost:3000/login" // gửi qua DAL xử lý 
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                if(name === "admin"){
                    cachesAmin =this.responseText  
                }
                caches=this.responseText     
        }
    }
    xhttp.open("POST", Dia_chi_Dich_vu, false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(name+"&"+password);
}
var postCuaHang=()=>{
    var Dia_chi_Dich_vu="http://localhost:3000/CuaHang" // gửi qua DAL xử lý 
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {  
            CUA_HANG=this.responseText
            return this.responseText
        
        }
    }
    xhttp.open("POST", Dia_chi_Dich_vu, false);
    xhttp.setRequestHeader("uid", cachesAmin);
    xhttp.send();    
}
var postDanhSachDienThoai=()=>{
    var Dia_chi_Dich_vu="http://localhost:3000/DanhSachDienThoai" // gửi qua DAL xử lý 
    var xhttp = new XMLHttpRequest();
    
    xhttp.open("POST", Dia_chi_Dich_vu, false);
    
    xhttp.setRequestHeader("uid", cachesAmin);
    xhttp.send();    
    DANH_SACH_DT=xhttp.responseText
    
    return DANH_SACH_DT
}

function getCaches(){
    return caches
}
function getDanhSachDT(){
    return DANH_SACH_DT
}

function getDanhSachPhieuBan(tenNV){
    var Dia_chi_Dich_vu="http://localhost:3000/danhsachphieuban" // gửi qua DAL xử lý 
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", Dia_chi_Dich_vu, false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(tenNV);
    return xhttp.responseText
}

module.exports = {
    postUserName:postUserName,
    getCaches:getCaches,
    postCuaHang:postCuaHang,
    postDanhSachDienThoai:postDanhSachDienThoai,
    getDanhSachDT:getDanhSachDT,
    postPhieuBan:postPhieuBan,
    getDanhSachPhieuBan:getDanhSachPhieuBan,
    postChinhSua:postChinhSua
}
