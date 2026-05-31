# Bài 12: Fork và Contribute

## 🎬 "Lần Đầu Contribute Open Source" — Minh sửa bug cho React

*Minh đang dùng React cho BTL. Phát hiện một lỗi nhỏ trong docs. Anh muốn sửa.*

> **Minh:** *"Em muốn sửa bug docs của React, nhưng em push vào repo facebook/react sao được?"*
>
> **Anh Hùng:** *"Em không push trực tiếp. Em FORK — copy repo React về tài khoản em. Sửa trên bản copy. Rồi tạo PR gửi lại cho Facebook. Nếu họ approve → tên em xuất hiện trong contributor list của React!"*
>
> **Minh:** *"Wow, tên mình trên repo React? Cool!"* 🤩

---

## 🎯 Mục tiêu
Sau bài này, bạn sẽ:
- Hiểu Fork khác Clone ở chỗ nào
- Fork, clone, và cấu hình upstream
- Contribute vào open source projects
- Sync fork với upstream

---

## 🍴 Fork vs Clone — Một cái trên cloud, một cái trên máy

| | **Fork** | **Clone** |
|---|---|---|
| Ở đâu | Trên GitHub (tài khoản bạn) | Trên máy tính bạn |
| Mục đích | Contribute, tạo bản riêng | Làm việc local |
| Quyền push | ✅ Bạn sở hữu fork | ❌ Phụ thuộc quyền repo gốc |
| Khi nào | Muốn contribute cho repo người khác | Tải repo về làm việc |

---

## 🚀 Workflow Open Source — 8 bước hoàn chỉnh

### Bước 1: Fork trên GitHub
Click nút **Fork** góc trên phải repo → Fork xuất hiện trong tài khoản bạn

### Bước 2: Clone fork về máy
```bash
git clone https://github.com/minh-nguyen/react.git
cd react
```

### Bước 3: Thêm upstream (repo gốc)
```bash
git remote add upstream https://github.com/facebook/react.git
git remote -v
# origin    → fork CỦA BẠN (push vào đây)
# upstream  → repo GỐC (sync từ đây)
```

### Bước 4: Sync với upstream
```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main            # Cập nhật fork
```

### Bước 5: Tạo branch mới
```bash
git checkout -b fix/docs-typo
```

### Bước 6: Sửa code, commit
```bash
git add docs/getting-started.md
git commit -m "docs: Fix typo in Getting Started guide"
```

### Bước 7: Push lên fork
```bash
git push -u origin fix/docs-typo
```

### Bước 8: Tạo PR từ fork → repo gốc
GitHub hiện banner **"Compare & pull request"** → Click → Điền description → Create PR

> *Minh submit PR cho React docs. 2 ngày sau, maintainer approve. Tên Minh xuất hiện trong contributor list. Anh screenshot gửi LinkedIn ngay.* 🎉

---

## 🔄 Sync Fork — Giữ fork cập nhật

```bash
# Mỗi lần trước khi tạo branch mới:
git checkout main
git pull upstream main        # Lấy code mới từ repo gốc
git push origin main          # Cập nhật fork
git checkout -b feature/new   # Tạo branch từ code mới nhất
```

Hoặc nhanh hơn trên GitHub: Click **Sync fork** → **Update branch**

---

## 💡 Best Practices cho Open Source

1. **Đọc CONTRIBUTING.md** trước khi contribute — mỗi project có rules riêng
2. **Start small** — Fix typo, update docs trước khi fix bug lớn
3. **Một PR một feature** — Không gộp nhiều thay đổi
4. **Follow code style** — Chạy linter, formatter của project
5. **Kiên nhẫn** — Maintainer có thể mất tuần để review

> **Anh Hùng:** *"GitHub contribution graph xanh = nhà tuyển dụng ấn tượng. Mỗi tuần contribute 1 open source PR — 6 tháng portfolio sáng lên đáng kể."*

---

## 📝 Tóm tắt

| Lệnh | Ý nghĩa |
|---|---|
| Fork (GitHub UI) | Copy repo sang account bạn |
| `git remote add upstream <url>` | Kết nối với repo gốc |
| `git pull upstream main` | Sync code mới nhất từ repo gốc |
| `git push origin <branch>` | Push lên fork → Tạo PR |

---

## ➡️ Chuyện tiếp theo...

*Minh đã biết contribute. Nhưng khi nhóm BTL mở rộng lên 6 người, quản lý trở nên hỗn loạn: ai push vào main thoải mái, ai merge không review, ai xóa branch của người khác...*

*"Đó là lúc em cần Organization và Branch Protection," chị Hà nói. "Quản lý team không phải về code — mà về quy trình."*

**→ [Phần 3: Quản lý Team](./../03-quan-ly-team/01-organization.md) — Khi dự án lớn hơn, quy trình quan trọng hơn code.**

---

## 🔗 Tài liệu tham khảo
- [GitHub - Forking Projects](https://docs.github.com/en/get-started/quickstart/fork-a-repo)
- [Contributing to Open Source](https://opensource.guide/how-to-contribute/)
