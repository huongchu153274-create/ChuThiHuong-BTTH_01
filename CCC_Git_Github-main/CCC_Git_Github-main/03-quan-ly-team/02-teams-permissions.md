# Bài 14: Teams và Permissions Chi Tiết

## 🎬 "Intern Xóa Database Production" — Câu Chuyện Có Thật

*Năm 2017, một intern tại một startup Mỹ được cấp quyền Admin trên production database. Ngày đầu tiên, anh ta chạy lệnh `DROP TABLE users` — xóa toàn bộ bảng users. 150.000 tài khoản biến mất.*

*Nguyên nhân? Không phải intern dở. Mà vì KHÔNG AI kiểm soát quyền truy cập.*

> **Chị Hà:** *"Tại Shopee, intern chỉ có quyền Read trên staging. Muốn push code? Tạo PR. Muốn access production? Cần approval từ 2 senior. Đây gọi là Principle of Least Privilege — cho quyền TỐI THIỂU cần thiết."*

---

## 🎯 Mục tiêu
- Hiểu 5 mức Permissions trong GitHub
- Thiết lập Teams với permissions phù hợp
- CODEOWNERS — tự động assign reviewers

---

## 🔐 5 Mức Permissions — Từ thấp đến cao

```
Read → Triage → Write → Maintain → Admin
 👁️      📋       ✏️       🔧        👑
```

| Permission | Có thể | Không thể | Cho ai? |
|---|---|---|---|
| **Read** 👁️ | Xem code, clone, pull | Push, tạo PR | Guest, mentor, stakeholder |
| **Triage** 📋 | + Quản lý issues, labels | Push code | PM, QA |
| **Write** ✏️ | + Push code, tạo branch, tạo PR | Quản lý settings | **Developer** (phổ biến nhất!) |
| **Maintain** 🔧 | + Quản lý branches, publish releases | Xóa repo, đổi settings | Senior dev, tech lead |
| **Admin** 👑 | Toàn quyền | Không giới hạn | Trưởng nhóm (hạn chế!) |

> 💡 **Quy tắc:** 80% members nên có quyền **Write**. Chỉ 1-2 người cần **Admin**.

---

## 👔 Thiết lập Teams — Ví dụ thực tế

### Cấu trúc Team cho nhóm BTL e-commerce:

```
TLU-CSE391-Group5/
├── 🎨 frontend-team
│   ├── Minh (Maintainer) → btl-frontend: Write
│   └── Linh (Member)     → btl-frontend: Write
├── ⚙️ backend-team  
│   ├── Tùng (Maintainer) → btl-backend: Write
│   └── Hải (Member)      → btl-backend: Write
├── 📝 fullstack-team
│   └── Lan (Member)      → btl-frontend: Write, btl-backend: Read
└── 👑 leads
    ├── Minh (Maintainer) → ALL repos: Admin
    └── Tùng (Member)     → ALL repos: Maintain
```

### Priority khi có nhiều quyền:

```
Personal permission (cao nhất)
     ↑
Team permission
     ↑  
Org default permission (thấp nhất)

→ GitHub luôn dùng quyền CAO NHẤT
```

---

## 📋 CODEOWNERS — "Ai chịu trách nhiệm file nào?"

Tạo file `.github/CODEOWNERS`:

```bash
# Frontend — Minh và Linh review tất cả frontend code
/src/frontend/     @TLU-CSE391-Group5/frontend-team

# Backend — Tùng và Hải review backend
/src/backend/      @TLU-CSE391-Group5/backend-team

# Config files — Chỉ trưởng nhóm review
*.yml              @minh-nguyen
*.json             @minh-nguyen
.env.example       @minh-nguyen

# Docs — Lan review
/docs/             @lan-pham
README.md          @lan-pham
```

> **Kết quả:** Khi ai đó tạo PR sửa file frontend → GitHub TỰ ĐỘNG request review từ `frontend-team`. Không cần nhớ review ai!

---

## 🔧 Quản lý Permissions — Thao tác

### Assign repo cho team:
1. Team → **Repositories** → **Add repository** → Chọn permission level

### Xem quyền của member:
1. Organization → **People** → Click member → Xem **Repository access**

### Xóa quyền khi member rời team:
1. Team → **Members** → Click **Remove** ⚠️ (nhớ làm ngay!)

---

## 💡 Security Best Practices

| Practice | Tại sao? |
|---|---|
| **Bật 2FA bắt buộc** | Tránh bị hack account |
| **Review permissions mỗi tháng** | Xóa quyền người đã rời team |
| **Least Privilege** | Developer chỉ cần Write, không cần Admin |
| **Dùng CODEOWNERS** | Auto-assign reviewers, không bỏ sót |
| **Audit logs** | Biết ai làm gì, khi nào |

---

## ➡️ Chuyện tiếp theo...

*Teams và permissions đã setup. Nhưng Minh lo: "Nếu ai đó push thẳng vào main mà không tạo PR? Nếu CI chưa chạy mà đã merge?"*

*"Branch Protection Rules," chị Hà nói. "Bảo vệ main: không cho push trực tiếp, bắt buộc PR + review + CI pass."*

**→ [Bài 16: Branch Protection Rules](./03-branch-protection.md) — Tấm lá chắn cuối cùng bảo vệ production code.**

---

## 🔗 Tài liệu tham khảo
- [GitHub - Repository Permissions](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features)
- [GitHub - CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
