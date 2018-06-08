$(function () {
    $('#loginForm')
        .submit(function (event) {
            // event.preventDefault();
            // var Ten = $('Th_TenTK').val();
            // var pass = $('Th_MatKhau').val();
            // if (TenTK.length === 0) {
            //     alert('Tên tài khoản không để trống!');
            //     return;
            // };
            // var body = {
            //     TenTK: Ten,
            //     MatKhau: pass
            // };

            // $.ajax({
            //     url: "http://localhost:3000/TaiKhoan"
            // dataType: 'json',
            // timeout: 10000,
    
            // type: 'POST',
            // contentType: 'application/json',
            // data: JSON.stringify(body)
            // })
        })

        .validate({
            rules: {

                TenTK: {
                    required: true
                },
                MatKhau: {
                    required: true

                }
            },
            messages: {
                TenTK: {
                    required: 'Tài khoản không được để trống'
                },
                MatKhau: {
                    required: 'Mật khẩu không để trống'

                }
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
    

});

