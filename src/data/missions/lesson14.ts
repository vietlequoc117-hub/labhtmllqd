import { LessonMission } from '../../types';

export const LESSON_14_MISSIONS: LessonMission[] = [
  {
    id: 1,
    title: 'Nhiệm vụ 1: Khổ thơ Đất Nước nghệ thuật (Hình 14.3 SGK)',
    description: 'Trình bày khổ thơ Đất Nước như Hình 14.3 SGK Tin học 12: sử dụng font-family có chân (serif), font-style: italic, khoảng cách dòng line-height thoáng đãng và căn giữa text-align: center.',
    requirements: [
      'Áp dụng font-family: serif hoặc Times New Roman',
      'Định dạng chữ in nghiêng với font-style: italic',
      'Khoảng cách dòng line-height từ 1.8 đến 2.0',
      'Căn giữa bài thơ với text-align: center'
    ],
    targetResult: {
      title: 'Khổ thơ Đất Nước chuẩn SGK 12',
      description: 'Bài thơ được căn giữa trang trọng, chữ in nghiêng bay bổng.',
      html: `<!DOCTYPE html>
<html>
<head>
  <title>Khổ thơ nghệ thuật</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="khung-tho">
    <h2 class="tua-de">ĐẤT NƯỚC</h2>
    <p class="tac-gia">Nguyễn Khoa Điềm</p>
    <div class="loi-tho">
      "Khi ta lớn lên Đất Nước đã có rồi<br>
      Đất Nước có trong những cái 'ngày xửa ngày xưa...' mẹ thường hay kể<br>
      Đất Nước bắt đầu với miếng trầu bây giờ bà ăn<br>
      Đất Nước lớn lên khi dân mình biết trồng tre mà đánh giặc..."
    </div>
  </div>
</body>
</html>`,
      css: `.khung-tho {
  text-align: center;
  max-width: 480px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fffbeb;
  border-radius: 10px;
}

.tua-de {
  font-family: serif;
  color: #92400e;
  letter-spacing: 2px;
}

.loi-tho {
  font-family: 'Times New Roman', serif;
  font-style: italic;
  line-height: 2.0;
  color: #451a03;
}`
    },
    hint: 'Kết hợp font-family, font-style: italic, line-height: 2 và text-align: center.',
    checkCriteria: (_doc, _html, css = '') => {
      const lower = css.toLowerCase();
      const hasFont = lower.includes('font-family:');
      const hasItalic = lower.includes('italic');
      const hasLineHeight = lower.includes('line-height:');
      const hasCenter = lower.includes('text-align: center') || lower.includes('text-align:center');
      const passed = hasFont && hasItalic && hasLineHeight && hasCenter;
      return {
        passed,
        message: passed
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 1: Khổ thơ được trình bày nghệ thuật đúng chuẩn SGK 12!'
          : `Còn thiếu: ${!hasFont ? 'font-family, ' : ''}${!hasItalic ? 'font-style: italic, ' : ''}${!hasLineHeight ? 'line-height, ' : ''}${!hasCenter ? 'text-align: center' : ''}`
      };
    }
  },
  {
    id: 2,
    title: 'Nhiệm vụ 2: Căn lề đều 2 bên (text-align: justify)',
    description: 'Thiết kế đoạn văn nghị luận xã hội chuẩn quy cách sách báo: căn đều 2 bên với text-align: justify và thụt đầu dòng 30px với text-indent.',
    requirements: [
      'Định dạng đoạn văn căn đều 2 bên với text-align: justify',
      'Thụt đầu dòng dòng đầu tiên với thuộc tính text-indent: 30px (hoặc tương đương)',
      'Khoảng cách dòng line-height từ 1.6 đến 1.8 dễ đọc'
    ],
    targetResult: {
      title: 'Đoạn văn nghị luận căn đều 2 bên',
      description: 'Hai bên lề thẳng tắp như sách in và thụt đầu dòng chuẩn mực.',
      html: `<!DOCTYPE html>
<html>
<head>
  <title>Văn bản chuẩn quy cách</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h2>NGHỊ LUẬN VỀ KHÁT VỌNG TUỔI TRẺ</h2>
  <p class="doan-nghi-luan">
    Tuổi trẻ là mùa xuân của cuộc đời, là giai đoạn đẹp đẽ nhất để mỗi con người nuôi dưỡng ước mơ và biến hoài bão thành hiện thực. Đứng trước kỳ thi tốt nghiệp THPT, tinh thần tự học và ý chí kiên định chính là hành trang vững chắc nhất giúp học sinh bước vào giảng đường tương lai.
  </p>
</body>
</html>`,
      css: `.doan-nghi-luan {
  text-align: justify;
  text-indent: 35px;
  line-height: 1.8;
  font-size: 15px;
  color: #1e293b;
}`
    },
    hint: 'text-align: justify giúp giãn từ cho thẳng 2 bên lề; text-indent thụt lề dòng đầu tiên.',
    checkCriteria: (_doc, _html, css = '') => {
      const lower = css.toLowerCase();
      const hasJustify = lower.includes('justify');
      const hasIndent = lower.includes('text-indent:');
      const passed = hasJustify && hasIndent;
      return {
        passed,
        message: passed
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 2: Đoạn văn được căn đều 2 bên và thụt đầu dòng chuẩn mực!'
          : `Còn thiếu: ${!hasJustify ? 'text-align: justify, ' : ''}${!hasIndent ? 'text-indent' : ''}`
      };
    }
  },
  {
    id: 3,
    title: 'Nhiệm vụ 3: Chữ in hoa tự động (text-transform)',
    description: 'Ứng dụng thuộc tính text-transform: uppercase để tự động chuyển tiêu đề thành chữ in hoa và letter-spacing tạo độ giãn cách chữ sang trọng.',
    requirements: [
      'HTML nhập văn bản chữ thường bình thường',
      'CSS sử dụng text-transform: uppercase để biến thành chữ in hoa',
      'Có thuộc tính letter-spacing từ 2px đến 4px tạo khoảng cách các chữ cái'
    ],
    targetResult: {
      title: 'Tiêu đề in hoa tự động giãn chữ',
      description: 'Chữ cái tự động viết hoa toàn bộ và có độ giãn cách ký tự đẹp mắt.',
      html: `<!DOCTYPE html>
<html>
<head>
  <title>Biến đổi chữ hoa</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1 class="tieu-de-in-hoa">bản tin công nghệ thông tin 12</h1>
  <p>Văn bản gốc gõ chữ thường nhưng hiển thị in hoa hoàn toàn nhờ CSS.</p>
</body>
</html>`,
      css: `.tieu-de-in-hoa {
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #1e40af;
  font-family: Arial, sans-serif;
}`
    },
    hint: 'text-transform: uppercase biến đổi chữ hoa mà không cần người dùng phải bấm Caps Lock.',
    checkCriteria: (_doc, _html, css = '') => {
      const lower = css.toLowerCase();
      const hasUppercase = lower.includes('uppercase');
      const hasSpacing = lower.includes('letter-spacing:');
      const passed = hasUppercase && hasSpacing;
      return {
        passed,
        message: passed
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 3: Tiêu đề in hoa tự động và giãn chữ thành công!'
          : `Còn thiếu: ${!hasUppercase ? 'text-transform: uppercase, ' : ''}${!hasSpacing ? 'letter-spacing' : ''}`
      };
    }
  },
  {
    id: 4,
    title: 'Nhiệm vụ 4: Trang trí chữ & Xóa gạch chân liên kết',
    description: 'Sử dụng text-decoration để tạo đường gạch ngang line-through cho giá cũ và xóa gạch chân mặc định của thẻ liên kết <a> bằng text-decoration: none.',
    requirements: [
      'Có thẻ chứa giá cũ được gạch ngang bằng text-decoration: line-through',
      'Thẻ liên kết <a> được gỡ bỏ đường gạch chân bằng text-decoration: none',
      'Nút liên kết có màu sắc và in đậm nổi bật'
    ],
    targetResult: {
      title: 'Trang trí chữ và nút liên kết hiện đại',
      description: 'Giá cũ gạch ngang thân chữ, thẻ liên kết sạch sẽ không có gạch chân rườm rà.',
      html: `<!DOCTYPE html>
<html>
<head>
  <title>Trang trí chữ</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h2>KHÓA HỌC THIẾT KẾ WEB 12</h2>
  <p>Học phí cũ: <span class="gia-cu">450.000 VNĐ</span></p>
  <p>Học phí mới: <b>299.000 VNĐ</b></p>
  <a href="#" class="nut-dang-ky">ĐĂNG KÝ HỌC NGAY</a>
</body>
</html>`,
      css: `.gia-cu {
  text-decoration: line-through;
  color: #94a3b8;
}

.nut-dang-ky {
  text-decoration: none;
  background-color: #2563eb;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: bold;
  display: inline-block;
}`
    },
    hint: 'text-decoration: line-through (gạch ngang); text-decoration: none (bỏ gạch chân).',
    checkCriteria: (_doc, _html, css = '') => {
      const lower = css.toLowerCase();
      const hasLineThrough = lower.includes('line-through');
      const hasNone = lower.includes('text-decoration: none') || lower.includes('text-decoration:none');
      const passed = hasLineThrough && hasNone;
      return {
        passed,
        message: passed
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 4: Đã trang trí text-decoration chuẩn xác!'
          : `Còn thiếu: ${!hasLineThrough ? 'line-through cho giá, ' : ''}${!hasNone ? 'text-decoration: none cho link' : ''}`
      };
    }
  },
  {
    id: 5,
    title: 'Nhiệm vụ 5: Thiết kế Typography Bìa sách Tin học 12',
    description: 'Thử thách tổng hợp: Thiết kế mô phỏng bìa sách Tin học 12 hoàn chỉnh với font-weight: 900 (siêu đậm), letter-spacing, text-transform: uppercase, text-align: center và hiệu ứng bóng chữ text-shadow.',
    requirements: [
      'Có tựa sách được in hoa toàn bộ và in đậm font-weight: 800 hoặc 900',
      'Có độ giãn cách chữ letter-spacing tạo ấn tượng thị giác',
      'Có thuộc tính đổ bóng chữ text-shadow (ví dụ: text-shadow: 2px 2px 4px ...)',
      'Toàn bộ khối bìa được căn giữa ngay ngắn'
    ],
    targetResult: {
      title: 'Bìa sách Tin học 12 Typography',
      description: 'Giao diện bìa sách đồ họa ấn tượng với chữ 3D siêu đậm.',
      html: `<!DOCTYPE html>
<html>
<head>
  <title>Bìa sách Tin học 12</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="khung-bia">
    <div class="bo-gddt">BỘ GIÁO DỤC VÀ ĐÀO TẠO</div>
    <h1 class="ten-sach">TIN HỌC</h1>
    <div class="so-12">12</div>
    <p class="bo-sach">KẾT NỐI TRI THỨC VỚI CUỘC SỐNG</p>
  </div>
</body>
</html>`,
      css: `.khung-bia {
  background-color: #1e3a8a;
  color: white;
  text-align: center;
  max-width: 320px;
  margin: 20px auto;
  padding: 30px 20px;
  border-radius: 12px;
}

.bo-gddt {
  font-size: 11px;
  letter-spacing: 2px;
  color: #93c5fd;
}

.ten-sach {
  font-size: 32px;
  font-weight: 900;
  letter-spacing: 4px;
  text-transform: uppercase;
  text-shadow: 2px 2px 5px rgba(0,0,0,0.4);
  margin: 10px 0 0 0;
}

.so-12 {
  font-size: 60px;
  font-weight: 900;
  color: #facc15;
  line-height: 1;
  margin: 10px 0;
}`
    },
    hint: 'Phối hợp font-weight: 900, text-transform: uppercase, letter-spacing và text-shadow.',
    checkCriteria: (_doc, _html, css = '') => {
      const lower = css.toLowerCase();
      const hasWeight = lower.includes('font-weight:') || lower.includes('bold');
      const hasUppercase = lower.includes('uppercase');
      const hasShadow = lower.includes('text-shadow:');
      const passed = hasWeight && hasUppercase && hasShadow;
      return {
        passed,
        message: passed
          ? 'Xuất sắc! Đã hoàn thành Nhiệm vụ 5: Thiết kế bìa sách Typography với chữ nổi 3D tuyệt đẹp!'
          : `Còn thiếu: ${!hasWeight ? 'font-weight đậm, ' : ''}${!hasUppercase ? 'chữ hoa uppercase, ' : ''}${!hasShadow ? 'đổ bóng text-shadow' : ''}`
      };
    }
  }
];
