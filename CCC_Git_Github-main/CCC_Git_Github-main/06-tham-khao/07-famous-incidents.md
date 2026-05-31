# 🏢 Phụ Lục B: Bài Học Từ Những Sự Cố Nổi Tiếng

> *"Người khôn ngoan học từ sai lầm người khác. Người thường học từ sai lầm của mình."*

---

## 💸 1. Knight Capital — Mất $440 Triệu Trong 45 Phút (2012)

### Chuyện gì xảy ra?
- Knight Capital Group là một trong những trading firms lớn nhất Phố Wall
- Ngày 1/8/2012, họ deploy code mới cho hệ thống giao dịch tự động
- **Lỗi:** Một technician **quên deploy code mới lên 1 trong 8 servers**
- Server cũ chạy code test từ 2003 — thực hiện giao dịch thật
- Trong 45 phút: hệ thống mua/bán cổ phiếu không kiểm soát
- **Thiệt hại: $440 TRIỆU USD** → công ty gần phá sản

### Bài học Git:
| Vấn đề | Giải pháp Git |
|---|---|
| Deploy thủ công, quên 1 server | CI/CD pipeline tự động (GitHub Actions) |
| Code cũ vẫn tồn tại trên server | Branch protection, xóa branch sau merge |
| Không có rollback nhanh | Git tag cho mỗi release → `git checkout v1.0.0` |

> *"Nếu họ có CI/CD pipeline đúng cách, deploy sẽ tự động lên TẤT CẢ servers. Không có chuyện 'quên 1 server.'" — Anh Hùng*

---

## 💾 2. GitLab.com Xóa 300GB Production Data (2017)

### Chuyện gì xảy ra?
- Ngày 31/1/2017, một sysadmin tại GitLab đang xử lý sự cố database replication
- Anh ta chạy lệnh `rm -rf` (xóa thư mục) trên **production server** thay vì staging server
- **300GB data production bị xóa**
- Backup? 5/5 phương pháp backup đều THẤT BẠI (chưa bao giờ test backup)

### Diễn biến:
1. 23:00 — Nhận ra dữ liệu đã bị xóa
2. 23:30 — Kiểm tra backup → tất cả đều lỗi hoặc quá cũ
3. 00:00 — GitLab quyết định livestream quá trình khôi phục
4. 18 tiếng sau — Khôi phục từ staging database (mất 6 giờ data)

### Bài học Git:
| Vấn đề | Giải pháp |
|---|---|
| Nhầm production vs staging | Tách environment rõ ràng, dùng branch protection |
| Backup không test | **Test backup định kỳ** — backup không test = không có backup |
| Thao tác thủ công trên production | Automation — mọi deploy qua CI/CD pipeline |

> *"GitLab đã cực kỳ minh bạch — họ livestream cả quá trình khôi phục. Đó là bài học: khi sai, hãy minh bạch và học từ nó." — Chị Hà*

---

## 🔓 3. Gentoo Linux GitHub Hack (2018)

### Chuyện gì xảy ra?
- Hacker hack được tài khoản GitHub admin của Gentoo Linux
- Push malicious code (mã độc) vào repository chính thức
- Hàng ngàn developer trên thế giới có thể đã pull code chứa mã độc

### Bài học Git:
| Vấn đề | Giải pháp |
|---|---|
| Account admin bị hack | **2FA bắt buộc** cho mọi admin |
| Push trực tiếp vào main | Branch protection → yêu cầu PR + review |
| Không phát hiện code lạ | **Signed commits** (GPG) — verify tác giả |
| Single admin account | Ít nhất 2 admin, least privilege principle |

---

## 📦 4. npm left-pad — 11 Dòng Code, Triệu Project Crash (2016)

### Chuyện gì xảy ra?
- Azer Koçulu (developer) có tranh chấp với npm Inc. về tên package
- Anh ta **xóa tất cả packages** của mình khỏi npm, bao gồm `left-pad` (11 dòng code)
- `left-pad` được dùng bởi **hàng triệu project** (kể cả React, Babel...)
- **Hàng triệu builds fail** trên toàn thế giới trong vài giờ

### 11 dòng code gây đổ:
```javascript
module.exports = leftpad;
function leftpad(str, len, ch) {
  str = String(str);
  var i = -1;
  if (!ch && ch !== 0) ch = ' ';
  len = len - str.length;
  while (++i < len) {
    str = ch + str;
  }
  return str;
}
```

### Bài học:
| Vấn đề | Giải pháp |
|---|---|
| Phụ thuộc package quá nhỏ | Viết utility function đơn giản thay vì install package |
| Không lock dependencies | Dùng `package-lock.json` / `yarn.lock` |
| Single point of failure | Mirror registry, vendoring dependencies |

> *"Bài học: Đừng phụ thuộc vào package mà bạn có thể viết trong 5 phút." — Anh Hùng*

---

## 🏢 5. Microsoft — Chuyển 300GB Windows Repo sang Git (2017)

### Chuyện gì TÍCH CỰC xảy ra?
- Windows codebase: **300GB**, 3.5 triệu files, 4.000 developers
- Microsoft tạo **VFS for Git (Virtual File System)** — Git hoạt động với repo khổng lồ
- Clone repo thay vì tải 300GB chỉ cần ~30 phút
- Kết quả: Developer productivity tăng đáng kể

### Bài học:
- Git scale được cho MỌI dự án — từ BTL sinh viên đến Windows
- Công cụ đúng + quy trình đúng = giải quyết mọi vấn đề

---

## 📊 Tóm tắt Bài Học

| Sự cố | Nguyên nhân gốc | Bạn nên nhớ |
|---|---|---|
| Knight Capital | Deploy thủ công | Dùng CI/CD, tag releases |
| GitLab | Nhầm environment | Tách staging/production |
| Gentoo hack | Account không bảo mật | Bật 2FA, branch protection |
| left-pad | Phụ thuộc quá nhiều | Lock dependencies |

---

**→ Quay lại [README](../README.md)**
