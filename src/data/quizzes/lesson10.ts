import { QuizQuestion } from '../../types';

// BÀI 10: TẠO LIÊN KẾT
// 4 câu Biết (1-4), 3 câu Hiểu (5-7), 3 câu Vận dụng (8-10)
export const LESSON_10_QUIZ: QuizQuestion[] = [
  // --- MỨC BIẾT (4 CÂU) ---
  {
    id: 1,
    level: 'Biết',
    question: 'Thẻ HTML nào sau đây được sử dụng để tạo liên kết siêu văn bản (hyperlink)?',
    options: [
      'Thẻ <a> (anchor)',
      'Thẻ <link>',
      'Thẻ <href>',
      'Thẻ <url>'
    ],
    correctIndex: 0,
    explanation: 'Thẻ <a> (anchor) cùng thuộc tính href dùng để tạo liên kết điều hướng giữa các trang hoặc các phần trong trang.'
  },
  {
    id: 2,
    level: 'Biết',
    question: 'Thuộc tính bắt buộc nào của thẻ <a> chứa địa chỉ URL của trang web đích cần chuyển tới?',
    snippet: {
      html: `<a href="https://moet.gov.vn">Bộ Giáo dục và Đào tạo</a>`
    },
    options: [
      'href (Hypertext Reference)',
      'src',
      'url',
      'target'
    ],
    correctIndex: 0,
    explanation: 'Thuộc tính href (Hypertext Reference) lưu trữ đường dẫn đích của liên kết.'
  },
  {
    id: 3,
    level: 'Biết',
    question: 'Để liên kết khi được nhấp vào sẽ tự động mở trong một thẻ (tab) hoặc cửa sổ mới của trình duyệt, ta gán giá trị nào cho thuộc tính target?',
    options: [
      'target="_blank"',
      'target="_self"',
      'target="_parent"',
      'target="_top"'
    ],
    correctIndex: 0,
    explanation: 'target="_blank" yêu cầu trình duyệt mở liên kết đích trong tab hoặc cửa sổ mới hoàn toàn.'
  },
  {
    id: 4,
    level: 'Biết',
    question: 'Ký tự nào đứng đầu giá trị trong thuộc tính href để chỉ định một liên kết neo (bookmark/anchor) nhảy đến một phần tử có id trong cùng trang?',
    snippet: {
      html: `<a href="#chuong1">Nhảy đến Chương 1</a>\n<!-- ... -->\n<h2 id="chuong1">Nội dung Chương 1</h2>`
    },
    options: [
      'Dấu thăng (#)',
      'Dấu chấm (.)',
      'Dấu gạch chéo (/)',
      'Dấu chấm than (!)'
    ],
    correctIndex: 0,
    explanation: 'Dấu # (hashtag) đi kèm với tên id (ví dụ href="#chuong1") đại diện cho liên kết neo nhảy nội bộ trong cùng một tài liệu HTML.'
  },

  // --- MỨC HIỂU (3 CÂU) ---
  {
    id: 5,
    level: 'Hiểu',
    question: 'Quan sát đoạn mã sau. Liên kết này dẫn tới tệp nào trong hệ thống thư mục?',
    snippet: {
      html: `<a href="gioithieu.html">Giới thiệu về trường</a>`
    },
    options: [
      'Tệp gioithieu.html nằm trong cùng thư mục với trang HTML hiện tại (liên kết tương đối)',
      'Tệp trên mạng Internet toàn cầu',
      'Tệp nằm trong thư mục gốc ổ đĩa C:\\',
      'Tệp hình ảnh gioithieu.png'
    ],
    correctIndex: 0,
    explanation: 'Đường dẫn không có dấu / ở đầu và không có http:// là đường dẫn tương đối trỏ tới tệp cùng thư mục.'
  },
  {
    id: 6,
    level: 'Hiểu',
    question: 'Cho đoạn mã CSS và HTML sau. Điều gì xảy ra khi người dùng rê chuột qua liên kết?',
    snippet: {
      css: `<style>\n  a {\n    color: #2563eb;\n    text-decoration: none;\n  }\n  a:hover {\n    color: #dc2626;\n    text-decoration: underline;\n  }\n</style>`,
      html: `<a href="#lienhe">Liên hệ chúng tôi</a>`
    },
    options: [
      'Chữ chuyển sang màu đỏ (#dc2626) và xuất hiện gạch chân bên dưới',
      'Chữ biến mất khỏi màn hình',
      'Màu chữ giữ nguyên màu xanh lam',
      'Trang web tự động nhảy xuống mục liên hệ ngay cả khi chưa bấm'
    ],
    correctIndex: 0,
    explanation: 'Giả lớp :hover kích hoạt khi con trỏ chuột rê qua, đổi màu thành đỏ và thêm gạch chân (text-decoration: underline).'
  },
  {
    id: 7,
    level: 'Hiểu',
    question: 'Để biến một bức ảnh thành nút bấm có chức năng liên kết về trang chủ, ta lồng ghép các thẻ như thế nào?',
    snippet: {
      html: `<a href="index.html">\n  <img src="logo.png" alt="Logo LQD">\n</a>`
    },
    options: [
      'Đặt thẻ <img> nằm bên trong cặp thẻ <a>...</a>',
      'Đặt thẻ <a> nằm bên trong thẻ <img>',
      'Gán thuộc tính href trực tiếp vào thẻ <img>',
      'Dùng thẻ <button href="index.html">'
    ],
    correctIndex: 0,
    explanation: 'Bọc thẻ <img> bên trong thẻ <a> biến toàn bộ diện tích bức ảnh thành liên kết có thể nhấp chuột.'
  },

  // --- MỨC VẬN DỤNG (3 CÂU) ---
  {
    id: 8,
    level: 'Vận dụng',
    question: 'Trang web có một nút "Về đầu trang" cố định ở góc dưới màn hình. Đoạn mã nào sau đây thực hiện chuẩn xác thao tác cuộn mượt mà về đầu trang?',
    snippet: {
      css: `<style>\n  html {\n    scroll-behavior: smooth;\n  }\n</style>`,
      html: `<body id="top">\n  <!-- Nội dung trang dài -->\n  <a href="#top" class="back-to-top">↑ Về đầu trang</a>\n</body>`
    },
    options: [
      'Đặt href="#top" trỏ tới id="top" của <body> kết hợp scroll-behavior: smooth trong CSS',
      'Dùng href="refresh.html"',
      'Dùng <button onclick="top"> không cần neo',
      'Dùng thẻ <header top="0">'
    ],
    correctIndex: 0,
    explanation: 'href="#top" nhảy tới id="top", kết hợp scroll-behavior: smooth tạo hiệu ứng cuộn êm mượt mà lên đầu trang.'
  },
  {
    id: 9,
    level: 'Vận dụng',
    question: 'Cần tạo liên kết mở ứng dụng gửi thư điện tử soạn thư mới tới địa chỉ banbientap@lqd.edu.vn với tiêu đề thư có sẵn. Cú pháp nào sau đây là chuẩn?',
    options: [
      'href="mailto:banbientap@lqd.edu.vn"',
      'href="email://banbientap@lqd.edu.vn"',
      'href="sendmail?to=banbientap@lqd.edu.vn"',
      'href="https://gmail.com/banbientap@lqd.edu.vn"'
    ],
    correctIndex: 0,
    explanation: 'Giao thức mailto: (ví dụ href="mailto:banbientap@lqd.edu.vn") kích hoạt ứng dụng email mặc định trên thiết bị.'
  },
  {
    id: 10,
    level: 'Vận dụng',
    question: 'Một học sinh tạo thanh menu điều hướng trên cùng như đoạn mã dưới đây. Muốn trang web tự căn đều khoảng cách giữa các mục menu trên một hàng ngang, ta cần bổ sung thuộc tính CSS nào cho thẻ cha .nav-menu?',
    snippet: {
      css: `<style>\n  .nav-menu {\n    display: flex;\n    justify-content: space-between;\n    list-style: none;\n  }\n</style>`,
      html: `<ul class="nav-menu">\n  <li><a href="#home">Trang chủ</a></li>\n  <li><a href="#about">Giới thiệu</a></li>\n  <li><a href="#contact">Liên hệ</a></li>\n</ul>`
    },
    options: [
      'display: flex kết hợp justify-content: space-between',
      'float: right kết hợp clear: both',
      'position: absolute',
      'text-align: justify'
    ],
    correctIndex: 0,
    explanation: 'Flexbox với display: flex và justify-content: space-between là giải pháp hiện đại phân bổ đều các mục menu dọc theo chiều ngang.'
  }
];
