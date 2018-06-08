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
});



