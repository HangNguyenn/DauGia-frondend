$(function () {

    $('#registerForm').validate({
        rules: {
            UID: {
                required: true
            },
            PWD: {
                required: true,
                minlength: 6
            },
            ConfirmPWD: {
                required: true,
                equalTo: $('#txtPassword')
            },
            FullName: {
                required: true,
            },
            Gmail: {
                required: true,
                gmail: true
            },  
        },
        messages: {
            UID: {
                required: 'Nhập tài khoản'
            },
            PWD: {
                required: "Chưa nhập mật khẩu.",
                minlength: "Mật khẩu phải nhiều hơn 6 ký tự."
            },
            ConfirmPWD: {
                required: "Chưa nhập lại mật khẩu.",
                equalTo: "Mật khẩu nhập lại không khớp."
            },
            FullName: {
                required: "Chưa nhập họ tên.",
            },
            Gmail: {
                required: "Chưa nhập email.",
                gmail: "Email không đúng định dạng."
            },
           
        },

        highlight: function (element) { // hightlight error inputs
            $(element)
                .closest('.form-group')
                .addClass('has-error'); // set error class to the control group
        },

        success: function (label) {
            // var name = label.attr('for');
            // $('[name=' + name + ']').closest('.form-group').removeClass('has-error');

            label.closest('.form-group').removeClass('has-error');
            label.remove();
        },

        errorElement: 'span',
        errorClass: 'help-block'
    });

    $('#txtUserName').select();
});


$('#btnRegister').on('click', function () {
    alert('register');

    var _catName = $('#txtCatName').val();
    if (_catName.length === 0) {
        alert('Please input a valid value');
        return;
    }

    var body = {
        CatName: _catName
    };

    $.ajax({
        url: 'http://localhost:3000/TaiKhoan',
        dataType: 'json',
        timeout: 10000,

        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(body)
    }).done(function(data) {
        // console.log(data);
        alert('Added');
    }).fail(function(xhr, textStatus, error) {
    	console.log(textStatus);
    	console.log(error);
    	console.log(xhr);
    });
});