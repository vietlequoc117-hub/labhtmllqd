import { CodeSample } from '../../types';

export const LESSON_7_SAMPLES: CodeSample[] = [
  {
    id: 1,
    title: '1. Cấu trúc trang web chuẩn siêu cơ bản',
    description: 'Trang web chuẩn với đầy đủ các thẻ khung doctype, html, head, title và body.',
    html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Trang web đầu tiên</title>
</head>
<body>
  <h1>Xin chào Thế Giới!</h1>
  <p>Đây là trang web đầu tiên em tự lập trình bằng HTML.</p>
</body>
</html>`
  },
  {
    id: 2,
    title: '2. 6 cấp bậc tiêu đề (h1 đến h6)',
    description: 'Minh họa thứ bậc kích thước và tầm quan trọng từ tiêu đề lớn nhất h1 đến nhỏ nhất h6.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Phân cấp tiêu đề</title>
</head>
<body>
  <h1>Tiêu đề Cấp 1 (Chủ đề chính)</h1>
  <h2>Tiêu đề Cấp 2 (Mục lớn)</h2>
  <h3>Tiêu đề Cấp 3 (Tiểu mục)</h3>
  <h4>Tiêu đề Cấp 4 (Ý phụ 1)</h4>
  <h5>Tiêu đề Cấp 5 (Ý phụ 2)</h5>
  <h6>Tiêu đề Cấp 6 (Ghi chú nhỏ nhất)</h6>
</body>
</html>`
  },
  {
    id: 3,
    title: '3. Giới thiệu bản thân học sinh lớp 12',
    description: 'Sử dụng tiêu đề h1, đoạn văn p và đường kẻ ngang hr ngăn cách.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Giới thiệu bản thân</title>
</head>
<body>
  <h1>HỒ SƠ HỌC SINH LỚP 12</h1>
  <p>Họ và tên: Nguyễn Văn An - Học sinh lớp 12A1.</p>
  <hr>
  <p>Ước mơ: Trúng tuyển ngành Công nghệ thông tin trường Đại học Bách Khoa.</p>
  <p>Sở thích: Lập trình web, chơi bóng rổ và đọc sách khoa học.</p>
</body>
</html>`
  },
  {
    id: 4,
    title: '4. Giới thiệu Tổ học tập / Nhóm bạn',
    description: 'Sử dụng div để chia khối các thành viên nhóm và ngắt dòng br.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Tổ 1 - Lớp 12A2</title>
</head>
<body>
  <h1>DANH SÁCH TỔ 1</h1>
  <hr>
  <div>
    <h3>1. Lê Bảo Nam (Tổ trưởng)</h3>
    <p>Nhiệm vụ: Phụ trách môn Toán và Tin học.<br>Điện thoại liên hệ: 0912.345.678</p>
  </div>
  <hr>
  <div>
    <h3>2. Trần Mai Lan (Tổ phó)</h3>
    <p>Nhiệm vụ: Phụ trách môn Tiếng Anh và Ngữ văn.<br>Email: mailan12@gmail.com</p>
  </div>
</body>
</html>`
  },
  {
    id: 5,
    title: '5. Bản tin Đoàn trường THPT',
    description: 'Tin tức sinh hoạt Đoàn thanh niên với ngày đăng và nội dung.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Bản tin Đoàn trường</title>
</head>
<body>
  <h1>PHÁT ĐỘNG THÁNG THANH NIÊN</h1>
  <p><i>Ngày đăng: 26/03/2026 - Tác giả: BCH Đoàn trường</i></p>
  <hr>
  <p>Chào mừng ngày thành lập Đoàn TNCS Hồ Chí Minh, nhà trường phát động phong trào thi đua hoa điểm tốt và giải bóng đá học sinh lớp 12.</p>
  <p>Mỗi chi đoàn đăng ký ít nhất 01 đội bóng và 01 tiết mục văn nghệ.</p>
</body>
</html>`
  },
  {
    id: 6,
    title: '6. Trích dẫn danh ngôn & Chân trang',
    description: 'Sử dụng thẻ div đóng gói nội dung và đoạn footer bản quyền.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Danh ngôn cuộc sống</title>
</head>
<body>
  <div>
    <h2>HỌC TẬP SUỐT ĐỜI</h2>
    <p>"Học vấn không có quê hương nhưng người học vấn phải có Tổ quốc." - Louis Pasteur</p>
  </div>
  <hr>
  <p>© 2026 Bản quyền thuộc về Nhóm dự án Tin học 12.</p>
</body>
</html>`
  },
  {
    id: 7,
    title: '7. Cẩm nang mẹo học tốt môn Tin học',
    description: 'Bố cục bài viết gồm tiêu đề, từng đoạn mẹo nhỏ kèm ngắt dòng.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Bí quyết học tốt Tin học</title>
</head>
<body>
  <h1>3 MẸO LẬP TRÌNH WEB HIỆU QUẢ</h1>
  <hr>
  <p><b>Mẹo 1:</b> Luôn mở và đóng cặp thẻ ngay khi gõ.<br>Ví dụ: gõ &lt;p&gt; là phải gõ ngay &lt;/p&gt;.</p>
  <p><b>Mẹo 2:</b> Thụt lề rõ ràng để phân biệt thẻ cha và thẻ con.</p>
  <p><b>Mẹo 3:</b> Thường xuyên chạy thử trên trình duyệt để kiểm tra giao diện.</p>
</body>
</html>`
  },
  {
    id: 8,
    title: '8. Thông báo Hoạt động Ngoại khóa',
    description: 'Văn bản thông báo chuẩn hành chính với địa điểm và thời gian.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Thông báo dã ngoại</title>
</head>
<body>
  <h1>THÔNG BÁO HOẠT ĐỘNG TRẢI NGHIỆM</h1>
  <hr>
  <p>Kính gửi: Phụ huynh và học sinh khối 12.</p>
  <p>Thời gian: 07h00 ngày Chủ nhật, tuần sau.<br>Địa điểm: Khu di tích Lịch sử Đền Hùng.<br>Phương tiện: Xe ô tô du lịch chất lượng cao.</p>
  <hr>
  <p>Yêu cầu học sinh mặc đồng phục chỉnh tề và có mặt đúng giờ.</p>
</body>
</html>`
  },
  {
    id: 9,
    title: '9. Khổ thơ tri ân Thầy Cô giáo',
    description: 'Dùng thẻ br ngắt các câu thơ và hr ngăn cách các khổ thơ.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Tri ân Thầy Cô</title>
</head>
<body>
  <h1>ƠN THẦY NGHĨA CÔ</h1>
  <p>Bao mùa phượng nở sân trường,<br>Thầy truyền tri thức dặm trường con đi.<br>Công ơn chẳng quản quản chi,<br>Khắc ghi lời dạy khắc ghi tấm lòng.</p>
  <hr>
  <p>Kính tặng Thầy Cô nhân ngày Nhà giáo Việt Nam 20/11.</p>
</body>
</html>`
  },
  {
    id: 10,
    title: '10. Nhật ký tiến độ làm dự án Web',
    description: 'Ghi chép từng ngày thực hiện đồ án môn Tin học 12 theo tuần.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Nhật ký dự án Tin 12</title>
</head>
<body>
  <h1>NHẬT KÝ DỰ ÁN WEB TIN HỌC 12</h1>
  <hr>
  <div>
    <h3>Tuần 1: Thiết kế cấu trúc (Bài 7 SGK)</h3>
    <p>Đã học cấu trúc HTML chuẩn, thẻ h1-h6, p, div, br, hr.<br>Đã tạo xong khung trang web chủ đề Thể thao học đường.</p>
  </div>
  <hr>
  <div>
    <h3>Tuần 2: Chuẩn bị nội dung</h3>
    <p>Thu thập tài liệu, ảnh minh họa và chuẩn bị định dạng văn bản.</p>
  </div>
</body>
</html>`
  }
];
