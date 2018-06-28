"use strict"

module.exports = class DienThoai {
    constructor(NCC, Ten,Ma_So,Don_gia_Ban,NOI_BAT,RAM,PIN,Bo_Nho_Trong,Chi_tiet,Tinh_trang) {
        this.NCC = NCC;
        this.Ten = Ten;
        this.Ma_So = Ma_So;
        this.Don_gia_Ban = Don_gia_Ban;
        this.NOI_BAT = NOI_BAT;
        this.RAM = RAM;
        this.PIN = PIN;
        this.Bo_Nho_Trong = Bo_Nho_Trong;
        this.Chi_tiet = Chi_tiet;
        this.Tinh_trang=Tinh_trang
    }
    getNCC(){
        return this.NCC;
    }
    getTen(){
        return this.Ten;
    }
    getMa_So(){
        return this.Ma_So;
    }
    getDon_gia_Ban(){
        return this.Don_gia_Ban;
    }
    getNOI_BAT(){
        return this.NOI_BAT;
    }
    getRAM(){
        return this.RAM;
    }
    getPIN(){
        return this.PIN;
    }
    getBo_Nho_Trong(){
        return this.Bo_Nho_Trong;
    }
    getChi_tiet(){
        return this.Chi_tiet;
    }
    getTinh_trang(){
        return this.Tinh_trang;
    }
    setDonGiaBan(Don_gia_Ban) {
        this.Don_gia_Ban = Don_gia_Ban;
    }
    setTinh_trang(Tinh_trang) {
        this.Tinh_trang = Tinh_trang;
    }
}