# GitHub CLI — Command Line Interface

## 🎬 "Tạo PR Trong 3 Giây" — Khi Terminal Nhanh Hơn Browser

*Minh tạo PR trên GitHub: Mở Chrome → Đăng nhập → Vào repo → Compare & Pull Request → Điền title → Điền body → Chọn reviewer → Create. Mất 2 phút mỗi lần.*

*Anh Hùng gõ 1 lệnh:*

```bash
gh pr create --title "feat: Add login" --body "..." --reviewer team-lead
```

*3 giây. PR tạo xong. Không rời terminal.*

*"GitHub CLI = làm MỌI THỨ từ terminal. Tạo repo, PR, issues, review, merge. Nhanh gấp 10 lần browser."*

---

## 🎯 Mục tiêu
- Cài đặt và sử dụng GitHub CLI
- Quản lý repos, PRs, issues từ terminal
- Tích hợp vào workflow hàng ngày

## 💻 Cài đặt GitHub CLI

### macOS

```bash
# Dùng Homebrew
brew install gh

# Hoặc download từ
# https://cli.github.com/
```

### Windows

```bash
# Dùng winget
winget install GitHub.cli

# Hoặc download từ
# https://cli.github.com/
```

### Linux

```bash
# Ubuntu/Debian
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh

# Hoặc download từ
# https://cli.github.com/
```

## 🔐 Authentication

### Login

```bash
# Login GitHub
gh auth login
```

CLI sẽ hỏi:
1. **GitHub.com** hoặc **GitHub Enterprise**
2. **HTTPS** hoặc **SSH**
3. **Login with web browser** hoặc **Paste token**

### Login với Token

```bash
# Tạo token trên GitHub:
# Settings → Developer settings → Personal access tokens

# Login với token
echo "YOUR_TOKEN" | gh auth login --with-token
```

### Kiểm tra Login

```bash
# Xem auth status
gh auth status
```

### Logout

```bash
gh auth logout
```

## 📦 Repositories

### Clone Repository

```bash
# Clone repository
gh repo clone owner/repo

# Ví dụ
gh repo clone facebook/react

# Clone vào thư mục tên khác
gh repo clone owner/repo my-folder
```

### Tạo Repository

```bash
# Tạo repository mới
gh repo create my-new-repo

# Với options
gh repo create my-new-repo \
  --public \
  --description "My new repository" \
  --clone

# Private repo
gh repo create my-new-repo --private
```

### View Repository

```bash
# Xem thông tin repo
gh repo view owner/repo

# Xem repo hiện tại
gh repo view

# Xem README
gh repo view --web
```

### Fork Repository

```bash
# Fork repository
gh repo fork owner/repo

# Fork và clone
gh repo fork owner/repo --clone
```

## 🔀 Pull Requests

### Tạo Pull Request

```bash
# Tạo PR từ branch hiện tại
gh pr create

# Với title và body
gh pr create --title "Add new feature" --body "Description here"

# Tạo PR và mở trên browser
gh pr create --web

# Tạo draft PR
gh pr create --draft
```

### Xem Pull Requests

```bash
# List PRs
gh pr list

# List PRs với filters
gh pr list --state open
gh pr list --author username
gh pr list --label bug

# Xem PR cụ thể
gh pr view 123

# Xem PR với web
gh pr view 123 --web
```

### Checkout Pull Request

```bash
# Checkout PR locally
gh pr checkout 123

# Tạo branch tên khác
gh pr checkout 123 --branch my-branch
```

### Review Pull Request

```bash
# Approve PR
gh pr review 123 --approve

# Request changes
gh pr review 123 --request-changes --body "Need to fix..."

# Comment
gh pr review 123 --comment "Looks good!"

# Close PR
gh pr close 123

# Merge PR
gh pr merge 123

# Merge với squash
gh pr merge 123 --squash

# Merge với rebase
gh pr merge 123 --rebase
```

### Update Pull Request

```bash
# Update PR branch từ base
gh pr checks 123

# Xem checks
gh pr checks 123 --watch
```

## 🐛 Issues

### Tạo Issue

```bash
# Tạo issue interactively
gh issue create

# Với title và body
gh issue create --title "Bug in login" --body "Description"

# Với labels
gh issue create --title "Bug" --body "Fix needed" --label bug

# Với assignees
gh issue create --title "Task" --body "Do this" --assignee @me
```

### Xem Issues

```bash
# List issues
gh issue list

# List với filters
gh issue list --state open
gh issue list --author username
gh issue list --label bug

# Xem issue cụ thể
gh issue view 123

# Xem issue với web
gh issue view 123 --web
```

### Update Issue

```bash
# Close issue
gh issue close 123

# Reopen issue
gh issue reopen 123

# Add comment
gh issue comment 123 --body "Fixed in PR #456"

# Assign
gh issue edit 123 --add-assignee username
```

## 💻 Gists

### Tạo Gist

```bash
# Tạo gist từ file
gh gist create file.txt

# Tạo gist với description
gh gist create file.txt --desc "My gist"

# Tạo gist public
gh gist create file.txt --public

# Tạo gist từ stdin
echo "Hello" | gh gist create
```

### Xem Gist

```bash
# List gists
gh gist list

# View gist
gh gist view gist-id

# Clone gist
gh gist clone gist-id
```

## 🔍 Search

### Search Repositories

```bash
# Search repos
gh search repos "react"

# Search với filters
gh search repos "language:javascript stars:>1000"
```

### Search Code

```bash
# Search code
gh search code "function login"
```

### Search Issues

```bash
# Search issues
gh search issues "bug in login"
```

## 🎨 Aliases

Tạo alias để dùng nhanh hơn:

```bash
# Thêm vào ~/.zshrc hoặc ~/.bashrc
alias gpr='gh pr create'
alias gprl='gh pr list'
alias gprv='gh pr view'
alias gil='gh issue list'
alias giv='gh issue view'
```

## 💡 Best Practices

### 1. Dùng GitHub CLI cho automation

```bash
#!/bin/bash
# Script tự động tạo PR

gh pr create \
  --title "Weekly update" \
  --body "Auto-generated PR" \
  --label automation
```

### 2. Tích hợp vào Git workflow

```bash
# Thêm vào git config
git config --global alias.pr '!gh pr create'
git config --global alias.prv '!gh pr view'
```

### 3. Dùng với scripts

```bash
# Checkout PR, test, comment
gh pr checkout 123
npm test
if [ $? -eq 0 ]; then
  gh pr comment 123 --body "Tests pass! ✅"
fi
```

## 📝 Tóm tắt

- ✅ GitHub CLI: Công cụ command line cho GitHub
- ✅ `gh auth login`: Đăng nhập GitHub
- ✅ `gh repo clone`: Clone repository
- ✅ `gh pr create`: Tạo Pull Request
- ✅ `gh pr list`: Xem danh sách PRs
- ✅ `gh issue create`: Tạo Issue
- ✅ `gh search`: Tìm kiếm repositories, code, issues
- ✅ Best practices: Dùng cho automation, tích hợp workflow

## ➡️ Tiếp theo

Sau khi biết GitHub CLI, hãy học về [GitHub Actions](./04-github-actions.md) - CI/CD tự động!

---

## 🔗 Tài liệu tham khảo
- [GitHub CLI Documentation](https://cli.github.com/manual/)
- [GitHub CLI GitHub](https://github.com/cli/cli)
- [GitHub CLI Installation](https://cli.github.com/)
