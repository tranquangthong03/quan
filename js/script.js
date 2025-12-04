// js/script.js

function syncUsername() {
    const cccd = document.getElementById('soCCCD').value;
    const usernameInput = document.getElementById('tenDangNhap');
    usernameInput.value = cccd.trim();
}

document.getElementById('grantAccountForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    // Lấy dữ liệu từ form (Bổ sung thêm Mã Nhân Khẩu)
    const maNhanKhau = document.getElementById('maNhanKhau').value;
    const hoTen = document.getElementById('hoTen').value;
    const cccd = document.getElementById('soCCCD').value;
    const tenDangNhap = document.getElementById('tenDangNhap').value;
    const matKhau = document.getElementById('matKhau').value;

    if(cccd.length < 9) {
        alert("Số CCCD không hợp lệ (quá ngắn)!");
        return;
    }

    // Log dữ liệu có cả Mã Nhân Khẩu
    console.log("Dữ liệu cấp tài khoản:", {
        MaNhanKhau: maNhanKhau,
        HoTen: hoTen,
        CCCD: cccd,
        User: tenDangNhap,
        Role: "Nguoi_dan"
    });

    // Hiển thị thông báo chi tiết
    const successMsg = document.getElementById('successMessage');
    successMsg.style.display = 'block';
    successMsg.innerHTML = `
        <div style="text-align: left;">
            <i class="fa-solid fa-check-circle"></i> <b>Cấp thành công!</b><br>
            - Mã Nhân Khẩu: <b>${maNhanKhau}</b><br>
            - Công dân: <b>${hoTen}</b><br>
            - Tài khoản: <b>${tenDangNhap}</b>
        </div>
    `;

    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function resetForm() {
    if(confirm("Bạn có chắc muốn xóa hết dữ liệu đang nhập?")) {
        document.getElementById('grantAccountForm').reset();
        document.getElementById('successMessage').style.display = 'none';
    }
}