# Bài 3: Khái niệm cơ bản về Repository

## 🎬 "Tại Sao GitHub Của Em Trống Trơn?"

*Ngày thứ hai học Git. Minh hào hứng mở GitHub.*

*Trang profile: 0 repositories, 0 contributions. Trống như sa mạc.*

*"Lạ thật, mình rõ ràng đã commit rồi mà?"* Minh nhắn cho anh Hùng.

> **Anh Hùng:** *"Em đã push chưa?"*
>
> **Minh:** *"Push là gì ạ?"*
>
> **Anh Hùng:** *"Ahh, đây rồi. Em mới chỉ commit trên LOCAL — tức là lưu trên máy em thôi. GitHub là REMOTE — ở trên cloud. Em cần 'push' để đẩy code từ máy lên cloud."*
>
> **Minh:** *"À! Giống như viết bài xong nhưng chưa nộp cho thầy?"*
>
> **Anh Hùng:** *"Chính xác! 👏 Commit = viết xong bài. Push = nộp bài. Chưa push = bài vẫn nằm trong cặp."*

---

## 🎯 Mục tiêu
Sau bài này, bạn sẽ:
- Hiểu Repository là gì
- Biết cách tạo repository mới
- Biết cách clone repository từ GitHub
- Hiểu sự khác biệt sống còn giữa **local** và **remote** repository

---

## 📦 Repository là gì? — "Căn nhà của dự án"

**Repository (Repo)** là nơi chứa toàn bộ code, lịch sử commit, branches, tags và cấu hình của một dự án.

Hãy tưởng tượng repo là **căn nhà** của dự án bạn:

```
my-project/                ← "Căn nhà"
├── README.md              ← "Tấm biển tên nhà" — giới thiệu dự án
├── src/                   ← "Phòng làm việc" — code chính
│   └── main.js
├── package.json           ← "Hợp đồng" — thông tin dự án & dependencies
└── .git/                  ← "Hầm lưu trữ bí mật" 🔒
    ├── config             ← Cấu hình repository
    ├── HEAD               ← Con trỏ: "Bạn đang ở đâu?"
    ├── objects/            ← Lưu trữ tất cả commits, files, changes
    ├── refs/              ← Danh sách branches và tags
    └── index              ← Staging area ("bàn chuẩn bị")
```

> ⚠️ **Quy tắc #1:** Thư mục `.git/` chứa TOÀN BỘ lịch sử. Xóa nó = xóa mọi lịch sử. Code vẫn còn, nhưng khả năng quay lại quá khứ sẽ mất.

---

## 🔄 Local vs Remote — "Bản gốc và Bản backup"

Đây là khái niệm quan trọng nhất mà Minh suýt bỏ qua:

### Local Repository — "Căn nhà trên máy bạn"
- Nằm trên máy tính của bạn
- Bạn làm việc trực tiếp với nó
- Được tạo bằng `git init` hoặc `git clone`
- **Mất laptop = mất repo (nếu chưa push!)**

### Remote Repository — "Căn nhà trên cloud"
- Nằm trên server (GitHub, GitLab, Bitbucket)
- Dùng để backup và chia sẻ code
- Được kết nối với local bằng `git remote add`
- **Mất laptop vẫn còn code (nếu đã push!)**

### Mối quan hệ — Ẩn dụ "Vở và Google Drive"

```
Local Repository          Remote Repository (GitHub)
┌─────────────────┐      ┌──────────────────┐
│  💻 Máy bạn     │      │  ☁️ Internet     │
│                 │      │                  │
│  ┌───────────┐  │ Push │  ┌────────────┐  │
│  │  Quyển vở │  │ ───→ │  │Google Drive│  │
│  │  (code)   │  │      │  │  (backup)  │  │
│  └───────────┘  │ ←─── │  └────────────┘  │
│                 │ Pull  │                  │
└─────────────────┘      └──────────────────┘
```

> **Chị Hà:** *"Tôi từng có developer vỡ ổ cứng, mất 3 ngày code. Anh ấy chưa push. Từ đó, team rule: **Push ít nhất 1 lần/ngày**. Push = bảo hiểm."*

---

## 🆕 Tạo Repository — Ba cách, ba tình huống

### Cách 1: `git init` — Khi bạn bắt đầu dự án mới từ zero

*Minh muốn tạo dự án "Todo App" cho bài tập lớn:*

```bash
# Bước 1: Tạo thư mục dự án
mkdir todo-app-btl
cd todo-app-btl

# Bước 2: Biến thư mục thường thành Git repository
git init
# → Initialized empty Git repository in /path/to/todo-app-btl/.git/

# Bước 3: Tạo file đầu tiên
echo "# Todo App - BTL CSE391" > README.md
echo "Nhóm: Minh, Linh, Hùng" >> README.md

# Bước 4: Commit đầu tiên
git add README.md
git commit -m "feat: Initial commit - Setup project"
```

*Lúc này repo mới chỉ ở LOCAL. GitHub chưa biết gì.*

### Cách 2: `git clone` — Khi dự án đã có sẵn trên GitHub

*Ngày đầu thực tập tại FPT, anh Hùng cho Minh link repo:*

```bash
# Clone repository từ GitHub về máy
git clone https://github.com/fpt-software/ecommerce-project.git

# Hoặc với SSH
git clone git@github.com:fpt-software/ecommerce-project.git

# Clone vào thư mục tên khác
git clone https://github.com/fpt-software/ecommerce-project.git my-project

# Clone một branch cụ thể
git clone -b develop https://github.com/fpt-software/ecommerce-project.git
```

> *Minh gõ lệnh clone, thấy hàng trăm file tải về trong vài giây. "Wow, có sẵn tất cả code của team rồi!" anh nghĩ.*

### Cách 3: Tạo trên GitHub trước → Clone về sau

**Bước 1**: Tạo repository trên GitHub (Web UI)
1. Vào GitHub → Click **New repository** (hoặc **+** → New repository)
2. Đặt tên: `todo-app-btl`
3. Chọn **Private** (bài tập lớn nên private)
4. ✅ Tích "Add a README file" (GitHub tạo sẵn cho bạn)
5. Click **Create repository**

**Bước 2**: Clone về máy
```bash
git clone https://github.com/minh-nguyen/todo-app-btl.git
cd todo-app-btl
```

*Done! Bạn có cả local lẫn remote, đã kết nối sẵn.*

---

## 🔍 Xem thông tin Repository — "Khám sức khỏe"

### Đây có phải Git repository không?

```bash
git status
# Nếu là repo → hiện thông tin branch, files
# Nếu không → "fatal: not a git repository"
```

### Xem remote đã kết nối:

```bash
git remote -v
# Kết quả:
# origin  https://github.com/minh-nguyen/todo-app.git (fetch)
# origin  https://github.com/minh-nguyen/todo-app.git (push)
```

> `origin` là tên mặc định cho remote chính. Có thể có nhiều remote (origin, upstream, fork...).

### Xem tất cả branches:

```bash
git branch          # Branches local
git branch -r       # Branches remote
git branch -a       # Tất cả branches
```

---

## 🔗 Quản lý Remote — Kết nối Local ↔ Cloud

### Khi tạo bằng `git init`, cần kết nối remote thủ công:

```bash
# 1. Tạo repo trên GitHub (web UI) — KHÔNG tích README
# 2. Kết nối local với remote:
git remote add origin https://github.com/minh-nguyen/todo-app.git

# 3. Push lần đầu:
git push -u origin main
```

### Đổi URL remote (khi đổi từ HTTPS sang SSH):

```bash
git remote set-url origin git@github.com:minh-nguyen/todo-app.git
```

### Xem thông tin chi tiết remote:

```bash
git remote show origin
```

---

## 📝 Thực hành: Minh tạo Repo BTL cho nhóm

### Kịch bản: Nhóm Minh, Linh, và một bạn nữa cần tạo repo chung

```bash
# === MINH (Nhóm trưởng) ===

# 1. Tạo repo trên GitHub: "cse391-todo-app" (Private)
# 2. Clone về máy
git clone https://github.com/minh-nguyen/cse391-todo-app.git
cd cse391-todo-app

# 3. Tạo cấu trúc project ban đầu
mkdir -p src/{components,pages,styles}
echo "# CSE391 - Todo App" > README.md

cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Todo App - Nhóm Minh</title>
</head>
<body>
    <h1>Todo App</h1>
    <p>BTL môn CSE391 - Phát triển ứng dụng Web</p>
</body>
</html>
EOF

# 4. Commit và Push
git add .
git commit -m "feat: Initial project structure

- Add README.md
- Add index.html with basic structure  
- Create folder structure for components, pages, styles"

git push origin main

# 5. Mời Linh vào repo:
# GitHub → Settings → Collaborators → Add people → linh-tran
```

```bash
# === LINH (Thành viên) ===

# 1. Nhận lời mời trên GitHub (email / notifications)
# 2. Accept invitation
# 3. Clone repo về máy
git clone https://github.com/minh-nguyen/cse391-todo-app.git
cd cse391-todo-app

# 4. Verify
git log --oneline
# → abc1234 feat: Initial project structure (Nguyễn Văn Minh)

# "Ồ, thấy commit của Minh rồi! Mình bắt đầu code được rồi!"
```

---

## 📊 So sánh các cách tạo Repository

| Cách | Khi nào dùng | Ưu điểm | Nhược điểm |
|------|-------------|---------|------------|
| `git init` | Dự án mới | Nhanh, kiểm soát hoàn toàn | Phải tự kết nối remote |
| `git clone` | Lấy dự án có sẵn | Có sẵn remote, đầy đủ history | Cần quyền truy cập |
| GitHub UI → clone | Tạo trên web trước | Dễ dàng, có README template | Phải clone về sau |

---

## ⚠️ Lưu ý quan trọng

1. **`.git/` folder**: 
   - Chứa toàn bộ lịch sử — đừng bao giờ xóa trực tiếp
   - Nếu xóa: code còn, nhưng lịch sử mất

2. **Clone vs Fork**:
   - **Clone**: Copy repository về máy → cho thành viên team
   - **Fork**: Copy repository sang tài khoản bạn trên GitHub → cho open source

3. **Repository size**:
   - GitHub giới hạn: 100MB/file, ~1GB/repo
   - Dùng Git LFS cho file lớn (video, dataset)
   - Thêm vào `.gitignore`: file build, node_modules, .env

---

## 🔍 Troubleshooting

### Lỗi: `remote origin already exists`
```bash
git remote remove origin          # Xóa remote cũ
git remote add origin <new-url>   # Thêm lại
```

### Lỗi: `Repository not found`
→ Kiểm tra URL đúng chưa? Repo có phải private? Bạn có quyền truy cập?

### Lỗi: `Permission denied`
→ Kiểm tra SSH key hoặc token. Bạn đã được invite vào repo chưa?

---

## 📝 Tóm tắt

| Lệnh | Ý nghĩa "đời thường" |
|---|---|
| `git init` | Xây căn nhà mới (trên máy) |
| `git clone <url>` | Dọn vào căn nhà có sẵn (từ GitHub) |
| `git remote add origin <url>` | Kết nối nhà với Google Drive |
| `git remote -v` | Kiểm tra kết nối cloud |
| `git push -u origin main` | Gửi đồ lên cloud lần đầu |

---

## ➡️ Chuyện tiếp theo...

Minh đã có repo, Linh đã clone về. Cả hai sẵn sàng code.

Nhưng Minh tạo file `app.js`, sửa xong, muốn lưu lại... *"Ủa, `git save` à? Hay `git commit`? Mà trước đó phải `git add` là sao? Tại sao không tự lưu?"*

Anh ấy sắp khám phá ba trạng thái bí ẩn nhất trong Git: **Working Directory → Staging Area → Repository.** Hành trình "chụp ảnh lưu niệm" cho code bắt đầu.

**→ [Bài 4: Làm việc với Files — Add, Commit, Push](./04-lam-viec-voi-files.md) — Ba bước cơ bản nhất, nhưng sai một bước là mất code.**

---

## 🔗 Tài liệu tham khảo
- [Git Documentation - Getting a Git Repository](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository)
- [GitHub - Creating a new repository](https://docs.github.com/en/get-started/quickstart/create-a-repo)
- [Git Remote Documentation](https://git-scm.com/docs/git-remote)
