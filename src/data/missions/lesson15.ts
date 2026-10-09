import { LessonMission } from '../../types';

export const LESSON_15_MISSIONS: LessonMission[] = [
  {
    id: 1,
    title: 'Nhiệm vụ 1: Thẻ Hồ sơ Học sinh (Profile Card)',
    description: 'Thiết kế thẻ hồ sơ học sinh tiêu biểu: viền khung border nét liền, bo tròn góc với border-radius: 12px và màu nền tương phản rõ rệt với toàn trang.',
    requirements: [
      'Thiết lập màu nền toàn trang trong body { background-color: ... }',
      'Thẻ .the-hoc-sinh có màu nền sáng, đường viền border và bo góc border-radius',
      'Màu chữ tiêu đề họ tên tương phản cao, dễ đọc'
    ],
    targetResult: {
      title: 'Thẻ Hồ sơ học sinh tiêu biểu',
      description: 'Khung thẻ bo góc mềm mại, viền nổi bật và thông tin học sinh trang trọng.',
      html: `<!DOCTYPE html>
<html>
<head>
  <title>Thẻ học sinh</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="the-hoc-sinh">
    <h3 class="ho-ten">NGUYỄN HOÀNG LONG</h3>
    <p class="lop">Lớp 12A1 - THPT Chuyên</p>
    <p class="thanh-tich">Giải Nhất Tin học cấp Tỉnh</p>
  </div>
</body>
</html>`,
      css: `body {
  background-color: #f1f5f9;
}

.the-hoc-sinh {
  background-color: #ffffff;
  border: 2px solid #3b82f6;
  border-radius: 12px;
  padding: 20px;
  max-width: 320px;
  margin: 30px auto;
  text-align: center;
}

.ho-ten {
  color: #1e3a8a;
  margin-top: 0;
}

.thanh-tich {
  color: #047857;
  font-weight: bold;
}`
    },
    hint: 'Dùng border: 2px solid #3b82f6; và border-radius: 12px; để bo góc hộp.',
    checkCriteria: (_doc, _html, css = '') => {
      const lower = css.toLowerCase();
      const hasBorder = lower.includes('border:') || lower.includes('border-color:');
      const hasRadius = lower.includes('border-radius:');
      const hasBg = lower.includes('background-color:') || lower.includes('background:');
      const passed = hasBorder && hasRadius && hasBg;
      return {
        passed,
        message: passed
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 1: Thẻ hồ sơ học sinh bo góc và màu tương phản hoàn chỉnh!'
          : `Còn thiếu: ${!hasBorder ? 'viền border, ' : ''}${!hasRadius ? 'bo góc border-radius, ' : ''}${!hasBg ? 'màu nền background-color' : ''}`
      };
    }
  },
  {
    id: 2,
    title: 'Nhiệm vụ 2: Chuẩn hóa mã màu HEX và RGB',
    description: 'Sử dụng hệ quy chiếu mã màu chuẩn: định nghĩa màu chữ bằng mã HEX (ví dụ: color: #1e40af;) và màu nền bằng hàm rgb(...) trong tệp CSS.',
    requirements: [
      'Có ít nhất một thuộc tính sử dụng mã màu HEX dạng #XXXXXX',
      'Có ít nhất một thuộc tính sử dụng hàm màu rgb(r, g, b)',
      'Màu sắc hiển thị hài hòa, chuẩn xác'
    ],
    targetResult: {
      title: 'Phối màu bằng HEX và RGB',
      description: 'Màu chữ và nền được định nghĩa chuẩn xác theo các hệ màu kỹ thuật số.',
      html: `<!DOCTYPE html>
<html>
<head>
  <title>Mã màu HEX và RGB</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="hop-mau">
    <h2>HỆ THỐNG MÃ MÀU SỐ HỌC</h2>
    <p>Chữ màu xanh dương HEX #1e40af trên nền dịu nhẹ rgb(238, 242, 255).</p>
  </div>
</body>
</html>`,
      css: `.hop-mau {
  background-color: rgb(238, 242, 255);
  border: 1px solid rgb(199, 210, 254);
  padding: 20px;
  border-radius: 8px;
}

h2 {
  color: #1e40af;
}

p {
  color: #374151;
}`
    },
    hint: 'Mã HEX bắt đầu bằng dấu # (ví dụ: #1e40af). Hàm RGB có 3 tham số từ 0 đến 255 (ví dụ: rgb(30, 64, 175)).',
    checkCriteria: (_doc, _html, css = '') => {
      const lower = css.toLowerCase();
      const hasHex = /#[0-9a-f]{3,6}/i.test(lower);
      const hasRgb = /rgb\s*\(/i.test(lower);
      const passed = hasHex && hasRgb;
      return {
        passed,
        message: passed
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 2: Đã sử dụng thành thạo cả hai hệ mã màu HEX và RGB!'
          : `Cần có cả mã màu HEX (#...) (${hasHex ? '✓' : 'thiếu'}) và hàm rgb(...) (${hasRgb ? '✓' : 'thiếu'}).`
      };
    }
  },
  {
    id: 3,
    title: 'Nhiệm vụ 3: Độ trong suốt với màu RGBA',
    description: 'Sử dụng màu trong suốt với kênh alpha RGBA (ví dụ: background-color: rgba(15, 23, 42, 0.8)) để tạo lớp phủ nền mờ sang trọng nhìn xuyên thấu.',
    requirements: [
      'Trong CSS có thuộc tính background-color sử dụng hàm rgba(...)',
      'Giá trị alpha nằm trong khoảng 0.5 đến 0.85',
      'Màu chữ bên trong là màu sáng (#ffffff) để đảm bảo độ tương phản'
    ],
    targetResult: {
      title: 'Lớp phủ nền trong suốt RGBA',
      description: 'Khung nội dung tối mờ cho phép nhìn xuyên thấu nhẹ lớp nền phía sau.',
      html: `<!DOCTYPE html>
<html>
<head>
  <title>Màu trong suốt RGBA</title>
  <link rel="stylesheet" href="style.css">
</head>
<body class="nen-chinh">
  <div class="lop-phu-mo">
    <h3>LỚP PHỦ NỀN MỜ VỚI RGBA</h3>
    <p>Nền này sử dụng rgba(15, 23, 42, 0.75) cho phép độ trong suốt 75%.</p>
  </div>
</body>
</html>`,
      css: `.nen-chinh {
  background-color: #2563eb;
  padding: 30px;
}

.lop-phu-mo {
  background-color: rgba(15, 23, 42, 0.75);
  color: #ffffff;
  padding: 24px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
}`
    },
    hint: 'rgba(đỏ, lục, lam, độ_mờ) với độ mờ từ 0 (trong suốt hoàn toàn) đến 1 (đục hoàn toàn).',
    checkCriteria: (_doc, _html, css = '') => {
      const lower = css.toLowerCase();
      const hasRgba = lower.includes('rgba(');
      return {
        passed: hasRgba,
        message: hasRgba
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 3: Đã áp dụng thành công độ trong suốt bằng màu RGBA!'
          : 'Cần có thuộc tính background-color sử dụng hàm rgba(...).'
      };
    }
  },
  {
    id: 4,
    title: 'Nhiệm vụ 4: Chèn hình ảnh làm nền (background-image)',
    description: 'Sử dụng hình ảnh có sẵn images/sun.png làm hình nền với thuộc tính background-image, kết hợp background-repeat: no-repeat và background-position: center.',
    requirements: [
      'Có thuộc tính background-image: url("images/sun.png") (hoặc tương đương)',
      'Có thuộc tính background-repeat: no-repeat chống lặp ảnh nền',
      'Định vị vị trí nền hoặc căn chỉnh kích thước khung chứa phù hợp'
    ],
    targetResult: {
      title: 'Hình ảnh làm nền bằng CSS',
      description: 'Bức ảnh mặt trời được đặt làm nền cho khung nội dung mà không bị lặp.',
      html: `<!DOCTYPE html>
<html>
<head>
  <title>Hình nền CSS</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="khung-hinh-nen">
    <div class="hop-noi-dung">
      <h3>CHÀO BÌNH MINH KHÓA 12</h3>
      <p>Năng lượng tích cực mỗi ngày đến trường.</p>
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
  height: 200px;
  border-radius: 12px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 12px;
}

.hop-noi-dung {
  background: rgba(255, 255, 255, 0.9);
  padding: 8px 16px;
  border-radius: 6px;
  text-align: center;
}`
    },
    hint: 'Cú pháp: background-image: url("images/sun.png"); background-repeat: no-repeat;.',
    checkCriteria: (_doc, _html, css = '') => {
      const lower = css.toLowerCase();
      const hasBgImg = lower.includes('background-image:') || lower.includes('url(');
      const hasNoRepeat = lower.includes('no-repeat');
      const passed = hasBgImg && hasNoRepeat;
      return {
        passed,
        message: passed
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 4: Đã chèn hình nền background-image và chống lặp thành công!'
          : `Còn thiếu: ${!hasBgImg ? 'background-image: url(...), ' : ''}${!hasNoRepeat ? 'background-repeat: no-repeat' : ''}`
      };
    }
  },
  {
    id: 5,
    title: 'Nhiệm vụ 5: Hộp thông báo đa trạng thái & Đổ bóng (box-shadow)',
    description: 'Thử thách tổng hợp: Thiết kế bộ hộp thông báo Alert thành công (Success màu xanh lá) hoặc Cảnh báo (Warning màu vàng) có viền viền trái nổi bật, bo góc và hiệu ứng đổ bóng hiện đại box-shadow.',
    requirements: [
      'Có viền bên trái dày nổi bật (ví dụ: border-left: 5px solid #22c55e;)',
      'Có màu nền dịu nhẹ tương thích với màu viền',
      'Có hiệu ứng đổ bóng nhẹ box-shadow: 0 4px 6px ...',
      'Có bo góc mềm mại border-radius'
    ],
    targetResult: {
      title: 'Hộp thông báo Alert Box chuyên nghiệp',
      description: 'Hộp cảnh báo có viền điểm nhấn bên trái và bóng mờ nổi bật.',
      html: `<!DOCTYPE html>
<html>
<head>
  <title>Hộp thông báo Alert</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="alert-box alert-success">
    <h4>✓ THÀNH CÔNG</h4>
    <p>Bạn đã hoàn thành toàn bộ bài kiểm tra thực hành HTML &amp; CSS.</p>
  </div>
</body>
</html>`,
      css: `.alert-box {
  padding: 16px;
  border-radius: 8px;
  max-width: 400px;
  margin: 20px auto;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.alert-success {
  background-color: #dcfce7;
  color: #166534;
  border-left: 6px solid #22c55e;
}

h4 {
  margin: 0 0 6px 0;
}`
    },
    hint: 'Phối hợp border-left dày 5px-6px, màu nền nhạt, bo góc border-radius và box-shadow.',
    checkCriteria: (_doc, _html, css = '') => {
      const lower = css.toLowerCase();
      const hasBorderLeft = lower.includes('border-left:') || lower.includes('border-left-');
      const hasShadow = lower.includes('box-shadow:');
      const hasRadius = lower.includes('border-radius:');
      const passed = hasBorderLeft && hasShadow && hasRadius;
      return {
        passed,
        message: passed
          ? 'Xuất sắc! Đã hoàn thành Nhiệm vụ 5: Hộp thông báo Alert Box với bóng đổ và viền điểm nhấn tuyệt đẹp!'
          : `Còn thiếu: ${!hasBorderLeft ? 'border-left, ' : ''}${!hasShadow ? 'box-shadow, ' : ''}${!hasRadius ? 'border-radius' : ''}`
      };
    }
  }
];
