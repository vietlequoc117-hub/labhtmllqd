import { CodeSample } from '../../types';

export const LESSON_8_SAMPLES: CodeSample[] = [
  {
    id: 1,
    title: '1. Biện luận PT bậc 2 (Hình 8.3 SGK)',
    description: 'Chỉ số trên sup, in đậm, in nghiêng và đổi màu chữ bằng style.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Biện luận PT bậc 2</title>
</head>
<body>
  <h2>Biện luận số nghiệm của phương trình bậc 2</h2>
  <p>Cho phương trình: <b>ax<sup>2</sup> + bx + c = 0</b> (a ≠ 0)</p>
  <p>Biệt thức: <b>Δ = b<sup>2</sup> - 4ac</b></p>
  <p style="color: blue;">• Nếu Δ &gt; 0: Phương trình có 2 nghiệm phân biệt.</p>
  <p style="color: green;">• Nếu Δ = 0: Phương trình có nghiệm kép: <i>x<sub>1</sub> = x<sub>2</sub> = -b/2a</i>.</p>
  <p style="color: red;">• Nếu Δ &lt; 0: Phương trình vô nghiệm.</p>
</body>
</html>`
  },
  {
    id: 2,
    title: '2. Công thức Hóa học và Ion',
    description: 'Ứng dụng chỉ số dưới sub cho nguyên tử và chỉ số trên sup cho điện tích ion.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Công thức Hóa học</title>
</head>
<body>
  <h2>BẢNG CÔNG THỨC HÓA HỌC 12</h2>
  <p>Nước: <b>H<sub>2</sub>O</b></p>
  <p>Axit sunfuric: <b>H<sub>2</sub>SO<sub>4</sub></b></p>
  <p>Khí Cacbonic: <b>CO<sub>2</sub></b></p>
  <p>Phản ứng điện phân: <i>Cu<sup>2+</sup> + 2e<sup>-</sup> → Cu</i></p>
  <p>Ion sắt (III): <b>Fe<sup>3+</sup></b> và ion Sunfat: <b>SO<sub>4</sub><sup>2-</sup></b></p>
</body>
</html>`
  },
  {
    id: 3,
    title: '3. Niêm yết giá & Khuyến mãi (del, mark, small)',
    description: 'Thẻ del gạch giá cũ, mark nổi bật mức giảm và small ghi chú điều kiện.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Ưu đãi sách ôn thi</title>
</head>
<body>
  <h2>BỘ SÁCH ÔN THI TỐT NGHIỆP 12</h2>
  <p>Giá gốc: <del>350.000 VNĐ</del></p>
  <p>Giá khuyến mãi: <mark style="background-color: #fef08a;"><b>245.000 VNĐ</b></mark> <span style="color: red;">(-30%)</span></p>
  <p><small>* Áp dụng cho học sinh đặt trước ngày 30/04/2026. Miễn phí vận chuyển toàn quốc.</small></p>
</body>
</html>`
  },
  {
    id: 4,
    title: '4. Trích dẫn Quy chế thi (strong, em, u)',
    description: 'Nhấn mạnh các mốc thời gian và cảnh báo kỷ luật thi.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Quy chế phòng thi</title>
</head>
<body>
  <h2>NHỮNG ĐIỀU THÍ SINH CẦN LƯU Ý</h2>
  <p><strong>CẢNH BÁO:</strong> Tuyệt đối <u>không mang điện thoại</u> vào phòng thi!</p>
  <p>Thí sinh phải có mặt tại phòng thi trước <em>06 giờ 45 phút</em> sáng.</p>
  <p>Nếu vi phạm, thí sinh sẽ bị <strong><mark>đình chỉ thi</mark></strong> ngay lập tức.</p>
</body>
</html>`
  },
  {
    id: 5,
    title: '5. Định dạng đa phong cách với style',
    description: 'Thay đổi màu sắc (color), cỡ chữ (font-size) và kiểu phông chữ (font-family).',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Định dạng style</title>
</head>
<body>
  <h1 style="color: #1e40af; font-family: 'Segoe UI', Tahoma, sans-serif;">Tiêu đề xanh dương thanh lịch</h1>
  <p style="color: #b91c1c; font-size: 18px; font-weight: bold;">Đoạn văn cảnh báo màu đỏ cỡ 18px.</p>
  <p style="color: #047857; font-size: 15px; font-style: italic;">Đoạn văn thành công màu xanh lá nghiêng.</p>
  <p style="font-family: 'Courier New', monospace; background-color: #f1f5f9; padding: 6px;">Mã nguồn mẫu hiển thị dạng chữ máy đánh chữ.</p>
</body>
</html>`
  },
  {
    id: 6,
    title: '6. Định lý Pytago và Hệ thức lượng',
    description: 'Trình bày toán học diện tích tam giác và định lý Pytago.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Định lý Pytago</title>
</head>
<body>
  <h2>ĐỊNH LÝ PYTAGO TRONG TAM GIÁC VUÔNG</h2>
  <p>Trong tam giác vuông <i>ABC</i> vuông tại <i>A</i>:</p>
  <p style="font-size: 20px; color: #4338ca;"><b>BC<sup>2</sup> = AB<sup>2</sup> + AC<sup>2</sup></b></p>
  <p>Hay tổng quát: <b>a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup></b> (với <i>c</i> là cạnh huyền).</p>
  <p>Diện tích tam giác: <i>S = <sup>1</sup>/<sub>2</sub> · a · h</i></p>
</body>
</html>`
  },
  {
    id: 7,
    title: '7. Khổ thơ Tây Tiến (Quang Dũng)',
    description: 'Định dạng thơ trữ tình kết hợp in nghiêng em, gạch chân u và màu sắc.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Thơ Tây Tiến</title>
</head>
<body>
  <h2 style="color: #7c2d12;">TÂY TIẾN - QUANG DŨNG</h2>
  <p style="font-style: italic; color: #4b5563;">
    "Sông Mã xa rồi Tây Tiến ơi!<br>
    Nhớ về rừng núi, nhớ chơi vơi.<br>
    Sài Khao sương lấp đoàn quân mỏi,<br>
    Mường Lát hoa về trong đêm hơi..."
  </p>
  <p><small><b>Trích:</b> <u>Ngữ văn 12</u> - Tập một, NXB Giáo dục Việt Nam.</small></p>
</body>
</html>`
  },
  {
    id: 8,
    title: '8. Thực đơn Quán ăn vặt Cổng trường',
    description: 'Tên món in đậm b, món hot highlight mark, mô tả size nhỏ small.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Menu Cổng trường</title>
</head>
<body>
  <h2>THỰC ĐƠN ĂN VẶT 12A1</h2>
  <p><b>1. Trà sữa trân châu đường đen:</b> 25.000đ <mark>BEST SELLER</mark></p>
  <p><small>(Thành phần: Trà đen, sữa tươi, trân châu nấu đường đen)</small></p>
  <p><b>2. Bánh tráng phơi sương cuốn muối:</b> 20.000đ</p>
  <p><b>3. Trà mãng cầu:</b> <del>30.000đ</del> <b>22.000đ</b></p>
</body>
</html>`
  },
  {
    id: 9,
    title: '9. Bản cam kết Học tập Đầu năm',
    description: 'Văn bản cam kết với thẻ strong, u gạch chân và chữ đỏ nhấn mạnh.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Bản cam kết học tập</title>
</head>
<body>
  <h2 style="text-align: center; color: #1e3a8a;">BẢN CAM KẾT HỌC TẬP KHỐI 12</h2>
  <p>Em tên là: <b>Nguyễn Minh Đức</b> - Lớp: <b>12A5</b></p>
  <p>Em xin cam kết thực hiện đúng <u>3 nội quy</u> sau:</p>
  <p>1. <strong>Đi học đúng giờ</strong>, không nghỉ học không phép.</p>
  <p>2. Hoàn thành 100% <em>bài tập về nhà môn Tin học</em> trước khi đến lớp.</p>
  <p style="color: red;">3. <u>Không sử dụng điện thoại</u> trong giờ học khi chưa được giáo viên cho phép.</p>
</body>
</html>`
  },
  {
    id: 10,
    title: '10. Bảng đơn vị và Ký hiệu Vật lý 12',
    description: 'Trình bày các đại lượng vật lý dao động điều hòa và sóng cơ học.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Công thức Vật lý 12</title>
</head>
<body>
  <h2>DAO ĐỘNG ĐIỀU HÒA</h2>
  <p>Phương trình li độ: <b>x = A·cos(ωt + φ)</b></p>
  <p>Vận tốc: <i>v = x' = -ωA·sin(ωt + φ)</i></p>
  <p>Gia tốc: <b>a = -ω<sup>2</sup>x</b></p>
  <p>Động năng cực đại: <i>W<sub>đ max</sub> = <sup>1</sup>/<sub>2</sub>·m·v<sub>max</sub><sup>2</sup></i></p>
  <p><small>Đơn vị: <i>x</i> (cm), <i>v</i> (cm/s), <i>a</i> (cm/s<sup>2</sup>).</small></p>
</body>
</html>`
  }
];
