$(function () {
    $('#loginForm')
        .submit(function (event) {
            event.preventDefault();
            var Ten = $('Th_TenTK').val();
            var pass = $('Th_MatKhau').val();
            if (TenTK.length === 0) {
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
                localStorage.setItem("user", data.TenTK);
                localStorage.setItem("loaiTK", data.LoaiTK);
                // Retrieve
                //Th_user.value= localStorage.getItem("user");
                document.getElementById("Th_user").innerHTML = localStorage.getItem("user");


            }).fail(function (xhr, textStatus, error) {
                console.log(textStatus);
                console.log(error);
                console.log(xhr);
            });
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

    $('#registerForm')
        .submit(function (event) {
            event.preventDefault();
            TaiKhoan = $('Th_TaiKhoan').val();
            MatKhauDK = $('Th_MatKhauDK').val();
            HoTenDK = $('Th_HoTen').val();
            GmailDK = $('Th_GmailDK').val();
            DiaChiDK = $('Th_DiaChi').val();
            sdt = $('Th_sdt').val();

            var body = {
                TenTK: TaiKhoan,
                MatKhau: MatKhauDK,
                SDT: sdt,
                DiaChi: DiaChiDK,
                HoTen: HoTenDK,
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
                // console.log(data);
                alert('Added');

            }).fail(function (xhr, textStatus, error) {
                console.log(textStatus);
                console.log(error);
                console.log(xhr);
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
                HoTen: {
                    required: true
                },
                GmailDK: {
                    required: true,
                    gmail: true
                },
                DiaChi: {
                    required: true
                },
                sdt: {
                    required: true
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
                HoTen: {
                    required: "Họ tên không hợp lệ"
                },
                GmailDK: {
                    required: "Chưa nhập gmail.",
                    gmail: "Gmail không đúng định dạng."
                },
                DiaChi: {
                    required: "Địa chỉ không để trống"
                },
                sdt: {
                    required: "Số ĐT không để trống"
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