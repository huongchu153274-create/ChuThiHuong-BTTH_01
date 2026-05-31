# Bài 19: Rebase — Viết Lại Lịch Sử

## 🎬 "Nhật Ký Hỗn Loạn" — Khi Anh Hùng Xem Git Log Của Minh

*Minh tự tin mở Pull Request đầu tiên trong đời. Hào hứng chờ review.*

*5 phút sau, anh Hùng comment:*

> *"Em ơi, anh nhìn commit history của em này..."*

```
* fix typo
* fix
* update
* WIP
* fix bug
* asjhgdjahsgd                    (commit lúc 3 giờ sáng)
* DONE FINALLY
* feat: Add login page            (commit đầu tiên — đẹp)
```

> *"Commit history này giống nhật ký người mất trí nhớ. 6 tháng sau em quay lại đọc — em hiểu 'fix' ở đây là fix cái gì không?"*

*Minh đỏ mặt.*

> *"Đừng lo," anh Hùng cười. "Git có một công cụ thần kỳ: **Interactive Rebase**. Nó cho em **viết lại lịch sử** — gộp 8 commits rối thành 2 commits sạch sẽ, có ý nghĩa."*
>
> *"Giống viết nháp. Xong rồi biên tập lại thành bản chính thức trước khi nộp giáo sư."*

---

## 🎯 Mục tiêu
Sau bài này, bạn sẽ:
- Hiểu Rebase là gì và khác Merge ở đâu
- Dùng Interactive Rebase để dọn dẹp commit history
- Biết Quy Tắc Vàng: **khi nào ĐƯỢC rebase, khi nào CẤM**
- Xử lý conflict trong rebase

---

## 🔀 Rebase vs Merge — Hai con đường, một đích đến

### Merge: Giữ nguyên lịch sử (có nhánh)

```
main:     A───B───E───F───M (merge commit)
               \         /
feature:        C───D────┘
```

### Rebase: Viết lại lịch sử (thẳng)

```
Trước rebase:
main:     A───B───E───F
               \
feature:        C───D

Sau rebase:
main:     A───B───E───F
                        \
feature:                 C'───D'
(C' và D' = copy của C, D nhưng "gắn" sau F)

Sau merge (fast-forward):
main:     A───B───E───F───C'───D'
(Lịch sử thẳng, gọn, đẹp!)
```

> *"Rebase giống chép lại bài thi," anh Hùng giải thích. "Nội dung không đổi, nhưng trình bày đẹp hơn, sạch hơn."*

---

## 🧹 Interactive Rebase — "Biên Tập Viên" Cho Commits

### Bước 1: Mở Interactive Rebase

```bash
git rebase -i HEAD~8    # Sửa 8 commits gần nhất
```

Git mở editor — danh sách commits và menu hành động:

```
pick abc1234 feat: Add login page
pick def5678 WIP
pick ghi9012 fix bug
pick jkl3456 asjhgdjahsgd
pick mno7890 DONE FINALLY
pick pqr1234 fix
pick stu5678 update
pick vwx9012 fix typo

# Commands:
# p, pick   = Giữ nguyên commit
# r, reword = Đổi message
# e, edit   = Sửa commit
# s, squash = Gộp vào commit trước (giữ message)
# f, fixup  = Gộp vào commit trước (bỏ message)
# d, drop   = Xóa commit
```

### Bước 2: Viết lại kế hoạch

```
pick abc1234 feat: Add login page
fixup def5678 WIP                      ← Gộp vào commit trên
fixup ghi9012 fix bug                  ← Gộp
fixup jkl3456 asjhgdjahsgd             ← Gộp
fixup mno7890 DONE FINALLY             ← Gộp
pick pqr1234 fix                       ← Giữ riêng
reword stu5678 update                  ← Đổi message
fixup vwx9012 fix typo                 ← Gộp vào commit trên
```

### Bước 3: Save và đóng editor

**Kết quả:**
```
Trước:  8 commits hỗn loạn 😱
Sau:    2 commits sạch sẽ ✨

* abc1234 feat: Add login page with validation
* pqr5678 fix: Resolve Safari compatibility issue
```

> *Minh mở lại PR. Anh Hùng nhìn: "Đẹp hơn nhiều. 2 commits, mỗi commit rõ ràng. Approve." ✅*

---

## 📊 Rebase cơ bản — Cập nhật branch từ main

### Thay vì merge main vào feature:

```bash
# ❌ Merge: Tạo merge commit, lịch sử có nhánh
git checkout feature/login
git merge main

# ✅ Rebase: Lịch sử thẳng, gọn
git checkout feature/login
git rebase main
```

### Rebase từ remote:

```bash
git pull --rebase origin main
# = git fetch + git rebase origin/main
# → Đặt commits của bạn SAU commits mới từ main
```

---

## ⚠️ QUY TẮC VÀNG — Đọc 3 lần, nhớ cả đời

### ✅ ĐƯỢC rebase khi:
- Branch **CÁ NHÂN** của bạn — chưa ai dùng
- Chưa push, hoặc push nhưng chỉ mình bạn dùng
- Muốn dọn dẹp trước khi tạo PR

### ❌ CẤM rebase khi:
- Branch **CHUNG** — main, develop, release
- Branch đã push mà **người khác đang dùng**
- Branch đã được merge

> **Tại sao?** Rebase **viết lại lịch sử**. Tưởng tượng bạn sửa lại sách giáo khoa mà cả lớp đang dùng. Mở sách ra, trang 50 không khớp nữa. **Hỗn loạn.**

```bash
# ✅ An toàn
git checkout feature/my-login    # Branch CÁ NHÂN
git rebase main                  # OK!

# ❌ CẤM TUYỆT ĐỐI
git checkout main                # Branch CHUNG
git rebase feature/login         # KHÔNG! 💥
```

> **Anh Hùng:** *"Tại Google, có quy tắc bất thành văn: 'Rebase history cá nhân — KHÔNG BAO GIỜ rebase history chung.' Vi phạm = mất cà phê cả tuần cho team."*

---

## 🔧 Xử lý Conflict trong Rebase

Rebase áp dụng từng commit một. Conflict có thể xảy ra ở MỖI commit.

```bash
git rebase main
# CONFLICT in src/app.js ← Conflict tại commit thứ 2

# 1. Resolve conflict (sửa file)
# 2. Stage
git add src/app.js

# 3. Tiếp tục rebase
git rebase --continue    # ← Áp dụng commit tiếp theo

# Nếu conflict tiếp → lặp lại bước 1-3
```

### Hủy rebase (nếu quá phức tạp):

```bash
git rebase --abort       # Quay lại như chưa từng rebase
```

### Skip commit (nếu commit không còn cần thiết sau resolve):

```bash
git rebase --skip        # Bỏ qua commit hiện tại
```

---

## 🏢 Workflow chuyên nghiệp: Rebase trước PR

> **Chị Hà:** *"Workflow tại Shopee: Code xong → Rebase interactive để dọn commits → Push → Tạo PR. PR nào history sạch = approve nhanh. PR nào history bẩn = yêu cầu dọn lại."*

```bash
# 1. Code xong trên feature branch (nhiều WIP commits)
# 2. Rebase interactive dọn dẹp
git rebase -i main

# 3. Push (force push vì đã rewrite history)
git push --force-with-lease origin feature/login
# ← --force-with-lease an toàn hơn --force (kiểm tra trước khi ghi đè)

# 4. Tạo PR trên GitHub → history sạch → easy review
```

---

## 📊 So sánh tổng hợp

| | **Merge** | **Rebase** |
|---|---|---|
| Lịch sử | Có nhánh, rõ ràng | Thẳng, gọn |
| Tạo commit mới | Merge commit | Không |
| An toàn | ✅ Không đổi history | ⚠️ Rewrite history |
| Dùng cho | Branch chung, đã push | Branch riêng |
| Ưu điểm | An toàn, trung thực | Sạch, dễ đọc |
| Nhược điểm | History phức tạp với nhiều nhánh | Nguy hiểm nếu dùng sai |

---

## ⚠️ Lưu ý quan trọng

1. **`--force-with-lease` > `--force`** — Kiểm tra remote trước khi ghi đè, tránh mất code người khác
2. **Backup trước rebase** — `git branch backup-before-rebase` để phòng
3. **Conflict trong rebase khó hơn merge** — Vì xảy ra từng commit một
4. **`git reflog`** — Luôn là bảo hiểm cuối nếu rebase sai

---

## 📝 Tóm tắt

| Lệnh | Ý nghĩa |
|---|---|
| `git rebase main` | Đặt commits của bạn sau commits mới nhất của main |
| `git rebase -i HEAD~n` | Mở Interactive rebase cho n commits |
| `git rebase --continue` | Tiếp tục sau khi resolve conflict |
| `git rebase --abort` | Hủy rebase, quay lại trước khi bắt đầu |
| `git push --force-with-lease` | Push sau rebase (an toàn hơn --force) |

---

## ➡️ Chuyện tiếp theo...

*Minh đang rebase, bỗng Linh gọi: "Minh ơi, qua giúp mình review code cái! Nhưng mình đang code dở feature mới, chưa muốn commit..."*

*"Dùng Stash đi!" Minh nói. "Cất tạm code chưa xong vào 'ngăn kéo bí mật', chuyển sang việc khác, xong rồi lấy lại."*

**→ [Bài 20: Git Stash](./02-stash.md) — "Ngăn kéo bí mật" để cất tạm code chưa hoàn thành, chuyển ngữ cảnh mà không cần commit.**

---

## 🔗 Tài liệu tham khảo
- [Git Documentation - Rebasing](https://git-scm.com/book/en/v2/Git-Branching-Rebasing)
- [Git Rebase Documentation](https://git-scm.com/docs/git-rebase)
- [Atlassian - Merging vs Rebasing](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)
