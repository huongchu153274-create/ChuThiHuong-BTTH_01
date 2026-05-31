# Kịch Bản 2: Hotfix Production — Khi Production Cháy Nhà

## 🎬 "3 Giờ Sáng, Điện Thoại Reo" — Sự cố thật tại FPT

*3:17 AM. Điện thoại Minh reo.*

*Slack notification đỏ chói:*

> **Chị Hà:** *"🚨 CRITICAL: Trang thanh toán crash cho 100% users. Revenue dropping $500/phút. @backend-team fix GẤP!"*

*PagerDuty alert:*
```
🔴 CRITICAL: POST /api/checkout → 500 Internal Server Error
   Error: Cannot read property 'address' of null
   Affected: 100% users | Started: 3:05 AM
```

*Minh hoảng. Nhưng anh nhớ lời anh Hùng: "Panic = sai lầm. Quy trình = an toàn. Làm theo steps."*

---

## 🚀 Hotfix Workflow — 8 bước cứu production

### Bước 1: 🔍 Xác nhận bug (5 phút)

```bash
# Đọc error logs
# Bug: user.address is null khi user chưa có địa chỉ giao hàng
# Ảnh hưởng: 100% users mới chưa nhập địa chỉ
# Root cause: Code mới deploy lúc 2AM thiếu null check
```

### Bước 2: 🌿 Tạo hotfix branch (1 phút)

```bash
git checkout main
git pull origin main
git checkout -b hotfix/checkout-null-address
```

### Bước 3: 🔧 Fix bug (10-30 phút)

```javascript
// ❌ Code gây bug:
const city = user.address.city;    // Crash khi address = null!

// ✅ Fix:
const city = user.address?.city ?? "Chưa có địa chỉ";
```

```bash
# Test local
npm test
npm run test:integration

# Commit
git add src/services/checkoutService.js
git commit -m "hotfix: Fix checkout crash when user has no address

- Add null check for user.address
- Add default value for missing city
- Add test case for null address scenario

Fixes: INCIDENT-789
Priority: CRITICAL"
```

### Bước 4: 📤 Push + Tạo PR (2 phút)

```bash
git push -u origin hotfix/checkout-null-address
```

PR description:
```markdown
🔴 HOTFIX: Fix checkout crash

**Incident:** INCIDENT-789
**Impact:** 100% users, $500/min revenue loss
**Root cause:** Missing null check for user.address
**Fix:** Optional chaining + default value
**Tests:** ✅ Added test for null address case
```

### Bước 5: ⚡ Review nhanh (5-10 phút)

```
→ Request review từ senior (chị Hà)
→ Senior review FIX ONLY (không nitpick style)
→ Approve ✅
```

> **Quy tắc hotfix review:** Chỉ review phần FIX. Refactor? Để ticket riêng, sprint sau.

### Bước 6: 🚀 Merge + Deploy (5 phút)

```bash
gh pr merge --merge       # Merge (giữ history rõ ràng cho incident)
# CI/CD auto-deploy to staging → verify → deploy production
```

### Bước 7: 🔍 Verify (10 phút)

```bash
# Monitor logs
# Check error rate → 0% ✅
# Check revenue → recovering ✅
# Slack: "✅ Hotfix deployed. Checkout working normally."
```

### Bước 8: 🧹 Cleanup + Post-mortem

```bash
# Cleanup
git checkout main && git pull
git branch -d hotfix/checkout-null-address
git push origin --delete hotfix/checkout-null-address

# Tag release
git tag v1.2.1
git push origin v1.2.1
```

**Post-mortem:**
```markdown
## Incident Report: INCIDENT-789

**Timeline:**
- 2:00 AM — Deploy v1.2.0 (chứa bug)
- 3:05 AM — Error rate spike 100%
- 3:17 AM — PagerDuty alert
- 3:25 AM — Root cause identified
- 3:45 AM — Fix committed, PR created
- 3:55 AM — Review + approved
- 4:00 AM — Hotfix deployed
- 4:10 AM — Error rate = 0%

**Root Cause:** Missing null check
**Prevention:** 
- [ ] Add null safety linter rule
- [ ] Add more edge case tests
- [ ] Code review checklist: "Null checks?"
```

---

## ⚡ So sánh Feature vs Hotfix workflow

| | Feature | Hotfix |
|---|---|---|
| **Từ** | main (latest) | main hoặc release tag |
| **Tên branch** | `feature/TASK-xxx` | `hotfix/description` |
| **Thời gian** | 1-5 ngày | 30 phút - 2 giờ |
| **Review** | Đầy đủ, chi tiết | Nhanh, focus vào fix |
| **Merge** | Squash merge | Merge commit (traceability) |
| **Deploy** | Theo sprint/schedule | Ngay lập tức |
| **Post-mortem** | Không | ✅ Bắt buộc nếu critical |

---

## 💡 Quy tắc vàng cho Hotfix

1. **Fix NHỎ NHẤT có thể** — Chỉ fix bug, không refactor
2. **Vẫn tạo PR** — Không push trực tiếp vào main (dù khẩn cấp)
3. **Vẫn review** — Senior review 5 phút, không bỏ qua
4. **Tag version mới** — v1.2.0 → v1.2.1 (patch version)
5. **Post-mortem** — Phân tích nguyên nhân, ngăn lặp lại

> **Chị Hà:** *"Hotfix mà bỏ qua review = bạn đang chữa bệnh bằng cách tạo thêm bệnh. Đã có production incident vì hotfix gây thêm bug."*

---

## ➡️ Tiếp theo...

*Minh xử lý xong hotfix đầu tiên. 4:30 sáng, anh ngồi nhâm nhi cà phê, viết post-mortem.*

*"Anh ơi, lần sau làm sao để nhanh hơn nữa?" Minh hỏi.*

*"Tự động hóa," anh Hùng nói. "GitHub Actions — tự chạy tests, tự deploy. Con người chỉ review và approve."*

**→ [Phần 6: Tham khảo](./../06-tham-khao/01-cheat-sheet.md) — Cheat sheet, CLI tools, GitHub Actions, Best Practices.**

---

## 🔗 Tài liệu tham khảo
- [Git Flow - Hotfix Branches](https://nvie.com/posts/a-successful-git-branching-model/#hotfix-branches)
- [PagerDuty Incident Response](https://response.pagerduty.com/)
