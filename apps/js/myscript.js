
function Doc_Danh_sach_Mat_hang() { 
    var Dia_chi_Dich_vu="http://localhost:3001/DanhSachDienThoai" // gửi qua DAL xử lý 
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", Dia_chi_Dich_vu, false);
    xhttp.send();
    Du_lieu=new DOMParser().parseFromString(xhttp.responseText, "text/xml").documentElement
    return Du_lieu
}

function Tao_Chuoi_HTML_Danh_sach_Mat_hang_Noi_bat(Danh_sach) {
  
    var Dia_chi_Media = "./img"
    var DS_DT= document.createElement("div")
    DS_DT.className ="row"
    for (var i = 0; i < Danh_sach.getElementsByTagName("Dien_thoai").length; i++) {
    
      
      var Mat_hang = Danh_sach.getElementsByTagName("Dien_thoai")[i]
      var NOI_BAT =Mat_hang.getAttribute("NOI_BAT")
      if(NOI_BAT!=null){
        var Ten = Mat_hang.getAttribute("Ten")
      var Ma_so = Mat_hang.getAttribute("Ma_So")
      var Don_gia_Ban = parseInt(Mat_hang.getAttribute("Don_gia_Ban"))  
      
      var Th_Hinh = document.createElement("img")
      Th_Hinh.className ="product-img"
      Th_Hinh.src = `${Dia_chi_Media}/${Ma_so}.jpg`
      Th_Hinh.style.cssText = `width:200px;height:200px;text-align:center;margin-left: 2em`
  
      var Th_Thong_tin = document.createElement("div")
      
      Th_Thong_tin.style.cssText = `text-align:center`
      var TEN_SP=document.createElement("strong")
      TEN_SP.innerHTML=`${Ten}<br/>`
      TEN_SP.className="product-name"
      var GIA=document.createElement("p")
      GIA.innerHTML=`${Don_gia_Ban.toLocaleString("vi")}`


      Th_Thong_tin.appendChild(TEN_SP)
      Th_Thong_tin.appendChild(GIA)
      
      
      if(i%4===0){
        var row = document.createElement("div")
        row.className=`row text-center`
      }

      var Th_Mat_hang = document.createElement("div")
      Th_Mat_hang.className = `col-md-3 product`
      Th_Mat_hang.style.cssText = `padding: 15 15 15px 15px;border: none;border-radius: 100;}`
      
      Th_Mat_hang.appendChild(Th_Hinh)
      Th_Mat_hang.appendChild(Th_Thong_tin)
      DS_DT.appendChild(Th_Mat_hang)
      }
      
      //Th_Hinh.style.cssText = `width:150px;height:150px;text-align:center;`

      // var product = document.createElement("div")
      // product.className = "product"

      // var productImg = document.createElement("div")
      // productImg.className = "product-img"
      // var Th_Hinh = document.createElement("img")
      // Th_Hinh.src = `${Dia_chi_Media}/${Ma_so}.jpg`
      // productImg.appendChild(Th_Hinh)

      // var productBody = document.createElement("div")
      // productBody.className = "product-body"

      // var productCategory = document.createElement("h3")
      // productCategory.className= "product-name"
      // var productA = document.createElement("a")
      // productA.href=`/${Ten}`
      // productA.innerHTML =`${Ten}`
      // productCategory.appendChild(productA)

      // var productPrice = document.createElement("h4")
      // productPrice.innerHTML =`${Don_gia_Ban}`

      // productBody.appendChild(productCategory)
      // productBody.appendChild(productPrice)

      // product.appendChild(productImg)
      // product.appendChild(productBody)
      // DS_DT.appendChild(product)
    }
    var Chuoi_HTML=DS_DT.outerHTML
    return Chuoi_HTML
  }
