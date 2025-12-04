// js/cong_an.js

// Dữ liệu giả lập (Mock Data)
const tamTruData = [
    { id: "TT001", ten: "Lê Văn Cường", thuongTru: "Thanh Hóa", tamTru: "Thôn 1, Xã Hòa Tiến", tuNgay: "01/10/2023", denNgay: "01/10/2024", status: "ChoDuyet" },
    { id: "TT002", ten: "Phạm Thị Duyên", thuongTru: "Nghệ An", tamTru: "Thôn 2, Xã Hòa Tiến", tuNgay: "15/11/2023", denNgay: "15/05/2024", status: "DaDuyet" },
    { id: "TT003", ten: "Hoàng Văn Em", thuongTru: "Hà Tĩnh", tamTru: "Thôn 1, Xã Hòa Tiến", tuNgay: "20/12/2023", denNgay: "20/12/2024", status: "ChoDuyet" }
];

const tamVangData = [
    { id: "TV001", ten: "Nguyễn Văn A", lyDo: "Đi làm ăn xa", noiDen: "TP. HCM", tuNgay: "01/01/2024", denNgay: "30/06/2024", status: "ChoDuyet" },
    { id: "TV002", ten: "Trần Thị B", lyDo: "Thăm thân", noiDen: "Hà Nội", tuNgay: "10/02/2024", denNgay: "20/02/2024", status: "TuChoi" }
];

// Hàm render Badge trạng thái
function getStatusBadge(status) {
    if(status === 'ChoDuyet') return '<span class="badge badge-pending">Chờ duyệt</span>';
    if(status === 'DaDuyet') return '<span class="badge badge-approved">Đã duyệt</span>';
    if(status === 'TuChoi') return '<span class="badge badge-rejected">Từ chối</span>';
    return '';
}

// Render bảng Tạm Trú
function renderTamTru() {
    const tbody = document.getElementById("tamTruTable");
    if(!tbody) return; // Kiểm tra tồn tại
    tbody.innerHTML = "";
    tamTruData.forEach(item => {
        tbody.innerHTML += `
            <tr>
                <td><strong>${item.id}</strong></td>
                <td>${item.ten}</td>
                <td>${item.thuongTru}</td>
                <td>${item.tamTru}</td>
                <td>${item.tuNgay} - ${item.denNgay}</td>
                <td>${getStatusBadge(item.status)}</td>
                <td style="text-align: right;">
                    ${item.status === 'ChoDuyet' ? `
                        <button class="action-btn" style="color: #27ae60;" onclick="approve('${item.id}', 'TamTru')" title="Duyệt"><i class="fa-solid fa-check"></i></button>
                        <button class="action-btn" style="color: #e74c3c;" onclick="reject('${item.id}', 'TamTru')" title="Từ chối"><i class="fa-solid fa-xmark"></i></button>
                    ` : '<button class="action-btn" style="color: #95a5a6;" title="Xem chi tiết"><i class="fa-solid fa-eye"></i></button>'}
                </td>
            </tr>
        `;
    });
}

// Render bảng Tạm Vắng
function renderTamVang() {
    const tbody = document.getElementById("tamVangTable");
    if(!tbody) return;
    tbody.innerHTML = "";
    tamVangData.forEach(item => {
        tbody.innerHTML += `
            <tr>
                <td><strong>${item.id}</strong></td>
                <td>${item.ten}</td>
                <td>${item.lyDo}</td>
                <td>${item.noiDen}</td>
                <td>${item.tuNgay} - ${item.denNgay}</td>
                <td>${getStatusBadge(item.status)}</td>
                <td style="text-align: right;">
                    ${item.status === 'ChoDuyet' ? `
                        <button class="action-btn" style="color: #27ae60;" onclick="approve('${item.id}', 'TamVang')" title="Duyệt"><i class="fa-solid fa-check"></i></button>
                        <button class="action-btn" style="color: #e74c3c;" onclick="reject('${item.id}', 'TamVang')" title="Từ chối"><i class="fa-solid fa-xmark"></i></button>
                    ` : '<button class="action-btn" style="color: #95a5a6;" title="Xem chi tiết"><i class="fa-solid fa-eye"></i></button>'}
                </td>
            </tr>
        `;
    });
}

// Xử lý chuyển Tab
function switchTab(tabId, element) {
    document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    element.classList.add('active');
}

// Xử lý Duyệt
function approve(id, type) {
    if(confirm(`Xác nhận DUYỆT hồ sơ ${type} mã ${id}?`)) {
        alert("Đã duyệt thành công!");
        if(type === 'TamTru') {
            const item = tamTruData.find(x => x.id === id);
            if(item) item.status = 'DaDuyet';
            renderTamTru();
        } else {
            const item = tamVangData.find(x => x.id === id);
            if(item) item.status = 'DaDuyet';
            renderTamVang();
        }
    }
}

// Xử lý Từ chối
function reject(id, type) {
    let reason = prompt("Nhập lý do từ chối hồ sơ:");
    if(reason) {
        alert(`Đã từ chối hồ sơ ${id}.`);
        if(type === 'TamTru') {
            const item = tamTruData.find(x => x.id === id);
            if(item) item.status = 'TuChoi';
            renderTamTru();
        } else {
            const item = tamVangData.find(x => x.id === id);
            if(item) item.status = 'TuChoi';
            renderTamVang();
        }
    }
}

// Khởi chạy
document.addEventListener("DOMContentLoaded", () => {
    renderTamTru();
    renderTamVang();
});