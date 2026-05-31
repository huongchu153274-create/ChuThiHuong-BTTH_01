# Bài 7: Branch và Checkout

## 🎬 "Ba Người, Một File — Ai Thắng?"

*Nhóm BTL chia việc: Minh làm Login, Linh làm Register, bạn Tùng làm Dashboard.*

*Nhưng cả 3 đều cần sửa file `app.js` — file chính của ứng dụng.*

*Nếu không có branch:*

```
Minh sửa app.js → Save → Push
Linh sửa app.js → Save → Push → ❌ CONFLICT! 
Tùng sửa app.js → Save → Push → ❌ CONFLICT NGHIÊM TRỌNG!
```

*Anh Hùng hỏi: "Mấy đứa biết branch chưa?"*

*"Chưa ạ..."*

*"OK. Branch giống vũ trụ song song trong phim Marvel. Mỗi người một vũ trụ riêng — làm gì trong đó không ảnh hưởng ai. Xong hết mới gộp lại."*

```
main ─────────●─────────●───────●─── (code ổn định)
               \         \       \
feature/login   ●──●──●   \       \     Minh làm ở đây
                           \       \
feature/register            ●──●    \   Linh làm ở đây
                                     \
feature/dashboard                     ●──●  Tùng làm ở đây
```

*"Cứ code thoải mái. Xong rồi merge lại. Git xử lý."*

---

## 🎯 Mục tiêu
Sau bài này, bạn sẽ:
- Hiểu Branch là gì và tại sao đó là công cụ quan trọng nhất cho teamwork
- Tạo, chuyển đổi, xóa branch
- Hiểu HEAD — "con trỏ GPS" của Git
- Quản lý branch trên local và remote

---

## 🌿 Branch là gì? — "Con đường rẽ nhánh"

**Branch** là một pointer nhẹ trỏ đến commit. Tạo branch mới = tạo "con đường rẽ" để bạn thử nghiệm mà không ảnh hưởng đường chính.

### HEAD — "Bạn đang đứng ở đâu?"

**HEAD** là pointer trỏ đến branch hiện tại. Giống pin GPS: *"Bạn đang ở đây."*

```
HEAD → main → Commit C

Khi checkout feature:
HEAD → feature → Commit C (cùng vị trí, nhưng đường đi khác)
```

---

## 📊 Các lệnh Branch

### Xem branch:

```bash
git branch        # Branches local (* = branch hiện tại)
git branch -r     # Branches remote
git branch -a     # Tất cả
git branch -v     # Kèm thông tin commit mới nhất
git branch -vv    # Kèm tracking status (ahead/behind)
```

### Tạo branch:

```bash
# Tạo branch mới (vẫn ở branch cũ)
git branch feature/login

# ⭐ Tạo VÀ chuyển sang branch mới (dùng nhiều nhất)
git checkout -b feature/login
# hoặc (cách mới)
git switch -c feature/login

# Tạo từ commit cụ thể
git branch hotfix/urgent abc1234

# Tạo và track remote branch
git checkout -b feature/login origin/feature/login
```

> *Minh dùng `git checkout -b feature/login` — lập tức "nhảy" sang vũ trụ mới. Code thoải mái!*

### Chuyển đổi branch:

```bash
git checkout feature/login   # Nhảy sang branch khác
git switch feature/login     # Cách mới, rõ ràng hơn
git checkout -               # ⭐ Nhảy về branch trước đó (như Alt+Tab)
```

⚠️ **Quan trọng:** Phải commit hoặc stash thay đổi trước khi checkout! Git sẽ cảnh báo nếu có file chưa commit.

### Xóa branch:

```bash
git branch -d feature/login       # Xóa an toàn (chỉ khi đã merge)
git branch -D feature/login       # ⚠️ Force xóa (kể cả chưa merge)

# Xóa branch trên remote
git push origin --delete feature/login

# Dọn dẹp: Xóa branch local đã bị xóa trên remote
git fetch --prune
```

### Đổi tên branch:

```bash
git branch -m old-name new-name    # Đổi tên branch khác
git branch -m new-name             # Đổi tên branch hiện tại
```

---

## 📝 Thực hành: Nhóm BTL chia branch

### Kịch bản: Minh setup branch cho cả nhóm

```bash
# === MINH (Trưởng nhóm) ===

# 1. Đảm bảo main cập nhật
git checkout main
git pull

# 2. Tạo branch cho mình
git checkout -b feature/login
# Làm việc, commit...
git push -u origin feature/login

# === LINH ===

# 1. Pull code mới nhất
git checkout main
git pull

# 2. Tạo branch riêng
git checkout -b feature/register
# Làm việc, commit...
git push -u origin feature/register

# === TÙNG ===

# 1. Pull code mới nhất
git checkout main
git pull

# 2. Tạo branch riêng
git checkout -b feature/dashboard
# Làm việc, commit...
git push -u origin feature/dashboard
```

```
Kết quả trên GitHub:
main ─────── (code ổn định, production)
├── feature/login (Minh đang code)
├── feature/register (Linh đang code)
└── feature/dashboard (Tùng đang code)

→ Ba người code song song. Không ai ảnh hưởng ai! ✅
```

---

## 💡 Best Practices — Naming Convention

### ❌ Tệ:
```
branch1, test, fix, new-feature, my-branch
```

### ✅ Tốt (chuẩn công ty):
```
feature/user-authentication      ← Tính năng mới
bugfix/login-validation-error    ← Sửa bug
hotfix/critical-security-patch   ← Sửa khẩn cấp
refactor/user-service            ← Tái cấu trúc
docs/api-documentation           ← Cập nhật tài liệu
chore/update-dependencies        ← Bảo trì
```

> **Chị Hà:** *"Đặt tên branch như đặt tên file — đọc tên phải biết ngay bên trong là gì. `branch1` phạt cà phê cho cả team."*

---

## ⚠️ Lưu ý quan trọng

1. **Branch ≠ Copy:** Tất cả branches dùng chung database. Branch chỉ là pointer → cực kỳ nhẹ
2. **Xóa branch ≠ Xóa commit:** Commit vẫn tồn tại, có thể recover từ reflog
3. **Branch ngắn = Ít conflict:** Branch tồn tại 1-3 ngày > branch tồn tại 3 tuần
4. **Luôn pull main** trước khi tạo branch mới

---

## 🔍 Troubleshooting

### `You have local changes` khi checkout
→ `git stash` (cất tạm) hoặc `git commit` trước

### `A branch named 'xxx' already exists`
→ Đổi tên hoặc xóa branch cũ trước

### `The branch 'xxx' is not fully merged`
→ Branch chưa merge. Dùng `-D` để force delete (cẩn thận!)

---

## 📝 Tóm tắt

| Lệnh | Ẩn dụ |
|---|---|
| `git branch` | Xem danh sách vũ trụ song song |
| `git checkout -b <name>` | Tạo vũ trụ mới và nhảy vào |
| `git checkout <name>` | Nhảy sang vũ trụ khác |
| `git checkout -` | Alt+Tab: Quay lại vũ trụ trước |
| `git branch -d <name>` | Đóng vũ trụ (đã merge) |
| `git push -u origin <name>` | Đăng ký vũ trụ lên cloud |

---

## ➡️ Chuyện tiếp theo...

Minh, Linh, Tùng — mỗi người một branch, code thoải mái. Nhưng đến lúc phải gộp lại thành một ứng dụng hoàn chỉnh...

*"Ba vũ trụ cần va chạm lại thành một. Git gọi đó là **Merge**. Và đôi khi, sự va chạm đó... không êm ả lắm."*

**→ [Bài 8: Merge Branches](./02-merge.md) — Khi hai vũ trụ hợp nhất: Fast-forward, Three-way, và lần đầu tiên Minh thấy dòng chữ `CONFLICT`.**

---

## 🔗 Tài liệu tham khảo
- [Git Branching](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)
- [Git Checkout](https://git-scm.com/docs/git-checkout)
- [Git Switch](https://git-scm.com/docs/git-switch)
