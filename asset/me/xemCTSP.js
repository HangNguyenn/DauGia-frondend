$(async function () {
    var sanPham = JSON.parse(sessionStorage.getItem("xemsp"));

    var body = {
        MaSP: sanPham.MaSP
    };
    //lich su mo ta
    let getLichSu = new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://localhost:3000/SanPham/lichSuMoTa',
            dataType: 'json',
            type: 'POST',
            timeout: 10000
        }).done(function (data) {
            resolve(data);
        }).fail(function (xhr, textStatus) {
            reject({
                xhr: xhr, textStatus: textStatus
            });
        });
    });

    let lichSu;
    try {
        lichSu = await getLichSu;
    } catch (errorData) {
        console.log(errorData);
        return;
    }

    //hinh anh
    let getHinhAnh = new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://localhost:3000/SanPham/hinhAnh',
            dataType: 'json',
            data: JSON.stringify({ MaSP: sanPham.MaSP }),
            contentType: "application/json",
            method: 'POST',
            timeout: 10000
        }).done(function (data) {
            resolve(data);
        }).fail(function (xhr, textStatus) {
            reject({ xhr: xhr, textStatus: textStatus });
        });
    });

    let hinhAnh;
    try {
        hinhAnh = await getHinhAnh;
    } catch (errorData) {
        console.log(errorData);
        return;
    }

    console.log(sanPham);
    let source = $('#sp_XemCTSP').html();
    let template = Handlebars.compile(source);
    let html = template({
        lichSu: lichSu,
        hinhAnh: hinhAnh[0],
        sanPham: sanPham
    });

    $("#Th_ThongTinsp").empty().append(html);

    // $.ajax({
    //     url: 'http://localhost:3000/SanPham/lichSuMoTa',
    //     type: 'POST',
    //     contentType: 'application/json',
    //     data: JSON.stringify(body)
    // }).done(function (data) {
    //     var source = $('#sp_XemCTSP').html();
    //     var template = Handlebars.compile(source);
    //     var html = template(sanPham,data);
    //     var temp = $('#Th_ThongTinsp');
    //     temp.append(html);

    // Th_XemSanPham.innerHTML = ""
    // $.each(data, function (idx, item) {

    //     var The_hien = TaoTheHienSanPham(item, Th_XemSanPham)
    //     console.log(The_hien.childNodes[0])
    //     The_hien.childNodes[0].onclick = () => {
    //         The_hien.childNodes[0].classList.toggle("CHON")
    //         //console.log(The_hien)
    //         var sp = The_hien.childNodes[0].parentNode.getAttribute("data")
    //         sessionStorage.setItem("xemsp", sp)
    //         window.location= 'MH_XemChiTietSP.html'

    //     }
    // });
    //});

    // $.ajax({
    //     url: 'http://localhost:3000/SanPham/hinhAnh',
    //     type: 'POST',
    //     contentType: 'application/json',
    //     data: JSON.stringify(body)
    // }).done(function (data) {
    //     var source = $('#sp_XemCTSP').html();
    //     var template = Handlebars.compile(source);
    //     var html = template(data);
    //     var temp = $('#Th_ThongTinsp');
    //     temp.append(html);

    //     // Th_XemSanPham.innerHTML = ""
    //     // $.each(data, function (idx, item) {
    //     //     var The_hien = TaoTheHienSanPham(item, Th_XemSanPham)
    //     //     console.log(The_hien.childNodes[0])
    //     //     The_hien.childNodes[0].onclick = () => {
    //     //         The_hien.childNodes[0].classList.toggle("CHON")
    //     //         //console.log(The_hien)
    //     //         var sp = The_hien.childNodes[0].parentNode.getAttribute("data")
    //     //         sessionStorage.setItem("xemsp", sp)
    //     //         window.location= 'MH_XemChiTietSP.html'

    //     //     }
    //     // });
    // });
});    