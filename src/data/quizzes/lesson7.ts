import { QuizQuestion } from '../../types';

// BÀI 7: HTML VÀ CẤU TRÚC TRANG WEB
// 4 câu Biết (1-4), 3 câu Hiểu (5-7), 3 câu Vận dụng (8-10)
export const LESSON_7_QUIZ: QuizQuestion[] = [
  // --- MỨC BIẾT (4 CÂU) ---
  {
    id: 1,
    level: 'Biết',
    question: 'HTML là từ viết tắt của cụm từ tiếng Anh nào sau đây?',
    snippet: {
      css: `h1 { color: #2563eb; font-size: 20px; }\np { color: #475569; font-size: 14px; }`,
      html: `<!-- HTML: HyperText Markup Language -->\n<h1>Xin chào các bạn học sinh Lớp 12!</h1>\n<p>HTML là ngôn ngữ đánh dấu siêu văn bản định hình cấu trúc web.</p>`
    },
    options: [
      'HyperText Markup Language',
      'Hyperlinks and Text Markup Language',
      'Home Tool Markup Language',
      'HighText Machine Language'
    ],
    correctIndex: 0,
    explanation: 'HTML viết tắt của HyperText Markup Language (Ngôn ngữ đánh dấu siêu văn bản), dùng để xây dựng cấu trúc nội dung trang web.'
  },
  {
    id: 2,
    level: 'Biết',
    question: 'Khai báo nào sau đây đứng ở dòng đầu tiên của tệp để thông báo cho trình duyệt biết trang web tuân theo chuẩn HTML5?',
    snippet: {
      html: `<!DOCTYPE html>\n<html>\n  <head><title>Trang chủ</title></head>\n  <body>\n    <p>Xin chào!</p>\n  </body>\n</html>`,
      css: `/* Chưa áp dụng CSS */`
    },
    options: [
      '<!DOCTYPE html>',
      '<doctype html5>',
      '<html version="5">',
      '<?xml version="1.0"?>'
    ],
    correctIndex: 0,
    explanation: '<!DOCTYPE html> là khai báo chuẩn quốc tế của HTML5 giúp trình duyệt hiển thị trang theo chế độ chuẩn.'
  },
  {
    id: 3,
    level: 'Biết',
    question: 'Trong cây cấu trúc HTML, thẻ nào chứa toàn bộ các phần tử hiển thị trực tiếp cho người dùng nhìn thấy trên màn hình trình duyệt?',
    snippet: {
      css: `body { background-color: #f8fafc; padding: 12px; }\nh1 { color: #059669; }`,
      html: `<!DOCTYPE html>\n<html>\n  <head>\n    <!-- Thẻ head chứa thông tin ẩn với người xem -->\n    <title>Tiêu đề trong Head</title>\n  </head>\n  <body>\n    <!-- Thẻ body chứa toàn bộ nội dung hiển thị ra màn hình -->\n    <h1>Nội dung hiển thị trong &lt;body&gt;</h1>\n    <p>Người dùng nhìn thấy toàn bộ nội dung này trên trang web.</p>\n  </body>\n</html>`
    },
    options: [
      'Thẻ <head>',
      'Thẻ <body>',
      'Thẻ <title>',
      'Thẻ <meta>'
    ],
    correctIndex: 1,
    explanation: 'Thẻ <body> chứa nội dung hiển thị của trang web (văn bản, hình ảnh, bảng, v.v.). Thẻ <head> chỉ chứa siêu dữ liệu và tiêu đề tab.'
  },
  {
    id: 4,
    level: 'Biết',
    question: 'Thẻ HTML nào sau đây là thẻ đơn (rỗng - không có thẻ đóng tương ứng) dùng để ngắt dòng văn bản?',
    snippet: {
      html: `<p>\n  Trường THPT Lê Quý Đôn<br>\n  Thành phố Hồ Chí Minh\n</p>`
    },
    options: [
      '<p>',
      '<br>',
      '<hr>',
      '<div>'
    ],
    correctIndex: 1,
    explanation: '<br> (break) là thẻ đơn không có thẻ đóng, dùng để ngắt xuống dòng trong cùng một khối văn bản.'
  },

  // --- MỨC HIỂU (3 CÂU) ---
  {
    id: 5,
    level: 'Hiểu',
    question: 'Quan sát đoạn mã HTML và CSS bên dưới. Khi hiển thị trên trình duyệt, tiêu đề có kích thước chữ lớn nhất và quan trọng nhất là thẻ nào?',
    snippet: {
      css: `<style>\n  h1 { color: #2563eb; }\n  h2 { color: #475569; }\n  h3 { color: #059669; }\n</style>`,
      html: `<div>\n  <h1>Chủ đề 4: Ứng dụng tin học</h1>\n  <h2>Bài 7: HTML và Cấu trúc web</h2>\n  <h3>1. Khái niệm cơ bản</h3>\n</div>`
    },
    options: [
      'Thẻ <h1>',
      'Thẻ <h2>',
      'Thẻ <h3>',
      'Cả ba thẻ có cỡ chữ mặc định bằng nhau'
    ],
    correctIndex: 0,
    explanation: 'Các thẻ tiêu đề từ <h1> đến <h6> có cấp độ quan trọng và cỡ chữ mặc định giảm dần, trong đó <h1> là tiêu đề lớn nhất.'
  },
  {
    id: 6,
    level: 'Hiểu',
    question: 'Cho đoạn mã sau. Sự khác biệt chính về mặt hiển thị giữa thẻ <div> và thẻ <span> là gì?',
    snippet: {
      css: `<style>\n  .box { background: #e0f2fe; }\n  .highlight { color: red; }\n</style>`,
      html: `<div class="box">\n  Chào mừng bạn đến với \n  <span class="highlight">CLB Tin học</span>\n</div>`
    },
    options: [
      '<div> là phần tử khối (chiếm trọn chiều rộng dòng), còn <span> là phần tử nội tuyến (nằm cùng dòng)',
      '<div> chỉ chứa được hình ảnh, <span> chỉ chứa được chữ',
      '<div> luôn in hoa văn bản, <span> in thường',
      'Không có sự khác biệt nào giữa <div> và <span>'
    ],
    correctIndex: 0,
    explanation: '<div> là block element chiếm toàn bộ chiều ngang dòng mới, còn <span> là inline element chỉ bao bọc đoạn chữ ngắn trên cùng dòng.'
  },
  {
    id: 7,
    level: 'Hiểu',
    question: 'Quan sát đoạn mã sau, thẻ <hr> đóng vai trò gì trong giao diện trang web?',
    snippet: {
      css: `<style>\n  hr {\n    border: 1px solid #cbd5e1;\n  }\n</style>`,
      html: `<section>\n  <h1>Tin tức lớp học</h1>\n  <hr>\n  <p>Lớp sẽ kiểm tra thực hành HTML vào tuần tới.</p>\n</section>`
    },
    options: [
      'Tạo đường kẻ ngang phân tách các nội dung hoặc chủ đề',
      'Tạo liên kết chuyển trang',
      'In đậm đoạn văn bản phía dưới',
      'Tạo một bảng tính gồm 1 dòng'
    ],
    correctIndex: 0,
    explanation: '<hr> (horizontal rule) tạo ra một đường kẻ phân cách ngang trực quan giữa các phần nội dung.'
  },

  // --- MỨC VẬN DỤNG (3 CÂU) ---
  {
    id: 8,
    level: 'Vận dụng',
    question: 'Quan sát đoạn mã HTML và CSS bên dưới. Khi người dùng mở trang web trên trình duyệt, tiêu đề hiển thị trên thanh tab của cửa sổ trình duyệt là nội dung nào?',
    snippet: {
      css: `<style>\n  body { font-family: sans-serif; }\n  h1 { font-size: 20px; }\n</style>`,
      html: `<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="utf-8">\n    <title>Trang cá nhân - Nguyễn Văn A</title>\n  </head>\n  <body>\n    <h1>Chào mừng bạn đến với website của tôi</h1>\n  </body>\n</html>`
    },
    options: [
      'Trang cá nhân - Nguyễn Văn A',
      'Chào mừng bạn đến với website của tôi',
      '<!DOCTYPE html>',
      'Không có tiêu đề nào được hiển thị trên thanh tab'
    ],
    correctIndex: 0,
    explanation: 'Nội dung nằm trong thẻ <title> bên trong <head> là văn bản xuất hiện trên tab trình duyệt hoặc thanh tiêu đề cửa sổ.'
  },
  {
    id: 9,
    level: 'Vận dụng',
    question: 'Học sinh muốn tạo khung giới thiệu thông tin có đường viền nét chấm màu xanh lục và giới hạn chiều rộng 400px như đoạn mã sau. Hãy cho biết tổng chiều rộng chiếm dụng của phần tử .box theo chuẩn box-sizing: border-box?',
    snippet: {
      css: `<style>\n  .box {\n    padding: 7px;\n    border: 5px dotted lightgreen;\n    width: 400px;\n    box-sizing: border-box;\n  }\n</style>`,
      html: `<div class="box">\n  <label for="HoTen"> Họ và tên: </label>\n  <input type="text" id="HoTen" name="HoTen">\n</div>`
    },
    options: [
      'Đúng 400px (vì box-sizing: border-box đã tính gộp cả padding và border vào width)',
      '424px (400px width + 14px padding + 10px border)',
      '410px (400px width + 10px border)',
      '386px (400px width - 14px padding)'
    ],
    correctIndex: 0,
    explanation: 'Với box-sizing: border-box, width: 400px đã bao gồm cả padding (7px*2) và border (5px*2), do đó tổng chiều rộng của khối chính xác là 400px.'
  },
  {
    id: 10,
    level: 'Vận dụng',
    question: 'Đoạn mã sau đang bị lỗi không hiển thị đúng tiếng Việt có dấu trên một số trình duyệt. Cần bổ sung thẻ nào vào vị trí thích hợp trong <head> để khắc phục triệt để?',
    snippet: {
      css: `<style>\n  body { font-family: Arial; }\n</style>`,
      html: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Cộng hòa Xã hội Chủ nghĩa Việt Nam</title>\n  </head>\n  <body>\n    <p>Độc lập - Tự do - Hạnh phúc</p>\n  </body>\n</html>`
    },
    options: [
      'Thêm <meta charset="utf-8"> vào trong phần tử <head>',
      'Thêm <style font="vietnamese"> vào <body>',
      'Đổi <title> thành <meta title="tiếng Việt">',
      'Thêm thuộc tính lang="vi-auto" vào thẻ <p>'
    ],
    correctIndex: 0,
    explanation: 'Thẻ <meta charset="utf-8"> đặt trong <head> khai báo bảng mã ký tự Unicode UTF-8, đảm bảo hiển thị chuẩn xác tiếng Việt có dấu.'
  }
];
