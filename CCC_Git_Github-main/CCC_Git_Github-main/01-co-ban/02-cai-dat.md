# Bài 2: Cài đặt và Cấu hình Git

## 🎬 Commit Đầu Tiên (Và Sai Lầm Đầu Tiên)

*Minh mở YouTube, search "cài đặt git". 47 video hiện ra, mỗi video nói một kiểu khác nhau.*

*Qua Zalo hỏi anh Hùng:*

> **Minh:** *"Anh ơi, em cài Git như thế nào?"*
>
> **Anh Hùng:** *"Máy em Windows hay Mac?"*
>
> **Minh:** *"Windows ạ."*
>
> **Anh Hùng:** *"OK. Cài Git for Windows, cấu hình tên + email, tạo SSH key. 10 phút là xong. Nhưng nhớ: cấu hình email phải trùng với email GitHub, không thì commits của em sẽ thành 'ẩn danh' — nhà tuyển dụng xem GitHub không biết em là ai."*

Minh không biết "cấu hình email" quan trọng đến vậy. Đây là bài học đầu tiên: **Thiết lập đúng từ đầu, tránh đau đầu về sau.**

---

## 🎯 Mục tiêu
Sau bài này, bạn sẽ:
- Cài đặt Git trên máy tính của mình
- Cấu hình Git với thông tin cá nhân
- Kiểm tra Git đã hoạt động chính xác
- Kết nối GitHub với máy tính

---

## 💻 Cài đặt Git

### Trên Windows (Phổ biến nhất với sinh viên)

#### Cách 1: Git for Windows (Khuyên dùng ⭐)
1. Truy cập: https://git-scm.com/download/win
2. Tải và cài đặt Git for Windows
3. Trong quá trình cài đặt, chọn:
   - ✅ Git Bash Here
   - ✅ Git GUI Here
   - ✅ Use Git and optional Unix tools from the Command Prompt

> 💡 **Mẹo từ anh Hùng:** *"Cứ Next → Next → Install. Các option mặc định đã tốt rồi. Chỉ cần chú ý chọn VS Code làm editor mặc định thay vì Vim — trừ khi em thích mạo hiểm."*

#### Cách 2: Dùng winget (Windows Package Manager)
```bash
winget install Git.Git
```

#### Cách 3: Dùng Chocolatey
```bash
choco install git
```

### Trên macOS

#### Cách 1: Dùng Homebrew (Khuyên dùng)
```bash
# Cài đặt Homebrew nếu chưa có
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Cài đặt Git
brew install git
```

#### Cách 2: Dùng Xcode Command Line Tools
```bash
xcode-select --install
```

#### Cách 3: Tải từ trang chủ
Truy cập: https://git-scm.com/download/mac

### Trên Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install git
```

### Trên Linux (Fedora/CentOS/RHEL)
```bash
sudo yum install git
# hoặc với dnf
sudo dnf install git
```

---

## ✅ Kiểm tra cài đặt — Bước quan trọng nhất

Mở Terminal (macOS/Linux) hoặc Git Bash/PowerShell (Windows) và chạy:

```bash
git --version
```

Kết quả mong đợi:
```
git version 2.39.0 (hoặc phiên bản mới hơn)
```

> *Minh chạy lệnh này, thấy hiện `git version 2.43.0`. Anh thở phào: "OK, cài thành công!"*

---

## ⚙️ Cấu hình Git — "Đăng ký danh tính"

### 🔴 Bước quan trọng nhất: Cấu hình tên và email

**Vì sao quan trọng?** Mỗi commit bạn tạo sẽ gắn tên và email này. Nhà tuyển dụng nhìn GitHub profile → thấy tên bạn → biết bạn code gì.

> **Sai lầm thực tế:** Minh cấu hình email `minh123@yahoo.com` nhưng GitHub dùng `minh.nguyen@gmail.com`. Kết quả: tất cả commits hiện **avatar trống** trên GitHub. Minh code 50 commits mà profile vẫn trống trơn như chưa code gì. *Mất 2 tuần mới phát hiện!*

```bash
# Cấu hình tên (dùng tên thật hoặc username GitHub)
git config --global user.name "Tên Của Bạn"

# Cấu hình email (PHẢI trùng với email GitHub!)
git config --global user.email "your.email@example.com"
```

**Ví dụ:**
```bash
git config --global user.name "Nguyễn Văn Minh"
git config --global user.email "minh.nguyen@gmail.com"
```

### Xem cấu hình hiện tại

```bash
# Xem tất cả cấu hình
git config --list

# Xem từng giá trị
git config user.name
git config user.email
```

### Cấu hình Editor mặc định

> **Anh Hùng:** *"Nếu git mở Vim và em không biết thoát, nhấn `:q!` rồi Enter. Hoặc tốt hơn, cấu hình VS Code ngay từ đầu."* 😄

```bash
# Dùng VS Code (Khuyên dùng ⭐)
git config --global core.editor "code --wait"

# Dùng Vim (cho ai thích hardcore)
git config --global core.editor "vim"

# Dùng Notepad (Windows, đơn giản)
git config --global core.editor "notepad"
```

### Các cấu hình "bảo hiểm" nên làm ngay

```bash
# Màu sắc cho output (dễ đọc hơn)
git config --global color.ui auto

# Tên nhánh mặc định là 'main' (chuẩn mới, thay thế 'master')
git config --global init.defaultBranch main

# Xử lý line ending (QUAN TRỌNG khi team có cả Windows lẫn Mac!)
# → Trên Windows
git config --global core.autocrlf true
# → Trên macOS/Linux
git config --global core.autocrlf input
```

> **Chị Hà (Tech Lead):** *"Line ending là nguyên nhân #1 gây conflict vô nghĩa trong team có cả Windows lẫn Mac. Cấu hình từ đầu, tiết kiệm hàng giờ debug."*

### Cài đặt Alias — "Phím tắt cho developer lười (thông minh)"

```bash
# git status → git s (tiết kiệm 4 ký tự × 50 lần/ngày = 200 ký tự/ngày)
git config --global alias.s status

# git checkout → git co
git config --global alias.co checkout

# git branch → git b
git config --global alias.b branch

# git commit → git c
git config --global alias.c commit

# Xem log đẹp như phim (⭐ alias hay nhất)
git config --global alias.lg "log --oneline --graph --decorate --all"
```

> *Minh cài alias xong, thử `git lg` — thấy cây commit hiện ra đẹp như sơ đồ. "Ồ, Git cũng có thể đẹp!" anh nghĩ.*

---

## 🔐 Kết nối với GitHub — "Bắt tay" giữa máy bạn và cloud

### Phương pháp 1: HTTPS + Personal Access Token (Dễ nhất, cho người mới ⭐)

#### Bước 1: Tạo Personal Access Token trên GitHub

1. Đăng nhập GitHub
2. Vào **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
3. Click **Generate new token (classic)**
4. Đặt tên token (VD: "Laptop Minh"), chọn quyền:
   - ✅ `repo` (toàn quyền với repositories)
   - ✅ `workflow` (nếu dùng GitHub Actions)
5. Click **Generate token**
6. **⚠️ LƯU LẠI TOKEN NGAY** — chỉ hiện MỘT LẦN!

> **Sai lầm kinh điển:** *Linh tạo token xong, quên copy. Đóng trang web. Token biến mất. Phải tạo lại.* 🤦

#### Bước 2: Lưu token để không phải nhập lại mỗi lần

```bash
# Trên Windows (lưu vào Windows Credential Manager)
git config --global credential.helper wincred

# Trên macOS (lưu vào Keychain)
git config --global credential.helper osxkeychain

# Trên Linux (lưu tạm trong RAM)
git config --global credential.helper cache
```

Khi push/pull lần đầu, Git sẽ hỏi:
- **Username:** Tên GitHub của bạn
- **Password:** Dán Personal Access Token (KHÔNG phải password GitHub!)

### Phương pháp 2: SSH Key (Nâng cao, bảo mật hơn 🔒)

> **Anh Hùng:** *"HTTPS dùng cho lúc mới học. Sau này đi làm, hãy chuyển sang SSH — không bao giờ phải nhập password, bảo mật hơn, và tất cả công ty tech lớn đều dùng."*

#### Bước 1: Tạo SSH Key
```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
# Nhấn Enter 3 lần (chấp nhận mặc định)
```

#### Bước 2: Thêm SSH Key vào GitHub
```bash
# Copy public key
# macOS:
pbcopy < ~/.ssh/id_ed25519.pub

# Windows (Git Bash):
cat ~/.ssh/id_ed25519.pub
# Rồi copy toàn bộ output

# Linux:
cat ~/.ssh/id_ed25519.pub
```

1. Vào GitHub → **Settings** → **SSH and GPG keys**
2. Click **New SSH key**
3. Đặt tiêu đề (VD: "Laptop Minh - Windows"), dán public key
4. Click **Add SSH key**

#### Bước 3: Kiểm tra kết nối
```bash
ssh -T git@github.com
```

Kết quả mong đợi:
```
Hi username! You've successfully authenticated...
```

> *Minh thấy dòng "Hi minh-nguyen!" hiện lên, nở nụ cười. "Máy mình đã kết nối với GitHub. Bước đầu tiên hoàn thành!"*

---

## 🧪 Kiểm tra cấu hình hoàn chỉnh

```bash
echo "=== Git Version ==="
git --version

echo "=== User Info ==="
echo "Name: $(git config user.name)"
echo "Email: $(git config user.email)"

echo "=== Editor ==="
git config core.editor

echo "=== Default Branch ==="
git config init.defaultBranch
```

---

## 📝 Thực hành: Commit Đầu Đời của Minh

*Minh hồi hộp gõ từng lệnh:*

```bash
# Tạo thư mục dự án đầu tiên
mkdir my-first-repo
cd my-first-repo

# Khởi tạo Git repository
git init
# → Initialized empty Git repository in .../my-first-repo/.git/

# Tạo file đầu tiên
echo "# My First Repository" > README.md
echo "Đây là repo đầu tiên của Minh 🎉" >> README.md

# Kiểm tra trạng thái
git status
# → Untracked files: README.md (Git thấy file nhưng chưa theo dõi)

# Thêm file vào staging
git add README.md

# COMMIT ĐẦU TIÊN! 🎉
git commit -m "feat: Initial commit - Hello Git world!"

# Xem lịch sử
git log
```

> *Minh thấy commit đầu tiên hiện lên với tên mình. "Nguyễn Văn Minh" — commit đầu tiên trong đời. Anh chụp màn hình gửi cho mẹ: "Con vừa học được Git!"*
>
> *Mẹ: "Git là gì con? Ăn được không?"* 😄

---

## ⚠️ Lưu ý quan trọng

1. **Email GitHub**: Nên dùng email đã xác minh trên GitHub để commits được link đúng với tài khoản (có avatar, tính vào contribution)
2. **Personal Access Token**: Giữ bí mật, không commit vào code, không gửi qua chat
3. **SSH Key**: Nếu mất private key, phải tạo lại và cập nhật trên GitHub
4. **Cấu hình global vs local**: 
   - `--global`: Áp dụng cho TẤT CẢ repositories trên máy
   - Bỏ `--global`: Chỉ áp dụng cho repository HIỆN TẠI

---

## 🔍 Troubleshooting — Khi mọi thứ không như kỳ vọng

### Lỗi: `git: command not found`
→ Git chưa được cài đặt hoặc chưa được thêm vào PATH. Cài lại Git for Windows.

### Lỗi: `Permission denied (publickey)`
→ SSH key chưa được thêm vào GitHub. Quay lại bước "Thêm SSH Key vào GitHub".

### Lỗi: `fatal: could not read Username`
→ Chưa cấu hình credential helper hoặc token đã hết hạn. Tạo token mới.

### Lỗi: Mở Vim không biết thoát 😅
→ Nhấn `Esc`, gõ `:q!`, nhấn `Enter`. Rồi cấu hình VS Code làm editor mặc định.

---

## 📝 Tóm tắt

```
✅ Cài Git for Windows / Homebrew / apt-get
✅ git config user.name + user.email (PHẢI trùng GitHub!)
✅ git config core.editor "code --wait" 
✅ git config init.defaultBranch main
✅ Kết nối GitHub: HTTPS (token) hoặc SSH (key)
✅ Commit đầu tiên: git init → git add → git commit 🎉
```

---

## ➡️ Chuyện tiếp theo...

Minh đã có Git, đã có GitHub, đã commit được. Nhưng khi mở GitHub và thấy trang web trống — *"Repository ở đâu? Sao trên GitHub không thấy gì?"*

Anh chưa biết sự khác biệt giữa **local** và **remote** repository — và tại sao `git push` là lệnh quan trọng thứ hai mà anh cần học.

**→ [Bài 3: Khái niệm cơ bản về Repository](./03-repository-co-ban.md) — Minh khám phá "căn nhà" của dự án.**

---

## 🔗 Tài liệu tham khảo
- [Git Installation Guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [GitHub Authentication Guide](https://docs.github.com/en/authentication)
- [Setting up Git](https://docs.github.com/en/get-started/getting-started-with-git/setting-up-git)
