import { QuizQuestion } from '../../types';

// BÀI 13: KHÁI NIỆM, VAI TRÒ CỦA CSS
// 4 câu Biết (1-4), 3 câu Hiểu (5-7), 3 câu Vận dụng (8-10)
export const LESSON_13_QUIZ: QuizQuestion[] = [
  // --- MỨC BIẾT (4 CÂU) ---
  {
    id: 1,
    level: 'Biết',
    question: 'CSS là từ viết tắt của thuật ngữ tiếng Anh nào sau đây?',
    options: [
      'Cascading Style Sheets',
      'Creative Style Sheets',
      'Computer Style Sheets',
      'Colorful Style Sheets'
    ],
    correctIndex: 0,
    explanation: 'CSS viết tắt của Cascading Style Sheets (Bảng kiểu xếp tầng), dùng để định dạng và trình bày thẩm mỹ cho tài liệu HTML.'
  },
  {
    id: 2,
    level: 'Biết',
    question: 'Vai trò chính của CSS trong phát triển trang web là gì?',
    options: [
      'Định dạng giao diện, màu sắc, bố cục và kiểu dáng hiển thị cho các phần tử trang web',
      'Lưu trữ cơ sở dữ liệu trên máy chủ',
      'Tạo chức năng tính toán logic như ngôn ngữ C++',
      'Đăng ký tên miền cho trang web'
    ],
    correctIndex: 0,
    explanation: 'HTML đảm nhiệm cấu trúc khung sườn nội dung, trong khi CSS chịu trách nhiệm về hình thức, phong cách và bố cục trang web.'
  },
  {
    id: 3,
    level: 'Biết',
    question: 'Để liên kết một tệp CSS bên ngoài (External CSS, ví dụ style.css) vào trang HTML, ta đặt thẻ <link> ở đâu?',
    snippet: {
      html: `<head>\n  <link rel="stylesheet" href="style.css">\n</head>`
    },
    options: [
      'Bên trong phần tử <head>...</head>',
      'Cuối cùng của phần tử <body>',
      'Bên trong thẻ <footer>',
      'Bên ngoài cặp thẻ <html>'
    ],
    correctIndex: 0,
    explanation: 'Thẻ <link rel="stylesheet" href="..."> chuẩn luôn được đặt bên trong khối <head> của tài liệu HTML.'
  },
  {
    id: 4,
    level: 'Biết',
    question: 'Có bao nhiêu cách chính để đưa mã CSS vào một trang web HTML?',
    options: [
      '3 cách (Inline CSS, Internal CSS, External CSS)',
      '1 cách duy nhất',
      '2 cách',
      '5 cách'
    ],
    correctIndex: 0,
    explanation: 'Có 3 phương pháp cơ bản: CSS nội dòng (Inline), CSS nội bộ (Internal qua thẻ <style>), và CSS ngoài (External qua tệp .css).'
  },

  // --- MỨC HIỂU (3 CÂU) ---
  {
    id: 5,
    level: 'Hiểu',
    question: 'Quan sát cấu trúc cú pháp của một quy tắc CSS bên dưới. Thành phần nào là Selector (bộ chọn)?',
    snippet: {
      css: `h1 {\n  color: red;\n  font-size: 24px;\n}`
    },
    options: [
      'h1',
      'color',
      'red',
      'font-size'
    ],
    correctIndex: 0,
    explanation: 'h1 là Bộ chọn (Selector), color và font-size là Thuộc tính (Property), red và 24px là Giá trị (Value).'
  },
  {
    id: 6,
    level: 'Hiểu',
    question: 'Tại sao việc sử dụng tệp CSS ngoài (External CSS) được xem là phương pháp tối ưu và chuyên nghiệp nhất trong thiết kế web hiện đại?',
    options: [
      'Tách bạch rõ ràng nội dung (HTML) và giao diện (CSS), cho phép tái sử dụng cùng một phong cách cho hàng trăm trang web khác nhau và tận dụng bộ nhớ đệm (cache) của trình duyệt',
      'Vì tệp ngoài chạy nhanh gấp 10 lần thẻ <style>',
      'Vì chỉ có tệp ngoài mới hỗ trợ màu sắc',
      'Vì thẻ <style> sắp bị loại bỏ khỏi chuẩn web'
    ],
    correctIndex: 0,
    explanation: 'External CSS tách biệt nội dung và hình thức, dễ bảo trì, dễ sửa đổi hàng loạt và trình duyệt lưu đệm giúp tải nhanh hơn.'
  },
  {
    id: 7,
    level: 'Hiểu',
    question: 'Cho đoạn mã sau. Cú pháp viết ghi chú (comment) hợp lệ trong ngôn ngữ CSS là gì?',
    snippet: {
      css: `/* Đây là ghi chú thiết lập tiêu đề chính */\nh1 { color: #1e3a8a; }`
    },
    options: [
      '/* Nội dung ghi chú */',
      '<!-- Nội dung ghi chú -->',
      '// Nội dung ghi chú',
      '# Nội dung ghi chú'
    ],
    correctIndex: 0,
    explanation: 'Ghi chú trong CSS luôn được kẹp giữa /* và */. Cú pháp <!-- ... --> là của HTML.'
  },

  // --- MỨC VẬN DỤNG (3 CÂU) ---
  {
    id: 8,
    level: 'Vận dụng',
    question: 'Một học sinh muốn định dạng màu chữ xanh dương (#2563eb) cho tiêu đề h1 bằng cả 3 cách: Inline, Internal và External. Cách nào sau đây có độ ưu tiên cao nhất ghi đè lên các cách còn lại?',
    snippet: {
      css: `<style> h1 { color: green; } </style>`,
      html: `<h1 style="color: blue;">Tiêu đề trang</h1>`
    },
    options: [
      'Inline CSS (viết trực tiếp trong thuộc tính style của thẻ h1)',
      'Internal CSS (trong thẻ <style>)',
      'External CSS (tệp liên kết qua <link>)',
      'Cả 3 cách có độ ưu tiên ngang nhau'
    ],
    correctIndex: 0,
    explanation: 'Theo thứ tự tầng ưu tiên mặc định của CSS: Inline CSS luôn có mức ưu tiên cao hơn Internal và External CSS.'
  },
  {
    id: 9,
    level: 'Vận dụng',
    question: 'Để áp dụng cùng một quy tắc CSS định dạng phông chữ chung cho tất cả các thẻ tiêu đề <h1>, <h2>, <h3> và đoạn văn <p> trên toàn trang web, bộ chọn CSS nào gom nhóm đúng cú pháp?',
    options: [
      'h1, h2, h3, p { font-family: "Segoe UI", sans-serif; }',
      'h1 + h2 + h3 + p { font-family: "Segoe UI", sans-serif; }',
      'h1 h2 h3 p { font-family: "Segoe UI", sans-serif; }',
      'all(h1-p) { font-family: "Segoe UI", sans-serif; }'
    ],
    correctIndex: 0,
    explanation: 'Dấu phẩy (,) dùng để gom nhóm nhiều bộ chọn (Group Selector) có chung các thuộc tính định dạng.'
  },
  {
    id: 10,
    level: 'Vận dụng',
    question: 'Quan sát đoạn mã sau. Thuộc tính * (Universal Selector - bộ chọn toàn cục) thường được các lập trình viên sử dụng ở đầu tệp CSS nhằm mục đích gì?',
    snippet: {
      css: `* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}`
    },
    options: [
      'Thiết lập lại (reset) khoảng cách lề mặc định của trình duyệt và chuẩn hóa cách tính kích thước khối trên mọi phần tử',
      'Xóa sạch toàn bộ văn bản trong trang',
      'Bắt buộc toàn trang đổi sang nền đen',
      'Vô hiệu hóa toàn bộ thẻ HTML'
    ],
    correctIndex: 0,
    explanation: 'CSS Reset với * { margin: 0; padding: 0; box-sizing: border-box; } loại bỏ sai lệch về khoảng cách mặc định giữa các trình duyệt khác nhau.'
  }
];
