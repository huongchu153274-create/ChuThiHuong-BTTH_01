# Kịch Bản 1: Feature Development — Từ Jira đến Production

## 🎬 "Ngày Đầu Đi Làm Thật" — Minh nhận task đầu tiên

*Thực tập ngày 1 tại FPT Software. Minh mở Jira, thấy task:*

```
📋 TASK-123: Thêm tính năng đăng nhập với email/password
Priority: High | Sprint: Sprint 5 | Assignee: Minh
```

*"Bắt đầu code thôi!" Minh định mở VS Code.*

*Anh Hùng chặn: "Khoan. Có QUY TRÌNH. Em theo 10 bước này — giống nhau ở mọi công ty."*

---

## 🚀 10 Bước — Workflow Hoàn Chỉnh

### Bước 1: 📋 Đọc task, hỏi nếu chưa rõ

```
TASK-123: Thêm login
→ Login bằng gì? Email + password
→ Có social login không? Chưa, sprint sau
→ Redirect đi đâu sau login? Dashboard
→ Backend API sẵn sàng chưa? POST /api/auth/login ✅
```

> **Anh Hùng:** *"Hỏi 5 phút ở đầu, tiết kiệm 5 tiếng tự suy đoán."*

### Bước 2: 🔄 Cập nhật main

```bash
git checkout main
git pull origin main
```

### Bước 3: 🌿 Tạo feature branch

```bash
git checkout -b feature/TASK-123-user-login
#                 ↑         ↑         ↑
#              type     Jira ID   mô tả
```

### Bước 4: 💻 Code + Commit thường xuyên

```bash
# Commit 1: Tạo component structure
git add src/components/LoginForm.jsx
git commit -m "feat(auth): Add LoginForm component structure

- Create LoginForm with email/password inputs
- Add basic form layout

Refs: TASK-123"

# Commit 2: Implement logic
git add src/services/authService.js
git commit -m "feat(auth): Add authentication service

- Create login API call
- Add error handling
- Add token storage

Refs: TASK-123"

# Commit 3: Tests
git add src/__tests__/LoginForm.test.jsx
git commit -m "test(auth): Add LoginForm unit tests

- Test form rendering
- Test validation rules
- Test submit handler

Refs: TASK-123"
```

### Bước 5: 🔄 Sync với main (MỖI NGÀY!)

```bash
git fetch origin
git merge origin/main
# Resolve conflicts nếu có
git push
```

### Bước 6: 📤 Push branch lên remote

```bash
git push -u origin feature/TASK-123-user-login
```

### Bước 7: 📝 Tạo Pull Request

```markdown
## feat(auth): Add user login with email/password

### 📋 Jira: TASK-123

### Mô tả
Thêm tính năng đăng nhập cho Todo App.

### Thay đổi
- LoginForm component (email + password)
- AuthService với API integration
- Form validation (email format, password min 8 chars)
- Error handling (wrong password, account locked)
- Unit tests (8 test cases)

### Testing
- [x] Unit tests pass (8/8)
- [x] Manual test: Chrome, Firefox, Safari
- [x] Responsive: Mobile, Tablet, Desktop

### Screenshots
[Ảnh login form desktop + mobile]

Closes TASK-123
```

### Bước 8: 👀 Address review comments

```bash
# Reviewer comment: "Nên dùng try/catch thay vì .catch()"
# Sửa code...
git add .
git commit -m "fix(auth): Address PR review - use try/catch

Refs: TASK-123"
git push
```

### Bước 9: ✅ Merge sau khi approve + CI pass

```bash
# GitHub: Squash and merge ← Gọn gàng nhất
# Hoặc CLI:
gh pr merge --squash
```

### Bước 10: 🧹 Cleanup

```bash
git checkout main
git pull origin main
git branch -d feature/TASK-123-user-login
git push origin --delete feature/TASK-123-user-login
```

*Minh update Jira: TASK-123 → Done ✅*

---

## ✅ Checklist tự kiểm tra

### Trước khi tạo PR:
- [ ] Code chạy đúng trên local
- [ ] Tests pass
- [ ] Linter pass
- [ ] Không có `console.log` debug
- [ ] Không có commented-out code
- [ ] PR description đầy đủ
- [ ] Branch sync với main

### Trước khi merge:
- [ ] Review approved (≥1)
- [ ] CI/CD pass
- [ ] Không conflict
- [ ] Comments đã resolve

---

## 💡 Mẹo của Anh Hùng

> 1. *"Commit NHƯNG CHƯA PUSH thường xuyên. Mất laptop = mất code. Push cuối mỗi ngày."*
> 2. *"Branch sống TỐI ĐA 3 ngày. Branch sống 3 tuần = conflict nightmare."*
> 3. *"PR nhỏ < 400 dòng. PR 2000 dòng = reviewer đọc qua loa, bug lọt qua."*
> 4. *"Commit message là nhật ký. 6 tháng sau bạn quay lại đọc — phải hiểu mình đã làm gì."*

---

## ➡️ Chuyện tiếp theo...

*Minh code feature thành công. Nhưng đang PR thì Slack báo:*

> *"🚨 URGENT: Production login đang crash! @all fix gấp!"*

*"Hotfix time," anh Hùng nói bình tĩnh. "Quy trình khác — nhanh hơn, nhưng vẫn có review."*

**→ [Kịch bản 2: Hotfix Production](./02-hotfix-production.md) — Khi production cháy nhà: Fix bug khẩn cấp đúng quy trình.**

---

## 🔗 Tài liệu tham khảo
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
