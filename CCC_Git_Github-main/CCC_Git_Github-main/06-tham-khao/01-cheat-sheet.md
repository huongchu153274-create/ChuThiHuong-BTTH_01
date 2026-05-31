# Git & GitHub Cheat Sheet

## 🎬 "Anh Hùng, Lệnh Nào Để...?" — Bảng Tra Cứu Cứu Mạng

*Minh sticky-note đầy màn hình: "git stash", "git rebase -i HEAD~3", "git reflog"...*

*Anh Hùng cười: "Không cần nhớ hết. Chỉ cần biết CHỖ TRA CỨU. Đây là bảng cheat sheet — in ra dán cạnh màn hình. 6 tháng sau, tự khắc nhớ."*

> 💡 **Mẹo:** Bookmark trang này. Mỗi ngày dùng 1-2 lệnh mới. Sau 2 tuần bạn sẽ thuộc 80% lệnh Git thường dùng.

---

## 🔧 Cấu hình

```bash
# Cấu hình user
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Xem cấu hình
git config --list
git config user.name

# Cấu hình editor
git config --global core.editor "code --wait"

# Cấu hình alias
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
```

---

## 📦 Repository

```bash
# Tạo repository mới
git init

# Clone repository
git clone <url>
git clone <url> <directory>

# Xem remotes
git remote -v

# Thêm remote
git remote add origin <url>

# Xóa remote
git remote remove origin

# Đổi URL remote
git remote set-url origin <url>

# Xem thông tin remote
git remote show origin
```

---

## 📝 Làm việc với Files

```bash
# Xem trạng thái
git status
git status -s

# Xem thay đổi
git diff
git diff --staged
git diff <file>

# Add file
git add <file>
git add .
git add -A

# Add từng phần
git add -p <file>

# Unstage
git restore --staged <file>

# Hủy thay đổi chưa staged
git restore <file>

# Commit
git commit -m "Message"
git commit -am "Message"  # Add và commit

# Sửa commit vừa rồi (chưa push)
git commit --amend -m "New message"
git commit --amend --no-edit
```

---

## 📜 Lịch sử

```bash
# Xem log
git log
git log --oneline
git log -n 5
git log --graph --oneline --all

# Xem commit cụ thể
git show <hash>

# Xem thay đổi của file
git log -- <file>
git log -p -- <file>

# Tìm theo message
git log --grep "keyword"

# Tìm theo author
git log --author "Name"

# Tìm theo thời gian
git log --since="2 weeks ago"
git log --after="2024-01-01"
```

---

## 🌿 Branches

```bash
# Xem branches
git branch
git branch -a
git branch -r
git branch -v

# Tạo branch
git branch <name>
git checkout -b <name>
git switch -c <name>

# Chuyển branch
git checkout <name>
git switch <name>

# Xóa branch
git branch -d <name>
git branch -D <name>

# Đổi tên branch
git branch -m <old-name> <new-name>

# Xóa remote branch
git push origin --delete <name>
```

---

## 🔀 Merge

```bash
# Merge branch
git checkout main
git merge <branch>

# Merge với message
git merge -m "Message" <branch>

# Merge squash
git merge --squash <branch>
git commit -m "Message"

# Abort merge
git merge --abort

# Xem branches chưa merge
git branch --no-merged
```

---

## 🔄 Rebase

```bash
# Rebase
git checkout <branch>
git rebase main

# Interactive rebase
git rebase -i HEAD~n

# Continue rebase
git rebase --continue

# Abort rebase
git rebase --abort

# Skip commit
git rebase --skip
```

---

## ⏪ Undo

```bash
# Reset soft (giữ code)
git reset --soft HEAD~1

# Reset mixed (unstaged)
git reset HEAD~1

# Reset hard (xóa code) ⚠️
git reset --hard HEAD~1

# Revert commit
git revert <hash>

# Khôi phục file
git restore <file>
git restore --source=<hash> <file>
```

---

## 📤 Push & Pull

```bash
# Push
git push
git push origin <branch>
git push -u origin <branch>  # Set upstream

# Force push ⚠️
git push --force
git push --force-with-lease

# Pull
git pull
git pull origin <branch>

# Fetch
git fetch
git fetch origin

# Pull rebase
git pull --rebase
```

---

## 🍴 Fork & Contribute

```bash
# Clone fork
git clone <fork-url>

# Thêm upstream
git remote add upstream <original-url>

# Sync với upstream
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

---

## 🗂️ Stash

```bash
# Stash
git stash
git stash save "Message"
git stash -u  # Bao gồm untracked

# Xem stash
git stash list

# Apply stash
git stash apply
git stash apply stash@{n}

# Pop stash (apply và xóa)
git stash pop

# Xóa stash
git stash drop stash@{n}
git stash clear
```

---

## 🏷️ Tags

```bash
# Tạo tag
git tag <name>
git tag -a <name> -m "Message"

# Xem tags
git tag
git show <tag>

# Push tags
git push origin <tag>
git push --tags

# Xóa tag
git tag -d <tag>
git push origin --delete <tag>
```

---

## 🔍 Tìm kiếm

```bash
# Tìm trong code
git grep "keyword"
git grep -n "keyword"  # Với số dòng

# Tìm file
git ls-files | grep "pattern"

# Tìm commit thay đổi content
git log -S "keyword"
git log -G "pattern"
```

---

## 🧹 Cleanup

```bash
# Xóa untracked files
git clean -n  # Preview
git clean -f  # Force
git clean -fd  # Files và directories

# Prune remotes
git fetch --prune

# Garbage collection
git gc
```

---

## 📊 So sánh

```bash
# So sánh working directory với staging
git diff

# So sánh staging với commit
git diff --staged

# So sánh 2 commits
git diff <hash1> <hash2>

# So sánh 2 branches
git diff <branch1>..<branch2>

# So sánh chỉ tên file
git diff --name-only <branch1> <branch2>
```

---

## 🔐 GitHub CLI

```bash
# Login
gh auth login

# Tạo PR
gh pr create
gh pr create --title "Title" --body "Body"

# List PRs
gh pr list

# View PR
gh pr view <number>

# Checkout PR
gh pr checkout <number>

# Merge PR
gh pr merge <number>

# Fork
gh repo fork owner/repo
```

---

## 🆘 Emergency

```bash
# Xem đang ở đâu
git status
git log --oneline -5

# Xem reflog (khôi phục commit "mất")
git reflog

# Khôi phục từ reflog
git reset --hard HEAD@{n}

# Xem file trong commit
git show <hash>:<file>

# Abort mọi thứ
git merge --abort
git rebase --abort
git cherry-pick --abort
```

---

## 💡 Mẹo Nhanh

```bash
# Xem branch hiện tại
git rev-parse --abbrev-ref HEAD

# Xem commit hash ngắn
git rev-parse --short HEAD

# Xem commit trước đó
git show HEAD~1

# Undo add
git restore --staged .

# Undo commit (giữ code)
git reset --soft HEAD~1

# Undo commit (xóa code) ⚠️
git reset --hard HEAD~1

# Xem file của commit trước
git show HEAD~1:<file>

# Copy commit từ branch khác
git cherry-pick <hash>
```

---

## 🎯 Common Workflows

### Tạo feature mới
```bash
git checkout main
git pull
git checkout -b feature/new-feature
# Làm việc...
git add .
git commit -m "Add new feature"
git push -u origin feature/new-feature
```

### Update feature từ main
```bash
git checkout feature/new-feature
git fetch origin
git merge origin/main
# Resolve conflict nếu có...
git push
```

### Merge feature vào main
```bash
git checkout main
git pull
git merge feature/new-feature
git push
git branch -d feature/new-feature
```

### Hotfix
```bash
git checkout main
git checkout -b hotfix/critical-bug
# Fix...
git add .
git commit -m "Fix critical bug"
git push -u origin hotfix/critical-bug
# Tạo PR và merge
```

---

## ⚠️ Các Lệnh Nguy Hiểm

```bash
# ⚠️ Xóa tất cả thay đổi chưa commit
git reset --hard HEAD
git clean -fd

# ⚠️ Force push (ghi đè remote)
git push --force

# ⚠️ Xóa branch chưa merge
git branch -D <branch>

# ⚠️ Rewrite history
git rebase -i HEAD~n
git filter-branch  # Cực kỳ nguy hiểm
```

**Lưu ý**: Chỉ dùng trên branch cá nhân, không dùng trên main/master!

---

## 📚 Tài Liệu Tham Khảo

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Docs](https://docs.github.com)
- [Git Cheat Sheet (GitHub)](https://education.github.com/git-cheat-sheet-education.pdf)

---

**Ghi chú**: Cheat sheet này chỉ là tham khảo nhanh. Đọc các bài học chi tiết để hiểu sâu hơn!
