# Bài 16: Branch Protection Rules

## 🎬 "Push Thẳng Vào Main Lúc 2 Giờ Sáng" — Sự cố FPT 2024

*Một developer tại FPT Software, deadline gấp, push thẳng vào `main` lúc 2 giờ sáng. Không review. Không test. Code chứa bug SQL injection.*

*Sáng hôm sau, hệ thống bị hack. Data leak. Team mất 3 ngày fix + 2 ngày post-mortem.*

*Sau sự cố, CTO ra lệnh: "Bật Branch Protection cho TẤT CẢ repos. Không ai — kể cả CTO — được push trực tiếp vào main."*

> **Anh Hùng:** *"Branch Protection giống cổng an ninh sân bay. Mọi người đều phải qua máy soi chiếu. Kể cả phi công."*

---

## 🎯 Mục tiêu
- Hiểu Branch Protection là gì
- Cấu hình protection rules cho main
- Hiểu các tùy chọn bảo vệ quan trọng

---

## 🛡️ Branch Protection = Lá chắn cho main

**Không có protection:**
```
Developer → Push thẳng vào main → Deploy → Bug trên production 💥
```

**Có protection:**
```
Developer → Tạo PR → Review ✅ → CI/CD pass ✅ → Approve ✅ → Merge → Deploy ✅
```

---

## 🔧 Cấu hình — Bật Branch Protection

### Đường đi: Repository → Settings → Branches → Add rule

### ⭐ Cấu hình KHUYÊN DÙNG cho main:

| Tùy chọn | Bật? | Giải thích |
|---|---|---|
| **Require pull request reviews** | ✅ BẬT | Phải có PR + review, không push trực tiếp |
| → Required approvals: **1** | ✅ | Ít nhất 1 người approve |
| → Dismiss stale approvals | ✅ | Push commit mới → phải review lại |
| **Require status checks** | ✅ BẬT | CI/CD phải pass (tests, lint, build) |
| → Require up to date | ✅ | Branch phải sync với main mới nhất |
| **Require conversation resolution** | ✅ | Tất cả comments phải resolve |
| **Include administrators** | ✅ BẬT | Admin cũng phải theo rules |
| Allow force push | ❌ TẮT | KHÔNG cho force push |
| Allow deletions | ❌ TẮT | KHÔNG cho xóa main |

---

## 📋 3 Cấu hình mẫu theo loại branch

### 1. Main branch (Production) — Bảo vệ CAO NHẤT:

```
✅ PR reviews: 2 approvals
✅ Status checks: ALL must pass
✅ Conversation resolution
✅ Include administrators
❌ NO force push
❌ NO deletions
```

### 2. Develop branch — Bảo vệ TRUNG BÌNH:

```
✅ PR reviews: 1 approval
✅ Status checks: Tests must pass
✅ Include administrators
❌ NO force push
```

### 3. Feature branches — ÍT BẢO VỆ:

```
→ Không cần protection (branch cá nhân)
→ Developer tự quản lý
```

---

## 🏢 WAR STORY: Tại sao "Include Administrators" quan trọng?

> Một CTO tại startup Việt Nam tắt "Include Administrators" cho mình. Lý do: "Tôi là CTO, tôi cần push nhanh."
>
> Một đêm, CTO push code "quick fix" lên main. Không review. Code chứa race condition → 5% transactions bị duplicate → mất hàng trăm triệu.
>
> **Bài học:** Rules phải áp dụng cho MỌI NGƯỜI. Không có ngoại lệ.

---

## 🔧 Xử lý tình huống đặc biệt

### Hotfix cần merge gấp?
→ Vẫn tạo PR. Request review từ senior (có thể review trong 5 phút). Branch protection vẫn áp dụng.

### CI/CD fail nhưng cần merge?
→ Fix CI trước. KHÔNG bypass. Fix CI thường nhanh hơn fix bug trên production.

### Branch "out of date"?
```bash
git checkout feature/my-branch
git fetch origin
git merge origin/main
git push
# → Branch updated, có thể merge
```

---

## 💡 Best Practices

1. **Bật protection từ ngày đầu** — Đừng đợi đến khi có sự cố
2. **Include administrators = BẮT BUỘC** — Không ai được ngoại lệ
3. **Ít nhất 1 approval** — 2 approvals cho production repos
4. **Status checks = tests + lint** — Code không pass tests = không merge
5. **Document emergency procedures** — Có quy trình bypass khi THẬT SỰ khẩn cấp

---

## ➡️ Chuyện tiếp theo...

*Organization đã setup. Teams đã phân quyền. Main đã được bảo vệ.*

*"Giờ đến phần thú vị," anh Hùng nói. "Em đã nắm kiến thức nâng cao: Rebase, Stash, Branch Protection. Nhưng khi đi làm THẬT — workflow từ A đến Z nhìn như thế nào?"*

**→ [Phần 5: Kịch bản Thực tế](./../05-kich-ban/01-feature-development.md) — Ngày đầu đi làm: Từ Jira ticket đến code trên production.**

---

## 🔗 Tài liệu tham khảo
- [GitHub - About Protected Branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)
- [GitHub - CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
