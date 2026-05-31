# Bài 13: GitHub Organization

## 🎬 "6 Người, 1 Repo — Ai Cũng Là Admin" — Khi BTL Thành Thảm Họa

*Nhóm BTL mở rộng lên 6 người. Minh cho tất cả quyền Admin trên GitHub.*

*Kết quả:*
- *Tùng vô tình xóa branch `main` (nhấn nhem delete)*
- *Một bạn đổi repo từ Private thành Public (lộ API key)*
- *Hai người cùng merge PR mà không review*

> **Chị Hà:** *"Đây là lý do công ty dùng Organization. Organization = hệ thống quản lý: ai được làm gì, ai không được làm gì. Không phải ai cũng cần quyền Admin."*

*"Giống cái gì ạ?"*

*"Giống tòa nhà văn phòng. Bảo vệ có thẻ ra vào. Nhân viên có thẻ phòng mình. Giám đốc có master key. Không ai nên có master key nếu không cần."*

---

## 🎯 Mục tiêu
- Hiểu Organization khác Personal Account ở chỗ nào
- Tạo và cấu hình Organization
- Quản lý members và roles

---

## 🏢 Organization vs Personal Account

| | **Personal Account** | **Organization** |
|---|---|---|
| Dùng cho | Cá nhân, side project | Team, công ty, lớp học |
| Members | 1 người | Nhiều người, nhiều role |
| Teams | ❌ | ✅ Chia nhóm (backend, frontend...) |
| Permissions | Toàn quyền hoặc read-only | 5 mức chi tiết |
| Billing | Cá nhân | Tập trung |

> **Khi nào tạo Organization?** Team từ 3 người trở lên. Nhóm BTL 4-6 người? NÊN tạo Organization.

---

## ➕ Tạo Organization — 3 bước

### Bước 1: Tạo trên GitHub
Avatar → Settings → Organizations → **New organization** → Free plan → Điền tên

### Bước 2: Mời members
People → **Invite member** → Nhập username → Chọn role

### Bước 3: Cấu hình cơ bản
Settings → Member privileges:
- ☑️ Members có thể tạo repo (tùy)
- ☐ Members KHÔNG thể xóa repo
- ☐ Members KHÔNG thể đổi visibility

---

## 👥 3 Roles trong Organization

| Role | Quyền | Ai nên là? |
|---|---|---|
| **Owner** ⭐ | Toàn quyền: settings, billing, xóa org | Trưởng nhóm (ít nhất 2 người!) |
| **Member** | Truy cập repos được assign | Developer trong team |
| **Billing Manager** | Chỉ quản lý thanh toán | Admin tài chính |

> ⚠️ **Quan trọng:** Luôn có ít nhất **2 Owners**. Nếu 1 Owner bị khóa account → toàn bộ org mất quyền truy cập!

---

## 📦 Quản lý Repositories trong Organization

```
Tạo repo:  Organization page → Repositories → New repository → Owner = Org
Transfer:  Repo Settings → Danger Zone → Transfer ownership → Chọn org
```

### Cấu trúc repos mẫu cho nhóm BTL:

```
TLU-CSE391-Group5/              ← Organization
├── btl-frontend/               ← Repo cho Frontend team  
├── btl-backend/                ← Repo cho Backend team
├── btl-docs/                   ← Repo cho documentation
└── .github/                    ← Repo cho templates, workflows
```

> *Minh tạo Organization `TLU-CSE391-Group5`, mời 5 thành viên, setup xong trong 10 phút. "Gọn gàng hơn nhiều so với việc dùng repo cá nhân!"*

---

## 👔 Teams — Chia nhóm trong Organization

### Tạo Teams:

```
Organization → Teams → New team
```

### Cấu trúc Teams mẫu:

```
TLU-CSE391-Group5/
├── 🎨 frontend-team (Minh, Linh)      → Write quyền cho btl-frontend
├── ⚙️ backend-team (Tùng, Hải)       → Write quyền cho btl-backend  
└── 📝 docs-team (Lan)                 → Write quyền cho btl-docs
```

### Team Permissions khi assign repos:

| Permission | Quyền | Dùng cho |
|---|---|---|
| **Read** | Chỉ xem code | Stakeholder, mentor |
| **Write** | Push code, tạo branch | Developer |
| **Maintain** | + quản lý issues, PRs | Senior/Lead |
| **Admin** | Full control | Trưởng nhóm |

---

## 💡 Best Practices

1. **Ít nhất 2 Owners** — Phòng trường hợp mất quyền truy cập
2. **Dùng Teams** thay vì assign quyền từng người — Dễ quản lý khi team thay đổi
3. **Least Privilege** — Cho quyền tối thiểu cần thiết. Developer chỉ cần Write, không cần Admin
4. **Bật 2FA** — Settings → Security → Require two-factor authentication
5. **Tên repo rõ ràng** — `btl-frontend`, `btl-backend` thay vì `repo1`, `new-project`

---

## ➡️ Chuyện tiếp theo...

*Minh setup xong Organization, chia teams. Nhưng Tùng hỏi: "Team backend có 3 người. Cả 3 đều push code thoải mái vào main. Ai kiểm soát chất lượng?"*

*"Đó là lúc em cần hiểu sâu hơn về Permissions," chị Hà nói. "Và quan trọng hơn: Branch Protection — quy tắc bảo vệ main branch."*

**→ [Bài 14: Teams & Permissions](./02-teams-permissions.md) — Ai được push, ai phải tạo PR, ai có quyền merge.**

---

## 🔗 Tài liệu tham khảo
- [GitHub - Creating Organizations](https://docs.github.com/en/organizations)
- [GitHub - Managing Teams](https://docs.github.com/en/organizations/organizing-members-into-teams)
