import { CodeSample } from '../../types';

export const HTML_LESSON_SAMPLES: Record<number, CodeSample[]> = {
  // ==========================================
  // BÀI 7: HTML VÀ CẤU TRÚC TRANG WEB (10 mẫu)
  // ==========================================
  7: [
    {
      id: 1,
      title: '1. Khung sườn tài liệu chuẩn HTML5',
      description: 'Cấu trúc tài liệu chuẩn gồm DOCTYPE, html, head, title và body.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Khung sườn chuẩn HTML5</title>
</head>
<body>
  <h1>Chào mừng đến với HTML5</h1>
  <hr>
  <p>Đây là cấu trúc khung sườn cơ bản nhất của một trang web theo tiêu chuẩn HTML5.</p>
</body>
</html>`,
      css: `body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }`
    },
    {
      id: 2,
      title: '2. Giới thiệu nhóm bạn học tập 12A1',
      description: 'Trang web giới thiệu các thành viên trong nhóm học tập với h1, p, br, hr.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Nhóm học tập 12A1</title>
</head>
<body>
  <h1>NHÓM BẠN HỌC TẬP TIN HỌC 12A1</h1>
  <hr>
  <p>Chúng mình là nhóm 1 gồm các thành viên:<br>- Nguyễn Văn An (Trưởng nhóm)<br>- Lê Thu Hà (Phụ trách tài liệu)<br>- Trần Đức Minh (Thực hành máy tính)</p>
  <p>Mục tiêu: Đạt điểm 10 môn Tin học và đỗ nguyện vọng 1 Đại học!</p>
</body>
</html>`,
      css: `body { font-family: sans-serif; padding: 20px; background: #f8fafc; color: #1e293b; }`
    },
    {
      id: 3,
      title: '3. Phân cấp tiêu đề từ h1 đến h6',
      description: 'Trực quan hóa mức độ quan trọng giảm dần của 6 cấp độ tiêu đề.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Các cấp tiêu đề</title>
</head>
<body>
  <h1>Tiêu đề Cấp 1 (Heading 1) - Quan trọng nhất</h1>
  <h2>Tiêu đề Cấp 2 (Heading 2) - Mục chính</h2>
  <h3>Tiêu đề Cấp 3 (Heading 3) - Tiểu mục</h3>
  <h4>Tiêu đề Cấp 4 (Heading 4)</h4>
  <h5>Tiêu đề Cấp 5 (Heading 5)</h5>
  <h6>Tiêu đề Cấp 6 (Heading 6) - Cỡ chữ nhỏ nhất</h6>
</body>
</html>`,
      css: `body { font-family: Arial; padding: 20px; } h1,h2,h3 { color: #1e40af; }`
    },
    {
      id: 4,
      title: '4. Khổ thơ sử dụng thẻ ngắt dòng <br>',
      description: 'Trình bày thơ với ngắt dòng br và đường kẻ ngang hr phân cách.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Bài thơ học đường</title>
</head>
<body>
  <h1>Tuổi Học Trò</h1>
  <hr>
  <p>Nắng rọi sân trường rực rỡ hoa,<br>Tiếng ve rộn rã đón hè qua.<br>Trang sách mở ra bao khát vọng,<br>Mai ngày vững bước tiến vươn xa.</p>
  <hr>
  <p>— Tập thể lớp 12A1 mến tặng</p>
</body>
</html>`,
      css: `body { font-family: Georgia, serif; padding: 24px; background: #fffbeb; }`
    },
    {
      id: 5,
      title: '5. Thông báo lịch thi học kỳ',
      description: 'Sử dụng các đoạn văn bản p và tiêu đề h2 để tạo thông báo.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Thông báo lịch thi</title>
</head>
<body>
  <h1>TRƯỜNG THPT CHUYÊN - NĂM HỌC 2024-2025</h1>
  <hr>
  <h2>THÔNG BÁO: KỲ THI KHẢO SÁT CHẤT LƯỢNG KHỐI 12</h2>
  <p>Kính gửi quý thầy cô và các bạn học sinh khối 12,<br>Kỳ thi khảo sát sẽ diễn ra vào các ngày 15 và 16 tháng sau.</p>
  <p>Các môn thi gồm: Toán, Ngữ Văn, Ngoại ngữ và bài thi Tổ hợp KHTN/KHXH.</p>
</body>
</html>`,
      css: `body { font-family: Arial; padding: 20px; }`
    },
    {
      id: 6,
      title: '6. Bố cục khối nội dung với thẻ <div>',
      description: 'Chia các phần trang web thành các khối div độc lập.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Khối nội dung với div</title>
</head>
<body>
  <div>
    <h1>GÓC HỌC TẬP KHỐI 12</h1>
    <hr>
  </div>
  <div>
    <p>Phần 1: Tài liệu lý thuyết và bài tập trắc nghiệm theo chương trình mới.</p>
  </div>
  <div>
    <p>Phần 2: Phòng máy thực hành mở cửa từ 14h00 đến 17h00 các ngày trong tuần.</p>
  </div>
</body>
</html>`,
      css: `body { font-family: sans-serif; padding: 20px; } div { margin-bottom: 15px; }`
    },
    {
      id: 7,
      title: '7. Lời chúc mừng ngày 20/11',
      description: 'Thiết kế thiệp chúc mừng thầy cô trang trọng bằng HTML.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Tri ân Thầy Cô</title>
</head>
<body>
  <h1>TRI ÂN THẦY CÔ GIÁO - 20/11</h1>
  <hr>
  <p>Kính gửi các thầy cô giáo trường THPT,<br>Nhân ngày Nhà giáo Việt Nam, chúng em xin gửi lời tri ân sâu sắc nhất đến những người lái đò thầm lặng đã tận tình dìu dắt chúng em suốt 3 năm cấp ba.</p>
  <hr>
  <p>Kính chúc thầy cô luôn mạnh khỏe và hạnh phúc!</p>
</body>
</html>`,
      css: `body { font-family: Tahoma; padding: 24px; background: #f0fdf4; color: #166534; }`
    },
    {
      id: 8,
      title: '8. Giới thiệu CLB Đọc sách',
      description: 'Trang thông tin câu lạc bộ sách học đường.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>CLB Đọc Sách</title>
</head>
<body>
  <h1>CLB SÁCH & BẠN TRẺ THPT</h1>
  <p>Phương châm: "Một cuốn sách hay là một người bạn tốt".</p>
  <hr>
  <h2>Các hoạt động định kỳ:</h2>
  <p>- Giới thiệu sách mới vào thứ Hai đầu tuần.<br>- Tọa đàm văn học mỗi tháng một lần.<br>- Thư viện sách trao đổi miễn phí.</p>
</body>
</html>`,
      css: `body { font-family: Arial; padding: 20px; line-height: 1.6; }`
    },
    {
      id: 9,
      title: '9. Quy tắc ứng xử trong phòng máy Tin học',
      description: 'Nội quy phòng thực hành máy tính trường học.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Nội quy phòng máy</title>
</head>
<body>
  <h1>NỘI QUY PHÒNG THỰC HÀNH TIN HỌC</h1>
  <hr>
  <p>1. Học sinh vào phòng đúng giờ, ngồi đúng vị trí máy được phân công.<br>2. Không mang đồ ăn, nước uống vào khu vực máy tính.<br>3. Kiểm tra thiết bị trước khi thực hành và tắt máy đúng quy trình trước khi ra về.</p>
</body>
</html>`,
      css: `body { font-family: sans-serif; padding: 20px; }`
    },
    {
      id: 10,
      title: '10. Mục tiêu 100 ngày đếm ngược thi tốt nghiệp',
      description: 'Kế hoạch hành động 100 ngày nước rút của học sinh 12.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>100 Ngày Về Đích</title>
</head>
<body>
  <h1>KẾ HOẠCH 100 NGÀY BỨT PHÁ TỐT NGHIỆP THPT</h1>
  <hr>
  <h2>Mục tiêu cá nhân:</h2>
  <p>- Hoàn thành 100% đề ôn tập Toán, Văn, Anh.<br>- Rèn luyện kỹ năng Tin học và thực hành dự án web.<br>- Giữ gìn sức khỏe, ngủ đủ giấc để tinh thần minh mẫn.</p>
  <hr>
  <p>Quyết tâm: Đỗ nguyện vọng 1!</p>
</body>
</html>`,
      css: `body { font-family: Arial; padding: 20px; }`
    }
  ],

  // ==========================================
  // BÀI 8: ĐỊNH DẠNG VĂN BẢN (10 mẫu)
  // ==========================================
  8: [
    {
      id: 1,
      title: '1. Biện luận phương trình bậc hai (Hình 8.3 SGK)',
      description: 'Công thức ax² + bx + c = 0, delta, số mũ sup, chỉ số dưới sub và màu sắc.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Hình 8.3 SGK Tin học 12</title>
</head>
<body>
  <h1 style="color: #1e40af;">Biện luận số nghiệm của phương trình bậc hai</h1>
  <hr>
  <p><b>Phương trình tổng quát:</b> <i>ax<sup>2</sup> + bx + c = 0</i> (với <b>a &ne; 0</b>)</p>
  <p>Biệt thức: <b>&Delta; = b<sup>2</sup> - 4ac</b></p>
  <p>1. Nếu <mark>&Delta; &lt; 0</mark>: Phương trình <b style="color: red;">vô nghiệm</b>.</p>
  <p>2. Nếu <mark>&Delta; = 0</mark>: Phương trình có <b style="color: green;">nghiệm kép</b>: x<sub>1</sub> = x<sub>2</sub> = -b / (2a).</p>
  <p>3. Nếu <mark>&Delta; &gt; 0</mark>: Phương trình có <b style="color: blue;">hai nghiệm phân biệt</b>: x<sub>1</sub> và x<sub>2</sub>.</p>
</body>
</html>`,
      css: `body { font-family: Arial; padding: 20px; line-height: 1.8; }`
    },
    {
      id: 2,
      title: '2. Công thức Hóa học với thẻ <sub>',
      description: 'Viết công thức phân tử các chất hóa học quen thuộc: H₂O, H₂SO₄, Fe₂O₃.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Công thức Hóa học</title>
</head>
<body>
  <h1>Phương trình phản ứng Hóa học</h1>
  <p><b>Axit sunfuric:</b> H<sub>2</sub>SO<sub>4</sub></p>
  <p><b>Nước:</b> H<sub>2</sub>O</p>
  <p><b>Phản ứng:</b> 2Fe + 3Cl<sub>2</sub> &rarr; 2FeCl<sub>3</sub></p>
  <p><b>Khí Cacbonic:</b> CO<sub>2</sub></p>
</body>
</html>`,
      css: `body { font-family: Arial; padding: 20px; line-height: 1.8; }`
    },
    {
      id: 3,
      title: '3. Định lý Pytago và Hằng đẳng thức với <sup>',
      description: 'Trình bày hằng đẳng thức đáng nhớ và định lý hình học.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Định lý Pytago</title>
</head>
<body>
  <h1>Định lý Pytago trong tam giác vuông</h1>
  <p>Trong tam giác vuông có hai cạnh góc vuông <i>a, b</i> và cạnh huyền <i>c</i>:</p>
  <p style="font-size: 20px; color: #1e3a8a;"><b>a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup></b></p>
  <p><b>Hằng đẳng thức:</b> (a + b)<sup>2</sup> = a<sup>2</sup> + 2ab + b<sup>2</sup></p>
</body>
</html>`,
      css: `body { font-family: sans-serif; padding: 20px; }`
    },
    {
      id: 4,
      title: '4. So sánh giá khuyến mãi với <del> và <ins>',
      description: 'Gạch ngang giá cũ bằng thẻ del và hiển thị giá mới in đậm nổi bật.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Khuyến mãi sách</title>
</head>
<body>
  <h1>HỘI SÁCH TIN HỌC VÀ CÔNG NGHỆ</h1>
  <p>Bộ sách Tin học 12 - Kết nối tri thức:</p>
  <p>Giá bìa gốc: <del style="color: #94a3b8;">150.000 VNĐ</del></p>
  <p>Giá ưu đãi học sinh: <b style="color: #dc2626; font-size: 22px;">99.000 VNĐ</b> <small>(-34%)</small></p>
</body>
</html>`,
      css: `body { font-family: Arial; padding: 20px; }`
    },
    {
      id: 5,
      title: '5. Đoạn trích văn học với <i> và <em>',
      description: 'Trình bày trích đoạn văn học có nhấn mạnh bằng in nghiêng.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Trích đoạn văn học</title>
</head>
<body>
  <h1>Bài thơ "Tây Tiến" - Quang Dũng</h1>
  <p><i>"Sông Mã xa rồi Tây Tiến ơi!<br>Nhớ về rừng núi nhớ chơi vơi..."</i></p>
  <p>Từ láy <em>"chơi vơi"</em> diễn tả nỗi nhớ da diết khôn nguôi của người lính trẻ.</p>
</body>
</html>`,
      css: `body { font-family: Georgia, serif; padding: 20px; line-height: 1.8; }`
    },
    {
      id: 6,
      title: '6. Làm nổi bật từ khóa với thẻ <mark> và <u>',
      description: 'Dùng bút dạ quang điện tử mark màu vàng để đánh dấu kiến thức trọng tâm.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Ghi nhớ kiến thức</title>
</head>
<body>
  <h1>Định nghĩa HTML</h1>
  <p><mark>HTML</mark> là viết tắt của <u>HyperText Markup Language</u>.</p>
  <p>Nó không phải là ngôn ngữ lập trình mà là <mark>ngôn ngữ đánh dấu siêu văn bản</mark>.</p>
</body>
</html>`,
      css: `body { font-family: Arial; padding: 20px; line-height: 1.8; }`
    },
    {
      id: 7,
      title: '7. Đổi màu chữ bằng thuộc tính style',
      description: 'Sử dụng style="color: ..." với nhiều màu sắc sinh động.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Màu sắc trong HTML</title>
</head>
<body>
  <h1>Bảng trạng thái công việc</h1>
  <p style="color: green;"><b>Đã hoàn thành:</b> Bài 7 - Cấu trúc trang web.</p>
  <p style="color: blue;"><b>Đang thực hiện:</b> Bài 8 - Định dạng văn bản.</p>
  <p style="color: red;"><b>Cần chú ý:</b> Ôn tập thẻ sup và sub.</p>
</body>
</html>`,
      css: `body { font-family: Arial; padding: 20px; }`
    },
    {
      id: 8,
      title: '8. Thay đổi phông chữ và kích thước bằng style',
      description: 'Sử dụng font-size và font-family trong inline CSS.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Cỡ chữ và phông chữ</title>
</head>
<body>
  <h1 style="font-family: 'Times New Roman'; font-size: 28px;">Tiêu đề trang trọng</h1>
  <p style="font-family: Arial; font-size: 18px;">Đoạn văn phông Arial rõ ràng, dễ đọc trên màn hình điện thoại.</p>
  <p style="font-family: Courier New; font-size: 15px;">Đoạn mã lập trình với phông đơn cách.</p>
</body>
</html>`,
      css: `body { padding: 20px; }`
    },
    {
      id: 9,
      title: '9. Danh ngôn và ghi chú với <small>',
      description: 'Kết hợp thẻ chữ nhỏ small cho phần chú thích bản quyền và tác giả.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Danh ngôn học tập</title>
</head>
<body>
  <h1>Danh Ngôn Hay</h1>
  <p style="font-size: 18px;"><b>"Học, học nữa, học mãi."</b></p>
  <p><small style="color: #64748b;">— V.I. Lênin (Trích tài liệu giáo dục công dân)</small></p>
</body>
</html>`,
      css: `body { font-family: sans-serif; padding: 20px; }`
    },
    {
      id: 10,
      title: '10. Bảng tổng hợp công thức diện tích',
      description: 'Tổng hợp công thức toán học với các thẻ định dạng văn bản.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Công thức hình học</title>
</head>
<body>
  <h1>Công thức Diện tích & Thể tích</h1>
  <p>1. Diện tích hình vuông: <b>S = a<sup>2</sup></b></p>
  <p>2. Diện tích hình tròn: <b>S = &pi;r<sup>2</sup></b></p>
  <p>3. Thể tích hình lập phương: <b>V = a<sup>3</sup></b></p>
</body>
</html>`,
      css: `body { font-family: Arial; padding: 20px; line-height: 1.8; }`
    }
  ],

  // ==========================================
  // BÀI 9: TẠO DANH SÁCH, BẢNG (10 mẫu)
  // ==========================================
  9: [
    {
      id: 1,
      title: '1. Lịch hoạt động CLB Thể thao (Hình 9.8 SGK)',
      description: 'Bảng chuẩn SGK có caption, rowspan="2", colspan="5" và danh sách quy định.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Hình 9.8 SGK</title>
</head>
<body>
  <table border="1">
    <caption>LỊCH HOẠT ĐỘNG CLB THỂ THAO</caption>
    <tr>
      <th rowspan="2">Bộ môn</th>
      <th colspan="5">Ngày</th>
      <th rowspan="2">GV phụ trách</th>
    </tr>
    <tr>
      <th>Hai</th><th>Ba</th><th>Tư</th><th>Năm</th><th>Sáu</th>
    </tr>
    <tr><td>Bóng đá</td><td>x</td><td></td><td>x</td><td></td><td>x</td><td>Thầy Nam</td></tr>
    <tr><td>Bóng rổ</td><td></td><td>x</td><td></td><td>x</td><td></td><td>Cô Thảo</td></tr>
  </table>
  <h3>Lưu ý:</h3>
  <ul>
    <li>Mang trang phục thể thao nghiêm chỉnh.</li>
    <li>Có mặt đúng giờ.</li>
  </ul>
</body>
</html>`,
      css: `table { border-collapse: collapse; width: 100%; } th, td { padding: 8px; text-align: center; } th { background: #dbeafe; }`
    },
    {
      id: 2,
      title: '2. Thời khóa biểu học tập các thứ trong tuần',
      description: 'Bảng thời khóa biểu 5 buổi sáng từ Thứ Hai đến Thứ Sáu.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Thời khóa biểu</title>
</head>
<body>
  <table border="1">
    <caption>THỜI KHÓA BIỂU LỚP 12A1</caption>
    <tr><th>Tiết</th><th>Thứ 2</th><th>Thứ 3</th><th>Thứ 4</th><th>Thứ 5</th><th>Thứ 6</th></tr>
    <tr><td>1</td><td>Chào cờ</td><td>Toán</td><td>Ngữ văn</td><td>Tin học</td><td>Hóa học</td></tr>
    <tr><td>2</td><td>Toán</td><td>Toán</td><td>Ngữ văn</td><td>Tin học</td><td>Vật lí</td></tr>
  </table>
</body>
</html>`,
      css: `table { border-collapse: collapse; width: 100%; } th, td { padding: 8px; border: 1px solid #334155; text-align: center; }`
    },
    {
      id: 3,
      title: '3. Danh sách có thứ tự <ol> và không thứ tự <ul>',
      description: 'So sánh danh sách đánh số ol và danh sách dấu chấm tròn ul.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Danh sách HTML</title>
</head>
<body>
  <h2>Các bước giải bài toán trên máy tính (có thứ tự):</h2>
  <ol>
    <li>Xác định bài toán (Input, Output).</li>
    <li>Mô tả thuật toán.</li>
    <li>Viết chương trình mã nguồn.</li>
    <li>Chạy thử và sửa lỗi.</li>
  </ol>
  <h2>Dụng cụ học sinh cần chuẩn bị (không thứ tự):</h2>
  <ul>
    <li>Vở ghi Tin học 12.</li>
    <li>Bút viết và máy tính cầm tay.</li>
  </ul>
</body>
</html>`,
      css: `body { font-family: Arial; padding: 20px; line-height: 1.6; }`
    },
    {
      id: 4,
      title: '4. Bảng điểm tổng kết học kỳ 1',
      description: 'Bảng điểm các môn học chính với điểm trung bình.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Bảng điểm</title>
</head>
<body>
  <table border="1">
    <caption>BẢNG ĐIỂM TỔNG KẾT KHỐI 12</caption>
    <tr><th>STT</th><th>Họ và tên</th><th>Toán</th><th>Văn</th><th>Tin học</th><th>ĐTB</th></tr>
    <tr><td>1</td><td>Nguyễn Văn An</td><td>9.5</td><td>8.5</td><td>10.0</td><td>9.3</td></tr>
    <tr><td>2</td><td>Trần Bảo Châu</td><td>9.0</td><td>9.0</td><td>9.8</td><td>9.3</td></tr>
  </table>
</body>
</html>`,
      css: `table { border-collapse: collapse; width: 100%; } th, td { padding: 8px; border: 1px solid #cbd5e1; text-align: center; } th { background: #eff6ff; }`
    },
    {
      id: 5,
      title: '5. Danh sách định nghĩa thuật ngữ <dl>, <dt>, <dd>',
      description: 'Sử dụng dl, dt và dd để tạo từ điển thuật ngữ Tin học.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Từ điển Tin học</title>
</head>
<body>
  <h1>Thuật ngữ Web cơ bản</h1>
  <dl>
    <dt><b>HTML:</b></dt>
    <dd>Ngôn ngữ đánh dấu siêu văn bản định hình cấu trúc trang web.</dd>
    <dt><b>CSS:</b></dt>
    <dd>Tập hợp các quy tắc định kiểu dáng, màu sắc và bố cục hiển thị.</dd>
  </dl>
</body>
</html>`,
      css: `body { font-family: sans-serif; padding: 20px; } dt { color: #1e40af; margin-top: 10px; } dd { margin-left: 20px; }`
    },
    {
      id: 6,
      title: '6. Thực đơn căn tin trường học (rowspan)',
      description: 'Bảng thực đơn với ô Buổi sáng gộp nhiều món ăn.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Thực đơn căn tin</title>
</head>
<body>
  <table border="1">
    <caption>THỰC ĐƠN CĂN TIN TRƯỜNG HỌC</caption>
    <tr><th>Buổi</th><th>Món ăn</th><th>Giá tiền</th></tr>
    <tr><td rowspan="2">Sáng</td><td>Bánh mì thịt</td><td>20.000đ</td></tr>
    <tr><td>Xôi bắp</td><td>15.000đ</td></tr>
    <tr><td>Trưa</td><td>Cơm sườn nướng</td><td>35.000đ</td></tr>
  </table>
</body>
</html>`,
      css: `table { border-collapse: collapse; width: 100%; } th, td { padding: 8px; border: 1px solid #64748b; text-align: center; }`
    },
    {
      id: 7,
      title: '7. Danh sách lồng nhau (Nested lists)',
      description: 'Tạo danh sách phân cấp các tổ và thành viên trong lớp học.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Danh sách tổ</title>
</head>
<body>
  <h1>Danh sách các tổ lớp 12A1</h1>
  <ol>
    <li><b>Tổ 1:</b>
      <ul><li>Nguyễn Văn A (Tổ trưởng)</li><li>Lê Thị B</li></ul>
    </li>
    <li><b>Tổ 2:</b>
      <ul><li>Trần Văn C (Tổ trưởng)</li><li>Phạm Thị D</li></ul>
    </li>
  </ol>
</body>
</html>`,
      css: `body { font-family: Arial; padding: 20px; line-height: 1.6; }`
    },
    {
      id: 8,
      title: '8. Bảng so sánh các gói thiết bị máy tính',
      description: 'Bảng cấu hình phòng máy với ô colspan gộp thông số.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Cấu hình máy</title>
</head>
<body>
  <table border="1">
    <caption>CẤU HÌNH PHÒNG MÁY THỰC HÀNH</caption>
    <tr><th>Phòng</th><th colspan="2">Cấu hình CPU & RAM</th><th>Số lượng máy</th></tr>
    <tr><td>Phòng 1</td><td>Intel Core i5</td><td>16GB RAM</td><td>40 máy</td></tr>
    <tr><td>Phòng 2</td><td>Intel Core i7</td><td>32GB RAM</td><td>35 máy</td></tr>
  </table>
</body>
</html>`,
      css: `table { border-collapse: collapse; width: 100%; } th, td { padding: 8px; border: 1px solid #cbd5e1; text-align: center; }`
    },
    {
      id: 9,
      title: '9. Bảng phân công trực nhật trong tuần',
      description: 'Phân chia nhiệm vụ quét dọn, lau bảng và kiểm tra thiết bị.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Trực nhật tuần</title>
</head>
<body>
  <table border="1">
    <caption>LỊCH TRỰC NHẬT TUẦN HỌC THỨ 10</caption>
    <tr><th>Thứ</th><th>Quét lớp</th><th>Lau bảng</th><th>Kiểm tra máy tính</th></tr>
    <tr><td>Thứ Hai</td><td>Tổ 1</td><td>Bạn Nam</td><td>Bạn Tuấn</td></tr>
    <tr><td>Thứ Ba</td><td>Tổ 2</td><td>Bạn Lan</td><td>Bạn Hùng</td></tr>
  </table>
</body>
</html>`,
      css: `table { border-collapse: collapse; width: 100%; } th, td { padding: 8px; border: 1px solid #334155; text-align: center; }`
    },
    {
      id: 10,
      title: '10. Kế hoạch ôn tập 4 tuần đếm ngược',
      description: 'Kế hoạch học tập chia theo giai đoạn và nội dung trọng tâm.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Kế hoạch ôn tập</title>
</head>
<body>
  <table border="1">
    <caption>LỘ TRÌNH ÔN THI TỐT NGHIỆP 4 TUẦN</caption>
    <tr><th>Tuần</th><th>Nội dung ôn</th><th>Chỉ tiêu bài tập</th></tr>
    <tr><td>Tuần 1</td><td>HTML cơ bản (Bài 7-12)</td><td>10 bài thực hành</td></tr>
    <tr><td>Tuần 2</td><td>CSS cơ bản (Bài 13-18)</td><td>10 bài định dạng</td></tr>
  </table>
</body>
</html>`,
      css: `table { border-collapse: collapse; width: 100%; } th, td { padding: 8px; border: 1px solid #64748b; text-align: center; } th { background: #dbeafe; }`
    }
  ],

  // ==========================================
  // BÀI 10: TẠO LIÊN KẾT (10 mẫu)
  // ==========================================
  10: [
    {
      id: 1,
      title: '1. Liên kết neo nội bộ (#CLBTT)',
      description: 'Bấm liên kết nhảy đến mục Câu lạc bộ thể thao ở phía dưới trang.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Liên kết neo nội bộ</title>
</head>
<body>
  <h1>CỔNG THÔNG TIN HỌC ĐƯỜNG</h1>
  <p><a href="#CLBTT">&darr; Đi đến Mục Câu Lạc Bộ Thể Thao (#CLBTT)</a></p>
  <div style="height: 300px; background: #f1f5f9; padding: 20px;">(Khoảng đệm nội dung để quan sát hiệu ứng cuộn trang)</div>
  <section id="CLBTT">
    <h2>MỤC THÔNG TIN: CÂU LẠC BỘ THỂ THAO</h2>
    <p>Chào mừng bạn đã đến đích của liên kết neo nội bộ #CLBTT!</p>
    <p><a href="#">&uarr; Lên đầu trang</a></p>
  </section>
</body>
</html>`,
      css: `body { font-family: Arial; padding: 20px; line-height: 1.6; } a { color: #2563eb; font-weight: bold; }`
    },
    {
      id: 2,
      title: '2. Liên kết tương đối sang trang thong_tin.html',
      description: 'Mở trang web con đã lưu trong phòng lab ảo.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Liên kết tương đối</title>
</head>
<body>
  <h1>TRANG CHỦ ĐOÀN TRƯỜNG</h1>
  <p>Xem toàn bộ điều lệ và danh sách câu lạc bộ:</p>
  <p><a href="thong_tin.html" style="font-size: 18px; color: #1e40af;">&rarr; Mở trang Thông tin chi tiết (thong_tin.html)</a></p>
</body>
</html>`,
      css: `body { font-family: sans-serif; padding: 20px; }`
    },
    {
      id: 3,
      title: '3. Liên kết bằng hình ảnh (<a> bọc <img>)',
      description: 'Bấm vào ảnh thể thao để chuyển trang.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Liên kết hình ảnh</title>
</head>
<body>
  <h1>Bấm vào ảnh dưới đây để xem thông tin:</h1>
  <a href="thong_tin.html">
    <img src="images/thethao.png" alt="Ảnh thể thao" width="300" style="border: 2px solid #2563eb; border-radius: 8px;">
  </a>
</body>
</html>`,
      css: `body { font-family: Arial; padding: 20px; }`
    },
    {
      id: 4,
      title: '4. Thanh menu điều hướng (Navigation Bar)',
      description: 'Thanh điều hướng với nhiều liên kết trang.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Menu điều hướng</title>
</head>
<body>
  <nav style="background: #1e3a8a; padding: 12px; border-radius: 6px;">
    <a href="#" style="color: white; margin-right: 15px;">Trang chủ</a>
    <a href="thong_tin.html" style="color: white; margin-right: 15px;">Tin tức</a>
    <a href="#lienhe" style="color: white;">Liên hệ</a>
  </nav>
  <h1>Chào mừng bạn đến với Website Trường THPT</h1>
</body>
</html>`,
      css: `body { font-family: Arial; padding: 20px; } a { text-decoration: none; font-weight: bold; }`
    },
    {
      id: 5,
      title: '5. Liên kết tuyệt đối mở trong tab mới (target="_blank")',
      description: 'Liên kết tới trang web ngoài với thuộc tính target="_blank".',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Liên kết ngoài</title>
</head>
<body>
  <h1>CỔNG HỌC LIỆU TRỰC TUYẾN</h1>
  <p>Học sinh có thể tra cứu thông tin tuyển sinh chính thức tại:</p>
  <p><a href="https://moet.gov.vn" target="_blank" rel="noopener">Cổng thông tin Bộ Giáo dục và Đào tạo &nearr;</a></p>
</body>
</html>`,
      css: `body { font-family: sans-serif; padding: 20px; } a { color: #1d4ed8; }`
    },
    {
      id: 6,
      title: '6. Liên kết gửi thư điện tử (mailto:)',
      description: 'Mở ứng dụng thư điện tử để gửi email phản hồi.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Liên hệ Email</title>
</head>
<body>
  <h1>Hòm thư góp ý của học sinh</h1>
  <p>Mọi thắc mắc về điểm số và lịch thi vui lòng gửi thư về:</p>
  <p><a href="mailto:banbientap@thpt.edu.vn">banbientap@thpt.edu.vn</a></p>
</body>
</html>`,
      css: `body { font-family: Arial; padding: 20px; }`
    },
    {
      id: 7,
      title: '7. Nút quay lại đầu trang bằng neo (#top)',
      description: 'Đặt neo ở đầu trang và nút bấm quay về đầu trang.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Nút Back to Top</title>
</head>
<body>
  <div id="top"></div>
  <h1>TIÊU ĐỀ ĐẦU TRANG</h1>
  <div style="height: 400px; background: #e2e8f0; padding: 20px;">Văn bản dài nhiều trang...</div>
  <p><a href="#top" style="padding: 8px 16px; background: #2563eb; color: white; border-radius: 4px; text-decoration: none;">&uarr; Về đầu trang</a></p>
</body>
</html>`,
      css: `body { font-family: sans-serif; padding: 20px; }`
    },
    {
      id: 8,
      title: '8. Mục lục bài viết (Table of Contents)',
      description: 'Mục lục liên kết nhảy đến từng phần nội dung trong bài viết dài.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Mục lục bài viết</title>
</head>
<body>
  <h1>Mục lục Chuyên đề Tin học 12:</h1>
  <ul>
    <li><a href="#phan1">Phần 1: Ngôn ngữ HTML</a></li>
    <li><a href="#phan2">Phần 2: Định kiểu với CSS</a></li>
  </ul>
  <hr>
  <h2 id="phan1">Phần 1: Ngôn ngữ HTML</h2>
  <p>Nội dung chi tiết về các thẻ cấu trúc...</p>
  <h2 id="phan2">Phần 2: Định kiểu với CSS</h2>
  <p>Nội dung chi tiết về bộ chọn và thuộc tính...</p>
</body>
</html>`,
      css: `body { font-family: Arial; padding: 20px; line-height: 1.6; }`
    },
    {
      id: 9,
      title: '9. Nút tải tài liệu học tập',
      description: 'Sử dụng liên kết với thuộc tính download để tải file.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Tải tài liệu</title>
</head>
<body>
  <h1>KHO TÀI LIỆU ÔN THI 12</h1>
  <p>Tải đề cương ôn tập môn Tin học:</p>
  <p><a href="de_cuong.pdf" download style="color: #059669; font-weight: bold;">&darr; Tải về Đề cương ôn tập HK1 (PDF)</a></p>
</body>
</html>`,
      css: `body { font-family: sans-serif; padding: 20px; }`
    },
    {
      id: 10,
      title: '10. Danh thiếp liên kết mạng xã hội học đường',
      description: 'Danh sách các liên kết liên hệ của câu lạc bộ trường.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Liên kết cộng đồng</title>
</head>
<body>
  <h1>KẾT NỐI VỚI CHÚNG MÌNH</h1>
  <p><a href="thong_tin.html">&bull; Trang giới thiệu thành viên</a></p>
  <p><a href="#CLBTT">&bull; Câu lạc bộ Bóng đá & Bóng rổ</a></p>
  <section id="CLBTT">
    <p><i>Hotline: 0988.123.456</i></p>
  </section>
</body>
</html>`,
      css: `body { font-family: Arial; padding: 20px; } a { color: #2563eb; }`
    }
  ],

  // ==========================================
  // BÀI 11: ĐA PHƯƠNG TIỆN VÀ KHUNG NỘI TUYẾN (10 mẫu)
  // ==========================================
  11: [
    {
      id: 1,
      title: '1. Nhúng ảnh thể thao <img> có thuộc tính alt',
      description: 'Chèn hình ảnh với alt, width, height đầy đủ.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Chèn hình ảnh</title>
</head>
<body>
  <h1>HÌNH ẢNH HOẠT ĐỘNG THỂ THAO</h1>
  <img src="images/thethao.png" alt="Biểu trưng CLB Thể thao trường THPT" width="400">
</body>
</html>`,
      css: `body { font-family: Arial; padding: 20px; } img { border-radius: 8px; }`
    },
    {
      id: 2,
      title: '2. Nhúng video với thẻ <video controls>',
      description: 'Trình phát video HTML5 có nút điều khiển play/pause/tua.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Nhúng Video</title>
</head>
<body>
  <h1>VIDEO TƯ LIỆU HỌC TẬP</h1>
  <video src="videos/war_is_over.mp4" controls width="480">Trình duyệt không hỗ trợ thẻ video.</video>
</body>
</html>`,
      css: `body { font-family: sans-serif; padding: 20px; } video { border-radius: 8px; }`
    },
    {
      id: 3,
      title: '3. Nhúng âm thanh với thẻ <audio controls>',
      description: 'Phát tệp âm thanh nghe thử trực tiếp trên trang.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Nhúng Audio</title>
</head>
<body>
  <h1>BẢN TIN PHÁT THANH HỌC ĐƯỜNG</h1>
  <p>Nhấp vào nút phát bên dưới để nghe bài hát truyền thống:</p>
  <audio src="audio/Quoc_ca.mp3" controls></audio>
</body>
</html>`,
      css: `body { font-family: Arial; padding: 20px; }`
    },
    {
      id: 4,
      title: '4. Khung nội tuyến <iframe> kích thước 600x400',
      description: 'Hiển thị trang con thong_tin.html bên trong iframe chuẩn 600x400.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Khung nội tuyến</title>
</head>
<body>
  <h1>NHÚNG TRANG NỘI DUNG VỚI IFRAME</h1>
  <iframe src="thong_tin.html" width="600" height="400" title="Trang thông tin"></iframe>
</body>
</html>`,
      css: `body { font-family: sans-serif; padding: 20px; } iframe { border: 2px solid #3b82f6; border-radius: 8px; }`
    },
    {
      id: 5,
      title: '5. Bộ sưu tập ảnh học đường',
      description: 'Trưng bày ảnh thể thao, ảnh mặt trời và ảnh nhóm bạn.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Bộ sưu tập ảnh</title>
</head>
<body>
  <h1>KHO ẢNH KỶ YẾU LỚP 12</h1>
  <img src="images/thethao.png" alt="Ảnh thể thao" width="220">
  <img src="images/sun.png" alt="Mặt trời tỏa sáng" width="220">
</body>
</html>`,
      css: `body { font-family: Arial; padding: 20px; } img { margin-right: 15px; border-radius: 8px; }`
    },
    {
      id: 6,
      title: '6. Video tự phát chế độ tắt tiếng (autoplay muted)',
      description: 'Video tự động chạy mượt mà trên nền trang web.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Video tự phát</title>
</head>
<body>
  <h1>VIDEO GIỚI THIỆU KHUÔN VIÊN TRƯỜNG</h1>
  <video src="videos/war_is_over.mp4" controls autoplay muted loop width="450"></video>
</body>
</html>`,
      css: `body { font-family: sans-serif; padding: 20px; }`
    },
    {
      id: 7,
      title: '7. Kết hợp Video, Audio và Hình ảnh',
      description: 'Trang đa phương tiện đầy đủ cả ảnh, video và tệp âm thanh.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Đa phương tiện tổng hợp</title>
</head>
<body>
  <h1>TRẢI NGHIỆM ĐA PHƯƠNG TIỆN</h1>
  <h2>1. Hình ảnh</h2>
  <img src="images/thethao.png" alt="Thể thao" width="300">
  <h2>2. Bản tin âm thanh</h2>
  <audio src="audio/Quoc_ca.mp3" controls></audio>
  <h2>3. Phim tư liệu</h2>
  <video src="videos/war_is_over.mp4" controls width="400"></video>
</body>
</html>`,
      css: `body { font-family: Arial; padding: 20px; }`
    },
    {
      id: 8,
      title: '8. Iframe nhúng trang Câu lạc bộ CLB.html',
      description: 'Nhúng trang CLB.html có sẵn trong bộ nhớ ảo.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Nhúng CLB</title>
</head>
<body>
  <h1>CÂU LẠC BỘ THỂ THAO TRƯỜNG HỌC</h1>
  <iframe src="CLB.html" width="600" height="300"></iframe>
</body>
</html>`,
      css: `body { font-family: sans-serif; padding: 20px; } iframe { border: 1px solid #94a3b8; }`
    },
    {
      id: 9,
      title: '9. Thẻ <figure> và <figcaption> chú thích ảnh',
      description: 'Cặp thẻ ngữ nghĩa chuẩn SEO để hiển thị ảnh kèm dòng chú thích.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Chú thích ảnh</title>
</head>
<body>
  <h1>BIỂU TƯỢNG BAN MAI TUỔI TRẺ</h1>
  <figure>
    <img src="images/sun.png" alt="Mặt trời ban mai" width="250">
    <figcaption>Hình 1: Mặt trời tỏa sáng niềm tin và khát vọng tuổi 18.</figcaption>
  </figure>
</body>
</html>`,
      css: `body { font-family: Arial; padding: 20px; } figcaption { font-style: italic; color: #64748b; margin-top: 6px; }`
    },
    {
      id: 10,
      title: '10. Cửa sổ Iframe kết hợp nút tải lại',
      description: 'Nhúng trang web nội tuyến có liên kết tương tác.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Khung đa năng</title>
</head>
<body>
  <h1>CỔNG TÍCH HỢP BÀI GIẢNG ĐIỆN TỬ</h1>
  <iframe src="thong_tin.html" width="600" height="400"></iframe>
</body>
</html>`,
      css: `body { font-family: sans-serif; padding: 20px; }`
    }
  ],

  // ==========================================
  // BÀI 12: TẠO BIỂU MẪU (FORM) (10 mẫu)
  // ==========================================
  12: [
    {
      id: 1,
      title: '1. Phiếu đăng kí môn thi tốt nghiệp (Hình 12.3 SGK)',
      description: 'Form chuẩn SGK: họ tên, CCCD, ngày sinh, giới tính radio, môn thi checkbox, tổ hợp select, submit.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Hình 12.3 SGK</title>
</head>
<body>
  <h1>PHIẾU ĐĂNG KÍ MÔN THI TỐT NGHIỆP THPT</h1>
  <form action="" method="post">
    <p>Họ và tên: <input type="text" name="hoten" required></p>
    <p>CCCD: <input type="number" name="cccd" required></p>
    <p>Ngày sinh: <input type="date" name="ngaysinh" required></p>
    <p>Giới tính: 
      <input type="radio" name="gioitinh" value="Nam" checked> Nam 
      <input type="radio" name="gioitinh" value="Nu"> Nữ
    </p>
    <p>Môn thi: 
      <input type="checkbox" name="mon" value="toan" checked> Toán 
      <input type="checkbox" name="mon" value="van" checked> Văn 
      <input type="checkbox" name="mon" value="anh"> Ngoại ngữ
    </p>
    <p>Tổ hợp: 
      <select name="tohop">
        <option>Khoa học Tự nhiên</option>
        <option>Khoa học Xã hội</option>
      </select>
    </p>
    <p><input type="submit" value="Gửi thông tin"></p>
  </form>
</body>
</html>`,
      css: `body { font-family: Arial; padding: 20px; line-height: 1.8; } input[type="submit"] { background: #2563eb; color: white; padding: 8px 16px; border: none; border-radius: 4px; font-weight: bold; }`
    },
    {
      id: 2,
      title: '2. Đăng ký tham gia CLB Thể thao',
      description: 'Biểu mẫu chọn môn thể thao yêu thích và khung giờ tập luyện.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Đăng ký CLB</title>
</head>
<body>
  <h1>ĐƠN ĐĂNG KÝ CÂU LẠC BỘ THỂ THAO</h1>
  <form action="" method="post">
    <p>Họ tên: <input type="text" name="hoten"></p>
    <p>Ngày sinh: <input type="date" name="ngaysinh"></p>
    <p>Giới tính: <input type="radio" name="gt" value="Nam"> Nam <input type="radio" name="gt" value="Nu"> Nữ</p>
    <p>Môn tham gia: <input type="checkbox" name="sport"> Bóng đá <input type="checkbox" name="sport"> Cầu lông</p>
    <p>Ca tập: <select name="ca"><option>Sáng thứ Bảy</option><option>Chiều Chủ nhật</option></select></p>
    <p><input type="submit" value="Gửi đăng ký"></p>
  </form>
</body>
</html>`,
      css: `body { font-family: sans-serif; padding: 20px; }`
    },
    {
      id: 3,
      title: '3. Khảo sát định hướng nghề nghiệp',
      description: 'Thu thập thông tin khối ngành và trường đại học mong muốn.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Khảo sát nghề nghiệp</title>
</head>
<body>
  <h1>KHẢO SÁT NGUYỆN VỌNG NGHỀ NGHIỆP KHỐI 12</h1>
  <form action="" method="post">
    <p>Họ tên: <input type="text" name="hoten"></p>
    <p>Ngày sinh: <input type="date" name="ngaysinh"></p>
    <p>Giới tính: <input type="radio" name="sex" value="m"> Nam <input type="radio" name="sex" value="f"> Nữ</p>
    <p>Khối ngành: <select name="nganh"><option>Công nghệ thông tin</option><option>Kinh tế - Tài chính</option><option>Y Dược</option></select></p>
    <p>Kỹ năng có sẵn: <input type="checkbox" name="kn"> Ngoại ngữ <input type="checkbox" name="kn"> Lập trình</p>
    <p><input type="submit" value="Nộp khảo sát"></p>
  </form>
</body>
</html>`,
      css: `body { font-family: Arial; padding: 20px; }`
    },
    {
      id: 4,
      title: '4. Biểu mẫu đăng nhập tài khoản học tập',
      description: 'Trường nhập tên người dùng và mật khẩu có che ký tự password.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Đăng nhập</title>
</head>
<body>
  <h1>ĐĂNG NHẬP HỆ THỐNG TIN HỌC 12</h1>
  <form action="" method="post">
    <p>Tên đăng nhập: <input type="text" name="user" required></p>
    <p>Mật khẩu: <input type="password" name="pass" required></p>
    <p><input type="checkbox" name="remember"> Ghi nhớ đăng nhập</p>
    <p><input type="submit" value="Đăng nhập ngay"></p>
  </form>
</body>
</html>`,
      css: `body { font-family: sans-serif; padding: 20px; } input[type="text"], input[type="password"] { padding: 6px; width: 200px; }`
    },
    {
      id: 5,
      title: '5. Hòm thư góp ý với vùng nhập <textarea>',
      description: 'Nhập nội dung phản hồi nhiều dòng với thẻ textarea.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Hòm thư góp ý</title>
</head>
<body>
  <h1>HÒM THƯ GÓP Ý ĐOÀN TRƯỜNG</h1>
  <form action="" method="post">
    <p>Họ tên người gửi: <input type="text" name="sender"></p>
    <p>Chủ đề: <select name="topic"><option>Hoạt động Đoàn</option><option>Cơ sở vật chất</option></select></p>
    <p>Nội dung ý kiến:<br><textarea name="message" rows="4" cols="40" placeholder="Viết ý kiến của em tại đây..."></textarea></p>
    <p><input type="submit" value="Gửi thư góp ý"></p>
  </form>
</body>
</html>`,
      css: `body { font-family: Arial; padding: 20px; } textarea { padding: 8px; }`
    },
    {
      id: 6,
      title: '6. Phiếu đăng ký mượn sách thư viện',
      description: 'Nhập số thẻ học sinh, tên sách và ngày hẹn trả.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Mượn sách thư viện</title>
</head>
<body>
  <h1>PHIẾU MƯỢN SÁCH THƯ VIỆN</h1>
  <form action="" method="post">
    <p>Mã thẻ học sinh: <input type="text" name="mathe"></p>
    <p>Tên sách mượn: <input type="text" name="tensach"></p>
    <p>Ngày mượn: <input type="date" name="ngaymuon"></p>
    <p>Hình thức: <input type="radio" name="ht" value="1"> Đọc tại chỗ <input type="radio" name="ht" value="2"> Mang về nhà</p>
    <p><input type="submit" value="Xác nhận mượn"></p>
  </form>
</body>
</html>`,
      css: `body { font-family: sans-serif; padding: 20px; }`
    },
    {
      id: 7,
      title: '7. Đánh giá chất lượng tiết thực hành',
      description: 'Các nút chọn radio thang điểm mức độ hiểu bài.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Đánh giá tiết học</title>
</head>
<body>
  <h1>ĐÁNH GIÁ TIẾT THỰC HÀNH TIN HỌC</h1>
  <form action="" method="post">
    <p>Họ tên: <input type="text" name="hoten"></p>
    <p>Mức độ hiểu bài:
      <input type="radio" name="rating" value="1"> 1 sao
      <input type="radio" name="rating" value="2"> 2 sao
      <input type="radio" name="rating" value="3" checked> 3 sao
      <input type="radio" name="rating" value="4"> 4 sao
      <input type="radio" name="rating" value="5"> 5 sao
    </p>
    <p><input type="submit" value="Gửi đánh giá"></p>
  </form>
</body>
</html>`,
      css: `body { font-family: Arial; padding: 20px; }`
    },
    {
      id: 8,
      title: '8. Chọn tổ hợp môn xét tuyển Đại học',
      description: 'Menu select chọn khối A00, A01, B00, D01.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Chọn tổ hợp thi</title>
</head>
<body>
  <h1>ĐĂNG KÝ TỔ HỢP XÉT TUYỂN ĐẠI HỌC</h1>
  <form action="" method="post">
    <p>Thí sinh: <input type="text" name="thisinh"></p>
    <p>Ngày sinh: <input type="date" name="dob"></p>
    <p>Khối thi chính:
      <select name="khoithi">
        <option>Khối A00: Toán, Vật lí, Hóa học</option>
        <option>Khối A01: Toán, Vật lí, Tiếng Anh</option>
        <option>Khối D01: Toán, Ngữ văn, Tiếng Anh</option>
      </select>
    </p>
    <p><input type="submit" value="Lưu tổ hợp"></p>
  </form>
</body>
</html>`,
      css: `body { font-family: sans-serif; padding: 20px; } select { padding: 6px; }`
    },
    {
      id: 9,
      title: '9. Form nộp tệp bài tập thực hành (<input type="file">)',
      description: 'Biểu mẫu gửi file nộp bài cho giáo viên bộ môn.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Nộp bài tập</title>
</head>
<body>
  <h1>CỔNG NỘP BÀI TẬP TIN HỌC 12</h1>
  <form action="" method="post">
    <p>Họ tên học sinh: <input type="text" name="hoten"></p>
    <p>Lớp: <input type="text" name="lop"></p>
    <p>Chọn tệp bài làm (.html, .zip): <input type="file" name="baitap"></p>
    <p><input type="submit" value="Nộp bài ngay"></p>
  </form>
</body>
</html>`,
      css: `body { font-family: Arial; padding: 20px; }`
    },
    {
      id: 10,
      title: '10. Biểu mẫu liên hệ phụ huynh và nhà trường',
      description: 'Form liên hệ có trường số điện thoại, email và ghi chú.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Sổ liên lạc</title>
</head>
<body>
  <h1>PHIẾU THÔNG TIN LIÊN LẠC GIA ĐÌNH</h1>
  <form action="" method="post">
    <p>Họ tên học sinh: <input type="text" name="tenhs" required></p>
    <p>Ngày sinh: <input type="date" name="ns" required></p>
    <p>Số điện thoại phụ huynh: <input type="tel" name="sdt" required></p>
    <p>Email: <input type="email" name="mail"></p>
    <p><input type="submit" value="Cập nhật thông tin"></p>
  </form>
</body>
</html>`,
      css: `body { font-family: sans-serif; padding: 20px; }`
    }
  ]
};
