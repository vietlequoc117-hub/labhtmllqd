import { CodeSample } from '../../types';

export const LESSON_9_SAMPLES: CodeSample[] = [
  {
    id: 1,
    title: '1. Lịch CLB Thể thao (Hình 9.8 SGK)',
    description: 'Bảng có caption, gộp cột colspan=5 cho Ngày và gộp dòng rowspan=2 cho Bộ môn & GV.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Lịch CLB Thể thao</title>
</head>
<body>
  <h2>HOẠT ĐỘNG THỂ THAO TRƯỜNG THPT</h2>
  <table border="1" cellpadding="6" cellspacing="0" style="width: 100%; border-collapse: collapse;">
    <caption style="font-weight: bold; margin-bottom: 8px;">Lịch hoạt động các CLB Thể thao</caption>
    <tr style="background-color: #dbeafe;">
      <th rowspan="2">Bộ môn</th>
      <th rowspan="2">Giáo viên phụ trách</th>
      <th colspan="5">Ngày trong tuần</th>
    </tr>
    <tr style="background-color: #eff6ff;">
      <th>Thứ 2</th>
      <th>Thứ 3</th>
      <th>Thứ 4</th>
      <th>Thứ 5</th>
      <th>Thứ 6</th>
    </tr>
    <tr>
      <td><b>Bóng đá</b></td>
      <td>Thầy Nam</td>
      <td>✓</td>
      <td></td>
      <td>✓</td>
      <td></td>
      <td>✓</td>
    </tr>
    <tr>
      <td><b>Cầu lông</b></td>
      <td>Cô Hà</td>
      <td></td>
      <td>✓</td>
      <td></td>
      <td>✓</td>
      <td></td>
    </tr>
  </table>
</body>
</html>`
  },
  {
    id: 2,
    title: '2. Thời khóa biểu tuần của lớp 12A1',
    description: 'Bảng thời khóa biểu 5 tiết mỗi buổi với viền border và màu nền hàng tiêu đề.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Thời khóa biểu 12A1</title>
</head>
<body>
  <h2>THỜI KHÓA BIỂU BUỔI SÁNG - LỚP 12A1</h2>
  <table border="1" cellpadding="6" style="width: 100%; border-collapse: collapse; text-align: center;">
    <tr style="background-color: #1e40af; color: white;">
      <th>Tiết</th>
      <th>Thứ Hai</th>
      <th>Thứ Ba</th>
      <th>Thứ Tư</th>
      <th>Thứ Năm</th>
      <th>Thứ Sáu</th>
    </tr>
    <tr>
      <td><b>1</b></td>
      <td>Chào cờ</td>
      <td>Toán</td>
      <td>Ngữ văn</td>
      <td>Vật lý</td>
      <td>Tin học</td>
    </tr>
    <tr>
      <td><b>2</b></td>
      <td>Toán</td>
      <td>Toán</td>
      <td>Ngữ văn</td>
      <td>Hóa học</td>
      <td>Tin học</td>
    </tr>
    <tr>
      <td><b>3</b></td>
      <td>Tiếng Anh</td>
      <td>Vật lý</td>
      <td>Lịch sử</td>
      <td>Sinh học</td>
      <td>Toán</td>
    </tr>
  </table>
</body>
</html>`
  },
  {
    id: 3,
    title: '3. Danh sách có thứ tự (ol) chuẩn bị thi tốt nghiệp',
    description: 'Thẻ ol với các mục li được đánh số theo thứ tự ưu tiên.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Kế hoạch ôn thi</title>
</head>
<body>
  <h2>CÁC BƯỚC CHUẨN BỊ CHO KỲ THI TỐT NGHIỆP 12</h2>
  <ol type="1">
    <li>Hệ thống hóa toàn bộ lý thuyết môn Tin học Chủ đề 4.</li>
    <li>Luyện giải các đề thi thử tốt nghiệp của các Sở GD&ĐT.</li>
    <li>Rèn luyện kỹ năng thực hành lập trình HTML và CSS.</li>
    <li>Chuẩn bị đầy đủ giấy báo dự thi, thẻ CCCD và máy tính bỏ túi.</li>
    <li>Giữ gìn sức khỏe, ngủ đủ 8 tiếng trước ngày thi.</li>
  </ol>
</body>
</html>`
  },
  {
    id: 4,
    title: '4. Danh sách không thứ tự (ul) đồ dùng dã ngoại',
    description: 'Thẻ ul với các biểu tượng gạch đầu dòng tròn trang bị đi cắm trại.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Đồ dùng cắm trại</title>
</head>
<body>
  <h2>DANH SÁCH ĐỒ DÙNG DÃ NGOẠI LỚP 12</h2>
  <ul style="line-height: 1.8;">
    <li>Lều trại cá nhân và bạt trải chống thấm nước</li>
    <li>Bình nước cá nhân và lương khô/bánh mì</li>
    <li>Hộp sơ cứu y tế (băng gạc, thuốc cảm sốt)</li>
    <li>Đèn pin mini và pin sạc dự phòng</li>
    <li>Áo mưa tiện lợi và giày thể thao mềm</li>
  </ul>
</body>
</html>`
  },
  {
    id: 5,
    title: '5. Danh sách định nghĩa (dl, dt, dd) thuật ngữ Tin học',
    description: 'Thẻ dl giải thích cặn kẽ thuật ngữ HTML, CSS, URL, HTTP trong SGK.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Thuật ngữ Tin học 12</title>
</head>
<body>
  <h2>THUẬT NGỮ CƠ BẢN VỀ PHÁT TRIỂN WEB</h2>
  <dl>
    <dt><b>HTML (HyperText Markup Language)</b></dt>
    <dd>Ngôn ngữ đánh dấu siêu văn bản, dùng để xây dựng cấu trúc và định hình nội dung của trang web.</dd>
    <br>
    <dt><b>CSS (Cascading Style Sheets)</b></dt>
    <dd>Ngôn ngữ định kiểu tầng, dùng để thiết lập màu sắc, phông chữ, bố cục và hiệu ứng trang web.</dd>
    <br>
    <dt><b>URL (Uniform Resource Locator)</b></dt>
    <dd>Địa chỉ định danh duy nhất của tài nguyên trên mạng Internet toàn cầu.</dd>
  </dl>
</body>
</html>`
  },
  {
    id: 6,
    title: '6. Bảng điểm học kỳ 1 có tính trung bình',
    description: 'Bảng điểm 5 môn học có caption và màu xen kẽ cho hàng.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Bảng điểm học kỳ 1</title>
</head>
<body>
  <h2>KẾT QUẢ HỌC TẬP HỌC KỲ 1</h2>
  <table border="1" cellpadding="6" style="width: 100%; border-collapse: collapse; text-align: center;">
    <caption style="font-weight: bold; margin-bottom: 8px;">Bảng điểm cá nhân - Học sinh: Lê Văn Khoa</caption>
    <tr style="background-color: #f1f5f9;">
      <th>Môn học</th>
      <th>Điểm ĐG Thường xuyên</th>
      <th>Điểm Giữa kỳ</th>
      <th>Điểm Cuối kỳ</th>
      <th>Điểm TB Môn</th>
    </tr>
    <tr>
      <td style="text-align: left;">Toán học</td>
      <td>9.0</td>
      <td>8.5</td>
      <td>9.0</td>
      <td><b>8.8</b></td>
    </tr>
    <tr>
      <td style="text-align: left;">Tin học</td>
      <td>10.0</td>
      <td>9.5</td>
      <td>10.0</td>
      <td><b style="color: blue;">9.8</b></td>
    </tr>
    <tr>
      <td style="text-align: left;">Ngữ văn</td>
      <td>8.0</td>
      <td>8.0</td>
      <td>8.5</td>
      <td><b>8.2</b></td>
    </tr>
  </table>
</body>
</html>`
  },
  {
    id: 7,
    title: '7. Danh sách lồng nhau (Nested List) SGK Tin học 12',
    description: 'Cấu trúc thư mục đa cấp với ol bên ngoài và ul bên trong.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Chương trình Tin học 12</title>
</head>
<body>
  <h2>CHỦ ĐỀ 4: GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH</h2>
  <ol>
    <li><b>Phần 1: Ngôn ngữ đánh dấu HTML</b>
      <ul>
        <li>Bài 7: HTML và Cấu trúc trang web</li>
        <li>Bài 8: Định dạng văn bản</li>
        <li>Bài 9: Tạo danh sách, bảng</li>
        <li>Bài 10: Tạo liên kết</li>
        <li>Bài 11: Chèn tệp đa phương tiện và khung nội tuyến</li>
        <li>Bài 12: Tạo biểu mẫu (Form)</li>
      </ul>
    </li>
    <li><b>Phần 2: Định kiểu trang web với CSS</b>
      <ul>
        <li>Bài 13: Khái niệm, vai trò của CSS</li>
        <li>Bài 14: Định dạng văn bản bằng CSS</li>
        <li>Bài 15: Màu sắc và hình nền bằng CSS</li>
      </ul>
    </li>
  </ol>
</body>
</html>`
  },
  {
    id: 8,
    title: '8. Bảng so sánh Cấu hình Máy tính học tập',
    description: 'Sử dụng rowspan để nhóm loại linh kiện và so sánh 2 cấu hình máy.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>So sánh máy tính</title>
</head>
<body>
  <h2>TƯ VẤN CẤU HÌNH PC HỌC LẬP TRÌNH WEB</h2>
  <table border="1" cellpadding="6" style="width: 100%; border-collapse: collapse;">
    <tr style="background-color: #e2e8f0;">
      <th>Thành phần</th>
      <th>Cấu hình Học tập cơ bản</th>
      <th>Cấu hình Lập trình nâng cao</th>
    </tr>
    <tr>
      <td><b>CPU</b></td>
      <td>Intel Core i3 thế hệ 12</td>
      <td>Intel Core i5 thế hệ 13</td>
    </tr>
    <tr>
      <td><b>RAM</b></td>
      <td>8 GB DDR4</td>
      <td>16 GB DDR5</td>
    </tr>
    <tr>
      <td><b>Ổ cứng SSD</b></td>
      <td>256 GB NVMe</td>
      <td>512 GB NVMe siêu tốc</td>
    </tr>
  </table>
</body>
</html>`
  },
  {
    id: 9,
    title: '9. Menu Quán Trà sữa kết hợp List & Table',
    description: 'Danh sách các vị trà bằng ul và bảng phụ thu topping bằng table.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Menu Trà sữa</title>
</head>
<body>
  <h2>MENU TRÀ SỮA HỌC SINH 12</h2>
  <h3>1. Danh sách các vị trà:</h3>
  <ul>
    <li>Trà sữa Ô long nướng (25k)</li>
    <li>Trà lài kem cheese (28k)</li>
    <li>Trà đào cam sả (22k)</li>
  </ul>
  <h3>2. Bảng giá Topping:</h3>
  <table border="1" cellpadding="5" style="border-collapse: collapse;">
    <tr style="background-color: #fef3c7;">
      <th>Loại Topping</th>
      <th>Giá thêm</th>
    </tr>
    <tr>
      <td>Trân châu đen hoàng kim</td>
      <td>5.000đ</td>
    </tr>
    <tr>
      <td>Thạch củ năng giòn</td>
      <td>6.000đ</td>
    </tr>
  </table>
</body>
</html>`
  },
  {
    id: 10,
    title: '10. Bảng phân công Trực nhật lớp gộp hàng & cột',
    description: 'Phân công trực nhật tuần với colspan và rowspan phân chia ca trực.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Phân công trực nhật</title>
</head>
<body>
  <h2>LỊCH TRỰC NHẬT TUẦN LỚP 12A3</h2>
  <table border="1" cellpadding="6" style="width: 100%; border-collapse: collapse; text-align: center;">
    <tr style="background-color: #ccfbf1;">
      <th rowspan="2">Buổi</th>
      <th colspan="3">Nhiệm vụ</th>
    </tr>
    <tr style="background-color: #f0fdfa;">
      <th>Quét lớp & Lau bảng</th>
      <th>Đổ rác & Kê bàn ghế</th>
      <th>Tưới cây ban công</th>
    </tr>
    <tr>
      <td><b>Sáng</b></td>
      <td>Tổ 1 (An, Bình)</td>
      <td>Tổ 1 (Cường)</td>
      <td>Tổ 1 (Dung)</td>
    </tr>
    <tr>
      <td><b>Chiều</b></td>
      <td>Tổ 2 (Hải, Hùng)</td>
      <td>Tổ 2 (Khánh)</td>
      <td>Tổ 2 (Lan)</td>
    </tr>
  </table>
</body>
</html>`
  }
];
