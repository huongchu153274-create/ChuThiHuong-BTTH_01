# Bài 5: Xem lịch sử và Log

## 🎬 "Ai Sửa File Config Này?!" — 11 giờ đêm, trước ngày demo

*Thứ Năm, 23:00. Demo BTL cho thầy vào sáng mai.*

*Minh chạy thử todo-app: lỗi. Trang login crash. Hôm qua vẫn chạy tốt.*

*"Linh ơi, em sửa gì mà login hỏng?"*

*"Em không sửa gì hết!"*

*Minh nhớ lại lời anh Hùng: "Đừng đoán. Hãy hỏi Git. Git nhớ mọi thứ."*

```bash
git log --oneline -5
# a1b2c3d (HEAD) Fix CSS button
# e4f5g6h Update login form       ← 🤔 Commit này?
# i7j8k9l Add about page
# m1n2o3p Add todo list
# q1r2s3t Initial commit
```

*"Commit `e4f5g6h` — ai update login form nhỉ?"*

```bash
git show e4f5g6h
# Author: Trần Thị Linh <linh.tran@gmail.com>
# Date: Thu Jan 15 20:30:00 2026
# 
# Update login form
# 
# - Changed form action URL
# - Modified validation logic      ← ĐÂY RỒI! 🎯
```

*"Linh ơi, em sửa validation logic trong commit e4f5g6h lúc 8:30 tối. Xem lại đi!"*

*Linh kiểm tra: đúng thật! Sửa sai một dòng regex. Fix trong 2 phút.*

**Git log = Camera an ninh cho code. Mọi thay đổi đều được ghi lại.** 🔍

---

## 🎯 Mục tiêu
Sau bài này, bạn sẽ:
- Xem lịch sử commit với `git log` (nhiều định dạng)
- Xem thay đổi trong commit cụ thể
- So sánh các commit
- Tìm commit theo tác giả, thời gian, nội dung

---

## 📜 Git Log — "Cuốn nhật ký tự động"

### Log cơ bản:

```bash
git log          # Xem toàn bộ lịch sử (nhấn q để thoát)
```

### Log ngắn gọn (hay dùng nhất ⭐):

```bash
git log --oneline
# a1b2c3d Thêm tính năng đăng nhập
# e4f5g6h Sửa bug validation
# i7j8k9l Thêm API endpoint mới
```

### Log giới hạn số lượng:

```bash
git log -5              # 5 commit gần nhất
git log --oneline -10   # 10 commit, dạng ngắn
```

### Log với sơ đồ cây (visual nhất ⭐):

```bash
git log --graph --oneline --all
```

```
* a1b2c3d (HEAD -> main) Merge feature/login
|\
| * i7j8k9l (feature/login) Add login validation
| * k2l3m4n Create login form
|/
* e4f5g6h Update README
* m1n2o3p Initial commit
```

> *Minh thấy sơ đồ cây lần đầu: "Ồ, đẹp giống bản đồ metro! Thấy rõ ai làm gì ở branch nào."*

### Log với thống kê file thay đổi:

```bash
git log --stat -3
# Hiển thị: file nào thay đổi, thêm/bớt bao nhiêu dòng
```

### Log đẹp nhất — tạo alias một lần, dùng mãi:

```bash
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --all"

# Từ giờ chỉ cần:
git lg
# → Sơ đồ cây có màu, có tên người, có thời gian. Đẹp! 🎨
```

---

## 🔍 Xem commit cụ thể — "Zoom vào ảnh"

### Xem chi tiết một commit:

```bash
git show a1b2c3d
# → Author, Date, Message, VÀ toàn bộ diff (thay đổi code)
```

### Chỉ xem file nào thay đổi:

```bash
git show --stat a1b2c3d
```

### Xem nội dung file tại thời điểm commit:

```bash
git show a1b2c3d:src/main.js
# → Hiện file main.js như nó trông lúc commit đó (du hành thời gian!)
```

---

## 📊 So sánh commit — "Trước và Sau"

### So sánh 2 commit:

```bash
git diff a1b2c3d e4f5g6h
# Xem chính xác thay đổi gì giữa 2 thời điểm
```

### So sánh với commit trước:

```bash
git diff HEAD~1 HEAD      # Commit gần nhất thay đổi gì?
git diff HEAD~3 HEAD      # 3 commits gần nhất thay đổi gì?
```

### Chỉ xem tên file thay đổi:

```bash
git diff --name-only HEAD~3 HEAD
# src/main.js
# src/styles.css
# index.html
```

---

## 🔎 Tìm kiếm — "Thám tử điều tra code"

### Tìm theo commit message:

```bash
git log --grep="bug"       # Commit nào nhắc đến "bug"?
git log --grep="login"     # Commit nào liên quan "login"?
```

### Tìm theo tác giả:

```bash
git log --author="Linh"    # Linh commit những gì?
git log --author="Minh" --oneline --since="1 week ago"
# → Minh commit gì trong tuần này?
```

### Tìm theo khoảng thời gian:

```bash
git log --since="2026-01-01" --until="2026-01-31"  # Tháng 1
git log --since="2 weeks ago"                       # 2 tuần qua
git log --since="yesterday"                         # Từ hôm qua
```

### Tìm theo nội dung code (AI-level search):

```bash
git log -S "functionName"
# → Tìm commit nào THÊM hoặc XÓA dòng chứa "functionName"
# Cực kỳ hữu ích khi: "Ai xóa function validateEmail?!"
```

---

## 🎯 Kịch bản thực tế — Git Log cứu ngày

### Kịch bản 1: "Bug từ đâu ra?"

```bash
# 1. Xem 10 commit gần đây
git log --oneline -10

# 2. Tìm commit có chứa "bug" hoặc "fix"
git log --grep="bug\|fix" -i --oneline

# 3. Zoom vào commit nghi ngờ
git show e4f5g6h

# 4. Tìm ai sửa file đó gần đây
git log -p src/auth/login.js | less
```

### Kịch bản 2: "Review code của team member"

> *Chị Hà muốn xem tuần này Minh code những gì:*

```bash
git log --author="Minh" --since="1 week ago" --stat
# → Xem tất cả commit, file nào thay đổi, bao nhiêu dòng
```

### Kịch bản 3: "Chuẩn bị nộp BTL — xem đã làm gì"

```bash
git log --pretty=format:"- %s (%an, %ar)" --since="1 month ago"
# Output:
# - feat: Add login page (Minh, 2 days ago)
# - fix: Fix CSS button alignment (Linh, 3 days ago)
# - feat: Add todo CRUD (Minh, 1 week ago)
# → Copy/paste vào báo cáo BTL!
```

### Kịch bản 4: "Xem commit chưa push" (trước khi push, kiểm tra lại)

```bash
git log origin/main..HEAD --oneline
# → Chỉ hiện commits có trên máy bạn mà GitHub chưa có
```

---

## 💡 Mẹo Pro

### `HEAD~n` — Du hành ngược thời gian:

```
HEAD      = Commit hiện tại
HEAD~1    = Commit trước đó 1 bước
HEAD~2    = 2 bước trước
HEAD~10   = 10 bước trước
```

### `git reflog` — "Camera an ninh" của HEAD:

```bash
git reflog
# Ghi lại MỌI THỨ bạn làm — kể cả reset, checkout, rebase
# = Bảo hiểm cuối cùng khi mọi thứ sai
```

---

## ⚠️ Lưu ý quan trọng

1. **Log rất dài?** → Luôn dùng `-n` để giới hạn, hoặc `q` để thoát
2. **Hash commit**: 7 ký tự đầu là đủ (`a1b2c3d` thay vì `a1b2c3d4e5f6...`)
3. **Không thấy commit?** → Có thể ở branch khác. Thêm `--all`
4. **Git blame** — Xem ai viết từng dòng code:
   ```bash
   git blame src/main.js
   # Hiện: ai viết dòng nào, lúc nào, trong commit nào
   ```

---

## 📝 Tóm tắt

| Muốn xem gì | Lệnh |
|---|---|
| Lịch sử ngắn gọn | `git log --oneline` |
| Sơ đồ cây branches | `git log --graph --oneline --all` |
| Chi tiết 1 commit | `git show <hash>` |
| So sánh 2 commit | `git diff <hash1> <hash2>` |
| Tìm theo message | `git log --grep="keyword"` |
| Tìm theo tác giả | `git log --author="tên"` |
| Tìm theo thời gian | `git log --since="1 week ago"` |
| Ai viết dòng này? | `git blame <file>` |

---

## ➡️ Chuyện tiếp theo...

Minh biết xem lịch sử rồi. Nhưng một ngày, anh commit sai — đưa API key vào code rồi push lên GitHub public. 😱

*"Anh Hùng ơi, em lỡ commit API key lên GitHub rồi! Làm sao xóa được?!"*

*"Bình tĩnh. Git có nút 'hoàn tác'. Nhưng em cần hiểu: reset, revert, và restore — ba anh em họ nhưng tính cách khác nhau hoàn toàn."*

**→ [Bài 6: Undo và Revert](./06-undo-revert.md) — Khi bạn cần nút "Ctrl+Z" cho cả dự án. Và tại sao trong Git, không phải lúc nào cũng nên Ctrl+Z.**

---

## 🔗 Tài liệu tham khảo
- [Git Documentation - Viewing the History](https://git-scm.com/book/en/v2/Git-Basics-Viewing-the-Commit-History)
- [Git Log Documentation](https://git-scm.com/docs/git-log)
- [Pretty Git Log](https://stackoverflow.com/questions/1057564/pretty-git-branch-graphs)
