# Bài 6: Undo và Revert thay đổi

## 🎬 "API Key Trên GitHub Public" — Cuộc gọi lúc nửa đêm

*1 giờ sáng. Điện thoại Minh rung.*

> **Anh Hùng:** *"Minh! Em commit file `.env` lên repo PUBLIC rồi! Trong đó có API key của Stripe. Ai cũng thấy!"*
>
> **Minh (hoảng):** *"Ơ... em xóa file rồi commit lại được không?"*
>
> **Anh Hùng:** *"KHÔNG! Xóa file rồi commit mới chỉ giấu ở hiện tại. Lịch sử Git vẫn LƯU file cũ. Ai đọc git log vẫn thấy API key. Em cần REWRITE HISTORY."*
>
> **Minh:** *"Giống như... xóa ảnh trên Facebook nhưng người ta đã screenshot rồi?"*
>
> **Anh Hùng:** *"Chính xác. Bình tĩnh, anh hướng dẫn. Đầu tiên, rotate API key ngay đi — key cũ vô hiệu thì lộ cũng không sao. Rồi mình xử lý Git history sau."*

**Bài học đắt giá: Git NHỚ MỌI THỨ. Undo trong Git phức tạp hơn `Ctrl+Z`. Nhưng nếu hiểu đúng, bạn sẽ luôn có đường thoát.** 🔐

---

## 🎯 Mục tiêu
Sau bài này, bạn sẽ:
- Undo thay đổi chưa commit
- Unstage file đã add nhầm
- Sửa commit message hoặc thêm file quên
- Revert commit đã push (an toàn)
- Phân biệt rõ `restore`, `reset`, `revert` — ba "chiến thuật undo" khác nhau

---

## 🗺️ Bản đồ Undo — Biết mình đang ở đâu trước khi hành động

```
        CHƯA ADD               ĐÃ ADD              ĐÃ COMMIT           ĐÃ PUSH
     (Working Dir)         (Staging Area)         (Local Repo)        (Remote/GitHub)
    ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
    │ Sửa nhầm file│     │ Add nhầm file│     │ Commit sai   │     │ Push rồi undo│
    └──────┬───────┘     └──────┬───────┘     └──────┬───────┘     └──────┬───────┘
           │                    │                    │                    │
           ▼                    ▼                    ▼                    ▼
      git restore          git restore           git reset           git revert
                           --staged              --soft/--hard
```

> **Quy tắc vàng:** Càng đi xa (Working → Staging → Commit → Push), undo càng phức tạp.

---

## 🔄 Undo trong Working Directory — "Xóa bỏ nháp"

### Bạn sửa file nhưng muốn quay lại phiên bản cuối:

> *Minh sửa `styles.css` lung tung, càng sửa càng xấu. "Thôi, quay lại bản cũ!"*

```bash
# Hủy thay đổi 1 file (quay về phiên bản commit cuối)
git restore styles.css

# Hủy thay đổi TẤT CẢ file
git restore .
```

⚠️ **CẢNH BÁO LỚN:** Thay đổi sẽ **MẤT VĨNH VIỄN**! Không recovery được. Vì code chưa bao giờ được commit.

### Mẹo: Xem trước rồi hãy restore:

```bash
# Xem thay đổi sẽ bị mất
git diff styles.css

# Lưu lại "bản nháp" trước khi xóa (bảo hiểm)
git diff > backup.patch

# Restore (yên tâm vi đã backup)
git restore styles.css

# Nếu hối hận? Apply patch lại:
git apply backup.patch
```

---

## 📦 Unstage — "Lấy lại thư từ phong bì"

### Khi add nhầm file:

> *Minh `git add .` rồi nhận ra đã add cả file `debug.log` — không muốn commit file này.*

```bash
# Bỏ 1 file khỏi staging (file vẫn còn, chỉ bỏ khỏi "phong bì")
git restore --staged debug.log

# Bỏ TẤT CẢ khỏi staging
git restore --staged .
```

*File quay về Working Directory. Thay đổi vẫn còn. Chỉ là chưa sẵn sàng commit.*

---

## 🔧 Sửa commit — "Sửa thư trước khi bưu điện gửi đi"

### Sửa commit message (CHƯA PUSH):

> *Minh commit xong nhận ra message viết sai chính tả:*

```bash
# Sửa message commit cuối
git commit --amend -m "feat: Add login form validation"
```

### Thêm file quên vào commit cũ (CHƯA PUSH):

> *Minh commit "Add login page" nhưng quên add file `login.css`:*

```bash
git add login.css
git commit --amend --no-edit   # Thêm file, giữ nguyên message
```

⚠️ **Chỉ dùng khi CHƯA PUSH!** Amend tạo commit mới, thay thế commit cũ. Nếu đã push → phải force push → gây rắc rối cho team.

---

## ⏪ Git Reset — "Cỗ máy thời gian Local" (3 chế độ)

Reset cho phép quay ngược lại commit trước đó. Nhưng có **3 chế độ** — hiểu sai = mất code.

### Ẩn dụ: Bạn gửi 3 bức thư. Muốn hủy bức thứ 3.

| Chế độ | Ẩn dụ | Code | Staging | Commit |
|---|---|---|---|---|
| `--soft` | Lấy thư ra khỏi hòm, bỏ lại phong bì | ✅ Giữ | ✅ Giữ | ❌ Hủy |
| `--mixed` (mặc định) | Lấy thư ra, xé phong bì | ✅ Giữ | ❌ Hủy | ❌ Hủy |
| `--hard` | Lấy thư ra, xé luôn thư | ❌ **MẤT** | ❌ Hủy | ❌ Hủy |

### Reset Soft — An toàn nhất:

```bash
git reset --soft HEAD~1
# Hủy commit cuối, nhưng code vẫn trong staging
# → Sửa lại rồi commit mới
```

> *Minh hay dùng nhất: commit xong nhận ra thiếu file → reset soft → add thêm → commit lại.*

### Reset Mixed — Mặc định:

```bash
git reset HEAD~1         # Hoặc: git reset --mixed HEAD~1
# Hủy commit, code quay về working directory
# → Cần add lại trước khi commit mới
```

### Reset Hard — ☢️ VŨ KHÍ HẠT NHÂN:

```bash
git reset --hard HEAD~1
# Hủy commit VÀ XÓA CODE. Mất vĩnh viễn.
```

> **Anh Hùng:** *"`--hard` giống xé bức thư mà không photo. Chỉ dùng khi chắc chắn 100%. Chưa chắc? Dùng `--soft` trước, review lại rồi quyết."*

### Reset về commit cụ thể:

```bash
git reset --soft abc1234        # Quay về commit abc1234, giữ code
git reset --hard abc1234        # Quay về commit abc1234, XÓA mọi thứ sau đó ⚠️
```

---

## 🔙 Git Revert — "Viết thư xin lỗi" (An toàn cho code đã PUSH)

**Khác hoàn toàn với Reset!** Revert KHÔNG xóa lịch sử. Nó **tạo commit MỚI** để undo commit cũ.

> *Giống viết thư xin lỗi: "Thư trước tôi gửi, xin bỏ qua. Đây là thư mới đúng."*

### Revert commit cuối:

```bash
git revert HEAD
# Tạo commit mới để undo thay đổi của commit trước
# Lịch sử vẫn rõ ràng: "Commit A → Revert A"
```

### Revert commit cụ thể:

```bash
git revert abc1234
```

### Tại sao dùng Revert thay vì Reset cho code đã push?

| | Reset | Revert |
|---|---|---|
| Cách hoạt động | Xóa commit khỏi lịch sử | Tạo commit mới để undo |
| Lịch sử | ❌ Bị viết lại | ✅ Giữ nguyên |
| An toàn khi đã push | ❌ Gây rối cho team | ✅ An toàn |
| Khi nào dùng | Chưa push | Đã push |

> **Chị Hà:** *"Tại Shopee, KHÔNG AI được phép reset trên branch đã push. Mọi undo đều dùng revert. Lịch sử phải minh bạch — khi có sự cố production, audit trail là tất cả."*

---

## 📋 Kịch bản thực tế — Minh gặp đủ cả

### 😅 Kịch bản 1: Sửa nhầm file, chưa add

```bash
git diff                    # Xem thay đổi
git restore src/main.js     # Hủy bỏ, quay về bản commit cuối
```

### 📦 Kịch bản 2: Add nhầm file

```bash
git status                          # Kiểm tra file nào đã staged
git restore --staged debug.log      # Bỏ khỏi staging
```

### 📝 Kịch bản 3: Commit thiếu file

```bash
git add forgotten-file.js
git commit --amend --no-edit        # Thêm vào commit trước
```

### ✏️ Kịch bản 4: Commit message sai

```bash
git commit --amend -m "Message đúng"    # Nếu chưa push
```

### 🔙 Kịch bản 5: Undo commit đã push (AN TOÀN)

```bash
git revert HEAD          # Tạo commit mới để undo
git push                 # Push commit revert lên GitHub
```

### 🧹 Kịch bản 6: Muốn clean hoàn toàn

```bash
git reset --hard HEAD    # Xóa MỌI thay đổi chưa commit
git clean -fd            # Xóa cả file mới chưa được Git track
# ⚠️ Không recovery được!
```

---

## 💾 Recovery — "Bảo hiểm cuối cùng" khi mọi thứ sai

### Git Reflog — Camera quay lại mọi hành động:

> *Minh lỡ `reset --hard`, mất code. Hoảng loạn. Anh Hùng bảo:*

```bash
git reflog
# a1b2c3d HEAD@{0}: reset: moving to HEAD~1          ← Reset lúc này
# e4f5g6h HEAD@{1}: commit: feat: Add payment page   ← Code "mất" ở đây!
# i7j8k9l HEAD@{2}: commit: feat: Add cart page
```

```bash
# Khôi phục về commit trước khi reset!
git reset --hard e4f5g6h         # Quay về "feat: Add payment page"
# → Code trở lại! 🎉
```

> **Anh Hùng:** *"Reflog là bảo hiểm cuối cùng. Git lưu mọi hành động trong 90 ngày. Chỉ cần đừng xóa thư mục `.git/`."*

### Khôi phục file đã xóa:

```bash
git restore --source=HEAD~1 deleted-file.js
# Lấy file từ commit trước về
```

---

## 📊 Bảng tra cứu nhanh — "Bản đồ undo"

| Tình huống | Dùng gì | An toàn? |
|---|---|---|
| Sửa nhầm file, chưa add | `git restore <file>` | ⚠️ Mất thay đổi |
| Add nhầm file | `git restore --staged <file>` | ✅ An toàn |
| Commit sai message (chưa push) | `git commit --amend -m "..."` | ✅ An toàn |
| Undo commit (chưa push), giữ code | `git reset --soft HEAD~1` | ✅ An toàn |
| Undo commit (chưa push), xóa code | `git reset --hard HEAD~1` | ❌ Mất code |
| Undo commit (đã push) | `git revert HEAD` | ✅ An toàn |
| Khôi phục sau reset sai | `git reflog` + `git reset` | ✅ Cứu nguy |

---

## ⚠️ Lưu ý quan trọng

1. **Force Push** = ☢️ Chỉ dùng trên branch cá nhân, KHÔNG trên main
2. **Reset --hard** = Mất code vĩnh viễn (trừ khi dùng reflog kịp)
3. **Xử lý secrets bị push**: Rotate key NGAY → Revert hoặc force push → Thêm `.gitignore`
4. **Nghi ngờ?** → Dùng `--soft` trước, review, rồi quyết

---

## 🔍 Troubleshooting

### Lỗi: `Your branch is ahead of 'origin/main' by 1 commit`
→ Đã commit local nhưng chưa push. Nếu muốn bỏ: `git reset --soft HEAD~1`

### Lỗi: `Updates were rejected`
→ Đã sửa history local nhưng remote khác. Cần `git pull --rebase` hoặc force push (cẩn thận!)

### "Tôi reset nhầm, mất hết code rồi!"
→ Bình tĩnh: `git reflog` → tìm commit cần khôi phục → `git reset --hard <hash>`

---

## 📝 Tóm tắt

| Lệnh | Ẩn dụ |
|---|---|
| `git restore <file>` | Xóa bản nháp, lấy bản cũ |
| `git restore --staged <file>` | Lấy thư ra khỏi phong bì |
| `git commit --amend` | Sửa thư trước khi gửi |
| `git reset --soft HEAD~1` | Lấy thư về, giữ nguyên nội dung |
| `git reset --hard HEAD~1` | Xé thư luôn (☢️) |
| `git revert HEAD` | Viết thư xin lỗi (commit mới để undo) |
| `git reflog` | Camera an ninh — xem lại mọi hành động |

---

## ➡️ Chuyện tiếp theo...

6 bài cơ bản hoàn thành. 🎉 Minh đã biết tạo repo, commit, push, xem lịch sử, và undo.

Nhưng bài tập lớn không phải làm một mình. Minh, Linh, và một bạn nữa cần code **cùng lúc** trên cùng một dự án. 

*"Nếu cả 3 người cùng sửa file `app.js` — chuyện gì xảy ra?"*

Câu trả lời nằm ở khái niệm quan trọng nhất trong Git teamwork: **Branch.**

**→ [Phần 2: Làm việc nhóm — Branch và Checkout](./../02-lam-viec-nhom/01-branch-checkout.md) — Khi một dự án có nhiều "vũ trụ song song", và bạn cần học cách nhảy giữa chúng.**

---

## 🔗 Tài liệu tham khảo
- [Git Documentation - Undoing Things](https://git-scm.com/book/en/v2/Git-Basics-Undoing-Things)
- [Git Reset Documentation](https://git-scm.com/docs/git-reset)
- [Oh Shit, Git!?!](https://ohshitgit.com/) — Trang web cứu nguy cho developer
