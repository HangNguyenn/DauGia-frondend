$(function () {
    $.ajax({
        url: 'http://localhost:3000/DanhMuc',
        dataType: 'json',
        timeout: 10000
    }).done(function (data) {

        $.each(data, function(idx, item) {
            // console.log(item.CatName);
            var row=' <li class="list-group-item">'+
            item.TenDM +'</li>';
            $('#danhmuc').append(row);

        });
    });

    $.ajax({
        url: 'http://localhost:3000/SanPham/loadall',
        dataType: 'json',
        timeout: 10000
    }).done(function (data) {

        $.each(data, function(idx, item) {
            // console.log(item.CatName);
            var giaconlai= item.ThoiGianKetThuc;
            var temp= `<div class="col-md-4">

            <img class="card-img-top" src="./imgs/sp/${item.HinhAnh1}" style="height: 300px">
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
            <p class="card-text">Số lượt ra giá hiện tại: ${item.SoLuotRaGia}</p>

            <button type="button" class="btn btn-outline-success id="Th_Yeu_thich">Yêu thích</button>
            <button type="button" class="btn btn-outline-success id="Th_XemChiTiet">Xem chi tiết</button>
        </div>`;
            $('#Th_XemSanPham').append(temp);

        });
    });
    
});



