$(async function () {
    Handlebars.registerHelper("toJSON", function (value) {
        return JSON.stringify(value);
    });

    // Load danh mục
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
    // ====

    // Load danh sách sản phẩm
    let getPromise = new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://localhost:3000/SanPham/loadall',
            dataType: 'json',
            timeout: 10000
        }).done(function (data) {
            resolve(data);
        }).fail(function (xhr, textStatus) {
            reject({ xhr: xhr, textStatus: textStatus });
        });
    });

    let products;
    try {
        products = await getPromise;
    } catch (errorData) {
        console.log(errorData);
        return;
    }

    let source = $('#sp_template').html();
    let template = Handlebars.compile(source);
    let html = template(products);
    $('#Th_XemSanPham').append(html).on("click", "button[data-type='chi_tiet']", function (event) {
        let productAsJSON = this.dataset.data;
        sessionStorage.setItem("xemsp", productAsJSON)
        window.location = 'MH_XemChiTietSP.html'
    });
    // ====

    $.ajax({
        url: 'http://localhost:3000/SanPham/top5LuotRaGia',
        dataType: 'json',
        timeout: 10000
    }).done(function (data) {
        Th_5SPRaGiaNhieuNhat.innerHTML = ""

        $.each(data, function (idx, item) {

            var The_hien1 = TaoSPRaGiaNhieuNhat(item, Th_5SPRaGiaNhieuNhat)
            The_hien1.childNodes[1].onclick = () => {
                The_hien1.childNodes[1].classList.toggle("CHON")
                var sp = The_hien1.childNodes[1].parentNode.getAttribute("data");
                sessionStorage.setItem("xemsp", sp)
                window.location = 'MH_XemChiTietSP.html'

            }
        });
    });

    $.ajax({
        url: 'http://localhost:3000/SanPham/top5SPGiaCaoNhat',
        dataType: 'json',
        timeout: 10000
    }).done(function (data) {
        //console.log(data)
        Th_5SPRaGiaCaoNhat.innerHTML = ""

        $.each(data, function (idx, item) {

            var The_hien1 = TaoSPRaGiaNhieuNhat(item, Th_5SPRaGiaCaoNhat)
            The_hien1.childNodes[1].onclick = () => {
                The_hien1.childNodes[1].classList.toggle("CHON")
                var sp = The_hien1.childNodes[1].parentNode.getAttribute("data")
                sessionStorage.setItem("xemsp", sp)
                window.location = 'MH_XemChiTietSP.html'

            }
        });
    });

    $.ajax({
        url: 'http://localhost:3000/SanPham/top5SPGanKetThuc',
        dataType: 'json',
        timeout: 10000
    }).done(function (data) {
        Th_5SPGanKetThuc.innerHTML = ""

        $.each(data, function (idx, item) {

            var The_hien1 = TaoSPRaGiaNhieuNhat(item, Th_5SPGanKetThuc)
            The_hien1.childNodes[1].onclick = () => {
                The_hien1.childNodes[1].classList.toggle("CHON")
                var sp = The_hien1.childNodes[1].parentNode.getAttribute("data")
                sessionStorage.setItem("xemsp", sp)
                window.location = 'MH_XemChiTietSP.html'

            }
        });
    });

});

function TaoSPRaGiaNhieuNhat(item, Th_Cha) {
    var the_hien = document.createElement("div");
    the_hien.setAttribute("data", JSON.stringify(item));
    Th_Cha.appendChild(the_hien);
    var chuoiHTML = `
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
    the_hien.innerHTML = chuoiHTML;
    return the_hien;
}

function TaoTheHienSanPham(item, Th_Cha) {
    var the_hien = document.createElement("div");
    the_hien.setAttribute("data", JSON.stringify(item));
    Th_Cha.appendChild(the_hien);
    var gioconlai = item.ThoiGianKetThuc;
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
            <p class="card-text">Thời gian còn lại: ${gioconlai}</p>
            <p class="card-text">Số lượt ra giá hiện tại:${item.SoLuotRaGia}</p>

            <button type="button" class="btn btn-outline-success" id="Th_Yeu_thich" >Yêu thích</button>
            <button type="button" class="btn btn-outline-success" id="Th_XemChiTiet">Xem chi tiết</button>
        
    </div>
</div>`;
    the_hien.innerHTML = chuoiHTML;
    return the_hien;
}
//Doc danh sach san pham:


async function DocDanhSachSP()
{
    let getPromise = new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://localhost:3000/SanPham/loadall',
            dataType: 'json',
            timeout: 10000
        }).done(function (data) {
            resolve(data);
        }).fail(function (xhr, textStatus) {
            reject({ xhr: xhr, textStatus: textStatus });
        });
    });
    
    let DocDanhSachSP;
    try {
        DocDanhSachSP = await getPromise;
        
    } catch (errorData) {
        console.log(errorData);
        return;
    }
    console.log(DocDanhSachSP);
    return DocDanhSachSP;
}
var DanhSachSP= DocDanhSachSP();
console.log(DanhSachSP)



// function TimKiemDanhMuc()
// {
//     d= document.getElementById("Th_DanhMuc_TimKiem").value;
//     return d;
// }
$('#Th_TimKiem').on('click', function(){
    var timSP= tb_TimKiem.value;
    var danhmuc= document.getElementById("Th_DanhMuc_TimKiem").value;
    function myFunction(sp){
        return sp.TenSP.toLowerCase() == timSP.toLowerCase();
    }
    if(document.getElementById("Th_DanhMuc_TimKiem").value=='Danh mục' || document.getElementById("Th_DanhMuc_TimKiem").value=='')
    {
        var DanhSachSPTimKiem= DanhSachSP.filter(myFunction);
    }
    else
    {
        if(timSP == '' && document.getElementById("Th_DanhMuc_TimKiem").value!='Danh mục' )
        {
            var DanhSachSPTimKiem= DanhSachSP.find(x=>x.MaDM == document.getElementById("Th_DanhMuc_TimKiem").value);
        }
        else if(timSP != '' && document.getElementById("Th_DanhMuc_TimKiem").value!='Danh mục' )
        {
            var DanhSachSPThuocDanhMuc= DanhSachSP.find(x=>x.MaDM == document.getElementById("Th_DanhMuc_TimKiem").value);
            var DanhSachSPTimKiem= DanhSachSPThuocDanhMuc.filter(x=> x.TenSP.toLowerCase().includes(timSP.toLowerCase()));
        }
    }
    let source = $('#sp_template').html();
    let template = Handlebars.compile(source);
    let html = template(products);
    $('#Th_XemSanPham').append(html).on("click", "button[data-type='chi_tiet']", function (event) {
        let productAsJSON = this.dataset.data;
        sessionStorage.setItem("xemsp", productAsJSON)
        window.location = 'MH_XemChiTietSP.html'
    });
})

