# Bài 10: Pull Request trên GitHub

## 🎬 "Xin Phép Trước Khi Nhập Cung" — PR Đầu Tiên Của Minh

*Minh code xong feature login. Hào hứng, anh định merge thẳng vào main.*

*Anh Hùng chặn kịp:*

> **Anh Hùng:** *"Khoan! Em không merge trực tiếp. Em tạo Pull Request."*
>
> **Minh:** *"Pull Request là gì ạ?"*
>
> **Anh Hùng:** *"Giống như em viết đơn xin phép: 'Thưa anh, em muốn đưa code này vào dự án. Anh review giúp em.' Không ai được tự ý bước vào main mà không xin phép."*
>
> **Minh:** *"Nhưng code em chạy tốt mà?"*
>
> **Anh Hùng:** *"Chạy tốt trên máy em. Nhưng có thể phá code người khác. Có thể có bug logic em không thấy. Có thể viết không theo convention. PR là bước kiểm tra cuối cùng trước khi code vào production."*

*Minh tạo PR đầu tiên. 30 phút sau, anh Hùng comment 5 điểm cần sửa. Minh ngạc nhiên — anh tưởng code đã hoàn hảo. Sau khi sửa, code thực sự tốt hơn gấp đôi.*

**PR không phải rào cản. PR là bộ lọc chất lượng.** 🔍

---

## 🎯 Mục tiêu
Sau bài này, bạn sẽ:
- Hiểu Pull Request là gì và tại sao quan trọng
- Tạo PR chuyên nghiệp trên GitHub
- Review và respond các comments
- Merge PR đúng cách

---

## 🔍 Pull Request là gì?

**Pull Request (PR)** = Lời đề nghị: *"Tôi muốn merge code từ branch A vào branch B. Xin hãy review."*

### Tại sao PR chứ không merge trực tiếp?

| | Merge trực tiếp | Pull Request |
|---|---|---|
| Review | ❌ Không ai xem | ✅ Team review |
| Discussion | ❌ Không | ✅ Comment từng dòng |
| CI/CD | ❌ Không auto-test | ✅ Tự động test |
| Lịch sử | ⚠️ Ít thông tin | ✅ Rõ ràng, có context |
| Khi nào | Branch cá nhân lúc dev | Khi merge vào main |

> **Chị Hà:** *"Tại Shopee, KHÔNG AI được merge trực tiếp vào main. Mọi thay đổi đều qua PR. Kể cả CTO."*

---

## ➕ Tạo Pull Request — Bước từng bước

### Bước 1: Push branch lên GitHub

```bash
git checkout feature/login
git push -u origin feature/login
```

### Bước 2: Tạo PR trên GitHub

1. Vào repository → GitHub hiện banner **"Compare & pull request"** → Click
2. Hoặc: Tab **Pull requests** → **New pull request** → Chọn branches

### Bước 3: Viết PR description (QUAN TRỌNG!)

> **Anh Hùng:** *"PR description tốt = review nhanh. PR description tệ = reviewer mất 1 tiếng đọc code mà không hiểu em muốn gì."*

**Template PR mẫu:**

```markdown
## 📋 Mô tả
Thêm tính năng đăng nhập với email/password cho Todo App.

## 🔄 Loại thay đổi
- [x] ✨ New feature
- [ ] 🐛 Bug fix
- [ ] 📝 Documentation

## 📝 Chi tiết thay đổi
- Tạo LoginForm component (src/components/LoginForm.jsx)
- Thêm validation: email format, password min 8 ký tự
- Kết nối API endpoint POST /api/auth/login
- Handle error states: wrong password, account locked
- Thêm loading spinner khi đang xử lý

## 🧪 Testing
- [x] Tested trên Chrome, Firefox, Safari
- [x] Responsive trên mobile
- [x] Edge case: empty fields, invalid email

## 📸 Screenshots
[Ảnh chụp form login]

## 🔗 Related Issues
Closes #42
```

### Bước 4: Request reviewers → Click **Create pull request**

---

## 👀 Review Pull Request — Cách review và respond

### Reviewer workflow:

1. Vào tab **Files changed** → Đọc code từng file
2. Hover dòng code → Click **+** → Viết comment
3. Submit review: **Approve** / **Request changes** / **Comment**

### Khi nhận được review comments:

```bash
# 1. Đọc tất cả comments
# 2. Sửa code theo feedback
git checkout feature/login
# ... sửa code ...
git add .
git commit -m "fix: Address PR review comments

- Rename validateForm to validateLoginForm
- Add null check for user object
- Improve error message clarity"
git push
# → PR tự động update! ✅
```

> *Minh sửa xong, reply từng comment: "Fixed!" hoặc "Good point, changed to X." Anh Hùng re-review → Approve. PR sẵn sàng merge.* ✅

---

## ✅ Merge Pull Request — Ba cách

| Cách | Khi nào | Kết quả |
|---|---|---|
| **Create merge commit** | Mặc định, rõ ràng | Giữ toàn bộ lịch sử |
| **Squash and merge** ⭐ | Feature branches | Gộp thành 1 commit sạch |
| **Rebase and merge** | Lịch sử thẳng | Không merge commit |

> **Chị Hà:** *"Shopee dùng Squash merge. Main chỉ có clean commits — mỗi commit = 1 feature."*

Sau merge → ✅ Xóa branch (GitHub hỏi tự động)

---

## 💡 Best Practices

1. **PR nhỏ, tập trung:** < 400 dòng, 1 feature. PR 2000 dòng = nightmare review
2. **Description rõ ràng:** Giải thích TẠI SAO, không chỉ LÀM GÌ
3. **Review nhanh:** < 24h. PR chờ lâu = developer frustration
4. **Self-review trước:** Đọc lại code trước khi request review
5. **Link issues:** `Closes #42` — auto-close issue khi merge

---

## ➡️ Chuyện tiếp theo...

*Minh tạo PR, được review, merge thành công. Nhưng khi anh Hùng comment: "Nên dùng `Array.map` thay vì `for loop`", Minh không hiểu tại sao.*

*"Cách em comment cũng quan trọng," chị Hà nói. "Comment 'Sai' — không ai hiểu. Comment 'Nên dùng X vì Y, ví dụ Z' — ai cũng học được."*

**→ [Bài 11: Code Review](./05-code-review.md) — Kỹ năng mà trường không dạy, nhưng công ty nào cũng cần.**

---

## 🔗 Tài liệu tham khảo
- [GitHub - About Pull Requests](https://docs.github.com/en/pull-requests)
- [GitHub - Creating a Pull Request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)
