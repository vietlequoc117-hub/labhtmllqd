import { CodeSample } from '../../types';

export const LESSON_18_SAMPLES: CodeSample[] = [
  {
    id: 1,
    title: '1. Website CLB Thể thao tổng hợp hoàn chỉnh',
    description: 'Bố cục đầy đủ header, nav menu, banner ảnh, bảng lịch tập, form đăng ký và footer.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>CLB Thể Thao Học Đường</title>
</head>
<body>
  <header>
    <h1>CÂU LẠC BỘ THỂ THAO TRƯỜNG THPT</h1>
    <p>Nơi rèn luyện sức khỏe và thắp sáng đam mê học đường</p>
  </header>

  <nav>
    <a href="#gioithieu">Giới thiệu</a>
    <a href="#lichtap">Lịch tập luyện</a>
    <a href="#dangky">Đăng ký tham gia</a>
  </nav>

  <main>
    <section id="gioithieu">
      <h2>1. Giới thiệu chung</h2>
      <p>Câu lạc bộ thể thao được thành lập nhằm tạo sân chơi bổ ích cho học sinh sau giờ học căng thẳng.</p>
      <img src="images/thethao.png" alt="Ảnh thể thao" width="380">
    </section>

    <section id="lichtap">
      <h2>2. Lịch tập luyện</h2>
      <table border="1" style="width: 100%; border-collapse: collapse;">
        <tr><th>Môn</th><th>Ngày</th><th>Thời gian</th></tr>
        <tr><td>Bóng đá</td><td>Thứ 3 &amp; Thứ 5</td><td>16h30 - 18h00</td></tr>
        <tr><td>Cầu lông</td><td>Thứ 7</td><td>08h00 - 10h00</td></tr>
      </table>
    </section>

    <section id="dangky">
      <h2>3. Đăng ký tham gia</h2>
      <form>
        <p>Họ tên: <input type="text" required></p>
        <p>Lớp: <input type="text" required></p>
        <p><button type="submit" class="btn">Gửi đơn đăng ký</button></p>
      </form>
    </section>
  </main>

  <footer>
    <p>© 2026 CLB Thể thao Trường THPT. Bản quyền thuộc về học sinh khối 12.</p>
  </footer>
</body>
</html>`,
    css: `body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f8fafc;
  color: #1e293b;
}

header {
  background-color: #1e40af;
  color: white;
  text-align: center;
  padding: 24px;
}

nav {
  background-color: #0f172a;
  padding: 12px;
  text-align: center;
}

nav a {
  color: #38bdf8;
  text-decoration: none;
  font-weight: bold;
  margin: 0 15px;
}

main {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
}

table th {
  background: #dbeafe;
  padding: 8px;
}

table td {
  padding: 8px;
  text-align: center;
}

.btn {
  background: #2563eb;
  color: white;
  padding: 8px 18px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

footer {
  text-align: center;
  padding: 16px;
  background: #0f172a;
  color: #94a3b8;
  font-size: 13px;
}`
  },
  {
    id: 2,
    title: '2. Trang Portfolio Cá nhân Học sinh 12',
    description: 'Hồ sơ năng lực học tập, kỹ năng Tin học, dự án đã làm và biểu mẫu liên hệ.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Portfolio - Nguyễn Hoàng Long</title>
</head>
<body>
  <header class="header-pf">
    <div class="avatar">HL</div>
    <h1>NGUYỄN HOÀNG LONG</h1>
    <p>Học sinh lớp 12A1 | Yêu thích Lập trình Web &amp; Khoa học máy tính</p>
  </header>

  <main class="main-pf">
    <section>
      <h3>KỸ NĂNG NỔI BẬT</h3>
      <ul>
        <li>HTML5 &amp; CSS3 cơ bản</li>
        <li>Giải thuật Tin học 12 (Python, Pascal)</li>
        <li>Tiếng Anh IELTS 7.0</li>
      </ul>
    </section>
    
    <section>
      <h3>MỤC TIÊU NĂM 2026</h3>
      <p>Trúng tuyển Đại học Quốc gia ngành Khoa học Máy tính và hoàn thành xuất sắc đồ án tốt nghiệp Tin học 12.</p>
    </section>
  </main>
</body>
</html>`,
    css: `body {
  font-family: 'Segoe UI', Tahoma, sans-serif;
  background: #f1f5f9;
  margin: 0;
  padding: 20px;
}

.header-pf {
  text-align: center;
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  color: white;
  padding: 30px;
  border-radius: 12px;
}

.avatar {
  width: 70px;
  height: 70px;
  line-height: 70px;
  background: white;
  color: #1e3a8a;
  font-size: 24px;
  font-weight: bold;
  border-radius: 50%;
  margin: 0 auto 10px auto;
}

.main-pf {
  max-width: 600px;
  margin: 20px auto;
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}`
  },
  {
    id: 3,
    title: '3. Cổng Tư vấn Tuyển sinh Đại học',
    description: 'Trang thông tin ngành học, bảng chỉ tiêu và hộp gửi câu hỏi thắc mắc.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Tuyển sinh 12</title>
</head>
<body>
  <header class="tuyen-sinh-header">
    <h2>CẨM NANG TUYỂN SINH ĐẠI HỌC 2026</h2>
  </header>
  <div class="noi-dung">
    <h3>BẢNG CHỈ TIÊU CÁC KHỐI NGÀNH HOT</h3>
    <table border="1" style="width: 100%; border-collapse: collapse;">
      <tr style="background: #e0f2fe;"><th>Ngành</th><th>Tổ hợp</th><th>Chỉ tiêu</th></tr>
      <tr><td>Công nghệ thông tin</td><td>A00, A01</td><td>350</td></tr>
      <tr><td>Kỹ thuật Phần mềm</td><td>A00, D01</td><td>200</td></tr>
    </table>
    
    <h3>ĐẶT CÂU HỎI CHO BAN TƯ VẤN</h3>
    <form>
      <input type="text" placeholder="Họ tên thí sinh" style="width: 100%; padding: 8px; margin-bottom: 8px;"><br>
      <textarea placeholder="Nội dung thắc mắc..." style="width: 100%; padding: 8px;"></textarea><br>
      <button type="submit" style="background: #0284c7; color: white; padding: 8px 16px; border: none; border-radius: 4px; margin-top: 8px;">Gửi thắc mắc</button>
    </form>
  </div>
</body>
</html>`,
    css: `.tuyen-sinh-header {
  background: #0369a1;
  color: white;
  padding: 16px;
  text-align: center;
}

.noi-dung {
  max-width: 650px;
  margin: 20px auto;
  padding: 20px;
  background: white;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
}

table td, table th {
  padding: 8px;
  text-align: center;
}`
  },
  {
    id: 4,
    title: '4. Báo Tường Điện tử Chi đoàn 12A',
    description: 'Thiết kế trang báo tường kỷ niệm ngày Nhà giáo Việt Nam 20/11.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Báo tường 20/11</title>
</head>
<body>
  <div class="khung-bao-tuong">
    <h1 class="tua-de-bao">TRI ÂN NGƯỜI LÁI ĐÒ</h1>
    <div class="slogan">Số đặc biệt chào mừng Ngày Nhà giáo Việt Nam</div>
    
    <article class="bai-tho">
      <h3>BỤI PHẤN TRƯỜNG XƯA</h3>
      <p><i>"Khi thầy viết bảng, bụi phấn rơi rơi...<br>Có hạt bụi nào rơi trên bục giảng,<br>Có hạt bụi nào vương trên tóc thầy..."</i></p>
    </article>
  </div>
</body>
</html>`,
    css: `.khung-bao-tuong {
  max-width: 500px;
  margin: 20px auto;
  padding: 30px;
  background: #fefce8;
  border: 4px double #ca8a04;
  border-radius: 16px;
  text-align: center;
}

.tua-de-bao {
  color: #854d0e;
  font-size: 26px;
  letter-spacing: 2px;
}

.slogan {
  color: #a16207;
  font-size: 13px;
  margin-bottom: 20px;
}

.bai-tho {
  background: white;
  padding: 18px;
  border-radius: 8px;
  border: 1px solid #fde047;
  line-height: 1.8;
}`
  },
  {
    id: 5,
    title: '5. Thư viện Đề thi và Học liệu số',
    description: 'Trang tra cứu tài liệu học tập với thanh lọc danh mục và liên kết tải về.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Thư viện đề thi</title>
</head>
<body>
  <h2>KHO HỌC LIỆU TRỰC TUYẾN 12</h2>
  <div class="danh-sach-de">
    <div class="de-thi">
      <h4>Đề thi thử Tốt nghiệp THPT môn Tin học - Lần 1</h4>
      <p>Thời gian làm bài: 50 phút (40 câu trắc nghiệm)</p>
      <a href="#" class="btn-tai">📥 Tải đề thi PDF</a>
    </div>
    <div class="de-thi">
      <h4>Bộ 10 bài thực hành lập trình Web chuẩn SGK</h4>
      <p>Bao gồm mã nguồn HTML và CSS mẫu có chú thích chi tiết</p>
      <a href="#" class="btn-tai">📥 Tải mã nguồn ZIP</a>
    </div>
  </div>
</body>
</html>`,
    css: `.danh-sach-de {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.de-thi {
  background: #ffffff;
  padding: 16px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  border-left: 5px solid #2563eb;
}

.de-thi h4 {
  margin: 0 0 6px 0;
  color: #1e3a8a;
}

.btn-tai {
  display: inline-block;
  margin-top: 8px;
  background: #dbeafe;
  color: #1e40af;
  padding: 6px 14px;
  text-decoration: none;
  font-weight: bold;
  border-radius: 4px;
}`
  },
  {
    id: 6,
    title: '6. Trang Giới thiệu Di tích Lịch sử',
    description: 'Bố cục bài viết dã ngoại học tập với hình ảnh và đoạn thuyết minh danh lam thắng cảnh.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Di tích Lịch sử</title>
</head>
<body>
  <article class="bai-viet-di-tich">
    <h2>KHU DI TÍCH LỊCH SỬ ĐỀN HÙNG</h2>
    <p class="sapo">Nơi cội nguồn của dân tộc Việt Nam, mảnh đất thiêng liêng lưu giữ nghìn năm văn hiến.</p>
    <img src="images/thethao.png" alt="Ảnh di tích" width="100%" style="border-radius: 8px;">
    <p>Hàng năm vào dịp Giỗ Tổ mùng 10 tháng 3 âm lịch, hàng triệu đồng bào từ khắp mọi miền Tổ quốc lại hành hương về đây để tưởng nhớ công ơn các vua Hùng đã có công dựng nước.</p>
  </article>
</body>
</html>`,
    css: `.bai-viet-di-tich {
  max-width: 580px;
  margin: 20px auto;
  padding: 24px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  line-height: 1.8;
}

.sapo {
  font-style: italic;
  color: #64748b;
  border-left: 4px solid #f59e0b;
  padding-left: 12px;
}`
  },
  {
    id: 7,
    title: '7. Bảng Xếp hạng Thi đua các Chi đoàn',
    description: 'Bảng tổng kết điểm nề nếp và học tập với danh hiệu Nhất, Nhì, Ba nổi bật.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Bảng xếp hạng thi đua</title>
</head>
<body>
  <h2>KẾT QUẢ THI ĐUA THÁNG 3 - KHỐI 12</h2>
  <table class="bang-xep-hang" style="width: 100%; border-collapse: collapse;">
    <tr style="background: #1e3a8a; color: white;">
      <th>Hạng</th><th>Chi đoàn</th><th>Điểm học tập</th><th>Điểm phong trào</th><th>Tổng điểm</th>
    </tr>
    <tr style="background: #fef08a;">
      <td>🥇 <b>1</b></td><td>12A1</td><td>98</td><td>95</td><td><b>193</b></td>
    </tr>
    <tr>
      <td>🥈 <b>2</b></td><td>12A3</td><td>94</td><td>96</td><td><b>190</b></td>
    </tr>
    <tr>
      <td>🥉 <b>3</b></td><td>12A5</td><td>92</td><td>90</td><td><b>182</b></td>
    </tr>
  </table>
</body>
</html>`,
    css: `.bang-xep-hang td, .bang-xep-hang th {
  padding: 10px;
  text-align: center;
  border: 1px solid #cbd5e1;
}`
  },
  {
    id: 8,
    title: '8. Trang Bản tin Công nghệ Tuổi trẻ',
    description: 'Giao diện tạp chí công nghệ với 2 cột tin tức và hình ảnh minh họa.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Bản tin công nghệ</title>
</head>
<body>
  <h2>CÔNG NGHỆ &amp; HỌC SINH 12</h2>
  <div class="luoi-tin">
    <div class="tin-nho">
      <h4>Trí tuệ nhân tạo hỗ trợ học tập</h4>
      <p>Cách sử dụng AI như một trợ giảng thông minh hỗ trợ giải toán và luyện viết code.</p>
    </div>
    <div class="tin-nho">
      <h4>Kỹ năng an toàn thông tin mạng</h4>
      <p>Bảo vệ tài khoản cá nhân và phòng tránh lừa đảo trực tuyến trong giới trẻ.</p>
    </div>
  </div>
</body>
</html>`,
    css: `.luoi-tin {
  display: flex;
  gap: 16px;
}

.tin-nho {
  flex: 1;
  background: #f8fafc;
  padding: 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.tin-nho h4 {
  color: #1e40af;
  margin-top: 0;
}`
  },
  {
    id: 9,
    title: '9. Trang Đăng ký Tham gia Ngày hội Hướng nghiệp',
    description: 'Biểu mẫu tương tác nhiều bước chọn ngành nghề và nguyện vọng học tập.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Ngày hội hướng nghiệp</title>
</head>
<body>
  <h2>ĐĂNG KÝ THAM GIA NGÀY HỘI HƯỚNG NGHIỆP 2026</h2>
  <form class="form-huong-nghiep">
    <p>Họ tên: <input type="text" style="width: 100%;" required></p>
    <p>Trường THPT: <input type="text" style="width: 100%;" required></p>
    <p>Ngành nghề quan tâm: 
      <select style="width: 100%; padding: 6px;">
        <option>Công nghệ thông tin &amp; Viễn thông</option>
        <option>Kinh tế &amp; Quản trị kinh doanh</option>
        <option>Y Dược &amp; Sức khỏe</option>
        <option>Sư phạm &amp; Ngôn ngữ</option>
      </select>
    </p>
    <button type="submit" style="background: #16a34a; color: white; padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">Đăng ký miễn phí</button>
  </form>
</body>
</html>`,
    css: `.form-huong-nghiep {
  max-width: 480px;
  margin: 0 auto;
  background: white;
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}`
  },
  {
    id: 10,
    title: '10. Trang Tổng kết Đồ án Tin học 12',
    description: 'Trang web tổng kết toàn bộ 18 bài học với danh sách thành viên nhóm và điểm tự đánh giá.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Tổng kết Đồ án Tin học 12</title>
</head>
<body>
  <div class="hop-tong-ket">
    <h1>BÁO CÁO DỰ ÁN HỌC TẬP WEB 12</h1>
    <p>Chủ đề: Xây dựng phòng thực hành ảo HTML &amp; CSS theo SGK Kết nối tri thức</p>
    <hr>
    <h3>Nhóm tác giả: Nhóm 1 - Lớp 12A</h3>
    <ul>
      <li>Nguyễn Văn An - Trưởng nhóm, Thiết kế cấu trúc HTML</li>
      <li>Trần Mai Lan - Lập trình CSS &amp; Đồ họa giao diện</li>
      <li>Lê Bảo Nam - Kiểm thử tính năng và tài nguyên ảo</li>
    </ul>
    <div class="loi-ket">
      <b>Kết quả:</b> Đã hoàn thành 100% các tiêu chí từ Bài 7 đến Bài 18 SGK Tin học 12.
    </div>
  </div>
</body>
</html>`,
    css: `.hop-tong-ket {
  max-width: 650px;
  margin: 30px auto;
  background: #ffffff;
  padding: 30px;
  border-radius: 16px;
  border: 2px solid #2563eb;
  box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.2);
}

.hop-tong-ket h1 {
  color: #1e40af;
  text-align: center;
  margin-top: 0;
}

.loi-ket {
  margin-top: 20px;
  padding: 14px;
  background: #dcfce7;
  color: #166534;
  border-radius: 8px;
  text-align: center;
}`
  }
];
