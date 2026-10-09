import { CodeSample } from '../../types';

export const LESSON_16_SAMPLES: CodeSample[] = [
  {
    id: 1,
    title: '1. Khái niệm 4 lớp Box Model cơ bản',
    description: 'Trực quan hóa 4 lớp: Content (ruột), Padding (đệm), Border (viền), Margin (lề).',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Mô hình hộp Box Model</title>
</head>
<body>
  <h2>MINH HỌA 4 LỚP CỦA BOX MODEL</h2>
  <div class="hop-cha">
    <div class="hop-box-model">
      NỘI DUNG (CONTENT): Chiều rộng 260px, chiều cao 80px.
    </div>
  </div>
</body>
</html>`,
    css: `.hop-cha {
  background-color: #f1f5f9;
  padding: 20px;
  border: 1px dashed #94a3b8;
}

.hop-box-model {
  width: 260px;
  height: 80px;
  padding: 18px;          /* Vùng đệm trong */
  border: 4px solid #2563eb; /* Viền ngoài */
  margin: 15px auto;      /* Lề ngoài cách xa hộp cha */
  background-color: #dbeafe;
  color: #1e3a8a;
  font-weight: bold;
  text-align: center;
}`
  },
  {
    id: 2,
    title: '2. Căn giữa khối hộp với margin: 0 auto',
    description: 'Kỹ thuật kinh điển căn giữa khối nội dung có chiều rộng cố định.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Căn giữa margin auto</title>
</head>
<body>
  <div class="hop-can-giua">
    <h2>KHỐI NỘI DUNG ĐƯỢC CĂN GIỮA</h2>
    <p>Thuộc tính margin: 20px auto giúp trình duyệt tự động tính khoảng cách lề trái và phải bằng nhau.</p>
  </div>
</body>
</html>`,
    css: `.hop-can-giua {
  width: 420px;
  margin: 20px auto;
  padding: 24px;
  background-color: #ffffff;
  border: 2px solid #3b82f6;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
  text-align: center;
}`
  },
  {
    id: 3,
    title: '3. So sánh box-sizing: content-box vs border-box',
    description: 'Minh họa vì sao border-box giúp việc tính toán kích thước chiều rộng không bị tràn viền.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>box-sizing</title>
</head>
<body>
  <h2>SO SÁNH THUỘC TÍNH BOX-SIZING</h2>
  <div class="hop-content-box">
    1. content-box (width 250px + padding 20px + border 5px = tổng 300px!)
  </div>
  <div class="hop-border-box">
    2. border-box (width đúng 250px, padding và border nằm bên trong)
  </div>
</body>
</html>`,
    css: `.hop-content-box {
  box-sizing: content-box;
  width: 250px;
  padding: 20px;
  border: 5px solid #ef4444;
  background: #fee2e2;
  margin-bottom: 15px;
}

.hop-border-box {
  box-sizing: border-box;
  width: 250px;
  padding: 20px;
  border: 5px solid #16a34a;
  background: #dcfce7;
}`
  },
  {
    id: 4,
    title: '4. Tùy chỉnh Padding 4 hướng độc lập',
    description: 'Thử nghiệm padding-top, padding-right, padding-bottom, padding-left.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Padding 4 phía</title>
</head>
<body>
  <div class="hop-padding">
    <h3>ĐỆM LỆCH 4 HƯỚNG</h3>
    <p>Top: 30px, Right: 10px, Bottom: 10px, Left: 40px.</p>
  </div>
</body>
</html>`,
    css: `.hop-padding {
  padding-top: 30px;
  padding-right: 10px;
  padding-bottom: 10px;
  padding-left: 40px;
  background-color: #fef3c7;
  border-left: 6px solid #d97706;
  max-width: 400px;
}`
  },
  {
    id: 5,
    title: '5. Thẻ Giới thiệu Bản thân căn chuẩn lề',
    description: 'Thiết kế card cá nhân với padding và margin đối xứng hoàn hảo.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Card hồ sơ Box Model</title>
</head>
<body>
  <div class="card-ho-so">
    <div class="avatar-box">12A</div>
    <h3>TRẦN KHÁNH HUYỀN</h3>
    <p>Bí thư Chi đoàn 12A3</p>
  </div>
</body>
</html>`,
    css: `.card-ho-so {
  box-sizing: border-box;
  width: 280px;
  margin: 30px auto;
  padding: 25px 20px;
  text-align: center;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.avatar-box {
  width: 60px;
  height: 60px;
  margin: 0 auto 12px auto;
  background: #2563eb;
  color: white;
  font-weight: bold;
  line-height: 60px;
  border-radius: 50%;
}`
  },
  {
    id: 6,
    title: '6. Hiện tượng gộp lề ngoài (Margin Collapse)',
    description: 'Giải thích hiện tượng 2 lề dọc tiếp giáp nhau bị gộp lại thành lề lớn hơn.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Gộp lề Margin Collapse</title>
</head>
<body>
  <h2>HIỆN TƯỢNG GỘP LỀ DỌC (MARGIN COLLAPSE)</h2>
  <div class="hop-tren">Khối trên: margin-bottom: 30px;</div>
  <div class="hop-duoi">Khối dưới: margin-top: 20px;</div>
  <p><small>(Khoảng cách thực tế giữa 2 khối là 30px chứ không phải 50px!)</small></p>
</body>
</html>`,
    css: `.hop-tren {
  background: #dbeafe;
  padding: 12px;
  margin-bottom: 30px;
}

.hop-duoi {
  background: #fef08a;
  padding: 12px;
  margin-top: 20px;
}`
  },
  {
    id: 7,
    title: '7. Khung Giới hạn max-width co giãn linh hoạt',
    description: 'Khung co giãn tự nhiên trên màn hình hẹp và dừng lại ở max-width trên màn hình rộng.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Khung max-width</title>
</head>
<body>
  <div class="khung-chua">
    <h2>TIÊU ĐỀ NẰM TRONG KHUNG MAX-WIDTH</h2>
    <p>Khung này có max-width: 600px và width: 90%. Khi thu nhỏ cửa sổ trình duyệt, khung sẽ tự co lại mà không sinh thanh cuộn ngang.</p>
  </div>
</body>
</html>`,
    css: `.khung-chua {
  width: 90%;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f8fafc;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
}`
  },
  {
    id: 8,
    title: '8. Hộp Bài viết Tin tức với lề dưới cách đều',
    description: 'Danh sách các tin ngắn cách đều nhau bằng margin-bottom.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Khoảng cách bài viết</title>
</head>
<body>
  <h2>TIN TỨC HOẠT ĐỘNG</h2>
  <article class="bai-viet">
    <h4>Thông báo lịch thi thử Đợt 2</h4>
    <p>Kỳ thi thử sẽ diễn ra vào ngày thứ Bảy tuần sau tại các phòng học bộ môn.</p>
  </article>
  <article class="bai-viet">
    <h4>Phát động phong trào Tiếp sức mùa thi</h4>
    <p>Đoàn trường tuyển tình nguyện viên hỗ trợ thí sinh khối 12.</p>
  </article>
</body>
</html>`,
    css: `.bai-viet {
  padding: 16px;
  margin-bottom: 16px;
  background-color: #ffffff;
  border-left: 4px solid #3b82f6;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}`
  },
  {
    id: 9,
    title: '9. Nút bấm tương tác với kích thước tối thiểu',
    description: 'Áp dụng min-width và padding đồng đều cho nhóm nút thao tác.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Nhóm nút Box Model</title>
</head>
<body>
  <h2>CÁC NÚT THAO TÁC CÓ MIN-WIDTH</h2>
  <button class="nut-box">Lưu</button>
  <button class="nut-box">Gửi bài</button>
  <button class="nut-box nut-phu">Hủy</button>
</body>
</html>`,
    css: `.nut-box {
  min-width: 100px;
  padding: 10px 18px;
  margin-right: 10px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.nut-phu {
  background-color: #e2e8f0;
  color: #334155;
}`
  },
  {
    id: 10,
    title: '10. Bố cục 3 Cột Card đặt cạnh nhau',
    description: 'Tận dụng margin và width theo phần trăm để chia 3 khối cột song song.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>3 Khối song song</title>
</head>
<body>
  <h2>3 KHỐI DỊCH VỤ HỌC TẬP</h2>
  <div class="hang-cot">
    <div class="cot">
      <h4>Khối A</h4>
      <p>Toán, Lý, Hóa</p>
    </div>
    <div class="cot">
      <h4>Khối B</h4>
      <p>Toán, Hóa, Sinh</p>
    </div>
    <div class="cot">
      <h4>Khối D</h4>
      <p>Toán, Văn, Anh</p>
    </div>
  </div>
</body>
</html>`,
    css: `.hang-cot {
  display: flex;
  gap: 15px;
}

.cot {
  flex: 1;
  padding: 20px;
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  text-align: center;
}`
  }
];
