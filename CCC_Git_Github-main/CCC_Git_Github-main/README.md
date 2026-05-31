# 📚 Bộ Tài Liệu Hướng Dẫn Git và GitHub Toàn Diện

> *"Git không phải 'nên học'. Git là 'không biết thì đừng đi phỏng vấn.'"* — Anh Hùng, Senior Developer

---

## 🎭 Về Bộ Tài Liệu Này

Đây không phải sách giáo khoa. Đây là **hành trình của Minh** — sinh viên năm 3 CNTT — từ lần đầu nghe đến Git cho đến ngày đầu đi thực tập tại công ty công nghệ.

Mỗi bài học là một câu chuyện. Mỗi khái niệm gắn liền với tình huống thực tế. Bạn sẽ học cùng Minh, mắc lỗi cùng Minh, và trưởng thành cùng Minh.

### 🧑‍💻 Nhân vật xuyên suốt

| Nhân vật | Vai trò | Bạn sẽ học gì từ họ |
|---|---|---|
| **Minh** | Sinh viên năm 3 CNTT | Hành trình từ zero đến hero |
| **Linh** | Bạn cùng nhóm BTL | Bài học làm việc nhóm |
| **Anh Hùng** | Senior Dev, mentor | Kinh nghiệm thực chiến từ ngành |
| **Chị Hà** | Tech Lead tại Shopee | Góc nhìn quản lý và production |

---

## 📋 Mục Lục

### 🟢 Phần 1: Cơ Bản — "Những Bước Đầu Tiên"
1. [Giới thiệu Git và GitHub](./01-co-ban/01-gioi-thieu.md) — *Đêm Thứ Sáu Đen Tối của Minh*
2. [Cài đặt và Cấu hình](./01-co-ban/02-cai-dat.md) — *Commit đầu tiên (và sai lầm đầu tiên)*
3. [Khái niệm cơ bản về Repository](./01-co-ban/03-repository-co-ban.md) — *"Tại sao GitHub trống trơn?"*
4. [Làm việc với Files: Add, Commit, Push](./01-co-ban/04-lam-viec-voi-files.md) — *Ba Bước Thần Thánh*
5. [Xem lịch sử và Log](./01-co-ban/05-xem-lich-su.md) — *"Ai sửa file config này?!" — 11 giờ đêm*
6. [Undo và Revert thay đổi](./01-co-ban/06-undo-revert.md) — *API Key trên GitHub Public*

### 🟡 Phần 2: Làm Việc Nhóm — "Khi Code Không Chỉ Của Mình"
7. [Branch và Checkout](./02-lam-viec-nhom/01-branch-checkout.md) — *Vũ trụ song song*
8. [Merge Branches](./02-lam-viec-nhom/02-merge.md) — *Hợp nhất hai vũ trụ*
9. [Xử lý Conflicts](./02-lam-viec-nhom/03-conflict-resolution.md) — *Cuộc Chiến Merge — 3 giờ trước deadline*
10. [Pull Request trên GitHub](./02-lam-viec-nhom/04-pull-request.md) — *Nghệ thuật "xin phép"*
11. [Code Review](./02-lam-viec-nhom/05-code-review.md) — *Kỹ năng quan trọng nhất trường không dạy*
12. [Fork và Contribute](./02-lam-viec-nhom/06-fork-contribute.md) — *Đóng góp cho open source*

### 🟠 Phần 3: Quản Lý Team (GitHub Organization)
13. [Tạo và Quản lý Organization](./03-quan-ly-team/01-organization.md)
14. [Teams và Permissions](./03-quan-ly-team/02-teams-permissions.md)
15. [Branches Protection Rules](./03-quan-ly-team/03-branch-protection.md)

### 🔴 Phần 4: Nâng Cao — "Vũ Khí Của Senior Developer"
19. [Rebase](./04-nang-cao/01-rebase.md) — *Viết lại lịch sử (đúng cách)*
20. [Stash](./04-nang-cao/02-stash.md) — *"Khoan, để tôi cất đồ đã!"*

### 🔧 Phần 5: Kịch Bản Thực Tế — "Ngày Đầu Đi Làm"
25. [Kịch bản 1: Feature Development](./05-kich-ban/01-feature-development.md) — *Workflow hoàn chỉnh*
26. [Kịch bản 2: Hotfix Production](./05-kich-ban/02-hotfix-production.md) — *Khi server sập lúc 3 giờ sáng*

### 📖 Phần 6: Tham Khảo
31. [Cheat Sheet - Lệnh thường dùng](./06-tham-khao/01-cheat-sheet.md)
32. [Troubleshooting - Xử lý lỗi](./06-tham-khao/02-troubleshooting.md)
33. [GitHub CLI](./06-tham-khao/03-github-cli.md)
34. [GitHub Actions - CI/CD](./06-tham-khao/04-github-actions.md)
35. [Best Practices và Tips](./06-tham-khao/05-best-practices.md)

---

## 🚀 Bắt Đầu

**Nếu bạn là người mới:** Đọc từ [Bài 1: Giới thiệu Git](./01-co-ban/01-gioi-thieu.md). Đọc theo thứ tự — mỗi bài nối tiếp câu chuyện.

**Nếu đã biết cơ bản:** Nhảy đến Phần 2 — làm việc nhóm mới là thử thách thật sự.

**Nếu đang chuẩn bị phỏng vấn:** Đọc Phần 4 (Rebase/Stash) + Phần 5 (Kịch bản thực tế).

---

## 📝 Cấu Trúc Mỗi Bài Học

Mỗi bài đều có:
- 🎬 **Câu chuyện mở đầu** — Tình huống thực tế để bạn đồng cảm
- 🎯 **Mục tiêu** — Bạn sẽ biết gì sau bài này
- 💻 **Lý thuyết + Code** — Giải thích + ví dụ cụ thể
- 🏢 **War Story** — Bài học từ industry (FPT, Shopee, Google)
- ⚠️ **Lưu ý quan trọng** — Bẫy thường gặp
- 📝 **Tóm tắt** — Bảng tra cứu nhanh
- ➡️ **Cliff-hanger** — Câu hỏi kích thích tò mò cho bài tiếp

---

## 🏭 Phụ Lục: Sự Cố Nổi Tiếng Liên Quan Git

| Sự cố | Năm | Chuyện gì xảy ra | Bài học |
|---|---|---|---|
| **Knight Capital** | 2012 | Deploy code cũ do quên xóa branch → mất **$440 triệu** trong 45 phút | Branch management |
| **GitLab.com** | 2017 | Chạy `rm -rf` trên production thay vì staging → mất 300GB data | Tách environment |
| **Gentoo Linux** | 2018 | Account admin bị hack → push malicious code | 2FA, branch protection |
| **npm left-pad** | 2016 | Dev xóa 1 package 11 dòng → triệu project crash | Dependency management |

---

## 💰 Git và Career Path

| Level | Cần biết về Git | Mức lương (tham khảo 2026) |
|---|---|---|
| **Intern** | init, add, commit, push, pull | 3-6 triệu VNĐ/tháng |
| **Fresher** | + branch, merge, PR, conflict | 8-15 triệu |
| **Junior** | + rebase, stash, git flow | 15-25 triệu |
| **Mid-level** | + CI/CD, hooks, subtree | 25-40 triệu |
| **Senior** | + team workflow design, monorepo | 40-80 triệu |

---

## 🤝 Đóng Góp

Tài liệu này được thiết kế cho học tập. Nếu bạn phát hiện lỗi hoặc có góp ý, vui lòng tạo Issue hoặc Pull Request — áp dụng đúng những gì bạn học trong tài liệu này! 😄

## 📄 License

Tài liệu này được phát hành miễn phí cho mục đích học tập và sử dụng cá nhân.

---

**Chúc bạn học tập hiệu quả! Hành trình của Minh bắt đầu tại [Bài 1](./01-co-ban/01-gioi-thieu.md). Hành trình của bạn cũng vậy. 🎉**
