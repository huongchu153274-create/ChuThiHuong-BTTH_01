# Best Practices & Tips — Bài Học Xương Máu

## 🎬 "Điều Mình Ước Ai Đó Nói Từ Đầu" — Lời khuyên từ Anh Hùng

*Ngày cuối thực tập, Minh hỏi: "Anh ơi, nếu quay lại ngày đầu, anh sẽ dặn em điều gì?"*

*Anh Hùng nghĩ một lúc: "Mỗi rule dưới đây đều là bài học từ MỘT LẦN SAI. Commit message tệ → mất 3 tiếng tìm bug. PR quá lớn → reviewer bỏ sót lỗ hổng bảo mật. Force push main → team mất 1 ngày. Đây là những bài học XƯƠNG MÁU."*

---

## 📝 Commit Messages

### Commit Message Tốt

✅ **Tốt:**
```
Fix: Validation error in login form

- Check email format before submission
- Show error message when validation fails
- Update tests

Closes #123
```

✅ **Tốt:**
```
Feat: Add user authentication with JWT

- Create login API endpoint
- Add JWT token generation
- Implement refresh token mechanism
- Add authentication middleware

Related to #456
```

### Commit Message Không Tốt

❌ **Tệ:**
```
fix
update
changes
```

❌ **Tệ:**
```
fixed bug
updated code
```

### Convention

**Format:**
```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat`: Tính năng mới
- `fix`: Sửa bug
- `docs`: Tài liệu
- `style`: Formatting
- `refactor`: Refactor code
- `test`: Tests
- `chore`: Công việc bảo trì

**Ví dụ:**
```
feat: Add user login functionality

- Create login form component
- Add authentication service
- Implement JWT token storage

Closes #123
```

---

## 🌿 Branch Naming

### Naming Convention Tốt

✅ **Tốt:**
```
feature/user-authentication
bugfix/login-validation-error
hotfix/critical-security-patch
refactor/user-service
docs/api-documentation
test/login-component
chore/update-dependencies
```

### Prefix

- `feature/` - Tính năng mới
- `bugfix/` hoặc `fix/` - Sửa bug
- `hotfix/` - Sửa lỗi khẩn cấp
- `refactor/` - Refactor code
- `docs/` - Tài liệu
- `test/` - Tests
- `chore/` - Công việc bảo trì

### Branch Naming Không Tốt

❌ **Tệ:**
```
branch1
test
fix
new-feature
my-branch
```

---

## 📋 Pull Request Best Practices

### PR Size

- ✅ **Tốt**: 1 PR = 1 tính năng, < 400 dòng code
- ❌ **Tệ**: 1 PR với 50 files, 2000+ dòng code

### PR Description

✅ **Tốt:**
```markdown
## Mô tả
Thêm tính năng đăng nhập với JWT authentication.

## Loại thay đổi
- [x] New feature

## Thay đổi
- Thêm login API endpoint `/api/login`
- Implement JWT token generation
- Thêm authentication middleware
- Update documentation

## Testing
- [x] Unit tests pass
- [x] Integration tests pass
- [x] Tested trên Chrome, Firefox, Safari

## Screenshots
![Login Form](./screenshots/login.png)

## Related Issues
Closes #123
Related to #456
```

### PR Checklist

Trước khi tạo PR:
- [ ] Code đã được test
- [ ] Tests pass
- [ ] Linter pass
- [ ] Documentation đã cập nhật
- [ ] Description rõ ràng
- [ ] Không có conflict
- [ ] Branch đã sync với main

---

## 💬 Code Review Best Practices

### Cho Reviewer

✅ **Nên:**
- Review nhanh (trong 24h)
- Comment cụ thể, constructive
- Đề xuất cách sửa
- Praise code tốt
- Không nitpick

❌ **Không nên:**
- Để PR chờ quá lâu
- Comment chung chung
- Chỉ trích cá nhân
- Block vì style nhỏ nhặt

### Cho Author

✅ **Nên:**
- PR nhỏ, tập trung
- Description rõ ràng
- Test trước khi tạo PR
- Xử lý feedback tích cực
- Reply comments đầy đủ

❌ **Không nên:**
- PR quá lớn
- Bỏ qua feedback
- Defensive
- Ignore comments

---

## 🔄 Workflow Best Practices

### Daily Workflow

```bash
# 1. Cập nhật từ main
git checkout main
git pull origin main

# 2. Tạo branch mới
git checkout -b feature/new-feature

# 3. Làm việc, commit thường xuyên
git add .
git commit -m "feat: Add feature"

# 4. Push thường xuyên
git push -u origin feature/new-feature

# 5. Merge main vào feature thường xuyên (tránh conflict lớn)
git merge origin/main
# Resolve conflict nếu có...

# 6. Tạo PR khi xong
# 7. Merge sau khi approve
# 8. Xóa branch
git branch -d feature/new-feature
```

### Commit Frequency

- ✅ Commit thường xuyên (mỗi feature nhỏ)
- ✅ Commit message rõ ràng
- ✅ Commit nhỏ, dễ review
- ❌ Không commit 1 lần với 50 files

---

## 🔐 Security Best Practices

### 1. Không commit secrets

❌ **Tệ:**
```javascript
const API_KEY = "sk-1234567890abcdef";
const PASSWORD = "mypassword123";
```

✅ **Tốt:**
```javascript
const API_KEY = process.env.API_KEY;
const PASSWORD = process.env.PASSWORD;
```

### 2. Dùng .gitignore

```.gitignore
# Environment variables
.env
.env.local
.env.*.local

# Secrets
*.pem
*.key
secrets/

# API keys
config/keys.js
```

### 3. Rotate tokens

- Rotate Personal Access Tokens định kỳ
- Xóa token không dùng
- Sử dụng token với quyền tối thiểu

### 4. Review code trước khi merge

- Kiểm tra secrets trong PR
- Dùng tools để scan secrets
- Review kỹ trước khi merge

---

## 🚫 Những Điều Không Nên Làm

### 1. Không commit file lớn

❌ **Tệ:**
- Video files
- Hình ảnh chưa nén lớn
- File build output
- Database dumps

✅ **Tốt:**
- Dùng Git LFS cho file lớn
- Nén file trước khi commit
- Thêm vào .gitignore

### 2. Không force push lên main/master

❌ **Tệ:**
```bash
git push --force origin main  # ⚠️ Nguy hiểm!
```

✅ **Tốt:**
- Chỉ dùng force push trên branch cá nhân
- Dùng `--force-with-lease` nếu cần
- Không force push trên main/master

### 3. Không commit không test

✅ **Luôn test trước khi commit:**
```bash
# Test
npm test
# hoặc
python -m pytest

# Nếu pass, commit
git add .
git commit -m "feat: Add feature"
```

### 4. Không bỏ qua conflict

✅ **Luôn resolve conflict:**
```bash
# Resolve conflict
# ...

# Add và commit
git add .
git commit -m "Merge and resolve conflicts"
```

### 5. Không làm việc trực tiếp trên main

✅ **Luôn tạo branch:**
```bash
# ❌ Tệ: Commit trực tiếp trên main
git checkout main
git commit -m "Add feature"

# ✅ Tốt: Tạo branch riêng
git checkout -b feature/new-feature
git commit -m "Add feature"
```

---

## 💡 Tips và Tricks

### 1. Dùng alias để tiết kiệm thời gian

```bash
# Thêm vào .gitconfig
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
```

### 2. Xem log đẹp hơn

```bash
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

Sau đó chỉ cần:
```bash
git lg
```

### 3. Stash thường xuyên

```bash
# Stash khi cần switch branch nhanh
git stash
git checkout other-branch
# Làm việc...
git checkout original-branch
git stash pop
```

### 4. Review trước khi push

```bash
# Xem commit sắp push
git log origin/main..HEAD

# Xem diff
git diff origin/main..HEAD

# Review xong mới push
git push
```

### 5. Dùng hooks để tự động hóa

Tạo `.git/hooks/pre-commit`:
```bash
#!/bin/sh
# Run linter trước khi commit
npm run lint
```

---

## 🎯 Organization Best Practices

### 1. Repository Structure

✅ **Tốt:**
```
organization/
├── frontend/
├── backend/
├── mobile/
└── docs/
```

### 2. Team Structure

✅ **Tốt:**
- Mỗi team có repo riêng
- Dùng teams để quản lý permissions
- Review code trước khi merge

### 3. Branch Protection

✅ **Nên enable:**
- Require pull request reviews
- Require status checks
- Require branch to be up to date
- Include administrators

### 4. Naming Conventions

✅ **Nên nhất quán:**
- Repository: `project-name`, `service-name`
- Branch: `feature/`, `bugfix/`, `hotfix/`
- Tag: `v1.0.0`, `v1.0.1`

---

## 📊 Metrics và Monitoring

### 1. Track Commit Frequency

- Monitor commit frequency của team
- Identify inactive repositories
- Track contribution

### 2. Review Time

- Track PR review time
- Set SLA (ví dụ: review trong 24h)
- Identify bottlenecks

### 3. Code Quality

- Use tools để scan code
- Track code coverage
- Monitor security issues

---

## 📝 Tóm Tắt

### Commit
- ✅ Message rõ ràng, theo convention
- ✅ Commit thường xuyên, nhỏ
- ✅ Test trước khi commit

### Branch
- ✅ Naming convention nhất quán
- ✅ Branch ngắn gọn, merge thường xuyên
- ✅ Không làm việc trực tiếp trên main

### PR
- ✅ Nhỏ, tập trung
- ✅ Description rõ ràng
- ✅ Review checklist đầy đủ

### Security
- ✅ Không commit secrets
- ✅ Dùng .gitignore
- ✅ Review code kỹ

### Workflow
- ✅ Sync với main thường xuyên
- ✅ Resolve conflict sớm
- ✅ Test và review trước khi merge

---

**Lưu ý**: Best practices có thể khác nhau giữa các team. Thảo luận với team để nhất quán!
