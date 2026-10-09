import { LessonMission } from '../../types';

export const LESSON_13_MISSIONS: LessonMission[] = [
  {
    id: 1,
    title: 'Nhiệm vụ 1: Nhúng CSS vào trang web (thẻ link/style)',
    description: 'Tạo liên kết tệp CSS bên ngoài với thẻ <link rel="stylesheet" href="style.css"> bên trong thẻ <head> hoặc sử dụng thẻ <style> định kiểu màu chữ cho thẻ <h1>.',
    requirements: [
      'Có thẻ <link rel="stylesheet" href="style.css"> trong phần <head>',
      'Trong tệp style.css có ít nhất một quy tắc CSS định dạng thẻ <h1>',
      'Tiêu đề h1 đổi sang màu xanh hoặc màu sắc tùy chọn'
    ],
    targetResult: {
      title: 'Nhúng tệp CSS vào HTML',
      description: 'Tiêu đề h1 tự động nhận kiểu dáng màu sắc từ tệp style.css.',
      html: `<!DOCTYPE html>
<html>
<head>
  <title>Bài 13 - CSS</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>TIN HỌC 12 VÀ KỶ NGUYÊN CSS</h1>
  <p>Trang web này đã được liên kết thành công với tệp style.css.</p>
</body>
</html>`,
      css: `h1 {
  color: #1e40af;
  border-bottom: 2px solid #3b82f6;
  padding-bottom: 6px;
}`
    },
    hint: 'Đặt <link rel="stylesheet" href="style.css"> vào giữa thẻ <head> và </head>.',
    checkCriteria: (doc, _html, css = '') => {
      const hasLink = !!doc.querySelector('link[rel*="stylesheet"]') || !!doc.querySelector('style');
      const hasCssRule = /(h1|body)\s*\{[^}]*color:/i.test(css);
      const passed = hasLink && (hasCssRule || css.length > 5);
      return {
        passed,
        message: passed
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 1: Đã liên kết thành công tệp CSS với HTML!'
          : 'Cần có thẻ <link rel="stylesheet" href="style.css"> và quy tắc CSS trong style.css.'
      };
    }
  },
  {
    id: 2,
    title: 'Nhiệm vụ 2: Bộ chọn phần tử (Element Selector)',
    description: 'Viết quy tắc CSS sử dụng bộ chọn phần tử (Element Selector) để định dạng đồng bộ màu sắc và cỡ chữ cho tất cả các đoạn văn <p>.',
    requirements: [
      'HTML chứa ít nhất 2 đoạn văn <p>',
      'Trong CSS có quy tắc p { ... } định nghĩa color và font-size',
      'Cả 2 đoạn văn tự động nhận cùng một kiểu dáng hiển thị'
    ],
    targetResult: {
      title: 'Định dạng đồng loạt thẻ p',
      description: 'Mọi đoạn văn trên trang đều tuân theo một quy chuẩn phông chữ duy nhất.',
      html: `<!DOCTYPE html>
<html>
<head>
  <title>Element Selector</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h2>LỢI ÍCH CỦA BỘ CHỌN PHẦN TỬ</h2>
  <p>Đoạn văn thứ nhất được định dạng tự động qua tên thẻ.</p>
  <p>Đoạn văn thứ hai cũng nhận cùng một màu chữ và cỡ chữ tương tự.</p>
</body>
</html>`,
      css: `p {
  color: #334155;
  font-size: 15px;
  line-height: 1.6;
}`
    },
    hint: 'Cú pháp: p { color: #334155; font-size: 15px; } tác động lên tất cả thẻ p.',
    checkCriteria: (doc, _html, css = '') => {
      const pCount = doc.querySelectorAll('p').length;
      const hasPRule = /(^|\s|})p\s*\{/i.test(css);
      const passed = pCount >= 2 && hasPRule;
      return {
        passed,
        message: passed
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 2: Bộ chọn phần tử p hoạt động đồng bộ chính xác!'
          : 'Cần có ít nhất 2 thẻ <p> trong HTML và quy tắc p { ... } trong CSS.'
      };
    }
  },
  {
    id: 3,
    title: 'Nhiệm vụ 3: Bộ chọn lớp (.class) tái sử dụng',
    description: 'Tạo class trong HTML (ví dụ: class="thong-bao" hoặc class="noi-bat") và định nghĩa quy tắc CSS .ten-lop { ... } với màu nền và đường viền.',
    requirements: [
      'Trong HTML có ít nhất 2 phần tử cùng mang thuộc tính class giống nhau',
      'Trong CSS có quy tắc bắt đầu bằng dấu chấm: .ten-lop { ... }',
      'Quy tắc có thuộc tính background-color hoặc border'
    ],
    targetResult: {
      title: 'Tái sử dụng kiểu dáng với Class',
      description: 'Nhiều khối nội dung khác nhau cùng mang chung một phong cách trang trí nhờ class.',
      html: `<!DOCTYPE html>
<html>
<head>
  <title>Class Selector</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h2>DANH SÁCH THÔNG BÁO</h2>
  <div class="hop-tin">Thông báo 1: Lịch tập văn nghệ 26/3.</div>
  <p class="hop-tin">Thông báo 2: Nộp bài tập thực hành tuần này.</p>
</body>
</html>`,
      css: `.hop-tin {
  background-color: #dbeafe;
  color: #1e40af;
  border-left: 4px solid #2563eb;
  padding: 10px;
  margin-bottom: 10px;
}`
    },
    hint: 'Class trong HTML viết: class="ten-lop". Trong CSS viết: .ten-lop { ... }.',
    checkCriteria: (doc, _html, css = '') => {
      const hasClassHtml = doc.querySelectorAll('[class]').length >= 2;
      const hasClassCss = /\.[a-z0-9_-]+\s*\{/i.test(css);
      const passed = hasClassHtml && hasClassCss;
      return {
        passed,
        message: passed
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 3: Đã áp dụng thành công bộ chọn lớp .class!'
          : 'Cần gán class cho ít nhất 2 phần tử HTML và viết quy tắc .class { ... } trong CSS.'
      };
    }
  },
  {
    id: 4,
    title: 'Nhiệm vụ 4: Bộ chọn định danh (#id) vùng duy nhất',
    description: 'Tạo một khối định danh duy nhất trong HTML (ví dụ: id="banner" hoặc id="footer") và định nghĩa quy tắc CSS #ten-id { ... } với màu nền nổi bật.',
    requirements: [
      'Trong HTML có phần tử mang thuộc tính id duy nhất (ví dụ: id="banner")',
      'Trong CSS có quy tắc bắt đầu bằng dấu thăng: #banner { ... }',
      'Định kiểu màu chữ, màu nền hoặc căn giữa cho khối id'
    ],
    targetResult: {
      title: 'Khung banner định danh bằng ID',
      description: 'Vùng banner chính được định kiểu độc nhất vô nhị trên trang web.',
      html: `<!DOCTYPE html>
<html>
<head>
  <title>ID Selector</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="banner-chinh">
    <h1>CHÀO MỪNG NĂM HỌC 2025 - 2026</h1>
    <p>Khối 12 Quyết Thắng - Trường THPT Chuyên</p>
  </div>
</body>
</html>`,
      css: `#banner-chinh {
  background-color: #1e40af;
  color: #ffffff;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
}`
    },
    hint: 'ID trong HTML viết: id="ten_id". Trong CSS viết: #ten_id { ... }.',
    checkCriteria: (doc, _html, css = '') => {
      const hasIdHtml = doc.querySelectorAll('[id]').length >= 1;
      const hasIdCss = /#[a-z0-9_-]+\s*\{/i.test(css);
      const passed = hasIdHtml && hasIdCss;
      return {
        passed,
        message: passed
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 4: Bộ chọn ID #id được áp dụng chính xác!'
          : 'Cần có phần tử có id trong HTML và quy tắc #id { ... } tương ứng trong CSS.'
      };
    }
  },
  {
    id: 5,
    title: 'Nhiệm vụ 5: Kết hợp Element, Class và ID hoàn chỉnh',
    description: 'Thử thách tổng hợp: Thiết kế giao diện bài viết gồm #header (dùng ID), các thẻ p (dùng Element selector) và các nhãn .badge (dùng Class selector) phối hợp hài hòa.',
    requirements: [
      'Có quy tắc bộ chọn phần tử (ví dụ: h1, p hoặc body)',
      'Có quy tắc bộ chọn định danh (#id)',
      'Có quy tắc bộ chọn lớp (.class)',
      'Giao diện bài viết hiển thị đẹp mắt, phân cấp rõ rệt'
    ],
    targetResult: {
      title: 'Trang kết hợp cả 3 bộ chọn CSS',
      description: 'Bố cục trang hoàn chỉnh kết hợp sức mạnh của Element, Class và ID.',
      html: `<!DOCTYPE html>
<html>
<head>
  <title>Kết hợp bộ chọn CSS</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header id="tieu-de-trang">
    <h1>BẢN TIN CÔNG NGHỆ 12</h1>
  </header>
  <article>
    <p>Khoa học máy tính mở ra cánh cửa nghề nghiệp tương lai.</p>
    <span class="nhan-tin">NỔI BẬT</span>
  </article>
</body>
</html>`,
      css: `#tieu-de-trang {
  background-color: #0f172a;
  color: white;
  padding: 16px;
  text-align: center;
}

p {
  color: #334155;
  font-size: 15px;
}

.nhan-tin {
  background-color: #ef4444;
  color: white;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: bold;
}`
    },
    hint: 'Sử dụng p { ... } cho văn bản chung, #id { ... } cho khu vực duy nhất và .class { ... } cho các nút/nhãn.',
    checkCriteria: (doc, _html, css = '') => {
      const hasElement = /(^|\s|})(h1|p|body|header|article)\s*\{/i.test(css);
      const hasId = /#[a-z0-9_-]+\s*\{/i.test(css);
      const hasClass = /\.[a-z0-9_-]+\s*\{/i.test(css);
      const passed = hasElement && hasId && hasClass;
      return {
        passed,
        message: passed
          ? 'Xuất sắc! Đã hoàn thành Nhiệm vụ 5: Phối hợp nhuần nhuyễn cả 3 loại bộ chọn Element, Class và ID!'
          : `Cần có đủ 3 loại bộ chọn trong CSS: Element (${hasElement ? '✓' : 'thiếu'}), ID (${hasId ? '✓' : 'thiếu'}), Class (${hasClass ? '✓' : 'thiếu'}).`
      };
    }
  }
];
