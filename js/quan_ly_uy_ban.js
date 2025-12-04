// --- DỮ LIỆU GIẢ LẬP ---

// 1. Danh sách tài khoản hệ thống
let accounts = [
    { maTK: "TK001", user: "truongthon01", ten: "Nguyễn Văn A", role: "Trưởng Thôn", status: "Active" },
    { maTK: "TK002", user: "congan01", ten: "Lê Văn B", role: "Công An Xã", status: "Active" },
    { maTK: "TK003", user: "034099001234", ten: "Trần Thị C", role: "Người Dân", status: "Locked" },
    { maTK: "TK004", user: "038088005678", ten: "Hoàng Văn D", role: "Người Dân", status: "Active" },
];

// 2. Danh sách bài đăng thông báo
let posts = [
    { maBai: "BD001", tieuDe: "Lịch tiêm chủng mở rộng tháng 12/2025", ngayDang: "2025-11-30", nguoiDang: "Cán bộ UBND" },
    { maBai: "BD002", tieuDe: "Thông báo về việc làm CCCD gắn chip đợt 3", ngayDang: "2025-12-01", nguoiDang: "Cán bộ UBND" },
    { maBai: "BD003", tieuDe: "Mời họp cử tri thôn 1, 2, 3", ngayDang: "2025-12-05", nguoiDang: "Văn phòng Xã" },
];

// --- HÀM XỬ LÝ CHUNG ---

// Chuyển Tab
window.switchTab = function(tabId, element) {
    // Ẩn nội dung cũ
    document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));
    // Bỏ active menu cũ (cả sidebar và nav-tab)
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.menu-link').forEach(el => el.classList.remove('active'));

    // Hiện tab mới
    document.getElementById(tabId).classList.add('active');
    
    // Active menu được click (nếu là nav-item)
    if(element.classList.contains('nav-item')) {
        element.classList.add('active');
    }
    // Logic đồng bộ sidebar nếu cần (ở đây đơn giản hóa)
}

// --- LOGIC QUẢN LÝ TÀI KHOẢN ---

function renderAccounts(data) {
    const tbody = document.getElementById("accountTableBody");
    tbody.innerHTML = "";
    
    data.forEach(acc => {
        let statusBadge = acc.status === 'Active' 
            ? `<span class="status-badge status-active">Hoạt động</span>` 
            : `<span class="status-badge status-locked">Đã khóa</span>`;
            
        let actionBtn = acc.status === 'Active'
            ? `<button class="action-btn" onclick="toggleStatus('${acc.maTK}')" title="Khóa tài khoản" style="color: #e74c3c;"><i class="fa-solid fa-lock"></i></button>`
            : `<button class="action-btn" onclick="toggleStatus('${acc.maTK}')" title="Mở khóa" style="color: #27ae60;"><i class="fa-solid fa-lock-open"></i></button>`;

        tbody.innerHTML += `
            <tr>
                <td><strong>${acc.maTK}</strong></td>
                <td>${acc.user}</td>
                <td>${acc.ten}</td>
                <td>${acc.role}</td>
                <td>${statusBadge}</td>
                <td style="text-align: right;">
                    <button class="action-btn" style="color: #3498db;" title="Đặt lại mật khẩu"><i class="fa-solid fa-key"></i></button>
                    ${actionBtn}
                </td>
            </tr>
        `;
    });
}

window.toggleStatus = function(maTK) {
    const acc = accounts.find(a => a.maTK === maTK);
    if(acc) {
        let action = acc.status === 'Active' ? "KHÓA" : "MỞ KHÓA";
        if(confirm(`Bạn có chắc muốn ${action} tài khoản ${acc.user}?`)) {
            acc.status = acc.status === 'Active' ? 'Locked' : 'Active';
            renderAccounts(accounts);
        }
    }
}

window.searchAccount = function() {
    const keyword = document.getElementById("searchAcc").value.toLowerCase();
    const filtered = accounts.filter(a => a.user.toLowerCase().includes(keyword) || a.ten.toLowerCase().includes(keyword));
    renderAccounts(filtered);
}

// --- LOGIC QUẢN LÝ THÔNG BÁO ---

function renderPosts() {
    const tbody = document.getElementById("postTableBody");
    tbody.innerHTML = "";
    
    posts.forEach(p => {
        tbody.innerHTML += `
            <tr>
                <td><strong>${p.maBai}</strong></td>
                <td style="font-weight: 500; color: #8e44ad;">${p.tieuDe}</td>
                <td>${p.ngayDang}</td>
                <td>${p.nguoiDang}</td>
                <td style="text-align: right;">
                    <button class="action-btn" title="Xem/Sửa"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="action-btn delete-btn" onclick="deletePost('${p.maBai}')"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
}

window.openPostModal = function() {
    document.getElementById("postForm").reset();
    // Set ngày hiện tại
    document.getElementById("p_ngayDang").valueAsDate = new Date();
    document.getElementById("postModal").style.display = "flex";
}

window.closePostModal = function() {
    document.getElementById("postModal").style.display = "none";
}

document.getElementById("postForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const title = document.getElementById("p_tieuDe").value;
    const date = document.getElementById("p_ngayDang").value;
    
    // Thêm mới vào đầu mảng
    posts.unshift({
        maBai: "BD" + Math.floor(Math.random() * 1000),
        tieuDe: title,
        ngayDang: date,
        nguoiDang: "Cán bộ UBND"
    });
    
    alert("Đăng thông báo thành công!");
    closePostModal();
    renderPosts();
});

window.deletePost = function(maBai) {
    if(confirm("Xóa bài đăng này khỏi hệ thống?")) {
        posts = posts.filter(p => p.maBai !== maBai);
        renderPosts();
    }
}

// --- INIT ---
document.addEventListener("DOMContentLoaded", () => {
    renderAccounts(accounts);
    renderPosts();
});