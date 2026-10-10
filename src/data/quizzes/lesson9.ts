import { QuizQuestion } from '../../types';

// BÀI 9: TẠO DANH SÁCH VÀ BẢNG (TABLE)
// 4 câu Biết (1-4), 3 câu Hiểu (5-7), 3 câu Vận dụng (8-10)
export const LESSON_9_QUIZ: QuizQuestion[] = [
  // --- MỨC BIẾT (4 CÂU) ---
  {
    id: 1,
    level: 'Biết',
    question: 'Để tạo một danh sách có thứ tự (được đánh số 1, 2, 3...) trong HTML, ta sử dụng cặp thẻ nào?',
    options: [
      '<ol>...</ol> (Ordered List)',
      '<ul>...</ul> (Unordered List)',
      '<dl>...</dl> (Description List)',
      '<list>...</list>'
    ],
    correctIndex: 0,
    explanation: '<ol> (Ordered List) tạo danh sách có thứ tự được đánh số hoặc chữ cái.'
  },
  {
    id: 2,
    level: 'Biết',
    question: 'Trong cấu trúc bảng HTML, thẻ nào đại diện cho một hàng (dòng) của bảng?',
    options: [
      '<tr> (Table Row)',
      '<td> (Table Data)',
      '<th> (Table Header)',
      '<table>'
    ],
    correctIndex: 0,
    explanation: '<tr> đại diện cho Table Row (hàng trong bảng). Bên trong <tr> chứa các ô tiêu đề <th> hoặc ô dữ liệu <td>.'
  },
  {
    id: 3,
    level: 'Biết',
    question: 'Thẻ nào dùng để đặt tiêu đề (chú thích) nằm ở phía trên hoặc dưới của toàn bộ bảng?',
    snippet: {
      html: `<table>\n  <caption>Thời khóa biểu lớp 12A</caption>\n  <tr><th>Thứ 2</th><th>Thứ 3</th></tr>\n</table>`
    },
    options: [
      '<caption>',
      '<title>',
      '<header>',
      '<thead>'
    ],
    correctIndex: 0,
    explanation: '<caption> được đặt ngay sau thẻ mở <table> để làm chú thích, tiêu đề của bảng.'
  },
  {
    id: 4,
    level: 'Biết',
    question: 'Thuộc tính nào của ô <td> hoặc <th> dùng để gộp nhiều cột lại với nhau theo chiều ngang?',
    options: [
      'colspan',
      'rowspan',
      'span',
      'colmerge'
    ],
    correctIndex: 0,
    explanation: 'colspan (column span) gộp nhiều cột theo chiều ngang; rowspan gộp nhiều dòng theo chiều dọc.'
  },

  // --- MỨC HIỂU (3 CÂU) ---
  {
    id: 5,
    level: 'Hiểu',
    question: 'Quan sát đoạn mã bảng HTML sau. Ô có chữ "Toán & Văn" sẽ chiếm bao nhiêu cột trong hàng?',
    snippet: {
      css: `<style>\n  table, td, th { border: 1px solid black; }\n</style>`,
      html: `<tr>\n  <td colspan="2">Toán & Văn</td>\n  <td>Tiếng Anh</td>\n</tr>`
    },
    options: [
      'Chiếm độ rộng của 2 cột liên tiếp',
      'Chiếm độ rộng của 3 cột',
      'Chiếm độ rộng của 1 cột duy nhất',
      'Chiếm 2 hàng theo chiều dọc'
    ],
    correctIndex: 0,
    explanation: 'Thuộc tính colspan="2" gộp 2 cột lại thành một ô duy nhất trải dài qua 2 cột đó.'
  },
  {
    id: 6,
    level: 'Hiểu',
    question: 'Cho đoạn mã CSS và HTML sau. Thuộc tính border-collapse: collapse có tác dụng gì đối với bảng?',
    snippet: {
      css: `<style>\n  table {\n    border-collapse: collapse;\n    width: 100%;\n  }\n  th, td {\n    border: 1px solid #64748b;\n  }\n</style>`,
      html: `<table>\n  <tr><th>Họ tên</th><th>Điểm</th></tr>\n  <tr><td>An</td><td>9.5</td></tr>\n</table>`
    },
    options: [
      'Gộp các đường viền đôi liền kề giữa các ô thành một đường viền đơn gọn gàng',
      'Làm ẩn đường viền của bảng đi',
      'Thu nhỏ kích thước toàn bảng về 0px',
      'Làm cho các ô bảng tự động đổi màu'
    ],
    correctIndex: 0,
    explanation: 'border-collapse: collapse loại bỏ khoảng cách giữa các viền ô, hợp nhất các đường viền liền kề thành 1 viền đơn duy nhất.'
  },
  {
    id: 7,
    level: 'Hiểu',
    question: 'Thẻ <th> khác với thẻ <td> như thế nào về kiểu hiển thị mặc định của trình duyệt?',
    options: [
      'Nội dung trong <th> mặc định được in đậm và căn giữa ô',
      '<th> chỉ dùng để chứa số, còn <td> chứa chữ',
      '<th> không có đường viền bao quanh',
      '<th> luôn có màu nền đỏ'
    ],
    correctIndex: 0,
    explanation: 'Mặc định các trình duyệt hiển thị văn bản trong thẻ <th> (Table Header) in đậm và căn lề chính giữa.'
  },

  // --- MỨC VẬN DỤNG (3 CÂU) ---
  {
    id: 8,
    level: 'Vận dụng',
    question: 'Quan sát cấu trúc bảng sau. Trong dòng thứ 2, tại sao chỉ có 1 thẻ <td> mà bảng vẫn đủ 2 cột hiển thị cân xứng?',
    snippet: {
      css: `<style>\n  td, th { border: 1px solid gray; padding: 4px; }\n</style>`,
      html: `<table>\n  <tr>\n    <td rowspan="2">Ảnh thẻ</td>\n    <td>Họ tên: Lê Quý Đôn</td>\n  </tr>\n  <tr>\n    <td>Lớp: 12A1</td>\n  </tr>\n</table>`
    },
    options: [
      'Vì ô "Ảnh thẻ" ở hàng trên có thuộc tính rowspan="2" đã chiếm chỗ cột 1 của cả 2 hàng',
      'Vì bảng tự động nhân bản ô "Họ tên"',
      'Do trình duyệt tự bổ sung ô trống',
      'Đoạn mã trên bị lỗi cú pháp không hiển thị được'
    ],
    correctIndex: 0,
    explanation: 'rowspan="2" ở hàng 1 kéo dài ô "Ảnh thẻ" xuống chiếm luôn vị trí cột 1 của hàng 2, nên hàng 2 chỉ cần định nghĩa cột 2.'
  },
  {
    id: 9,
    level: 'Vận dụng',
    question: 'Học sinh muốn tạo bảng có hàng chẵn mang màu nền xám nhạt (#f1f5f9) xen kẽ để dễ đọc số liệu (hiệu ứng zebra striping). Bộ chọn CSS nào sau đây thực hiện chuẩn xác?',
    snippet: {
      css: `<style>\n  /* Cần bộ chọn tô màu dòng chẵn */\n  tr:nth-child(even) {\n    background-color: #f1f5f9;\n  }\n</style>`,
      html: `<table>\n  <tr><td>Dòng 1</td></tr>\n  <tr><td>Dòng 2</td></tr>\n  <tr><td>Dòng 3</td></tr>\n  <tr><td>Dòng 4</td></tr>\n</table>`
    },
    options: [
      'tr:nth-child(even) { background-color: #f1f5f9; }',
      'tr:first-child { background-color: #f1f5f9; }',
      'table:hover { background-color: #f1f5f9; }',
      'td.even { color: #f1f5f9; }'
    ],
    correctIndex: 0,
    explanation: 'Bộ chọn giả lớp :nth-child(even) chọn tất cả các dòng chẵn trong bảng để đổi màu nền tạo hiệu ứng xen kẽ.'
  },
  {
    id: 10,
    level: 'Vận dụng',
    question: 'Cho bảng thông tin học sinh dưới đây. Cần viết mã gộp ô tiêu đề cột "Điểm thi" bao quát cả hai cột con "Điểm Lý thuyết" và "Điểm Thực hành". Thuộc tính nào cần điền vào ô tiêu đề "Điểm thi"?',
    snippet: {
      html: `<tr>\n  <th rowspan="2">STT</th>\n  <th rowspan="2">Họ và tên</th>\n  <th ??? >Điểm thi</th>\n</tr>\n<tr>\n  <th>Lý thuyết</th>\n  <th>Thực hành</th>\n</tr>`
    },
    options: [
      'colspan="2"',
      'rowspan="2"',
      'colspan="3"',
      'span="all"'
    ],
    correctIndex: 0,
    explanation: 'Ô "Điểm thi" bao quát 2 cột phía dưới (Lý thuyết và Thực hành) nên cần khai báo thuộc tính colspan="2".'
  }
];
