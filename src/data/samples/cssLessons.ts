import { CodeSample } from '../../types';

export const CSS_LESSON_SAMPLES: Record<number, CodeSample[]> = {
  // ==========================================
  // BÀI 13: KHÁI NIỆM, VAI TRÒ CỦA CSS (10 mẫu)
  // ==========================================
  13: [
    {
      id: 1,
      title: '1. Ba loại bộ chọn cơ bản (Thẻ, Lớp, ID)',
      description: 'Phối hợp đồng thời bộ chọn phần tử h1, p, bộ chọn lớp .gioithieu và ID #noibat.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Bộ chọn CSS</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>GÓC HỌC TẬP TIN HỌC 12</h1>
  <p class="gioithieu">CSS giúp định dạng giao diện đẹp mắt và tách biệt với nội dung HTML.</p>
  <div id="noibat">Lưu ý quan trọng: Mỗi trang web chỉ nên có một ID duy nhất!</div>
</body>
</html>`,
      css: `h1 { color: #1e40af; text-align: center; }
p { line-height: 1.6; }
.gioithieu { color: #047857; background: #ecfdf5; padding: 10px; border-radius: 6px; }
#noibat { color: #b91c1c; background: #fef2f2; border-left: 4px solid #ef4444; padding: 10px; font-weight: bold; }`
    },
    {
      id: 2,
      title: '2. Nhúng CSS nội bộ với thẻ <style>',
      description: 'Đặt toàn bộ mã định kiểu trong thẻ style ở phần head.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>CSS nội bộ</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; background: #f8fafc; }
    h1 { color: #2563eb; }
    .chu-thich { font-style: italic; color: #64748b; }
  </style>
</head>
<body>
  <h1>Định kiểu CSS nội bộ (Internal CSS)</h1>
  <p class="chu-thich">Thích hợp khi áp dụng kiểu dáng riêng biệt cho một trang đơn lẻ.</p>
</body>
</html>`,
      css: `/* Mã định kiểu nội bộ nằm trong thẻ style của HTML */`
    },
    {
      id: 3,
      title: '3. Áp dụng nhiều lớp class trên một phần tử',
      description: 'Sử dụng class="hop vien-xanh chu-dam" để tái sử dụng nhiều lớp CSS.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Nhiều lớp class</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="hop vien-xanh chu-dam">Khối thông báo vừa có viền xanh vừa có chữ in đậm.</div>
  <div class="hop vien-do">Khối cảnh báo chỉ có viền đỏ.</div>
</body>
</html>`,
      css: `.hop { padding: 15px; margin-bottom: 10px; border-radius: 8px; }
.vien-xanh { border: 2px solid #3b82f6; background: #eff6ff; }
.vien-do { border: 2px solid #ef4444; background: #fef2f2; }
.chu-dam { font-weight: bold; color: #1e3a8a; }`
    },
    {
      id: 4,
      title: '4. Bộ chọn nhóm (Grouping Selectors)',
      description: 'Gộp nhiều bộ chọn dùng chung định dạng: h1, h2, h3 { color: ... }.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Bộ chọn nhóm</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Tiêu đề cấp 1</h1>
  <h2>Tiêu đề cấp 2</h2>
  <h3>Tiêu đề cấp 3</h3>
</body>
</html>`,
      css: `h1, h2, h3 { color: #1e3a8a; font-family: 'Segoe UI', Tahoma, sans-serif; letter-spacing: 0.5px; }`
    },
    {
      id: 5,
      title: '5. Hiệu ứng rê chuột (:hover) trên nút bấm',
      description: 'Đổi màu sắc khi người dùng di chuột qua liên kết hoặc nút.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Hiệu ứng Hover</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <a href="#" class="nut-bam">Khám phá ngay &rarr;</a>
</body>
</html>`,
      css: `.nut-bam { display: inline-block; padding: 10px 20px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; transition: background 0.3s; }
.nut-bam:hover { background: #1d4ed8; }`
    },
    {
      id: 6,
      title: '6. Bộ chọn con cháu (Descendant Selector)',
      description: 'Định dạng các phần tử con nằm bên trong một khối cha cụ thể.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Bộ chọn con cháu</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="hop-dac-biet">
    <p>Đoạn văn bên trong khối đặc biệt có chữ màu tím.</p>
  </div>
  <p>Đoạn văn bên ngoài giữ nguyên màu thông thường.</p>
</body>
</html>`,
      css: `p { color: #334155; }
.hop-dac-biet p { color: #7c3aed; font-weight: bold; }`
    },
    {
      id: 7,
      title: '7. Khung thông báo thành công, cảnh báo, lỗi',
      description: '3 lớp class biểu thị 3 trạng thái tin tức khác nhau.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Khung thông báo</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="tb thanh-cong">&check; Chúc mừng bạn đã nộp bài thành công!</div>
  <div class="tb canh-bao">&excl; Còn 15 phút nữa là hết giờ làm bài.</div>
  <div class="tb loi">&cross; Mã HTML thiếu thẻ đóng body.</div>
</body>
</html>`,
      css: `.tb { padding: 12px; margin-bottom: 10px; border-radius: 6px; font-family: sans-serif; font-size: 14px; }
.thanh-cong { background: #dcfce7; color: #15803d; }
.canh-bao { background: #fef9c3; color: #a16207; }
.loi { background: #fee2e2; color: #b91c1c; }`
    },
    {
      id: 8,
      title: '8. Định dạng bảng biểu với các bộ chọn thẻ',
      description: 'Sử dụng table, th, td để tạo bảng dữ liệu màu xanh dịu mắt.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Bảng CSS</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <table>
    <tr><th>Môn</th><th>Hệ số</th><th>Điểm</th></tr>
    <tr><td>Toán</td><td>2</td><td>9.0</td></tr>
    <tr><td>Tin học</td><td>2</td><td>9.5</td></tr>
  </table>
</body>
</html>`,
      css: `table { width: 100%; border-collapse: collapse; font-family: Arial; }
th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: center; }
th { background: #dbeafe; color: #1e40af; }`
    },
    {
      id: 9,
      title: '9. Nhúng CSS ngoại tuyến từ file style.css',
      description: 'Phương pháp chuẩn công nghiệp giúp bảo trì và cập nhật giao diện dễ dàng.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>CSS ngoại tuyến</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="card">
    <h2>Trang web đa trang chuẩn</h2>
    <p>Chỉ cần chỉnh sửa 1 tệp style.css duy nhất, tất cả các trang HTML đều đổi màu đồng bộ!</p>
  </div>
</body>
</html>`,
      css: `.card { background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; font-family: sans-serif; }
.card h2 { color: #0284c7; }`
    },
    {
      id: 10,
      title: '10. Danh sách liên kết xã hội với bộ chọn class',
      description: 'Tạo danh sách các nút liên kết chuyên nghiệp bằng CSS.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Nút liên kết</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="menu-lien-ket">
    <a href="#" class="muc-lien-ket">&bull; Trang chủ Đoàn trường</a>
    <a href="#" class="muc-lien-ket">&bull; Diễn đàn học tập 12</a>
  </div>
</body>
</html>`,
      css: `.muc-lien-ket { display: block; padding: 10px; margin-bottom: 6px; background: #f1f5f9; color: #1e3a8a; text-decoration: none; border-radius: 6px; }
.muc-lien-ket:hover { background: #e2e8f0; }`
    }
  ],

  // ==========================================
  // BÀI 14: ĐỊNH DẠNG VĂN BẢN BẰNG CSS (10 mẫu)
  // ==========================================
  14: [
    {
      id: 1,
      title: '1. Thông điệp tuổi 18 (Căn giữa, hoa, căn đều)',
      description: 'Bài viết chuẩn SGK: text-align: center/justify, text-transform, line-height.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Thông điệp tuổi 18</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Thông điệp tuổi 18</h1>
  <p class="doan-van">Tuổi 18 là dấu mốc quan trọng, mở ra cánh cửa tương lai với nhiều ước mơ và hoài bão lớn lao. Hãy nỗ lực học tập hết mình vì ngày mai tươi sáng.</p>
  <p class="tac-gia">— Ban Chấp hành Đoàn trường THPT</p>
</body>
</html>`,
      css: `body { font-family: Arial, sans-serif; font-size: 16px; padding: 20px; }
h1 { text-align: center; text-transform: uppercase; color: #1e40af; }
.doan-van { text-align: justify; line-height: 1.8; text-indent: 20px; }
.tac-gia { text-align: right; font-style: italic; font-weight: bold; text-decoration: underline; }`
    },
    {
      id: 2,
      title: '2. Phông chữ dự phòng (Fallback font-family)',
      description: 'Khai báo chuỗi phông chữ: Arial, Helvetica, sans-serif.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Phông chữ dự phòng</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <p class="khong-chan">Phông không chân (Sans-serif) hiện đại và sắc nét.</p>
  <p class="co-chan">Phông có chân (Serif) trang trọng, cổ điển.</p>
</body>
</html>`,
      css: `.khong-chan { font-family: "Segoe UI", Arial, sans-serif; font-size: 18px; }
.co-chan { font-family: "Times New Roman", Times, serif; font-size: 18px; }`
    },
    {
      id: 3,
      title: '3. Bài thơ "Đoàn thuyền đánh cá" căn giữa',
      description: 'Khổ thơ trình bày trang nhã với text-align: center và font-style: italic.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Đoàn thuyền đánh cá</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h2>ĐOÀN THUYỀN ĐÁNH CÁ</h2>
  <div class="kho-tho">
    Mặt trời xuống biển như hòn lửa<br>
    Sóng đã cài then, đêm sập cửa.<br>
    Đoàn thuyền đánh cá lại ra khơi,<br>
    Câu hát căng buồm cùng gió khơi.
  </div>
</body>
</html>`,
      css: `h2 { text-align: center; color: #0284c7; }
.kho-tho { text-align: center; font-style: italic; line-height: 2; font-size: 17px; font-family: Georgia, serif; }`
    },
    {
      id: 4,
      title: '4. Giãn dòng và thụt đầu dòng (line-height, text-indent)',
      description: 'Định dạng bài nghị luận xã hội chuẩn chính tả và mỹ thuật văn bản.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Bài nghị luận</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>SỨC MẠNH CỦA Ý CHÍ</h1>
  <p class="bai-viet">Nghị lực sống là chiếc chìa khóa vạn năng giúp con người mở toang mọi cánh cửa khó khăn để vươn tới đỉnh cao vinh quang và thành công.</p>
</body>
</html>`,
      css: `.bai-viet { font-family: Tahoma, sans-serif; line-height: 1.9; text-indent: 30px; text-align: justify; font-size: 16px; }`
    },
    {
      id: 5,
      title: '5. Các kiểu trang trí chữ (text-decoration)',
      description: 'Gạch chân underline, gạch ngang line-through và bỏ gạch chân none.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Trang trí chữ</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <p class="gach-chan">Văn bản có đường gạch chân nhấn mạnh.</p>
  <p class="gach-ngang">Nội dung đã bị xóa hoặc hủy bỏ.</p>
  <a href="#" class="bo-gach">Liên kết không có đường gạch chân</a>
</body>
</html>`,
      css: `.gach-chan { text-decoration: underline; color: #1e40af; }
.gach-ngang { text-decoration: line-through; color: #94a3b8; }
.bo-gach { text-decoration: none; color: #059669; font-weight: bold; }`
    },
    {
      id: 6,
      title: '6. Biến đổi chữ hoa và thường (text-transform)',
      description: 'uppercase biến thành chữ hoa, capitalize viết hoa đầu từ.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Chữ in hoa</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <p class="in-hoa">tin học 12 kết nối tri thức</p>
  <p class="hoa-dau">chúc các bạn học sinh ôn tập tốt</p>
</body>
</html>`,
      css: `.in-hoa { text-transform: uppercase; font-weight: bold; color: #b91c1c; }
.hoa-dau { text-transform: capitalize; color: #1d4ed8; font-size: 18px; }`
    },
    {
      id: 7,
      title: '7. Khoảng cách ký tự và khoảng cách từ (letter-spacing)',
      description: 'Tăng khoảng cách chữ cái tạo tiêu đề banner ấn tượng.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Giãn chữ</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1 class="tieu-de-rong">CÔNG NGHỆ THÔNG TIN</h1>
  <p class="khoang-cach-tu">Học tập sáng tạo mở lối tương lai</p>
</body>
</html>`,
      css: `.tieu-de-rong { letter-spacing: 4px; text-transform: uppercase; color: #0f172a; text-align: center; }
.khoang-cach-tu { word-spacing: 8px; text-align: center; font-style: italic; }`
    },
    {
      id: 8,
      title: '8. Trích dẫn danh ngôn với đổ bóng chữ (text-shadow)',
      description: 'Tạo hiệu ứng nổi 3D nhẹ nhàng cho tiêu đề chữ.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Đổ bóng chữ</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1 class="do-bong">KHÁT VỌNG TUỔI TRẺ</h1>
</body>
</html>`,
      css: `.do-bong { text-align: center; font-size: 32px; color: #1e40af; text-shadow: 2px 2px 4px rgba(30, 64, 175, 0.3); font-family: Arial; }`
    },
    {
      id: 9,
      title: '9. Đoạn mã lập trình với phông đơn cách (monospace)',
      description: 'Định dạng khối code kỹ thuật chuẩn như trình soạn thảo.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Phông đơn cách</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="khoi-code">
    &lt;!DOCTYPE html&gt;<br>
    &lt;html lang="vi"&gt;<br>
    &nbsp;&nbsp;&lt;h1&gt;Xin chào&lt;/h1&gt;<br>
    &lt;/html&gt;
  </div>
</body>
</html>`,
      css: `.khoi-code { font-family: "Courier New", Courier, monospace; background: #0f172a; color: #38bdf8; padding: 16px; border-radius: 8px; line-height: 1.5; }`
    },
    {
      id: 10,
      title: '10. Độ đậm chữ đa cấp (font-weight: 300, 500, 700)',
      description: 'Phân cấp thị giác với các mức độ đậm nhạt của phông chữ.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Độ đậm phông chữ</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <p style="font-weight: 300;">Chữ mảnh (Light - 300)</p>
  <p style="font-weight: normal;">Chữ bình thường (Normal - 400)</p>
  <p style="font-weight: bold;">Chữ in đậm (Bold - 700)</p>
</body>
</html>`,
      css: `body { font-family: sans-serif; font-size: 18px; padding: 20px; }`
    }
  ],

  // ==========================================
  // BÀI 15: TẠO MÀU CHO CHỮ VÀ NỀN (10 mẫu)
  // ==========================================
  15: [
    {
      id: 1,
      title: '1. Thẻ hồ sơ học sinh tiêu biểu (HEX & Border)',
      description: 'Màu nền trắng, viền xanh dương #3b82f6, bo góc 16px và badge nhãn.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Thẻ học sinh</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="the-hoc-sinh">
    <span class="huy-hieu">Học sinh Tiêu biểu</span>
    <h2 class="ho-ten">Nguyễn Văn An</h2>
    <p class="thong-tin">Lớp 12A1 - Giải Nhất Tin học cấp Tỉnh</p>
  </div>
</body>
</html>`,
      css: `body { background-color: #f1f5f9; padding: 30px; font-family: Arial; }
.the-hoc-sinh { background-color: #ffffff; border: 2px solid #3b82f6; border-radius: 16px; padding: 20px; max-width: 380px; }
.huy-hieu { background-color: rgba(37, 99, 235, 0.15); color: #1d4ed8; padding: 4px 10px; border-radius: 99px; font-size: 12px; font-weight: bold; }
.ho-ten { color: #1e3a8a; margin: 10px 0; }
.thong-tin { color: #475569; }`
    },
    {
      id: 2,
      title: '2. Ba hệ màu: Tên tiếng Anh, HEX và RGB',
      description: 'Trực quan hóa 3 cách khai báo màu sắc chuẩn trong CSS.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Các hệ màu</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="mau-ten">Tên màu: color: navy;</div>
  <div class="mau-hex">Mã HEX: color: #1e40af;</div>
  <div class="mau-rgb">Mã RGB: color: rgb(37, 99, 235);</div>
</body>
</html>`,
      css: `div { padding: 12px; margin-bottom: 8px; font-weight: bold; border-radius: 6px; }
.mau-ten { background: #e0f2fe; color: navy; }
.mau-hex { background: #dbeafe; color: #1e40af; }
.mau-rgb { background: #eff6ff; color: rgb(37, 99, 235); }`
    },
    {
      id: 3,
      title: '3. Màu nền trong suốt RGBA (Alpha channel)',
      description: 'Sử dụng rgba() để tạo lớp nền phủ mờ nhìn xuyên thấu.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Màu RGBA</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="lop-phu">
    <h2>Lớp phủ trong suốt RGBA (alpha = 0.2)</h2>
    <p>Nền mờ nhẹ nhàng giữ cho giao diện thanh lịch và hiện đại.</p>
  </div>
</body>
</html>`,
      css: `body { background: #1e3a8a; padding: 30px; font-family: sans-serif; }
.lop-phu { background-color: rgba(255, 255, 255, 0.2); color: white; padding: 24px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.3); }`
    },
    {
      id: 4,
      title: '4. Nền chuyển sắc Gradient (linear-gradient)',
      description: 'Tạo dải màu chuyển mượt mà từ xanh đậm sang xanh ngọc.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Nền Gradient</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="banner-gradient">
    <h1>CHÀO MỪNG NĂM HỌC MỚI 2024-2025</h1>
    <p>Khát vọng vươn tầm - Tự tin tỏa sáng</p>
  </div>
</body>
</html>`,
      css: `.banner-gradient { background: linear-gradient(135deg, #1e3a8a, #06b6d4); color: white; padding: 40px; text-align: center; border-radius: 14px; font-family: Arial; }`
    },
    {
      id: 5,
      title: '5. Khung thông báo thành tích với viền màu border',
      description: 'Khung viền dày 3px có màu xanh lá cây tượng trưng cho thành tích cao.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Viền màu</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="khung-thanh-tich">
    <h3>BẢNG VÀNG THÀNH TÍCH TIN HỌC</h3>
    <p>Lớp 12A1 đạt danh hiệu Chi đoàn xuất sắc nhất học kỳ 1.</p>
  </div>
</body>
</html>`,
      css: `.khung-thanh-tich { border: 3px solid #10b981; background: #ecfdf5; color: #065f46; padding: 20px; border-radius: 10px; font-family: sans-serif; }`
    },
    {
      id: 6,
      title: '6. Chèn ảnh nền với background-image',
      description: 'Sử dụng background-image: url("images/sun.png") với vị trí căn giữa.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Ảnh nền</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="hop-anh-nen">
    <h2>BAN MAI TỎA SÁNG</h2>
    <p>Chào ngày mới với tinh thần học tập hết mình!</p>
  </div>
</body>
</html>`,
      css: `.hop-anh-nen { background-image: url('images/sun.png'); background-repeat: no-repeat; background-position: right center; background-size: 120px; background-color: #fef08a; padding: 30px; border-radius: 12px; color: #854d0e; font-family: Arial; }`
    },
    {
      id: 7,
      title: '7. Nhãn trạng thái đa màu sắc (Status Badges)',
      description: 'Hệ thống thẻ nhãn với màu chữ và nền tương phản rõ rệt.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Huy hiệu trạng thái</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <span class="badge badge-xanh">Đã duyệt</span>
  <span class="badge badge-vang">Đang chấm</span>
  <span class="badge badge-do">Cần sửa</span>
</body>
</html>`,
      css: `.badge { display: inline-block; padding: 5px 12px; border-radius: 99px; font-size: 13px; font-weight: bold; margin-right: 8px; font-family: sans-serif; }
.badge-xanh { background: #dcfce7; color: #166534; }
.badge-vang { background: #fef9c3; color: #854d0e; }
.badge-do { background: #fee2e2; color: #991b1b; }`
    },
    {
      id: 8,
      title: '8. Giao diện nền tối (Dark Mode) chuẩn tương phản',
      description: 'Phối màu nền tối #0f172a với chữ sáng #f8fafc dịu mắt khi học đêm.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Chế độ nền tối</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="che-do-toi">
    <h2>Giao diện Nền Tối (Dark Theme)</h2>
    <p>Bảo vệ thị lực khi học tập và thực hành lập trình vào buổi tối.</p>
  </div>
</body>
</html>`,
      css: `.che-do-toi { background-color: #0f172a; color: #f8fafc; padding: 24px; border-radius: 10px; border: 1px solid #334155; font-family: Arial; }
.che-do-toi h2 { color: #38bdf8; }`
    },
    {
      id: 9,
      title: '9. Khung nổi bật với đổ bóng hộp (box-shadow)',
      description: 'Hiệu ứng bóng đổ mềm mại giúp khung hộp nổi lên khỏi bề mặt nền.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Đổ bóng hộp</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="hop-noi">
    <h3>Khung thông báo nổi bật</h3>
    <p>Hiệu ứng box-shadow mang lại chiều sâu thị giác ấn tượng.</p>
  </div>
</body>
</html>`,
      css: `.hop-noi { background: #ffffff; padding: 20px; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); border: 1px solid #f1f5f9; font-family: sans-serif; }`
    },
    {
      id: 10,
      title: '10. Bảng màu phong cách Tin học 12',
      description: 'Bộ 4 màu chủ đạo: Xanh giáo dục, Cam nhiệt huyết, Xanh lá, Trắng ngà.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Bảng màu thương hiệu</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div style="background:#1e40af; color:white; padding:10px; border-radius:6px; margin-bottom:6px;">#1e40af - Xanh giáo dục</div>
  <div style="background:#ea580c; color:white; padding:10px; border-radius:6px; margin-bottom:6px;">#ea580c - Cam năng động</div>
  <div style="background:#15803d; color:white; padding:10px; border-radius:6px;">#15803d - Xanh thành công</div>
</body>
</html>`,
      css: `body { font-family: Arial; font-weight: bold; padding: 20px; }`
    }
  ],

  // ==========================================
  // BÀI 16: ĐỊNH DẠNG KHUNG (BOX MODEL) (10 mẫu)
  // ==========================================
  16: [
    {
      id: 1,
      title: '1. Mô hình hộp Box Model hoàn chỉnh',
      description: 'Mô phỏng 4 lớp: Content, Padding, Border, Margin với màu sắc trực quan.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Box Model</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="khung-tin-tuc">
    <h2>BẢN TIN HOẠT ĐỘNG KHỐI 12</h2>
    <p>Khối hộp có chiều rộng 500px, căn giữa bằng margin: auto và có vùng đệm padding 24px.</p>
  </div>
</body>
</html>`,
      css: `* { box-sizing: border-box; }
.khung-tin-tuc { width: 500px; max-width: 100%; margin: 30px auto; padding: 24px; background: white; border: 2px solid #2563eb; border-radius: 12px; font-family: Arial; }`
    },
    {
      id: 2,
      title: '2. Căn giữa khối tự động với margin: auto',
      description: 'Kỹ thuật kinh điển căn giữa trang web: width cố định + margin: 0 auto.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Căn giữa khối</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="khoi-can-giua">
    <h2>Khối nội dung ở chính giữa màn hình</h2>
    <p>Chiều rộng 450px luôn nằm cân đối hai bên.</p>
  </div>
</body>
</html>`,
      css: `.khoi-can-giua { width: 450px; margin: 40px auto; padding: 20px; background: #e0f2fe; border: 1px solid #7dd3fc; border-radius: 8px; text-align: center; font-family: sans-serif; }`
    },
    {
      id: 3,
      title: '3. So sánh box-sizing: content-box và border-box',
      description: 'border-box giữ nguyên kích thước không bị phình to khi thêm padding.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>box-sizing</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="hop content-box">content-box (Bị phình to hơn 300px)</div>
  <div class="hop border-box">border-box (Chuẩn xác 300px)</div>
</body>
</html>`,
      css: `.hop { width: 300px; padding: 30px; border: 5px solid #2563eb; margin-bottom: 20px; font-family: Arial; }
.content-box { box-sizing: content-box; background: #fee2e2; }
.border-box { box-sizing: border-box; background: #dcfce7; }`
    },
    {
      id: 4,
      title: '4. Thẻ giới thiệu bài viết (Card item)',
      description: 'Bố cục thẻ bài viết tin tức với ảnh và khoảng đệm hoàn hảo.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Thẻ Card</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="the-bai-viet">
    <img src="images/thethao.png" alt="Thể thao" width="100%">
    <div class="noi-dung">
      <h3>Giải bóng đá Khối 12</h3>
      <p>Trận chung kết diễn ra vào sáng Chủ nhật tuần này.</p>
    </div>
  </div>
</body>
</html>`,
      css: `* { box-sizing: border-box; }
.the-bai-viet { width: 320px; margin: 20px auto; border: 1px solid #cbd5e1; border-radius: 10px; overflow: hidden; background: white; font-family: Arial; }
.noi-dung { padding: 16px; }`
    },
    {
      id: 5,
      title: '5. Khung cảnh báo với viền nét đứt (border-style: dashed)',
      description: 'Tạo đường viền nét đứt hoặc nét chấm nổi bật.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Viền nét đứt</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="khung-canh-bao">
    <strong>LƯU Ý:</strong> Hạn chót nộp phiếu đăng ký tốt nghiệp là 17h00 ngày 20/05.
  </div>
</body>
</html>`,
      css: `.khung-canh-bao { width: 450px; margin: 20px auto; padding: 16px; border: 2px dashed #dc2626; background: #fef2f2; color: #991b1b; border-radius: 8px; font-family: sans-serif; }`
    },
    {
      id: 6,
      title: '6. Phân biệt display: block và display: inline-block',
      description: 'Chuyển đổi phần tử nội dòng thành khối có thể chỉnh width và padding.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Display</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <span class="nut inline-block">Nút 1 (inline-block)</span>
  <span class="nut inline-block">Nút 2 (inline-block)</span>
</body>
</html>`,
      css: `.inline-block { display: inline-block; width: 140px; padding: 10px; margin-right: 10px; background: #2563eb; color: white; text-align: center; border-radius: 6px; font-family: Arial; font-weight: bold; }`
    },
    {
      id: 7,
      title: '7. Khung ảnh đại diện bo tròn viền (Avatar Circle)',
      description: 'Sử dụng border-radius: 50% để bo tròn hoàn hảo một ảnh đại diện.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Avatar tròn</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="khung-avatar">
    <img src="images/sun.png" alt="Avatar" class="avatar-tron">
    <p><b>Mặt Trời Tỏa Sáng</b></p>
  </div>
</body>
</html>`,
      css: `.khung-avatar { width: 200px; margin: 30px auto; text-align: center; font-family: sans-serif; }
.avatar-tron { width: 100px; height: 100px; border-radius: 50%; border: 3px solid #f59e0b; padding: 3px; background: white; }`
    },
    {
      id: 8,
      title: '8. Hàng 2 cột thông tin đặt cạnh nhau',
      description: 'Hai hộp nội dung xếp song song sử dụng display: inline-block và width: 48%.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Bố cục 2 cột</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="cot">Cột trái: Ôn thi Toán</div>
  <div class="cot">Cột phải: Ôn thi Tin học</div>
</body>
</html>`,
      css: `* { box-sizing: border-box; }
.cot { display: inline-block; width: 48%; padding: 20px; margin: 1%; background: #e2e8f0; border-radius: 8px; font-family: Arial; text-align: center; font-weight: bold; }`
    },
    {
      id: 9,
      title: '9. Khung trích dẫn với lề trái dày (border-left)',
      description: 'Định dạng trích dẫn kiểu tạp chí với dải màu nổi bật ở lề trái.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Khung trích dẫn</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <blockquote class="trich-dan">
    "Đường đi khó, không khó vì ngăn sông cách núi, mà khó vì lòng người ngại núi e sông."
  </blockquote>
</body>
</html>`,
      css: `.trich-dan { border-left: 5px solid #2563eb; background: #f8fafc; padding: 16px 20px; margin: 20px auto; width: 500px; font-style: italic; font-family: Georgia, serif; color: #334155; }`
    },
    {
      id: 10,
      title: '10. Bảng thông số sản phẩm học tập',
      description: 'Định dạng khối hộp gọn gàng với viền kép và lề cách dòng chuẩn.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Bảng thông số</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="khung-thong-so">
    <h4>Thông số phòng máy:</h4>
    <p>Diện tích: 60m<sup>2</sup> | Máy lạnh: 2 chiếc | Máy tính: 45 bộ</p>
  </div>
</body>
</html>`,
      css: `.khung-thong-so { width: 450px; margin: 20px auto; padding: 15px; border: 1px solid #cbd5e1; border-radius: 6px; background: white; font-family: sans-serif; }`
    }
  ],

  // ==========================================
  // BÀI 17: CÁC MỨC ƯU TIÊN CỦA BỘ CHỌN (10 mẫu)
  // ==========================================
  17: [
    {
      id: 1,
      title: '1. Thí nghiệm: Phần tử < Lớp < Định danh ID',
      description: 'Đoạn văn mang cả class và id để kiểm chứng ID ghi đè Class và Thẻ.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Thực nghiệm mức ưu tiên</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <p>Đoạn 1: Thẻ p thông thường (Màu xám).</p>
  <p class="lop-uutien">Đoạn 2: Có class (Màu xanh dương).</p>
  <p class="lop-uutien" id="id-uutien">Đoạn 3: Có cả class và id (Màu đỏ chiến thắng)!</p>
</body>
</html>`,
      css: `p { color: #64748b; font-size: 16px; padding: 8px; font-family: Arial; }
.lop-uutien { color: #2563eb; }
#id-uutien { color: #dc2626; font-weight: bold; }`
    },
    {
      id: 2,
      title: '2. Thứ tự xuất hiện trong mã nguồn (Source Order)',
      description: 'Hai quy tắc cùng trọng số lớp: Quy tắc viết sau cùng ghi đè quy tắc trước.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Thứ tự xuất hiện</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <p class="mau-mot mau-hai">Đoạn văn này sẽ có màu gì theo thứ tự CSS?</p>
</body>
</html>`,
      css: `/* Quy tắc viết trước */
.mau-mot { color: blue; }

/* Quy tắc viết sau sẽ chiến thắng! */
.mau-hai { color: orange; font-weight: bold; font-family: sans-serif; }`
    },
    {
      id: 3,
      title: '3. Kiểu nội dòng style="" (Trọng số 1000)',
      description: 'style="..." viết trực tiếp trong thẻ HTML ghi đè mọi quy tắc trong CSS file.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Inline Style</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <p id="tieu-de" style="color: purple; font-size: 20px;">
    Đoạn văn này có màu tím nhờ inline style ghi đè cả ID selector!
  </p>
</body>
</html>`,
      css: `#tieu-de { color: green; }`
    },
    {
      id: 4,
      title: '4. Sức mạnh tối thượng của từ khóa !important',
      description: '!important bỏ qua mọi mức ưu tiên thông thường và áp đặt quy tắc tuyệt đối.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>!important</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <p class="quan-trong" id="dac-biet" style="color: red;">
    Đoạn văn này có màu xanh lá cây nhờ từ khóa !important!
  </p>
</body>
</html>`,
      css: `#dac-biet { color: orange; }
.quan-trong { color: green !important; font-weight: bold; font-family: Arial; }`
    },
    {
      id: 5,
      title: '5. Tính kế thừa thuộc tính (CSS Inheritance)',
      description: 'Các thuộc tính chữ (color, font-family) được phần tử con kế thừa từ cha.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Kế thừa CSS</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="cha">
    <h2>Tiêu đề con</h2>
    <p>Đoạn văn con tự động kế thừa màu chữ và phông chữ từ thẻ cha.</p>
  </div>
</body>
</html>`,
      css: `.cha { color: #1e40af; font-family: Georgia, serif; padding: 20px; background: #eff6ff; }`
    },
    {
      id: 6,
      title: '6. Trọng số kết hợp (div.hop p vs p)',
      description: 'Bộ chọn cụ thể div.hop p (12 điểm) chiến thắng bộ chọn chung p (1 điểm).',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Trọng số kết hợp</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="hop">
    <p>Đoạn văn này chịu tác động của bộ chọn cụ thể div.hop p.</p>
  </div>
</body>
</html>`,
      css: `p { color: #64748b; }
div.hop p { color: #d97706; font-weight: bold; font-family: sans-serif; }`
    },
    {
      id: 7,
      title: '7. Xung đột màu sắc nút bấm trạng thái',
      description: 'Bộ chọn lớp trạng thái .nut.nguy-hiem ghi đè lớp cơ sở .nut.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Nút bấm xung đột</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <button class="nut">Nút mặc định</button>
  <button class="nut nguy-hiem">Nút xóa dữ liệu</button>
</body>
</html>`,
      css: `.nut { padding: 8px 16px; background: #2563eb; color: white; border: none; border-radius: 4px; margin-right: 10px; }
.nut.nguy-hiem { background: #dc2626; }`
    },
    {
      id: 8,
      title: '8. Dùng class thay cho ID để dễ tái sử dụng',
      description: 'Nguyên tắc sư phạm: Tránh lạm dụng ID vì khó ghi đè và bảo trì.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Tái sử dụng class</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="the">Thẻ học tập số 1</div>
  <div class="the">Thẻ học tập số 2</div>
</body>
</html>`,
      css: `.the { padding: 12px; margin-bottom: 8px; background: white; border: 1px solid #cbd5e1; border-radius: 6px; font-family: sans-serif; }`
    },
    {
      id: 9,
      title: '9. Khắc phục lỗi CSS không nhận hiệu ứng',
      description: 'Minh họa lỗi phổ biến khi quy tắc trước bị quy tắc sau ghi đè ngoài ý muốn.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Gỡ lỗi CSS</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h2 class="tieu-de">Tại sao tiêu đề lại có màu xanh lá?</h2>
</body>
</html>`,
      css: `h2.tieu-de { color: #16a34a; font-family: Arial; }
h2 { color: #dc2626; } /* Không ghi đè được vì h2.tieu-de có trọng số cao hơn! */`
    },
    {
      id: 10,
      title: '10. Bảng tổng hợp thang điểm Specificity',
      description: 'Bảng minh họa trực quan cách tính điểm ưu tiên của trình duyệt.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Bảng điểm Specificity</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="bang-diem">
    <p>1. Inline style: <b>1000 điểm</b></p>
    <p>2. ID selector (#id): <b>100 điểm</b></p>
    <p>3. Class selector (.class): <b>10 điểm</b></p>
    <p>4. Element selector (p, h1): <b>1 điểm</b></p>
  </div>
</body>
</html>`,
      css: `.bang-diem { background: #f8fafc; border: 1px solid #cbd5e1; padding: 20px; border-radius: 8px; font-family: Arial; }
.bang-diem p { margin: 6px 0; color: #1e3a8a; }`
    }
  ],

  // ==========================================
  // BÀI 18: THỰC HÀNH TỔNG HỢP THIẾT KẾ TRANG WEB (10 mẫu)
  // ==========================================
  18: [
    {
      id: 1,
      title: '1. Cổng thông tin CLB Thể thao hoàn chỉnh',
      description: 'Website đầy đủ Header, Nav, Bảng lịch hoạt động, Form đăng ký và Footer.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>CLB Thể Thao THPT</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>CÂU LẠC BỘ THỂ THAO TRƯỜNG THPT</h1>
    <nav><a href="#lich">Lịch sinh hoạt</a> <a href="#dangky">Đăng ký</a></nav>
  </header>
  <section id="lich">
    <h2>Lịch thi đấu tuần này</h2>
    <table border="1">
      <caption>LỊCH THỂ THAO KHỐI 12</caption>
      <tr><th>Thứ</th><th>Bộ môn</th><th>Sân tập</th></tr>
      <tr><td>Thứ 3</td><td>Bóng đá</td><td>Sân cỏ</td></tr>
    </table>
  </section>
  <section id="dangky">
    <h2>Đăng ký gia nhập</h2>
    <form action="" method="post">
      <p>Họ tên: <input type="text" name="ten" required></p>
      <p><input type="submit" value="Gửi thông tin"></p>
    </form>
  </section>
  <footer><p>&copy; 2025 Tin học 12</p></footer>
</body>
</html>`,
      css: `* { box-sizing: border-box; }
body { font-family: Arial; margin: 0; padding: 0; background: #f8fafc; }
header { background: #1e40af; color: white; padding: 20px; text-align: center; }
nav a { color: #f1f5f9; margin: 0 10px; font-weight: bold; text-decoration: none; }
section { max-width: 650px; margin: 20px auto; padding: 20px; background: white; border-radius: 8px; border: 1px solid #e2e8f0; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 8px; border: 1px solid #cbd5e1; text-align: center; }
footer { background: #0f172a; color: #94a3b8; text-align: center; padding: 15px; }`
    },
    {
      id: 2,
      title: '2. Website Kỷ yếu Lớp 12A1',
      description: 'Trang lưu bút điện tử lưu giữ kỷ niệm tuổi học trò và ban cán sự lớp.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Kỷ yếu 12A1</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>LƯU BÚT ĐIỆN TỬ - TẬP THỂ 12A1</h1>
    <nav><a href="#thanhvien">Thành viên</a> <a href="#kyuc">Gửi lời chúc</a></nav>
  </header>
  <section id="thanhvien">
    <h2>Ban Cán Sự Lớp</h2>
    <table border="1">
      <caption>DANH SÁCH LỚP</caption>
      <tr><th>Chức vụ</th><th>Họ tên</th></tr>
      <tr><td>Lớp trưởng</td><td>Nguyễn Văn An</td></tr>
    </table>
  </section>
  <section id="kyuc">
    <h2>Gửi thông điệp lưu bút</h2>
    <form action="" method="post">
      <p>Lời chúc: <input type="text" name="chuc"></p>
      <p><input type="submit" value="Gửi lời chúc"></p>
    </form>
  </section>
  <footer><p>Khoá học 2022 - 2025</p></footer>
</body>
</html>`,
      css: `body { font-family: sans-serif; margin: 0; background: #fffbeb; }
header { background: #d97706; color: white; padding: 20px; text-align: center; }
nav a { color: white; margin: 0 10px; font-weight: bold; }
section { width: 600px; margin: 20px auto; padding: 20px; background: white; border-radius: 8px; }
table { width: 100%; border-collapse: collapse; } th, td { padding: 8px; border: 1px solid #fde68a; }
footer { text-align: center; padding: 15px; background: #78350f; color: white; }`
    },
    {
      id: 3,
      title: '3. Trang Giới thiệu Trường THPT Chuyên',
      description: 'Cổng thông tin lịch sử truyền thống và cơ sở vật chất nhà trường.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Trường THPT Chuyên</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>TRƯỜNG THPT CHUYÊN TỈNH</h1>
    <nav><a href="#lichsu">Truyền thống</a> <a href="#lienhe">Liên hệ</a></nav>
  </header>
  <section id="lichsu">
    <h2>Bảng Vàng Thành Tích</h2>
    <table border="1">
      <caption>HUY CHƯƠNG VÀ GIẢI THƯỞNG</caption>
      <tr><th>Năm</th><th>Kỳ thi HSG Quốc gia</th></tr>
      <tr><td>2024</td><td>15 Giải Nhất</td></tr>
    </table>
  </section>
  <section id="lienhe">
    <h2>Đăng ký tư vấn tuyển sinh</h2>
    <form action="" method="post">
      <p>Họ tên: <input type="text" name="hoten"></p>
      <p><input type="submit" value="Đăng ký"></p>
    </form>
  </section>
  <footer><p>Địa chỉ: Đường Giáo Dục, Thành phố Học Vấn</p></footer>
</body>
</html>`,
      css: `body { font-family: Arial; margin: 0; background: #f8fafc; }
header { background: #1e3a8a; color: white; padding: 24px; text-align: center; }
nav a { color: #93c5fd; margin: 0 12px; font-weight: bold; }
section { width: 600px; margin: 20px auto; padding: 20px; background: white; border: 1px solid #cbd5e1; border-radius: 8px; }
table { width: 100%; border-collapse: collapse; } th, td { padding: 8px; border: 1px solid #cbd5e1; }
footer { background: #0f172a; color: #94a3b8; text-align: center; padding: 15px; }`
    },
    {
      id: 4,
      title: '4. Bản tin Đoàn trường THPT',
      description: 'Trang thông tin sự kiện, lịch thi đua và đăng ký chiến dịch thanh niên tình nguyện.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Bản tin Đoàn trường</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>ĐOÀN TNCS HỒ CHÍ MINH - TRƯỜNG THPT</h1>
    <nav><a href="#hoatdong">Hoạt động</a> <a href="#tinhnguyen">Tình nguyện</a></nav>
  </header>
  <section id="hoatdong">
    <h2>Lịch thi đua tuần</h2>
    <table border="1">
      <caption>XẾP HẠNG THI ĐUA</caption>
      <tr><th>Chi đoàn</th><th>Xếp loại</th></tr>
      <tr><td>12A1</td><td>Xuất sắc</td></tr>
    </table>
  </section>
  <section id="tinhnguyen">
    <h2>Đăng ký chiến dịch Mùa hè xanh</h2>
    <form action="" method="post">
      <p>Tên tình nguyện viên: <input type="text" name="tnv"></p>
      <p><input type="submit" value="Tham gia ngay"></p>
    </form>
  </section>
  <footer><p>Khát vọng tuổi trẻ - Rèn đức luyện tài</p></footer>
</body>
</html>`,
      css: `body { font-family: sans-serif; margin: 0; background: #f0fdf4; }
header { background: #15803d; color: white; padding: 20px; text-align: center; }
nav a { color: white; margin: 0 10px; font-weight: bold; }
section { width: 600px; margin: 20px auto; padding: 20px; background: white; border-radius: 8px; border: 1px solid #bbf7d0; }
table { width: 100%; border-collapse: collapse; } th, td { padding: 8px; border: 1px solid #86efac; }
footer { background: #14532d; color: #86efac; text-align: center; padding: 15px; }`
    },
    {
      id: 5,
      title: '5. Cổng tra cứu tài liệu ôn thi THPT 2025',
      description: 'Website chia sẻ tài liệu ôn luyện các khối A, B, C, D.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Ôn thi THPT</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>CỔNG TÀI LIỆU ÔN THI TỐT NGHIỆP</h1>
    <nav><a href="#tailieu">Đề thi</a> <a href="#yeucau">Yêu cầu tài liệu</a></nav>
  </header>
  <section id="tailieu">
    <h2>Lịch phát hành đề thi thử</h2>
    <table border="1">
      <caption>ĐỀ THI KHẢO SÁT</caption>
      <tr><th>Môn thi</th><th>Ngày phát hành</th></tr>
      <tr><td>Toán học</td><td>Thứ Hai</td></tr>
    </table>
  </section>
  <section id="yeucau">
    <h2>Yêu cầu tài liệu cần bổ sung</h2>
    <form action="" method="post">
      <p>Môn cần tài liệu: <input type="text" name="mon"></p>
      <p><input type="submit" value="Gửi yêu cầu"></p>
    </form>
  </section>
  <footer><p>Đồng hành cùng học sinh khối 12</p></footer>
</body>
</html>`,
      css: `body { font-family: Arial; margin: 0; background: #f8fafc; }
header { background: #7c3aed; color: white; padding: 20px; text-align: center; }
nav a { color: #ddd6fe; margin: 0 10px; font-weight: bold; }
section { width: 600px; margin: 20px auto; padding: 20px; background: white; border-radius: 8px; border: 1px solid #e9d5ff; }
table { width: 100%; border-collapse: collapse; } th, td { padding: 8px; border: 1px solid #d8b4fe; }
footer { background: #4c1d95; color: #ddd6fe; text-align: center; padding: 15px; }`
    },
    {
      id: 6,
      title: '6. Portfolio cá nhân của học sinh chuyên Tin',
      description: 'Trang giới thiệu bản thân, kỹ năng lập trình web và các dự án.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Portfolio Tin học</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>HỒ SƠ CÁ NHÂN - NGUYỄN VĂN AN</h1>
    <nav><a href="#kynang">Kỹ năng</a> <a href="#lienhe">Kết nối</a></nav>
  </header>
  <section id="kynang">
    <h2>Bảng kỹ năng chuyên môn</h2>
    <table border="1">
      <caption>KỸ NĂNG LẬP TRÌNH</caption>
      <tr><th>Công nghệ</th><th>Mức độ</th></tr>
      <tr><td>HTML & CSS</td><td>Thành thạo</td></tr>
    </table>
  </section>
  <section id="lienhe">
    <h2>Liên hệ hợp tác học tập</h2>
    <form action="" method="post">
      <p>Email: <input type="text" name="mail"></p>
      <p><input type="submit" value="Gửi liên hệ"></p>
    </form>
  </section>
  <footer><p>Thiết kế bởi học sinh 12A1</p></footer>
</body>
</html>`,
      css: `body { font-family: sans-serif; margin: 0; background: #f1f5f9; }
header { background: #0f172a; color: white; padding: 20px; text-align: center; }
nav a { color: #38bdf8; margin: 0 10px; font-weight: bold; }
section { width: 600px; margin: 20px auto; padding: 20px; background: white; border-radius: 8px; }
table { width: 100%; border-collapse: collapse; } th, td { padding: 8px; border: 1px solid #cbd5e1; }
footer { background: #0284c7; color: white; text-align: center; padding: 15px; }`
    },
    {
      id: 7,
      title: '7. Tuyển sinh vào các câu lạc bộ học thuật',
      description: 'Quy trình thi tuyển và xét chọn thành viên nòng cốt.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Tuyển sinh CLB</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>TUYỂN THÀNH VIÊN CLB KHOA HỌC</h1>
    <nav><a href="#chitie">Chỉ tiêu</a> <a href="#nopdon">Nộp đơn</a></nav>
  </header>
  <section id="chitie">
    <h2>Chỉ tiêu theo ban</h2>
    <table border="1">
      <caption>CHỈ TIÊU</caption>
      <tr><th>Ban</th><th>Số lượng</th></tr>
      <tr><td>Truyền thông</td><td>5 bạn</td></tr>
    </table>
  </section>
  <section id="nopdon">
    <h2>Đơn ứng tuyển</h2>
    <form action="" method="post">
      <p>Họ tên: <input type="text" name="ten"></p>
      <p><input type="submit" value="Ứng tuyển"></p>
    </form>
  </section>
  <footer><p>CLB Khoa Học & Sáng Tạo Trẻ</p></footer>
</body>
</html>`,
      css: `body { font-family: Arial; margin: 0; background: #eff6ff; }
header { background: #2563eb; color: white; padding: 20px; text-align: center; }
nav a { color: white; margin: 0 10px; font-weight: bold; }
section { width: 600px; margin: 20px auto; padding: 20px; background: white; border-radius: 8px; }
table { width: 100%; border-collapse: collapse; } th, td { padding: 8px; border: 1px solid #bfdbfe; }
footer { background: #1e3a8a; color: white; text-align: center; padding: 15px; }`
    },
    {
      id: 8,
      title: '8. Ngày hội Văn hóa & Thể thao học đường',
      description: 'Sự kiện lớn thường niên với lịch thi đấu và đăng ký cổ động viên.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Ngày hội Thể thao</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>NGÀY HỘI VĂN HÓA - THỂ THAO TRƯỜNG THPT</h1>
    <nav><a href="#lichthi">Lịch đấu</a> <a href="#dangkycdv">Cổ động viên</a></nav>
  </header>
  <section id="lichthi">
    <h2>Lịch các bộ môn thi đấu</h2>
    <table border="1">
      <caption>LỊCH THI ĐẤU</caption>
      <tr><th>Môn</th><th>Giờ thi</th></tr>
      <tr><td>Kéo co</td><td>8h00</td></tr>
    </table>
  </section>
  <section id="dangkycdv">
    <h2>Đăng ký áo cổ động viên</h2>
    <form action="" method="post">
      <p>Lớp: <input type="text" name="lop"></p>
      <p><input type="submit" value="Đặt áo"></p>
    </form>
  </section>
  <footer><p>Khỏe để học tập và bảo vệ Tổ quốc</p></footer>
</body>
</html>`,
      css: `body { font-family: sans-serif; margin: 0; background: #fff1f2; }
header { background: #e11d48; color: white; padding: 20px; text-align: center; }
nav a { color: white; margin: 0 10px; font-weight: bold; }
section { width: 600px; margin: 20px auto; padding: 20px; background: white; border-radius: 8px; }
table { width: 100%; border-collapse: collapse; } th, td { padding: 8px; border: 1px solid #fecdd3; }
footer { background: #9f1239; color: white; text-align: center; padding: 15px; }`
    },
    {
      id: 9,
      title: '9. Cẩm nang tư vấn chọn ngành Đại học cho học sinh 12',
      description: 'Tra cứu điểm chuẩn các năm và gửi câu hỏi tư vấn tuyển sinh.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Tư vấn chọn ngành</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>CẨM NANG HƯỚNG NGHIỆP TUỔI 18</h1>
    <nav><a href="#diemchuan">Điểm chuẩn</a> <a href="#tuvan">Hỏi đáp</a></nav>
  </header>
  <section id="diemchuan">
    <h2>Điểm chuẩn tham khảo</h2>
    <table border="1">
      <caption>ĐIỂM CHUẨN</caption>
      <tr><th>Ngành</th><th>Điểm 2024</th></tr>
      <tr><td>Khoa học Máy tính</td><td>28.5</td></tr>
    </table>
  </section>
  <section id="tuvan">
    <h2>Đặt câu hỏi cho ban tư vấn</h2>
    <form action="" method="post">
      <p>Câu hỏi: <input type="text" name="cauhoi"></p>
      <p><input type="submit" value="Gửi câu hỏi"></p>
    </form>
  </section>
  <footer><p>Tự tin vững bước vào cánh cổng Đại học</p></footer>
</body>
</html>`,
      css: `body { font-family: Arial; margin: 0; background: #f8fafc; }
header { background: #0891b2; color: white; padding: 20px; text-align: center; }
nav a { color: white; margin: 0 10px; font-weight: bold; }
section { width: 600px; margin: 20px auto; padding: 20px; background: white; border-radius: 8px; }
table { width: 100%; border-collapse: collapse; } th, td { padding: 8px; border: 1px solid #a5f3fc; }
footer { background: #164e63; color: white; text-align: center; padding: 15px; }`
    },
    {
      id: 10,
      title: '10. Báo tường điện tử chào mừng 20/11',
      description: 'Dự án website Báo tường điện tử lưu niệm tặng thầy cô giáo.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Báo tường 20/11</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>BÁO TƯỜNG ĐIỆN TỬ: NGƯỜI LÁI ĐÒ THẦM LẶNG</h1>
    <nav><a href="#baitho">Thơ tặng Thầy Cô</a> <a href="#loichuc">Gửi lời tri ân</a></nav>
  </header>
  <section id="baitho">
    <h2>Bảng phân công chuyên mục báo</h2>
    <table border="1">
      <caption>CHUYÊN MỤC BÁO TƯỜNG</caption>
      <tr><th>Chuyên mục</th><th>Phụ trách</th></tr>
      <tr><td>Xã luận</td><td>Bạn Minh An</td></tr>
    </table>
  </section>
  <section id="loichuc">
    <h2>Gửi lời chúc mừng 20/11</h2>
    <form action="" method="post">
      <p>Họ tên: <input type="text" name="ten"></p>
      <p><input type="submit" value="Gửi lời chúc"></p>
    </form>
  </section>
  <footer><p>Tập thể Chi đoàn 12A1 kính dâng Thầy Cô</p></footer>
</body>
</html>`,
      css: `body { font-family: Georgia, serif; margin: 0; background: #fdf2f8; }
header { background: #be185d; color: white; padding: 20px; text-align: center; }
nav a { color: #fbcfe8; margin: 0 10px; font-weight: bold; }
section { width: 600px; margin: 20px auto; padding: 20px; background: white; border-radius: 8px; border: 1px solid #fbcfe8; }
table { width: 100%; border-collapse: collapse; } th, td { padding: 8px; border: 1px solid #f472b6; }
footer { background: #831843; color: white; text-align: center; padding: 15px; }`
    }
  ]
};
