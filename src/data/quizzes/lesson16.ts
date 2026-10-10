import { QuizQuestion } from '../../types';

// BÀI 16: ĐỊNH DẠNG KHUNG (BOX MODEL)
// 4 câu Biết (1-4), 3 câu Hiểu (5-7), 3 câu Vận dụng (8-10)
// Đặc biệt: Bám sát câu hỏi trong ảnh người dùng tải lên với .box, padding: 7px, border: 5px dotted lightgreen, width: 400px, box-sizing: border-box
export const LESSON_16_QUIZ: QuizQuestion[] = [
  // --- MỨC BIẾT (4 CÂU) ---
  {
    id: 1,
    level: 'Biết',
    question: 'Mô hình hộp (CSS Box Model) bao gồm 4 thành phần chính được sắp xếp theo thứ tự từ trong ra ngoài cùng là gì?',
    options: [
      'Content (Nội dung) → Padding (Đệm) → Border (Viền) → Margin (Lề)',
      'Margin → Border → Padding → Content',
      'Content → Margin → Padding → Border',
      'Border → Content → Padding → Margin'
    ],
    correctIndex: 0,
    explanation: 'Box Model chuẩn đi từ trong ra ngoài: Lõi trong cùng là Content, bao bọc bởi Padding, kế tiếp là Border, và ngoài cùng là khoảng cách Margin.'
  },
  {
    id: 2,
    level: 'Biết',
    question: 'Thành phần Padding trong Box Model đại diện cho khoảng cách nào?',
    options: [
      'Khoảng cách đệm giữa nội dung (Content) và đường viền (Border)',
      'Khoảng cách từ đường viền ra các phần tử xung quanh bên ngoài',
      'Độ dày của nét vẽ đường viền',
      'Khoảng cách giữa hai dòng chữ'
    ],
    correctIndex: 0,
    explanation: 'Padding là vùng đệm trong suốt nằm giữa nội dung hiển thị và mép trong của đường viền.'
  },
  {
    id: 3,
    level: 'Biết',
    question: 'Trong khai báo rút gọn margin: 10px 20px; hai giá trị này tương ứng với các cạnh nào theo chiều kim đồng hồ?',
    options: [
      '10px cho Trên & Dưới; 20px cho Trái & Phải',
      '10px cho Trái & Phải; 20px cho Trên & Dưới',
      '10px cho Trên & Phải; 20px cho Dưới & Trái',
      'Chỉ áp dụng cho 2 góc của khối'
    ],
    correctIndex: 0,
    explanation: 'Khai báo 2 giá trị: Giá trị thứ nhất áp dụng cho Trên - Dưới (Top/Bottom), giá trị thứ hai áp dụng cho Trái - Phải (Left/Right).'
  },
  {
    id: 4,
    level: 'Biết',
    question: 'Thuộc tính nào của CSS dùng để bo tròn các góc nhọn của đường viền hộp?',
    options: [
      'border-radius',
      'corner-round',
      'box-curve',
      'border-style'
    ],
    correctIndex: 0,
    explanation: 'border-radius quy định bán kính cong của các góc bo tròn đường viền.'
  },

  // --- MỨC HIỂU (3 CÂU) ---
  {
    id: 5,
    level: 'Hiểu',
    question: 'Quan sát đoạn mã sau. Thuộc tính border: 5px dotted lightgreen có ý nghĩa cấu hình đường viền như thế nào?',
    snippet: {
      css: `<style>\n  .box {\n    padding: 7px;\n    border: 5px dotted lightgreen;\n    width: 400px;\n    box-sizing: border-box;\n  }\n</style>`,
      html: `<div class="box">\n  <label for="HoTen"> Họ và tên: </label>\n  <input type="text" id="HoTen" name="HoTen">\n</div>`
    },
    options: [
      'Độ dày viền 5px, nét viền dạng chấm tròn (dotted), màu xanh lục nhạt (lightgreen)',
      'Đường viền nét liền dày 5px màu xanh lá đậm',
      'Đường viền nét đứt gạch ngang màu xanh',
      'Tạo 5 lớp viền lồng vào nhau'
    ],
    correctIndex: 0,
    explanation: 'Cú pháp rút gọn border gồm 3 thành phần: border-width (5px), border-style (dotted: nét chấm tròn), border-color (lightgreen).'
  },
  {
    id: 6,
    level: 'Hiểu',
    question: 'Cho đoạn mã sau. Thuộc tính margin: 0 auto; kết hợp với width cố định có tác dụng gì đối với một khối block?',
    snippet: {
      css: `<style>\n  .container {\n    width: 600px;\n    margin: 0 auto;\n    border: 1px solid #ccc;\n  }\n</style>`,
      html: `<div class="container">Khung nội dung chính</div>`
    },
    options: [
      'Tự động căn khối nằm chính giữa trang theo chiều ngang',
      'Căn khối dạt sang sát mép phải',
      'Làm khối biến mất khỏi màn hình',
      'Tự động tăng chiều cao gấp đôi'
    ],
    correctIndex: 0,
    explanation: 'margin: 0 auto tự động chia đều khoảng cách lề trái và lề phải, đưa khối có chiều rộng cố định vào chính giữa vùng chứa.'
  },
  {
    id: 7,
    level: 'Hiểu',
    question: 'Sự khác biệt cốt lõi giữa Margin và Padding trong việc hiển thị màu nền (background-color) là gì?',
    options: [
      'Vùng Padding được phủ màu nền của phần tử, trong khi vùng Margin luôn trong suốt không nhận màu nền',
      'Vùng Margin nhận màu nền, còn Padding luôn trong suốt',
      'Cả hai đều không nhận màu nền',
      'Cả hai đều có màu nền đen'
    ],
    correctIndex: 0,
    explanation: 'Màu nền của phần tử trải rộng ra toàn bộ vùng Content và Padding (chạm tới mép trong của Border); vùng Margin nằm ngoài viền nên luôn trong suốt.'
  },

  // --- MỨC VẬN DỤNG (3 CÂU) ---
  {
    id: 8,
    level: 'Vận dụng',
    question: 'Quan sát chính xác đoạn mã CSS và HTML trong hình minh họa. Hãy cho biết tổng chiều rộng chiếm dụng của phần tử .box trên trang web là bao nhiêu?',
    snippet: {
      css: `<style>\n  .box {\n    padding: 7px;\n    border: 5px dotted lightgreen;\n    width: 400px;\n    box-sizing: border-box;\n  }\n</style>`,
      html: `<div class="box">\n  <label for="HoTen"> Họ và tên: </label>\n  <input type="text" id="HoTen" name="HoTen">\n</div>`
    },
    options: [
      '400px (vì thuộc tính box-sizing: border-box đã tính gộp cả padding 7px và border 5px vào trong width 400px)',
      '424px (400px + 7*2px padding + 5*2px border)',
      '410px (400px + 10px viền)',
      '386px'
    ],
    correctIndex: 0,
    explanation: 'Chính xác! Khi khai báo box-sizing: border-box, chiều rộng tổng thể của hộp cố định đúng 400px, trình duyệt sẽ tự động co hẹp phần Content còn lại 376px (400 - 14 - 10 = 376px).'
  },
  {
    id: 9,
    level: 'Vận dụng',
    question: 'Nếu khối .box trên KHÔNG có dòng box-sizing: border-box (tức là sử dụng chế độ mặc định content-box của trình duyệt), thì tổng chiều rộng tính toán trên trang sẽ là bao nhiêu?',
    snippet: {
      css: `<style>\n  .box-default {\n    padding: 7px;\n    border: 5px dotted lightgreen;\n    width: 400px;\n    /* mặc định: box-sizing: content-box */\n  }\n</style>`
    },
    options: [
      '424px (chiều rộng thực tế = 400px width + 14px padding trái phải + 10px border trái phải)',
      '400px',
      '412px',
      '414px'
    ],
    correctIndex: 0,
    explanation: 'Với content-box mặc định: Tổng width = width (400px) + padding-left (7px) + padding-right (7px) + border-left (5px) + border-right (5px) = 424px.'
  },
  {
    id: 10,
    level: 'Vận dụng',
    question: 'Một học sinh muốn tạo nút bấm tròn hoàn hảo (hình tròn 100%) có kích thước 40px x 40px. Khối CSS nào sau đây định kiểu chuẩn xác?',
    snippet: {
      css: `<style>\n  .circle-btn {\n    width: 40px;\n    height: 40px;\n    border-radius: 50%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n  }\n</style>`,
      html: `<button class="circle-btn">+</button>`
    },
    options: [
      'width: 40px; height: 40px; border-radius: 50%;',
      'width: 40px; border-radius: 10px;',
      'border-shape: circle;',
      'radius: 40px; circle: true;'
    ],
    correctIndex: 0,
    explanation: 'Một khối hình vuông (width bằng height) kết hợp border-radius: 50% sẽ tạo ra một hình tròn hoàn hảo.'
  }
];
