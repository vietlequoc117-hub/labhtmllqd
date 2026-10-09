import { CodeSample } from '../../types';

export const LESSON_10_SAMPLES: CodeSample[] = [
  {
    id: 1,
    title: '1. Liên kết neo nội bộ (Internal Anchor)',
    description: 'Menu chuyển hướng nhanh đến các mục #phan1, #phan2 trong cùng trang web.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Mục lục trang web</title>
</head>
<body>
  <h2 id="top">MỤC LỤC TRANG WEB</h2>
  <p>Bấm vào liên kết để nhảy nhanh đến nội dung:</p>
  <ul>
    <li><a href="#phan1">1. Giới thiệu tổng quan</a></li>
    <li><a href="#phan2">2. Nội dung chi tiết</a></li>
    <li><a href="#phan3">3. Kết luận và liên hệ</a></li>
  </ul>
  <hr>
  <h3 id="phan1">1. Giới thiệu tổng quan</h3>
  <p>Đây là phần 1 của tài liệu ôn tập Tin học 12. Nội dung tập trung vào cú pháp HTML chuẩn.</p>
  <p><a href="#top">↑ Về đầu trang</a></p>
  <hr>
  <h3 id="phan2">2. Nội dung chi tiết</h3>
  <p>Phần 2 trình bày cách sử dụng thẻ a và thuộc tính href để tạo liên kết siêu văn bản.</p>
  <p><a href="#top">↑ Về đầu trang</a></p>
  <hr>
  <h3 id="phan3">3. Kết luận và liên hệ</h3>
  <p>Phần 3 tổng kết các kiến thức trọng tâm của Bài 10 SGK.</p>
  <p><a href="#top">↑ Về đầu trang</a></p>
</body>
</html>`
  },
  {
    id: 2,
    title: '2. Liên kết tuyệt đối ra ngoài (target="_blank")',
    description: 'Liên kết tới các website giáo dục uy tín và mở tab mới.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Liên kết ngoài</title>
</head>
<body>
  <h2>CỔNG THÔNG TIN GIÁO DỤC HỮU ÍCH</h2>
  <p>Các trang web chính thức phục vụ học sinh ôn thi tốt nghiệp 12:</p>
  <ul>
    <li>
      <a href="https://moet.gov.vn" target="_blank">Bộ Giáo dục và Đào tạo (moet.gov.vn)</a>
    </li>
    <li>
      <a href="https://thitotnghiepthpt.emis.vn" target="_blank">Cổng quản lý thi tốt nghiệp THPT Quốc gia</a>
    </li>
    <li>
      <a href="https://vi.wikipedia.org" target="_blank">Bách khoa toàn thư mở Wikipedia Tiếng Việt</a>
    </li>
  </ul>
</body>
</html>`
  },
  {
    id: 3,
    title: '3. Liên kết tương đối giữa các tệp nội bộ',
    description: 'Chuyển hướng sang các trang thong_tin.html và CLB.html có sẵn trong bộ nhớ ảo.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Hệ thống trang web trường</title>
</head>
<body>
  <h2>CỔNG THÔNG TIN TRƯỜNG THPT</h2>
  <p>Chào mừng bạn đến với website trường học! Mời bạn xem các chuyên mục sau:</p>
  <p>👉 <a href="thong_tin.html"><b>Xem Trang Bản Tin Chi Tiết (thong_tin.html)</b></a></p>
  <p>👉 <a href="CLB.html"><b>Xem Hoạt Động Các Câu Lạc Bộ (CLB.html)</b></a></p>
  <hr>
  <p><i>Ghi chú: Cả 2 trang web trên đều được lưu trữ sẵn trong hệ thống tệp ảo của phòng lab.</i></p>
</body>
</html>`
  },
  {
    id: 4,
    title: '4. Biến hình ảnh thành nút bấm liên kết',
    description: 'Bọc thẻ img trong thẻ a để khi click vào ảnh sẽ chuyển trang.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Ảnh làm nút liên kết</title>
</head>
<body>
  <h2>THỂ THAO HỌC ĐƯỜNG 12</h2>
  <p>Bấm vào biểu tượng thể thao bên dưới để xem lịch thi đấu:</p>
  <a href="CLB.html" title="Nhấp để xem câu lạc bộ thể thao">
    <img src="images/thethao.png" alt="CLB Thể thao" width="280" style="border: 2px solid #2563eb; border-radius: 8px;">
  </a>
  <p><small>(Nhấp trực tiếp vào ảnh trên để chuyển tới trang CLB.html)</small></p>
</body>
</html>`
  },
  {
    id: 5,
    title: '5. Liên kết gửi Email (mailto:) và Gọi điện (tel:)',
    description: 'Tạo liên kết nhanh gửi thư cho giáo viên hoặc gọi hotline phòng thi.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Liên hệ hỗ trợ</title>
</head>
<body>
  <h2>BAN TƯ VẤN TUYỂN SINH LỚP 12</h2>
  <p>Khi gặp thắc mắc về hồ sơ đăng ký dự thi, học sinh liên hệ qua:</p>
  <p>📧 Email thầy cô phụ trách: <a href="mailto:tuyensinh12@thpt.edu.vn">tuyensinh12@thpt.edu.vn</a></p>
  <p>📞 Hotline phòng học vụ: <a href="tel:02438889999">024.3888.9999</a></p>
  <hr>
  <p>Giờ trực tư vấn: 08h00 - 17h00 các ngày làm việc trong tuần.</p>
</body>
</html>`
  },
  {
    id: 6,
    title: '6. Cẩm nang tuyển sinh với Menu cuộn mượt',
    description: 'Hệ thống liên kết neo tới từng khối thi A00, B00, C00, D01.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Tư vấn chọn khối thi</title>
</head>
<body>
  <h2>HƯỚNG DẪN CHỌN KHỐI THI ĐẠI HỌC</h2>
  <p>Chọn khối thi phù hợp:</p>
  <p>
    [ <a href="#khoiA">Khối A00</a> ] &nbsp;|&nbsp;
    [ <a href="#khoiB">Khối B00</a> ] &nbsp;|&nbsp;
    [ <a href="#khoiD">Khối D01</a> ]
  </p>
  <hr>
  <h3 id="khoiA">Khối A00: Toán, Vật lý, Hóa học</h3>
  <p>Phù hợp với các ngành: Công nghệ thông tin, Kỹ thuật điện tử, Cơ điện tử, Xây dựng.</p>
  <hr>
  <h3 id="khoiB">Khối B00: Toán, Hóa học, Sinh học</h3>
  <p>Phù hợp với các ngành: Y đa khoa, Dược học, Công nghệ sinh học, Nông nghiệp.</p>
  <hr>
  <h3 id="khoiD">Khối D01: Toán, Ngữ văn, Tiếng Anh</h3>
  <p>Phù hợp với các ngành: Kinh tế đối ngoại, Quản trị kinh doanh, Ngoại giao, Ngôn ngữ Anh.</p>
</body>
</html>`
  },
  {
    id: 7,
    title: '7. Thanh điều hướng Breadcrumb',
    description: 'Mô phỏng đường dẫn phân cấp trang web thường thấy trên các cổng thông tin.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Điều hướng Breadcrumb</title>
</head>
<body>
  <nav style="background-color: #f1f5f9; padding: 10px; border-radius: 6px;">
    <a href="index.html">Trang chủ</a> &gt;
    <a href="thong_tin.html">Tin học 12</a> &gt;
    <a href="#chu-de-4">Chủ đề 4</a> &gt;
    <b>Bài 10: Tạo liên kết</b>
  </nav>
  <h2>BÀI 10: TẠO LIÊN KẾT TRANG WEB</h2>
  <p>Thanh điều hướng ở trên giúp người đọc nắm được vị trí hiện tại của trang trong hệ thống website.</p>
</body>
</html>`
  },
  {
    id: 8,
    title: '8. Liên kết tải tài liệu học tập (download)',
    description: 'Thẻ a với thuộc tính download để tải file đề cương ôn tập.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Tải tài liệu ôn tập</title>
</head>
<body>
  <h2>KHO HỌC LIỆU SỐ TIN HỌC 12</h2>
  <p>Học sinh tải về các đề thi thử và tài liệu tóm tắt lý thuyết dưới đây:</p>
  <p>📥 <a href="de_cuong_tin12.pdf" download="DeCuongTinHoc12_HocKy2.pdf">Tải Đề Cương Ôn Tập Tin Học 12 (PDF)</a></p>
  <p>📥 <a href="ma_nguon_mau.zip" download="MaNguonMau_HTML_CSS.zip">Tải Bộ Mã Nguồn Mẫu Bài Tập Thực Hành (ZIP)</a></p>
</body>
</html>`
  },
  {
    id: 9,
    title: '9. Nút bấm Call-To-Action định dạng từ thẻ liên kết',
    description: 'Thẻ a được trang trí style như một nút bấm nổi bật.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Nút bấm liên kết</title>
</head>
<body>
  <div style="text-align: center; padding: 20px; background-color: #eff6ff; border-radius: 12px;">
    <h2>KỲ THI THỬ TỐT NGHIỆP TRỰC TUYẾN</h2>
    <p>Đăng ký ngay hôm nay để nhận kết quả phân tích điểm thi chi tiết theo từng chuyên đề.</p>
    <a href="thong_tin.html" style="display: inline-block; background-color: #1e40af; color: white; padding: 10px 24px; text-decoration: none; font-weight: bold; border-radius: 6px;">
      ĐĂNG KÝ THI THỬ NGAY →
    </a>
  </div>
</body>
</html>`
  },
  {
    id: 10,
    title: '10. Trang Thư viện liên kết trực tuyến hữu ích',
    description: 'Danh mục website học tập kèm icon, tiêu đề và liên kết trỏ ngoài an toàn.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Thư viện liên kết</title>
</head>
<body>
  <h2>THƯ VIỆN TÀI NGUYÊN HỌC TẬP</h2>
  <table border="1" cellpadding="8" style="width: 100%; border-collapse: collapse;">
    <tr style="background-color: #e0f2fe;">
      <th>Kênh học tập</th>
      <th>Mô tả</th>
      <th>Liên kết truy cập</th>
    </tr>
    <tr>
      <td><b>W3Schools</b></td>
      <td>Trang hướng dẫn lập trình Web HTML, CSS từ cơ bản đến nâng cao.</td>
      <td><a href="https://www.w3schools.com" target="_blank">w3schools.com</a></td>
    </tr>
    <tr>
      <td><b>MDN Web Docs</b></td>
      <td>Tài liệu chuẩn mực phát triển web của tập đoàn Mozilla.</td>
      <td><a href="https://developer.mozilla.org" target="_blank">developer.mozilla.org</a></td>
    </tr>
  </table>
</body>
</html>`
  }
];
