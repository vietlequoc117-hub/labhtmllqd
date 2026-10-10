import { QuizQuestion } from '../../types';

// BÀI 14: ĐỊNH DẠNG VĂN BẢN BẰNG CSS
// 4 câu Biết (1-4), 3 câu Hiểu (5-7), 3 câu Vận dụng (8-10)
export const LESSON_14_QUIZ: QuizQuestion[] = [
  // --- MỨC BIẾT (4 CÂU) ---
  {
    id: 1,
    level: 'Biết',
    question: 'Thuộc tính CSS nào sau đây được sử dụng để căn chỉnh lề cho dòng văn bản (trái, phải, giữa, đều hai bên)?',
    options: [
      'text-align',
      'align-content',
      'text-justify',
      'font-align'
    ],
    correctIndex: 0,
    explanation: 'text-align (với các giá trị left, right, center, justify) căn lề văn bản bên trong khối chứa.'
  },
  {
    id: 2,
    level: 'Biết',
    question: 'Để tăng giảm kích thước cỡ chữ (font size) của văn bản trong CSS, ta sử dụng thuộc tính nào?',
    options: [
      'font-size',
      'text-size',
      'font-weight',
      'text-scale'
    ],
    correctIndex: 0,
    explanation: 'font-size xác định kích thước chữ (đơn vị px, rem, em, pt...).'
  },
  {
    id: 3,
    level: 'Biết',
    question: 'Thuộc tính nào của CSS dùng để làm chữ in đậm (bold) hoặc in mảnh (normal, lighter)?',
    options: [
      'font-weight',
      'font-style',
      'font-thickness',
      'text-bold'
    ],
    correctIndex: 0,
    explanation: 'font-weight điều chỉnh độ đậm/nhạt của nét chữ (bold, normal, 100 đến 900).'
  },
  {
    id: 4,
    level: 'Biết',
    question: 'Để gạch chân văn bản hoặc bỏ đường gạch chân mặc định của liên kết <a>, ta dùng thuộc tính nào?',
    snippet: {
      css: `a { text-decoration: none; }`
    },
    options: [
      'text-decoration',
      'text-underline',
      'border-bottom',
      'font-decoration'
    ],
    correctIndex: 0,
    explanation: 'text-decoration: none loại bỏ đường gạch chân, trong khi underline tạo đường gạch chân.'
  },

  // --- MỨC HIỂU (3 CÂU) ---
  {
    id: 5,
    level: 'Hiểu',
    question: 'Quan sát đoạn mã sau. Thuộc tính text-transform: uppercase có tác dụng gì đối với văn bản?',
    snippet: {
      css: `<style>\n  h2 {\n    text-transform: uppercase;\n    letter-spacing: 2px;\n  }\n</style>`,
      html: `<h2>tin học 12 kết nối tri thức</h2>`
    },
    options: [
      'Tự động chuyển đổi toàn bộ chữ cái thành CHỮ IN HOA và giãn khoảng cách các chữ cái',
      'Chỉ in hoa chữ cái đầu tiên của câu',
      'Làm nghiêng chữ',
      'Chuyển chữ thành chữ in thường'
    ],
    correctIndex: 0,
    explanation: 'text-transform: uppercase chuyển toàn bộ văn bản thành in hoa; letter-spacing: 2px giãn rộng khoảng cách giữa các ký tự.'
  },
  {
    id: 6,
    level: 'Hiểu',
    question: 'Đoạn mã sau sử dụng font-family: "Segoe UI", Arial, sans-serif. Tại sao lại liệt kê nhiều tên phông chữ cách nhau bởi dấu phẩy?',
    snippet: {
      css: `body {\n  font-family: "Segoe UI", Arial, sans-serif;\n}`
    },
    options: [
      'Đây là danh sách phông chữ dự phòng (fallback fonts). Nếu máy người dùng không có "Segoe UI", trình duyệt sẽ tự động thử Arial, nếu vẫn không có sẽ dùng phông sans-serif mặc định',
      'Trình duyệt sẽ trộn cả 3 phông lại với nhau để vẽ chữ',
      'Mỗi từ trong câu sẽ hiển thị một phông chữ khác nhau',
      'Quy tắc này không hợp lệ trong CSS'
    ],
    correctIndex: 0,
    explanation: 'Cơ chế Fallback Font đảm bảo trang web vẫn hiển thị đẹp nếu thiết bị người dùng chưa cài đặt phông chữ mong muốn đầu tiên.'
  },
  {
    id: 7,
    level: 'Hiểu',
    question: 'Thuộc tính line-height: 1.6 ảnh hưởng như thế nào đến đoạn văn bản dài?',
    options: [
      'Tăng khoảng cách độ cao giữa các dòng văn bản, giúp đoạn văn thoáng đãng và dễ đọc hơn',
      'Tăng cỡ chữ lên gấp 1.6 lần',
      'Tạo 1.6 dòng trống ở đầu trang',
      'Kéo dài độ rộng cột thành 160%'
    ],
    correctIndex: 0,
    explanation: 'line-height (chiều cao dòng) quy định khoảng cách giữa các dòng trong đoạn văn bản.'
  },

  // --- MỨC VẬN DỤNG (3 CÂU) ---
  {
    id: 8,
    level: 'Vận dụng',
    question: 'Học sinh muốn tạo một đoạn trích dẫn văn bản báo chí với dòng đầu tiên thụt vào 2em, căn đều hai bên và chữ in nghiêng. Khối CSS nào dưới đây đáp ứng trọn vẹn?',
    snippet: {
      css: `<style>\n  .quote {\n    text-indent: 2em;\n    text-align: justify;\n    font-style: italic;\n  }\n</style>`,
      html: `<p class="quote">Học vấn là chìa khóa mở ra cánh cửa tương lai...</p>`
    },
    options: [
      'text-indent: 2em; text-align: justify; font-style: italic;',
      'padding-left: 2em; text-align: center; font-weight: bold;',
      'margin: 2em; line-height: 2em;',
      'text-transform: capitalize;'
    ],
    correctIndex: 0,
    explanation: 'text-indent thụt lề đầu dòng, text-align: justify căn đều 2 mép, font-style: italic in nghiêng.'
  },
  {
    id: 9,
    level: 'Vận dụng',
    question: 'Để văn bản dài khi vượt quá chiều rộng của khung thẻ sẽ tự động cắt ngắn và hiển thị dấu ba chấm (...) ở cuối dòng, cần kết hợp các thuộc tính CSS nào?',
    snippet: {
      css: `<style>\n  .truncate {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n</style>`
    },
    options: [
      'white-space: nowrap; overflow: hidden; text-overflow: ellipsis;',
      'display: none; text-dots: true;',
      'text-align: clip; max-width: 100px;',
      'cut-text: 3dots;'
    ],
    correctIndex: 0,
    explanation: 'Bộ ba white-space: nowrap (không xuống dòng), overflow: hidden (ẩn phần tràn) và text-overflow: ellipsis (hiện dấu ba chấm) là kỹ thuật kinh điển trong CSS.'
  },
  {
    id: 10,
    level: 'Vận dụng',
    question: 'Cho đoạn mã sau. Thuộc tính text-shadow: 2px 2px 4px rgba(0,0,0,0.5) tạo hiệu ứng thị giác nào cho tiêu đề?',
    snippet: {
      css: `<style>\n  h1 {\n    color: #ffffff;\n    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);\n  }\n</style>`,
      html: `<h1>LQD_HTML_LAB</h1>`
    },
    options: [
      'Tạo bóng đổ cho chữ chếch sang phải 2px, xuống dưới 2px, độ nhòe bóng 4px với màu đen mờ 50%',
      'Tạo đường viền bao quanh chữ dày 4px',
      'Làm mờ chữ hoàn toàn không đọc được',
      'Tạo hiệu ứng chữ chuyển động'
    ],
    correctIndex: 0,
    explanation: 'Cú pháp text-shadow: offset-x offset-y blur-radius color tạo bóng đổ chiều sâu sắc nét cho văn bản.'
  }
];
