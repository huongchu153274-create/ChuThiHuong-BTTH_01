# Bài 8: Merge Branches

## 🎬 "Hợp Nhất Ba Vũ Trụ" — Ngày D-Day của nhóm BTL

*Chủ Nhật chiều. Deadline nộp BTL sáng thứ Hai.*

*Minh (feature/login) — xong.*
*Linh (feature/register) — xong.*  
*Tùng (feature/dashboard) — xong.*

*"OK team, giờ merge vào main thôi!" Minh ra lệnh.*

*Anh Hùng (mentor từ xa): "Từ từ. Merge từng branch một. Merge hết 3 lần cùng lúc = hỗn loạn. Merge lần lượt, test sau mỗi lần. Quy trình, không phải tốc độ."*

*Minh bắt đầu...*

---

## 🎯 Mục tiêu
Sau bài này, bạn sẽ:
- Hiểu Merge là gì và tại sao cần Merge
- Phân biệt **Fast-forward** vs **Three-way** merge
- Thực hành merge trong workflow nhóm
- Biết khi nào dùng Merge vs Rebase

---

## 🔀 Merge là gì? — "Hợp nhất hai dòng lịch sử"

**Merge** = Kết hợp thay đổi từ branch này vào branch khác. Giống ghép hai nhánh sông lại thành một.

---

## 📊 Hai loại Merge chính

### 1. Fast-forward Merge — "Tua nhanh" ⏩

**Khi nào?** main chưa có thay đổi mới kể từ khi tạo branch.

```
Trước merge:
main:     A───B
               \
feature:        C───D

Sau fast-forward:
main:     A───B───C───D
               (main "chạy theo" feature)
```

```bash
git checkout main
git merge feature/login
# → "Fast-forward" — Git chỉ di chuyển pointer, không tạo commit mới
```

> *Minh merge feature/login vào main — smooth! Không conflict, không merge commit. "Ez!" anh nghĩ.*

### 2. Three-way Merge — "Hợp nhất thực sự" 🔀

**Khi nào?** Cả main lẫn feature đều có commit mới (thường gặp nhất trong team).

```
Trước merge:
main:     A───B───E───F
               \
feature:        C───D

Sau three-way merge:
main:     A───B───E───F───M (merge commit)
               \         /
feature:        C───D────┘
```

```bash
git checkout main
git merge feature/register
# → "Merge made by the 'recursive' strategy."
# → Tạo merge commit M kết hợp cả hai nhánh
```

> *Linh merge feature/register vào main (đã có code của Minh). Git tự động hợp nhất. Merge commit xuất hiện. "Ồ, có commit 'Merge branch...' mới!" Linh ngạc nhiên.*

### 3. Squash Merge — "Nén lại thành 1" 📦

Gộp TẤT CẢ commits trên feature thành **1 commit duy nhất** trên main:

```bash
git checkout main
git merge --squash feature/dashboard
git commit -m "feat: Add complete dashboard page"
# → Lịch sử main: gọn gàng, mỗi feature = 1 commit
```

> **Chị Hà:** *"Tại Shopee, chúng tôi dùng Squash Merge cho mọi PR. Main chỉ có clean commits — mỗi commit = 1 feature/fix hoàn chỉnh. Dễ rollback, dễ đọc lịch sử."*

---

## 🔄 Merge thực hành — Workflow nhóm BTL

### Bước 1: Minh merge login

```bash
git checkout main
git pull origin main        # Đảm bảo main mới nhất
git merge feature/login     # Fast-forward — êm ả!
git push origin main

# Test: Mở trình duyệt → Login hoạt động ✅
```

### Bước 2: Linh merge register

```bash
git checkout main
git pull origin main        # Lấy code login của Minh
git merge feature/register  # Three-way merge — Git tự xử

# Nếu conflict → resolve (xem Bài 9)
git push origin main

# Test: Login + Register đều hoạt động ✅
```

### Bước 3: Tùng merge dashboard

```bash
git checkout main
git pull origin main        # Lấy code login + register
git merge feature/dashboard # Three-way merge

# Test: Toàn bộ app hoạt động ✅
git push origin main
```

> *Minh nhìn GitHub: 3 branches đã merge vào main. App hoàn chỉnh. "Anh Hùng nói đúng — merge từng bước, test từng bước, an toàn!"*

---

## 📋 Merge cho các kịch bản khác

### Cập nhật feature branch từ main (rất quan trọng!):

```bash
git checkout feature/login
git merge main              # Lấy code mới nhất từ main vào branch của mình
# → Tránh conflict lớn khi merge ngược lại vào main
```

> **Quy tắc vàng:** Merge main vào feature branch **MỖI NGÀY**. Conflicts nhỏ 5 phút. Conflicts lớn 5 tiếng.

### Abort merge (khi merge sai hoặc conflict quá nhiều):

```bash
git merge --abort    # Quay lại trước khi merge. Sạch sẽ.
```

### Merge không commit (review trước):

```bash
git merge --no-commit feature/login
# → Code đã merge nhưng chưa commit
# → Kiểm tra, test, rồi:
git commit -m "Merge feature/login: Add user authentication"
```

---

## ⚡ Merge vs Rebase — Khi nào dùng cái nào?

| | **Merge** | **Rebase** |
|---|---|---|
| Cách hoạt động | Tạo merge commit | Viết lại lịch sử |
| Lịch sử | Có nhánh (rõ ràng) | Thẳng (gọn gàng) |
| An toàn | ✅ Không thay đổi history | ⚠️ Rewrite history |
| Dùng khi | Branch chung, đã push | Branch riêng, chưa push |

```
Merge:                          Rebase:
main: A─B─E─F─M               main: A─B─E─F─C'─D'
          \   /                     (lịch sử thẳng)
feature:   C─D
     (nhánh rõ ràng)
```

> **Anh Hùng:** *"Merge cho shared branches. Rebase cho branches cá nhân. Nhớ quy tắc này, đỡ gây họa."*

---

## 💡 Best Practices

### 1. Luôn pull trước khi merge
```bash
git checkout main && git pull    # Bắt buộc!
```

### 2. Test sau mỗi lần merge
→ Merge có thể gây lỗi logic dù không có conflict

### 3. Merge commit message rõ ràng
```bash
git merge -m "merge: Integrate user authentication from feature/login
- Login form with email/password
- Session management
- Redirect after login" feature/login
```

### 4. Xóa branch sau merge
```bash
git branch -d feature/login              # Xóa local
git push origin --delete feature/login    # Xóa remote
```

---

## ⚠️ Lưu ý quan trọng

1. **Merge commit KHÔNG nên revert đơn giản** — revert merge commit phức tạp hơn commit thường
2. **Test sau merge** — merge có thể gây lỗi mà compiler không thấy
3. **Không force push sau merge** — gây rối cho cả team
4. **Squash merge** làm mất lịch sử chi tiết — chỉ dùng khi muốn history gọn

---

## 🔍 Troubleshooting

### `refusing to merge unrelated histories`
```bash
git merge --allow-unrelated-histories main
```

### `merge: cannot merge — have local changes`
→ `git stash` hoặc `git commit` trước khi merge

### Conflict quá nhiều
→ `git merge --abort` → merge main vào feature trước → resolve conflicts nhỏ trước → merge lại

---

## 📝 Tóm tắt

| Loại Merge | Khi nào | Kết quả |
|---|---|---|
| **Fast-forward** | Main chưa đổi | Pointer di chuyển, không merge commit |
| **Three-way** | Cả hai đều đổi | Tạo merge commit |
| **Squash** | Muốn gọn lịch sử | Gộp thành 1 commit |

| Lệnh | Ý nghĩa |
|---|---|
| `git merge <branch>` | Hợp nhất branch vào branch hiện tại |
| `git merge --abort` | Hủy merge đang thực hiện |
| `git merge --squash` | Gộp tất cả commits thành 1 |
| `git merge --no-commit` | Merge nhưng chưa commit (review trước) |

---

## ➡️ Chuyện tiếp theo...

*Minh merge thành công. Nhưng khi Tùng merge dashboard, lóe lên dòng chữ đáng sợ:*

```
CONFLICT (content): Merge conflict in src/app.js
Automatic merge failed; fix conflicts and then commit the result.
```

*Tùng nhìn Minh. Minh nhìn Linh. Cả ba nhìn nhau.*

*"Bình tĩnh," Minh nói. "Conflict không phải kẻ thù. Nó là Git đang hỏi ý kiến chúng ta."*

**→ [Bài 9: Xử lý Conflicts](./03-conflict-resolution.md) — Cuộc Chiến Merge: Khi Git không thể tự quyết định, và bạn phải làm trọng tài.**

---

## 🔗 Tài liệu tham khảo
- [Git Branching and Merging](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)
- [Git Merge Documentation](https://git-scm.com/docs/git-merge)
