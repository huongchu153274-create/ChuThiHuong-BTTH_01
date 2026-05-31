# Bài 11: Code Review

## 🎬 "Sai Một Dòng, Mất Nửa Tỷ" — Khi Code Review Cứu Cả Dự Án

*Minh submit PR. Anh Hùng review, phát hiện:*

```javascript
// Code Minh viết:
if (user.role = "admin") {   // ← Bug! Dùng = thay vì ===
  showAdminPanel();
}
```

> **Anh Hùng:** *"Em dùng `=` (gán) thay vì `===` (so sánh). Dòng này sẽ biến TẤT CẢ users thành admin. Nếu lên production — mọi khách hàng đều thấy admin panel, xóa được database."*

*Minh rùng mình. Một ký tự. Có thể phá hủy cả dự án.*

> *"Code review không phải để chỉ trích. Nó là lưới an toàn cuối cùng trước khi code bay vào tay hàng triệu người dùng."* — Chị Hà

**Sau chương này, bạn sẽ biết cách review code — và cách nhận review — như một professional.** 🔍

---

## 🎯 Mục tiêu
Sau bài này, bạn sẽ:
- Hiểu Code Review là gì và tại sao nó cứu dự án
- Review code theo checklist chuyên nghiệp
- Viết comment constructive (xây dựng, không phá hủy)
- Nhận feedback mà không defensive

---

## 👀 Code Review là gì?

**Code Review** = Quá trình kiểm tra code của người khác trước khi merge. Là bài kiểm tra cuối cùng.

### Lợi ích (Không chỉ tìm bug):

| Lợi ích | Ví dụ |
|---|---|
| 🐛 **Tìm bug sớm** | `=` vs `===`, null pointer, race condition |
| 📚 **Chia sẻ kiến thức** | "À, có API mới cho việc này!" |
| 🎨 **Đồng nhất style** | Team viết code cùng một phong cách |
| 🛡️ **Bảo mật** | Phát hiện SQL injection, XSS trước khi deploy |
| 🧠 **Cải thiện kỹ năng** | Cả reviewer lẫn author đều học |

---

## ✍️ Cách Review Code — Checklist 6 điểm

### 1. ✅ Functionality — Code có làm đúng không?
- Logic đúng chưa? Có edge case nào bỏ sót?
- Error handling đầy đủ? Null check?

### 2. ✅ Code Quality — Code có dễ đọc không?
- Biến đặt tên có nghĩa? Function ngắn gọn?
- Có code trùng lặp (DRY)?

### 3. ✅ Style & Convention — Có theo chuẩn team không?
- Naming convention, formatting, indentation
- Conventional commits message

### 4. ✅ Security — Có lỗ hổng bảo mật?
- Input validation, authentication check
- Secrets không bị expose?

### 5. ✅ Testing — Có tests không?
- Unit tests, edge cases covered?

### 6. ✅ Documentation — Có cập nhật docs?
- README, API docs, code comments cho logic phức tạp

---

## 💬 Viết Comment — Nghệ thuật nhận xét mà không gây thù

### ❌ Comment TỆ:

```
"Sai."
"Code này xấu."
"Tôi không thích cách này."
```

*→ Author đọc xong muốn uninstall VS Code.*

### ✅ Comment TỐT:

```
🐛 Bug: Dòng này dùng `=` (gán) thay vì `===` (so sánh). 
Sẽ biến tất cả users thành admin. Đổi thành:
  if (user.role === "admin")
```

```
💡 Suggestion: Có thể dùng `Array.map()` thay vì `for loop` ở đây — 
ngắn gọn hơn và functional style. Ví dụ:
  const names = users.map(u => u.name);
```

```
✅ Nice! Error handling ở đây rất tốt. Clear và dễ maintain.
```

```
❓ Question: Tại sao dùng setTimeout ở đây? 
Có cách async/await nào tốt hơn không?
```

### Quy tắc viết comment:

| Prefix | Khi nào | Ý nghĩa |
|---|---|---|
| 🐛 **Bug/Blocking** | Bug nghiêm trọng, security | PHẢI sửa trước merge |
| 💡 **Suggestion** | Cải thiện nhưng không bắt buộc | Nên cân nhắc |
| ❓ **Question** | Cần hiểu thêm | Hỏi, không phán xét |
| ✅ **Praise** | Code tốt | Khen — rất quan trọng! |

---

## 👤 Nhận Review — Cách respond chuyên nghiệp

### ✅ Nên:

| Nhận comment | Respond |
|---|---|
| Bug reports | *"Good catch! Fixed in abc1234."* |
| Suggestions | *"Great idea, changed to map(). Thanks!"* |
| Không đồng ý | *"I see your point, but I chose X because Y. What do you think?"* |

### ❌ Không nên:
- Ignore comments (bỏ qua)
- Argue because of pride (cãi vì tự ái)
- Sửa code mà không hiểu tại sao

> **Anh Hùng:** *"Review là cơ hội học, không phải cuộc thi. Author tốt nhất là người sẵn sàng nói: 'Bạn đúng, tôi sửa.'"*

---

## 🏢 WAR STORY: Code Review tại Google

> Google có quy tắc: **EVERY change must be reviewed.** Kể cả 1 dòng. Kể cả CEO viết.
>
> Mỗi CL (Changelist = PR) cần ít nhất 1 LGTM (Looks Good To Me) từ code owner.
>
> Kết quả: Google's codebase phục vụ billions users — ít bug hơn bạn tưởng.

---

## 💡 Best Practices

### Cho Reviewer:
1. **Review trong 24h** — PR chờ lâu = team chậm
2. **Comment constructive** — Luôn đề xuất cách sửa, không chỉ nói "sai"
3. **Khen code tốt** — Praise là phần quan trọng nhất của review
4. **Không nitpick** — Đừng block PR vì thiếu 1 dấu chấm phẩy

### Cho Author:
1. **Self-review trước** — Đọc lại diff trước khi request review
2. **PR nhỏ** — < 400 dòng = review nhanh, feedback tốt
3. **Xử lý feedback tích cực** — Sửa nhanh, reply đầy đủ
4. **Không defensive** — Code review ≠ personal attack

---

## 📝 Tóm tắt

| Bạn là | Nhớ |
|---|---|
| **Reviewer** | Checklist 6 điểm, comment constructive, khen code tốt, review < 24h |
| **Author** | Self-review trước, PR nhỏ, respond tích cực, không defensive |

---

## ➡️ Chuyện tiếp theo...

*Minh đã biết tạo PR, review code. Nhưng khi muốn contribute vào project React trên GitHub, anh nhận ra: mình không có quyền push vào repo React!*

*"Đó là lúc em cần Fork," anh Hùng giải thích. "Fork = copy repo về tài khoản em. Sửa thoải mái. Xong rồi gửi PR lại cho repo gốc."*

**→ [Bài 12: Fork và Contribute](./06-fork-contribute.md) — Cánh cửa bước vào thế giới Open Source.**

---

## 🔗 Tài liệu tham khảo
- [Google - Code Review Guidelines](https://google.github.io/eng-practices/review/)
- [GitHub - Reviewing Changes](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests)
