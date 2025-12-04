// Dữ liệu giả lập (Mô phỏng bảng HoGiaDinh + join với Thon, Xa, Tinh)
let households = [
    {
        maHo: "HG001",
        maChuHo: "NK001",
        tenChuHo: "Nguyễn Văn A", // Field này giả lập lấy từ bảng NhanKhau
        ngayLap: "2020-01-15",
        tinh: "Hà Nội",
        xa: "Xã Hòa Tiến",
        thon: "Thôn 1",
        soThanhVien: 4
    },
    {
        maHo: "HG002",
        maChuHo: "NK005",
        tenChuHo: "Trần Thị B",
        ngayLap: "2021-03-20",
        tinh: "Hà Nội",
        xa: "Xã Hòa Tiến",
        thon: "Thôn 2",
        soThanhVien: 3
    },
    {
        maHo: "HG003",
        maChuHo: "NK009",
        tenChuHo: "Lê Văn C",
        ngayLap: "2019-11-10",
        tinh: "Hà Nội",
        xa: "Xã Hòa Châu",
        thon: "Thôn Bắc",
        soThanhVien: 5
    },
    {
        maHo: "HG004",
        maChuHo: "NK012",
        tenChuHo: "Phạm Văn D",
        ngayLap: "2022-05-05",
        tinh: "Hà Nội",
        xa: "Xã Hòa Châu",
        thon: "Thôn Nam",
        soThanhVien: 2
    }
];

// 1. Render Bảng
function renderTable(data) {
    const tbody = document.getElementById("householdTableBody");
    tbody.innerHTML = "";

    data.forEach(h => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><strong style="color: var(--primary-color)">${h.maHo}</strong></td>
            <td>
                <div><b>${h.tenChuHo}</b></div>
                <small style="color: #666;">(${h.maChuHo})</small>
            </td>
            <td>${h.thon}, ${h.xa}, ${h.tinh}</td>
            <td>${formatDate(h.ngayLap)}</td>
            <td><span class="member-count">${h.soThanhVien} thành viên</span></td>
            <td style="text-align: right;">
                <button class="action-btn view-btn" title="Xem thành viên"><i class="fa-solid fa-eye"></i></button>
                <button class="action-btn edit-btn" onclick="openEdit('${h.maHo}')" title="Sửa"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="action-btn delete-btn" onclick="deleteHousehold('${h.maHo}')" title="Xóa"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Format ngày
function formatDate(dateStr) {
    if(!dateStr) return "";
    const [y, m, d] = dateStr.split("-");
    return `${d}/${m}/${y}`;
}

// 2. Các hàm Modal
function openModal(type) {
    if (type === 'add') {
        document.getElementById("householdForm").reset();
        document.getElementById("m_maHo").readOnly = false;
        document.getElementById("modalTitle").innerText = "Thêm Hộ Gia Đình Mới";
        document.getElementById("householdModal").style.display = "flex";
    }
}

function openEdit(maHo) {
    const item = households.find(h => h.maHo === maHo);
    if(item) {
        document.getElementById("m_maHo").value = item.maHo;
        document.getElementById("m_maHo").readOnly = true;
        document.getElementById("m_ngayLap").value = item.ngayLap;
        document.getElementById("m_chuHo").value = item.maChuHo;
        // Giả lập việc chọn địa chỉ (thực tế cần logic map value option)
        // document.getElementById("m_thon").value = item.thon; 
        
        document.getElementById("modalTitle").innerText = "Cập Nhật Hộ: " + item.maHo;
        document.getElementById("householdModal").style.display = "flex";
    }
}

function closeModal() {
    document.getElementById("householdModal").style.display = "none";
}

// 3. Xử lý Lưu Form
document.getElementById("householdForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Đã lưu thông tin hộ gia đình thành công!");
    closeModal();
    // Logic gọi API lưu xuống DB sẽ đặt ở đây
});

// 4. Tìm kiếm
function searchHousehold() {
    const keyword = document.getElementById("searchInput").value.toLowerCase();
    const filtered = households.filter(h => 
        h.maHo.toLowerCase().includes(keyword) || 
        h.tenChuHo.toLowerCase().includes(keyword)
    );
    renderTable(filtered);
}

// 5. Xóa
function deleteHousehold(maHo) {
    if(confirm("Bạn có chắc chắn muốn xóa hộ " + maHo + " và toàn bộ thành viên không?")) {
        alert("Đã xóa hộ " + maHo);
    }
}

// Init
document.addEventListener("DOMContentLoaded", () => renderTable(households));