import { CodeSample } from '../../types';

export const LESSON_12_SAMPLES: CodeSample[] = [
  {
    id: 1,
    title: '1. Đăng ký dự thi tốt nghiệp 12 (Hình 12.3 SGK)',
    description: 'Biểu mẫu chuẩn SGK: Họ tên, Số CCCD, Ngày sinh, Giới tính, Môn thi, Tổ hợp, Nút gửi.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Đăng ký môn thi tốt nghiệp</title>
</head>
<body>
  <h2>PHIẾU ĐĂNG KÝ MÔN THI TỐT NGHIỆP THPT</h2>
  <form action="#" method="post" style="line-height: 2;">
    <label>Họ và tên thí sinh:</label><br>
    <input type="text" name="hoten" placeholder="Nguyễn Văn A" required><br>

    <label>Số Căn cước công dân (CCCD):</label><br>
    <input type="number" name="cccd" placeholder="001206xxxxxx" required><br>

    <label>Ngày sinh:</label><br>
    <input type="date" name="ngaysinh"><br>

    <label>Giới tính:</label><br>
    <input type="radio" name="gioitinh" value="nam" id="gt_nam"> <label for="gt_nam">Nam</label>
    <input type="radio" name="gioitinh" value="nu" id="gt_nu"> <label for="gt_nu">Nữ</label><br>

    <label>Môn thi bắt buộc:</label><br>
    <input type="checkbox" name="mon" value="toan" checked> Toán
    <input type="checkbox" name="mon" value="van" checked> Ngữ văn
    <input type="checkbox" name="mon" value="anh"> Tiếng Anh<br>

    <label>Tổ hợp tự chọn:</label><br>
    <select name="tohop">
      <option value="khtn">Khoa học tự nhiên (Lý, Hóa, Sinh)</option>
      <option value="khxh">Khoa học xã hội (Sử, Địa, GDCD)</option>
    </select><br><br>

    <input type="submit" value="Gửi thông tin đăng ký" style="padding: 6px 16px; font-weight: bold; cursor: pointer;">
  </form>
</body>
</html>`
  },
  {
    id: 2,
    title: '2. Form Đăng nhập Cổng thông tin học sinh',
    description: 'Nhập tên đăng nhập (text), mật khẩu (password) và ghi nhớ tài khoản (checkbox).',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Đăng nhập tài khoản</title>
</head>
<body>
  <h2>CỔNG THÔNG TIN ĐIỆN TỬ HỌC SINH</h2>
  <form action="#" method="post" style="max-width: 320px; padding: 16px; border: 1px solid #cbd5e1; border-radius: 8px;">
    <p>
      <label>Tên đăng nhập (Mã học sinh):</label><br>
      <input type="text" name="username" style="width: 100%;" required>
    </p>
    <p>
      <label>Mật khẩu:</label><br>
      <input type="password" name="password" style="width: 100%;" required>
    </p>
    <p>
      <input type="checkbox" id="remember" name="remember">
      <label for="remember">Ghi nhớ đăng nhập trên thiết bị này</label>
    </p>
    <button type="submit" style="width: 100%; padding: 8px; background: #2563eb; color: white; border: none; border-radius: 4px; font-weight: bold;">
      ĐĂNG NHẬP
    </button>
  </form>
</body>
</html>`
  },
  {
    id: 3,
    title: '3. Khảo sát Ý kiến về Căng tin trường',
    description: 'Đánh giá mức độ hài lòng bằng radio và viết góp ý qua textarea.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Khảo sát ý kiến</title>
</head>
<body>
  <h2>PHIẾU KHẢO SÁT CHẤT LƯỢNG CĂNG TIN</h2>
  <form action="#" method="post" style="line-height: 1.8;">
    <p>1. Bạn đánh giá thế nào về chất lượng đồ ăn?</p>
    <input type="radio" name="danhgia" value="rat_tot" id="dg1"> <label for="dg1">Rất ngon &amp; sạch sẽ</label><br>
    <input type="radio" name="danhgia" value="binh_thuong" id="dg2"> <label for="dg2">Tạm ổn</label><br>
    <input type="radio" name="danhgia" value="can_cai_thien" id="dg3"> <label for="dg3">Cần cải thiện chất lượng</label>

    <p>2. Đóng góp ý kiến chi tiết của bạn:</p>
    <textarea name="gopy" rows="4" cols="45" placeholder="Nhập ý kiến đóng góp hoặc đề xuất món ăn mới..."></textarea><br><br>

    <input type="submit" value="Gửi đánh giá">
    <input type="reset" value="Làm lại">
  </form>
</body>
</html>`
  },
  {
    id: 4,
    title: '4. Đăng ký Câu lạc bộ Tin học & Robotics',
    description: 'Họ tên, email, chọn trình độ lập trình bằng select dropdown và lời nhắn.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Đăng ký CLB Tin học</title>
</head>
<body>
  <h2>ĐƠN ĐĂNG KÝ THAM GIA CLB TIN HỌC 12</h2>
  <form action="#" method="post">
    <p>
      <label>Họ và tên:</label><br>
      <input type="text" name="fullname" size="35" required>
    </p>
    <p>
      <label>Email liên hệ:</label><br>
      <input type="email" name="email" size="35" required>
    </p>
    <p>
      <label>Kinh nghiệm lập trình của bạn:</label><br>
      <select name="level">
        <option value="newbie">Mới bắt đầu học HTML/CSS</option>
        <option value="intermediate">Đã biết ngôn ngữ Python/C++</option>
        <option value="advanced">Đã từng tham gia thi HSG Tin học</option>
      </select>
    </p>
    <p>
      <label>Nguyện vọng khi vào CLB:</label><br>
      <textarea name="aspiration" rows="3" cols="35"></textarea>
    </p>
    <input type="submit" value="Nộp đơn đăng ký">
  </form>
</body>
</html>`
  },
  {
    id: 5,
    title: '5. Form Đặt may Áo đồng phục lớp 12',
    description: 'Chọn cỡ áo size, số lượng đặt may và địa chỉ nhận hàng.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Đặt áo đồng phục</title>
</head>
<body>
  <h2>ĐĂNG KÝ MAY ÁO ĐỒNG PHỤC KỶ YẾU LỚP 12</h2>
  <form action="#" method="post">
    <p>
      <label>Họ tên học sinh:</label><br>
      <input type="text" name="ten" required>
    </p>
    <p>
      <label>Chọn kích cỡ (Size):</label><br>
      <select name="size">
        <option value="S">Size S (Dưới 48kg)</option>
        <option value="M">Size M (48kg - 55kg)</option>
        <option value="L">Size L (56kg - 65kg)</option>
        <option value="XL">Size XL (Trên 65kg)</option>
      </select>
    </p>
    <p>
      <label>Số lượng áo:</label><br>
      <input type="number" name="soluong" value="1" min="1" max="5">
    </p>
    <p>
      <label>In biệt danh sau lưng áo (nếu có):</label><br>
      <input type="text" name="nickname">
    </p>
    <input type="submit" value="Xác nhận đặt áo">
  </form>
</body>
</html>`
  },
  {
    id: 6,
    title: '6. Nộp bài tập thực hành trực tuyến',
    description: 'Form đính kèm tệp bài làm (input type="file") và ghi chú cho thầy cô.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Nộp bài tập Tin học</title>
</head>
<body>
  <h2>CỔNG NỘP BÀI THỰC HÀNH TIN HỌC 12</h2>
  <form action="#" method="post" enctype="multipart/form-data">
    <p>
      <label>Mã số học sinh:</label><br>
      <input type="text" name="ms_hs" placeholder="Ví dụ: 12A1-05" required>
    </p>
    <p>
      <label>Chọn bài thực hành:</label><br>
      <select name="bai_th">
        <option>Bài 7: Cấu trúc HTML</option>
        <option>Bài 9: Tạo danh sách, bảng</option>
        <option>Bài 12: Thiết kế Form</option>
      </select>
    </p>
    <p>
      <label>Đính kèm tệp mã nguồn (.html hoặc .zip):</label><br>
      <input type="file" name="tep_bai_lam" required>
    </p>
    <input type="submit" value="Tải lên và nộp bài">
  </form>
</body>
</html>`
  },
  {
    id: 7,
    title: '7. Phiếu bình chọn Đoàn viên ưu tú',
    description: 'Bình chọn ứng viên bằng radio buttons và lý do đề cử trong textarea.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Bình chọn thi đua</title>
</head>
<body>
  <h2>BÌNH CHỌN ĐOÀN VIÊN XUẤT SẮC HỌC KỲ 1</h2>
  <form action="#" method="post">
    <p><b>Hãy chọn 01 cá nhân tiêu biểu nhất:</b></p>
    <p><input type="radio" name="ungvien" value="1" id="u1"> <label for="u1">Nguyễn Hải Anh (Bí thư Chi đoàn)</label></p>
    <p><input type="radio" name="ungvien" value="2" id="u2"> <label for="u2">Trần Bảo Châu (Lớp phó Học tập)</label></p>
    <p><input type="radio" name="ungvien" value="3" id="u3"> <label for="u3">Lê Hoàng Nam (Đội trưởng CLB Thể thao)</label></p>
    
    <p><label>Lý do bình chọn:</label><br>
    <textarea name="lydo" rows="3" cols="40"></textarea></p>
    <input type="submit" value="Gửi phiếu bầu">
  </form>
</body>
</html>`
  },
  {
    id: 8,
    title: '8. Form Mượn sách Thư viện trường',
    description: 'Nhập tên sách, ngày mượn date và ngày hẹn trả date.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Mượn sách thư viện</title>
</head>
<body>
  <h2>PHIẾU ĐĂNG KÝ MƯỢN SÁCH THƯ VIỆN</h2>
  <form action="#" method="post">
    <p>Tên tài liệu / Sách: <br><input type="text" name="tensach" size="40" required></p>
    <p>Mã thẻ học sinh: <br><input type="text" name="mathe" required></p>
    <p>Ngày mượn: <br><input type="date" name="ngaymuon"></p>
    <p>Ngày hẹn trả: <br><input type="date" name="ngaytra"></p>
    <p><input type="checkbox" name="camket" required> Tôi cam kết giữ gìn sách nguyên vẹn không làm rách hỏng.</p>
    <input type="submit" value="Đăng ký mượn sách">
  </form>
</body>
</html>`
  },
  {
    id: 9,
    title: '9. Khung Tìm kiếm tài liệu học tập',
    description: 'Thanh tìm kiếm nhanh với input type="search" và lựa chọn phạm vi tìm kiếm.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Tìm kiếm bài giảng</title>
</head>
<body>
  <h2>TÌM KIẾM HỌC LIỆU SỐ</h2>
  <form action="#" method="get">
    <input type="search" name="q" placeholder="Nhập từ khóa tìm kiếm (Ví dụ: Thẻ bảng, CSS...)" size="35">
    <input type="submit" value="🔍 Tìm kiếm"><br><br>
    <small>Tìm kiếm trong:</small>
    <input type="radio" name="scope" value="sgk" checked> Sách giáo khoa
    <input type="radio" name="scope" value="dethi"> Ngân hàng đề thi
    <input type="radio" name="scope" value="video"> Bài giảng video
  </form>
</body>
</html>`
  },
  {
    id: 10,
    title: '10. Biểu mẫu Liên hệ Ban Giám hiệu',
    description: 'Họ tên, điện thoại, chủ đề phản ánh select, nội dung và nút xóa reset.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Hòm thư góp ý</title>
</head>
<body>
  <h2>HÒM THƯ GÓP Ý BAN GIÁM HIỆU</h2>
  <form action="#" method="post" style="line-height: 1.8;">
    <p>Họ tên học sinh: <br><input type="text" name="sender_name" required></p>
    <p>Lớp: <br><input type="text" name="sender_class" placeholder="12A..."></p>
    <p>Chủ đề phản ánh: <br>
      <select name="topic">
        <option>Cơ sở vật chất phòng máy tính</option>
        <option>Thời khóa biểu và lịch học bồi dưỡng</option>
        <option>Hoạt động văn thể mỹ và câu lạc bộ</option>
        <option>Vấn đề khác</option>
      </select>
    </p>
    <p>Nội dung chi tiết: <br><textarea name="message" rows="4" cols="40" required></textarea></p>
    <input type="submit" value="Gửi thư đóng góp" style="background: #16a34a; color: white; padding: 6px 12px; border: none; border-radius: 4px;">
    <input type="reset" value="Hủy bỏ">
  </form>
</body>
</html>`
  }
];
