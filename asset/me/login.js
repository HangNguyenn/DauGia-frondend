$(function () {
    $('#loginForm')
        .submit(function (event) {
            event.preventDefault();
            Ten = Th_TenTK.value;
            
            pass = Th_MatKhau.value;
            if (Th_TenTK.length === 0) {
                alert('Tên tài khoản không để trống!');
                return;
            };
            var body = {
                TenTK: Ten,
                MatKhau: pass
            };

            $.ajax({
                url: 'http://localhost:3000/TaiKhoan/login',
                dataType: 'json',
                timeout: 10000,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(body)
            }).done(function (data) {
                if (data.TinhTrang == 'chuakichhoat') {
                    alert('Tài khoản chưa kích hoạt. Vui lòng xác nhận Gmail!')
                    localStorage.setItem("user", '');
                    localStorage.setItem("loaiTK", '');
                    localStorage.setItem("tinhTrang", '');
                    localStorage.setItem("Gmail", '');
                    return;
                }
                else {
                    localStorage.setItem("user", data.TenTK);
                    localStorage.setItem("loaiTK", data.LoaiTK);
                    localStorage.setItem("tinhTrang", data.TinhTrang);
                    localStorage.setItem("Gmail", data.Gmail);
                    alert("Đăng nhập thành công!");
                    return;
                }
                // // Retrieve
                // //Th_user.value= localStorage.getItem("user");
                // document.getElementById("Th_user").innerHTML = localStorage.getItem("user");
               

            }).fail(function (xhr, textStatus, error) {
                console.log(xhr);
               
                if(xhr.responseJSON.message == "nouser"){
                    alert('Tài khoản chưa tồn tại!');
                    return;
                }
                if(xhr.responseJSON.message == "wrongpass"){
                    alert('Mật khẩu không đúng!');
                    return;
                }
                console.log("Mat khau khong dung")
            });
        })

        .validate({
            rules: {

                TenTKDN: {
                    required: true
                },
                MatKhauDN: {
                    required: true

                }
            },
            messages: {
                TenTKDN: {
                    required: 'Tài khoản không được để trống'
                },
                MatKhauDN: {
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

    $('#registerForm')
        .submit(function (event) {
            event.preventDefault();
            var TaiKhoanDK = Th_TaiKhoan.value;
            var MatKhauDK = Th_MatKhauDK.value;
            GmailDK = Th_GmailDK.value;

            if (Th_TaiKhoan.length === 0) {
                alert('Tên tài khoản không để trống!');
                return;
            };
            if (Th_MatKhauDK.length === 0) {
                alert('Mật khẩu không để trống!');
                return;
            };

            if (Th_GmailDK.length === 0) {
                alert('Mail đăng nhập không để trống!');
                return;
            };
            var body = {
                TenTK: TaiKhoanDK,
                MatKhau: MatKhauDK,
                Gmail: GmailDK
            }

            $.ajax({
                url: 'http://localhost:3000/TaiKhoan/register',
                dataType: 'json',
                timeout: 10000,

                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(body)
            }).done(function (data) {
                alert(`Đăng ký thành công! Mời xác nhận gmail: ${GmailDK} `);
                console.log('ok')
            }).fail(function (xhr, textStatus, error) {
                console.log(xhr);
                if(xhr.responseJSON.message == "user already exist"){
                    alert('Tài khoản đã tồn tại!');
                    return;
                }
                if(xhr.responseJSON.message == "email already exist"){
                    alert('Email này đã đăng ký!');
                    return;
                }
            });

        })
        .validate({
            rules: {
                TaiKhoan: {
                    required: true
                },
                MatKhauDK: {
                    required: true
                },
                XacNhanMatKhau: {
                    required: true,
                    equalTo: $('#Th_MatKhau')
                },

                GmailDK: {
                    required: true,
                    gmail: true
                }
            },
            messages: {
                TaiKhoan: {
                    required: "Tên tài khoản không được để trống"
                },
                MatKhauDK: {
                    required: "Mật khẩu không để trống"
                },
                XacNhanMatKhau: {
                    required: "Mật khẩu không để trống",
                    equalTo: "Mật khẩu nhập lại không khớp."
                },

                GmailDK: {
                    required: "Chưa nhập gmail.",
                    gmail: "Gmail không đúng định dạng."
                }
            }
        });
    $('forgetForm')
        .submit(function (event) {
            event.preventDefault();
        })
        .validate({
            rules: {
                Gmail: {
                    required: true
                }
            },
            messages: {
                Gmail: {
                    required: "Gmail không được để trống"
                }
            }
        });


});

$('btnLogin').on('click', function () {
    var isValid = $('loginForm').valid();
    if (isValid) {
        var body = {
            captcha_response: grecaptcha.getResponse()
        };
        $.ajax({
            url: 'http://localhost:3000/TaiKhoan/captcha',
            dataType: 'json',
            timeout: 10000,

            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(body)
        }).done(function (data) {
            console.log(data);
            //alert('Added');
        }).fail(function (xhr, textStatus, error) {
            console.log(textStatus);
            console.log(error);
            console.log(xhr);
        });
    }
})