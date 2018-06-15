$(function () {
    $.ajax({
        url: 'http://localhost:3000/DanhMuc',
        dataType: 'json',
        timeout: 10000
    }).done(function (data) {

        $.each(data, function (idx, item) {
            // console.log(item.CatName);
            var row = ' <li class="list-group-item">' +
                item.TenDM + '</li>';
            $('#danhmuc').append(row);

            var temp1 = `<option value="${item.MaDM}">${item.TenDM}</option>`;
            $('#Th_DanhMuc_TimKiem').append(temp1);
        });
    });

    $.ajax({
        url: 'http://localhost:3000/SanPham/loadall',
        dataType: 'json',
        timeout: 10000
    }).done(function (data) {
        //console.log(data)
        Th_XemSanPham.innerHTML = ""
        $.each(data, function (idx, item) {
            // console.log(item.GiaHienTai);
            
            // TaoTheHienSanPham()

            // $('#Th_XemSanPham').append(temp1);
            
            var The_hien = TaoTheHienSanPham(item, Th_XemSanPham)
            The_hien.childNodes[0].onclick = () => {
                The_hien.childNodes[0].classList.toggle("CHON")
                var sp = The_hien.childNodes[0].parentNode.getAttribute("data")
                sessionStorage.setItem("xemsp", sp)
                window.location= 'MH_XemChiTietSP.html'

            }
        
         
           
        });
    });
    $.ajax({
        url: 'http://localhost:3000/SanPham/top5LuotRaGia',
        dataType: 'json',
        timeout: 10000
    }).done(function (data) {
        //console.log(data)
        Th_5SPRaGiaNhieuNhat.innerHTML = ""
       
        $.each(data, function (idx, item) {
            // console.log(item.GiaHienTai);
            
            // TaoTheHienSanPham()

            // $('#Th_XemSanPham').append(temp1);
            
            var The_hien = TaoSPRaGiaNhieuNhat(item, Th_5SPRaGiaNhieuNhat)
            The_hien.childNodes[0].onclick = () => {
                The_hien.childNodes[0].classList.toggle("CHON")
                var sp = The_hien.childNodes[0].parentNode.getAttribute("data")
                sessionStorage.setItem("xemsp", sp)
                window.location= 'MH_XemChiTietSP.html'

            }
            
            
            
           
        });
    });

});

function TaoSPRaGiaNhieuNhat(item, Th_Cha)
{
    var the_hien = document.createElement("div");
    the_hien.setAttribute("data", JSON.stringify(item));
    Th_Cha.appendChild(the_hien);
    var chuoiHTML=`
    <div class="card border" style="width: 14rem; float: left;">
        <img class="card-img-top" src="./imgs/sp/${item.HinhAnh1}.jpg" style="width:200px; height:200px">
        <div class="card-body">
            <p class="card-text">${item.TenSP} </p>
            <p class="card-text">Giá hiện tại:${item.GiaHienTai} </p>
        </div>
            <button type="button" class="btn btn-warning">Ra giá</button>
            <button type="button" class="btn btn-primary">Yêu thích</button>
       
    </div>
    `
the_hien.innerHTML= chuoiHTML;
    return the_hien;
}

function TaoTheHienSanPham(item, Th_Cha) {
    var the_hien = document.createElement("div");
    the_hien.setAttribute("data", JSON.stringify(item));
    Th_Cha.appendChild(the_hien);
    var giaconlai = item.ThoiGianKetThuc;
    var chuoiHTML = `<div class="row border" style="margin-top:10px">
    <div class="col-md-4">
        <img src="./imgs/sp/${item.HinhAnh1}.jpg" style="width: 350px; height: 280px">
    </div>
    <div class="col-md-4">
            <br>
            <br>
            <h3>${item.TenSP}</h3>
            <p class="card-text">Giá hiện tại: ${item.GiaHienTai}</p>
            <p class="card-text">Người dùng đang giữ giá: ${item.TenNguoiGiuGia}</p>
            <p class="card-text">Giá mua ngay: ${item.GiaMuaNgay}</p>
            <button type="button" class="btn btn-outline-success">Ra giá</button>
    </div>
    <div class="col-md-4">
            <br>
            <br>
            <br>
            <br>
            <br>
            <p class="card-text">Thời gian còn lại: ${giaconlai}</p>
            <p class="card-text">Số lượt ra giá hiện tại:${item.SoLuotRaGia}</p>

            <button type="button" class="btn btn-outline-success" id="Th_Yeu_thich" >Yêu thích</button>
            <button type="button" class="btn btn-outline-success" id="Th_XemChiTiet">Xem chi tiết</button>
        
    </div>
</div>`;
    the_hien.innerHTML= chuoiHTML;
    return the_hien;
}


