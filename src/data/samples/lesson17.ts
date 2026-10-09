import { CodeSample } from '../../types';

export const LESSON_17_SAMPLES: CodeSample[] = [
  {
    id: 1,
    title: '1. Hiệu ứng rê chuột (:hover)',
    description: 'Thẻ giả :hover đổi màu nền, độ bóng và hiệu ứng biến đổi khi người dùng rê chuột.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Hiệu ứng hover</title>
</head>
<body>
  <h2>HIỆU ỨNG RÊ CHUỘT (:HOVER)</h2>
  <button class="nut-hover">Rê chuột vào tôi</button>
  <div class="the-hover">Khối thẻ thông tin tự nổi lên khi rê chuột.</div>
</body>
</html>`,
    css: `.nut-hover {
  background-color: #2563eb;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}

.nut-hover:hover {
  background-color: #1d4ed8;
  transform: translateY(-2px);
}

.the-hover {
  margin-top: 15px;
  padding: 16px;
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  transition: 0.3s;
}

.the-hover:hover {
  background: #eff6ff;
  border-color: #3b82f6;
  box-shadow: 0 8px 16px rgba(59, 130, 246, 0.15);
}`
  },
  {
    id: 2,
    title: '2. Trạng thái tiêu điểm (:focus)',
    description: 'Tùy biến đường viền phát sáng khi người dùng nhấp chuột vào ô nhập dữ liệu input.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Trạng thái focus</title>
</head>
<body>
  <h2>Ô NHẬP LIỆU CÓ HIỆU ỨNG FOCUS</h2>
  <p>Nhấp chuột vào ô dưới để xem hiệu ứng viền đổi màu:</p>
  <input type="text" class="o-nhap" placeholder="Nhập họ và tên...">
</body>
</html>`,
    css: `.o-nhap {
  width: 300px;
  padding: 10px 14px;
  border: 2px solid #cbd5e1;
  border-radius: 8px;
  outline: none;
  transition: 0.2s;
  font-size: 14px;
}

.o-nhap:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  background-color: #f0f9ff;
}`
  },
  {
    id: 3,
    title: '3. Bộ chọn con trực tiếp (Parent > Child)',
    description: 'Chỉ tác động lên thẻ li là con trực tiếp cấp 1 của ul.menu, không ảnh hưởng menu con lồng bên trong.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Bộ chọn con trực tiếp</title>
</head>
<body>
  <ul class="menu-chinh">
    <li>Mục cấp 1 (Màu xanh)</li>
    <li>Mục cấp 1 (Màu xanh)
      <ul>
        <li>Mục cấp 2 con lồng trong (Không bị đổi màu)</li>
      </ul>
    </li>
  </ul>
</body>
</html>`,
    css: `.menu-chinh > li {
  color: #1d4ed8;
  font-weight: bold;
  padding: 6px 0;
}`
  },
  {
    id: 4,
    title: '4. Bộ chọn phần tử đầu & cuối (:first-child, :last-child)',
    description: 'Định dạng đặc biệt cho hàng đầu tiên và gỡ bỏ đường kẻ gạch của hàng cuối cùng.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>First & Last child</title>
</head>
<body>
  <h2>DANH SÁCH BÀI HỌC</h2>
  <ul class="danh-sach">
    <li>Bài 1: Giới thiệu môn học</li>
    <li>Bài 2: Thực hành lập trình</li>
    <li>Bài 3: Bài tập tổng kết</li>
  </ul>
</body>
</html>`,
    css: `.danh-sach li {
  padding: 10px;
  border-bottom: 1px dashed #cbd5e1;
}

.danh-sach li:first-child {
  background-color: #dbeafe;
  font-weight: bold;
}

.danh-sach li:last-child {
  border-bottom: none;
  color: #9333ea;
}`
  },
  {
    id: 5,
    title: '5. Tô màu hàng xen kẽ (:nth-child(even/odd))',
    description: 'Kỹ thuật tô sọc ngựa vằn (zebra stripes) cho bảng dữ liệu dễ đọc.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Tô màu xen kẽ nth-child</title>
</head>
<body>
  <h2>BẢNG ĐIỂM SỌC XEN KẼ (ZEBRA STRIPES)</h2>
  <table class="bang-soc" style="width: 100%; border-collapse: collapse;">
    <tr><th>STT</th><th>Họ và tên</th><th>Điểm</th></tr>
    <tr><td>1</td><td>Nguyễn An</td><td>9.5</td></tr>
    <tr><td>2</td><td>Trần Bình</td><td>8.0</td></tr>
    <tr><td>3</td><td>Lê Cường</td><td>9.0</td></tr>
    <tr><td>4</td><td>Phạm Dung</td><td>8.5</td></tr>
  </table>
</body>
</html>`,
    css: `.bang-soc th {
  background-color: #1e3a8a;
  color: white;
  padding: 10px;
}

.bang-soc td {
  padding: 8px 10px;
  border: 1px solid #e2e8f0;
}

/* Các hàng chẵn nhận màu nền xám nhạt */
.bang-soc tr:nth-child(even) {
  background-color: #f1f5f9;
}`
  },
  {
    id: 6,
    title: '6. Bộ chọn thuộc tính [type="submit"]',
    description: 'Định kiểu riêng cho từng loại thẻ input dựa theo giá trị thuộc tính type.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Bộ chọn thuộc tính</title>
</head>
<body>
  <form>
    <input type="text" placeholder="Nhập văn bản..."><br><br>
    <input type="password" placeholder="Nhập mật khẩu..."><br><br>
    <input type="submit" value="Đăng ký ngay">
  </form>
</body>
</html>`,
    css: `input[type="text"], input[type="password"] {
  width: 250px;
  padding: 8px;
  border: 1px solid #94a3b8;
  border-radius: 4px;
}

input[type="submit"] {
  background-color: #16a34a;
  color: white;
  font-weight: bold;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}`
  },
  {
    id: 7,
    title: '7. Bộ chọn anh em liền kề (Adjacent Sibling +)',
    description: 'Định dạng cho phần tử nằm ngay phía sau một phần tử xác định (h2 + p).',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Anh em liền kề</title>
</head>
<body>
  <h2>TIÊU ĐỀ BÀI BÁO CHÍNH</h2>
  <p>Đoạn sapo mở đầu này nằm ngay sau h2 nên có chữ to và in đậm hơn.</p>
  <p>Đoạn văn tiếp theo trở về kích thước bình thường.</p>
</body>
</html>`,
    css: `h2 + p {
  font-size: 17px;
  font-weight: 600;
  color: #1e40af;
  border-left: 3px solid #3b82f6;
  padding-left: 10px;
}`
  },
  {
    id: 8,
    title: '8. Trạng thái vô hiệu hóa (:disabled)',
    description: 'Định dạng giao diện mờ nhạt cho nút bấm hoặc ô nhập liệu bị khóa.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Trạng thái disabled</title>
</head>
<body>
  <button class="nut-gui">Nút gửi bình thường</button>
  <button class="nut-gui" disabled>Nút đã bị vô hiệu hóa</button>
</body>
</html>`,
    css: `.nut-gui {
  padding: 10px 18px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.nut-gui:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
  opacity: 0.6;
}`
  },
  {
    id: 9,
    title: '9. Phần tử giả ::before và ::after',
    description: 'Tự động chèn biểu tượng gạch đầu dòng hoặc nhãn dán trang trí.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Phần tử giả ::before</title>
</head>
<body>
  <div class="chu-y">Đây là thông báo quan trọng cần đọc kỹ trước khi nộp bài!</div>
</body>
</html>`,
    css: `.chu-y {
  background: #fef3c7;
  color: #92400e;
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: 500;
}

.chu-y::before {
  content: '⚠️ LƯU Ý: ';
  font-weight: bold;
  color: #b45309;
}`
  },
  {
    id: 10,
    title: '10. Bộ chọn phủ định (:not())',
    description: 'Áp dụng định dạng cho tất cả các phần tử ngoại trừ phần tử có class đặc biệt.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Bộ chọn phủ định not</title>
</head>
<body>
  <div class="hop-item">Mục 1 (Nhận viền xám)</div>
  <div class="hop-item">Mục 2 (Nhận viền xám)</div>
  <div class="hop-item bo-qua">Mục 3 (Bị bỏ qua nhờ :not)</div>
</body>
</html>`,
    css: `.hop-item:not(.bo-qua) {
  border: 2px dashed #64748b;
  padding: 10px;
  margin-bottom: 8px;
  background-color: #f8fafc;
}

.bo-qua {
  padding: 10px;
  background-color: #fee2e2;
  color: #991b1b;
}`
  }
];
