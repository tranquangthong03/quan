// Dữ liệu giả lập khớp với bảng NhanKhau
let citizens = [
    { 
        maNK: "NK001", 
        hoTen: "Nguyễn Văn An", 
        ngaySinh: "1980-05-15", 
        gioiTinh: "Nam", 
        cccd: "034080001234",
        queQuan: "Thái Bình",
        ngheNghiep: "Kỹ sư",
        maHo: "HG001", 
        quanHe: "Chủ hộ",
        tinhTrang: "Thường trú"
    },
    { 
        maNK: "NK002", 
        hoTen: "Trần Thị Bích", 
        ngaySinh: "1982-10-20", 
        gioiTinh: "Nữ", 
        cccd: "034182005678",
        queQuan: "Nam Định",
        ngheNghiep: "Giáo viên",
        maHo: "HG001", 
        quanHe: "Vợ",
        tinhTrang: "Thường trú"
    },
    { 
        maNK: "NK003", 
        hoTen: "Lê Văn Cường", 
        ngaySinh: "1995-02-02", 
        gioiTinh: "Nam", 
        cccd: "038095009999",
        queQuan: "Thanh Hóa",
        ngheNghiep: "Tự do",
        maHo: "HG002", 
        quanHe: "Chủ hộ",
        tinhTrang: "Tạm trú"
    }
];

// 1. Hàm hiển thị bảng (Render Table)
function renderTable(data) {
    const tbody = document.getElementById("citizenTableBody");
    tbody.innerHTML = "";

    data.forEach(nk => {
        const row = document.createElement("tr");
        
        // Tô màu trạng thái cho đẹp
        let badgeColor = "#27ae60"; // Xanh (Thường trú)
        if(nk.tinhTrang === "Tạm trú") badgeColor = "#f39c12"; // Cam
        if(nk.tinhTrang === "Đã mất") badgeColor = "#7f8c8d"; // Xám

        row.innerHTML = `
            <td><strong style="color: var(--primary-color)">${nk.maNK}</strong></td>
            <td style="font-weight: 500;">${nk.hoTen}</td>
            <td>${formatDate(nk.ngaySinh)}</td>
            <td>${nk.gioiTinh}</td>
            <td>${nk.cccd}</td>
            <td><span style="background: #e8f0fe; color: #1967d2; padding: 2px 8px; border-radius: 4px; font-size: 12px;">${nk.maHo}</span></td>
            <td>${nk.quanHe}</td>
            <td><span style="color: ${badgeColor}; font-size: 13px; font-weight: 500;">${nk.tinhTrang}</span></td>
            <td>
                <button class="action-btn edit-btn" onclick="openEdit('${nk.maNK}')" title="Sửa">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="action-btn delete-btn" onclick="deleteCitizen('${nk.maNK}')" title="Xóa">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Format ngày tháng
function formatDate(dateStr) {
    if(!dateStr) return "";
    const [y, m, d] = dateStr.split("-");
    return `${d}/${m}/${y}`;
}

// 2. Mở Modal Edit & Điền dữ liệu cũ vào Form
function openEdit(maNK) {
    const person = citizens.find(p => p.maNK === maNK);
    if(person) {
        // Điền dữ liệu vào các ô input tương ứng
        document.getElementById("m_maNK").value = person.maNK;
        document.getElementById("m_maNK").readOnly = true; // Không cho sửa Mã khi đang Edit
        
        document.getElementById("m_hoTen").value = person.hoTen;
        document.getElementById("m_ngaySinh").value = person.ngaySinh;
        document.getElementById("m_gioiTinh").value = person.gioiTinh;
        document.getElementById("m_cccd").value = person.cccd;
        document.getElementById("m_queQuan").value = person.queQuan;
        document.getElementById("m_ngheNghiep").value = person.ngheNghiep;
        document.getElementById("m_maHo").value = person.maHo;
        document.getElementById("m_quanHe").value = person.quanHe;
        document.getElementById("m_tinhTrang").value = person.tinhTrang;
        
        // Hiện Modal
        document.getElementById("citizenModal").style.display = "flex";
        document.getElementById("modalTitle").innerText = "Cập Nhật: " + person.hoTen;
    }
}

// 3. Mở Modal Thêm mới
function openModal(type) {
    if(type === 'add') {
        document.getElementById("updateForm").reset();
        document.getElementById("m_maNK").readOnly = false; // Cho phép nhập Mã khi thêm mới
        document.getElementById("modalTitle").innerText = "Thêm Nhân Khẩu Mới";
        document.getElementById("citizenModal").style.display = "flex";
    }
}

// 4. Đóng Modal
function closeModal() {
    document.getElementById("citizenModal").style.display = "none";
}

// 5. Xử lý sự kiện Submit Form (Lưu)
document.getElementById("updateForm").addEventListener("submit", function(e){
    e.preventDefault();
    
    // Thu thập dữ liệu từ form
    const formData = {
        maNK: document.getElementById("m_maNK").value,
        hoTen: document.getElementById("m_hoTen").value,
        ngaySinh: document.getElementById("m_ngaySinh").value,
        gioiTinh: document.getElementById("m_gioiTinh").value,
        cccd: document.getElementById("m_cccd").value,
        queQuan: document.getElementById("m_queQuan").value,
        ngheNghiep: document.getElementById("m_ngheNghiep").value,
        maHo: document.getElementById("m_maHo").value,
        quanHe: document.getElementById("m_quanHe").value,
        tinhTrang: document.getElementById("m_tinhTrang").value
    };

    console.log("Dữ liệu lưu xuống DB:", formData);
    alert("Lưu thông tin nhân khẩu thành công!");
    closeModal();
    // Trong thực tế: Gọi API cập nhật danh sách và render lại bảng
});

// 6. Tìm kiếm
function searchCitizen() {
    const keyword = document.getElementById("searchInput").value.toLowerCase();
    const filtered = citizens.filter(p => 
        p.hoTen.toLowerCase().includes(keyword) || 
        p.maHo.toLowerCase().includes(keyword) ||
        p.cccd.includes(keyword) ||
        p.maNK.toLowerCase().includes(keyword)
    );
    renderTable(filtered);
}

// 7. Xóa
function deleteCitizen(maNK) {
    if(confirm("Bạn có chắc chắn muốn xóa nhân khẩu " + maNK + " không?")) {
        alert("Đã xóa thành công!");
        // Thực tế: Gọi API xóa và render lại bảng
    }
}

// Chạy lần đầu
document.addEventListener("DOMContentLoaded", () => renderTable(citizens));