# Bài 4: Làm việc với Files — Add, Commit, Push

## 🎬 "Ba Bước Thần Thánh" — Bí quyết mà mọi Developer đều biết

*Linh nhắn nhóm lúc 10 giờ tối:*

> **Linh:** *"Mình sửa xong file `styles.css` rồi, nhưng Minh ơi sao mình `git push` mà nó báo lỗi?"*
>
> **Minh:** *"Em add chưa?"*
>
> **Linh:** *"Add là gì?"*

*Minh nhớ lại bài học từ anh Hùng: Git không tự động lưu. Phải qua BA bước — như gửi bưu phẩm:*

1. 📦 **`git add`** = Đóng gói hàng (chọn file nào muốn gửi)
2. 📝 **`git commit`** = Dán nhãn, viết địa chỉ (ghi lại bạn gửi cái gì, tại sao)
3. 🚀 **`git push`** = Gửi đi (đẩy lên GitHub)

*Bỏ qua bước nào = hàng không đến nơi.*

---

## 🎯 Mục tiêu
Sau bài này, bạn sẽ:
- Hiểu 3 trạng thái của file trong Git
- Biết cách add files vào staging area
- Biết cách commit thay đổi với message rõ ràng
- Biết cách push code lên GitHub
- Nắm vững workflow cơ bản nhất

---

## 📊 3 Trạng thái của File — "Hành trình của một bức thư"

Hãy tưởng tượng bạn viết thư gửi cho bạn bè:

| Trạng thái | Ẩn dụ | Trong Git | Lệnh chuyển tiếp |
|---|---|---|---|
| **Working Directory** | ✍️ Viết thư (viết xong, chưa bỏ phong bì) | File bạn đang sửa, chưa được Git lưu | → `git add` |
| **Staging Area** | 📨 Bỏ vào phong bì (sẵn sàng gửi) | File đã đánh dấu, chờ commit | → `git commit` |
| **Repository** | 📬 Đã gửi đi (trong hòm thư) | File đã lưu vĩnh viễn trong lịch sử | → `git push` |

```
Working Directory    Staging Area        Repository         GitHub
   (Viết thư)       (Bỏ phong bì)     (Gửi bưu điện)      (Đến nơi)
                                             
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  file1.js ✏️ │  │              │  │              │  │              │
│  file2.js ✏️ │→ │  file1.js 📨│→ │  file1.js 📬│→ │  file1.js ☁️│
│  file3.js ✏️ │  │  file2.js 📨│  │  file2.js 📬│  │  file2.js ☁️│
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
    git add           git commit         git push
```

> **Anh Hùng:** *"Tại sao cần staging area? Vì đôi khi em sửa 5 file nhưng chỉ muốn commit 2 file liên quan đến tính năng A. 3 file còn lại commit sau với tính năng B. Staging giúp em chọn lọc."*

---

## 📝 Git Status — "Bác sĩ khám bệnh cho repo"

Lệnh quan trọng nhất — hỏi Git: *"Tình hình thế nào?"*

```bash
git status
```

### Đọc hiểu kết quả (như đọc kết quả xét nghiệm):

```bash
$ git status
On branch main                          ← "Em đang ở branch main"

Changes to be committed:                ← ✅ Đã trong phong bì, chờ gửi
  (use "git restore --staged <file>..." to unstage)
        modified:   README.md
        new file:   src/utils.js

Changes not staged for commit:          ← ⚠️ Đã sửa nhưng chưa bỏ phong bì
        modified:   src/main.js

Untracked files:                        ← ❓ File mới, Git chưa biết
        src/config.json
```

> *Minh nhìn status như đọc bản đồ: biết chính xác file nào ở đâu, cần làm gì tiếp.*

### Xem status ngắn gọn:

```bash
git status -s
# M  README.md          ← Modified, ĐÃ staged (chữ M ở cột trái)
#  M src/main.js        ← Modified, CHƯA staged (chữ M ở cột phải)
# ?? src/config.json    ← Untracked (Git chưa biết)
# A  src/utils.js       ← Added (file mới, đã staged)
```

---

## ➕ Git Add — "Chọn hàng bỏ vào phong bì"

### Add từng file (khuyên dùng khi mới học):

```bash
git add src/main.js                # Add 1 file cụ thể
git add src/main.js src/utils.js   # Add nhiều file
git add src/                       # Add cả thư mục src
git add *.js                       # Add tất cả file .js
```

### Add tất cả (nhanh nhưng cẩn thận):

```bash
git add .       # Add MỌI THỨ trong thư mục hiện tại
git add -A      # Tương tự, rõ ràng hơn
```

> ⚠️ **Bẫy hay gặp:** `git add .` sẽ add cả file không mong muốn (`.env`, `node_modules/`). Luôn kiểm tra `git status` trước!

### Unstage (hối hận, muốn lấy ra khỏi phong bì):

```bash
git restore --staged src/main.js    # Bỏ 1 file
git restore --staged .              # Bỏ tất cả
```

*File quay về Working Directory, thay đổi vẫn còn — chỉ là chưa sẵn sàng commit.*

### Add từng phần của file (Nâng cao — rất hay!):

```bash
git add -p src/main.js
# Git hỏi từng thay đổi: "Add đoạn này? (y/n)"
# → Cực kỳ hữu ích khi 1 file có nhiều thay đổi thuộc nhiều features khác nhau
```

---

## 💾 Git Commit — "Chụp ảnh và ghi chú"

### Commit cơ bản:

```bash
git commit -m "Thêm tính năng đăng nhập"
```

### Commit với message nhiều dòng (chuyên nghiệp hơn):

```bash
git commit -m "feat: Add user login form

- Create LoginForm component with email/password inputs
- Add client-side validation
- Connect to authentication API
- Handle error states and loading spinner

Closes #42"
```

### 🏢 Conventional Commits — Chuẩn của ngành

> **Chị Hà:** *"Tại Shopee, commit message có convention rõ ràng. Không theo = PR bị reject ngay, không cần đọc code."*

```
<type>: <subject>

<body>

<footer>
```

| Type | Ý nghĩa | Ví dụ |
|---|---|---|
| `feat` | Tính năng mới | `feat: Add search filter` |
| `fix` | Sửa bug | `fix: Fix login crash on Safari` |
| `docs` | Tài liệu | `docs: Update API documentation` |
| `style` | Formatting (không đổi logic) | `style: Fix indentation` |
| `refactor` | Tái cấu trúc | `refactor: Extract validation logic` |
| `test` | Thêm/sửa test | `test: Add unit tests for login` |
| `chore` | Việc bảo trì | `chore: Update dependencies` |

### ❌ vs ✅ — Commit message thực tế:

```bash
# ❌ TỆ — Anh Hùng sẽ reject ngay
git commit -m "fix"
git commit -m "update"
git commit -m "asdfgh"              # Lúc 3 giờ sáng 😴
git commit -m "DONE FINALLY"

# ✅ TỐT — Chị Hà approve ngay
git commit -m "fix: Resolve null pointer in form validation"
git commit -m "feat: Add Google OAuth login button"
git commit -m "refactor: Extract API calls to service layer"
```

### Sửa commit vừa rồi (chưa push):

```bash
# Sửa message
git commit --amend -m "Message đúng"

# Thêm file quên add vào commit trước
git add forgotten-file.js
git commit --amend --no-edit    # Giữ nguyên message cũ
```

---

## 📤 Git Push — "Gửi bưu phẩm lên cloud"

### Push lần đầu (thiết lập upstream):

```bash
git push -u origin main
# -u: "Nhớ remote này cho lần sau" → không cần gõ lại origin main
```

### Từ lần sau:

```bash
git push    # Đã nhớ, không cần gõ thêm gì
```

### Force push (☢️ VŨ KHÍ HẠT NHÂN — chỉ dùng khi chắc chắn):

```bash
git push --force-with-lease    # An toàn hơn --force
```

> **Anh Hùng:** *"Force push lên main = gây chiến với cả team. Chỉ dùng trên branch CÁ NHÂN."*

---

## 📋 Workflow hoàn chỉnh — Một vòng lặp của Minh

### Kịch bản: Minh thêm trang About cho todo-app

```bash
# 1. 🔍 Kiểm tra tình hình
git status
# → nothing to commit, working tree clean ✅

# 2. ✏️ Tạo file mới
# Minh mở VS Code, tạo src/pages/about.html, viết code...

# 3. 🔍 Xem thay đổi
git status
# → Untracked files: src/pages/about.html

git diff                # Xem thay đổi chưa staged
git diff --staged       # Xem thay đổi đã staged

# 4. 📦 Chọn file để commit
git add src/pages/about.html

# 5. 🔍 Kiểm tra lần cuối (thói quen tốt!)
git status
# → Changes to be committed: new file: src/pages/about.html ✅

# 6. 📸 Commit!
git commit -m "feat: Add About page

- Create about.html with team introduction
- Add navigation link from index.html"

# 7. 🚀 Push lên GitHub
git push

# 8. 🎉 Mở GitHub → thấy commit mới → Done!
```

> *Linh refresh trang GitHub, thấy commit của Minh. "Ồ, Minh đã push trang About!" Cô `git pull` về máy mình và tiếp tục code.*

---

## 🎯 Best Practices — Bài học từ production

### 1. Commit thường xuyên, commit nhỏ
```
❌ TỆ:  1 commit = 50 files = "Update everything" 
✅ TỐT: 5 commits = mỗi commit 1 feature nhỏ, rõ ràng
```

### 2. Review trước khi commit
```bash
git status           # File nào sẽ commit?
git diff --staged    # Code nào sẽ commit?
# OK → git commit
```

### 3. Push thường xuyên = Backup thường xuyên
> Quy tắc: Kết thúc ngày làm việc → Push. Dù chưa xong feature.

### 4. Không commit file nhạy cảm!
```bash
# ❌ KHÔNG BAO GIỜ commit những file này:
# .env (passwords, API keys)
# node_modules/ (quá nặng, cài lại được)
# build/ (output, tạo lại được)

# ✅ Dùng .gitignore để loại trừ tự động
```

---

## ⚠️ Lưu ý quan trọng

1. **`git add .` khác `git add -u`**:
   - `git add .`: Add TẤT CẢ (cả file mới)
   - `git add -u`: Chỉ add file đã tracked (không add file mới)

2. **Commit rồi mới push** — có thể commit nhiều lần trước khi push

3. **Nếu quên message**: `git commit` (không có `-m`) sẽ mở editor

4. **Push bị reject?** → Ai đó đã push trước bạn. Cần `git pull` trước.

---

## 🔍 Troubleshooting

### Lỗi: `nothing to commit, working tree clean`
→ Không có thay đổi nào. Bạn đã commit rồi, hoặc chưa sửa file.

### Lỗi: `Updates were rejected`
→ Remote có commits mới. Chạy `git pull` trước rồi `git push` lại.

### Lỗi: `Please tell me who you are`
→ Chưa cấu hình user.name và user.email. Quay lại Bài 2.

---

## 📝 Tóm tắt — "Ba Bước Thần Thánh"

```
✏️ Sửa code
    ↓
📦 git add .              ← "Bỏ vào phong bì"
    ↓
📸 git commit -m "..."    ← "Chụp ảnh, ghi chú"
    ↓
🚀 git push              ← "Gửi lên cloud"
    ↓
🎉 Done!
```

---

## ➡️ Chuyện tiếp theo...

Minh push thành công. 5 commits trên GitHub. Anh tự hào.

Nhưng rồi Linh hỏi: *"Này Minh, cái commit hôm qua em sửa gì vậy? Sao code hôm nay chạy khác rồi?"*

Minh muốn xem lại lịch sử — ai sửa gì, lúc nào, dòng nào thay đổi. **`git log` — cuốn nhật ký tự động mà Git viết giúp bạn mỗi ngày.**

**→ [Bài 5: Xem lịch sử và Log](./05-xem-lich-su.md) — Khi bạn cần quay lại quá khứ để tìm câu trả lời.**

---

## 🔗 Tài liệu tham khảo
- [Git Documentation - Recording Changes](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository)
- [Git Documentation - Git Push](https://git-scm.com/docs/git-push)
- [Conventional Commits](https://www.conventionalcommits.org/)
