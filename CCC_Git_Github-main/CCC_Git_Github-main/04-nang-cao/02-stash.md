# Bài 20: Git Stash — "Ngăn Kéo Bí Mật"

## 🎬 "Đang Code Dở Thì Sếp Gọi Fix Bug Gấp!"

*Thứ Ba, 15:00. Minh đang code dở feature "Thêm sản phẩm vào giỏ hàng" — sửa được 60%, chưa xong.*

*Slack notification đỏ rực:*

> **Chị Hà:** *"@all Bug critical trên production! Trang thanh toán crash. Minh fix gấp!"*

*Minh panic: "Mình đang code dở! Commit bây giờ thì code chưa chạy. Xóa đi thì mấy tiếng code mất trắng. Checkout branch khác thì Git không cho vì có uncommitted changes!"*

*Anh Hùng nói: "Dùng `git stash`. Cất code dở vào 'ngăn kéo bí mật'. Working directory sạch sẽ. Fix bug xong → mở ngăn kéo → lấy code dở ra, code tiếp."*

```bash
git stash -u -m "WIP: Cart feature - 60% done"   # Cất vào ngăn kéo
git checkout hotfix/payment-crash                   # Fix bug production
# ... fix bug, commit, push, deploy ...
git checkout feature/cart                           # Quay lại
git stash pop                                       # Mở ngăn kéo → code dở trở lại!
```

*Minh thở phào. Code dở vẫn nguyên. Bug production đã fix. Không ai biết anh đang hoảng.* 😅

---

## 🎯 Mục tiêu
Sau bài này, bạn sẽ:
- Biết Stash là gì và khi nào dùng
- Lưu/lấy lại thay đổi với stash
- Quản lý nhiều stash entries
- Dùng stash trong workflow thực tế

---

## 📦 Stash là gì? — "Ngăn kéo cất đồ tạm"

**Stash** = Lưu tạm thay đổi chưa commit vào "ngăn kéo". Working directory trở nên sạch → bạn tự do checkout, pull, làm việc khác.

### Khi nào cần Stash?

| Tình huống | Giải pháp |
|---|---|
| Đang code dở, cần fix bug gấp | `git stash` → fix bug → `git stash pop` |
| Muốn pull nhưng có uncommitted changes | `git stash` → `git pull` → `git stash pop` |
| Muốn thử code trên branch khác | `git stash` → checkout → test → quay lại → `git stash pop` |
| Commit chưa sẵn sàng nhưng cần đổi branch | `git stash` = "bookmark" cho code dở |

---

## 💾 Stash Cơ Bản

### Cất vào ngăn kéo:

```bash
git stash                                         # Cất nhanh
git stash -m "WIP: Cart feature - add to cart"    # Cất + message (⭐ khuyên dùng)
git stash -u                                       # Cất cả file mới chưa track
git stash -u -m "WIP: Including new files"        # Combo tốt nhất
```

### Xem danh sách ngăn kéo:

```bash
git stash list
# stash@{0}: On feature/cart: WIP: Cart feature - add to cart
# stash@{1}: On main: WIP: Quick experiment
# stash@{2}: On feature/login: Before rebase
```

*→ `stash@{0}` = mới nhất. Số càng cao = càng cũ.*

### Lấy ra khỏi ngăn kéo:

```bash
# Pop = Lấy ra VÀ xóa khỏi list (dùng thường xuyên nhất)
git stash pop                # Lấy mới nhất
git stash pop stash@{2}      # Lấy cụ thể

# Apply = Lấy ra NHƯNG vẫn giữ trong list (copy, không move)
git stash apply              # Khi muốn apply vào nhiều branches
git stash apply stash@{1}
```

### Xem nội dung stash (trước khi lấy):

```bash
git stash show               # Tên file đã thay đổi
git stash show -p             # Xem diff chi tiết
git stash show -p stash@{1}   # Xem stash cụ thể
```

### Xóa stash:

```bash
git stash drop               # Xóa mới nhất
git stash drop stash@{2}     # Xóa cụ thể
git stash clear              # ⚠️ Xóa TẤT CẢ — không recovery!
```

---

## 🎯 Kịch bản thực tế

### Kịch bản 1: Fix bug gấp giữa chừng

```bash
# Đang code feature/cart, code dở
git stash -u -m "WIP: Cart - add to cart button 60%"

# Fix bug
git checkout main && git pull
git checkout -b hotfix/payment
# ... fix bug ...
git commit -m "fix: Payment crash on null address"
git push -u origin hotfix/payment
# Tạo PR, merge

# Quay lại feature
git checkout feature/cart
git stash pop
# → Code dở trở lại, tiếp tục! ✅
```

### Kịch bản 2: Pull khi có uncommitted changes

```bash
# Git báo "Cannot pull with uncommitted changes"
git stash
git pull origin main
git stash pop
# → Code mới + code cũ merge lại ✅
```

### Kịch bản 3: Tạo branch từ stash

```bash
# Code dở hóa ra nên ở branch riêng
git stash
git stash branch feature/new-idea
# → Branch mới + code dở tự apply vào ✅
```

---

## 💡 Best Practices

1. **LUÔN dùng message:** `git stash -m "WIP: mô tả"` — 10 stash không message = không biết cái nào là cái nào
2. **Dùng `-u`** để stash cả file mới — mặc định stash chỉ lưu tracked files
3. **Pop > Apply** trong hầu hết trường hợp — giữ stash list sạch
4. **Stash = tạm thời** — Đừng dùng stash thay cho commit. Stash > 1 tuần = nên commit
5. **Cleanup định kỳ:** `git stash list` → drop stash cũ không dùng

---

## ⚠️ Lưu ý quan trọng

1. **Stash không liên kết branch** — Có thể pop stash ở branch khác (cẩn thận!)
2. **Stash có thể conflict** — Khi pop, nếu code đã thay đổi → conflict, resolve như merge
3. **`git stash clear` không recovery được** — Xóa là mất vĩnh viễn
4. **Stash an toàn khi reset** — `git reset --hard` không ảnh hưởng stash

---

## 📝 Tóm tắt

| Lệnh | Ẩn dụ |
|---|---|
| `git stash -u -m "message"` | Cất đồ vào ngăn kéo |
| `git stash list` | Xem danh sách ngăn kéo |
| `git stash pop` | Lấy đồ ra, đóng ngăn kéo |
| `git stash apply` | Copy đồ ra, vẫn giữ trong ngăn kéo |
| `git stash show -p` | Nhìn vào ngăn kéo mà không lấy ra |
| `git stash drop` | Vứt đồ trong ngăn kéo |
| `git stash branch <name>` | Biến đồ trong ngăn kéo thành branch mới |

---

## ➡️ Chuyện tiếp theo...

*Minh đã biết stash, rebase. Các kỹ thuật nâng cao đã nắm.*

*Bây giờ anh tự hỏi: "OK, mình biết từng lệnh. Nhưng workflow HOÀN CHỈNH từ khi nhận task đến khi deploy — nhìn như thế nào?"*

*Anh Hùng: "Tốt lắm! Câu hỏi đúng. Đây là lúc em kết hợp mọi thứ thành một pipeline hoàn chỉnh."*

**→ [Phần 5: Kịch bản Thực tế](./../05-kich-ban/01-feature-development.md) — Ngày đầu đi làm: Từ task trên Jira đến code trên production.**

---

## 🔗 Tài liệu tham khảo
- [Git Stash Documentation](https://git-scm.com/docs/git-stash)
- [Atlassian - Git Stash](https://www.atlassian.com/git/tutorials/saving-changes/git-stash)
