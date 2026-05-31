# Bài 9: Xử lý Conflicts (Chi tiết)

## 🎬 "Cuộc Chiến Merge" — 3 Giờ Trước Deadline

*Thứ Sáu, 21:00. Deadline nộp BTL: Thứ Hai, 00:00.*

*Minh và Linh cùng làm trang web Todo App cho môn CSE391. Minh phụ trách trang Login, Linh làm trang Register. Cả hai đều phải sửa file `styles.css` chung.*

*Minh sửa: `.header { background: #2563eb; }` (xanh dương)*

*Linh sửa: `.header { background: #dc2626; }` (đỏ)*

*Minh merge trước — êm ả. Linh merge sau...*

```
CONFLICT (content): Merge conflict in styles.css
Automatic merge failed; fix conflicts and then commit the result.
```

*Linh gọi cho Minh, giọng hoảng hốt:*

> **Linh:** *"Git bảo conflict! Code hỏng hết rồi hay sao?!"*
>
> **Minh (bình tĩnh):** *"Đừng sợ. Conflict không phải lỗi. Conflict là Git HỎI Ý KIẾN mình thôi."*

---

## 🎯 Mục tiêu
Sau bài này, bạn sẽ:
- Hiểu conflict là gì (và tại sao nó KHÔNG đáng sợ)
- Nhận biết các loại conflict
- Giải quyết conflict 6 bước
- Sử dụng VS Code để resolve nhanh
- Tránh conflict khi làm việc nhóm

---

## 🍕 Conflict Không Phải Kẻ Thù — Nó Là Câu Hỏi

Hãy nghĩ thế này:

> Bạn và bạn cùng phòng cùng đặt pizza qua app. Bạn chọn **Pepperoni**. Bạn cùng phòng chọn **Margherita**. App không biết giao cái nào.
>
> App hỏi lại: *"Các bạn muốn pizza nào? Hay lấy cả hai?"*
>
> Đó chính là **conflict**.

**Git không hỏng. Git đang lịch sự hỏi: *"Cả hai người đều sửa dòng này. Giữ phiên bản nào?"***

```javascript
<<<<<<< HEAD (🍕 Pizza bạn chọn)
.header { background: #2563eb; }      // Xanh dương của Minh
=======
.header { background: #dc2626; }      // Đỏ của Linh
>>>>>>> feature/register (🍕 Pizza bạn cùng phòng chọn)
```

**Ba lựa chọn:**
1. Giữ xanh dương (chọn pizza Minh)
2. Giữ đỏ (chọn pizza Linh)
3. Kết hợp cả hai — biến thành gradient! 🎨
   ```css
   .header { background: linear-gradient(135deg, #2563eb, #dc2626); }
   ```

---

## 📊 Các loại Conflict

### 1. Content Conflict — "Cùng sửa cùng dòng" (phổ biến nhất)

```javascript
<<<<<<< HEAD
function login() {
    console.log("Login from main");
}
=======
function login() {
    console.log("Login from feature");
    validateForm();
}
>>>>>>> feature/login
```

### 2. Modify/Delete Conflict — "Người sửa, người xóa"

```
CONFLICT (modify/delete): file.js deleted in HEAD and modified in feature/login
```

*Giống cùng phòng: bạn sơn lại cửa, bạn cùng phòng phá luôn cửa.* 😅

**Giải quyết:**
```bash
git add file.js      # Giữ file (giữ cửa đã sơn)
# hoặc
git rm file.js       # Xóa file (đồng ý phá cửa)
```

### 3. Add/Add Conflict — "Cả hai tạo cùng file"

```
CONFLICT (add/add): utils.js added in both branches
```

### 4. Rename/Move Conflict — "Người đổi tên, người sửa nội dung"

---

## 🛠️ Giải quyết Conflict — 6 Bước Mẹ Dạy

### Bước 1: BÌNH TĨNH — Xem file nào conflict

```bash
git status
# Unmerged paths:
#     both modified:   styles.css
#     both modified:   src/main.js
```

### Bước 2: MỞ FILE — Nhìn conflict markers

```bash
cat styles.css
```

Bạn sẽ thấy:
```css
/* Code bình thường */
body { font-family: Arial; }

/* CONFLICT bắt đầu ở đây */
<<<<<<< HEAD
.header { background: #2563eb; }
=======
.header { background: #dc2626; }
>>>>>>> feature/register
/* CONFLICT kết thúc */

/* Code bình thường tiếp */
footer { color: #666; }
```

### Bước 3: QUYẾT ĐỊNH — Chọn phiên bản nào

**Lựa chọn 1:** Giữ code từ main (Minh thắng)
```css
.header { background: #2563eb; }
```

**Lựa chọn 2:** Giữ code từ feature (Linh thắng)
```css
.header { background: #dc2626; }
```

**Lựa chọn 3:** Kết hợp thông minh (Win-Win ⭐)
```css
.header { background: linear-gradient(135deg, #2563eb, #dc2626); }
```

### Bước 4: XÓA MARKERS — Dọn dẹp

Xóa tất cả dòng markers:
- `<<<<<<< HEAD`
- `=======`
- `>>>>>>> feature/register`

### Bước 5: ĐÁNH DẤU ĐÃ RESOLVE

```bash
git add styles.css
git add src/main.js    # Add tất cả file đã resolve
```

### Bước 6: COMMIT

```bash
git commit -m "merge: Resolve conflicts in styles.css and main.js

- Combined header styles from both branches
- Kept validation logic from feature/register"
```

---

## 🎨 Dùng VS Code (Nhanh x10!)

VS Code là vũ khí tốt nhất cho conflict resolution:

1. **Mở file có conflict** → VS Code tự highlight màu sắc
2. Click vào options xuất hiện:
   - **Accept Current Change** → Giữ code hiện tại (HEAD)
   - **Accept Incoming Change** → Giữ code merge vào
   - **Accept Both Changes** → Giữ cả hai
   - **Compare Changes** → So sánh bên cạnh nhau
3. Save file
4. `git add` → `git commit`

> *Minh hướng dẫn Linh dùng VS Code. Linh click "Accept Both Changes" → cả hai phiên bản CSS đều giữ. Sửa lại cho hợp lý, save, commit. 3 phút xong!*

---

## 🔧 Giải quyết nhanh khi chắc chắn

```bash
# Chọn code MỚI (đang merge vào)
git checkout --theirs styles.css
git add styles.css

# Chọn code CŨ (HEAD hiện tại)
git checkout --ours styles.css
git add styles.css
```

⚠️ Chỉ dùng khi CHẮC CHẮN! Nếu không chắc → mở file, đọc code, quyết định.

---

## 📋 Xử lý Conflict theo tình huống

### Tình huống 1: Conflict trong Pull Request

> *Minh tạo PR trên GitHub, thấy warning "This branch has conflicts"*

**Cách 1: Resolve trên GitHub** (conflicts đơn giản)
- Click "Resolve conflicts" trên GitHub
- Sửa trong editor web → "Mark as resolved" → Commit

**Cách 2: Resolve trên máy** (conflicts phức tạp)
```bash
git checkout feature/login
git fetch origin
git merge origin/main        # Merge main vào branch hiện tại
# Resolve conflicts...
git add .
git commit -m "merge: Resolve conflicts with main"
git push                     # PR tự động update
```

### Tình huống 2: Conflict khi Rebase

```bash
git rebase main
# CONFLICT! → Resolve từng commit một
git add .
git rebase --continue        # Tiếp tục rebase
# Lặp lại nếu còn conflict

# Nếu muốn hủy:
git rebase --abort           # Quay lại trước khi rebase
```

---

## 🏢 WAR STORY: Sự cố Merge tại Shopee (2023)

> **Chị Hà (Tech Lead)** chia sẻ trong buổi workshop:
>
> *"Năm 2023, team 12 người phát triển tính năng Flash Sale cho 11.11. Mỗi người một branch, sprint 2 tuần.*
>
> *Ngày merge cuối cùng: **47 conflicts** trong 23 files. Lý do? Cả tháng không ai merge main vào branch.*
>
> *Mất nguyên 1 ngày resolve. Một senior sửa sai conflict → bug production → mất 30 phút revenue Flash Sale.*
>
> *Sau sự cố, rule bắt buộc: **Merge main vào feature branch MỖI NGÀY.** Conflicts nhỏ resolve 5 phút. Conflicts lớn resolve 5 tiếng."*

---

## 🎯 Tránh Conflict — Phòng bệnh hơn chữa bệnh

### 1. 🗣️ GIAO TIẾP — Quan trọng nhất!
- *"Mình sẽ sửa file `styles.css` chiều nay nhé"*
- *"OK, mình tránh ra, sửa file khác trước"*

### 2. 🔄 Merge main THƯỜNG XUYÊN
```bash
git checkout feature/login
git merge origin/main         # Mỗi ngày 1 lần
# → Conflicts nhỏ, dễ resolve
```

### 3. 📁 Tách file hợp lý
- ❌ 1 file `styles.css` khổng lồ cho cả team
- ✅ `login.css`, `register.css`, `common.css` — mỗi người quản lý file riêng

### 4. ⏱️ Branch ngắn, merge sớm
- ❌ Branch tồn tại 3 tuần → guaranteed conflicts
- ✅ Branch 1-3 ngày → ít conflict, dễ xử lý

---

## 💡 Best Practices

1. **TEST sau resolve** — Conflict có thể làm logic sai:
   ```bash
   # Resolve xong → Test ngay
   npm test
   # hoặc mở browser kiểm tra
   ```

2. **Commit message rõ ràng khi merge:**
   ```bash
   git commit -m "merge: Resolve conflicts with main
   
   - styles.css: Keep gradient background from both branches
   - main.js: Combine validation logic"
   ```

3. **KHÔNG commit khi còn conflict markers** — Git sẽ từ chối nếu bạn quên xóa `<<<<<<<`

4. **Backup trước resolve** (nếu không chắc):
   ```bash
   git stash          # Lưu tạm thay đổi
   # hoặc tạo branch backup
   git branch backup-before-merge
   ```

---

## ⚠️ Lưu ý quan trọng

1. **Conflict KHÔNG phải lỗi** — nó là tính năng bảo vệ
2. **Test sau resolve** — conflict có thể làm code sai mà không báo lỗi
3. **`git merge --abort`** — nếu resolve sai, hủy merge và bắt đầu lại
4. **KHÔNG force push** sau resolve trên branch chung

---

## 🔍 Troubleshooting

### Lỗi: `fatal: refusing to merge unrelated histories`
```bash
git merge --allow-unrelated-histories origin/main
```

### Lỗi: `error: You have not concluded your merge`
→ Còn conflict chưa resolve. Kiểm tra `git status`, resolve hết, rồi commit.

### Conflict quá nhiều, quá phức tạp
→ Cân nhắc `git merge --abort`, sau đó merge từng file một. Hoặc nhờ team review cùng.

---

## 📝 Tóm tắt

| Bước | Lệnh | Ghi nhớ |
|---|---|---|
| 1. Xem conflict | `git status` | Bình tĩnh, xem danh sách |
| 2. Mở file | VS Code | Đọc conflict markers |
| 3. Quyết định | Chọn/kết hợp | Current, Incoming, hoặc Both |
| 4. Xóa markers | Xóa `<<<`, `===`, `>>>` | Dọn dẹp |
| 5. Add | `git add .` | Đánh dấu đã resolve |
| 6. Commit | `git commit` | Hoàn tất merge |

---

## ➡️ Chuyện tiếp theo...

*Minh và Linh resolve xong conflict đầu tiên. Linh thở phào: "Hóa ra không khó!"*

*Nhưng Minh nhớ lời anh Hùng: "Conflict code thì dễ resolve. **Conflict với con người** mới khó. Khi reviewer reject code của em, em phản ứng thế nào? Khi em review code người khác và thấy code xấu, em nói sao cho người ta không buồn?"*

**→ [Bài 10: Pull Request trên GitHub](./04-pull-request.md) — Nghệ thuật "xin phép" trước khi merge code, và tại sao Code Review có thể là kỹ năng quan trọng nhất mà trường đại học không dạy.**

---

## 🔗 Tài liệu tham khảo
- [Git Documentation - Basic Merge Conflicts](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging#_basic_merge_conflicts)
- [GitHub - Resolving Merge Conflicts](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts)
- [VS Code - Git Conflict Resolution](https://code.visualstudio.com/docs/editor/versioncontrol)
