# 📚 Phụ Lục A: Câu Hỏi Phỏng Vấn Git & GitHub

> *Anh Hùng: "90% phỏng vấn developer tại Việt Nam sẽ hỏi ít nhất 2-3 câu về Git. Không biết trả lời = mất điểm lớn."*

---

## 🟢 Mức Fresher (0-1 năm kinh nghiệm)

### 1. Git là gì? Tại sao cần dùng Git?
**Trả lời mẫu:**
> "Git là hệ thống kiểm soát phiên bản phân tán. Nó giúp theo dõi thay đổi code, cho phép nhiều người làm việc trên cùng dự án, backup code lên cloud, và quay lại phiên bản trước khi có lỗi."

### 2. Sự khác nhau giữa `git pull` và `git fetch`?
**Trả lời mẫu:**
> "`git fetch` chỉ tải dữ liệu mới từ remote về nhưng KHÔNG merge vào code hiện tại. `git pull` = `git fetch` + `git merge` — tải VÀ merge luôn. Dùng `fetch` khi muốn xem trước, `pull` khi muốn cập nhật ngay."

### 3. `git merge` và `git rebase` khác nhau thế nào?
**Trả lời mẫu:**
> "Merge tạo merge commit, giữ nguyên lịch sử nhánh — dùng cho branch chung. Rebase viết lại lịch sử thành đường thẳng — chỉ dùng cho branch cá nhân, chưa push."

### 4. Giải thích quy trình Git cơ bản.
**Trả lời mẫu:**
> "Clone repo → checkout branch mới → code → `git add` (staging) → `git commit` (snapshot) → `git push` (lên remote) → tạo Pull Request → code review → merge vào main."

### 5. `.gitignore` là gì? Cho ví dụ.
**Trả lời mẫu:**
> "File `.gitignore` liệt kê các file/thư mục mà Git sẽ bỏ qua, không track. Ví dụ: `node_modules/`, `.env`, `dist/`, `*.log`. Mục đích: tránh commit file nhạy cảm, file lớn không cần thiết."

---

## 🟡 Mức Junior (1-2 năm)

### 6. Giải thích sự khác nhau giữa `git reset --soft`, `--mixed`, `--hard`.
**Trả lời mẫu:**
> "`--soft`: Hủy commit, giữ code trong staging → commit lại ngay. `--mixed` (mặc định): Hủy commit, code về working directory → cần add lại. `--hard`: Hủy commit VÀ xóa code → mất vĩnh viễn."

### 7. `git stash` dùng khi nào?
**Trả lời mẫu:**
> "Khi đang code dở feature A nhưng cần chuyển sang fix bug khẩn cấp. `git stash` cất tạm thay đổi chưa commit, cho working directory sạch để checkout branch khác. Xong rồi `git stash pop` lấy lại."

### 8. `git revert` khác `git reset` thế nào? Khi nào dùng cái nào?
**Trả lời mẫu:**
> "`git revert` tạo commit MỚI để undo — an toàn, không viết lại lịch sử, dùng khi code đã push. `git reset` xóa commit khỏi lịch sử — chỉ dùng khi chưa push hoặc branch riêng."

### 9. Conflict là gì? Cách giải quyết?
**Trả lời mẫu:**
> "Conflict xảy ra khi 2 people sửa cùng dòng trong cùng file. Git không biết giữ phiên bản nào → yêu cầu developer quyết định. Giải quyết: mở file → chọn code đúng → xóa markers `<<<<`, `====`, `>>>>` → add → commit."

### 10. Giải thích Git Flow.
**Trả lời mẫu:**
> "Git Flow là workflow phổ biến gồm: `main` (production), `develop` (integration), `feature/*` (tính năng mới), `release/*` (chuẩn bị release), `hotfix/*` (sửa khẩn cấp). Feature tạo từ develop, merge lại develop, release từ develop, merge vào main và develop."

---

## 🔴 Mức Mid-Senior (2+ năm)

### 11. `cherry-pick` là gì? Dùng khi nào?
**Trả lời mẫu:**
> "`git cherry-pick <hash>` lấy MỘT commit cụ thể từ branch khác áp dụng vào branch hiện tại. Dùng khi: muốn lấy 1 bug fix từ develop vào hotfix mà không merge cả branch."

### 12. `git bisect` là gì?
**Trả lời mẫu:**
> "Công cụ tìm commit gây bug bằng binary search. Git checkout từng commit giữa 'good' và 'bad', bạn test → trả lời good/bad → Git thu hẹp phạm vi. Tìm bug trong log hàng trăm commits chỉ mất vài bước."

### 13. Giải thích `pre-commit hook` và `pre-push hook`.
**Trả lời mẫu:**
> "Git hooks là scripts tự chạy tại các sự kiện Git. `pre-commit`: chạy trước commit (lint, format code). `pre-push`: chạy trước push (run tests). Dùng với Husky để enforce code quality tự động."

### 14. Monorepo vs Multirepo — ưu nhược điểm?
**Trả lời mẫu:**
> "Monorepo: tất cả dự án trong 1 repo (Google, Facebook dùng). Ưu: chia sẻ code dễ, atomic changes. Nhược: repo lớn, CI phức tạp. Multirepo: mỗi dự án 1 repo. Ưu: độc lập, nhẹ. Nhược: khó chia sẻ code, dependency hell."

### 15. Làm sao xóa sensitive data đã push lên Git?
**Trả lời mẫu:**
> "Bước 1: Rotate credentials ngay (key cũ vô hiệu). Bước 2: Dùng `git filter-branch` hoặc BFG Repo-Cleaner để xóa file khỏi TOÀN BỘ history. Bước 3: Force push. Bước 4: Thông báo team re-clone. Lưu ý: ai đã clone trước đó vẫn có file cũ."

---

## 💡 Mẹo phỏng vấn từ anh Hùng

> 1. *"Đừng chỉ nói lý thuyết. Kể tình huống thực tế: 'Ở dự án trước, em dùng rebase interactive để dọn 15 commits thành 3 trước khi tạo PR.'"*
>
> 2. *"Nếu không biết, nói thẳng: 'Em chưa dùng git bisect nhưng em biết nó là binary search cho commits. Em sẽ tìm hiểu thêm.' — Trung thực hơn bịa."*
>
> 3. *"GitHub profile là CV thứ hai. Xanh contribution graph = nhà tuyển dụng ấn tượng."*

---

**→ Quay lại [README](../README.md) để xem lại nội dung khóa học.**
