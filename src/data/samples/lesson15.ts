import { CodeSample } from '../../types';

export const LESSON_15_SAMPLES: CodeSample[] = [
  {
    id: 1,
    title: '1. Thẻ học sinh (Student Profile Card)',
    description: 'Thẻ cá nhân bo tròn border-radius, viền border, màu nền tương phản và đổ bóng nhẹ.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Thẻ học sinh</title>
</head>
<body>
  <div class="the-hoc-sinh">
    <div class="anh-dai-dien">
      <img src="images/sun.png" alt="Ảnh đại diện">
    </div>
    <div class="thong-tin">
      <h3>NGUYỄN HOÀNG LONG</h3>
      <p class="lop">Lớp: 12A1 - THPT Chuyên</p>
      <p class="chuyen-nganh">Định hướng: Kỹ thuật Phần mềm</p>
      <div class="ma-the">ID: 2026-12A1-08</div>
    </div>
  </div>
</body>
</html>`,
    css: `.the-hoc-sinh {
  max-width: 360px;
  margin: 20px auto;
  background-color: #ffffff;
  border: 2px solid #3b82f6;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 16px;
}

.anh-dai-dien img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 3px solid #60a5fa;
  object-fit: cover;
}

.thong-tin h3 {
  margin: 0;
  color: #1e3a8a;
  font-size: 16px;
}

.lop {
  margin: 4px 0;
  color: #4b5563;
  font-size: 13px;
  font-weight: 600;
}

.chuyen-nganh {
  margin: 0;
  color: #6b7280;
  font-size: 12px;
}

.ma-the {
  margin-top: 8px;
  display: inline-block;
  background: #dbeafe;
  color: #1d4ed8;
  font-size: 11px;
  font-weight: bold;
  padding: 2px 8px;
  border-radius: 4px;
}`
  },
  {
    id: 2,
    title: '2. Bảng 3 cách biểu diễn màu (Name, HEX, RGB)',
    description: 'Cùng một sắc thái màu thể hiện qua Tên màu, Mã Hex (#...) và Hệ màu rgb(...).',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Hệ màu trong CSS</title>
</head>
<body>
  <h2>CÁC CÁCH ĐẶT MÀU SẮC TRONG CSS</h2>
  <div class="o-mau o-name">1. Tên màu tiếng Anh: color: crimson;</div>
  <div class="o-mau o-hex">2. Mã thập lục phân HEX: color: #dc2626;</div>
  <div class="o-mau o-rgb">3. Hệ màu ánh sáng: rgb(220, 38, 38);</div>
</body>
</html>`,
    css: `.o-mau {
  padding: 12px 16px;
  margin-bottom: 10px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 14px;
}

.o-name {
  background-color: #fee2e2;
  color: crimson;
  border: 1px solid crimson;
}

.o-hex {
  background-color: #fee2e2;
  color: #dc2626;
  border: 1px solid #dc2626;
}

.o-rgb {
  background-color: #fee2e2;
  color: rgb(220, 38, 38);
  border: 1px solid rgb(220, 38, 38);
}`
  },
  {
    id: 3,
    title: '3. Độ trong suốt với RGBA (Alpha Channel)',
    description: 'Sử dụng kênh alpha (0.0 đến 1.0) để tạo các lớp màu nền phủ trong suốt.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Màu trong suốt RGBA</title>
</head>
<body>
  <div class="khung-nen">
    <div class="lop-phu-mo">
      <h3>LỚP PHỦ MỜ BẰNG RGBA</h3>
      <p>Nền này sử dụng: rgba(15, 23, 42, 0.75)<br>Cho phép nhìn xuyên thấu nhẹ lớp nền phía sau.</p>
    </div>
  </div>
</body>
</html>`,
    css: `.khung-nen {
  background-color: #2563eb;
  padding: 30px;
  border-radius: 12px;
}

.lop-phu-mo {
  background-color: rgba(15, 23, 42, 0.75);
  color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
}`
  },
  {
    id: 4,
    title: '4. Nền chuyển sắc thời thượng (Linear Gradient)',
    description: 'Tạo dải màu chuyển động mượt mà từ xanh dương sang tím thời trang.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Linear Gradient CSS</title>
</head>
<body>
  <div class="the-gradient">
    <h2>HÀNH TRÌNH CHINH PHỤC ĐẠI HỌC</h2>
    <p>Khoa học Công nghệ &amp; Kỷ nguyên số 2026</p>
    <button class="nut-gradient">Khám phá ngay</button>
  </div>
</body>
</html>`,
    css: `.the-gradient {
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  color: #ffffff;
  padding: 30px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 10px 20px rgba(124, 58, 237, 0.3);
}

.nut-gradient {
  background: #ffffff;
  color: #4338ca;
  font-weight: bold;
  border: none;
  padding: 10px 24px;
  border-radius: 999px;
  cursor: pointer;
  margin-top: 10px;
}`
  },
  {
    id: 5,
    title: '5. Hình nền với background-image & repeat',
    description: 'Sử dụng hình ảnh làm nền trang với các thuộc tính định vị và căn chỉnh.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Hình nền CSS</title>
</head>
<body>
  <div class="khung-hinh-nen">
    <div class="chu-noi-bat">
      <h3>CHÀO BÌNH MINH NĂM MỚI</h3>
      <p>Đón nguồn năng lượng tích cực cho kỳ thi sắp tới.</p>
    </div>
  </div>
</body>
</html>`,
    css: `.khung-hinh-nen {
  background-image: url('images/sun.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-color: #fef3c7;
  height: 220px;
  border-radius: 12px;
  border: 2px solid #fde68a;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 15px;
}

.chu-noi-bat {
  background: rgba(255, 255, 255, 0.9);
  padding: 10px 20px;
  border-radius: 8px;
  text-align: center;
}`
  },
  {
    id: 6,
    title: '6. Bộ 4 hộp thông báo trạng thái (Alert Boxes)',
    description: 'Thiết kế hệ màu Success (xanh lục), Danger (đỏ), Warning (vàng) và Info (xanh biển).',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Hộp thông báo</title>
</head>
<body>
  <div class="alert alert-success">✓ Chúc mừng! Bạn đã hoàn thành xuất sắc bài kiểm tra DOM.</div>
  <div class="alert alert-danger">✕ Lỗi: Thiếu thẻ đóng &lt;/div&gt; trong đoạn mã HTML.</div>
  <div class="alert alert-warning">⚠ Cảnh báo: Bạn chưa lưu lại mã nguồn của bài trước.</div>
  <div class="alert alert-info">ℹ Thông tin: Thời gian nộp bài kết thúc vào lúc 23h59 tối nay.</div>
</body>
</html>`,
    css: `.alert {
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: 500;
  border-left: 5px solid transparent;
}

.alert-success {
  background-color: #dcfce7;
  color: #166534;
  border-left-color: #22c55e;
}

.alert-danger {
  background-color: #fee2e2;
  color: #991b1b;
  border-left-color: #ef4444;
}

.alert-warning {
  background-color: #fef9c3;
  color: #854d0e;
  border-left-color: #eab308;
}

.alert-info {
  background-color: #e0f2fe;
  color: #075985;
  border-left-color: #0ea5e9;
}`
  },
  {
    id: 7,
    title: '7. Đổ bóng hộp hiện đại (box-shadow)',
    description: 'So sánh các cấp độ đổ bóng từ nhẹ nhàng (soft shadow) đến nổi bật (deep shadow).',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Đổ bóng Box Shadow</title>
</head>
<body>
  <h2>CÁC CẤP ĐỘ ĐỔ BÓNG TRONG CSS</h2>
  <div class="the-bong bong-nhe">1. Bóng nhẹ (Subtle Shadow)</div>
  <div class="the-bong bong-vua">2. Bóng trung bình (Card Shadow)</div>
  <div class="the-bong bong-sau">3. Bóng nổi đa tầng (Floating Shadow)</div>
</body>
</html>`,
    css: `.the-bong {
  background: white;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-weight: bold;
  color: #1e293b;
}

.bong-nhe {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.bong-vua {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.15);
}

.bong-sau {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
}`
  },
  {
    id: 8,
    title: '8. Các kiểu viền và bo góc (border & border-radius)',
    description: 'Thử nghiệm viền nét liền (solid), nét đứt (dashed), chấm bi (dotted) và bo tròn.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Viền và bo góc</title>
</head>
<body>
  <div class="hop vien-lien">Viền nét liền (solid) bo nhẹ 6px</div>
  <div class="hop vien-dut">Viền nét đứt (dashed) bo 12px</div>
  <div class="hop vien-vien-thuoc">Viền bo viên thuốc (Pill shape 999px)</div>
</body>
</html>`,
    css: `.hop {
  padding: 12px;
  margin-bottom: 12px;
  text-align: center;
  font-weight: 600;
  background: #f8fafc;
}

.vien-lien {
  border: 2px solid #2563eb;
  border-radius: 6px;
}

.vien-dut {
  border: 2px dashed #f59e0b;
  border-radius: 12px;
}

.vien-vien-thuoc {
  border: 2px solid #10b981;
  border-radius: 999px;
  background: #ecfdf5;
  color: #065f46;
}`
  },
  {
    id: 9,
    title: '9. Bảng giá dịch vụ tương phản cao',
    description: 'So sánh gói cơ bản nền sáng và gói cao cấp nền tối tương phản.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Bảng giá tương phản</title>
</head>
<body>
  <h2>GÓI TÀI KHOẢN HỌC TẬP</h2>
  <div class="bang-gia">
    <div class="goi goi-thuong">
      <h3>Gói Miễn Phí</h3>
      <div class="gia">0 đ</div>
      <p>• Học toàn bộ lý thuyết SGK</p>
      <p>• Thực hành 10 bài mẫu</p>
    </div>

    <div class="goi goi-vip">
      <span class="huy-hieu">VIP</span>
      <h3>Gói Toàn Diện</h3>
      <div class="gia">99.000 đ</div>
      <p>• Hỏi đáp trợ lý AI không giới hạn</p>
      <p>• Chấm điểm bài tập tự động</p>
    </div>
  </div>
</body>
</html>`,
    css: `.bang-gia {
  display: flex;
  gap: 16px;
}

.goi {
  flex: 1;
  padding: 20px;
  border-radius: 12px;
}

.goi-thuong {
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  color: #334155;
}

.goi-vip {
  background: linear-gradient(145deg, #1e1b4b, #312e81);
  color: #ffffff;
  border: 2px solid #facc15;
  position: relative;
}

.gia {
  font-size: 22px;
  font-weight: 800;
  margin: 10px 0;
}

.huy-hieu {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #facc15;
  color: #000;
  font-size: 10px;
  font-weight: 900;
  padding: 2px 6px;
  border-radius: 4px;
}`
  },
  {
    id: 10,
    title: '10. Giao diện Chế độ tối (Dark Mode Card)',
    description: 'Thiết kế card màu nền đen than #0f172a, chữ sáng, viền tương phản cao.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Giao diện Dark Mode</title>
</head>
<body>
  <div class="the-dark-mode">
    <div class="dau-the">
      <span class="bieu-tuong">⚡</span>
      <h4>TRUNG TÂM ĐIỀU KHIỂN LAB</h4>
    </div>
    <p class="mo-ta">Hệ thống đang hoạt động ổn định. Máy chủ biên dịch ảo HTML5 sẵn sàng.</p>
    <div class="thong-so">
      <div>RAM ảo: <b>512 MB</b></div>
      <div>Trạng thái: <b style="color: #4ade80;">Sẵn sàng</b></div>
    </div>
  </div>
</body>
</html>`,
    css: `.the-dark-mode {
  background-color: #0f172a;
  border: 1px solid #334155;
  border-radius: 14px;
  padding: 20px;
  max-width: 360px;
  color: #f8fafc;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
}

.dau-the {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.dau-the h4 {
  margin: 0;
  color: #38bdf8;
  font-size: 14px;
}

.mo-ta {
  color: #94a3b8;
  font-size: 13px;
  line-height: 1.5;
}

.thong-so {
  border-top: 1px solid #1e293b;
  padding-top: 12px;
  margin-top: 12px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
}`
  }
];
