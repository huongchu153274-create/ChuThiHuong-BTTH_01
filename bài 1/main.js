/**
 * main.js — logic Quản lý sinh viên
 * - Lưu/đọc dữ liệu từ localStorage
 * - Render bảng sinh viên
 * - Xử lý modal form (thêm / sửa)
 * - Xử lý sự kiện Sửa / Xóa (event delegation)
 */

// Key dùng để lưu danh sách sinh viên trong localStorage
const LS_KEY = 'btth03_students_v1';

// --- DOM elements (các phần tử cần thao tác với DOM) ---
// Nút mở form thêm sinh viên
const btnAdd = document.getElementById('btnAdd');
// Popup modal chứa form
const modal = document.getElementById('modal');
// Nút đóng modal
const closeModalBtn = document.getElementById('closeModal');
// Nút hủy trong form
const cancelBtn = document.getElementById('cancelBtn');
// Tiêu đề modal (thêm / sửa)
const modalTitle = document.getElementById('modal-title');
// Form nhập liệu
const studentForm = document.getElementById('student-form');
// Thân bảng hiển thị danh sách (sử dụng event delegation)
const tbody = document.getElementById('student-tbody');
// Khu vực hiển thị thông báo ngắn
const notification = document.getElementById('notification');
// Thống kê: tổng số sinh viên và điểm trung bình
const totalCountEl = document.getElementById('totalCount');
const avgScoreEl = document.getElementById('avgScore');

// form inputs
const inputId = document.getElementById('student-id');
const inputName = document.getElementById('student-name');
const inputDob = document.getElementById('student-dob');
const inputClass = document.getElementById('student-class');
const inputGpa = document.getElementById('student-gpa');
const inputEmail = document.getElementById('student-email');
const formMode = document.getElementById('form-mode');
const editIndex = document.getElementById('edit-index');

/**
 * Đọc danh sách sinh viên từ localStorage
 * Trả về mảng (hoặc mảng rỗng nếu chưa có)
 */
function loadStudents(){
    try{
        const raw = localStorage.getItem(LS_KEY);
        return raw ? JSON.parse(raw) : [];
    }catch(e){
        console.error('loadStudents error', e);
        return [];
    }
}

/**
 * Lưu mảng sinh viên vào localStorage
 * @param {Array} arr
 */
function saveStudents(arr){
    localStorage.setItem(LS_KEY, JSON.stringify(arr));
}

/**
 * Hiển thị thông báo ngắn phía trên bảng
 * sẽ tự ẩn sau `timeout` ms (mặc định 2500ms)
 */
function showNotification(msg, timeout=2500){
    notification.textContent = msg;
    notification.classList.add('show');
    setTimeout(()=>notification.classList.remove('show'), timeout);
}

/**
 * Chuyển chuỗi ngày (ISO) thành định dạng địa phương để hiển thị
 */
function formatDate(iso){
    if(!iso) return '';
    const d = new Date(iso);
    if(Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString();
}

/**
 * Cập nhật khu vực thống kê: tổng số sinh viên và điểm trung bình
 */
function updateStatistics(students){
    const total = students.length;
    const avg = total ? (students.reduce((s,x)=>s + (parseFloat(x.gpa)||0),0)/total) : 0;
    totalCountEl.textContent = total;
    avgScoreEl.textContent = avg.toFixed(2);
}

/**
 * Render lại toàn bộ thân bảng từ mảng students
 * - Nếu rỗng: hiển thị dòng thông báo
 * - Mỗi dòng có 2 nút Sửa / Xóa (data-index để biết vị trí trong mảng)
 */
function renderStudents(){
    const students = loadStudents();
    tbody.innerHTML = '';
    if(students.length===0){
        const tr = document.createElement('tr');
        tr.innerHTML = '<td colspan="7" style="text-align:center;padding:16px;color:#666">Chưa có dữ liệu sinh viên</td>';
        tbody.appendChild(tr);
    }else{
        students.forEach((s, idx)=>{
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${escapeHtml(s.id)}</td>
                <td>${escapeHtml(s.name)}</td>
                <td>${escapeHtml(formatDate(s.dob))}</td>
                <td>${escapeHtml(s.class)}</td>
                <td>${Number(s.gpa).toFixed(2)}</td>
                <td>${escapeHtml(s.email || '')}</td>
                <td class="actions">
                    <button class="edit" data-index="${idx}">Sửa</button>
                    <button class="delete" data-index="${idx}">Xóa</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
    updateStatistics(students);
}

/**
 * Escape ký tự HTML cơ bản để tránh XSS khi render
 */
function escapeHtml(str){
    if(str==null) return '';
    return String(str).replace(/[&<>\"']/g, function(ch){
        return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[ch];
    });
}

/**
 * Mở modal ở chế độ 'add' hoặc 'edit'
 * nếu mode === 'edit' sẽ nạp dữ liệu của sinh viên theo index
 */
function openModal(mode='add', index=-1){
    formMode.value = mode;
    editIndex.value = index;
    if(mode==='add'){
        modalTitle.textContent = 'Thêm sinh viên';
        studentForm.reset();
        inputId.focus();
    }else{
        modalTitle.textContent = 'Cập nhật sinh viên';
        const students = loadStudents();
        const s = students[index];
        if(s){
            inputId.value = s.id || '';
            inputName.value = s.name || '';
            inputDob.value = s.dob || '';
            inputClass.value = s.class || '';
            inputGpa.value = s.gpa || '';
            inputEmail.value = s.email || '';
        }
    }
    modal.classList.remove('hidden');
}

/**
 * Đóng modal (ẩn)
 */
function closeModal(){
    modal.classList.add('hidden');
}

/**
 * Xử lý submit form
 * - Nếu mode === 'add' thì thêm mới
 * - Nếu mode === 'edit' thì cập nhật phần tử tương ứng
 */
function addOrUpdateStudent(e){
    e.preventDefault();
    const mode = formMode.value;
    const id = inputId.value.trim();
    const name = inputName.value.trim();
    const dob = inputDob.value;
    const cls = inputClass.value.trim();
    const gpa = parseFloat(inputGpa.value) || 0;
    const email = inputEmail.value.trim();

    if(!id || !name){
        showNotification('Mã và họ tên là bắt buộc');
        return;
    }

    const students = loadStudents();
    if(mode==='add'){
        // Ngăn chặn trùng Mã sinh viên khi thêm mới
        if(students.some(s => s.id === id)){
            showNotification('Mã sinh viên đã tồn tại');
            return;
        }
        students.push({id,name,dob,class:cls,gpa,email});
        saveStudents(students);
        renderStudents();
        showNotification('Đã thêm sinh viên');
        closeModal();
    }else{
        const idx = parseInt(editIndex.value,10);
        if(isNaN(idx) || idx<0 || idx>=students.length){
            showNotification('Không tìm thấy sinh viên để cập nhật');
            return;
        }
        // Ngăn chặn trùng Mã sinh viên khi cập nhật (ngoại trừ chính nó)
        if(students.some((s,i) => s.id === id && i !== idx)){
            showNotification('Mã sinh viên đã tồn tại');
            return;
        }
        students[idx] = {id,name,dob,class:cls,gpa,email};
        saveStudents(students);
        renderStudents();
        showNotification('Đã cập nhật sinh viên');
        closeModal();
    }
}

/**
 * Event delegation trên thân bảng: bắt sự kiện click
 * - Nếu click vào nút .edit => mở modal nạp dữ liệu để sửa
 * - Nếu click vào nút .delete => hỏi xác nhận rồi xóa
 */
function handleTableClick(e){
    const editBtn = e.target.closest('button.edit');
    const delBtn = e.target.closest('button.delete');
    if(editBtn){
        const idx = parseInt(editBtn.dataset.index,10);
        openModal('edit', idx);
        return;
    }
    if(delBtn){
        const idx = parseInt(delBtn.dataset.index,10);
        const students = loadStudents();
        const s = students[idx];
        if(!s) return;
        const ok = confirm(`Xác nhận xóa sinh viên ${s.name} (${s.id})?`);
        if(ok){
            students.splice(idx,1);
            saveStudents(students);
            renderStudents();
            showNotification('Đã xóa sinh viên');
        }
    }
}

// Events
document.addEventListener('DOMContentLoaded', ()=>{
    renderStudents();
});

btnAdd.addEventListener('click', ()=>openModal('add'));
closeModalBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', (e)=>{ e.preventDefault(); closeModal(); });
studentForm.addEventListener('submit', addOrUpdateStudent);
tbody.addEventListener('click', handleTableClick);
// Đóng modal khi click vào nền overlay
modal.addEventListener('click', (e) => {
    if(e.target === modal) closeModal();
});
