# Troubleshooting — Xử Lý Lỗi Thường Gặp

## 🎬 "Git Error!" — Đừng Hoảng, Đọc Error Message

*Minh commit lần đầu, terminal đỏ rực: `"fatal: refusing to merge unrelated histories"`. Anh hoảng, gọi anh Hùng.*

*"Em đọc kỹ error message," anh Hùng nói. "Git luôn nói rất RÕ lỗi gì. 'refusing to merge unrelated histories' → hai repo không có chung lịch sử → cần `--allow-unrelated-histories`. Error message = manh mối. Developer giỏi = thám tử đọc manh mối."*

> 💡 **Mẹo #1:** Copy nguyên error message → Paste vào Google. 90% sẽ có StackOverflow answer trong 3 kết quả đầu.

---

## ❌ Lỗi Cài Đặt và Cấu Hình

### Lỗi: "git: command not found"

**Nguyên nhân**: Git chưa được cài đặt hoặc chưa được thêm vào PATH.

**Giải pháp**:
```bash
# macOS
brew install git

# Windows: Download từ https://git-scm.com/download/win
# Linux
sudo apt install git  # Ubuntu/Debian
sudo yum install git  # CentOS/RHEL
```

### Lỗi: "fatal: could not read Username"

**Nguyên nhân**: Chưa cấu hình credential hoặc token đã hết hạn.

**Giải pháp**:
```bash
# Cấu hình credential helper
git config --global credential.helper osxkeychain  # macOS
git config --global credential.helper wincred      # Windows
git config --global credential.helper cache        # Linux

# Tạo Personal Access Token trên GitHub
# Settings → Developer settings → Personal access tokens → Generate new token
# Khi push/pull, dùng token thay vì password
```

### Lỗi: "Please tell me who you are"

**Nguyên nhân**: Chưa cấu hình user.name và user.email.

**Giải pháp**:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Lỗi: "fatal: not a git repository"

**Nguyên nhân**: Bạn không đang ở trong Git repository.

**Giải pháp**:
```bash
# Kiểm tra có phải Git repo không
git status

# Nếu không phải, khởi tạo
git init

# Hoặc clone repository
git clone <url>
```

---

## ❌ Lỗi Repository

### Lỗi: "remote origin already exists"

**Nguyên nhân**: Remote `origin` đã được thêm trước đó.

**Giải pháp**:
```bash
# Xem remotes
git remote -v

# Xóa remote cũ
git remote remove origin

# Thêm lại
git remote add origin <url>

# Hoặc đổi URL
git remote set-url origin <new-url>
```

### Lỗi: "Repository not found"

**Nguyên nhân**: URL sai, không có quyền truy cập, hoặc repository đã bị xóa.

**Giải pháp**:
- Kiểm tra URL đúng chưa
- Kiểm tra quyền truy cập trên GitHub
- Kiểm tra repository còn tồn tại không
- Kiểm tra SSH key hoặc token có đúng không

### Lỗi: "Permission denied (publickey)"

**Nguyên nhân**: SSH key chưa được thêm vào GitHub hoặc cấu hình sai.

**Giải pháp**:
```bash
# Kiểm tra SSH key
cat ~/.ssh/id_ed25519.pub

# Copy và thêm vào GitHub:
# Settings → SSH and GPG keys → New SSH key

# Test kết nối
ssh -T git@github.com

# Nếu vẫn lỗi, kiểm tra SSH agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

---

## ❌ Lỗi Commit và Push

### Lỗi: "nothing to commit, working tree clean"

**Nguyên nhân**: Không có thay đổi nào để commit.

**Giải pháp**:
```bash
# Kiểm tra trạng thái
git status

# Tạo file mới hoặc sửa file để có thay đổi
# Sau đó add và commit
git add .
git commit -m "Message"
```

### Lỗi: "Updates were rejected"

**Nguyên nhân**: Người khác đã push trước bạn.

**Giải pháp**:
```bash
# Pull trước khi push
git pull

# Hoặc pull với rebase
git pull --rebase

# Resolve conflict nếu có...
# Sau đó push
git push
```

### Lỗi: "failed to push some refs"

**Nguyên nhân**: Local branch không khớp với remote branch.

**Giải pháp**:
```bash
# Pull trước
git pull origin <branch>

# Resolve conflict nếu có...
# Sau đó push
git push origin <branch>

# Hoặc force push (⚠️ chỉ dùng trên branch cá nhân)
git push --force-with-lease
```

### Lỗi: "fatal: refusing to merge unrelated histories"

**Nguyên nhân**: Hai repository không có commit chung.

**Giải pháp**:
```bash
git merge --allow-unrelated-histories <branch>
# hoặc
git pull --allow-unrelated-histories
```

---

## ❌ Lỗi Merge và Conflict

### Lỗi: "You have local changes"

**Nguyên nhân**: Có thay đổi chưa commit hoặc stash.

**Giải pháp**:
```bash
# Commit thay đổi
git add .
git commit -m "Save changes"

# Hoặc stash
git stash
# Sau đó merge
git merge <branch>
# Sau merge, apply stash
git stash pop
```

### Lỗi: "merge: refusing to merge into current branch"

**Nguyên nhân**: Đang ở branch merge (sai).

**Giải pháp**:
```bash
# Chuyển sang branch đích (main) trước
git checkout main
git merge <branch>
```

### Lỗi: "Automatic merge failed; fix conflicts"

**Nguyên nhân**: Có conflict cần resolve thủ công.

**Giải pháp**:
```bash
# 1. Xem file có conflict
git status

# 2. Mở file và resolve conflict
# Xóa các marker: <<<<<<< HEAD, =======, >>>>>>>

# 3. Add file đã resolve
git add <file>

# 4. Commit
git commit -m "Merge and resolve conflicts"

# Hoặc abort merge
git merge --abort
```

---

## ❌ Lỗi Branch

### Lỗi: "fatal: A branch named 'xxx' already exists"

**Nguyên nhân**: Branch đã tồn tại.

**Giải pháp**:
```bash
# Xem branches
git branch

# Nếu branch đã tồn tại, chỉ cần checkout
git checkout <branch-name>

# Hoặc xóa branch cũ trước (nếu chắc chắn)
git branch -D <branch-name>
git checkout -b <branch-name>
```

### Lỗi: "error: The branch 'xxx' is not fully merged"

**Nguyên nhân**: Branch chưa được merge.

**Giải pháp**:
```bash
# Nếu chắc chắn muốn xóa, dùng -D
git branch -D <branch-name>

# Hoặc merge trước rồi xóa
git checkout main
git merge <branch-name>
git branch -d <branch-name>
```

### Lỗi: "error: pathspec 'xxx' did not match any file"

**Nguyên nhân**: Branch hoặc file không tồn tại.

**Giải pháp**:
- Kiểm tra tên branch/file đúng chưa
- Xem branches: `git branch -a`
- Xem files: `git ls-files`

---

## ❌ Lỗi Pull Request

### PR không hiện "Merge" button

**Nguyên nhân**: 
- PR chưa được approve
- Có conflict
- CI/CD fail
- Branch protection rules

**Giải pháp**:
- Request review và đợi approve
- Resolve conflict
- Fix CI/CD errors
- Kiểm tra branch protection rules

### PR bị conflict

**Giải pháp**:
```bash
# Resolve local
git checkout <branch>
git fetch origin
git merge origin/main

# Resolve conflict...
git add .
git commit -m "Resolve conflicts"
git push

# Hoặc resolve trên GitHub web UI
```

### PR bị stale (cũ)

**Giải pháp**:
```bash
# Update branch từ main
git checkout <branch>
git fetch origin
git merge origin/main

# Hoặc rebase
git rebase origin/main

# Push
git push
```

---

## ❌ Lỗi Rebase

### Lỗi: "interactive rebase in progress"

**Nguyên nhân**: Đang trong quá trình rebase.

**Giải pháp**:
```bash
# Continue rebase
git rebase --continue

# Abort rebase
git rebase --abort

# Skip commit
git rebase --skip
```

### Lỗi: "could not apply commit"

**Nguyên nhân**: Conflict khi rebase.

**Giải pháp**:
```bash
# Resolve conflict như merge
# ...

# Sau đó continue
git add .
git rebase --continue

# Hoặc abort
git rebase --abort
```

---

## ❌ Lỗi Undo và Reset

### Lỗi: "fatal: ambiguous argument 'HEAD~1'"

**Nguyên nhân**: Repository trống hoặc không có commit.

**Giải pháp**:
```bash
# Kiểm tra commits
git log

# Nếu trống, cần commit trước
git add .
git commit -m "Initial commit"
```

### Lỗi: "error: pathspec 'xxx' did not match any file"

**Nguyên nhân**: File hoặc commit không tồn tại.

**Giải pháp**:
- Kiểm tra tên file/commit hash đúng chưa
- Xem commits: `git log --oneline`
- Xem files: `git ls-tree -r HEAD`

---

## ❌ Lỗi Fork và Contribute

### Lỗi: "remote upstream already exists"

**Nguyên nhân**: Upstream đã được thêm trước.

**Giải pháp**:
```bash
# Xóa upstream cũ
git remote remove upstream

# Thêm lại
git remote add upstream <original-url>
```

### Lỗi: "Your branch is behind 'origin/main'"

**Nguyên nhân**: Fork chưa sync với upstream.

**Giải pháp**:
```bash
# Sync với upstream
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

---

## ❌ Lỗi Chung

### Lỗi: "fatal: not a git repository"

**Giải pháp**: Đảm bảo đang ở trong Git repository:
```bash
# Khởi tạo hoặc clone
git init
# hoặc
git clone <url>
```

### Lỗi: "fatal: unable to access 'https://...'"

**Nguyên nhân**: Network issue hoặc authentication problem.

**Giải pháp**:
- Kiểm tra kết nối internet
- Kiểm tra token/SSH key
- Thử lại sau vài phút

### Lỗi: "error: could not lock config file"

**Nguyên nhân**: File cấu hình đang bị khóa.

**Giải pháp**:
- Đóng các ứng dụng Git khác
- Kiểm tra quyền file
- Chờ vài giây rồi thử lại

---

## 🔍 Khôi phục Dữ liệu

### Khôi phục commit đã "mất"

```bash
# Xem reflog
git reflog

# Khôi phục từ reflog
git reset --hard HEAD@{n}
```

### Khôi phục file đã xóa

```bash
# Xem file trong commit trước
git show HEAD~1:<file>

# Khôi phục file
git checkout HEAD~1 -- <file>
# hoặc
git restore --source=HEAD~1 <file>
```

### Khôi phục branch đã xóa

```bash
# Xem reflog
git reflog

# Tìm commit cuối của branch
git log --all --oneline --grep="message"

# Tạo lại branch
git checkout -b <branch-name> <commit-hash>
```

---

## 📞 Liên Hệ và Hỗ Trợ

### Khi không tìm thấy giải pháp

1. **Tìm kiếm**: Google lỗi message chính xác
2. **GitHub Issues**: Tìm trên repository của tool
3. **Stack Overflow**: Tìm câu hỏi tương tự
4. **Git Documentation**: Đọc docs chính thức
5. **Community**: Hỏi trong forum, Discord, Slack

### Tài liệu tham khảo

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Docs](https://docs.github.com)
- [GitHub Support](https://support.github.com)
- [Stack Overflow - Git](https://stackoverflow.com/questions/tagged/git)

---

## 📝 Tóm Tắt

- ✅ Hầu hết lỗi có thể giải quyết bằng: `git status`, `git log`, `git remote -v`
- ✅ Conflict: Resolve thủ công, add, commit
- ✅ Push reject: Pull trước, resolve conflict, push lại
- ✅ Recovery: Dùng `git reflog` để khôi phục
- ✅ Khi nghi ngờ: `git status` để xem trạng thái hiện tại

---

**Lưu ý**: Khi gặp lỗi, đọc message lỗi kỹ - thường có hướng dẫn trong đó!
