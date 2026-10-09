import { LessonMission } from '../../types';

export const LESSON_12_MISSIONS: LessonMission[] = [
  {
    id: 1,
    title: 'Nhiệm vụ 1: Đăng ký thi tốt nghiệp 12 (Hình 12.3 SGK)',
    description: 'Thiết lập biểu mẫu chuẩn SGK Tin học 12: Họ tên (text), CCCD (number), Ngày sinh (date), Giới tính (radio), Môn thi (checkbox: Toán, Văn, Anh), Tổ hợp (select dropdown) và Nút gửi (submit).',
    requirements: [
      'Thẻ <form> bao bọc toàn bộ các phần tử nhập liệu',
      'Có ô nhập text (Họ tên) và date (Ngày sinh)',
      'Có nhóm nút radio chọn Giới tính (Nam / Nữ)',
      'Có nhóm nút checkbox chọn Môn thi bắt buộc',
      'Có hộp chọn <select> với các thẻ <option> tổ hợp KHTN/KHXH',
      'Có nút submit gửi thông tin'
    ],
    targetResult: {
      title: 'Biểu mẫu Đăng ký môn thi tốt nghiệp THPT',
      description: 'Form chuẩn hình 12.3 SGK với đầy đủ các loại thẻ input cơ bản.',
      html: `<!DOCTYPE html>
<html>
<head><title>Đăng ký thi tốt nghiệp</title></head>
<body>
  <h2>ĐĂNG KÍ MÔN THI TỐT NGHIỆP</h2>
  <form action="#" method="post">
    Họ và tên: <input type="text" name="hoten"><br><br>
    Số CCCD: <input type="number" name="cccd"><br><br>
    Ngày sinh: <input type="date" name="ngaysinh"><br><br>
    Giới tính: 
    <input type="radio" name="gioitinh" value="nam"> Nam
    <input type="radio" name="gioitinh" value="nu"> Nữ<br><br>
    Môn thi: 
    <input type="checkbox" name="mon" value="toan"> Toán
    <input type="checkbox" name="mon" value="van"> Ngữ văn
    <input type="checkbox" name="mon" value="anh"> Tiếng Anh<br><br>
    Tổ hợp môn: 
    <select name="tohop">
      <option value="khtn">Khoa học tự nhiên</option>
      <option value="khxh">Khoa học xã hội</option>
    </select><br><br>
    <input type="submit" value="Gửi thông tin">
  </form>
</body>
</html>`
    },
    hint: 'Mỗi loại trường dữ liệu tương ứng với thuộc tính type của thẻ input (text, number, date, radio, checkbox, submit).',
    checkCriteria: (doc) => {
      const hasForm = !!doc.querySelector('form');
      const hasText = !!doc.querySelector('input[type="text"]');
      const hasDate = !!doc.querySelector('input[type="date"]');
      const radioCount = doc.querySelectorAll('input[type="radio"]').length;
      const checkCount = doc.querySelectorAll('input[type="checkbox"]').length;
      const hasSelect = doc.querySelectorAll('select option').length >= 2;
      const hasSubmit = !!doc.querySelector('input[type="submit"], button[type="submit"]');
      const passed = hasForm && hasText && hasDate && radioCount >= 2 && checkCount >= 2 && hasSelect && hasSubmit;
      return {
        passed,
        message: passed
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 1: Biểu mẫu đăng ký thi tốt nghiệp chuẩn xác 100% SGK!'
          : 'Cần có đủ form, text, date, ít nhất 2 radio, 2 checkbox, thẻ select có option và nút submit.'
      };
    }
  },
  {
    id: 2,
    title: 'Nhiệm vụ 2: Form Đăng nhập bảo mật (type="password")',
    description: 'Tạo form đăng nhập vào cổng học tập gồm: Tên tài khoản (text), Mật khẩu được ẩn ký tự bằng input type="password", checkbox Ghi nhớ đăng nhập và nút Đăng nhập.',
    requirements: [
      'Có ô nhập tên tài khoản (input type="text")',
      'Có ô nhập mật khẩu được che ký tự bằng input type="password"',
      'Có checkbox "Ghi nhớ đăng nhập trên máy này"',
      'Có nút bấm submit đăng nhập'
    ],
    targetResult: {
      title: 'Form Đăng nhập Cổng thông tin học sinh',
      description: 'Giao diện đăng nhập bảo mật với các dấu sao che mật khẩu.',
      html: `<!DOCTYPE html>
<html>
<head><title>Đăng nhập</title></head>
<body>
  <h2>CỔNG THÔNG TIN HỌC SINH</h2>
  <form action="#" method="post">
    <p>Tên đăng nhập: <br><input type="text" name="user" required></p>
    <p>Mật khẩu: <br><input type="password" name="pass" required></p>
    <p><input type="checkbox" name="remember" id="rem"> <label for="rem">Ghi nhớ đăng nhập</label></p>
    <button type="submit">ĐĂNG NHẬP</button>
  </form>
</body>
</html>`
    },
    hint: 'type="password" giúp trình duyệt tự động che các ký tự người dùng gõ vào bằng dấu chấm tròn hoặc dấu sao.',
    checkCriteria: (doc) => {
      const hasUser = !!doc.querySelector('input[type="text"]');
      const hasPass = !!doc.querySelector('input[type="password"]');
      const hasCheck = !!doc.querySelector('input[type="checkbox"]');
      const hasBtn = !!doc.querySelector('button, input[type="submit"]');
      const passed = hasUser && hasPass && hasCheck && hasBtn;
      return {
        passed,
        message: passed
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 2: Form đăng nhập bảo mật đúng chuẩn!'
          : `Còn thiếu: ${!hasUser ? 'Username, ' : ''}${!hasPass ? 'input password, ' : ''}${!hasCheck ? 'checkbox ghi nhớ, ' : ''}${!hasBtn ? 'nút submit' : ''}`
      };
    }
  },
  {
    id: 3,
    title: 'Nhiệm vụ 3: Khảo sát ý kiến với thẻ textarea',
    description: 'Thiết kế phiếu khảo sát ý kiến học sinh về dịch vụ căng tin trường: đánh giá chất lượng (radio) và viết đoạn góp ý chi tiết trong khung văn bản nhiều dòng <textarea>.',
    requirements: [
      'Có nhóm nút radio để chọn mức độ hài lòng (Rất tốt, Bình thường, Kém)',
      'Có thẻ <textarea> với thuộc tính rows và cols để nhập văn bản nhiều dòng',
      'Có nút gửi biểu mẫu'
    ],
    targetResult: {
      title: 'Khảo sát ý kiến học sinh với textarea',
      description: 'Học sinh có thể gõ đoạn văn bản dài tùy ý vào khung textarea.',
      html: `<!DOCTYPE html>
<html>
<head><title>Khảo sát căng tin</title></head>
<body>
  <h2>PHIẾU KHẢO SÁT CHẤT LƯỢNG CĂNG TIN</h2>
  <form action="#" method="post">
    <p>Chất lượng phục vụ: <br>
      <input type="radio" name="danhgia" value="tot"> Tốt
      <input type="radio" name="danhgia" value="tb"> Trung bình
      <input type="radio" name="danhgia" value="kem"> Cần cải thiện
    </p>
    <p>Đóng góp ý kiến chi tiết của em: <br>
      <textarea name="gopy" rows="4" cols="40" placeholder="Nhập ý kiến tại đây..."></textarea>
    </p>
    <input type="submit" value="Gửi khảo sát">
  </form>
</body>
</html>`
    },
    hint: 'Thẻ <textarea> có cặp thẻ mở và đóng, hỗ trợ thuộc tính rows (số dòng) và cols (số cột chữ).',
    checkCriteria: (doc) => {
      const hasRadio = doc.querySelectorAll('input[type="radio"]').length >= 2;
      const hasTextarea = !!doc.querySelector('textarea');
      const hasSubmit = !!doc.querySelector('input[type="submit"], button');
      const passed = hasRadio && hasTextarea && hasSubmit;
      return {
        passed,
        message: passed
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 3: Đã sử dụng thành công thẻ textarea và radio khảo sát!'
          : 'Cần có các nút radio đánh giá và thẻ <textarea> nhập ý kiến.'
      };
    }
  },
  {
    id: 4,
    title: 'Nhiệm vụ 4: Form Đặt áo đồng phục với số lượng & dropdown',
    description: 'Tạo form đặt mua áo đồng phục lớp 12: chọn kích cỡ size áo bằng select dropdown, nhập số lượng bằng input type="number" và nút xác nhận.',
    requirements: [
      'Có ô nhập họ tên học sinh',
      'Có thẻ <select> chứa các kích cỡ áo: Size S, Size M, Size L, Size XL',
      'Có ô nhập số lượng áo bằng input type="number" có giá trị min="1"',
      'Có nút submit đặt áo'
    ],
    targetResult: {
      title: 'Đặt may áo đồng phục lớp 12',
      description: 'Menu chọn size áo gọn gàng kèm ô đếm số lượng áo tiện lợi.',
      html: `<!DOCTYPE html>
<html>
<head><title>Đặt áo đồng phục</title></head>
<body>
  <h2>ĐĂNG KÝ ÁO ĐỒNG PHỤC KỶ YẾU 12</h2>
  <form action="#" method="post">
    <p>Họ tên: <input type="text" name="ten"></p>
    <p>Kích cỡ áo: 
      <select name="size">
        <option>Size S</option>
        <option>Size M</option>
        <option>Size L</option>
        <option>Size XL</option>
      </select>
    </p>
    <p>Số lượng đặt: <input type="number" name="soluong" value="1" min="1" max="5"></p>
    <input type="submit" value="Xác nhận đặt áo">
  </form>
</body>
</html>`
    },
    hint: 'type="number" cho phép người dùng bấm nút tăng giảm số lượng hoặc nhập số.',
    checkCriteria: (doc) => {
      const hasSelect = doc.querySelectorAll('select option').length >= 3;
      const hasNumber = !!doc.querySelector('input[type="number"]');
      const passed = hasSelect && hasNumber;
      return {
        passed,
        message: passed
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 4: Form đặt áo với select size và input number chuẩn xác!'
          : 'Cần có menu <select> ít nhất 3 kích cỡ và ô input type="number".'
      };
    }
  },
  {
    id: 5,
    title: 'Nhiệm vụ 5: Biểu mẫu Nộp bài và Góp ý có nút Reset',
    description: 'Thử thách tổng hợp: Thiết lập biểu mẫu liên hệ Ban Giám hiệu gồm: Họ tên, Email, Chủ đề góp ý (<select>), Nội dung (<textarea>), nút Gửi dữ liệu (submit) và nút Xóa làm lại toàn bộ (input type="reset").',
    requirements: [
      'Có trường nhập Họ tên và Email',
      'Có hộp lựa chọn chủ đề <select> (Học tập, Cơ sở vật chất, Khác)',
      'Có khung <textarea> nhập nội dung đóng góp',
      'Có nút submit gửi thông tin',
      'Có nút reset (input type="reset" hoặc button type="reset") để làm mới dữ liệu form'
    ],
    targetResult: {
      title: 'Hòm thư góp ý có nút Reset',
      description: 'Biểu mẫu đầy đủ nút gửi và nút reset xóa trắng dữ liệu để nhập lại.',
      html: `<!DOCTYPE html>
<html>
<head><title>Hòm thư góp ý</title></head>
<body>
  <h2>HÒM THƯ ĐÓNG GÓP Ý KIẾN</h2>
  <form action="#" method="post">
    <p>Họ và tên: <br><input type="text" name="hoten"></p>
    <p>Chủ đề phản ánh: <br>
      <select name="chude">
        <option>Cơ sở vật chất phòng máy tính</option>
        <option>Thời khóa biểu và lịch học</option>
        <option>Hoạt động câu lạc bộ</option>
      </select>
    </p>
    <p>Nội dung chi tiết: <br><textarea name="noidung" rows="4" cols="35"></textarea></p>
    <input type="submit" value="Gửi thư">
    <input type="reset" value="Nhập lại">
  </form>
</body>
</html>`
    },
    hint: 'Thuộc tính type="reset" trên thẻ input giúp người dùng xóa toàn bộ dữ liệu vừa nhập về trạng thái ban đầu.',
    checkCriteria: (doc) => {
      const hasSelect = !!doc.querySelector('select');
      const hasTextarea = !!doc.querySelector('textarea');
      const hasSubmit = !!doc.querySelector('input[type="submit"], button[type="submit"]');
      const hasReset = !!doc.querySelector('input[type="reset"], button[type="reset"]');
      const passed = hasSelect && hasTextarea && hasSubmit && hasReset;
      return {
        passed,
        message: passed
          ? 'Xuất sắc! Đã hoàn thành Nhiệm vụ 5: Biểu mẫu chuyên nghiệp có đầy đủ cả nút submit và nút reset.'
          : `Còn thiếu: ${!hasSelect ? '<select>, ' : ''}${!hasTextarea ? '<textarea>, ' : ''}${!hasSubmit ? 'nút submit, ' : ''}${!hasReset ? 'nút reset' : ''}`
      };
    }
  }
];
