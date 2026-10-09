import { CodeSample } from '../../types';

export const LESSON_11_SAMPLES: CodeSample[] = [
  {
    id: 1,
    title: '1. Chèn ảnh thể thao với thẻ img',
    description: 'Sử dụng ảnh ảo images/thethao.png với các thuộc tính alt, width, style.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Ảnh thể thao học đường</title>
</head>
<body>
  <h2>HỘI KHỎE PHÙ ĐỔNG TRƯỜNG THPT</h2>
  <p>Hình ảnh cổ vũ tinh thần rèn luyện thể thao của học sinh khối 12:</p>
  <img src="images/thethao.png" alt="Biểu trưng Thể thao học đường" width="450" style="border: 2px solid #2563eb; border-radius: 8px;">
  <p><i>Ảnh minh họa hoạt động thể dục thể thao năm học 2025 - 2026.</i></p>
</body>
</html>`
  },
  {
    id: 2,
    title: '2. Nhúng video với thẻ video controls',
    description: 'Chèn video videos/war_is_over.mp4 có thanh điều khiển âm lượng, phát/dừng.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Xem video học tập</title>
</head>
<body>
  <h2>VIDEO TƯ LIỆU LỊCH SỬ KHỐI 12</h2>
  <p>Mời các em theo dõi đoạn video tư liệu sau:</p>
  <video src="videos/war_is_over.mp4" controls width="480" style="border-radius: 8px; background: black;">
    Trình duyệt của bạn không hỗ trợ thẻ video.
  </video>
  <p><small>Nhấn nút Play trên thanh điều khiển để bắt đầu phát video.</small></p>
</body>
</html>`
  },
  {
    id: 3,
    title: '3. Phát bài Tiến quân ca với thẻ audio',
    description: 'Chèn tệp âm thanh audio/Quoc_ca.mp3 có thanh điều khiển controls.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Nghe Quốc ca Việt Nam</title>
</head>
<body>
  <h2>BÀI HÁT: TIẾN QUÂN CA (QUỐC CA)</h2>
  <p>Nhạc và lời: <b>Nhạc sĩ Văn Cao</b></p>
  <audio src="audio/Quoc_ca.mp3" controls style="width: 380px;">
    Trình duyệt của bạn không hỗ trợ thẻ audio.
  </audio>
  <p style="margin-top: 10px;"><i>"Đoàn quân Việt Nam đi, chung lòng cứu quốc, bước chân dồn vang trên đường gập ghềnh xa..."</i></p>
</body>
</html>`
  },
  {
    id: 4,
    title: '4. Khung nội tuyến iframe nhúng CLB.html',
    description: 'Nhúng trang web con CLB.html vào trong trang hiện tại với kích thước chuẩn.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Nhúng trang con CLB</title>
</head>
<body>
  <h2>BẢN TIN HOẠT ĐỘNG CÂU LẠC BỘ NGOẠI KHÓA</h2>
  <p>Dưới đây là khung hiển thị trang web giới thiệu CLB được nhúng trực tiếp:</p>
  <iframe src="CLB.html" width="100%" height="320" style="border: 2px solid #cbd5e1; border-radius: 8px;">
    Trình duyệt không hỗ trợ iframe.
  </iframe>
  <p><small>Học sinh có thể cuộn và tương tác ngay bên trong khung nội tuyến ở trên.</small></p>
</body>
</html>`
  },
  {
    id: 5,
    title: '5. Trung tâm truyền thông đa phương tiện',
    description: 'Trang kết hợp đồng thời ảnh, video, âm thanh và ghi chú bản quyền.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Trung tâm truyền thông 12</title>
</head>
<body>
  <h2>TRUNG TÂM TƯ LIỆU ĐA PHƯƠNG TIỆN</h2>
  <hr>
  <h3>1. Hình ảnh năng lượng mặt trời</h3>
  <img src="images/sun.png" alt="Bình minh năng lượng" width="220" style="border-radius: 8px;">
  
  <h3>2. Bản ghi âm Quốc ca</h3>
  <audio src="audio/Quoc_ca.mp3" controls style="width: 320px;"></audio>
  
  <h3>3. Thước phim tài liệu</h3>
  <video src="videos/war_is_over.mp4" controls width="380" style="border-radius: 8px;"></video>
</body>
</html>`
  },
  {
    id: 6,
    title: '6. Khung iframe nhúng bản tin thong_tin.html',
    description: 'Nhúng trang thong_tin.html với đường viền nổi bật mô phỏng cửa sổ tin tức.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Cửa sổ tin tức nội tuyến</title>
</head>
<body>
  <h2>BẢNG TIN THÔNG BÁO TỔNG HỢP</h2>
  <iframe src="thong_tin.html" width="100%" height="300" style="border: 2px dashed #3b82f6; border-radius: 8px; background: #fafafa;">
  </iframe>
  <p style="text-align: right;"><a href="thong_tin.html" target="_blank">↗ Mở rộng sang tab mới</a></p>
</body>
</html>`
  },
  {
    id: 7,
    title: '7. Bố cục 2 cột: Ảnh và Mô tả bên cạnh',
    description: 'Đặt ảnh thể thao bên trái và đoạn văn mô tả sự kiện bên phải.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Bố cục ảnh và chữ</title>
</head>
<body>
  <h2>LỄ KHAI MẠC GIẢI THỂ THAO HỌC ĐƯỜNG</h2>
  <table border="0" cellpadding="8">
    <tr>
      <td style="width: 250px; vertical-align: top;">
        <img src="images/thethao.png" alt="Logo thể thao" width="240" style="border-radius: 8px;">
      </td>
      <td style="vertical-align: top;">
        <p>Giải đấu quy tụ hơn 500 vận động viên đến từ 30 chi đoàn thuộc các khối 10, 11 và 12.</p>
        <p>Các nội dung tranh tài gồm: Bóng đá nam, Bóng rổ, Cầu lông đơn nữ và Chạy tiếp sức 4x100m.</p>
        <p><b>Thời gian:</b> Từ ngày 15/10 đến ngày 25/10/2026.</p>
      </td>
    </tr>
  </table>
</body>
</html>`
  },
  {
    id: 8,
    title: '8. Video tự động lặp (loop & muted)',
    description: 'Thẻ video có thuộc tính loop và muted thích hợp làm video nền hoặc minh họa.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Video lặp lại</title>
</head>
<body>
  <h2>VIDEO TẬP THỂ DỤC GIỮA GIỜ</h2>
  <p>Đoạn clip tự động phát không tiếng và lặp lại liên tục:</p>
  <video src="videos/war_is_over.mp4" controls muted loop width="420" style="border-radius: 8px;">
  </video>
  <p><small>Thuộc tính loop giúp video tự khởi động lại khi kết thúc.</small></p>
</body>
</html>`
  },
  {
    id: 9,
    title: '9. Trang nghe nhạc kèm Lời bài hát (Lyrics)',
    description: 'Trình bày thẻ audio phát nhạc cùng lời bài hát bên dưới.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Giai điệu học đường</title>
</head>
<body>
  <h2>BÀI CA THANH NIÊN VIỆT NAM</h2>
  <audio src="audio/Quoc_ca.mp3" controls style="width: 100%; max-width: 400px; margin-bottom: 12px;"></audio>
  <div style="background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 12px;">
    <h4>Lời bài hát:</h4>
    <p><i>Đoàn quân Việt Nam đi chung lòng cứu quốc...<br>Cờ in máu chiến thắng mang hồn nước...<br>Súng ngoài xa chen khúc quân hành ca...</i></p>
  </div>
</body>
</html>`
  },
  {
    id: 10,
    title: '10. Khung iframe đôi so sánh 2 trang',
    description: 'Đặt hai khung iframe song song hiển thị đồng thời hai trang web con.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>So sánh hai trang web</title>
</head>
<body>
  <h2>SO SÁNH 2 TRANG WEB NỘI BỘ</h2>
  <table border="0" style="width: 100%;">
    <tr>
      <th style="width: 50%;">Trang 1: thong_tin.html</th>
      <th style="width: 50%;">Trang 2: CLB.html</th>
    </tr>
    <tr>
      <td>
        <iframe src="thong_tin.html" width="100%" height="260" style="border: 1px solid #94a3b8; border-radius: 6px;"></iframe>
      </td>
      <td>
        <iframe src="CLB.html" width="100%" height="260" style="border: 1px solid #94a3b8; border-radius: 6px;"></iframe>
      </td>
    </tr>
  </table>
</body>
</html>`
  }
];
