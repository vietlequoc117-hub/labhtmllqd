import { CodeSample } from '../../types';

export const LESSON_13_SAMPLES: CodeSample[] = [
  {
    id: 1,
    title: '1. Ba cách chèn CSS vào trang web',
    description: 'Minh họa Inline Style, Internal Style (thẻ style) và External Style (thẻ link).',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>3 Cách chèn CSS</title>
  <!-- Cách 2: Internal CSS (trong thẻ style) -->
  <style>
    .internal-box {
      background-color: #dbeafe;
      padding: 12px;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <h2>MINH HỌA 3 CÁCH CHÈN CSS</h2>

  <!-- Cách 1: Inline CSS -->
  <p style="color: #dc2626; font-weight: bold;">
    1. Đoạn văn dùng Inline CSS trực tiếp bằng thuộc tính style.
  </p>

  <!-- Cách 2: Internal CSS -->
  <div class="internal-box">
    <p>2. Khối này được định kiểu bằng Internal CSS trong thẻ &lt;style&gt;.</p>
  </div>

  <!-- Cách 3: External CSS -->
  <p class="external-note">
    3. External CSS được tải từ tệp style.css riêng biệt.
  </p>
</body>
</html>`,
    css: `.external-note {
  color: #1e40af;
  font-style: italic;
  border-left: 4px solid #3b82f6;
  padding-left: 8px;
}`
  },
  {
    id: 2,
    title: '2. Bộ chọn phần tử (Element Selector)',
    description: 'Định kiểu đồng loạt cho các thẻ h1, p, ul chỉ bằng tên thẻ.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Element Selector</title>
</head>
<body>
  <h1>TIÊU ĐỀ CHÍNH CỦA TRANG</h1>
  <p>Đoạn văn bản thứ nhất được định dạng thống nhất.</p>
  <p>Đoạn văn bản thứ hai tự động nhận kiểu dáng tương tự.</p>
  <ul>
    <li>Mục danh sách thứ nhất</li>
    <li>Mục danh sách thứ hai</li>
  </ul>
</body>
</html>`,
    css: `h1 {
  color: #1e3a8a;
  border-bottom: 2px solid #2563eb;
  padding-bottom: 6px;
}

p {
  color: #334155;
  font-size: 15px;
  line-height: 1.6;
}

ul {
  background-color: #f8fafc;
  padding: 15px 30px;
  border-radius: 6px;
}`
  },
  {
    id: 3,
    title: '3. Bộ chọn định danh ID (#header, #content)',
    description: 'Sử dụng dấu thăng (#) để định kiểu cho phần tử duy nhất trong trang.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Bộ chọn ID</title>
</head>
<body>
  <div id="banner-chinh">
    <h1>CHÀO MỪNG NĂM HỌC MỚI 2025 - 2026</h1>
    <p>Trường THPT Chuyên - Khối 12 Quyết Thắng</p>
  </div>
  <div id="thong-bao">
    <p>Lễ khai giảng diễn ra vào lúc 7h30 sáng ngày 05/09 tại sân trường chính.</p>
  </div>
</body>
</html>`,
    css: `#banner-chinh {
  background-color: #1e40af;
  color: #ffffff;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
}

#thong-bao {
  background-color: #fef3c7;
  color: #92400e;
  padding: 12px;
  margin-top: 15px;
  border-left: 5px solid #f59e0b;
}`
  },
  {
    id: 4,
    title: '4. Bộ chọn lớp Class (.the-tin, .gia-tien)',
    description: 'Sử dụng dấu chấm (.) để định kiểu tái sử dụng cho nhiều phần tử.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Bộ chọn Class</title>
</head>
<body>
  <h2>DANH SÁCH KHÓA HỌC TRỰC TUYẾN</h2>
  <div class="khoa-hoc">
    <h3>Lập trình HTML &amp; CSS căn bản</h3>
    <p>Thời lượng: 10 buổi thực hành.</p>
    <p class="gia-tien">Học phí: Miễn phí</p>
  </div>

  <div class="khoa-hoc">
    <h3>Luyện thi Tin học 12 theo chuyên đề</h3>
    <p>Thời lượng: 15 buổi giải đề thi mẫu.</p>
    <p class="gia-tien">Học phí: 199.000 VNĐ</p>
  </div>
</body>
</html>`,
    css: `.khoa-hoc {
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 14px;
  margin-bottom: 12px;
  background-color: #f8fafc;
}

.gia-tien {
  color: #dc2626;
  font-weight: bold;
  font-size: 16px;
}`
  },
  {
    id: 5,
    title: '5. Bộ chọn kết hợp hậu duệ (Descendant Selector)',
    description: 'Định kiểu cho phần tử con nằm bên trong phần tử cha (ví dụ: nav a).',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Bộ chọn kết hợp</title>
</head>
<body>
  <nav class="thanh-menu">
    <a href="#">Trang chủ</a>
    <a href="#">Tin tức</a>
    <a href="#">Liên hệ</a>
  </nav>

  <p>Đây là liên kết ngoài menu: <a href="#">Xem chi tiết</a></p>
</body>
</html>`,
    css: `.thanh-menu {
  background-color: #0f172a;
  padding: 12px;
  border-radius: 6px;
}

/* Chỉ định dạng thẻ a nằm bên trong .thanh-menu */
.thanh-menu a {
  color: #38bdf8;
  text-decoration: none;
  font-weight: bold;
  margin-right: 18px;
}

.thanh-menu a:hover {
  color: #ffffff;
}`
  },
  {
    id: 6,
    title: '6. Tính kế thừa trong CSS (Inheritance)',
    description: 'Đặt font-family và color trên body, các thẻ con tự động kế thừa.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Kế thừa CSS</title>
</head>
<body>
  <h1>Tiêu đề tự nhận font sans-serif</h1>
  <p>Đoạn văn bản kế thừa màu chữ xám đậm và kiểu chữ từ thẻ cha body.</p>
  <div>
    <span>Thẻ span bên trong div cũng tự động kế thừa kiểu chữ!</span>
  </div>
</body>
</html>`,
    css: `body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #334155;
  background-color: #f1f5f9;
  padding: 20px;
}`
  },
  {
    id: 7,
    title: '7. Thứ tự ưu tiên ghi đè (Cascade Specificity)',
    description: 'So sánh mức độ ưu tiên: Inline Style > ID > Class > Element.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Độ ưu tiên CSS</title>
</head>
<body>
  <h2>QUY TẮC ĐỘ ƯU TIÊN (SPECIFICITY)</h2>
  
  <p class="van-ban">1. Thẻ này nhận màu xanh từ class .van-ban.</p>
  
  <p id="dac-biet" class="van-ban">2. Thẻ này có cả ID và Class: ID sẽ thắng thế (màu tím)!</p>
  
  <p id="dac-biet" class="van-ban" style="color: red;">
    3. Thẻ này có thêm Inline style: Inline style thắng tất cả (màu đỏ)!
  </p>
</body>
</html>`,
    css: `p {
  color: #64748b; /* Thấp nhất: Element selector */
}

.van-ban {
  color: #2563eb; /* Cao hơn Element: Class selector */
}

#dac-biet {
  color: #9333ea; /* Cao hơn Class: ID selector */
  font-weight: bold;
}`
  },
  {
    id: 8,
    title: '8. Thiết kế Nút bấm hiện đại (Button CSS)',
    description: 'Định kiểu class nút bấm bo góc, bóng mờ và hiệu ứng rê chuột.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Nút bấm CSS</title>
</head>
<body>
  <h2>CÁC KIỂU NÚT BẤM (BUTTON)</h2>
  <button class="btn btn-primary">Nút Chính (Primary)</button>
  <button class="btn btn-success">Hoàn thành (Success)</button>
  <button class="btn btn-danger">Hủy bỏ (Danger)</button>
</body>
</html>`,
    css: `.btn {
  padding: 8px 18px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 8px;
}

.btn-primary {
  background-color: #2563eb;
  color: white;
}

.btn-success {
  background-color: #16a34a;
  color: white;
}

.btn-danger {
  background-color: #dc2626;
  color: white;
}`
  },
  {
    id: 9,
    title: '9. Thẻ Thông báo Card tin tức',
    description: 'Kết hợp ID và Class để tạo một khung tin tức với viền và bóng đổ.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Card tin tức</title>
</head>
<body>
  <div class="tin-card">
    <span class="nhan-tin">NỔI BẬT</span>
    <h3 class="tieu-de-tin">Đội tuyển Tin học 12 đạt giải Nhất Quốc gia</h3>
    <p class="mo-ta-tin">Nhà trường vinh danh 5 học sinh xuất sắc trong kỳ thi chọn Học sinh giỏi Quốc gia năm học 2025-2026.</p>
    <div class="ngay-dang">Cập nhật: 10 phút trước</div>
  </div>
</body>
</html>`,
    css: `.tin-card {
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 16px;
  background: white;
  max-width: 420px;
}

.nhan-tin {
  background-color: #ef4444;
  color: white;
  font-size: 11px;
  font-weight: bold;
  padding: 3px 8px;
  border-radius: 4px;
}

.tieu-de-tin {
  color: #0f172a;
  margin: 10px 0 6px 0;
}

.mo-ta-tin {
  color: #475569;
  font-size: 14px;
}

.ngay-dang {
  color: #94a3b8;
  font-size: 12px;
  margin-top: 8px;
}`
  },
  {
    id: 10,
    title: '10. Bố cục 3 khối cơ bản (Header, Main, Footer)',
    description: 'Sử dụng CSS để phân biệt rõ ràng 3 phân vùng cấu trúc trang web.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Bố cục trang web</title>
</head>
<body>
  <div id="trang-web">
    <header id="dau-trang">
      <h2>WEBSITE HỌC TẬP TIN HỌC 12</h2>
    </header>
    
    <main id="than-trang">
      <p>Nội dung chính của trang web: Cung cấp bài giảng và bài tập thực hành.</p>
    </main>
    
    <footer id="chan-trang">
      <p>© 2026 Phòng Thực Hành Ảo Tin Học 12</p>
    </footer>
  </div>
</body>
</html>`,
    css: `#trang-web {
  width: 90%;
  margin: 0 auto;
  border: 1px solid #cbd5e1;
}

#dau-trang {
  background-color: #1e3a8a;
  color: white;
  padding: 15px;
  text-align: center;
}

#than-trang {
  padding: 25px;
  background-color: #f8fafc;
  min-height: 120px;
}

#chan-trang {
  background-color: #0f172a;
  color: #94a3b8;
  padding: 10px;
  text-align: center;
  font-size: 12px;
}`
  }
];
