$('#btnLoadAll').on('click', function() {
    // alert('clicked');

    $.ajax({
        url: 'http://localhost:3000/categories',
        dataType: 'json',
        timeout: 10000
    }).done(function(data) {
        // console.log(data);
        // alert('done');

        $.each(data, function(idx, item) {
            // console.log(item.CatName);
            var tr = '<tr>' +
                '<td>' +
                item.CatID +
                '</td>' +
                '<td>' +
                item.CatName +
                '</td>' +
                '<td><button data-id="' + item.CatID + '" class="delButton" type="button">Delete</button></td>' +
                '</tr>';
            $('#list').append(tr);
        });
    });
});

// $('.delButton').on('click', function() {
//     alert('clicked');
// });

$('#list').on('click', '.delButton', function() {
    var tr = $(this).closest('tr');

    var _id = $(this).data('id');
    var msg = 'Do you want to remove this category (id: ' + _id + ')';
    var rs = confirm(msg);
    if (rs === true) {
        $.ajax({
            url: 'http://localhost:3000/categories/' + _id,
            dataType: 'json',
            timeout: 10000,
            type: 'DELETE',
            // contentType: 'application/json',
        }).done(function(data) {
            // console.log(data);
            // alert('deleted');
            // $(this).closest('tr').remove();
            tr.remove();
        }).fail(function(xhr, textStatus, error) {
            console.log(error);
            console.log(xhr);
        });
    }
});

$('#btnTestDeleteRow').on('click', function() {
    var tr = $('#list tr').last();
    tr.remove();
});