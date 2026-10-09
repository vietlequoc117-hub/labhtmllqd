import { CodeSample } from '../../types';

export const LESSON_14_SAMPLES: CodeSample[] = [
  {
    id: 1,
    title: '1. Trình bày bài thơ nghệ thuật (Hình 14.3 SGK)',
    description: 'Áp dụng font-family, font-size, font-style: italic, line-height và text-align: center.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Khổ thơ nghệ thuật</title>
</head>
<body>
  <div class="khung-tho">
    <h2 class="tua-de">ĐẤT NƯỚC</h2>
    <p class="tac-gia">Nguyễn Khoa Điềm</p>
    <div class="noi-dung-tho">
      "Khi ta lớn lên Đất Nước đã có rồi<br>
      Đất Nước có trong những cái 'ngày xửa ngày xưa...'<br>
      mẹ thường hay kể<br>
      Đất Nước bắt đầu với miếng trầu bây giờ bà ăn<br>
      Đất Nước lớn lên khi dân mình biết trồng tre mà đánh giặc..."
    </div>
  </div>
</body>
</html>`,
    css: `.khung-tho {
  max-width: 480px;
  margin: 15px auto;
  padding: 24px;
  background-color: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 12px;
  text-align: center;
}

.tua-de {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 24px;
  letter-spacing: 3px;
  color: #92400e;
  margin-bottom: 4px;
}

.tac-gia {
  font-size: 13px;
  color: #b45309;
  font-style: italic;
  margin-bottom: 16px;
}

.noi-dung-tho {
  font-family: 'Times New Roman', serif;
  font-size: 17px;
  font-style: italic;
  line-height: 2.0;
  color: #451a03;
}`
  },
  {
    id: 2,
    title: '2. 4 kiểu căn lề văn bản (text-align)',
    description: 'So sánh trực quan: text-align: left, right, center và justify (căn đều 2 bên).',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Căn lề văn bản</title>
</head>
<body>
  <h2>CÁC KIỂU CĂN LỀ TRONG CSS</h2>
  <p class="can-trai"><b>1. Căn trái (Left):</b> Đoạn văn bản gióng thẳng hàng dọc theo cạnh lề bên trái (mặc định trong tiếng Việt).</p>
  <p class="can-phai"><b>2. Căn phải (Right):</b> Văn bản gióng thẳng hàng dọc theo cạnh lề bên phải.</p>
  <p class="can-giua"><b>3. Căn giữa (Center):</b> Từng dòng văn bản được đặt chính giữa khung chứa.</p>
  <p class="can-deu"><b>4. Căn đều 2 bên (Justify):</b> Trình duyệt tự động giãn khoảng cách các từ để hai bên lề đều thẳng tắp như sách báo in.</p>
</body>
</html>`,
    css: `.can-trai {
  text-align: left;
  background: #f1f5f9;
  padding: 8px;
}

.can-phai {
  text-align: right;
  background: #e2e8f0;
  padding: 8px;
}

.can-giua {
  text-align: center;
  background: #f1f5f9;
  padding: 8px;
}

.can-deu {
  text-align: justify;
  background: #e2e8f0;
  padding: 8px;
  line-height: 1.6;
}`
  },
  {
    id: 3,
    title: '3. Biến đổi chữ hoa/thường (text-transform)',
    description: 'Thử nghiệm uppercase (hoa), lowercase (thường), capitalize (hoa chữ cái đầu).',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Biến đổi chữ</title>
</head>
<body>
  <p class="in-hoa">đây là văn bản tự động chuyển thành chữ in hoa.</p>
  <p class="in-thuong">ĐÂY LÀ VĂN BẢN TỰ ĐỘNG CHUYỂN THÀNH CHỮ IN THƯỜNG.</p>
  <p class="viet-hoa-dau">cộng hòa xã hội chủ nghĩa việt nam</p>
</body>
</html>`,
    css: `.in-hoa {
  text-transform: uppercase;
  color: #1e40af;
  font-weight: bold;
}

.in-thuong {
  text-transform: lowercase;
  color: #047857;
}

.viet-hoa-dau {
  text-transform: capitalize;
  color: #b91c1c;
  font-weight: 600;
}`
  },
  {
    id: 4,
    title: '4. Trang trí đường kẻ gạch (text-decoration)',
    description: 'Đường gạch dưới underline, gạch ngang line-through và gạch trên overline.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Trang trí chữ</title>
</head>
<body>
  <h2>CÁC KIỂU TEXT-DECORATION</h2>
  <p class="gach-duoi">Đường kẻ gạch chân dưới chân chữ.</p>
  <p class="gach-ngang">Đường gạch ngang thân chữ (dùng cho giá cũ giảm giá).</p>
  <p class="gach-tren">Đường gạch nằm trên đỉnh đầu chữ.</p>
  <p><a href="#" class="bo-gach-chan">Thẻ liên kết đã bị xóa gạch chân (text-decoration: none)</a></p>
</body>
</html>`,
    css: `.gach-duoi {
  text-decoration: underline;
  text-decoration-color: #3b82f6;
}

.gach-ngang {
  text-decoration: line-through;
  color: #94a3b8;
}

.gach-tren {
  text-decoration: overline;
}

.bo-gach-chan {
  text-decoration: none;
  color: #2563eb;
  font-weight: bold;
}`
  },
  {
    id: 5,
    title: '5. Thụt đầu dòng chuẩn quy cách (text-indent)',
    description: 'Tự động thụt lề 30px cho chữ cái đầu tiên của mỗi đoạn văn bản nghị luận.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Thụt đầu dòng</title>
</head>
<body>
  <h2>BÀI VĂN NGHỊ LUẬN XÃ HỘI LỚP 12</h2>
  <p class="doan-van">
    Tuổi trẻ là mùa xuân của cuộc đời, là khoảng thời gian rực rỡ nhất để mỗi người nuôi dưỡng ước mơ và hoài bão lớn lao. Đứng trước ngưỡng cửa kỳ thi tốt nghiệp THPT, mỗi học sinh cần xác định rõ mục tiêu của chính mình.
  </p>
  <p class="doan-van">
    Sự kiên trì và kỷ luật bản thân chính là chìa khóa mở ra cánh cửa thành công. Không có con đường nào trải đầy hoa hồng mà không đòi hỏi sự nỗ lực vượt qua khó khăn, thử thách.
  </p>
</body>
</html>`,
    css: `.doan-van {
  font-family: 'Times New Roman', Times, serif;
  font-size: 16px;
  line-height: 1.8;
  text-align: justify;
  text-indent: 35px;
  color: #1e293b;
}`
  },
  {
    id: 6,
    title: '6. Giãn cách dòng và ký tự (line-height & letter-spacing)',
    description: 'Tạo cảm giác thoáng đãng sang trọng cho tiêu đề và nội dung bài viết.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Khoảng cách chữ và dòng</title>
</head>
<body>
  <h1 class="tieu-de-gian-cach">CÔNG NGHỆ TƯƠNG LAI</h1>
  <p class="noi-dung-thoang">
    Trí tuệ nhân tạo (AI) và điện toán đám mây đang định hình lại toàn bộ nền kinh tế số toàn cầu. Việc trang bị kiến thức lập trình cơ bản ngay từ bậc trung học phổ thông sẽ tạo tiền đề vững chắc cho tương lai nghề nghiệp của các bạn trẻ.
  </p>
</body>
</html>`,
    css: `.tieu-de-gian-cach {
  font-family: Arial, sans-serif;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #1e40af;
  border-bottom: 2px solid #3b82f6;
  padding-bottom: 8px;
}

.noi-dung-thoang {
  font-size: 15px;
  line-height: 2.2; /* Gấp 2.2 lần cỡ chữ */
  color: #334155;
}`
  },
  {
    id: 7,
    title: '7. Đổ bóng chữ nghệ thuật (text-shadow)',
    description: 'Tạo hiệu ứng chữ nổi 3D và chữ phát sáng neon rực rỡ.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Đổ bóng chữ</title>
</head>
<body>
  <div class="hop-bong">
    <h1 class="chu-noi-3d">TIN HỌC 12 CHUYÊN ĐỀ</h1>
    <h2 class="chu-phat-sang">HIỆU ỨNG CHỮ PHÁT SÁNG NEON</h2>
  </div>
</body>
</html>`,
    css: `.hop-bong {
  background-color: #0f172a;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
}

.chu-noi-3d {
  color: #ffffff;
  font-size: 28px;
  font-weight: 800;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
}

.chu-phat-sang {
  color: #38bdf8;
  font-size: 20px;
  text-shadow: 0 0 10px #38bdf8, 0 0 20px #0284c7;
}`
  },
  {
    id: 8,
    title: '8. Khối trích dẫn danh ngôn (Blockquote CSS)',
    description: 'Tạo khối trích dẫn có đường viền đứng bên trái và chữ in nghiêng thanh lịch.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Trích dẫn danh ngôn</title>
</head>
<body>
  <h2>LỜI NÓI CỦA CÁC VĨ NHÂN</h2>
  <blockquote class="trich-dan">
    "Đừng so sánh mình với bất kỳ ai trong thế giới này. Nếu bạn làm như vậy, bạn đang tự xúc phạm chính mình."
    <span class="tac-gia">- Bill Gates</span>
  </blockquote>
</body>
</html>`,
    css: `.trich-dan {
  margin: 20px 0;
  padding: 14px 20px;
  background-color: #f1f5f9;
  border-left: 5px solid #2563eb;
  font-family: Georgia, serif;
  font-size: 16px;
  font-style: italic;
  color: #1e293b;
  border-radius: 0 8px 8px 0;
}

.tac-gia {
  display: block;
  font-size: 13px;
  font-style: normal;
  font-weight: bold;
  color: #64748b;
  margin-top: 8px;
}`
  },
  {
    id: 9,
    title: '9. Huy hiệu và Nhãn dán văn bản (Badge)',
    description: 'Tạo các thẻ tag phân loại nhỏ nhắn, tinh tế cho bài viết.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Huy hiệu nhãn dán</title>
</head>
<body>
  <h2>CHUYÊN MỤC BÀI VIẾT</h2>
  <p>
    Trang web này thuộc thể loại: 
    <span class="tag tag-blue">#HTML5</span>
    <span class="tag tag-green">#CSS3</span>
    <span class="tag tag-amber">#TinHoc12</span>
  </p>
</body>
</html>`,
    css: `.tag {
  display: inline-block;
  padding: 3px 10px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 999px;
  margin-right: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tag-blue {
  background-color: #dbeafe;
  color: #1e40af;
}

.tag-green {
  background-color: #dcfce7;
  color: #15803d;
}

.tag-amber {
  background-color: #fef3c7;
  color: #b45309;
}`
  },
  {
    id: 10,
    title: '10. Bìa sách Tin học 12 Typography',
    description: 'Kết hợp font-weight cực đậm, letter-spacing và phân cấp cỡ chữ mô phỏng bìa sách.',
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Bìa sách Tin học 12</title>
</head>
<body>
  <div class="bia-sach">
    <div class="nha-xuat-ban">BỘ GIÁO DỤC VÀ ĐÀO TẠO</div>
    <h1 class="ten-sach">TIN HỌC</h1>
    <div class="so-lop">12</div>
    <div class="bo-sach">KẾT NỐI TRI THỨC VỚI CUỘC SỐNG</div>
  </div>
</body>
</html>`,
    css: `.bia-sach {
  background-color: #1e3a8a;
  color: white;
  padding: 30px 20px;
  text-align: center;
  max-width: 320px;
  margin: 0 auto;
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
}

.nha-xuat-ban {
  font-size: 11px;
  letter-spacing: 2px;
  color: #93c5fd;
  margin-bottom: 20px;
}

.ten-sach {
  font-size: 32px;
  font-weight: 900;
  letter-spacing: 4px;
  margin: 0;
}

.so-lop {
  font-size: 64px;
  font-weight: 900;
  color: #facc15;
  line-height: 1;
  margin: 10px 0;
}

.bo-sach {
  font-size: 12px;
  font-style: italic;
  color: #e0f2fe;
}`
  }
];
