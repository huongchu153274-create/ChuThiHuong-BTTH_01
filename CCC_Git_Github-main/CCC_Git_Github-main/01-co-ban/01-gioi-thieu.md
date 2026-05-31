# Bài 1: Giới thiệu Git và GitHub

> *"Người ta không nhớ bạn nói gì. Người ta nhớ bạn khiến họ cảm thấy thế nào."* — Maya Angelou

---

## 🎬 Đêm Thứ Sáu Đen Tối

*2 giờ sáng, thứ Sáu.*

Minh nhìn màn hình laptop với đôi mắt đỏ ngầu. Bài tập lớn deadline sáng thứ Hai. Anh đã code liên tục 6 tiếng, chức năng đăng nhập gần xong. Mọi thứ hoạt động hoàn hảo.

*"Mình save cái đã rồi ngủ,"* Minh nghĩ.

Nhưng rồi tay Minh run vì thiếu ngủ. Thay vì `Ctrl+S`, Minh bấm `Ctrl+A` rồi `Delete`. Toàn bộ file `login.js` — 300 dòng code — **biến mất**.

`Ctrl+Z`? Quá nhiều thay đổi, không recover được. File backup? Không có. Google Drive? Chỉ sync file Word.

Minh ngồi đó, giữa đêm, nhìn màn hình trống. 6 tiếng công sức. Tan thành mây khói. 😱

**Nếu Minh biết Git, điều này sẽ KHÔNG BAO GIỜ xảy ra.**

---

## 🎯 Mục tiêu
Sau bài này, bạn sẽ:
- Hiểu Git là gì và tại sao cần Git
- Hiểu GitHub là gì và mối quan hệ với Git
- Nắm được các khái niệm cơ bản về Version Control
- Biết khi nào nên sử dụng Git

---

## 📖 Git Ra Đời: Câu chuyện của Linus Torvalds

Năm 2005, **Linus Torvalds** — cha đẻ của Linux — gặp vấn đề tương tự Minh, nhưng ở quy mô khổng lồ.

Linux kernel có **hàng nghìn developer** trên toàn thế giới cùng đóng góp code. Công cụ quản lý code cũ (BitKeeper) bỗng nhiên thu phí. Linus cần một giải pháp mới.

*"Tôi sẽ tự viết,"* Linus nói.

Và ông viết Git trong... **10 ngày**.

Không phải vì ông giỏi (dù ông giỏi thật). Mà vì ông đã *đau đớn đủ lâu* với vấn đề quản lý code để hiểu chính xác cần xây dựng gì.

**Git** là một hệ thống kiểm soát phiên bản phân tán (Distributed Version Control System - DVCS). Nó giải quyết 3 nỗi đau lớn nhất của developer:

```
┌─────────────────────────────────────────────────────────────┐
│  NỖI ĐAU #1: Mất code              → Git LƯU MỌI THỨ     │
│  NỖI ĐAU #2: Làm nhóm hỗn loạn    → Git QUẢN LÝ NHÓM     │
│  NỖI ĐAU #3: Không biết ai sửa gì  → Git THEO DÕI TẤT CẢ │
└─────────────────────────────────────────────────────────────┘
```

### Tại sao cần Git? — Ba câu chuyện thực tế

**🔴 Kịch bản 1: Mất code (Chuyện của Minh)**

Như bạn đã thấy ở đầu bài. Với Git, Minh chỉ cần một lệnh để lấy lại toàn bộ:
```bash
git checkout -- login.js   # Khôi phục file về phiên bản cuối cùng đã lưu
```
*3 giây. Xong. Đi ngủ.*

**🔴 Kịch bản 2: Làm việc nhóm hỗn loạn (Chuyện của nhóm BTL)**

3 người cùng làm việc trên một file. Ai cũng copy file về máy, chỉnh sửa riêng. Khi hợp nhất lại, code bị conflict, mất mát thay đổi, không biết ai làm gì... 😵

Với Git: Mỗi người một branch, merge tự động, conflict được đánh dấu rõ ràng.

**🔴 Kịch bản 3: "Ai sửa cái này?" (Chuyện của anh Hùng)**

*Anh Hùng — Senior Developer tại FPT — kể:*

> *"Một lần, website sập lúc 3 giờ sáng. Sếp gọi: 'Ai commit code cuối cùng?' Nhờ Git, tôi gõ `git log -1` — biết ngay ai, lúc mấy giờ, sửa những gì. Một dòng lệnh = 2 tiếng đi tìm."*

---

## 🕹️ Hiểu Git qua Ẩn Dụ: "Cỗ Máy Thời Gian Cho Code"

Hãy tưởng tượng bạn có một **cỗ máy thời gian**, nhưng chỉ dành riêng cho code:

| Khái niệm Git | Ẩn dụ | Ví dụ thực tế |
|---|---|---|
| **Commit** | 📸 Chụp ảnh "hiện trường" | *"15/3, 14:30 — Vừa xong form đăng nhập"* |
| **Branch** | 🌍 Tạo vũ trụ song song | *"Thử thêm nút Google Login mà không sợ hỏng code cũ"* |
| **Merge** | 🔗 Hợp nhất hai vũ trụ | *"Cả hai thử nghiệm đều tốt, ghép lại!"* |
| **Push** | ☁️ Gửi lên cloud | *"Backup lên GitHub để ngủ yên tâm"* |
| **Pull** | ⬇️ Kéo về từ cloud | *"Lấy code mới nhất team vừa push"* |
| **Clone** | 📋 Copy toàn bộ dự án | *"Ngày đầu đi làm, clone repo về máy"* |

---

## 📦 GitHub là gì?

**GitHub** là một dịch vụ hosting cho Git repositories trên cloud.

**Anh Hùng** giải thích cho Minh bằng ví dụ đơn giản:

> *"Git giống như album ảnh trên điện thoại. GitHub giống Google Photos. Ảnh vẫn ở điện thoại, nhưng Google Photos backup lên cloud, chia sẻ với người khác, và an toàn khi mất điện thoại."*

### Mối quan hệ Git và GitHub:

```
Git (Local)                    GitHub (Remote)
┌─────────────┐               ┌──────────────┐
│   Máy bạn   │               │   Internet   │
│             │               │              │
│ ┌─────────┐ │   Push/Pull   │ ┌──────────┐ │
│ │ Repository│ │ ◄──────────► │ │Repository│ │
│ │ (Local)  │ │               │ │(Remote)  │ │
│ └─────────┘ │               │ └──────────┘ │
└─────────────┘               └──────────────┘
```

GitHub cung cấp:
- ☁️ Lưu trữ code trên internet (backup tự động)
- 🖥️ Giao diện web để quản lý code (không cần Terminal)
- 👥 Hỗ trợ làm việc nhóm (Pull Request, Issues, Projects)
- 🤖 CI/CD tích hợp (GitHub Actions — tự động test, deploy)
- 🔍 Code review tools (nhận xét từng dòng code)

---

## 🔑 Khái niệm cơ bản — qua Câu chuyện

### 1. Repository (Repo) — "Căn nhà của dự án"

Repository là nơi chứa toàn bộ lịch sử và code của dự án. Mỗi repo giống một căn nhà — có phòng (thư mục), đồ đạc (files), và album ảnh (lịch sử commit).

```
my-project/
├── README.md          ← "Tấm biển tên nhà"
├── src/
│   └── main.js        ← "Phòng làm việc chính"
└── .git/              ← "Hầm lưu trữ bí mật" — Git lưu lịch sử ở đây
```

### 2. Commit — "Chụp ảnh lưu niệm"

Một snapshot (ảnh chụp) của code tại một thời điểm. Mỗi khi bạn hoàn thành một việc, hãy "chụp ảnh" lại:

```
Commit 1: "Thêm tính năng đăng nhập"      ← Ảnh lúc xây xong phòng khách
Commit 2: "Sửa bug validation"            ← Ảnh lúc sửa xong ống nước
Commit 3: "Thêm API endpoint mới"         ← Ảnh lúc lắp thêm cửa sổ
```

*Bất kỳ lúc nào, bạn có thể "lật album" quay lại xem phòng khách lúc mới xây.*

### 3. Branch (Nhánh) — "Vũ trụ song song"

Branch cho phép bạn tạo một "bản sao" để thử nghiệm mà không ảnh hưởng bản gốc:

```
main (production)          ← Vũ trụ chính, ổn định
├── feature/login          ← Vũ trụ 1: Thử thêm đăng nhập
├── feature/dashboard      ← Vũ trụ 2: Thử thêm dashboard
└── bugfix/validation      ← Vũ trụ 3: Sửa bug
```

*Nếu thử nghiệm thành công → merge vào main. Nếu thất bại → xóa branch, main không bị ảnh hưởng.*

### 4. Merge (Hợp nhất) — "Kết hợp hai vũ trụ"
Kết hợp thay đổi từ nhánh này sang nhánh khác. Giống như ghép hai mảnh puzzle lại với nhau.

### 5. Clone — "Photocopy cả căn nhà"
Sao chép toàn bộ repository từ remote về local. Ngày đầu đi làm, việc đầu tiên là `git clone`.

### 6. Pull — "Cập nhật tin tức mới nhất"
Lấy thay đổi mới từ remote về local. Giống check email buổi sáng.

### 7. Push — "Gửi bài lên cho thầy"
Gửi thay đổi từ local lên remote. Code xong → push → team thấy.

---

## 📊 Workflow cơ bản — Một ngày của Minh

```
Sáng: Minh đến công ty
  │
  ├─ 1. git pull origin main              ← "Lấy code mới nhất"
  │
  ├─ 2. git checkout -b feature/login     ← "Tạo vũ trụ song song"
  │
  ├─ 3. Viết code... (2 tiếng)            ← "Làm việc"
  │
  ├─ 4. git add .                         ← "Đánh dấu file cần lưu"
  │
  ├─ 5. git commit -m "feat: Add login"   ← "Chụp ảnh lưu niệm"
  │
  ├─ 6. git push origin feature/login     ← "Gửi lên GitHub"
  │
  ├─ 7. Tạo Pull Request trên GitHub      ← "Xin review code"
  │
  ├─ 8. Anh Hùng review, comment          ← "Mentor nhận xét"
  │
  └─ 9. Merge vào main                    ← "Hoàn thành! 🎉"
```

---

## 🏢 BÊN TRONG NGÀNH: Git được dùng như thế nào?

**Anh Hùng** kể cho Minh nghe trong buổi mentor đầu tiên:

> *"Ở FPT, mỗi ngày team 15 người tạo khoảng 50-80 commits. Nếu không có Git, sẽ là 15 người gửi file qua Zalo, email, USB... Hỗn loạn!*
>
> *Ở Google, mỗi ngày có khoảng **45.000 commits** vào kho code chung. 45 nghìn. Mỗi. Ngày. Không có version control = không có Google."*

Minh mở to mắt: *"Vậy Git là... bắt buộc?"*

Anh Hùng cười: *"Git không phải 'nên học'. Git là 'không biết thì đừng đi phỏng vấn.'"*

| Công ty | Số commits/ngày | Developers |
|---|---|---|
| Google | ~45.000 | 27.000+ |
| Microsoft | ~30.000 | 20.000+ |
| Facebook | ~20.000 | 15.000+ |
| FPT Software | ~500-1.000 | Theo dự án |

---

## 🎯 Khi nào nên sử dụng Git?

### ✅ Nên dùng Git khi:
- 💻 Làm dự án lập trình (bất kỳ ngôn ngữ nào)
- 📝 Viết sách, tài liệu (Markdown, LaTeX)
- ⚙️ Quản lý cấu hình hệ thống
- 📄 Bất kỳ file text nào cần theo dõi thay đổi

### ❌ Không cần Git cho:
- 🎥 File binary lớn (video, hình ảnh thô - nên dùng Git LFS)
- 📁 File tạm thời
- 🏗️ File build output

---

## 💡 Lợi ích thực tế — Qua góc nhìn từng vai trò

### 👤 Với Minh (Sinh viên / Cá nhân):
- ✅ **Backup code tự động** — Không bao giờ lặp lại "Đêm Thứ Sáu Đen Tối"
- ✅ **So sánh các phiên bản** — Code hôm nay vs hôm qua
- ✅ **Rollback khi có lỗi** — Quay ngược thời gian
- ✅ **Portfolio trên GitHub** — Nhà tuyển dụng xem code của bạn

### 👥 Với Linh, Minh và nhóm BTL (Team):
- ✅ **Làm việc song song** — Mỗi người một branch
- ✅ **Code review dễ dàng** — Pull Request trên GitHub
- ✅ **Theo dõi ai làm gì** — `git blame` cho biết từng dòng
- ✅ **Quản lý releases** — Tag phiên bản v1.0, v2.0

### 👔 Với chị Hà (Tech Lead / Quản lý):
- ✅ **Kiểm soát quy trình** — Branch protection rules
- ✅ **Branch protection** — Không ai được push thẳng vào main
- ✅ **Quản lý permissions** — Ai được merge, ai chỉ được đọc
- ✅ **Báo cáo và metrics** — Đo productivity, review time

---

## 🔍 Trước và Sau Git — Cảm nhận sự khác biệt

### ❌ Trước khi có Git:
```
Developer A: "Tôi đã sửa file config.js"
Developer B: "Tôi cũng sửa file config.js"
Developer C: "Giờ file nào đúng? 😱"

→ Gửi file qua Zalo: config_v1.js, config_v2_final.js, 
  config_v2_final_REAL.js, config_DUNGXOA.js
```

### ✅ Sau khi có Git:
```
Developer A: Tạo branch, commit, push
Developer B: Tạo branch, commit, push  
Developer C: Xem diff, merge conflict (nếu có), approve
→ Tất cả được ghi lại và quản lý tự động! ✅
```

---

## 📝 Tóm tắt

| Khái niệm | Một dòng giải thích |
|---|---|
| **Git** | Cỗ máy thời gian cho code — lưu mọi phiên bản |
| **GitHub** | Google Photos cho code — backup và chia sẻ trên cloud |
| **Repository** | Căn nhà của dự án — chứa code và lịch sử |
| **Commit** | Chụp ảnh lưu niệm — snapshot tại một thời điểm |
| **Branch** | Vũ trụ song song — thử nghiệm không sợ hỏng |
| **Push/Pull** | Gửi bài / Nhận bài — đồng bộ Local ↔ Remote |

---

## ➡️ Chuyện tiếp theo...

Minh về nhà, mở laptop. *"OK, mình sẽ học Git."*

Nhưng khi mở Terminal, Minh nhìn dòng chữ nhấp nháy và tự hỏi: *"Bắt đầu từ đâu? Cài đặt như thế nào? Máy mình là Windows mà?"*

Anh chưa biết rằng commit đầu tiên trong đời sẽ đến ngay bài tới — và spoiler: **lần đầu sẽ sai.** 😅

**→ [Bài 2: Cài đặt và Cấu hình Git](./02-cai-dat.md) — Minh chuẩn bị vũ khí cho hành trình phía trước.**

---

## 🔗 Tài liệu tham khảo
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Git - The Simple Guide](http://rogerdudler.github.io/git-guide/)
- [A Short History of Git](https://git-scm.com/book/en/v2/Getting-Started-A-Short-History-of-Git)
